"use client";

import Link from "next/link";

export default function Door({ door, isOpen, onOpen }) {
  const handleToggle = () => {
    navigator.vibrate?.(16);
    onOpen(isOpen ? null : door.key);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className={`door-slot${isOpen ? " door-slot--open" : ""}`}
      style={{ "--door-accent": door.accent, "--door-glow": door.glow }}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${door.verb} — ${door.line}`}
      aria-expanded={isOpen}
    >
      <div className="door-beyond">
        {isOpen && (
          <Link
            href={door.href}
            className="door__enter"
            onClick={(e) => e.stopPropagation()}
          >
            Enter &rarr;
          </Link>
        )}
      </div>

      <div className={`door-panel${isOpen ? " is-open" : ""}`}>
        <div className="door__edge" aria-hidden="true" />
        <div className="door__light" aria-hidden="true" />
        <span className="door__handle" aria-hidden="true" />
        <div className="door__face">
          <h3 className="door__verb">{door.verb}</h3>
          <p className="door__line">{door.line}</p>
        </div>
      </div>
    </div>
  );
}
