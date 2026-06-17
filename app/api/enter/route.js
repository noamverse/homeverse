import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const VALID_ROOMS = ["belong", "build", "bring", "seed", "partner"];

function isValidEmail(str) {
  return typeof str === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
}

function classify(body) {
  return {
    desired_rooms: body.answers?.room_types ?? [],
    invite_preference: body.answers?.invite_preference ?? [],
    city: body.city ?? null,
    seeking: body.answers?.seeking ?? null,
  };
}

function buildRouting(classification) {
  const routing = ["Fellowship"];
  if (classification.desired_rooms.includes("faith/spiritual")) routing.push("Foundation");
  if (
    classification.desired_rooms.includes("founders") ||
    classification.invite_preference.includes("founder–fellowship circles")
  )
    routing.push("Engine");
  if (classification.desired_rooms.includes("creative")) routing.push("Studio");
  return routing;
}

function buildPriority(body, classification) {
  if (classification.desired_rooms.includes("founders")) return "high";
  const notes = (body.answers?.open_notes ?? "").toLowerCase();
  if (/\b(host|hosting|venue|capital|invest|fund|partner|partnership|strategic)\b/.test(notes))
    return "high";
  return "normal";
}

function buildEmailText(body, classification, routing, priority, id) {
  const a = body.answers ?? {};
  return [
    `Room: ${body.room}`,
    `Name: ${body.name ?? "—"}`,
    `Email: ${body.email}`,
    `City: ${body.city ?? "—"}`,
    ``,
    `--- Classification ---`,
    `Desired rooms: ${classification.desired_rooms.join(", ") || "—"}`,
    `Invite preference: ${classification.invite_preference.join(", ") || "—"}`,
    `Seeking: ${classification.seeking ?? "—"}`,
    ``,
    `--- Routing ---`,
    routing.join(", "),
    `Priority: ${priority}`,
    ``,
    `--- Answers ---`,
    `What makes you feel alive? ${a.alive ?? "—"}`,
    `What are you seeking? ${a.seeking ?? "—"}`,
    `Anything we should know? ${a.open_notes ?? "—"}`,
    ``,
    `Source: ${body.source ?? "—"}`,
    `Entry ID: ${id ?? "(not written — env vars missing)"}`,
    `Timestamp: ${new Date().toISOString()}`,
  ].join("\n");
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — silently succeed without writing
  if (body._h) {
    return Response.json({ ok: true });
  }

  // Validate room
  if (!body.room || !VALID_ROOMS.includes(body.room)) {
    return Response.json({ ok: false, error: "Invalid room." }, { status: 400 });
  }

  // Validate email
  if (!isValidEmail(body.email)) {
    return Response.json(
      { ok: false, error: "Please include a valid email." },
      { status: 400 }
    );
  }

  const classification = classify(body);
  const routing = buildRouting(classification);
  const priority = buildPriority(body, classification);

  const entry = {
    room: body.room,
    name: body.name?.trim() ?? null,
    email: body.email.trim().toLowerCase(),
    city: body.city?.trim() ?? null,
    market: body.market?.trim() ?? null,
    answers: body.answers ?? {},
    classification,
    routing,
    priority,
    status: "new",
    source: body.source ?? null,
    metadata: body.metadata ?? {},
  };

  // --- Supabase ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let id = null;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("[/api/enter] Supabase env vars missing — entry not written to database");
  } else {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { data, error } = await supabase
        .from("entries")
        .insert(entry)
        .select("id")
        .single();

      if (error) {
        console.error("[/api/enter] Supabase error:", error.message);
        return Response.json(
          { ok: false, error: "We couldn't save your entry right now. Please try again." },
          { status: 500 }
        );
      }
      id = data.id;
    } catch (err) {
      console.error("[/api/enter] Supabase unexpected error:", err.message);
      return Response.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }
  }

  // --- Resend ---
  const resendKey = process.env.RESEND_API_KEY;
  const founderEmail = process.env.FOUNDER_EMAIL;

  if (resendKey && founderEmail) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "HOME <guestbook@enter.homeverse.family>",
        to: founderEmail,
        subject: `HOME / BELONG / ${body.name ?? "Anonymous"} / ${body.city ?? "Unknown"}`,
        text: buildEmailText(body, classification, routing, priority, id),
      });
    } catch (emailErr) {
      console.error("[/api/enter] Resend error:", emailErr.message);
    }
  } else {
    console.warn("[/api/enter] Resend env vars missing — notification email not sent");
  }

  return Response.json({ ok: true, id });
}
