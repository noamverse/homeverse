"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const RANGE_X = 18;
const RANGE_Y = 12;

// Tracks pointer position and writes lerped --px/--py custom properties
// onto the returned ref. Descendants read these (scaled by their own
// --depth) to fake 2.5D parallax without any layout/paint cost.
export default function useRoomParallax() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    const cur = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };
    let rafId;

    const onMove = (e) => {
      tgt.x = (e.clientX / window.innerWidth - 0.5) * RANGE_X;
      tgt.y = (e.clientY / window.innerHeight - 0.5) * RANGE_Y;
    };

    const tick = () => {
      cur.x += (tgt.x - cur.x) * 0.06;
      cur.y += (tgt.y - cur.y) * 0.06;
      el.style.setProperty("--px", `${cur.x.toFixed(2)}px`);
      el.style.setProperty("--py", `${cur.y.toFixed(2)}px`);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [reduce]);

  return ref;
}
