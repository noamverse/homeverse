"use client";

import { motion, useReducedMotion } from "framer-motion";
import RoomAtmosphere from "./RoomAtmosphere";
import FamilyWall from "./FamilyWall";
import RoomFurniture from "./RoomFurniture";
import Guestbook from "./Guestbook";
import BelongRoom from "./BelongRoom";
import BuildRoom from "./BuildRoom";
import BringRoom from "./BringRoom";
import SeedRoom from "./SeedRoom";
import PartnerRoom from "./PartnerRoom";
import useRoomParallax from "./useRoomParallax";

export default function Room({ room }) {
  const reduce = useReducedMotion();
  const parallaxRef = useRoomParallax();

  if (room.slug === "belong") {
    return (
      <div className={`theme-lobby room-${room.slug}`}>
        <BelongRoom room={room} />
      </div>
    );
  }

  if (room.slug === "build") {
    return (
      <div className={`theme-lobby room-${room.slug}`}>
        <BuildRoom room={room} />
      </div>
    );
  }

  if (room.slug === "bring") {
    return (
      <div className={`theme-lobby room-${room.slug}`}>
        <BringRoom room={room} />
      </div>
    );
  }

  if (room.slug === "seed") {
    return (
      <div className={`theme-lobby room-${room.slug}`}>
        <SeedRoom room={room} />
      </div>
    );
  }

  if (room.slug === "partner") {
    return (
      <div className={`theme-lobby room-${room.slug}`}>
        <PartnerRoom room={room} />
      </div>
    );
  }

  return (
    <div className={`theme-lobby room-${room.slug}`} ref={parallaxRef}>
      <div className="room">
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
