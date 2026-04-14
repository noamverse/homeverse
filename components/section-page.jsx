import ArticleCard from "@/components/article-card";

export default function SectionPage({ eyebrow, title, description, articles }) {
  return (
    <main className="page-main">
      <div className="container">
        <section className="page-hero">
          <div className="page-hero__inner">
            <div className="eyebrow">{eyebrow}</div>
            <h1 className="section-title">{title}</h1>
            <p className="section-copy">{description}</p>
          </div>
        </section>

        <section className="page-grid">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </section>
      </div>
    </main>
  );
}
