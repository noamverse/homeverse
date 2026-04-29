"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function FeatureArticleClient({ feature, related }) {
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

  const formattedDate = new Date(feature.publishedDate).toLocaleDateString("en-US", {
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
          <Link href="/featured" style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold)",
            opacity: 0.75,
          }}>
            ← Back to Featured
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
            {feature.category}
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
            {feature.name}
          </h1>

          <p className="home-reveal" style={{
            fontFamily: "Inter, sans-serif",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "var(--gold)",
            opacity: 0.7,
            marginBottom: "3rem",
          }}>
            {feature.byline} · {formattedDate} · {feature.readTime}
          </p>

          <blockquote className="home-reveal" style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "1.5rem",
            lineHeight: 1.5,
            color: "var(--gold)",
            maxWidth: "35ch",
            margin: "0 auto 3.5rem",
            padding: 0,
            border: "none",
            textShadow: "0 0 40px rgba(201,168,76,0.2), 0 0 80px rgba(201,168,76,0.1)",
          }}>
            &ldquo;{feature.pullQuote}&rdquo;
          </blockquote>
        </header>

        {/* Hero image — wide action photo preferred, headshot as fallback */}
        <div className="home-reveal" style={{
          maxWidth: "860px",
          margin: "0 auto 4rem",
          borderRadius: "2px",
          overflow: "hidden",
          border: "1px solid rgba(201,168,76,0.12)",
          aspectRatio: "16 / 9",
          background: "linear-gradient(135deg, #1a1815 0%, #201e1a 50%, #1a1815 100%)",
          position: "relative",
        }}>
          {(feature.heroImageWide || feature.heroImage) ? (
            <img
              src={feature.heroImageWide || feature.heroImage}
              alt={feature.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 25% 40%, rgba(74,127,207,0.1) 0%, transparent 55%), " +
                "radial-gradient(ellipse at 75% 60%, rgba(201,168,76,0.07) 0%, transparent 55%)",
            }} />
          )}
        </div>

        {/* Body */}
        <div style={{ maxWidth: "65ch", margin: "0 auto" }}>
          {feature.body.map((paragraph, i) => (
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
          opacity: 0.4,
        }} />

        {/* More Features */}
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
              More Features
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.25rem",
            }}>
              {related.map((rel) => (
                <article key={rel.slug} style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: "4px",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}>
                  <div style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    background: "var(--surface-hi)",
                    borderRadius: "2px",
                    marginBottom: "0.25rem",
                  }} />
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    opacity: 0.6,
                    margin: 0,
                  }}>
                    {rel.category}
                  </p>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    lineHeight: 1.35,
                    flexGrow: 1,
                    margin: 0,
                  }}>
                    {rel.name}
                  </p>
                  <Link href={`/featured/${rel.slug}`} style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--gold)",
                    letterSpacing: "0.04em",
                    marginTop: "0.25rem",
                  }}>
                    Read →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
