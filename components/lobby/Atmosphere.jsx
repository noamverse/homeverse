"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function makeMotes(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: +((i * 137.508) % 100).toFixed(2),
    bottom: +((i * 71.3) % 70).toFixed(2),
    size: 1.5 + (i % 4) * 0.6,
    op: 0.18 + (i % 5) * 0.05,
    dur: 14 + (i % 9),
    delay: -((i * 2.7) % 20),
  }));
}

export default function Atmosphere() {
  const poolRef = useRef(null);
  const reduce = useReducedMotion();
  const [motes, setMotes] = useState([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setMotes(makeMotes(isMobile ? 8 : 16));
  }, []);

  useEffect(() => {
    if (reduce) return;

    const cur = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };
    let rafId;

    const onMove = (e) => {
      tgt.x = (e.clientX / window.innerWidth - 0.5) * 60;
      tgt.y = (e.clientY / window.innerHeight - 0.5) * 40;
    };

    const tick = () => {
      cur.x += (tgt.x - cur.x) * 0.05;
      cur.y += (tgt.y - cur.y) * 0.05;
      if (poolRef.current) {
        poolRef.current.style.setProperty("--mx", `${cur.x.toFixed(1)}px`);
        poolRef.current.style.setProperty("--my", `${cur.y.toFixed(1)}px`);
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [reduce]);

  return (
    <div className="lobby-atmosphere" aria-hidden="true">
      <div className="lobby-atmosphere__pool" ref={poolRef} />
      {!reduce &&
        motes.map((m) => (
          <span
            key={m.id}
            className="mote"
            style={{
              left: `${m.left}%`,
              bottom: `${m.bottom}%`,
              width: `${m.size}px`,
              height: `${m.size}px`,
              "--mote-op": m.op,
              animationDuration: `${m.dur}s`,
              animationDelay: `${m.delay}s`,
            }}
          />
        ))}
      <div className="lobby-atmosphere__floor" />
      <div className="lobby-atmosphere__vignette" />
    </div>
  );
}
