"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Guestbook from "./Guestbook";
import useRoomParallax from "./useRoomParallax";

const EMBERS = [
  { left: "48%", bottom: "38%", size: 2.5, op: 0.55, dur: 5.2, delay: -1.0 },
  { left: "51%", bottom: "41%", size: 2,   op: 0.42, dur: 4.8, delay: -2.5 },
  { left: "46%", bottom: "36%", size: 3,   op: 0.48, dur: 6.1, delay: -0.7 },
  { left: "53%", bottom: "43%", size: 1.8, op: 0.38, dur: 4.4, delay: -3.2 },
  { left: "49%", bottom: "39%", size: 2.2, op: 0.5,  dur: 5.5, delay: -1.8 },
  { left: "52%", bottom: "35%", size: 1.5, op: 0.3,  dur: 7.0, delay: -4.1 },
];

export default function BringRoom({ room }) {
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
    <div className="bring-room" ref={parallaxRef}>
      <div className="bring-room__backdrop" aria-hidden="true">
        <div className="room-layer bring-room__wall"    style={{ "--depth": 0.05 }} />
        <div className="room-layer bring-room__pool"    style={{ "--depth": 0.12 }} />
        <div className="room-layer bring-room__vignette" style={{ "--depth": 0.16 }} />
        {mounted && !reduce && EMBERS.map((e, i) => (
          <span
            key={i}
            className="bring-room__ember"
            style={{
              left: e.left,
              bottom: e.bottom,
              width: `${e.size}px`,
              height: `${e.size}px`,
              "--ember-op": e.op,
              animationDuration: `${e.dur}s`,
              animationDelay: `${e.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="bring-room__content">
        <div className="bring-room__title">
          <motion.p
            className="bring-room__eyebrow"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.3 : 0.9, ease: "easeOut", delay: reduce ? 0.1 : 0.2 }}
          >
            {room.eyebrow}
          </motion.p>
          <motion.h1
            className="bring-room__headline"
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 1.1, ease: "easeOut", delay: reduce ? 0.2 : 0.5 }}
          >
            {room.welcome}
          </motion.h1>
          <motion.p
            className="bring-room__subline"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.3 : 0.85 }}
          >
            {room.signature}
          </motion.p>
          <motion.p
            className="bring-room__orientation"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.35 : 1.1 }}
          >
            {room.identityBody}
          </motion.p>
        </div>

        <motion.div
          className="bring-room__tray-stage depth-layer"
          style={{ "--depth": 0.16 }}
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.4 : 1.4 }}
        >
          <button
            type="button"
            className="bring-room__tray-btn"
            aria-label="Open the offering table"
            onClick={openPanel}
          >
            <div className="bring-room__tray">
              <div className="bring-room__tray-handle" />
              <div className="bring-room__tray-lid" />
              <div className="bring-room__tray-base" />
            </div>
            <span className="bring-room__tray-glow" aria-hidden="true" />
          </button>
          <p className="bring-room__prompt">Bring who you are.</p>
        </motion.div>
      </div>

      <Guestbook desk={room.desk} hideTrigger open={open} onOpenChange={setOpen} />
    </div>
  );
}
