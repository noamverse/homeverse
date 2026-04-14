import Link from "next/link";
import { getArticleBySlug, getArticlesBySection, getFeaturedStories } from "@/lib/content";

const featuredMosaic = [
  {
    slug: "the-house-a-founder-builds",
    entity: "Amina Vale",
    title: "Founder and editor",
    company: "HOME",
    type: "Founder",
    mark: "AV",
    visual: "portrait",
    size: "large",
    excerpt: "Building a house with editorial rigor, cultural warmth, and a long memory.",
    links: [
      { label: "Read feature", href: "/articles/the-house-a-founder-builds" },
      { label: "Company context", href: "/philosophy" },
      { label: "Start an introduction", href: "/welcome" },
    ],
  },
  {
    slug: "a-patron-sense-of-time",
    entity: "Noor Hadley",
    title: "Patron mind, long-horizon operator",
    company: "Hadley Circle",
    type: "Operator",
    mark: "NH",
    visual: "portrait",
    size: "tall",
    excerpt: "A patronal sense of time applied to capital, hospitality, and cultural continuity.",
    links: [
      { label: "Read feature", href: "/articles/a-patron-sense-of-time" },
      { label: "Request intro", href: "/contact" },
    ],
  },
  {
    slug: "after-the-noise",
    entity: "Leila Mercer",
    title: "Features editor",
    company: "Mercer Studio",
    type: "Creator",
    mark: "LM",
    visual: "portrait",
    size: "medium",
    excerpt: "A quieter editorial instinct for readers who want signal without frenzy.",
    links: [
      { label: "Read story", href: "/articles/after-the-noise" },
      { label: "Ecosystem pathway", href: "/ecosystem" },
    ],
  },
  {
    slug: "the-new-private-standard",
    entity: "HOME",
    title: "Editorial house",
    company: "Institutional feature",
    type: "Company",
    mark: "H",
    visual: "logo",
    size: "medium",
    excerpt: "An editorial company studying atmosphere, restraint, and the people building enduring rooms.",
    links: [
      { label: "Read context", href: "/articles/the-new-private-standard" },
      { label: "Welcome HOME", href: "/welcome" },
    ],
  },
  {
    slug: "building-homes-not-audiences",
    entity: "Signal Circle",
    title: "Audience refusal",
    company: "Editorial concept",
    type: "Company",
    mark: "SC",
    visual: "logo",
    size: "wide",
    excerpt: "A company-facing reminder that relationship is infrastructure, not a brand posture.",
    links: [
      { label: "Read essay", href: "/articles/building-homes-not-audiences" },
      { label: "Contact HOME", href: "/contact" },
    ],
  },
];

const curationBands = [
  {
    name: "Founders",
    description: "People who shape companies as climates, not just products.",
    items: [
      {
        name: "Amina Vale",
        role: "Founder, HOME",
        company: "HOME",
        note: "Building an editorial institution around belonging, standards, and taste.",
        href: "/articles/the-house-a-founder-builds",
        relationship: ["Feature live", "Company context", "Introductions open"],
      },
    ],
  },
  {
    name: "Companies",
    description: "Institutions whose identity is inseparable from the tone they create.",
    items: [
      {
        name: "HOME",
        role: "Editorial house",
        company: "Institutional feature",
        note: "A public-facing threshold into philosophy, stories, features, and slower cultural signal.",
        href: "/philosophy",
        relationship: ["Website pathway", "Welcome surface", "Editorial contact"],
      },
      {
        name: "Signal Circle",
        role: "Company study",
        company: "Relationship-led media concept",
        note: "A study in how a company can become more inhabitable by refusing audience logic.",
        href: "/articles/building-homes-not-audiences",
        relationship: ["Essay context", "Contact indicator"],
      },
    ],
  },
  {
    name: "Creators",
    description: "Writers, editors, and cultural figures who make the field more legible.",
    items: [
      {
        name: "Leila Mercer",
        role: "Features Editor",
        company: "Mercer Studio",
        note: "Writing toward calm, context, and a more beautiful reading atmosphere.",
        href: "/articles/after-the-noise",
        relationship: ["Story live", "Ecosystem adjacent"],
      },
      {
        name: "Noor Hadley",
        role: "Contributing Editor",
        company: "Hadley Circle",
        note: "Thinking about patronage as a temporal and cultural responsibility.",
        href: "/articles/a-patron-sense-of-time",
        relationship: ["Feature live", "Contact possible"],
      },
    ],
  },
  {
    name: "Operators",
    description: "People who quietly hold continuity, trust, and standards in motion.",
    items: [
      {
        name: "Noor Hadley",
        role: "Long-horizon operator",
        company: "Hadley Circle",
        note: "An operator's instinct for stewardship, pacing, and protecting conditions for serious work.",
        href: "/articles/a-patron-sense-of-time",
        relationship: ["Read feature", "Request intro"],
      },
    ],
  },
];

