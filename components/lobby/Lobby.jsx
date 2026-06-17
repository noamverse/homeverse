"use client";

import { motion, useReducedMotion } from "framer-motion";
import Atmosphere from "./Atmosphere";
import DoorWall from "./DoorWall";

export default function Lobby() {
  const reduce = useReducedMotion();

  return (
    <div className="theme-lobby">
      <motion.div
        className="lobby"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0.4 : 1.4, ease: "easeOut" }}
      >
        <Atmosphere />

        <div className="lobby-arrival">
          <motion.p
            className="lobby-eyebrow"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.3 : 1, ease: "easeOut", delay: reduce ? 0.1 : 0.5 }}
          >
            We&rsquo;ve been expecting you
          </motion.p>
          <motion.h1
            className="lobby-headline"
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 1.2, ease: "easeOut", delay: reduce ? 0.2 : 0.9 }}
          >
            You found the door.
          </motion.h1>
        </div>

        <DoorWall />
      </motion.div>
    </div>
  );
}
