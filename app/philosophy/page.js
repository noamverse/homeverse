import { manifestoExcerpt, siteTagline } from "@/lib/content";

export const metadata = {
  title: "Philosophy",
};

export default function PhilosophyPage() {
  return (
    <main className="page-main">
      <div className="container">
        <section className="page-hero">
          <div className="page-hero__inner">
            <div className="eyebrow">Philosophy</div>
            <h1 className="section-title">A house built on belonging, dignity, and stewardship.</h1>
            <p className="section-copy">
              {siteTagline} HOME exists to challenge the logic of extraction with a more relational standard of life,
              work, and institution-building.
            </p>
          </div>
        </section>

        <section className="split-layout split-layout--home">
          <div className="panel panel--wide">
            <div className="eyebrow">Manifesto</div>
            <h2 className="section-title">{manifestoExcerpt.title}</h2>
            <p className="section-copy section-copy--large">{manifestoExcerpt.body}</p>
          </div>

          <div className="panel">
            <div className="eyebrow">First principles</div>
            <ul className="pill-list">
              <li>People are not markets.</li>
              <li>Hospitality is a strategic and moral discipline.</li>
              <li>Taste is a form of responsibility.</li>
              <li>Institutions should enlarge a person, not flatten them.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
