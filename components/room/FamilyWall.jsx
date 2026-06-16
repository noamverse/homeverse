"use client";

import { motion, useReducedMotion } from "framer-motion";
import ExplorationObject from "./ExplorationObject";

// Hung at slightly different heights so the wall reads as objects in a
// room, not a grid of cards.
const OFFSETS = [0, -18, 14, -8];

export default function FamilyWall({ items }) {
  const reduce = useReducedMotion();

  return (
    <div className="family-wall" role="group" aria-label="Explore this room">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: reduce ? 0 : 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduce ? 0.3 : 0.8, ease: "easeOut", delay: reduce ? 0 : i * 0.1 }}
        >
          <div
            className="family-wall__slot"
            style={{ "--depth": 0.4, "--offset": `${OFFSETS[i % OFFSETS.length]}px` }}
          >
            <ExplorationObject {...item} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
