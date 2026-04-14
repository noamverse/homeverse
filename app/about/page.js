import { siteTagline } from "@/lib/content";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="page-main">
      <div className="container">
        <section className="page-hero">
          <div className="page-hero__inner">
            <div className="eyebrow">About HOME</div>
            <h1 className="section-title">A media platform built to feel like a place, not a feed.</h1>
            <p className="section-copy">
              {siteTagline} HOME exists to publish stories, essays, and reporting with emotional intelligence,
              editorial discipline, and high-end visual restraint.
            </p>
          </div>
        </section>

        <section className="split-layout">
          <div className="panel">
            <div className="eyebrow">Mission</div>
            <h2 className="section-title">To create a warmer standard for modern media.</h2>
            <p className="section-copy">
              We believe people are hungry for beauty, trust, and context. HOME is designed to meet that hunger with
              strong writing, premium presentation, and a human editorial voice.
            </p>
          </div>

          <div className="panel">
            <div className="eyebrow">What we cover</div>
            <ul className="pill-list">
              <li>Entrepreneur features and founder profiles</li>
              <li>Essays and slower ecosystem writing</li>
              <li>Current events through a calmer lens</li>
              <li>Culture, design, family, taste, and modern life</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
