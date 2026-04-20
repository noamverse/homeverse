"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const PLANETS = [
  {
    id: "ventures",
    label: "HOME Ventures",
    tooltip: "Capital for founders building belonging.",
    orbitR: 140,
    size: 42,
    color: "#c9a84c",
    glow: "rgba(201,168,76,0.55)",
    startAngle: 45,
    orbitDuration: 48,
    pulseDuration: 4,
    anchor: "#ventures",
  },
  {
    id: "engine",
    label: "HOME Engine",
    tooltip: "Incubation for creative founders beyond tech.",
    orbitR: 195,
    size: 46,
    color: "#d4763b",
    glow: "rgba(212,118,59,0.55)",
    startAngle: 120,
    orbitDuration: 62,
    pulseDuration: 4.5,
    anchor: "#engine",
  },
  {
    id: "fellowship",
    label: "HOME Fellowship",
    tooltip: "Gatherings where people leave their masks at the door.",
    orbitR: 250,
    size: 50,
    color: "#7c5cbf",
    glow: "rgba(124,92,191,0.55)",
    startAngle: 200,
    orbitDuration: 78,
    pulseDuration: 5,
    anchor: "#fellowship",
  },
  {
    id: "hospitality",
    label: "HOME Hospitality",
    tooltip: "Restaurants and concepts that feel like home.",
    orbitR: 310,
    size: 54,
    color: "#b43723",
    glow: "rgba(180,55,35,0.55)",
    startAngle: 280,
    orbitDuration: 95,
    pulseDuration: 5.5,
    anchor: "#hospitality",
  },
  {
    id: "ai",
    label: "HOME AI",
    tooltip: "Applied AI built in service of relationship.",
    orbitR: 370,
    size: 58,
    color: "#4a7fcf",
    glow: "rgba(74,127,207,0.55)",
    startAngle: 15,
    orbitDuration: 118,
    pulseDuration: 6,
    anchor: "#ai",
  },
  {
    id: "base",
    label: "HOME Base",
    tooltip: "Physical spaces where the ecosystem comes alive.",
    orbitR: 440,
    size: 62,
    color: "#c9a84c",
    glow: "rgba(201,168,76,0.45)",
    startAngle: 160,
    orbitDuration: 145,
    pulseDuration: 6.5,
    anchor: "#base",
  },
];

const ORBIT_RADII = [140, 195, 250, 310, 370, 440];
const PARTICLE_COUNT_DESKTOP = 26;

function getParticles(count) {
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.25,
      duration: 20 + Math.random() * 25,
      delay: Math.random() * -30,
      dx: (Math.random() - 0.5) * 60,
      dy: (Math.random() - 0.5) * 60,
    });
  }
  return out;
}

