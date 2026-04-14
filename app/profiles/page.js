import SectionPage from "@/components/section-page";
import { getArticlesBySection } from "@/lib/content";

export const metadata = {
  title: "Profiles",
};

export default function ProfilesPage() {
  return (
    <SectionPage
      eyebrow="Profiles"
      title="Portraits of the people shaping enduring worlds."
      description="Founders, patrons, hosts, and cultural builders whose work is defined by atmosphere, seriousness, and long-term stewardship."
      articles={getArticlesBySection("profiles")}
    />
  );
}
