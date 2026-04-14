import SectionPage from "@/components/section-page";
import { getArticlesBySection } from "@/lib/content";

export const metadata = {
  title: "News",
};

export default function NewsPage() {
  return (
    <SectionPage
      eyebrow="News"
      title="Current events with elegance and restraint."
      description="Coverage that values context over panic and perspective over volume."
      articles={getArticlesBySection("news")}
    />
  );
}
