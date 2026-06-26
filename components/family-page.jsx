"use client";

import FamilyModal from "@/components/family-modal";
import { useCallback, useEffect, useRef, useState } from "react";
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

const publishedSorted = [...features]
  .filter((f) => f.published === true)
  .sort((a, b) => {
    if (a.slug === "noam-polinger") return -1;
    if (b.slug === "noam-polinger") return 1;
    return new Date(b.publishedDate) - new Date(a.publishedDate);
  });

// ── Wall Tile ─────────────────────────────────────────────────────────────────

function WallTile({ feature, delay, preRevealed, onOpen }) {
  const tileRef = useRef(null);

  const cls = [
    "wall-tile",
    "home-reveal",
    preRevealed ? "home-revealed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    onOpen(feature.slug, tileRef.current);
  };

  return (
    <a
      ref={tileRef}
      href={`/family/${feature.slug}`}
      className={cls}
      aria-label={`View ${feature.name}'s profile`}
      data-slug={feature.slug}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={handleClick}
    >
      <div className="wall-tile__inner">
        <div
          className="wall-tile__img"
          style={
            feature.heroImage
              ? { backgroundImage: `url(${feature.heroImage})` }
              : undefined
          }
        />
        <div className="wall-tile__veil" aria-hidden="true" />
        <div className="wall-tile__quote">
          <p>{feature.pullQuote}</p>
        </div>
        <div className="wall-tile__labels">
          <span className="wall-tile__cat">{feature.category}</span>
          <p className="wall-tile__name">{feature.name}</p>
          <p className="wall-tile__role">{feature.title}</p>
          <p className="wall-tile__byline">{feature.byline}</p>
        </div>
        <span className="wall-tile__read" aria-hidden="true">
          View →
        </span>
      </div>
    </a>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FamilyPage({ initialOpenSlug }) {
  const [query, setQuery] = useState("");
  const [openSlug, setOpenSlug] = useState(null);
  const revealedRef = useRef(new Set());
  const [, forceReveal] = useState(0);
  const triggerRef = useRef(null);

  // ── Modal open / close ───────────────────────────────────────────────────

  const openModal = useCallback((slug, triggerEl) => {
    triggerRef.current = triggerEl || null;
    setOpenSlug(slug);
    window.history.pushState(null, "", `/family/${slug}`);
  }, []);

  const closeModal = useCallback(() => {
    const trigger = triggerRef.current;
    triggerRef.current = null;
    setOpenSlug(null);
    window.history.pushState(null, "", "/family");
    if (trigger) trigger.focus();
  }, []);

  // Scroll lock — mirrors openSlug state; also cleans up on unmount
  useEffect(() => {
    document.body.style.overflow = openSlug ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openSlug]);

  // Open on initial slug (direct URL visit to /family/[slug])
  useEffect(() => {
    if (initialOpenSlug) setOpenSlug(initialOpenSlug);
  }, [initialOpenSlug]);

  // Browser Back closes modal
  useEffect(() => {
    const handlePopState = () => {
      if (!window.location.pathname.startsWith("/family/")) {
        setOpenSlug(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // ── Scroll reveal (mount-only) ───────────────────────────────────────────

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
  }, []);

  // ── Scroll progress bar ──────────────────────────────────────────────────

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

  // ── Derived ──────────────────────────────────────────────────────────────

  const filtered = query
    ? publishedSorted.filter((f) => matchesSearch(f, query))
    : publishedSorted;

  const selectedFeature = openSlug
    ? (publishedSorted.find((f) => f.slug === openSlug) ?? null)
    : null;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <main className="page-main featured-page" style={{ position: "relative" }}>

      <div className="feat-progress-track" aria-hidden="true">
        <div id="feat-progress-bar" className="feat-progress-bar" />
      </div>

      <div className="home-grain" aria-hidden="true" />
      <div className="home-bloom-cool" aria-hidden="true" style={{ top: "-5vh", left: "-10vw" }} />
      <div className="home-bloom-warm" aria-hidden="true" style={{ top: "35vh", right: "-5vw" }} />
      <div className="home-bloom-gold" aria-hidden="true" style={{ bottom: "5vh", left: "10vw" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        <section className="wall-top">
          <p className="wall-top__eyebrow">FAMILY</p>
          <h1 className="wall-top__headline">The Family</h1>
          <p className="wall-top__sub">
            Founders, creators, leaders, and friends who make Home feel like home.
          </p>
        </section>

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
                x1="9.5" y1="9.5" x2="13" y2="13"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              className="wall-search-input"
              placeholder="Search by name, role, or keyword"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search the family"
            />
          </div>
        </div>

        {publishedSorted.length === 0 && (
          <p className="wall-empty-build">
            The wall is being built. The first features arrive soon.
          </p>
        )}

        {publishedSorted.length > 0 && query && filtered.length === 0 && (
          <p className="wall-empty">Nothing here yet — try another word.</p>
        )}

        {filtered.length > 0 && (
          <div className="wall-grid">
            {filtered.map((f, i) => (
              <WallTile
                key={f.slug}
                feature={f}
                delay={i * 100}
                preRevealed={revealedRef.current.has(f.slug)}
                onOpen={openModal}
              />
            ))}
          </div>
        )}

        <section className="feat-closing home-reveal">
          <p className="feat-closing-text">
            Want to be featured? We publish the people and companies we are already in relationship
            with. Start there.
          </p>
        </section>

      </div>

      {selectedFeature && (
        <FamilyModal feature={selectedFeature} onClose={closeModal} />
      )}

    </main>
  );
}
