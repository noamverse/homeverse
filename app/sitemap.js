import { features } from "@/content/features";
import stories from "@/content/stories";

export default function sitemap() {
  const baseUrl = "https://homeverse.family";

  const staticRoutes = ["", "/philosophy", "/featured", "/stories", "/ecosystem", "/welcome"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  const featureRoutes = features.map((f) => ({
    url: `${baseUrl}/featured/${f.slug}`,
    lastModified: new Date(f.publishedDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const storyRoutes = stories.map((s) => ({
    url: `${baseUrl}/stories/${s.slug}`,
    lastModified: new Date(s.publishedDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...featureRoutes, ...storyRoutes];
}
