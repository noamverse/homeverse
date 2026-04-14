import SectionPage from "@/components/section-page";
import { getArticlesBySection } from "@/lib/content";

export const metadata = {
  title: "Stories",
};

export default function StoriesPage() {
  return (
    <SectionPage
      eyebrow="Stories"
      title="Narratives about atmosphere, stewardship, and the worlds people build."
      description="Longer-form stories about institutions, builders, culture, and the emotional architecture behind serious lives."
      articles={getArticlesBySection("stories")}
    />
  );
}
