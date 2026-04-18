import Link from "next/link";

// ── Placeholder data ──────────────────────────────────────────────────────────

const founderSpotlight = {
  eyebrow: "Newest Feature",
  name: "[Founder Name]",
  role: "[Role], [Company]",
  quote: "[A short resonant quote from the founder that captures their relational philosophy.]",
  excerpt:
    "[Opening paragraph of the feature article — a few sentences that draw the reader into who this person is and why they are worth knowing. Keep the tone warm and editorial.]",
  href: "/featured",
};

// TODO: Replace with real founder features as they are published
const founderRows = [
  {
    date: "[Month Year]",
    name: "[Founder Name]",
    desc: "[One-line pitch of the feature — what makes this person worth reading about.]",
    href: "/featured",
  },
  {
    date: "[Month Year]",
    name: "[Founder Name]",
    desc: "[One-line pitch of the feature — what makes this person worth reading about.]",
    href: "/featured",
  },
  {
    date: "[Month Year]",
    name: "[Founder Name]",
    desc: "[One-line pitch of the feature — what makes this person worth reading about.]",
    href: "/featured",
  },
  {
    date: "[Month Year]",
    name: "[Founder Name]",
    desc: "[One-line pitch of the feature — what makes this person worth reading about.]",
    href: "/featured",
  },
];

const companySpotlight = {
  eyebrow: "Newest Feature",
  name: "[Company Name]",
  role: "[Sector] · [Tagline]",
  quote: "[A short resonant line that captures the company's relational signature.]",
  excerpt:
    "[Opening paragraph of the feature — what this company is building, why it stands apart, and why HOME is amplifying it now. Editorial tone, not promotional.]",
  href: "/featured",
};

// TODO: Replace with real company features as they are published
const companyRows = [
  {
    date: "[Month Year]",
    name: "[Company Name]",
    desc: "[One-line description of the company and what makes it worth knowing.]",
    href: "/featured",
  },
  {
    date: "[Month Year]",
    name: "[Company Name]",
    desc: "[One-line description of the company and what makes it worth knowing.]",
    href: "/featured",
  },
  {
    date: "[Month Year]",
    name: "[Company Name]",
    desc: "[One-line description of the company and what makes it worth knowing.]",
    href: "/featured",
  },
  {
    date: "[Month Year]",
    name: "[Company Name]",
    desc: "[One-line description of the company and what makes it worth knowing.]",
    href: "/featured",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionBand({ headline, subtext }) {
  return (
    <div className="feat-section-band">
      <span className="feat-eyebrow">Featured</span>
      <h2 className="feat-headline">{headline}</h2>
      <p className="feat-subtext">{subtext}</p>
    </div>
  );
}

function SpotlightCard({ item, variant }) {
  const isCompany = variant === "company";
  return (
    <article className={`feat-spotlight-card feat-spotlight-card--${variant}`}>
      {/* TODO: Replace this placeholder with the actual photo (founder) or logo area (company) */}
      <div className={`feat-spotlight-image${isCompany ? " feat-spotlight-image--warm" : ""}`}>
        <div className="feat-spotlight-image__overlay" />
      </div>

      <div className="feat-spotlight-body">
        <p className="feat-spotlight-eyebrow">{item.eyebrow}</p>
        <h3 className="feat-spotlight-name">{item.name}</h3>
        <p className="feat-spotlight-role">{item.role}</p>
        <p className="feat-spotlight-quote">{item.quote}</p>
        <p className="feat-spotlight-excerpt">{item.excerpt}</p>
        <Link href={item.href} className="feat-read-link">
          Read the feature →
        </Link>
      </div>
    </article>
  );
}

function EditorialRow({ item, warm }) {
  return (
    <article className="feat-row">
      <div className={`feat-row-image${warm ? " feat-row-image--warm" : ""}`} />
      <div className="feat-row-content">
        <p className="feat-row-date">{item.date}</p>
        <p className="feat-row-name">{item.name}</p>
        <p className="feat-row-desc">{item.desc}</p>
      </div>
      <Link href={item.href} className="feat-row-link">
        Read →
      </Link>
    </article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FeaturedPage() {
  return (
    <main className="page-main featured-page">
      <div className="container">

        {/* ── HERO — preserved as-is ── */}
        <section className="featured-intro">
          <div>
            <p className="home-section-label">Featured</p>
            <h1 className="featured-intro__title">Featured</h1>
          </div>
          <p className="featured-intro__line">
            People, companies, creators, and operators worth knowing through the editorial world of HOME.
          </p>
        </section>

        {/* ── FOUNDERS SECTION ── */}
        <section className="feat-section">
          <SectionBand
            headline="Founders"
            subtext="The people building a more relational world. New features published regularly."
          />

          <div className="feat-spotlight-wrap">
            <div className="feat-spotlight-glow feat-spotlight-glow--cool" aria-hidden="true" />
            <SpotlightCard item={founderSpotlight} variant="founder" />
          </div>

          <div className="feat-editorial-list">
            {founderRows.map((row, i) => (
              <EditorialRow key={i} item={row} warm={false} />
            ))}
          </div>
        </section>

        {/* ── COMPANIES SECTION ── */}
        <section className="feat-section">
          <SectionBand
            headline="Companies"
            subtext="The ventures building the relational future. New features published regularly."
          />

          <div className="feat-spotlight-wrap">
            <div className="feat-spotlight-glow feat-spotlight-glow--warm" aria-hidden="true" />
            <SpotlightCard item={companySpotlight} variant="company" />
          </div>

          <div className="feat-editorial-list">
            {companyRows.map((row, i) => (
              <EditorialRow key={i} item={row} warm={true} />
            ))}
          </div>
        </section>

        {/* ── CLOSING NOTE ── */}
        <section className="feat-closing">
          <p className="feat-closing-text">
            Want to be featured? We publish the people and companies we are already in relationship
            with. Start there.
          </p>
        </section>

      </div>
    </main>
  );
}
