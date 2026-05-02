"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function StoryArticleClient({ story, related }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("home-revealed");
            observer.unobserve(e.target);
          }
        });
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );
    document.querySelectorAll(".home-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const formattedDate = new Date(story.publishedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <div className="home-grain" aria-hidden="true" />
      <div className="home-bloom-cool" aria-hidden="true" style={{ top: "-5vh", left: "-10vw" }} />
      <div className="home-bloom-warm" aria-hidden="true" style={{ top: "35vh", right: "-5vw" }} />
      <div className="home-bloom-gold" aria-hidden="true" style={{ bottom: "5vh", left: "10vw" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--max-width)", margin: "0 auto", padding: "2rem 2rem 8rem" }}>

        {/* Back link */}
        <div style={{ paddingTop: "2rem" }}>
          <Link href="/stories" style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold)",
            opacity: 0.75,
          }}>
            ← Back to Stories
          </Link>
        </div>

        {/* Article header */}
        <header style={{ textAlign: "center", maxWidth: "65ch", margin: "4rem auto 0" }}>
          <p className="home-reveal" style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold)",
            opacity: 0.7,
            marginBottom: "1.5rem",
          }}>
            {story.category}
          </p>

          <h1 className="home-reveal" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 600,
            lineHeight: 1.2,
            color: "var(--ink)",
            maxWidth: "24ch",
            margin: "0 auto 1.5rem",
          }}>
            {story.title}
          </h1>

          <p className="home-reveal" style={{
            fontFamily: "Inter, sans-serif",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "var(--gold)",
            opacity: 0.7,
            marginBottom: "4rem",
          }}>
            {story.byline} · {formattedDate} · {story.readTime}
          </p>
        </header>

        {/* Hero image — natural aspect ratio, gradient border */}
        {story.heroImage && (
          <div className="home-reveal story-article-hero">
            <img
              src={story.heroImage}
              alt={story.title}
              className="story-article-hero__img"
            />
          </div>
        )}

        {/* Body */}
        <div style={{ maxWidth: "65ch", margin: "0 auto" }}>
          {story.body.map((paragraph, i) => (
            <p key={i} className="home-reveal" style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "var(--text)",
              marginBottom: "1.75rem",
              transitionDelay: `${i * 60}ms`,
            }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Hairline divider */}
        <div className="home-reveal" style={{
          maxWidth: "360px",
          margin: "4rem auto",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
        }} />

        {/* More Stories */}
        {related.length > 0 && (
          <section className="home-reveal" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold)",
              opacity: 0.65,
              textAlign: "center",
              marginBottom: "2.5rem",
            }}>
              More Stories
            </p>
            <div className="story-more-grid">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/stories/${rel.slug}`}
                  className="story-more-card"
                  aria-label={`Read "${rel.title}"`}
                >
                  <div className="story-more-card__image">
                    {rel.heroImage && (
                      <img
                        src={rel.heroImage}
                        alt={rel.title}
                      />
                    )}
                  </div>
                  <div className="story-more-card__body">
                    <p className="story-more-card__category">{rel.category}</p>
                    <p className="story-more-card__title">{rel.title}</p>
                    <span className="story-more-card__read" aria-hidden="true">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
