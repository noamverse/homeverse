"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// A single framed object hung on the family wall. Hover/focus lifts it,
// warms it, and reveals its content. On coarse pointers (no hover) the
// first tap reveals; a second tap follows through (navigates, if it has
// a destination) — mirrors the lobby door's open-then-enter pattern.
export default function ExplorationObject({ label, title, body, href }) {
  const [revealed, setRevealed] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const toggle = () => {
    navigator.vibrate?.(12);
    setRevealed((r) => !r);
  };

  const content = (
    <>
      <span className="family-wall__glow" aria-hidden="true" />
      <span className="family-wall__label">{label}</span>
      <span className="family-wall__content">
        <strong className="family-wall__title">{title}</strong>
        <span className="family-wall__body">{body}</span>
        {href && <span className="family-wall__enter">Enter &rarr;</span>}
      </span>
    </>
  );

  const className = `family-wall__frame${revealed ? " is-revealed" : ""}`;
  const ariaLabel = `${label} — ${title}. ${body}`;

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        aria-label={ariaLabel}
        onClick={
          coarse && !revealed
            ? (e) => {
                e.preventDefault();
                toggle();
              }
            : undefined
        }
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-expanded={revealed}
      onClick={toggle}
    >
      {content}
    </button>
  );
}
