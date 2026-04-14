import Link from "next/link";

function coverStyle(article) {
  if (article.image) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(35,24,15,0.16)), url(${article.image})`,
    };
  }

  return {
    backgroundImage: article.tone,
  };
}

export default function ArticlePage({ article }) {
  const shareUrl = `https://example.com/articles/${article.slug}`;

  return (
    <main className="page-main">
      <article className="article-shell">
        <div className="article-hero">
          <div className="eyebrow">{article.category}</div>
          <h1 className="hero-title" style={{ maxWidth: "12ch", marginBottom: 16 }}>
            {article.title}
          </h1>
          <div className="meta-row" style={{ marginBottom: 18 }}>
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <p className="article-lead lead-copy">{article.lead}</p>
        </div>

        <div className="article-hero__cover" style={coverStyle(article)} />

        <div className="article-body">
          {article.content.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="author-box">
          <div className="eyebrow" style={{ marginBottom: 4 }}>
            Author
          </div>
          <div className="author-name">{article.author}</div>
          <div className="section-copy">{article.role}</div>
          <div className="section-copy">{article.excerpt}</div>
        </div>

        <div className="share-box">
          <div className="eyebrow" style={{ marginBottom: 10 }}>
            Share
          </div>
          <div className="share-row">
            <Link
              className="share-chip"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`}
            >
              Share on X
            </Link>
            <Link
              className="share-chip"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            >
              Share on LinkedIn
            </Link>
            <Link className="share-chip" href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareUrl)}`}>
              Email article
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
