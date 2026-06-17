"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Guestbook from "./Guestbook";
import useRoomParallax from "./useRoomParallax";

const SPARKS = [
  { left: "49%", bottom: "36%", size: 3,   op: 0.75, dur: 2.1, delay: -0.5 },
  { left: "52%", bottom: "39%", size: 2,   op: 0.55, dur: 1.8, delay: -1.2 },
  { left: "47%", bottom: "34%", size: 2.5, op: 0.65, dur: 2.4, delay: -0.3 },
  { left: "53%", bottom: "41%", size: 1.8, op: 0.5,  dur: 1.6, delay: -1.8 },
  { left: "50%", bottom: "37%", size: 2,   op: 0.6,  dur: 2.2, delay: -0.9 },
];

export default function BuildRoom({ room }) {
  const reduce = useReducedMotion();
  const parallaxRef = useRoomParallax();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const openPanel = () => {
    navigator.vibrate?.(14);
    setOpen(true);
  };

  return (
    <div className="build-room" ref={parallaxRef}>
      <div className="build-room__backdrop" aria-hidden="true">
        <div className="room-layer build-room__wall"    style={{ "--depth": 0.04 }} />
        <div className="room-layer build-room__grid"    style={{ "--depth": 0.06 }} />
        <div className="room-layer build-room__pool"    style={{ "--depth": 0.14 }} />
        <div className="room-layer build-room__vignette" style={{ "--depth": 0.18 }} />
        {mounted &&
          !reduce &&
          SPARKS.map((s, i) => (
            <span
              key={i}
              className="build-room__spark"
              style={{
                left: s.left,
                bottom: s.bottom,
                width: `${s.size}px`,
                height: `${s.size}px`,
                "--spark-op": s.op,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
      </div>

      <div className="build-room__content">
        <div className="build-room__title">
          <motion.p
            className="build-room__eyebrow"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.3 : 0.9, ease: "easeOut", delay: reduce ? 0.1 : 0.2 }}
          >
            {room.eyebrow}
          </motion.p>
          <motion.h1
            className="build-room__headline"
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 1.1, ease: "easeOut", delay: reduce ? 0.2 : 0.5 }}
          >
            {room.welcome}
          </motion.h1>
          <motion.p
            className="build-room__subline"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.3 : 0.85 }}
          >
            {room.signature}
          </motion.p>
          <motion.p
            className="build-room__orientation"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.35 : 1.1 }}
          >
            {room.identityBody}
          </motion.p>
        </div>

        <motion.div
          className="build-room__cube-stage depth-layer"
          style={{ "--depth": 0.16 }}
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.4 : 1.4 }}
        >
          <button
            type="button"
            className="build-room__cube-btn"
            aria-label="Open the build panel"
            onClick={openPanel}
          >
            {/* Blueprint frame SVG — draws itself on load */}
            <svg
              className="build-room__blueprint-frame"
              viewBox="0 0 180 180"
              aria-hidden="true"
            >
              <rect
                className="build-room__blueprint-rect"
                x="8" y="8" width="164" height="164"
                fill="none"
                stroke="rgba(95,200,224,0.45)"
                strokeWidth="1"
              />
              {/* Corner crosshair marks */}
              <line x1="8"   y1="8"   x2="28"  y2="8"   stroke="rgba(95,200,224,0.35)" strokeWidth="1" />
              <line x1="8"   y1="8"   x2="8"   y2="28"  stroke="rgba(95,200,224,0.35)" strokeWidth="1" />
              <line x1="172" y1="8"   x2="152" y2="8"   stroke="rgba(95,200,224,0.35)" strokeWidth="1" />
              <line x1="172" y1="8"   x2="172" y2="28"  stroke="rgba(95,200,224,0.35)" strokeWidth="1" />
              <line x1="8"   y1="172" x2="28"  y2="172" stroke="rgba(95,200,224,0.35)" strokeWidth="1" />
              <line x1="8"   y1="172" x2="8"   y2="152" stroke="rgba(95,200,224,0.35)" strokeWidth="1" />
              <line x1="172" y1="172" x2="152" y2="172" stroke="rgba(95,200,224,0.35)" strokeWidth="1" />
              <line x1="172" y1="172" x2="172" y2="152" stroke="rgba(95,200,224,0.35)" strokeWidth="1" />
            </svg>

            {/* Wireframe cube */}
            <div className="build-room__cube-wrap">
              <div className="build-room__cube">
                <div className="build-room__cube-face build-room__cube-face--front"  />
                <div className="build-room__cube-face build-room__cube-face--back"   />
                <div className="build-room__cube-face build-room__cube-face--right"  />
                <div className="build-room__cube-face build-room__cube-face--left"   />
                <div className="build-room__cube-face build-room__cube-face--top"    />
                <div className="build-room__cube-face build-room__cube-face--bottom" />
              </div>
            </div>

            <span className="build-room__cube-glow" aria-hidden="true" />
          </button>
          <p className="build-room__prompt">Place your build on the table.</p>
        </motion.div>
      </div>

      <Guestbook desk={room.desk} hideTrigger open={open} onOpenChange={setOpen} />
    </div>
  );
}
