import Link from "next/link";
import { articles, getArticleBySlug } from "@/lib/content";
import styles from "./stories-page.module.css";

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

function coverStyle(article) {
  if (article.image) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(250,244,236,0.05), rgba(33,20,14,0.16)), url(${article.image})`,
    };
  }

  return {
    backgroundImage: article.tone,
  };
}

function buildCollection() {
  return storyPlan
    .map((entry) => {
      const article = getArticleBySlug(entry.slug);

      if (!article) {
        return null;
      }

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

function CollectionCard({ item }) {
  const { article, label, tone, layout } = item;

  return (
    <article className={`${styles.collectionCard} ${layout ? styles[`collectionCard${layout[0].toUpperCase()}${layout.slice(1)}`] : ""}`}>
      <div className={styles.collectionHeader}>
        <p className={styles.kicker}>{label}</p>
        <span className={styles.collectionMeta}>{article.category}</span>
      </div>
      <h3 className={styles.collectionTitle}>{article.title}</h3>
      <p className={styles.collectionExcerpt}>{article.excerpt}</p>
      <p className={styles.collectionTone}>{tone}</p>
      <div className={styles.collectionFooter}>
        <span>{formatMeta(article)}</span>
        <StoryLink article={article} className={styles.inlineLink}>
          Read Story
        </StoryLink>
      </div>
    </article>
  );
}

function ArchiveEntry({ article }) {
  return (
    <article className={styles.archiveEntry}>
      <div className={styles.archiveMeta}>
        <span>{article.category}</span>
        <span>{article.date}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <StoryLink article={article} className={styles.archiveLink}>
        Open story
      </StoryLink>
    </article>
  );
}

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

  return (
    <main className={`page-main ${styles.storiesPage}`}>
      <div className="container">
        <div className={styles.shell}>
          <section className={styles.intro}>
            <div>
              <p className={styles.pageLabel}>Stories</p>
              <h1 className={styles.pageTitle}>Stories</h1>
            </div>
            <p className={styles.pageIntro}>
              A calm editorial surface for founder narratives, essays, company stories, and in-depth pieces meant to be read slowly.
            </p>
          </section>

          <section className={styles.featuredStory}>
            <div className={styles.featuredCopy}>
              <p className={styles.kicker}>Featured story</p>
              <div className={styles.featuredMetaRow}>
                <span>{featured.article.category}</span>
                <span>{featured.article.date}</span>
                <span>{featured.article.readTime}</span>
              </div>
              <h2 className={styles.featuredTitle}>{featured.article.title}</h2>
              <p className={styles.featuredExcerpt}>{featured.article.excerpt}</p>
              <p className={styles.featuredLead}>{featured.article.lead}</p>
              <div className={styles.featuredDetails}>
                <div>
                  <span className={styles.detailLabel}>By</span>
                  <p>{featured.article.author}</p>
                </div>
                <div>
                  <span className={styles.detailLabel}>Frame</span>
                  <p>{featured.tone}</p>
                </div>
              </div>
              <StoryLink article={featured.article} className={styles.primaryLink}>
                Read Story
              </StoryLink>
            </div>

            <div className={styles.featuredVisualWrap}>
              <div className={styles.featuredVisual} style={coverStyle(featured.article)} />
              <div className={styles.featuredMarginalia}>
                <span>Long-form</span>
                <p>{featured.article.lead}</p>
              </div>
            </div>
          </section>

          <section className={styles.collectionSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>Story collection</p>
                <h2>Pieces arranged with editorial hierarchy instead of a feed.</h2>
              </div>
              <p>
                The reading experience moves between portraits, essays, and observations, varying pace and scale so the page feels closer to a table of contents than a blog archive.
              </p>
            </div>

            <div className={styles.collectionGrid}>
              {curatedStories.map((item) => (
                <CollectionCard key={item.article.slug} item={item} />
              ))}
            </div>
          </section>

          <section className={styles.groupingSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>Reading paths</p>
                <h2>Subtle groupings for the kinds of stories gathered here.</h2>
              </div>
              <p>
                These are not filters or content buckets so much as moods of reading, each with its own cadence and depth.
              </p>
            </div>

            <div className={styles.groupingGrid}>
              {groupedStories.map((group) => (
                <article key={group.name} className={styles.groupCard}>
                  <p className={styles.kicker}>{group.name}</p>
                  <p className={styles.groupDescription}>{group.description}</p>
                  <div className={styles.groupLinks}>
                    {group.items.map((item) => (
                      <StoryLink key={item.article.slug} article={item.article} className={styles.groupLink}>
                        {item.article.title}
                      </StoryLink>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.archiveSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>Archive</p>
                <h2>Explore further into the editorial world.</h2>
              </div>
              <p>
                Older pieces and adjacent reading for anyone who wants to keep moving through HOME&apos;s wider body of writing.
              </p>
            </div>

            <div className={styles.archiveGrid}>
              {archive.map((article) => (
                <ArchiveEntry key={article.slug} article={article} />
              ))}
            </div>
          </section>

          <section className={styles.closing}>
            <p className={styles.kicker}>Stay with the reading</p>
            <h2>The deeper world of HOME is built through slow attention, not speed.</h2>
            <p>
              Follow the essays, founder stories, and editorial features that keep tracing how institutions feel from the inside.
            </p>
            <div className={styles.closingActions}>
              <Link href="/featured" className={styles.secondaryLink}>
                Browse Featured
              </Link>
              <Link href="/philosophy" className={styles.secondaryLink}>
                Read the philosophy
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
