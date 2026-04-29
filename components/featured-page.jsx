"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { features } from "@/content/features";

// ── Helpers ───────────────────────────────────────────────────────────────────

function matchesSearch(f, q) {
  const text = [
    f.name,
    f.title,
    f.category,
    f.excerpt,
    f.pullQuote,
    Array.isArray(f.body) ? f.body.join(" ") : "",
  ]
    .join(" ")
    .toLowerCase();
  return text.includes(q.toLowerCase());
}

// Only published features, sorted newest first (computed once at module level)
const publishedSorted = [...features]
  .filter((f) => f.published === true)
  .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

// ── Wall Tile ─────────────────────────────────────────────────────────────────

function WallTile({ feature, delay, preRevealed }) {
  const cls = [
    "wall-tile",
    "home-reveal",
    preRevealed ? "home-revealed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={`/featured/${feature.slug}`}
      className={cls}
      aria-label={`Read ${feature.name}'s feature`}
      data-slug={feature.slug}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="wall-tile__inner">
        {/* Image layer */}
        <div
          className="wall-tile__img"
          style={
            feature.heroImage
              ? { backgroundImage: `url(${feature.heroImage})` }
              : undefined
          }
        />

        {/* Dark gradient overlay */}
        <div className="wall-tile__veil" aria-hidden="true" />

        {/* Pull quote — reveals on hover/focus */}
        <div className="wall-tile__quote">
          <p>{feature.pullQuote}</p>
        </div>

        {/* Persistent editorial labels */}
        <div className="wall-tile__labels">
          <span className="wall-tile__cat">{feature.category}</span>
          <p className="wall-tile__name">{feature.name}</p>
          <p className="wall-tile__role">{feature.title}</p>
          <p className="wall-tile__byline">{feature.byline}</p>
        </div>

        {/* Read affordance — reveals on hover/focus */}
        <span className="wall-tile__read" aria-hidden="true">
          Read →
        </span>
      </div>
    </Link>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FeaturedPage() {
  const [query, setQuery] = useState("");
  // Tracks slugs that have been revealed — persists across filter changes
  const revealedRef = useRef(new Set());
  const [, forceReveal] = useState(0);

  // Derived: published features matching current search query
  const filtered = query
    ? publishedSorted.filter((f) => matchesSearch(f, query))
    : publishedSorted;

  // Reveal on scroll — initial page load only, respects prefers-reduced-motion
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.dataset.slug;
            if (slug && !revealedRef.current.has(slug)) {
              revealedRef.current.add(slug);
              changed = true;
              observer.unobserve(entry.target);
            }
          }
        });
        if (changed) forceReveal((n) => n + 1);
      },
      { rootMargin: "-40px 0px 0px 0px", threshold: 0 }
    );

    document.querySelectorAll(".wall-tile[data-slug]").forEach((el) => {
      if (!revealedRef.current.has(el.dataset.slug)) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []); // Mount-only: initial reveal, never re-runs on filter changes

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

      {/* Scroll progress — thin multi-color bar at viewport top */}
      <div className="feat-progress-track" aria-hidden="true">
        <div id="feat-progress-bar" className="feat-progress-bar" />
      </div>

      {/* Grain texture overlay */}
      <div className="home-grain" aria-hidden="true" />

      {/* Atmospheric blooms */}
      <div className="home-bloom-cool" aria-hidden="true" style={{ top: "-5vh", left: "-10vw" }} />
      <div className="home-bloom-warm" aria-hidden="true" style={{ top: "35vh", right: "-5vw" }} />
      <div className="home-bloom-gold" aria-hidden="true" style={{ bottom: "5vh", left: "10vw" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* ── COLLAPSED TOP BAND ── */}
        <section className="wall-top">
          <p className="wall-top__eyebrow">FEATURED</p>
          <h1 className="wall-top__headline">The Family</h1>
          <p className="wall-top__sub">
            Founders, companies, and minds we believe in. Each face is a story. Each story is an
            invitation to know them.
          </p>
        </section>

        {/* ── SEARCH BAR ── */}
        <div className="wall-search-wrap">
          <div className="wall-search-field">
            <svg
              className="wall-search-icon"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <line
                x1="9.5"
                y1="9.5"
                x2="13"
                y2="13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              className="wall-search-input"
              placeholder="Search by name, role, or keyword"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search features"
            />
          </div>
        </div>

        {/* ── ZERO PUBLISHED FEATURES STATE ── */}
        {publishedSorted.length === 0 && (
          <p className="wall-empty-build">
            The wall is being built. The first features arrive soon.
          </p>
        )}

        {/* ── EMPTY SEARCH STATE ── */}
        {publishedSorted.length > 0 && query && filtered.length === 0 && (
          <p className="wall-empty">Nothing here yet — try another word.</p>
        )}

        {/* ── WALL OF FACES ── */}
        {filtered.length > 0 && (
          <div className="wall-grid">
            {filtered.map((f, i) => (
              <WallTile
                key={f.slug}
                feature={f}
                delay={i * 100}
                preRevealed={revealedRef.current.has(f.slug)}
              />
            ))}
          </div>
        )}

        {/* ── CLOSING NOTE (preserved) ── */}
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
