"use client";

import Link from "next/link";
import { useEffect } from "react";
import { features } from "@/content/features";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr || dateStr.startsWith("[")) return dateStr;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

// ── Derived data ──────────────────────────────────────────────────────────────

const founderSpotlight = features.find(
  (f) => f.type === "founder" && f.status === "featured"
);
const founderRows = features.filter(
  (f) => f.type === "founder" && f.status === "standard"
);
const companySpotlight = features.find(
  (f) => f.type === "company" && f.status === "featured"
);
const companyRows = features.filter(
  (f) => f.type === "company" && f.status === "standard"
);

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
          <p className="feat-spotlight-eyebrow">Newest Feature</p>
          <h3 className="feat-spotlight-name">{item.name}</h3>
          <p className="feat-byline">{item.byline}</p>
        </div>

        <p className="feat-spotlight-role">{item.title}</p>
        <p className="feat-spotlight-quote">{item.pullQuote}</p>
        <p className="feat-spotlight-excerpt">{item.excerpt}</p>
        <Link href={`/featured/${item.slug}`} className="feat-read-link">
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
        <p className="feat-row-date">{formatDate(item.publishedDate)}</p>
        <p className="feat-row-name">{item.name}</p>
        <p className="feat-row-desc">{item.excerpt}</p>
      </div>
      <Link href={`/featured/${item.slug}`} className="feat-row-link">
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

          {founderSpotlight && (
            <div className="feat-spotlight-wrap home-reveal">
              <div className="feat-spotlight-glow feat-spotlight-glow--cool" aria-hidden="true" />
              <SpotlightCard item={founderSpotlight} variant="founder" />
            </div>
          )}

          <div className="feat-editorial-list">
            {founderRows.map((row, i) => (
              <EditorialRow key={row.slug} item={row} warm={false} delay={i * 120} />
            ))}
          </div>
        </section>

        {/* ── COMPANIES SECTION ── */}
        <section className="feat-section">
          <SectionBand
            headline="Companies"
            subtext="The ventures building the relational future. New features published regularly."
          />

          {companySpotlight && (
            <div className="feat-spotlight-wrap home-reveal">
              <div className="feat-spotlight-glow feat-spotlight-glow--warm" aria-hidden="true" />
              <SpotlightCard item={companySpotlight} variant="company" />
            </div>
          )}

          <div className="feat-editorial-list">
            {companyRows.map((row, i) => (
              <EditorialRow key={row.slug} item={row} warm={true} delay={i * 120} />
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
