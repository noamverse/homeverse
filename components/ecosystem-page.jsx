"use client";

import { useEffect } from "react";
import Link from "next/link";
import HomeFlywheel from "./home-flywheel";

// ── Data ─────────────────────────────────────────────────────────────────────

const BRANCHES = [
  {
    id: "ventures",
    name: "HOME Ventures",
    status: "ACTIVE",
    tone: "active",
    thesis: "Capital for a more human world.",
    description:
      "A venture studio investing in, developing, and amplifying founders and companies who make life feel more human, relational, and alive. Includes The HOME Fund and The Feminine Fund.",
    anchor: "#ventures",
  },
  {
    id: "engine",
    name: "HOME Engine",
    status: "EMERGING",
    tone: "emerging",
    thesis: "Incubation for creative founders beyond tech.",
    description:
      "An institutional partner designed to equip founders and builders with the resources, systems, relationships, education, and strategic support they need to scale with clarity and power.",
    anchor: "#engine",
  },
  {
    id: "fellowship",
    name: "HOME Fellowship",
    status: "ACTIVE",
    tone: "active",
    thesis: "Come as you are, leave even more yourself.",
    description:
      "Dinners, retreats, game nights, summits, and galas built on one principle: come as you are, leave even more yourself. No obligations. No agendas. Just family.",
    anchor: "#fellowship",
  },
  {
    id: "hospitality",
    name: "HOME Hospitality",
    status: "FORMING",
    tone: "forming",
    thesis: "The flavor of HOME.",
    description:
      "A portfolio of hospitality brands — fine dining, neighborhood concepts, and experiences — designed so every room feels like a place you belong.",
    anchor: "#hospitality",
  },
  {
    id: "ai",
    name: "HOME AI",
    status: "ACTIVE",
    tone: "active",
    thesis: "Intelligence, made human.",
    description:
      "Our AI studio. We build the tools that make every other arm of the ecosystem more intelligent, more efficient, and more deeply relational.",
    anchor: "#ai",
  },
  {
    id: "base",
    name: "HOME Base",
    status: "FORMING",
    tone: "forming",
    thesis: "Physical spaces where the ecosystem comes alive.",
    description:
      "Multi-purpose buildings in major cities — coworking, events, content studios, food halls, offices, and in-house services — designed as homes for founders, not as real estate.",
    anchor: "#base",
  },
];

const COMPOUND_NODES = [
  {
    label: "RELATIONSHIP",
    desc: "Someone enters the ecosystem through a real relationship.",
    color: "#4a7fcf",
  },
  {
    label: "STORY",
    desc: "We see them, listen to them, and relate to them.",
    color: "#7c5cbf",
  },
  {
    label: "DISTRIBUTION",
    desc: "Their story travels through our platform and ecosystem.",
    color: "#d4763b",
  },
  {
    label: "AMPLIFICATION",
    desc: "New people find them through us.",
    color: "#b43723",
  },
  {
    label: "CAPITAL",
    desc: "Belief-driven investment flows toward the aligned.",
    color: "#c9a84c",
  },
  {
    label: "INFRASTRUCTURE",
    desc: "We give them the tools, spaces, and network to scale.",
    color: "#e8e4dd",
  },
  {
    label: "BELONGING",
    desc: "They stay. They compound. They bring others home.",
    color: "#c9a84c",
  },
];

const BUILDING_NOW = [
  {
    name: "HOME Media Platform",
    desc: "The publishing and distribution layer you are standing in.",
  },
  {
    name: "HOME Fellowship",
    desc: "Dinners and gatherings forming the core community.",
  },
  {
    name: "HOME Ventures (initial deployments)",
    desc: "First syndicate investments in aligned founders.",
  },
  {
    name: "HOME AI (internal tools)",
    desc: "The tools that power every other arm.",
  },
];

const EMERGING_NEXT = [
  {
    name: "HOME Engine (first cohort)",
    desc: "Full incubation program launching in our first city.",
  },
  {
    name: "HOME Base (first location)",
    desc: "Scouting locations for our first physical flagship.",
  },
  {
    name: "The Feminine Fund",
    desc: "A dedicated vehicle for feminine founders.",
  },
  {
    name: "HOME Hospitality (first concept)",
    desc: "Bringing our first restaurant concept to reality.",
  },
];

