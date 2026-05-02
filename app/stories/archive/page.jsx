import Link from "next/link";
import stories from "@/content/stories";

export const metadata = {
  title: "The Full Library — Stories",
  description: "Every essay, dispatch, and reflection ever published on HOME.",
};

function formatMonthYear(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function ArchivePage() {
  const sorted = [...stories].sort(
    (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
  );

  // Group by year
  const byYear = {};
  for (const story of sorted) {
    const year = new Date(story.publishedDate).getFullYear().toString();
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(story);
  }
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <div className="home-grain" aria-hidden="true" />
      <div className="home-bloom-cool" aria-hidden="true" style={{ top: "-5vh", left: "-10vw" }} />
      <div className="home-bloom-gold" aria-hidden="true" style={{ bottom: "5vh", right: "-5vw" }} />

      {/* ── Header Band ── */}
      <section className="stories-hero" aria-label="Archive header">
        <div className="container">
          <p className="stories-hero__eyebrow">Stories / Archive</p>
          <h1 className="stories-hero__headline">The Full Library</h1>
          <p className="stories-hero__sub">
            Every essay, dispatch, and reflection ever published on HOME.
          </p>
        </div>
      </section>

      <div className="container stories-body" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Year groups ── */}
        {years.map((year) => (
          <section key={year} className="stories-archive-year">
            <div className="stories-archive-year-divider" aria-hidden="true">
              <span className="stories-archive-year-label">{year}</span>
            </div>
            <div className="stories-archive-list" role="list">
              {byYear[year].map((story) => (
                <Link
                  key={story.slug}
                  href={`/stories/${story.slug}`}
                  className="stories-archive-row"
                  role="listitem"
                  aria-label={`Read "${story.title}"`}
                >
                  <div className="stories-archive-row__content">
                    <h2 className="stories-archive-row__title">{story.title}</h2>
                    <div className="stories-archive-row__meta">
                      <span className="stories-archive-row__category">{story.category}</span>
                      <span className="stories-archive-row__date">
                        {formatMonthYear(story.publishedDate)} &middot; {story.readTime}
                      </span>
                    </div>
                  </div>
                  <span className="stories-archive-row__read" aria-hidden="true">Read →</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* ── Back link ── */}
        <div className="stories-archive-back">
          <Link href="/stories">← Back to Stories</Link>
        </div>

      </div>
    </main>
  );
}