function buildSpotlight() {
  const article = getArticleBySlug("the-house-a-founder-builds");

  return {
    name: "Amina Vale",
    title: article?.role ?? "Founder",
    company: "HOME",
    excerpt: article?.excerpt ?? "",
    lead: article?.lead ?? "",
    image: article?.image ?? "",
    href: article ? `/articles/${article.slug}` : "/featured",
    links: [
      { label: "Website", href: "/philosophy" },
      { label: "Company", href: "/welcome" },
      { label: "Contact", href: "/contact" },
    ],
  };
}

function imageStyle(image, tone, visual) {
  if (image) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(255,251,246,0.06), rgba(23,17,18,0.22)), url(${image})`,
    };
  }

  if (visual === "logo") {
    return {
      backgroundImage: "linear-gradient(135deg, rgba(101, 30, 38, 0.98), rgba(28, 30, 49, 0.98))",
    };
  }

  return { backgroundImage: tone };
}

function Spotlight({ item }) {
  return (
    <article className="featured-spotlight-card">
      <div
        className="featured-spotlight-card__visual"
        style={imageStyle(item.image, "linear-gradient(135deg, rgba(99, 34, 38, 0.98), rgba(26, 29, 46, 0.98))")}
      >
        <div className="featured-spotlight-card__veil" />
        <div className="featured-spotlight-card__caption">
          <span>Primary feature</span>
          <strong>{item.company}</strong>
        </div>
      </div>

      <div className="featured-spotlight-card__body">
        <p className="featured-kicker">Featured</p>
        <h2>{item.name}</h2>
        <p className="featured-identity">
          {item.title} at {item.company}
        </p>
        <p className="featured-summary">{item.excerpt}</p>
        <p className="featured-lead">{item.lead}</p>

        <div className="featured-relationship-row">
          {item.links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <Link href={item.href} className="button-primary">
          Read Feature
        </Link>
      </div>
    </article>
  );
}

function MosaicTile({ item, article }) {
  const visualStyle = imageStyle(article?.image, article?.tone, item.visual);

  return (
    <article className={`featured-mosaic-tile featured-mosaic-tile--${item.size}`}>
      <div className="featured-mosaic-tile__visual" style={visualStyle}>
        <div className="featured-mosaic-tile__visual-glow" />
        <div className={`featured-mosaic-tile__mark featured-mosaic-tile__mark--${item.visual}`}>{item.mark}</div>
      </div>

      <div className="featured-mosaic-tile__body">
        <div className="featured-mosaic-tile__topline">
          <p className="featured-kicker">{item.type}</p>
          <span>{item.company}</span>
        </div>
        <h3>{item.entity}</h3>
        <p className="featured-mosaic-tile__title">{item.title}</p>
        <p className="featured-mosaic-tile__excerpt">{item.excerpt}</p>

        <div className="featured-mosaic-tile__links">
          {item.links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

function CurationBand({ band }) {
  return (
    <section className="featured-band">
      <div className="featured-band__intro">
        <p className="featured-kicker">{band.name}</p>
        <h2>{band.name}</h2>
        <p>{band.description}</p>
      </div>

      <div className="featured-band__items">
        {band.items.map((item) => (
          <article key={`${band.name}-${item.name}-${item.role}`} className="featured-band-card">
            <div className="featured-band-card__identity">
              <div className="featured-band-card__monogram">{item.name.slice(0, 1)}</div>
              <div>
                <h3>{item.name}</h3>
                <p>{item.role}</p>
                <span>{item.company}</span>
              </div>
            </div>
            <p className="featured-band-card__note">{item.note}</p>
            <div className="featured-band-card__relationship">
              {item.relationship.map((entry) => (
                <span key={entry}>{entry}</span>
              ))}
            </div>
            <Link href={item.href} className="featured-band-card__cta">
              Open feature
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArchiveEntry({ article }) {
  return (
    <article className="featured-archive-entry">
      <div className="featured-archive-entry__meta">
        <p className="featured-kicker">{article.category}</p>
        <span>{article.date}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <Link href={`/articles/${article.slug}`}>Read more</Link>
    </article>
  );
}

export default function FeaturedPage() {
  const spotlight = buildSpotlight();
  const archive = [...getArticlesBySection("profiles"), ...getFeaturedStories()].slice(0, 5);

  return (
    <main className="page-main featured-page">
      <div className="container">
        <section className="featured-intro">
          <div>
            <p className="home-section-label">Featured</p>
            <h1 className="featured-intro__title">Featured</h1>
          </div>
          <p className="featured-intro__line">
            People, companies, creators, and operators worth knowing through the editorial world of HOME.
          </p>
        </section>

        <section className="featured-spotlight">
          <Spotlight item={spotlight} />
        </section>

        <section className="featured-mosaic">
          <div className="featured-section-heading">
            <div>
              <p className="featured-kicker">Current selection</p>
              <h2>Faces, firms, signals, and stories held together as a living editorial surface.</h2>
            </div>
            <p>
              This is not a directory. It is a feature field designed to let a reader meet people, institutions, and
              contexts quickly, then move deeper by instinct.
            </p>
          </div>

          <div className="featured-mosaic__grid">
            {featuredMosaic.map((item) => (
              <MosaicTile key={item.entity + item.title} item={item} article={getArticleBySlug(item.slug)} />
            ))}
          </div>
        </section>

        <section className="featured-relationship-surface">
          <div className="featured-relationship-surface__intro">
            <p className="featured-kicker">Relationship layer</p>
            <h2>Each feature opens a few ways to keep going.</h2>
            <p>
              Company context, direct reading pathways, contact signals, and slower introductions all belong here so
              the page feels relational from the first pass.
            </p>
          </div>

          <div className="featured-relationship-surface__grid">
            <article>
              <span>Website pathway</span>
              <p>Move from a feature into the wider institutional world behind it.</p>
            </article>
            <article>
              <span>Company link</span>
              <p>See where a person sits inside a company, studio, or editorial house.</p>
            </article>
            <article>
              <span>Contact indicator</span>
              <p>Make room for introductions, requests, and future correspondence without flattening the tone.</p>
            </article>
          </div>
        </section>

        <section className="featured-bands">
          {curationBands.map((band) => (
            <CurationBand key={band.name} band={band} />
          ))}
        </section>

        <section className="featured-archive">
          <div className="featured-section-heading">
            <div>
              <p className="featured-kicker">Past features</p>
              <h2>Explore more of the field.</h2>
            </div>
            <p>Previous pieces, adjacent stories, and supporting reading for anyone following the people and companies inside HOME.</p>
          </div>

          <div className="featured-archive__grid">
            {archive.map((article) => (
              <ArchiveEntry key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <section className="featured-closing">
          <p className="featured-kicker">Stay close</p>
          <h2>The feature field keeps growing as HOME finds people and companies worth knowing well.</h2>
          <p>
            If you belong in this world, the next step can be a quiet introduction, a company context note, or a
            deeper read through the ecosystem and stories.
          </p>
          <div className="featured-closing__actions">
            <Link href="/welcome" className="button-primary">
              Introduce yourself
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
