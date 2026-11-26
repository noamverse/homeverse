import { features } from "@/content/features";
import stories from "@/content/stories";

export default function sitemap() {
  const baseUrl = "https://homeverse.family";

  // HOME's four public pages + homepage
  const staticRoutes = [
    "",
    "/philosophy",
    "/stories",
    "/family",
    "/ecosystem",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Published Family profiles
  const familyRoutes = features
    .filter((f) => f.published === true)
    .map((f) => ({
      url: `${baseUrl}/family/${f.slug}`,
      lastModified: new Date(f.publishedDate),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // Published Stories
  const storyRoutes = stories
    .filter((s) => s.slug && !s.slug.startsWith("placeholder"))
    .map((s) => ({
      url: `${baseUrl}/stories/${s.slug}`,
      lastModified: new Date(s.publishedDate),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    ...staticRoutes,
    ...familyRoutes,
    ...storyRoutes,
  ];
}
