"use client";

import Link from "next/link";
import { useEffect } from "react";
import stories from "@/content/stories";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatMonthYear(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatMonthDayYear(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function EditorialDivider() {
  return <hr className="stories-divider" aria-hidden="true" />;
}

function LeadStory({ story }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="stories-lead home-reveal"
      aria-label={`Read "${story.title}"`}
    >
      <div className="stories-lead__image-col">
        {story.heroImage ? (
          <img src={story.heroImage} alt={story.title} className="stories-lead__img" />
        ) : (
          <div className="stories-lead__img-placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="stories-lead__label-col">
        <p className="stories-lead__category">{story.category}</p>
        <h2 className="stories-lead__title">{story.title}</h2>
        <p className="stories-lead__byline">
          By Noam Polinger &middot; {formatMonthYear(story.publishedDate)}
        </p>
        {story.readTime && (
          <p className="stories-lead__readtime">{story.readTime}</p>
        )}
        <p className="stories-lead__excerpt">{story.excerpt}</p>
        <span className="stories-lead__read-link" aria-hidden="true">
          Read the essay <span className="stories-lead__arrow">→</span>
        </span>
      </div>
    </Link>
  );
}

function SecondaryCard({ story, delay = 0 }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="stories-secondary-card home-reveal"
      style={{ transitionDelay: `${delay}ms` }}
      aria-label={`Read "${story.title}"`}
    >
      <div className="stories-secondary-card__image">
        {story.heroImage && (
          <img src={story.heroImage} alt={story.title} />
        )}
      </div>
      <div className="stories-secondary-card__body">
        <p className="stories-secondary-card__category">{story.category}</p>
        <h3 className="stories-secondary-card__title">{story.title}</h3>
        <p className="stories-secondary-card__byline">
          By Noam Polinger &middot; {formatMonthYear(story.publishedDate)}
        </p>
        <p className="stories-secondary-card__excerpt">{story.excerpt}</p>
        <span className="stories-secondary-card__read-link" aria-hidden="true">Read →</span>
      </div>
    </Link>
  );
}

function GridCard({ story, delay = 0 }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="stories-grid-card home-reveal"
      style={{ transitionDelay: `${delay}ms` }}
      aria-label={`Read "${story.title}"`}
    >
      <div className="stories-grid-card__image">
        {story.heroImage && (
          <img src={story.heroImage} alt={story.title} />
        )}
      </div>
      <div className="stories-grid-card__body">
        <p className="stories-grid-card__category">{story.category}</p>
        <h3 className="stories-grid-card__title">{story.title}</h3>
        <p className="stories-grid-card__meta">
          By Noam Polinger &middot; {formatMonthDayYear(story.publishedDate)} &middot; {story.readTime}
        </p>
      </div>
    </Link>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function StoriesPage() {
  const sorted = [...stories].sort(
    (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
  );

  const [lead, second, third, ...rest] = sorted;
  const secondaries = [second, third].filter(Boolean);
  const gridStories = rest.slice(0, 6);
  const hasMore = rest.length > 6;

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
    <main className="page-main" style={{ position: "relative" }}>

      <div className="home-grain" aria-hidden="true" />
      <div className="home-bloom-cool" aria-hidden="true" style={{ top: "-5vh", left: "-10vw" }} />
      <div className="home-bloom-warm" aria-hidden="true" style={{ top: "45vh", right: "-8vw" }} />
      <div className="home-bloom-gold" aria-hidden="true" style={{ bottom: "5vh", left: "5vw" }} />

      {/* ── Header Band ── */}
      <section className="stories-hero" aria-label="Stories header">
        <div className="container">
          <p className="stories-hero__eyebrow home-reveal">Stories</p>
          <h1 className="stories-hero__headline home-reveal" style={{ transitionDelay: "80ms" }}>
            The Library
          </h1>
          <p className="stories-hero__sub home-reveal" style={{ transitionDelay: "160ms" }}>
            Essays, dispatches, and reflections from inside the work. A growing collection of thinking from HOME.
          </p>
        </div>
      </section>

      <div className="container stories-body" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Empty state ── */}
        {sorted.length === 0 && (
          <p className="stories-empty">
            The library is being written. The first essays arrive soon.
          </p>
        )}

        {/* ── Lead Story ── */}
        {lead && <LeadStory story={lead} />}

        {/* ── Secondary Stories ── */}
        {secondaries.length > 0 && (
          <>
            <EditorialDivider />
            <div className="stories-secondary">
              {secondaries.map((story, i) => (
                <SecondaryCard key={story.slug} story={story} delay={i * 120} />
              ))}
            </div>
          </>
        )}

        {/* ── Flowing Grid ── */}
        {gridStories.length > 0 && (
          <>
            <EditorialDivider />
            <div className="stories-grid">
              {gridStories.map((story, i) => (
                <GridCard key={story.slug} story={story} delay={i * 80} />
              ))}
            </div>
          </>
        )}

        {/* ── Archive link ── */}
        {hasMore && (
          <div className="stories-archive-cta home-reveal">
            <Link href="/stories/archive" className="stories-archive-link">
              View the full archive →
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}
