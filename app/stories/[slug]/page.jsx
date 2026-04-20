import stories from "@/content/stories";
import StoryArticleClient from "./_client";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const story = stories.find((s) => s.slug === params.slug);
  if (!story) return { title: "Story Not Found" };
  return {
    title: story.title,
    description: story.excerpt,
  };
}

export default function Page({ params }) {
  const story = stories.find((s) => s.slug === params.slug);
  const related = stories
    .filter((s) => s.slug !== params.slug)
    .slice(0, 3);

  if (!story) {
    return (
      <main style={{ padding: "8rem 2rem", textAlign: "center" }}>
        <p style={{ fontFamily: "Inter, sans-serif", color: "var(--muted)", fontSize: "1rem" }}>
          This story hasn&rsquo;t been published yet. Check back soon.
        </p>
      </main>
    );
  }

  return <StoryArticleClient story={story} related={related} />;
}
