"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Guestbook from "./Guestbook";
import useRoomParallax from "./useRoomParallax";

const NODES = [
  { id: "a", cx: 72,  cy: 80  },
  { id: "b", cx: 165, cy: 46  },
  { id: "c", cx: 282, cy: 68  },
  { id: "d", cx: 338, cy: 138 },
  { id: "e", cx: 200, cy: 158 },
  { id: "f", cx: 88,  cy: 198 },
  { id: "g", cx: 312, cy: 218 },
  { id: "h", cx: 150, cy: 232 },
];

const ARCS = [
  { from: "a", to: "b" },
  { from: "b", to: "c" },
  { from: "c", to: "d" },
  { from: "d", to: "e" },
  { from: "e", to: "f" },
  { from: "e", to: "g" },
  { from: "f", to: "h" },
  { from: "b", to: "e" },
  { from: "a", to: "f" },
];

function getNode(id) {
  return NODES.find((n) => n.id === id);
}

function arcPath(fromId, toId) {
  const f = getNode(fromId);
  const t = getNode(toId);
  const mx = (f.cx + t.cx) / 2;
  const my = (f.cy + t.cy) / 2 - 28;
  return `M ${f.cx} ${f.cy} Q ${mx} ${my} ${t.cx} ${t.cy}`;
}

export default function PartnerRoom({ room }) {
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
    <div className="partner-room" ref={parallaxRef}>
      <div className="partner-room__backdrop" aria-hidden="true">
        <div className="room-layer partner-room__wall"      style={{ "--depth": 0.04 }} />
        <div className="room-layer partner-room__graticule"  style={{ "--depth": 0.07 }} />
        <div className="room-layer partner-room__pool"      style={{ "--depth": 0.12 }} />
        <div className="room-layer partner-room__vignette"   style={{ "--depth": 0.17 }} />
      </div>

      <div className="partner-room__content">
        <div className="partner-room__title">
          <motion.p
            className="partner-room__eyebrow"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.3 : 0.9, ease: "easeOut", delay: reduce ? 0.1 : 0.2 }}
          >
            {room.eyebrow}
          </motion.p>
          <motion.h1
            className="partner-room__headline"
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 1.1, ease: "easeOut", delay: reduce ? 0.2 : 0.5 }}
          >
            {room.welcome}
          </motion.h1>
          <motion.p
            className="partner-room__subline"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.3 : 0.85 }}
          >
            {room.signature}
          </motion.p>
          <motion.p
            className="partner-room__orientation"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.35 : 1.1 }}
          >
            {room.identityBody}
          </motion.p>
        </div>

        <motion.div
          className="partner-room__map-stage depth-layer"
          style={{ "--depth": 0.14 }}
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.4 : 1.4 }}
        >
          <button
            type="button"
            className="partner-room__map-btn"
            aria-label="Open a channel"
            onClick={openPanel}
          >
            <svg
              className="partner-room__map"
              viewBox="0 0 400 280"
              aria-hidden="true"
            >
              {ARCS.map((arc, i) => (
                <path
                  key={i}
                  className="partner-room__arc"
                  d={arcPath(arc.from, arc.to)}
                  fill="none"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}

              {mounted && !reduce && (
                <circle className="partner-room__signal" r="3">
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    path={arcPath("b", "e")}
                  />
                </circle>
              )}

              {NODES.map((node, i) => (
                <g key={node.id}>
                  <circle
                    className="partner-room__node-pulse"
                    cx={node.cx}
                    cy={node.cy}
                    r="4"
                    style={{ animationDelay: `${i * 0.45}s` }}
                  />
                  <circle
                    className="partner-room__node"
                    cx={node.cx}
                    cy={node.cy}
                    r="3.5"
                    style={{ animationDelay: `${i * 0.45}s` }}
                  />
                </g>
              ))}
            </svg>
            <span className="partner-room__map-glow" aria-hidden="true" />
          </button>
          <p className="partner-room__prompt">Open a channel.</p>
        </motion.div>
      </div>

      <Guestbook desk={room.desk} hideTrigger open={open} onOpenChange={setOpen} />
    </div>
  );
}
