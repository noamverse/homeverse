"use client";

import Link from "next/link";
import { useEffect } from "react";

// ── Placeholder data ──────────────────────────────────────────────────────────

const founderSpotlight = {
  eyebrow: "Newest Feature",
  name: "[Founder Name]",
  role: "[Role], [Company]",
  quote: "[A short resonant quote from the founder that captures their relational philosophy.]",
  excerpt:
    "[Opening paragraph of the feature article — a few sentences that draw the reader into who this person is and why they are worth knowing. Keep the tone warm and editorial.]",
  href: "/featured",
  readTime: "7 min read", // TODO: Update when article is published
  byline: "Profile by [Writer Name]", // TODO: Update when writer is assigned
};

// TODO: Replace with real founder features as they are published
const founderRows = [
  {
    date: "[Month Year]",
    name: "[Founder Name]",
    desc: "[One-line pitch of the feature — what makes this person worth reading about.]",
    href: "/featured",
    category: "FOUNDER PROFILE",
  },
  {
    date: "[Month Year]",
    name: "[Founder Name]",
    desc: "[One-line pitch of the feature — what makes this person worth reading about.]",
    href: "/featured",
    category: "IN CONVERSATION",
  },
  {
    date: "[Month Year]",
    name: "[Founder Name]",
    desc: "[One-line pitch of the feature — what makes this person worth reading about.]",
    href: "/featured",
    category: "BUILDER",
  },
  {
    date: "[Month Year]",
    name: "[Founder Name]",
    desc: "[One-line pitch of the feature — what makes this person worth reading about.]",
    href: "/featured",
    category: "NEW THIS WEEK",
  },
];

const companySpotlight = {
  eyebrow: "Newest Feature",
  name: "[Company Name]",
  role: "[Sector] · [Tagline]",
  quote: "[A short resonant line that captures the company's relational signature.]",
  excerpt:
    "[Opening paragraph of the feature — what this company is building, why it stands apart, and why HOME is amplifying it now. Editorial tone, not promotional.]",
  href: "/featured",
  readTime: "7 min read", // TODO: Update when article is published
  byline: "Profile by [Writer Name]", // TODO: Update when writer is assigned
};

