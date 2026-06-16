"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Door from "./Door";

const DOORS = [
  {
    key: "belong",
    verb: "Belong",
    line: "Come be received.",
    href: "/belong",
    accent: "#e08a4d",
    glow: "rgba(224, 138, 77, 0.4)",
  },
  {
    key: "build",
    verb: "Build",
    line: "Bring what wants to become real.",
    href: "/build",
    accent: "#4fb3c9",
    glow: "rgba(79, 179, 201, 0.4)",
  },
  {
    key: "bring",
    verb: "Bring",
    line: "Bring your gift, your wisdom, your table.",
    href: "/bring",
    accent: "#b3473f",
    glow: "rgba(179, 71, 63, 0.4)",
  },
  {
    key: "seed",
    verb: "Seed",
    line: "Seed the first rooms.",
    href: "/seed",
    accent: "#b89a4e",
    glow: "rgba(184, 154, 78, 0.3)",
  },
  {
    key: "partner",
    verb: "Partner",
    line: "Open a venue. Open a city.",
    href: "/partner",
    accent: "#3f7e93",
    glow: "rgba(63, 126, 147, 0.4)",
  },
];

export default function DoorWall() {
  const [openKey, setOpenKey] = useState(null);
  const reduce = useReducedMotion();

  return (
    <div
      className={`door-wall${openKey ? " door-wall--dimmed" : ""}`}
      role="group"
      aria-label="Choose a door"
    >
      {DOORS.map((door, i) => (
        <motion.div
          key={door.key}
          className="door-wall__item"
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduce ? 0.4 : 0.9,
            ease: "easeOut",
            delay: reduce ? 0.1 : 1.6 + i * 0.12,
          }}
        >
          <Door door={door} isOpen={openKey === door.key} onOpen={setOpenKey} />
        </motion.div>
      ))}
    </div>
  );
}
