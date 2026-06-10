"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const STYLES = `
  .family-modal__scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(201,168,76,0.15) transparent;
  }
  .family-modal__scroll::-webkit-scrollbar { width: 3px; }
  .family-modal__scroll::-webkit-scrollbar-track { background: transparent; }
  .family-modal__scroll::-webkit-scrollbar-thumb {
    background: rgba(201,168,76,0.15);
    border-radius: 99px;
  }
  @keyframes fmi {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .family-modal__layout {
    display: grid;
    grid-template-columns: 55fr 45fr;
    min-height: 100vh;
    min-height: 100dvh;
  }
  .family-modal__text {
    background: var(--bg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(40px, 7vw, 96px);
    padding-top: clamp(72px, 9vw, 112px);
    padding-bottom: clamp(40px, 7vw, 96px);
  }
  .family-modal__image-col {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
  }
  @media (max-width: 720px) {
    .family-modal__layout {
      grid-template-columns: 1fr;
      min-height: unset;
    }
    .family-modal__text {
      order: 2;
      justify-content: flex-start;
      padding: 1.75rem clamp(1.25rem, 6vw, 2.5rem) 3.5rem;
    }
    .family-modal__image-col {
      order: 1;
      position: relative;
      height: 40vh;
      height: 40dvh;
    }
  }
`;

const pillStyle = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  border: "1px solid var(--line)",
  borderRadius: "2px",
  padding: "0.3rem 0.65rem",
  transition: "color 0.2s ease, border-color 0.2s ease",
};

export default function FamilyModal({ feature, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const NAME_ID = "family-modal-name";

  // Auto-focus close button on mount
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Escape + focus trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab") {
        const modal = modalRef.current;
        if (!modal) return;
        const focusable = Array.from(
          modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.disabled);
        if (!focusable.length) return;
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const hasSocials = feature.socials && Object.values(feature.socials).some(Boolean);
  const hasBody    = Array.isArray(feature.body) && feature.body.length > 0;

  return (
    <>
      <style>{STYLES}</style>

      {/* Outer fixed shell */}
      <div ref={modalRef} style={{ position: "fixed", inset: 0, zIndex: 200 }}>

        {/* Backdrop — dims + blurs the grid behind */}
        <div
          aria-hidden="true"
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "rgba(0, 0, 0, 0.82)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        />

        {/* Close — stays at viewport top-right, never scrolls away */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close profile"
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.75rem",
            zIndex: 3,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "2rem",
            lineHeight: 1,
            padding: "0.2rem 0.4rem",
            borderRadius: "2px",
            transition: "color 0.2s ease",
          }}
        >
          ×
        </button>

        {/* Scroll container — overlay scrolls here, hairline scrollbar */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={NAME_ID}
          className="family-modal__scroll"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {/* Two-column layout — animates in as one unit */}
          <div
            className="family-modal__layout"
            style={{ animation: "fmi 0.38s cubic-bezier(0.22, 1, 0.36, 1) both" }}
          >

            {/* LEFT — text */}
            <div className="family-modal__text">

              {feature.category && (
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  opacity: 0.75,
                  marginBottom: "0.85rem",
                }}>
                  {feature.category}
                </p>
              )}

              <h2
                id={NAME_ID}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.3rem, 4vw, 3.4rem)",
                  fontWeight: 600,
                  lineHeight: 1.08,
                  color: "var(--ink)",
                  marginBottom: "0.55rem",
                }}
              >
                {feature.name}
              </h2>

              {feature.title && (
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  color: "var(--muted)",
                  marginBottom: feature.location ? "0.2rem" : 0,
                }}>
                  {feature.title}
                </p>
              )}

              {feature.location && (
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.82rem",
                  color: "var(--soft)",
                  marginBottom: 0,
                }}>
                  {feature.location}
                </p>
              )}

              {/* Hairline divider */}
              <div style={{
                height: "1px",
                background: "linear-gradient(90deg, rgba(201,168,76,0.45), transparent)",
                margin: "1.5rem 0",
                maxWidth: "10rem",
              }} />

              {feature.excerpt && (
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.15rem",
                  lineHeight: 1.75,
                  color: "var(--text)",
                  maxWidth: "34em",
                  marginBottom: "1.5rem",
                }}>
                  {feature.excerpt}
                </p>
              )}

              {feature.pullQuote && (
                <blockquote style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  color: "var(--gold)",
                  borderLeft: "2px solid var(--gold)",
                  padding: "0 0 0 1rem",
                  margin: "0 0 1.5rem",
                  maxWidth: "34em",
                }}>
                  {feature.pullQuote}
                </blockquote>
              )}

              {feature.gift && (
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.92rem",
                  color: "var(--text)",
                  opacity: 0.85,
                  marginBottom: "1.5rem",
                  maxWidth: "34em",
                }}>
                  {feature.gift}
                </p>
              )}

              {/* Company + social pills — one unified row */}
              {(feature.companyUrl || hasSocials) && (
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.55rem",
                  marginBottom: "1.75rem",
                  alignItems: "center",
                }}>
                  {feature.companyUrl && (
                    <a href={feature.companyUrl} target="_blank" rel="noopener noreferrer" style={pillStyle}>
                      {feature.company || "Company"} ↗
                    </a>
                  )}
                  {hasSocials && feature.socials.instagram && (
                    <a href={feature.socials.instagram} target="_blank" rel="noopener noreferrer" style={pillStyle}>Instagram</a>
                  )}
                  {hasSocials && feature.socials.linkedin && (
                    <a href={feature.socials.linkedin} target="_blank" rel="noopener noreferrer" style={pillStyle}>LinkedIn</a>
                  )}
                  {hasSocials && feature.socials.x && (
                    <a href={feature.socials.x} target="_blank" rel="noopener noreferrer" style={pillStyle}>X</a>
                  )}
                  {hasSocials && feature.socials.website && (
                    <a href={feature.socials.website} target="_blank" rel="noopener noreferrer" style={pillStyle}>Website</a>
                  )}
                </div>
              )}

              {hasBody && (
                <Link
                  href={`/featured/${feature.slug}`}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.85rem",
                    letterSpacing: "0.06em",
                    color: "var(--gold)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    borderBottom: "1px solid rgba(201,168,76,0.35)",
                    paddingBottom: "1px",
                    width: "fit-content",
                  }}
                >
                  Read the full feature →
                </Link>
              )}
            </div>

            {/* RIGHT — portrait */}
            <div
              className="family-modal__image-col"
              style={{ background: "var(--surface-hi)" }}
            >
              {(feature.heroImageWide || feature.heroImage) ? (
                <img
                  src={feature.heroImageWide || feature.heroImage}
                  alt={feature.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                    borderRadius: "0 4px 4px 0",
                  }}
                />
              ) : (
                <div style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "radial-gradient(ellipse at 40% 40%, rgba(74,127,207,0.12) 0%, transparent 60%), " +
                    "radial-gradient(ellipse at 70% 70%, rgba(201,168,76,0.08) 0%, transparent 60%)",
                }} />
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
