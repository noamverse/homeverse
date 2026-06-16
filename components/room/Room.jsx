"use client";

import { motion, useReducedMotion } from "framer-motion";
import LobbyMark from "../lobby/LobbyMark";
import RoomAtmosphere from "./RoomAtmosphere";
import FamilyWall from "./FamilyWall";
import RoomFurniture from "./RoomFurniture";
import Guestbook from "./Guestbook";
import useRoomParallax from "./useRoomParallax";

export default function Room({ room }) {
  const reduce = useReducedMotion();
  const parallaxRef = useRoomParallax();

  return (
    <div className={`theme-lobby room-${room.slug}`} ref={parallaxRef}>
      <div className="room">
        <LobbyMark />
        <RoomAtmosphere />

        <section className="room-arrival">
          <motion.p
            className="room-arrival__eyebrow"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.3 : 0.9, ease: "easeOut", delay: reduce ? 0.1 : 0.2 }}
          >
            {room.eyebrow}
          </motion.p>
          <motion.h1
            className="room-arrival__welcome"
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 1.1, ease: "easeOut", delay: reduce ? 0.2 : 0.5 }}
          >
            {room.welcome}
          </motion.h1>
          <motion.p
            className="room-arrival__signature"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 0.9, ease: "easeOut", delay: reduce ? 0.3 : 1.3 }}
          >
            {room.signature}
          </motion.p>
        </section>

        <motion.section
          className="room-orientation"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: reduce ? 0.3 : 0.8, ease: "easeOut" }}
        >
          <p className="room-orientation__body">{room.identityBody}</p>
        </motion.section>

        <section className="room-wall-stage" aria-label={`What happens in ${room.title}`}>
          <FamilyWall items={room.exploration} />
        </section>

        <section className="room-company-stage" aria-label="The table">
          <RoomFurniture />
          <Guestbook desk={room.desk} />
        </section>
      </div>
    </div>
  );
}
