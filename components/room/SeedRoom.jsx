"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Guestbook from "./Guestbook";
import useRoomParallax from "./useRoomParallax";

export default function SeedRoom({ room }) {
  const reduce = useReducedMotion();
  const parallaxRef = useRoomParallax();
  const [open, setOpen] = useState(false);

  const openPanel = () => {
    navigator.vibrate?.(10);
    setOpen(true);
  };

  return (
    <div className="seed-room" ref={parallaxRef}>
      <div className="seed-room__backdrop" aria-hidden="true">
        <div className="room-layer seed-room__wall"     style={{ "--depth": 0.03 }} />
        <div className="room-layer seed-room__glow"     style={{ "--depth": 0.08 }} />
        <div className="room-layer seed-room__vignette"  style={{ "--depth": 0.12 }} />
      </div>

      <div className="seed-room__content">
        <div className="seed-room__title">
          <motion.p
            className="seed-room__eyebrow"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.3 : 1.2, ease: "easeOut", delay: reduce ? 0.1 : 0.3 }}
          >
            {room.eyebrow}
          </motion.p>
          <motion.h1
            className="seed-room__headline"
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 1.4, ease: "easeOut", delay: reduce ? 0.2 : 0.65 }}
          >
            {room.welcome}
          </motion.h1>
          <motion.p
            className="seed-room__subline"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 1.1, ease: "easeOut", delay: reduce ? 0.3 : 1.05 }}
          >
            {room.signature}
          </motion.p>
          <motion.p
            className="seed-room__orientation"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 1.0, ease: "easeOut", delay: reduce ? 0.35 : 1.4 }}
          >
            {room.identityBody}
          </motion.p>
        </div>

        <motion.div
          className="seed-room__envelope-stage depth-layer"
          style={{ "--depth": 0.14 }}
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.4 : 1.2, ease: "easeOut", delay: reduce ? 0.4 : 1.7 }}
        >
          <button
            type="button"
            className="seed-room__envelope-btn"
            aria-label="Open a private conversation"
            onClick={openPanel}
          >
            <div className="seed-room__envelope">
              <div className="seed-room__envelope-body" />
              <div className="seed-room__envelope-flap" />
              <div className="seed-room__envelope-seal" />
            </div>
            <span className="seed-room__envelope-glow" aria-hidden="true" />
          </button>
          <p className="seed-room__prompt">Open a private conversation.</p>
        </motion.div>
      </div>

      <Guestbook desk={room.desk} hideTrigger open={open} onOpenChange={setOpen} />
    </div>
  );
}
