"use client";

import Link from "next/link";
import { useEffect } from "react";
import { articles, getArticleBySlug } from "@/lib/content";

// ── Placeholder data ──────────────────────────────────────────────────────────

const storyPlan = [
  {
    slug: "the-new-private-standard",
    label: "Featured story",
    collection: "Features",
    tone: "A defining editorial feature about atmosphere, restraint, and the builders shaping a quieter standard.",
  },
  {
    slug: "the-house-a-founder-builds",
    label: "Founder story",
    collection: "Company Stories",
    tone: "A founder portrait about the rooms institutions create and the moral texture of welcome.",
    layout: "portrait",
  },
  {
    slug: "after-the-noise",
    label: "Cultural observation",
    collection: "Features",
    tone: "A shorter cultural read on editorial calm, curation, and attention after urgency fatigue.",
    layout: "feature",
  },
  {
    slug: "building-homes-not-audiences",
    label: "Essay",
    collection: "Essays",
    tone: "An essay on relationship, belonging, and the refusal of audience logic.",
    layout: "essay",
  },
  {
    slug: "a-patron-sense-of-time",
    label: "Long-form portrait",
    collection: "Company Stories",
    tone: "A long-horizon piece about patronage, time, and protecting institutions that deserve to deepen.",
    layout: "portraitAlt",
  },
];

const thematicNotes = [
  {
    name: "Features",
    description: "Long-form editorial pieces that frame the emotional climate around serious work.",
  },
  {
    name: "Essays",
    description: "Closer, more reflective writing on belonging, taste, and the private conditions of clarity.",
  },
  {
    name: "Company Stories",
    description: "Portraits of founders, patrons, and institutions whose tone matters as much as their output.",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function coverStyle(article) {
  if (article.image) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(20,18,16,0.18), rgba(20,18,16,0.48)), url(${article.image})`,
    };
  }
  return { background: "var(--surface-hi)" };
}

function buildCollection() {
  return storyPlan
    .map((entry) => {
      const article = getArticleBySlug(entry.slug);
      if (!article) return null;
      return { ...entry, article };
    })
    .filter(Boolean);
}

function formatMeta(article) {
  return `${article.author} / ${article.date} / ${article.readTime}`;
}

function StoryLink({ article, children, className }) {
  return (
    <Link href={`/articles/${article.slug}`} className={className}>
      {children}
    </Link>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StoryHairline() {
  return <div className="stor-hairline" aria-hidden="true" />;
}

function CollectionCard({ item, delay = 0 }) {
  const { article, label } = item;
  return (
    <article className="stor-card home-reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="stor-card-header">
        <span className="stor-card-category">{label}</span>
        <span className="stor-card-meta">{article.category}</span>
      </div>
      <h3 className="stor-card-title">{article.title}</h3>
      <p className="stor-card-byline">{formatMeta(article)}</p>
      <p className="stor-card-excerpt">{article.excerpt}</p>
      <StoryLink article={article} className="stor-read-link">Read →</StoryLink>
    </article>
  );
}

function GroupCard({ group, delay = 0 }) {
  return (
    <article className="stor-card home-reveal" style={{ transitionDelay: `${delay}ms` }}>
      <p className="stor-card-category">{group.name}</p>
      <p className="stor-group-desc">{group.description}</p>
      <div className="stor-group-links">
        {group.items.map((item) => (
          <StoryLink key={item.article.slug} article={item.article} className="stor-group-link">
            {item.article.title}
          </StoryLink>
        ))}
      </div>
    </article>
  );
}

function ArchiveEntry({ article, delay = 0 }) {
  return (
    <article className="stor-card home-reveal" style={{ transitionDelay: `${delay}ms` }}>
      <span className="stor-card-category">{article.category}</span>
      <h3 className="stor-card-title stor-card-title--sm">{article.title}</h3>
      <p className="stor-card-byline">{article.date}</p>
      <p className="stor-card-excerpt">{article.excerpt}</p>
      <Link href={`/articles/${article.slug}`} className="stor-read-link">Read →</Link>
    </article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function StoriesPage() {
  const collection = buildCollection();
  const [featured, ...curatedStories] = collection;

  const groupedStories = thematicNotes.map((group) => ({
    ...group,
    items: collection.filter((item) => item.collection === group.name),
  }));

  const archive = articles
    .filter((article) => !collection.some((item) => item.article.slug === article.slug))
    .concat(collection.slice(-2).map((item) => item.article))
    .slice(0, 3);

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
              <p className="stor-card-byline">{formatMeta(featured.article)}</p>
              <h2 className="stor-featured__title">{featured.article.title}</h2>
              <p className="stor-featured__excerpt">{featured.article.excerpt}</p>
              {featured.article.lead && (
                <p className="stor-featured__lead">{featured.article.lead}</p>
              )}
              <StoryLink article={featured.article} className="stor-read-link">
                Read →
              </StoryLink>
            </div>
            <div
              className="stor-featured__visual"
              style={coverStyle(featured.article)}
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
            {curatedStories.map((item, i) => (
              <CollectionCard key={item.article.slug} item={item} delay={i * 120} />
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
              <GroupCard key={group.name} group={group} delay={i * 120} />
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
            {archive.map((article, i) => (
              <ArchiveEntry key={article.slug} article={article} delay={i * 120} />
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