// TODO: Replace with real company features as they are published
const companyRows = [
  {
    date: "[Month Year]",
    name: "[Company Name]",
    desc: "[One-line description of the company and what makes it worth knowing.]",
    href: "/featured",
    category: "COMPANY SPOTLIGHT",
  },
  {
    date: "[Month Year]",
    name: "[Company Name]",
    desc: "[One-line description of the company and what makes it worth knowing.]",
    href: "/featured",
    category: "IN CONVERSATION",
  },
  {
    date: "[Month Year]",
    name: "[Company Name]",
    desc: "[One-line description of the company and what makes it worth knowing.]",
    href: "/featured",
    category: "BUILDER",
  },
  {
    date: "[Month Year]",
    name: "[Company Name]",
    desc: "[One-line description of the company and what makes it worth knowing.]",
    href: "/featured",
    category: "NEW THIS WEEK",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionBand({ headline, subtext }) {
  return (
    <div className="feat-section-band home-reveal">
      <div className="feat-section-rule" aria-hidden="true" />
      <span className="feat-eyebrow">Featured</span>
      <h2 className="feat-headline">{headline}</h2>
      <p className="feat-subtext">{subtext}</p>
      <div className="feat-section-rule" aria-hidden="true" />
    </div>
  );
}

function SpotlightCard({ item, variant }) {
  const isCompany = variant === "company";
  return (
    <article className={`feat-spotlight-card feat-spotlight-card--${variant} home-glass`}>
      {/* TODO: Replace with actual photo (founder) or logo area (company) */}
      <div className={`feat-spotlight-image${isCompany ? " feat-spotlight-image--warm" : ""}`}>
        <div className="feat-spotlight-image__overlay" />
      </div>

      <div className="feat-spotlight-body">
        {/* Editorial chrome: FEATURE tag + read time */}
        <div className="feat-spotlight-header">
          <span className="feat-feature-tag">Feature</span>
          <span className="feat-read-time">{item.readTime}</span>
        </div>

        <div>
          <p className="feat-spotlight-eyebrow">{item.eyebrow}</p>
          <h3 className="feat-spotlight-name">{item.name}</h3>
          <p className="feat-byline">{item.byline}</p>
        </div>

        <p className="feat-spotlight-role">{item.role}</p>
        <p className="feat-spotlight-quote">{item.quote}</p>
        <p className="feat-spotlight-excerpt">{item.excerpt}</p>
        <Link href={item.href} className="feat-read-link">
          Read the feature →
        </Link>
      </div>
    </article>
  );
}

function EditorialRow({ item, warm, delay }) {
  return (
    <article
      className="feat-row home-reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="feat-row-left">
        <span className="feat-row-category">{item.category}</span>
        <div className={`feat-row-image${warm ? " feat-row-image--warm" : ""}`} />
      </div>
      <div className="feat-row-content">
        <p className="feat-row-date">{item.date}</p>
        <p className="feat-row-name">{item.name}</p>
        <p className="feat-row-desc">{item.desc}</p>
      </div>
      <Link href={item.href} className="feat-row-link">
        Read →
      </Link>
    </article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FeaturedPage() {
  // Reveal on scroll — respects prefers-reduced-motion
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
      { rootMargin: "-100px 0px 0px 0px", threshold: 0 }
    );

    document.querySelectorAll(".home-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById("feat-progress-bar");
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <main className="page-main featured-page" style={{ position: "relative" }}>

      {/* ── Scroll progress — thin multi-color bar at viewport top ── */}
      <div className="feat-progress-track" aria-hidden="true">
        <div id="feat-progress-bar" className="feat-progress-bar" />
      </div>

      {/* ── Grain texture overlay (fixed, viewport-wide) ── */}
      <div className="home-grain" aria-hidden="true" />

      {/* ── Atmospheric blooms — fixed so they read as ambient weather ── */}
      <div
        className="home-bloom-cool"
        aria-hidden="true"
        style={{ top: "-5vh", left: "-10vw" }}
      />
      <div
        className="home-bloom-warm"
        aria-hidden="true"
        style={{ top: "35vh", right: "-5vw" }}
      />
      <div
        className="home-bloom-gold"
        aria-hidden="true"
        style={{ bottom: "5vh", left: "10vw" }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO — clean spacing, no overlap class ── */}
        <section className="featured-intro">
          <div>
            <p className="home-section-label">Featured</p>
            <h1 className="featured-intro__title">Featured</h1>
          </div>
          <p className="featured-intro__line">
            People, companies, creators, and operators worth knowing through the editorial world of HOME.
          </p>
        </section>

        {/* ── FOUNDERS SECTION ── */}
        <section className="feat-section feat-section--first">
          <SectionBand
            headline="Founders"
            subtext="The people building a more relational world. New features published regularly."
          />

          <div className="feat-spotlight-wrap home-reveal">
            <div className="feat-spotlight-glow feat-spotlight-glow--cool" aria-hidden="true" />
            <SpotlightCard item={founderSpotlight} variant="founder" />
          </div>

          <div className="feat-editorial-list">
            {founderRows.map((row, i) => (
              <EditorialRow key={i} item={row} warm={false} delay={i * 120} />
            ))}
          </div>
        </section>

        {/* ── COMPANIES SECTION ── */}
        <section className="feat-section">
          <SectionBand
            headline="Companies"
            subtext="The ventures building the relational future. New features published regularly."
          />

          <div className="feat-spotlight-wrap home-reveal">
            <div className="feat-spotlight-glow feat-spotlight-glow--warm" aria-hidden="true" />
            <SpotlightCard item={companySpotlight} variant="company" />
          </div>

          <div className="feat-editorial-list">
            {companyRows.map((row, i) => (
              <EditorialRow key={i} item={row} warm={true} delay={i * 120} />
            ))}
          </div>
        </section>

        {/* ── CLOSING NOTE ── */}
        <section className="feat-closing home-reveal">
          <p className="feat-closing-text">
            Want to be featured? We publish the people and companies we are already in relationship
            with. Start there.
          </p>
        </section>

      </div>
    </main>
  );
}
