import { features } from "@/content/features";
import FeatureArticleClient from "./_client";

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }) {
  const feature = features.find((f) => f.slug === params.slug);
  if (!feature) return { title: "Feature Not Found" };
  return {
    title: feature.name,
    description: feature.excerpt,
  };
}

export default function Page({ params }) {
  const feature = features.find((f) => f.slug === params.slug);
  const related = features
    .filter((f) => f.slug !== params.slug)
    .slice(0, 3);

  if (!feature) {
    return (
      <main style={{ padding: "8rem 2rem", textAlign: "center" }}>
        <p style={{ fontFamily: "Inter, sans-serif", color: "var(--muted)", fontSize: "1rem" }}>
          This feature hasn&rsquo;t been published yet. Check back soon.
        </p>
      </main>
    );
  }

  return <FeatureArticleClient feature={feature} related={related} />;
}
