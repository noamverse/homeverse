"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useHouseMap } from "./HouseMapProvider";
import { house } from "@/content/house";

// A floor node — full-size card used for upper/fellowship/root tiers
function FloorNode({ node, pathname, onClose }) {
  const isHere = node.href === pathname;
  const cls = `hmap-node hmap-node--${node.status}${isHere ? " hmap-node--here" : ""}`;

  if (node.status === "open" && node.href) {
    return (
      <Link href={node.href} className={cls} onClick={onClose}>
        <span className="hmap-node__dot" aria-hidden="true" />
        <span className="hmap-node__name">{node.name}</span>
        {node.role && <span className="hmap-node__role">{node.role}</span>}
        {isHere && <span className="hmap-node__here">you are here</span>}
      </Link>
    );
  }

  return (
    <div className={cls} aria-disabled="true">
      <span className="hmap-node__dot" aria-hidden="true" />
      <span className="hmap-node__name">{node.name}</span>
      {node.role && <span className="hmap-node__role">{node.role}</span>}
      <span className="hmap-node__soon-label">opening soon</span>
    </div>
  );
}

// A door chip — compact pill used inside the Lobby floor
function DoorChip({ node, pathname, onClose }) {
  const isHere = node.href === pathname;
  const cls = `hmap-door hmap-door--${node.status}${isHere ? " hmap-door--here" : ""}`;

  if (node.status === "open" && node.href) {
    return (
      <Link href={node.href} className={cls} onClick={onClose}>
        {node.name}
        {isHere && <span className="hmap-door__here" aria-hidden="true"> ●</span>}
      </Link>
    );
  }

  return (
    <span className={cls} aria-disabled="true" title="Opening soon">
      {node.name}
    </span>
  );
}

export default function HouseMap() {
  const { open, closeMap } = useHouseMap();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const panelRef = useRef(null);

  const byTier = (tier) => house.nodes.filter((n) => n.tier === tier);
  const isLobbyHere = pathname === "/";

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") closeMap(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMap]);

  // Focus first element when opened
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      panelRef.current?.querySelector("a[href], button:not([disabled])")?.focus();
    }, 60);
    return () => clearTimeout(t);
  }, [open]);

  // Focus trap inside the panel
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    const trap = (e) => {
      if (e.key !== "Tab") return;
      const focusable = [
        ...panel.querySelectorAll("a[href], button:not([disabled])"),
      ];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", trap);
    return () => panel.removeEventListener("keydown", trap);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="hmap-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.3, ease: "easeOut" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeMap(); }}
          role="dialog"
          aria-modal="true"
          aria-label="House Map"
        >
          <motion.div
            className="hmap-panel"
            ref={panelRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="hmap-close" onClick={closeMap} aria-label="Close House Map">
              &times;
            </button>

            <p className="hmap-eyebrow">House Map</p>

            <div className="hmap-tower" role="navigation" aria-label="Floor directory">

              {/* Penthouse */}
              <div className="hmap-tier hmap-tier--penthouse">
                {byTier("penthouse").map((n) => (
                  <FloorNode key={n.name} node={n} pathname={pathname} onClose={closeMap} />
                ))}
              </div>

              {/* Upper */}
              <div className="hmap-tier hmap-tier--upper">
                {byTier("upper").map((n) => (
                  <FloorNode key={n.name} node={n} pathname={pathname} onClose={closeMap} />
                ))}
              </div>

              {/* Fellowship */}
              <div className="hmap-tier hmap-tier--fellowship">
                {byTier("fellowship").map((n) => (
                  <FloorNode key={n.name} node={n} pathname={pathname} onClose={closeMap} />
                ))}
              </div>

              <p className="hmap-divider">the floors above open as the house fills</p>

              {/* Lobby — the lit floor */}
              <div className={`hmap-tier hmap-tier--lobby${isLobbyHere ? " hmap-tier--here" : ""}`}>
                <div className="hmap-lobby">
                  <div className="hmap-lobby__header">
                    <Link href="/" className="hmap-lobby__title" onClick={closeMap}>
                      The Lobby
                    </Link>
                    {isLobbyHere && (
                      <span className="hmap-lobby__here">you are here</span>
                    )}
                  </div>
                  <div className="hmap-lobby__doors">
                    {byTier("door").map((n) => (
                      <DoorChip key={n.name} node={n} pathname={pathname} onClose={closeMap} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Root / Tree */}
              <div className="hmap-tier hmap-tier--root">
                {byTier("root").map((n) => (
                  <FloorNode key={n.name} node={n} pathname={pathname} onClose={closeMap} />
                ))}
              </div>

            </div>

            {/* Public pages row */}
            <nav className="hmap-public" aria-label="Public pages">
              {byTier("public").map((n) => (
                <FloorNode key={n.name} node={n} pathname={pathname} onClose={closeMap} />
              ))}
            </nav>

            {/* Footer */}
            <footer className="hmap-footer">
              <p className="hmap-legend">
                <span className="hmap-legend__item hmap-legend__item--open">● open</span>
                <span className="hmap-legend__item hmap-legend__item--soon">○ opening soon</span>
              </p>
              <Link href="/" className="hmap-return" onClick={closeMap}>
                Return to the Lobby
              </Link>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
