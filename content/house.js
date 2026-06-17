export const house = {
  nodes: [
    // ── Penthouse ────────────────────────────────────────────────
    { name: "Fund",        role: "capital",           href: null,          status: "soon", tier: "penthouse" },
    { name: "Embassy",     role: "the world",         href: null,          status: "soon", tier: "penthouse" },
    // ── Upper floors ─────────────────────────────────────────────
    { name: "Engine",      role: "incubate",          href: null,          status: "soon", tier: "upper" },
    { name: "Translation", role: "legibility",        href: null,          status: "soon", tier: "upper" },
    { name: "Studio",      role: "media",             href: null,          status: "soon", tier: "upper" },
    // ── Fellowship tier ──────────────────────────────────────────
    { name: "Fellowship",  role: "gather",            href: null,          status: "soon", tier: "fellowship" },
    { name: "Foundation",  role: "grace",             href: null,          status: "soon", tier: "fellowship" },
    // ── Lobby — the lit floor ────────────────────────────────────
    { name: "The Lobby",   role: "the center",        href: "/",           status: "open", tier: "lobby" },
    // ── The five doors off the Lobby ─────────────────────────────
    { name: "Belong",      role: "living room",       href: "/belong",     status: "open", tier: "door" },
    { name: "Build",       role: "workshop",          href: "/build",      status: "open", tier: "door" },
    { name: "Bring",       role: "salon",             href: "/bring",      status: "open", tier: "door" },
    { name: "Seed",        role: "garden",            href: "/seed",       status: "open", tier: "door" },
    { name: "Partner",     role: "boardroom",         href: "/partner",    status: "open", tier: "door" },
    // ── Root / Base ──────────────────────────────────────────────
    { name: "The Tree",    role: "the living ledger", href: null,          status: "soon", tier: "root" },
    // ── Public pages ─────────────────────────────────────────────
    { name: "Philosophy",  role: null,                href: "/philosophy", status: "open", tier: "public" },
    { name: "Family",      role: null,                href: "/family",     status: "open", tier: "public" },
    { name: "Stories",     role: null,                href: "/stories",    status: "open", tier: "public" },
    { name: "Ecosystem",   role: null,                href: "/ecosystem",  status: "open", tier: "public" },
  ],
};
