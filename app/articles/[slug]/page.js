import { notFound } from "next/navigation";
import ArticlePage from "@/components/article-page";
import { articles, getArticleBySlug } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function ArticleRoute({ params }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return <ArticlePage article={article} />;
}
