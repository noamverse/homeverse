import { notFound } from "next/navigation";
import { features } from "@/content/features";
import FamilyPage from "@/components/family-page";

export function generateStaticParams() {
  return features
    .filter((f) => f.published === true)
    .map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }) {
  const feature = features.find(
    (f) => f.slug === params.slug && f.published === true
  );
  if (!feature) return { title: "Family" };
  return {
    title: feature.name,
    description: feature.excerpt ?? `${feature.name} — HOME Family`,
  };
}

export default function Page({ params }) {
  const feature = features.find(
    (f) => f.slug === params.slug && f.published === true
  );
  if (!feature) notFound();

  return <FamilyPage initialOpenSlug={params.slug} />;
}
