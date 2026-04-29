const expressions = [
  { label: "Business", tagline: "Relational over transactional." },
  { label: "Hospitality", tagline: "Belonging over service." },
  { label: "Investing", tagline: "Belief over extraction." },
  { label: "Media", tagline: "Truth over performance." },
  { label: "Community", tagline: "Connection over networking." },
];

export const metadata = {
  title: "Philosophy",
  description:
    "A world built on one idea: life should feel more like a family, and less like a marketplace.",
};

export default function PhilosophyPage() {
  return (
    <main className="page-main">

      {/* 1. Hero */}
      <section className="phil-hero">
        <div className="phil-hero__wrap">
          <div className="phil-hero__glow" aria-hidden="true" />
          <div className="phil-hero__container">
            <p className="phil-hero__eyebrow">A philosophy, not a pitch.</p>
            <h1 className="phil-hero__title">Life is a family, not a marketplace.</h1>
            <p className="phil-hero__sub">
              We are creating a new economy, a Relational Economy. Across business, capital,
              hospitality, investment, and community — we build environments where people experience
              belonging, connection, and unconditional human value.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Principle */}
      <section className="phil-core">
        <div className="container">
          <p className="phil-label">The Core</p>
          <blockquote className="phil-core__quote">
            Human beings should relate to one another as family, rather than transactions.
          </blockquote>
          <p className="phil-core__body">
            The modern world is foundationalized on transactions rather than trust — networking, selling, status,
            performance, optimization, persuasion, metrics. The paradigm we are building is the opposite premise:
            the next generation of institutions will be the ones making people feel more human, more connected, and more at home.
          </p>
        </div>
      </section>

      {/* 3. The Shift */}
      <section className="phil-shift">
        <div className="container">
          <p className="phil-label">The Shift</p>
          <div className="phil-shift__cols">
            <div className="phil-shift__col phil-shift__col--left">
              <p className="phil-shift__col-head">The Default System</p>
              <ul className="phil-shift__words">
                {["Transaction", "Extraction", "Optimization", "Performance"].map((w) => (
                  <li key={w} className="phil-shift__word">{w}</li>
                ))}
              </ul>
            </div>
            <div className="phil-shift__divider" role="separator" aria-hidden="true" />
            <div className="phil-shift__col phil-shift__col--right">
              <p className="phil-shift__col-head phil-shift__col-head--gold">What We Build Instead</p>
              <ul className="phil-shift__words">
                {["Relationship", "Presence", "Trust", "Compounding"].map((w) => (
                  <li key={w} className="phil-shift__word">{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Where It Shows Up */}
      <section className="phil-expressions">
        <div className="container">
          <p className="phil-label">Where It Shows Up</p>
          <p className="phil-expressions__intro">
            This principle is not tied to an industry. It is tied to a way of being. It expresses
            itself everywhere:
          </p>
          <div className="phil-expressions__grid">
            {expressions.map((e) => (
              <div key={e.label} className="phil-expr-card">
                <p className="phil-expr-card__label">{e.label}</p>
                <p className="phil-expr-card__tagline">{e.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Invitation */}
      <section className="phil-invitation">
        <div className="phil-invitation__glow" aria-hidden="true" />
        <div className="container phil-invitation__inner">
          <h2 className="phil-invitation__title">
            If this sounds like the world you want to live in — you are already part of it.
          </h2>
          <p className="phil-invitation__sub">
            HOME is not a company you join. It is a way of being the world is organizing around.
            You are welcome here.
          </p>
        </div>
      </section>

    </main>
  );
}
