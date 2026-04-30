import Image from "next/image";
import Link from "next/link";
import {
  getFeaturedStories,
  homePhilosophyStrip,
  homePillars,
  siteTagline,
  welcomeHomeBlock,
} from "@/lib/content";

import { features } from "@/content/features";

const recentFeatures = [...features]
  .filter((f) => f.published === true)
  .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
  .slice(0, 3);

function FeaturePreviewBlock({ feature }) {
  return (
    <Link href={`/featured/${feature.slug}`} className="hp-feat-preview">
      <div className="hp-feat-preview__hairline" aria-hidden="true" />
      <span className="hp-feat-preview__cat">{feature.category}</span>
      <p className="hp-feat-preview__name">{feature.name}</p>
      <p className="hp-feat-preview__title">{feature.title}</p>
    </Link>
  );
}

function StoryCard({ story, lead = false }) {
  if (lead) {
    return (
      <article className="hp-story-lead">
        <div className="hp-story-lead__cover">
          <div className="hp-story-lead__cover-tone" style={{ backgroundImage: story.tone }} />
          <div className="hp-story-lead__cover-inner">
            <p className="hp-card-kicker">{story.category}</p>
            <h3 className="hp-story-lead__cover-title">{story.title}</h3>
          </div>
        </div>
        <div className="hp-story-lead__body">
          <p className="hp-card-copy">{story.excerpt}</p>
          <div className="hp-card-meta">
            <span>{story.author}</span>
            <span>&middot;</span>
            <span>{story.date}</span>
          </div>
          <Link href={`/articles/${story.slug}`} className="hp-card-link">
            Read story &rarr;
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="hp-story-card">
      <div className="hp-story-card__accent">
        <div className="hp-story-card__accent-tone" style={{ backgroundImage: story.tone }} />
      </div>
      <div className="hp-story-card__body">
        <p className="hp-card-kicker">{story.category}</p>
        <h3 className="hp-card-title">{story.title}</h3>
        <p className="hp-card-copy">{story.excerpt}</p>
        <div className="hp-card-meta">
          <span>{story.author}</span>
          <span>&middot;</span>
          <span>{story.date}</span>
        </div>
        <Link href={`/articles/${story.slug}`} className="hp-card-link">
          Read story &rarr;
        </Link>
      </div>
    </article>
  );
}

export default function HomePage() {
  const [leadStory, ...storyList] = getFeaturedStories();

  return (
    <main>
      {/* Hero — full viewport */}
      <section className="hp-hero" aria-label="Welcome to HOME">
        <div className="hp-hero__glow" aria-hidden="true" />
        <div className="hp-hero__inner">
          <Image
            src="/home.png.png"
            alt="HOME"
            width={440}
            height={198}
            className="hp-hero__logo-img"
            priority
          />
          <p className="hp-hero__tagline">{siteTagline}</p>
          <hr className="hp-hero__rule" aria-hidden="true" />
        </div>
      </section>

      <div className="container">
        {/* Pillars */}
        <section className="hp-section hp-pillars" aria-labelledby="pillars-heading">
          <div className="hp-section__header">
            <h2 className="hp-section__title" id="pillars-heading">
              What HOME is built on.
            </h2>
            <Link href="/philosophy" className="hp-section__link">
              Read the philosophy &rarr;
            </Link>
          </div>

          <div className="hp-pillars__list">
            {homePillars.map((pillar, i) => (
              <article key={pillar.title} className="hp-pillar">
                <span className="hp-pillar__number">0{i + 1}</span>
                <h3 className="hp-pillar__title">{pillar.title}</h3>
                <p className="hp-pillar__body">{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Featured Profiles */}
        <section className="hp-section hp-profiles" aria-labelledby="profiles-heading">
          <div className="hp-section__header">
            <h2 className="hp-section__title" id="profiles-heading">
              People creating the future of the Relational Economy.
            </h2>
            <Link href="/featured" className="hp-section__link">
              View All Features &rarr;
            </Link>
          </div>

          <div className="hp-feat-preview-grid">
            {recentFeatures.map((feature) => (
              <FeaturePreviewBlock key={feature.slug} feature={feature} />
            ))}
          </div>
        </section>

        {/* Featured Stories */}
        <section className="hp-section hp-stories" aria-labelledby="stories-heading">
          <div className="hp-section__header">
            <h2 className="hp-section__title" id="stories-heading">
              Stories that move with a different rhythm.
            </h2>
            <Link href="/stories" className="hp-section__link">
              View all stories &rarr;
            </Link>
          </div>

          <div className="hp-stories__layout">
            {leadStory ? <StoryCard story={leadStory} lead /> : null}

            <div className="hp-story-rail">
              {storyList.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Manifesto — full width */}
      <section className="hp-manifesto" aria-label="HOME manifesto">
        <div className="hp-manifesto__glow" aria-hidden="true" />
        <div className="hp-manifesto__inner">
          <span className="hp-manifesto__mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="hp-manifesto__quote">{homePhilosophyStrip}</blockquote>
          <Link href="/philosophy" className="hp-manifesto__cta">
            Read the full philosophy &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <div className="container">
        <section className="hp-section hp-cta" aria-labelledby="cta-heading">
          <h2 className="hp-cta__title" id="cta-heading">
            {welcomeHomeBlock.title}
          </h2>
          <p className="hp-cta__body">{welcomeHomeBlock.body}</p>
          <div className="hp-cta__actions">
            <Link href="/ecosystem" className="hp-section__link">
              Explore the ecosystem &rarr;
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
