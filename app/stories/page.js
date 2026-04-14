import SectionPage from "@/components/section-page";
import { getArticlesBySection } from "@/lib/content";

export const metadata = {
  title: "Stories",
};

export default function StoriesPage() {
  return (
    <SectionPage
      eyebrow="Stories"
      title="Entrepreneur features with warmth, ambition, and depth."
      description="Portraits of founders, builders, and cultural leaders shaping the next generation with taste and conviction."
      articles={getArticlesBySection("stories")}
    />
  );
}
