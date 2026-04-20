"use client";

import Link from "next/link";
import { useEffect } from "react";
import stories from "@/content/stories";

// ── Reading path groups ───────────────────────────────────────────────────────

const GROUPS = [
  {
    kind: "essay",
    label: "Essays",
    description:
      "Closer, more reflective writing on belonging, taste, and the private conditions of clarity.",
  },
  {
    kind: "dispatch",
    label: "Dispatches",
    description:
      "Long-form editorial pieces that frame the emotional climate around serious work.",
  },
  {
    kind: "reflection",
    label: "Reflections",
    description:
      "Portraits of founders, patrons, and institutions whose tone matters as much as their output.",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatMeta(story) {
  const date = new Date(story.publishedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return `${story.byline} / ${date} / ${story.readTime}`;
}

function coverStyle(story) {
  if (story.heroImage) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(20,18,16,0.18), rgba(20,18,16,0.48)), url(${story.heroImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  return { background: "var(--surface-hi)" };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StoryHairline() {
  return <div className="stor-hairline" aria-hidden="true" />;
}

function CollectionCard({ story, delay = 0 }) {
  return (
    <article className="stor-card home-reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="stor-card-header">
        <span className="stor-card-category">{story.category}</span>
      </div>
      <h3 className="stor-card-title">{story.title}</h3>
      <p className="stor-card-byline">{formatMeta(story)}</p>
      <p className="stor-card-excerpt">{story.excerpt}</p>
      <Link href={`/stories/${story.slug}`} className="stor-read-link">Read →</Link>
    </article>
  );
}

function GroupCard({ group, delay = 0 }) {
  return (
    <article className="stor-card home-reveal" style={{ transitionDelay: `${delay}ms` }}>
      <p className="stor-card-category">{group.label}</p>
      <p className="stor-group-desc">{group.description}</p>
      <div className="stor-group-links">
        {group.items.map((story) => (
          <Link key={story.slug} href={`/stories/${story.slug}`} className="stor-group-link">
            {story.title}
          </Link>
        ))}
      </div>
    </article>
  );
}

function ArchiveEntry({ story, delay = 0 }) {
  return (
    <article className="stor-card home-reveal" style={{ transitionDelay: `${delay}ms` }}>
      <span className="stor-card-category">{story.category}</span>
      <h3 className="stor-card-title stor-card-title--sm">{story.title}</h3>
      <p className="stor-card-byline">
        {new Date(story.publishedDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <p className="stor-card-excerpt">{story.excerpt}</p>
      <Link href={`/stories/${story.slug}`} className="stor-read-link">Read →</Link>
    </article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function StoriesPage() {
  const [featured, ...curated] = stories;

  const groupedStories = GROUPS.map((group) => ({
    ...group,
    items: stories.filter((s) => s.kind === group.kind),
  }));

  const archive = stories.slice(-3);

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
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );

    document.querySelectorAll(".home-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-main" style={{ position: "relative" }}>

      {/* ── Grain texture overlay ── */}
      <div className="home-grain" aria-hidden="true" />

      {/* ── Atmospheric blooms — cool upper-left, gold lower-right ── */}
      <div
        className="home-bloom-cool"
        aria-hidden="true"
        style={{ top: "-5vh", left: "-10vw" }}
      />
      <div
        className="home-bloom-gold"
        aria-hidden="true"
        style={{ bottom: "5vh", right: "-5vw" }}
      />

      {/* ── HERO — multi-color gradient border matching Philosophy ── */}
      <section className="stor-hero">
        <div className="stor-hero__wrap">
          <div className="stor-hero__glow" aria-hidden="true" />
          <div className="stor-hero__container home-reveal">
            <p className="stor-hero__eyebrow">Dispatches from HOME</p>
            <h1 className="stor-hero__title">Stories</h1>
            <p className="stor-hero__sub">
              Essays, reflections, and dispatches from the people and places building a more relational world.
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Hairline between hero and featured ── */}
        <StoryHairline />

        {/* ── FEATURED STORY ── */}
        {featured && (
          <section className="stor-featured home-reveal">
            <div className="stor-featured__copy">
              <p className="stor-card-category">Featured Story</p>
              <p className="stor-card-byline">{formatMeta(featured)}</p>
              <h2 className="stor-featured__title">{featured.title}</h2>
              <p className="stor-featured__excerpt">{featured.excerpt}</p>
              <Link href={`/stories/${featured.slug}`} className="stor-read-link">
                Read →
              </Link>
            </div>
            <div
              className="stor-featured__visual"
              style={coverStyle(featured)}
            />
          </section>
        )}

        {/* ── Hairline ── */}
        <StoryHairline />

        {/* ── STORY COLLECTION ── */}
        <section className="stor-section">
          <p className="stor-section-label home-reveal">Story collection</p>
          <h2 className="stor-section-heading home-reveal">
            Pieces arranged with editorial hierarchy instead of a feed.
          </h2>
          <StoryHairline />
          <div className="stor-grid">
            {curated.map((story, i) => (
              <CollectionCard key={story.slug} story={story} delay={i * 120} />
            ))}
          </div>
        </section>

        {/* ── Hairline ── */}
        <StoryHairline />

        {/* ── READING PATHS ── */}
        <section className="stor-section">
          <p className="stor-section-label home-reveal">Reading paths</p>
          <h2 className="stor-section-heading home-reveal">
            Subtle groupings for the kinds of stories gathered here.
          </h2>
          <StoryHairline />
          <div className="stor-grid stor-grid--3">
            {groupedStories.map((group, i) => (
              <GroupCard key={group.kind} group={group} delay={i * 120} />
            ))}
          </div>
        </section>

        {/* ── Hairline ── */}
        <StoryHairline />

        {/* ── ARCHIVE ── */}
        <section className="stor-section">
          <p className="stor-section-label home-reveal">Archive</p>
          <h2 className="stor-section-heading home-reveal">
            Explore further into the editorial world.
          </h2>
          <StoryHairline />
          <div className="stor-grid stor-grid--3">
            {archive.map((story, i) => (
              <ArchiveEntry key={story.slug} story={story} delay={i * 120} />
            ))}
          </div>
        </section>

        {/* ── Hairline ── */}
        <StoryHairline />

        {/* ── CLOSING NOTE ── */}
        <section className="stor-closing home-reveal">
          <p className="stor-closing__note">
            Have a story to tell? Stories find us through relationship, not submission forms. Start there.
          </p>
        </section>

      </div>
    </main>
  );
}
