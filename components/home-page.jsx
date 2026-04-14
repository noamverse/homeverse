import Link from "next/link";
import {
  enterHomeBlock,
  getFeaturedProfiles,
  getFeaturedStories,
  homeHeroDetails,
  homeIntro,
  homePhilosophyStrip,
  homePillars,
  manifestoExcerpt,
  siteTagline,
  whatHomeIs,
} from "@/lib/content";

function ProfileCard({ profile, featured = false }) {
  return (
    <article
      className={featured ? "home-profile-card home-profile-card--featured" : "home-profile-card"}
      style={{ backgroundImage: profile.tone }}
    >
      <div className="home-profile-card__veil" />
      <div className="home-profile-card__body">
        <p className="home-card-kicker">{profile.category}</p>
        <h3 className="home-card-title">{profile.title}</h3>
        <p className="home-card-copy">{profile.excerpt}</p>
        <div className="home-card-meta">
          <span>{profile.author}</span>
          <span>&middot;</span>
          <span>{profile.readTime}</span>
        </div>
        <Link href={`/articles/${profile.slug}`} className="home-card-link">
          Read profile
        </Link>
      </div>
    </article>
  );
}

function StoryFeature({ story, featured = false }) {
  return (
    <article className={featured ? "home-story home-story--featured" : "home-story"}>
      <div className="home-story__tone" style={{ backgroundImage: story.tone }} />
      <div className="home-story__body">
        <p className="home-card-kicker">{story.category}</p>
        <h3 className="home-card-title">{story.title}</h3>
        <p className="home-card-copy">{story.excerpt}</p>
        <div className="home-card-meta">
          <span>{story.author}</span>
          <span>&middot;</span>
          <span>{story.date}</span>
        </div>
      </div>
      <Link href={`/articles/${story.slug}`} className="home-card-link">
        Read story
      </Link>
    </article>
  );
}

export default function HomePage() {
  const [leadProfile, ...supportingProfiles] = getFeaturedProfiles();
  const [leadStory, ...storyList] = getFeaturedStories();

  return (
    <main className="page-main">
      <div className="container">
        <div className="home-landing">
          <section className="home-hero-section">
            <div className="home-hero-shell">
              <div className="home-hero-copy">
                <p className="home-section-label">{homeIntro.eyebrow}</p>
                <h1 className="home-hero-title">A world built for belonging, stewardship, and serious lives.</h1>
                <p className="home-hero-subhead">{homeIntro.subhead}</p>

                <div className="home-hero-actions">
                  <Link href="/enter-home" className="button-primary">
                    Enter HOME
                  </Link>
                  <Link href="/philosophy" className="button-secondary">
                    Read the philosophy
                  </Link>
                </div>
              </div>

              <div className="home-hero-visual">
                <div className="home-hero-chamber">
                  <div className="home-hero-chamber__halo" />
                  <div className="home-hero-chamber__frame">
                    <p className="home-hero-chamber__label">Threshold</p>
                    <p className="home-hero-chamber__quote">{siteTagline}</p>
                  </div>
                </div>

                <div className="home-hero-ledger">
                  <p className="home-hero-ledger__label">Inside HOME</p>
                  <ul className="home-hero-ledger__list">
                    {homeHeroDetails.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="home-philosophy-strip" aria-label="HOME philosophy">
            <p>{homePhilosophyStrip}</p>
          </section>

          <section className="home-explainer">
            <div className="home-explainer__copy">
              <p className="home-section-label">What HOME is</p>
              <h2 className="section-title">{whatHomeIs.title}</h2>
              <p className="section-copy section-copy--large">{whatHomeIs.body}</p>
            </div>

            <div className="home-pillars">
              {homePillars.map((pillar) => (
                <article key={pillar.title} className="home-pillar">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="home-profiles">
            <div className="home-section-heading">
              <div>
                <p className="home-section-label">Featured profiles</p>
                <h2 className="section-title">People and institutions with rooms inside them.</h2>
              </div>
              <Link href="/profiles" className="button-secondary">
                View profiles
              </Link>
            </div>

            <div className="home-profile-grid">
              {leadProfile ? <ProfileCard profile={leadProfile} featured /> : null}

              <div className="home-profile-stack">
                {supportingProfiles.map((profile) => (
                  <ProfileCard key={profile.slug} profile={profile} />
                ))}

                <aside className="home-profile-note">
                  <p className="home-card-kicker">Editorial standard</p>
                  <h3 className="home-card-title">We look for builders whose work changes the feeling of a room.</h3>
                  <p className="home-card-copy">
                    HOME profiles founders, patrons, hosts, and institutions whose presence creates trust, coherence,
                    and a stronger sense of how to live.
                  </p>
                </aside>
              </div>
            </div>
          </section>

          <section className="home-stories">
            <div className="home-section-heading">
              <div>
                <p className="home-section-label">Featured stories</p>
                <h2 className="section-title">Stories that move with a different rhythm.</h2>
              </div>
              <Link href="/stories" className="button-secondary">
                View stories
              </Link>
            </div>

            <div className="home-stories-layout">
              {leadStory ? <StoryFeature story={leadStory} featured /> : null}

              <div className="home-story-rail">
                {storyList.map((story) => (
                  <StoryFeature key={story.slug} story={story} />
                ))}
              </div>
            </div>
          </section>

          <section className="home-manifesto">
            <p className="home-section-label">Manifesto</p>
            <h2 className="home-manifesto__title">{manifestoExcerpt.title}</h2>
            <p className="home-manifesto__body">{manifestoExcerpt.body}</p>
            <Link href="/philosophy" className="button-secondary">
              Read the full philosophy
            </Link>
          </section>

          <section className="home-threshold">
            <div className="home-threshold__copy">
              <p className="home-section-label">Enter HOME</p>
              <h2 className="section-title">{enterHomeBlock.title}</h2>
              <p className="section-copy section-copy--large">{enterHomeBlock.body}</p>
            </div>

            <div className="home-threshold__actions">
              <Link href="/enter-home" className="button-primary">
                Begin here
              </Link>
              <Link href="/journal" className="button-secondary">
                Read the journal
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