export default function HomeFlywheel() {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [flywheelSize, setFlywheelSize] = useState(760);
  const containerRef = useRef(null);
  const particlesRef = useRef(getParticles(PARTICLE_COUNT_DESKTOP));

  const active = hovered || focused;
  const speedMult = active ? 0.3 : 1;

  useEffect(() => {
    function measure() {
      const w = window.innerWidth;
      if (w >= 1280) setFlywheelSize(760);
      else if (w >= 768) setFlywheelSize(570);
      else setFlywheelSize(420);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scale = flywheelSize / 960;
  const center = flywheelSize / 2;
  const isMobile = flywheelSize < 500;
  const particleCount = isMobile ? 12 : flywheelSize < 600 ? 18 : PARTICLE_COUNT_DESKTOP;

  function handlePlanetAction(planet) {
    const el = document.querySelector(planet.anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: flywheelSize,
        height: flywheelSize,
        margin: "0 auto",
      }}
      aria-label="HOME Ecosystem Flywheel — interactive solar-system visualization"
    >
      {/* Ambient warm glow behind center */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: flywheelSize * 0.7,
          height: flywheelSize * 0.7,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.22) 0%, rgba(212,118,59,0.14) 38%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* SVG orbit rings */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
        viewBox={`0 0 ${flywheelSize} ${flywheelSize}`}
      >
        {ORBIT_RADII.map((r) => (
          <ellipse
            key={r}
            cx={center}
            cy={center}
            rx={r * scale}
            ry={r * scale * 0.92}
            fill="none"
            stroke="rgba(255,220,180,0.08)"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Ambient particles */}
      {!prefersReduced &&
        particlesRef.current.slice(0, particleCount).map((p) => (
          <motion.div
            key={p.id}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "rgba(255,248,230,1)",
              opacity: p.opacity,
              pointerEvents: "none",
              zIndex: 1,
            }}
            animate={
              prefersReduced
                ? {}
                : {
                    x: [0, p.dx, 0],
                    y: [0, p.dy, 0],
                    opacity: [p.opacity, p.opacity * 0.5, p.opacity],
                  }
            }
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

      {/* Center logo with breathing glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Multi-color radial glow */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: (isMobile ? 200 : 300) * scale * (960 / flywheelSize),
            height: (isMobile ? 200 : 300) * scale * (960 / flywheelSize),
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(74,127,207,0.38) 0%, rgba(124,92,191,0.28) 22%, rgba(212,118,59,0.22) 44%, rgba(201,168,76,0.12) 62%, transparent 78%)",
            filter: "blur(18px)",
          }}
          animate={prefersReduced ? {} : { opacity: [0.38, 0.52, 0.38], scale: [1, 1.06, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={prefersReduced ? {} : { scale: [1, 1.04, 1] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: isMobile ? 85 : flywheelSize < 600 ? 110 : 140,
            height: isMobile ? 85 : flywheelSize < 600 ? 110 : 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/home.png.png"
            alt="HOME"
            width={500}
            height={500}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter:
                "drop-shadow(0 0 12px rgba(74,127,207,0.7)) drop-shadow(0 0 24px rgba(201,168,76,0.5))",
            }}
            priority
          />
        </motion.div>
      </div>

      {/* Orbiting planets */}
      {PLANETS.map((planet) => {
        const r = planet.orbitR * scale;
        const ry = r * 0.92;
        const isActive = active === planet.id;

        return (
          <div
            key={planet.id}
            style={{
              position: "absolute",
              left: center,
              top: center,
              width: 0,
              height: 0,
              zIndex: 20,
            }}
          >
            <motion.div
              animate={
                prefersReduced
                  ? {}
                  : {
                      rotate: [
                        planet.startAngle,
                        planet.startAngle + 360,
                      ],
                    }
              }
              transition={
                prefersReduced
                  ? {}
                  : {
                      duration: planet.orbitDuration / speedMult,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
              style={{ width: 0, height: 0 }}
            >
              {/* Planet positioned at orbit radius */}
              <div
                style={{
                  position: "absolute",
                  left: r,
                  top: -ry * 0.04, // slight vertical offset for elliptical feel
                  transform: "translate(-50%,-50%)",
                }}
              >
                {/* Counter-rotate label so it stays upright */}
                <motion.div
                  animate={
                    prefersReduced
                      ? {}
                      : {
                          rotate: [
                            -planet.startAngle,
                            -(planet.startAngle + 360),
                          ],
                        }
                  }
                  transition={
                    prefersReduced
                      ? {}
                      : {
                          duration: planet.orbitDuration / speedMult,
                          repeat: Infinity,
                          ease: "linear",
                        }
                  }
                  style={{ position: "relative" }}
                >
                  {/* Planet glow halo */}
                  <motion.div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%,-50%)",
                      width: planet.size * 2.2,
                      height: planet.size * 2.2,
                      borderRadius: "50%",
                      background: `radial-gradient(ellipse at center, ${planet.glow} 0%, transparent 70%)`,
                      filter: "blur(6px)",
                      pointerEvents: "none",
                    }}
                    animate={
                      prefersReduced
                        ? {}
                        : { opacity: [0.7, 1.0, 0.7], scale: [1, 1.1, 1] }
                    }
                    transition={{
                      duration: planet.pulseDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Planet body */}
                  <motion.button
                    tabIndex={0}
                    aria-label={`${planet.label}: ${planet.tooltip}`}
                    onMouseEnter={() => setHovered(planet.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setFocused(planet.id)}
                    onBlur={() => setFocused(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handlePlanetAction(planet);
                    }}
                    onClick={() => handlePlanetAction(planet)}
                    style={{
                      position: "relative",
                      width: planet.size,
                      height: planet.size,
                      borderRadius: "50%",
                      background: `radial-gradient(ellipse at 35% 35%, ${planet.color} 0%, ${planet.color}99 45%, ${planet.color}44 100%)`,
                      border: "none",
                      cursor: "pointer",
                      display: "block",
                      margin: "0 auto",
                    }}
                    animate={
                      prefersReduced
                        ? {}
                        : {
                            scale: isActive
                              ? 1.15
                              : [1, 1.06, 1],
                            opacity: [0.9, 1, 0.9],
                          }
                    }
                    transition={
                      isActive
                        ? { duration: 0.25, ease: "easeOut" }
                        : {
                            duration: planet.pulseDuration,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                  />

                  {/* Label */}
                  <motion.div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: planet.size + 10,
                      left: "50%",
                      transform: "translateX(-50%)",
                      whiteSpace: "nowrap",
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "0.6rem" : "0.72rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "rgba(240,237,232,0.85)",
                      pointerEvents: "none",
                      borderBottom: isActive
                        ? "1px solid rgba(201,168,76,0.7)"
                        : "1px solid transparent",
                    }}
                    animate={
                      prefersReduced
                        ? {}
                        : { opacity: [0.7, 1.0, 0.7] }
                    }
                    transition={{
                      duration: planet.pulseDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {planet.label}
                  </motion.div>

                  {/* Tooltip on hover/focus */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: planet.size + 18,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(20,18,16,0.92)",
                        border: "1px solid rgba(201,168,76,0.25)",
                        borderRadius: 10,
                        padding: "10px 16px",
                        whiteSpace: "nowrap",
                        fontFamily: "Playfair Display, serif",
                        fontStyle: "italic",
                        fontSize: "0.82rem",
                        color: "rgba(240,237,232,0.9)",
                        pointerEvents: "none",
                        zIndex: 30,
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      {planet.tooltip}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
