"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Door({ door, isOpen, onOpen }) {
  const reduce = useReducedMotion();
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const flat = reduce || coarse;

  const handleOpen = () => {
    if (isOpen) return;
    navigator.vibrate?.(16);
    onOpen(door.key);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div
      className={`door-slot${isOpen ? " door-slot--open" : ""}`}
      style={{ "--door-accent": door.accent, "--door-glow": door.glow }}
    >
      <div className="door__reveal-layer">
        {isOpen && (
          <Link href={door.href} className="door__enter">
            Enter &rarr;
          </Link>
        )}
      </div>

      <motion.button
        type="button"
        className={`door${isOpen ? " door--open" : ""}`}
        aria-label={`${door.verb} — ${door.line}`}
        aria-expanded={isOpen}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        animate={
          flat
            ? { opacity: isOpen ? 0 : 1 }
            : { rotateY: isOpen ? -112 : 0 }
        }
        whileHover={!isOpen && !flat ? { z: 36, scale: 1.03 } : undefined}
        whileTap={!isOpen ? { scale: 0.96 } : undefined}
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
      >
        <div className="door__edge" aria-hidden="true" />
        <div className="door__light" aria-hidden="true" />
        <span className="door__handle" aria-hidden="true" />
        <div className="door__face">
          <h3 className="door__verb">{door.verb}</h3>
          <p className="door__line">{door.line}</p>
        </div>
      </motion.button>
    </div>
  );
}
