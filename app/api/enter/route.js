import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const VALID_ROOMS = ["belong", "build", "bring", "seed", "partner"];

function isValidEmail(str) {
  return typeof str === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
}

// ── Belong classification ─────────────────────────────────────

function classifyBelong(body) {
  return {
    desired_rooms: body.answers?.room_types ?? [],
    invite_preference: body.answers?.invite_preference ?? [],
    city: body.city ?? null,
    seeking: body.answers?.seeking ?? null,
  };
}

function routeBelong(classification) {
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

function prioritizeBelong(body, classification) {
  if (classification.desired_rooms.includes("founders")) return "high";
  const notes = (body.answers?.open_notes ?? "").toLowerCase();
  if (/\b(host|hosting|venue|capital|invest|fund|partner|partnership|strategic)\b/.test(notes))
    return "high";
  return "normal";
}

// ── Build classification ──────────────────────────────────────

function classifyBuild(body) {
  return {
    stage: body.answers?.stage ?? null,
    needs: body.answers?.need_most ?? [],
    looking_for: body.answers?.looking_for ?? [],
    has_link: !!(body.answers?.link),
  };
}

function routeBuild(classification) {
  const routing = ["Engine"];
  if (classification.needs.includes("capital") || classification.looking_for.includes("Fund"))
    routing.push("Fund");
  if (
    classification.needs.includes("story") ||
    classification.needs.includes("clarity") ||
    classification.looking_for.includes("Translation")
  )
    routing.push("Translation");
  if (
    classification.needs.includes("product") ||
    classification.needs.includes("distribution") ||
    classification.looking_for.includes("Studio")
  )
    routing.push("Studio");
  if (classification.needs.includes("team") || classification.looking_for.includes("Fellowship"))
    routing.push("Fellowship");
  if (classification.needs.includes("partners") || classification.looking_for.includes("Partners"))
    routing.push("Partner");
  return routing;
}

function prioritizeBuild(body, classification) {
  const advancedStage = ["launched", "scaling"].includes(classification.stage);
  const hasCapital = classification.needs.includes("capital");
  const hasLink = classification.has_link;
  if (advancedStage && (hasCapital || hasLink)) return "high";
  return "normal";
}

// ── Bring classification ──────────────────────────────────────

function classifyBring(body) {
  return {
    roles: body.answers?.roles ?? [],
    contribution: body.answers?.how_contribute ?? null,
    brings: body.answers?.what_bring ?? [],
  };
}

function routeBring(classification) {
  const routing = ["Engine"];
  const { roles } = classification;
  if (roles.some((r) => ["designer", "writer", "artist"].includes(r))) routing.push("Studio");
  if (roles.some((r) => ["connector", "host", "chef", "producer"].includes(r))) routing.push("Fellowship");
  if (roles.includes("venue owner")) { routing.push("Partner"); routing.push("Base"); }
  if (roles.includes("investor")) routing.push("Fund");
  return [...new Set(routing)];
}

function prioritizeBring(body, classification) {
  const { roles } = classification;
  if (roles.includes("venue owner") || roles.includes("investor")) return "high";
  const contrib = (classification.contribution ?? "").toLowerCase();
  if (/\b(major|significant|large|capital|venue|fund|seed|back)\b/.test(contrib)) return "high";
  return "normal";
}

// ── Seed classification ───────────────────────────────────────

function classifySeed(body) {
  return {
    interest_type: body.answers?.interest ?? [],
    entity_type: body.answers?.entity ?? null,
    participation_level: body.answers?.participation_level ?? null,
    wants_private_conversation: body.answers?.private_conversation === "yes",
  };
}

function routeSeed(classification) {
  const routing = ["Fund"];
  if (classification.wants_private_conversation) routing.push("direct-to-Noam");
  return routing;
}

function prioritizeSeed(body, classification) {
  const highEntities = ["family office", "fund", "institution", "brand"];
  if (highEntities.includes(classification.entity_type)) return "high";
  return "normal";
}

// ── Partner classification ────────────────────────────────────

function classifyPartner(body) {
  return {
    org_type: body.answers?.org_type ?? [],
    market: body.market ?? null,
    partnership_type: body.answers?.partnership ?? null,
  };
}

function routePartner(classification) {
  const routing = ["Embassy", "Partner"];
  const { org_type } = classification;
  if (org_type.some((t) => ["venue", "hospitality"].includes(t))) routing.push("Base");
  if (org_type.includes("media")) routing.push("Studio");
  return [...new Set(routing)];
}

function prioritizePartner(body, classification) {
  const highTypes = ["city", "institution", "brand"];
  if (classification.org_type.some((t) => highTypes.includes(t))) return "high";
  const assets = (body.answers?.assets ?? "").toLowerCase();
  if (/\b(large|major|city|national|international|flagship)\b/.test(assets)) return "high";
  return "normal";
}

// ── Dispatchers ───────────────────────────────────────────────

function classify(body) {
  if (body.room === "build")   return classifyBuild(body);
  if (body.room === "bring")   return classifyBring(body);
  if (body.room === "seed")    return classifySeed(body);
  if (body.room === "partner") return classifyPartner(body);
  return classifyBelong(body);
}

function computeRouting(body, classification) {
  if (body.room === "build")   return routeBuild(classification);
  if (body.room === "bring")   return routeBring(classification);
  if (body.room === "seed")    return routeSeed(classification);
  if (body.room === "partner") return routePartner(classification);
  return routeBelong(classification);
}

function computePriority(body, classification) {
  if (body.room === "build")   return prioritizeBuild(body, classification);
  if (body.room === "bring")   return prioritizeBring(body, classification);
  if (body.room === "seed")    return prioritizeSeed(body, classification);
  if (body.room === "partner") return prioritizePartner(body, classification);
  return prioritizeBelong(body, classification);
}

// ── Email helpers ─────────────────────────────────────────────

function emailSubject(body) {
  if (body.room === "build")   return `HOME / BUILD / ${body.name ?? "Anonymous"}`;
  if (body.room === "bring")   return `HOME / BRING / ${body.name ?? "Anonymous"}`;
  if (body.room === "seed")    return `HOME / SEED / ${body.name ?? "Anonymous"} / ${body.answers?.entity ?? "—"}`;
  if (body.room === "partner") return `HOME / PARTNER / ${body.answers?.org ?? body.name ?? "—"} / ${body.market ?? "—"}`;
  return `HOME / BELONG / ${body.name ?? "Anonymous"} / ${body.city ?? "Unknown"}`;
}

function emailText(body, classification, routing, priority, id) {
  const ts = new Date().toISOString();
  const idLine = `Entry ID: ${id ?? "(not written — env vars missing)"}`;
  const sourceLine = `Source: ${body.source ?? "—"}`;

  if (body.room === "build") {
    const a = body.answers ?? {};
    return [
      `Room: ${body.room}`,
      `Name: ${body.name ?? "—"}`,
      `Email: ${body.email}`,
      ``,
      `--- Classification ---`,
      `Stage: ${classification.stage ?? "—"}`,
      `Needs: ${classification.needs.join(", ") || "—"}`,
      `Looking for: ${classification.looking_for.join(", ") || "—"}`,
      `Has link/deck: ${classification.has_link ? "yes" : "no"}`,
      ``,
      `--- Routing ---`,
      routing.join(", "),
      `Priority: ${priority}`,
      ``,
      `--- What they're building ---`,
      a.what_building ?? "—",
      `Link: ${a.link ?? "—"}`,
      ``,
      sourceLine,
      idLine,
      `Timestamp: ${ts}`,
    ].join("\n");
  }

  if (body.room === "bring") {
    const a = body.answers ?? {};
    return [
      `Room: ${body.room}`,
      `Name: ${body.name ?? "—"}`,
      `Email: ${body.email}`,
      ``,
      `--- Classification ---`,
      `Roles: ${classification.roles.join(", ") || "—"}`,
      `Brings: ${classification.brings.join(", ") || "—"}`,
      ``,
      `--- Routing ---`,
      routing.join(", "),
      `Priority: ${priority}`,
      ``,
      `--- Contribution ---`,
      a.how_contribute ?? "—",
      ``,
      sourceLine,
      idLine,
      `Timestamp: ${ts}`,
    ].join("\n");
  }

  if (body.room === "seed") {
    const a = body.answers ?? {};
    return [
      `Room: ${body.room}`,
      `Name: ${body.name ?? "—"}`,
      `Email: ${body.email}`,
      ``,
      `--- Classification ---`,
      `Entity: ${classification.entity_type ?? "—"}`,
      `Interest: ${classification.interest_type.join(", ") || "—"}`,
      `Private conversation: ${classification.wants_private_conversation ? "YES" : "no"}`,
      ``,
      `--- Routing ---`,
      routing.join(", "),
      `Priority: ${priority}`,
      ``,
      `--- Participation level ---`,
      a.participation_level ?? "—",
      ``,
      sourceLine,
      idLine,
      `Timestamp: ${ts}`,
    ].join("\n");
  }

  if (body.room === "partner") {
    const a = body.answers ?? {};
    return [
      `Room: ${body.room}`,
      `Name: ${body.name ?? "—"}`,
      `Organization: ${a.org ?? "—"}`,
      `Email: ${body.email}`,
      `Market: ${body.market ?? "—"}`,
      ``,
      `--- Classification ---`,
      `Org type: ${classification.org_type.join(", ") || "—"}`,
      ``,
      `--- Routing ---`,
      routing.join(", "),
      `Priority: ${priority}`,
      ``,
      `--- Partnership ---`,
      a.partnership ?? "—",
      `Assets: ${a.assets ?? "—"}`,
      `Seeking: ${a.seeking ?? "—"}`,
      ``,
      sourceLine,
      idLine,
      `Timestamp: ${ts}`,
    ].join("\n");
  }

  // Belong (default)
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
    sourceLine,
    idLine,
    `Timestamp: ${ts}`,
  ].join("\n");
}

// ── Route handler ─────────────────────────────────────────────

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
  const routing = computeRouting(body, classification);
  const priority = computePriority(body, classification);

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
        subject: emailSubject(body),
        text: emailText(body, classification, routing, priority, id),
      });
    } catch (emailErr) {
      console.error("[/api/enter] Resend error:", emailErr.message);
    }
  } else {
    console.warn("[/api/enter] Resend env vars missing — notification email not sent");
  }

  return Response.json({ ok: true, id });
}
