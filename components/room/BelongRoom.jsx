"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Guestbook from "./Guestbook";
import useRoomParallax from "./useRoomParallax";

// Fixed positions/timings so the dust drifting through the beam never
// re-renders or re-randomizes — it's ambient, not stateful.
const MOTES = [
  { left: "45%", bottom: "26%", size: 2.5, op: 0.3, dur: 9, delay: -1 },
  { left: "51%", bottom: "34%", size: 2, op: 0.22, dur: 11, delay: -5 },
  { left: "48%", bottom: "20%", size: 3, op: 0.26, dur: 10, delay: -3 },
  { left: "54%", bottom: "30%", size: 2, op: 0.2, dur: 8.5, delay: -7 },
  { left: "47%", bottom: "40%", size: 1.8, op: 0.18, dur: 12, delay: -2 },
];

export default function BelongRoom({ room }) {
  const reduce = useReducedMotion();
  const parallaxRef = useRoomParallax();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const openGuestbook = () => {
    navigator.vibrate?.(14);
    setOpen(true);
  };

  return (
    <div className="belong-room" ref={parallaxRef}>
      <div className="belong-room__backdrop" aria-hidden="true">
        <div className="room-layer belong-room__wall" style={{ "--depth": 0.06 }} />
        <div className="room-layer belong-room__beam" style={{ "--depth": 0.1 }} />
        <div className="room-layer belong-room__pool" style={{ "--depth": 0.14 }} />
        <div className="room-layer belong-room__vignette" style={{ "--depth": 0.18 }} />
        {mounted &&
          !reduce &&
          MOTES.map((m, i) => (
            <span
              key={i}
              className="mote belong-room__mote"
              style={{
                left: m.left,
                bottom: m.bottom,
                width: `${m.size}px`,
                height: `${m.size}px`,
                "--mote-op": m.op,
                animationDuration: `${m.dur}s`,
                animationDelay: `${m.delay}s`,
              }}
            />
          ))}
      </div>

      <div className="belong-room__content">
        <div className="belong-room__title">
          <motion.p
            className="belong-room__eyebrow"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.3 : 0.9, ease: "easeOut", delay: reduce ? 0.1 : 0.2 }}
          >
            {room.eyebrow}
          </motion.p>
          <motion.h1
            className="belong-room__headline"
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 1.1, ease: "easeOut", delay: reduce ? 0.2 : 0.5 }}
          >
            {room.welcome}
          </motion.h1>
          <motion.p
            className="belong-room__subline"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.3 : 0.85 }}
          >
            {room.signature}
          </motion.p>
          <motion.p
            className="belong-room__orientation"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.35 : 1.1 }}
          >
            {room.identityBody}
          </motion.p>
        </div>

        <motion.div
          className="belong-room__guestbook-stage depth-layer"
          style={{ "--depth": 0.16 }}
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.4 : 1.4 }}
        >
          <button
            type="button"
            className="belong-room__book"
            aria-label="Open the guestbook"
            onClick={openGuestbook}
          >
            <span className="belong-room__book-glow" aria-hidden="true" />
            <span className="belong-room__book-cover" aria-hidden="true" />
            <span className="belong-room__book-pages" aria-hidden="true" />
          </button>
          <p className="belong-room__prompt">Open the guestbook.</p>
        </motion.div>
      </div>

      <Guestbook desk={room.desk} hideTrigger open={open} onOpenChange={setOpen} />
    </div>
  );
}
