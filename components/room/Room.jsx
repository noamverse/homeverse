"use client";

import { motion, useReducedMotion } from "framer-motion";
import LobbyMark from "../lobby/LobbyMark";
import RoomAtmosphere from "./RoomAtmosphere";
import ExplorationObject from "./ExplorationObject";
import ReceptionDesk from "./ReceptionDesk";

export default function Room({ room }) {
  const reduce = useReducedMotion();

  return (
    <div className={`theme-lobby room-${room.slug}`}>
      <div className="room">
        <LobbyMark />
        <RoomAtmosphere />

        <section className="room-arrival">
          <motion.p
            className="room-arrival__eyebrow"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.3 : 1, ease: "easeOut", delay: reduce ? 0.1 : 0.2 }}
          >
            {room.eyebrow}
          </motion.p>
          <motion.h1
            className="room-arrival__welcome"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 1.2, ease: "easeOut", delay: reduce ? 0.2 : 0.5 }}
          >
            {room.welcome}
          </motion.h1>
          <motion.p
            className="room-arrival__signature"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.4 : 1, ease: "easeOut", delay: reduce ? 0.3 : 1.1 }}
          >
            {room.signature}
          </motion.p>
        </section>

        <section className="room-identity">
          <div className="room-section">
            <p className="room-identity__body">{room.identityBody}</p>
          </div>
        </section>

        <section className="room-exploration" aria-label={`What happens in ${room.title}`}>
          <div className="room-section">
            <div className="room-exploration__grid">
              {room.exploration.map((obj) => (
                <ExplorationObject key={obj.label} {...obj} />
              ))}
            </div>
          </div>
        </section>

        <ReceptionDesk desk={room.desk} />
      </div>
    </div>
  );
}
