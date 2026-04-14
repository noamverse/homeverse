import Link from "next/link";
import { manifestoExcerpt, siteTagline } from "@/lib/content";

const supportingBeliefs = [
  {
    title: "Belonging before performance",
    body: "A person should feel received before they are measured. The deepest forms of trust are built by atmosphere, hospitality, and the quiet signal that a human being is more than output.",
  },
  {
    title: "Taste as moral responsibility",
    body: "Taste is not decoration for us. It is the discipline of deciding what kind of feeling a place produces, what it protects from vulgarity, and what it teaches people to honor.",
  },
  {
    title: "Stewardship over extraction",
    body: "We are interested in institutions that know how to keep faith with people over time. That means standards, memory, selectivity, and a preference for long-term trust over short-term appetite.",
  },
];

const worldviewNotes = [
  "People are not markets to segment or harvest.",
  "Warmth can be exacting, disciplined, and serious.",
  "Beautiful institutions enlarge the soul instead of flattening it.",
  "Relationship is not sentimentality. It is infrastructure.",
];

const buildingCommitments = [
  "A house for philosophy, profiles, stories, and cultural standards.",
  "An editorial world where founders, patrons, stewards, and builders feel legible.",
  "A public threshold into a deeper relational ecosystem built to last.",
];

function PhilosophyBeliefCard({ title, body }) {
  return (
    <article className="philosophy-belief-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

export const metadata = {
  title: "Philosophy",
};

export default function PhilosophyPage() {
  return (
    <main className="page-main philosophy-page">
      <div className="container">
        <section className="philosophy-hero">
          <div className="philosophy-hero__shell">
            <div className="philosophy-hero__copy">
              <div className="philosophy-hero__eyebrow-row">
                <p className="home-section-label">Philosophy</p>
                <p className="philosophy-hero__marker">Inner chamber</p>
              </div>
              <p className="philosophy-hero__prelude">The central worldview of HOME</p>
              <h1 className="philosophy-hero__title">Life is a family, not a marketplace.</h1>
              <p className="philosophy-hero__body">
                HOME begins with a refusal: we reject the idea that human beings are best understood as audiences,
                consumers, brands, or units of demand. We believe life becomes more beautiful and more trustworthy
                when it is organized around belonging, stewardship, and the moral seriousness of how we receive one
                another.
              </p>
            </div>

            <div className="philosophy-hero__chamber">
              <div className="philosophy-hero__glow philosophy-hero__glow--gold" />
              <div className="philosophy-hero__glow philosophy-hero__glow--blue" />
              <div className="philosophy-hero__chamber-copy">
                <p className="philosophy-hero__panel-label">Declaration</p>
                <p className="philosophy-hero__panel-quote">{siteTagline}</p>
                <p className="philosophy-hero__chamber-text">
                  A house, in our language, is where dignity is protected, ambition is given proportion, and
                  relationship sets the terms of public life.
                </p>
              </div>
              <div className="philosophy-hero__ledger">
                <p className="philosophy-hero__ledger-label">What this page is for</p>
                <ul>
                  <li>To name the convictions beneath HOME.</li>
                  <li>To make the standard visible and legible.</li>
                  <li>To declare what kind of world we intend to build.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="philosophy-principle">
          <div className="philosophy-principle__intro">
            <p className="home-section-label">Core principle</p>
            <h2 className="section-title">A home is not an optimization surface. It is a moral atmosphere.</h2>
            <p className="section-copy section-copy--large">
              {manifestoExcerpt.body} We are building from the premise that people flourish when they are hosted rather
              than handled, and that serious institutions should deepen a person&apos;s sense of proportion instead of
              thinning it out.
            </p>
          </div>

          <div className="philosophy-principle__notes">
            <p className="philosophy-principle__notes-label">First principles</p>
            <ul>
              {worldviewNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="philosophy-beliefs">
          <div className="philosophy-section-heading">
            <div>
              <p className="home-section-label">Supporting beliefs</p>
              <h2 className="section-title">The worldview becomes real through its standards.</h2>
            </div>
            <p className="section-copy">
              HOME is warm by conviction, not by softness. These beliefs shape the editorial tone, the design language,
              and the type of institution we are trying to become.
            </p>
          </div>

          <div className="philosophy-beliefs__grid">
            {supportingBeliefs.map((belief) => (
              <PhilosophyBeliefCard key={belief.title} {...belief} />
            ))}
          </div>
        </section>

        <section className="philosophy-building">
          <div className="philosophy-building__copy">
            <p className="home-section-label">What HOME is building</p>
            <h2 className="section-title">An editorial house for people who want a more human standard of public life.</h2>
            <p className="section-copy section-copy--large">
              HOME is building a world where philosophy, stories, and institutions can once again feel intimate,
              rigorous, and beautifully held. We want to create a place that changes the emotional weather around work,
              culture, ambition, and belonging.
            </p>
          </div>

          <div className="philosophy-building__list">
            {buildingCommitments.map((commitment) => (
              <article key={commitment}>
                <p>{commitment}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="philosophy-closing">
          <p className="home-section-label">Closing statement</p>
          <h2 className="philosophy-closing__title">
            We are not building a feed, a funnel, or a cold machine for attention. We are building a house.
          </h2>
          <p className="philosophy-closing__body">
            A house for people who still believe rigor can be warm, beauty can hold standards, and relationship can be
            strong enough to organize an entire world. If that is your instinct too, you are already standing at the
            threshold of HOME.
          </p>

          <div className="philosophy-closing__actions">
            <Link href="/welcome" className="button-primary">
              Welcome HOME
            </Link>
            <Link href="/ecosystem" className="button-secondary">
              Explore the ecosystem
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
