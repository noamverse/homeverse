import SectionPage from "@/components/section-page";
import { getArticlesBySection } from "@/lib/content";

export const metadata = {
  title: "Journal",
};

export default function JournalPage() {
  return (
    <SectionPage
      eyebrow="Journal"
      title="Essays from inside the house."
      description="A quieter chamber for notes, reflections, philosophy, and the interior language behind HOME."
      articles={getArticlesBySection("journal")}
    />
  );
}