const PATHWAYS = [
  {
    condition: "If you build",
    body: "We feature founders and companies we believe in. Start a relationship.",
    linkLabel: "Write to us →",
    // TODO: Verify email is active once Cloudflare Email Routing is configured
    href: "mailto:hello@homeverse.family",
    external: false,
  },
  {
    condition: "If you invest",
    body: "We work with aligned capital. Share what you believe in, and why.",
    linkLabel: "Tell us your thesis →",
    // TODO: Verify email is active once Cloudflare Email Routing is configured
    href: "mailto:hello@homeverse.family?subject=Investment Thesis",
    external: false,
  },
  {
    condition: "If you gather",
    body: "Fellowship is how HOME lives in the world. You are welcome at the table.",
    linkLabel: "Join a gathering →",
    // TODO: Verify email is active once Cloudflare Email Routing is configured
    href: "mailto:hello@homeverse.family?subject=Fellowship Gathering",
    external: false,
  },
  {
    condition: "If you're becoming",
    body: "HOME is a way of being before it is anywhere you go. Read, subscribe, and keep reading.",
    linkLabel: "Follow along →",
    href: "https://www.threads.com/@noamverse",
    external: true,
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EcosystemPage() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("home-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );

    document.querySelectorAll(".home-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-main eco-page" style={{ position: "relative" }}>

      {/* ── Grain + Blooms ── */}
      <div className="home-grain" aria-hidden="true" />
      <div className="home-bloom-cool" aria-hidden="true" style={{ top: "-8vh", left: "-12vw" }} />
      <div className="home-bloom-warm" aria-hidden="true" style={{ top: "38vh", right: "-6vw" }} />
      <div className="home-bloom-gold" aria-hidden="true" style={{ bottom: "8vh", left: "8vw" }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══ SECTION 1 — HERO ══════════════════════════════════════════ */}
        <section className="eco-hero home-reveal">
          <div className="eco-hero__wrap">
            <div className="eco-hero__glow" aria-hidden="true" />
            <div className="eco-hero__container">
              <p className="eco-hero__eyebrow">The Map</p>
              <h1 className="eco-hero__title">The HOME Ecosystem</h1>
              <p className="eco-hero__sub">
                HOME is not a company. It is an ecosystem — a living constellation of vehicles
                through which one mission expresses itself: life is a family, not a marketplace.
              </p>
            </div>
          </div>
        </section>

        {/* ══ SECTION 2 — FLYWHEEL ══════════════════════════════════════ */}
        <section className="eco-flywheel-section">
          <div className="eco-flywheel-bloom" aria-hidden="true" />
          <div className="eco-flywheel-inner home-reveal">
            <HomeFlywheel />
          </div>
        </section>

        {/* ══ SECTION 3 — MAJOR BRANCHES ═══════════════════════════════ */}
        <section className="eco-branches">
          <div className="container">

            <div className="eco-section-band home-reveal">
              <div className="eco-section-rule" aria-hidden="true" />
              <p className="eco-eyebrow">The Constellation</p>
              <h2 className="eco-section-title">Major Branches</h2>
              <p className="eco-section-sub">
                Each branch is a distinct expression of one principle. Every arm feeds the others.
              </p>
              <div className="eco-section-rule" aria-hidden="true" />
            </div>

            <div className="eco-branch-list" role="list">
              {BRANCHES.map((branch, i) => (
                <article
                  key={branch.id}
                  id={branch.id}
                  className="eco-branch-row home-reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                  role="listitem"
                >
                  <div className="eco-branch-left">
                    <span className="eco-branch-name">{branch.name}</span>
                    <span className={`eco-branch-status eco-branch-status--${branch.tone}`}>
                      {branch.status}
                    </span>
                  </div>
                  <div className="eco-branch-mid">
                    <p className="eco-branch-thesis">{branch.thesis}</p>
                    <p className="eco-branch-desc">{branch.description}</p>
                  </div>
                  <Link href={branch.anchor} className="eco-branch-link">
                    Learn more →
                  </Link>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* ══ SECTION 4 — HOW IT COMPOUNDS ═════════════════════════════ */}
        <section className="eco-compounds">

          <div className="container">
            <div className="eco-section-band home-reveal">
              <div className="eco-section-rule" aria-hidden="true" />
              <p className="eco-eyebrow">The Mechanism</p>
              <h2 className="eco-section-title">How It Compounds</h2>
              <p className="eco-section-sub">
                Every arm of HOME feeds the others. Relationships deepen, stories multiply,
                capital compounds, and belonging scales.
              </p>
              <div className="eco-section-rule" aria-hidden="true" />
            </div>
          </div>

          <div className="eco-loop-scroll">
            <div className="eco-loop home-reveal">
              {COMPOUND_NODES.map((node, i) => (
                <div key={node.label} className="eco-loop-track">
                  <div
                    className="eco-node"
                    style={{ animationDelay: `${i * 0.65}s` }}
                  >
                    <div
                      className="eco-node__dot"
                      style={{
                        background: `radial-gradient(ellipse at 38% 38%, ${node.color} 0%, ${node.color}55 55%, transparent 100%)`,
                        boxShadow: `0 0 20px ${node.color}55, 0 0 40px ${node.color}22`,
                      }}
                    />
                    <p className="eco-node__label">{node.label}</p>
                    <p className="eco-node__desc">{node.desc}</p>
                  </div>

                  {i < COMPOUND_NODES.length - 1 && (
                    <div className="eco-connector" aria-hidden="true">
                      <div className="eco-connector__track">
                        <span
                          className="eco-connector__pulse"
                          style={{ animationDelay: `${i * 1.0}s` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            <p className="eco-loop-coda home-reveal">
              And then — it begins again. Deeper every time.
            </p>
          </div>

        </section>

        {/* ══ SECTION 5 — CURRENT & EMERGING ═══════════════════════════ */}
        <section className="eco-current">
          <div className="container">

            <div className="eco-section-band home-reveal">
              <div className="eco-section-rule" aria-hidden="true" />
              <p className="eco-eyebrow">Where We Are</p>
              <h2 className="eco-section-title">Current &amp; Emerging</h2>
              <p className="eco-section-sub">
                We believe in transparency. Here is what we are actively building, and what
                is taking shape next.
              </p>
              <div className="eco-section-rule" aria-hidden="true" />
            </div>

            <div className="eco-current-split">
              <div className="eco-current-col home-reveal">
                <p className="eco-col-header">Building Now</p>
                <div className="eco-col-items">
                  {BUILDING_NOW.map((item) => (
                    <div key={item.name} className="eco-col-item">
                      <p className="eco-col-item__name">{item.name}</p>
                      <p className="eco-col-item__desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="eco-current-divider" aria-hidden="true" />

              <div className="eco-current-col home-reveal" style={{ transitionDelay: "200ms" }}>
                <p className="eco-col-header">Emerging Next</p>
                <div className="eco-col-items">
                  {EMERGING_NEXT.map((item) => (
                    <div key={item.name} className="eco-col-item">
                      <p className="eco-col-item__name">{item.name}</p>
                      <p className="eco-col-item__desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══ SECTION 6 — WAYS TO RELATE ═══════════════════════════════ */}
        <section className="eco-relate">
          <div className="container">

            <div className="eco-section-band home-reveal">
              <div className="eco-section-rule" aria-hidden="true" />
              <p className="eco-eyebrow">You Are Invited</p>
              <h2 className="eco-section-title eco-section-title--narrow">Ways To Relate</h2>
              <p className="eco-relate-intro">
                HOME does not onboard customers. It welcomes people. If any of this resonates,
                here is how you can begin:
              </p>
              <div className="eco-section-rule" aria-hidden="true" />
            </div>

            <div className="eco-pathways">
              {PATHWAYS.map((pathway, i) => (
                <div
                  key={pathway.condition}
                  className="eco-pathway home-reveal"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <p className="eco-pathway__body">
                    <em className="eco-pathway__condition">{pathway.condition}:</em>{" "}
                    {pathway.body}
                  </p>
                  {pathway.external ? (
                    <a href={pathway.href} className="eco-pathway__link" target="_blank" rel="noopener noreferrer">
                      {pathway.linkLabel}
                    </a>
                  ) : (
                    <a href={pathway.href} className="eco-pathway__link">
                      {pathway.linkLabel}
                    </a>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══ SECTION 7 — CLOSING NOTE ══════════════════════════════════ */}
        <section className="eco-closing home-reveal">
          <div className="eco-closing__glow" aria-hidden="true" />
          <p className="eco-closing__title">
            This is not a company you join. It is a world organizing itself around a simple idea.
          </p>
          <p className="eco-closing__coda">
            Life is a family, not a marketplace.
          </p>
        </section>

      </div>
    </main>
  );
}
