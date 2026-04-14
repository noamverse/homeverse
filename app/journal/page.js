import SectionPage from "@/components/section-page";
import { getArticlesBySection } from "@/lib/content";

export const metadata = {
  title: "Journal",
};

export default function JournalPage() {
  return (
    <SectionPage
      eyebrow="Journal"
      title="Private thinking made public with precision."
      description="Essays, notes, reflections, and editorial writing from the world behind HOME."
      articles={getArticlesBySection("journal")}
    />
  );
}
