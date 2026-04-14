import Link from "next/link";

function coverStyle(article) {
  if (article.image) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.05), rgba(35,24,15,0.12)), url(${article.image})`,
    };
  }

  return {
    backgroundImage: article.tone,
  };
}

export default function ArticleCard({ article, large = false }) {
  return (
    <article className={large ? "article-card article-card--large" : "article-card"}>
      <Link href={`/articles/${article.slug}`} className="article-card__link">
        <div className="article-card__cover" style={coverStyle(article)} />
        <div className="article-card__body">
          <div className="article-kicker">{article.category}</div>
          <h2 className={large ? "article-title" : "article-title article-title--small"}>{article.title}</h2>
          <p className="lead-copy">{article.excerpt}</p>
          <div className="meta-row">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
