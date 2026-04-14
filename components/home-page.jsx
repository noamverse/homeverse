import Link from "next/link";
import ArticleCard from "@/components/article-card";
import NewsletterSignup from "@/components/newsletter-signup";
import { founderSpotlight, getFeaturedArticles, getArticlesBySection, siteTagline } from "@/lib/content";

export default function HomePage() {
  const featured = getFeaturedArticles();
  const stories = getArticlesBySection("stories");

  return (
    <main className="page-main">
      <div className="container">
        <section className="hero">
          <div className="hero-panel">
            <div className="eyebrow">Premium global media</div>
            <div className="hero-grid-lines" aria-hidden="true" />

            <div className="hero-orbit" aria-hidden="true">
              <span className="hero-orbit__ring" />
              <span className="hero-orbit__ring hero-orbit__ring--two" />
            </div>

            <h1 className="hero-title">Life is a family, not a marketplace</h1>

            <p className="hero-copy">
              HOME is a cinematic editorial institution for readers who want more than content. We publish stories,
              current events, and founder profiles with emotional force, market intelligence, and the confidence of a
              major global brand.
            </p>

            <div className="hero-actions">
              <Link href="/stories" className="button-primary">
                Explore stories
              </Link>

              <Link href="/about" className="button-secondary">
                Our mission
              </Link>
            </div>
          </div>

          <aside className="hero-aside">
            <div className="hero-aside__image">
              <div className="hero-aside__overlay" />
              <div className="hero-aside__copy">
                <div className="eyebrow">Editorial note</div>
                <p className="hero-copy hero-copy--light">
                  {siteTagline} HOME exists for readers who want fewer headlines, deeper feeling, stronger taste, and a
                  more elevated sense of what matters.
                </p>
              </div>
            </div>

            <div className="stat-grid stat-grid--hero">
              <div>
                <div className="stat-label">Signature lens</div>
                <div className="stat-value">Warm clarity</div>
              </div>

              <div>
                <div className="stat-label">Coverage</div>
                <div className="stat-value">Stories, journal, news</div>
              </div>
            </div>
          </aside>
        </section>

        <section>
          <div className="section-header">
            <div>
              <div className="eyebrow">Featured reading</div>
              <h2 className="section-title">The front page of HOME.</h2>
            </div>

            <Link href="/journal" className="button-secondary">
              Read the journal
            </Link>
          </div>

          <div className="grid-featured">
            {featured.map((article, index) => (
              <ArticleCard key={article.slug} article={article} large={index === 0} />
            ))}
          </div>
        </section>

        <section className="split-layout">
          <div className="spotlight-card">
            <div className="eyebrow">Founder spotlight</div>
            <h2 className="section-title">{founderSpotlight.name}</h2>

            <p className="lead-copy">
              {founderSpotlight.role}. {founderSpotlight.summary}
            </p>

            <p className="section-copy spotlight-copy">
              A founder&apos;s publication should feel as considered as a private residence, as sharp as a boardroom, and
              as emotionally literate as a great letter. That is the standard HOME is setting.
            </p>

            <ul className="pill-list">
              {founderSpotlight.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <NewsletterSignup />
        </section>

        <section>
          <div className="section-header">
            <div>
              <div className="eyebrow">Latest stories</div>
              <h2 className="section-title">Builders, founders, and elegant lives.</h2>
            </div>

            <Link href="/stories" className="button-secondary">
              View all stories
            </Link>
          </div>

          <div className="page-grid">
            {stories.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
