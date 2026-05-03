"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  getFeaturedStories,
  homePhilosophyStrip,
  homePillars,
  siteTagline,
  welcomeHomeBlock,
} from "@/lib/content";

import { features } from "@/content/features";

const recentFeatures = [...features]
  .filter((f) => f.published === true)
  .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
  .slice(0, 3);

function FeaturePreviewBlock({ feature }) {
  return (
    <Link href={`/featured/${feature.slug}`} className="hp-feat-preview">
      <div className="hp-feat-preview__hairline" aria-hidden="true" />
      <span className="hp-feat-preview__cat">{feature.category}</span>
      <p className="hp-feat-preview__name">{feature.name}</p>
      <p className="hp-feat-preview__title">{feature.title}</p>
    </Link>
  );
}

function StoryCard({ story, lead = false }) {
  if (lead) {
    return (
      <article className="hp-story-lead">
        <div className="hp-story-lead__cover">
          <div className="hp-story-lead__cover-tone" style={{ backgroundImage: story.tone }} />
          <div className="hp-story-lead__cover-inner">
            <p className="hp-card-kicker">{story.category}</p>
            <h3 className="hp-story-lead__cover-title">{story.title}</h3>
          </div>
        </div>
        <div className="hp-story-lead__body">
          <p className="hp-card-copy">{story.excerpt}</p>
          <div className="hp-card-meta">
            <span>{story.author}</span>
            <span>&middot;</span>
            <span>{story.date}</span>
          </div>
          <Link href={`/articles/${story.slug}`} className="hp-card-link">
            Read story &rarr;
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="hp-story-card">
      <div className="hp-story-card__accent">
        <div className="hp-story-card__accent-tone" style={{ backgroundImage: story.tone }} />
      </div>
      <div className="hp-story-card__body">
        <p className="hp-card-kicker">{story.category}</p>
        <h3 className="hp-card-title">{story.title}</h3>
        <p className="hp-card-copy">{story.excerpt}</p>
        <div className="hp-card-meta">
          <span>{story.author}</span>
          <span>&middot;</span>
          <span>{story.date}</span>
        </div>
        <Link href={`/articles/${story.slug}`} className="hp-card-link">
          Read story &rarr;
        </Link>
      </div>
    </article>
  );
}

function StarField({ refs }) {
  const [layers, setLayers] = useState(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    function makeStars(count, sizeMin, sizeMax, opMin, opMax, durMin, durMax, offset) {
      return Array.from({ length: count }, (_, i) => ({
        id: offset + i,
        left: +((i * 137.508 + offset * 17.3) % 100).toFixed(2),
        top: +((i * 97.617 + offset * 53.7) % 100).toFixed(2),
        size: (sizeMin + (i % 10) * 0.1 * (sizeMax - sizeMin)).toFixed(1),
        opMin,
        opMax,
        dur: durMin + (i % (durMax - durMin + 1)),
        delay: -(((i * 0.73 + offset * 0.4) % durMax)).toFixed(1),
      }));
    }

    const f = isMobile ? 18 : 35;
    const m = isMobile ? 16 : 30;
    const n = isMobile ? 8  : 15;

    setLayers({
      far:  makeStars(f, 1,   1,   0.12, 0.22, 5, 8, 0),
      mid:  makeStars(m, 1.5, 2,   0.22, 0.35, 4, 7, 100),
      near: makeStars(n, 2,   3,   0.35, 0.55, 4, 6, 200),
    });
  }, []);

  if (!layers) return null;

  return (
    <div className="hero-stars" aria-hidden="true">
      {["far", "mid", "near"].map((key, idx) => (
        <div key={key} className="hero-star-layer" ref={refs[idx]}>
          {layers[key].map((s) => (
            <span
              key={s.id}
              className="hero-star"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                "--op-min": s.opMin,
                "--op-max": s.opMax,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [leadStory, ...storyList] = getFeaturedStories();
  const reduce = useReducedMotion();

  // DOM refs for RAF-driven parallax (no re-renders)
  const bloomCoolRef = useRef(null);
  const bloomWarmRef = useRef(null);
  const bloomGoldRef = useRef(null);
  const starRefFar   = useRef(null);
  const starRefMid   = useRef(null);
  const starRefNear  = useRef(null);
  const logoAreaRef  = useRef(null);
  const typoRef      = useRef(null);

  const logoControls = useAnimation();
  const haloControls = useAnimation();

  // RAF loop: parallax (mouse) + bloom drift (sine waves)
  useEffect(() => {
    if (reduce) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    const cur = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };
    let rafId;

    const onMove = (e) => {
      tgt.x = e.clientX / window.innerWidth - 0.5;
      tgt.y = e.clientY / window.innerHeight - 0.5;
    };

    const tx = (el, x, y) => {
      if (el) el.style.transform = `translate(${x.toFixed(2)}px,${y.toFixed(2)}px)`;
    };

    const tick = () => {
      if (!isMobile) {
        cur.x += (tgt.x - cur.x) * 0.06;
        cur.y += (tgt.y - cur.y) * 0.06;
      }
      const px = cur.x, py = cur.y;
      const t  = performance.now() / 1000;

      // Bloom drift (long sine-wave cycles) + parallax
      tx(bloomCoolRef.current,
        px * 8  + Math.sin(t / 30) * 14,
        py * 8  + Math.cos(t / 37) * 11);
      tx(bloomWarmRef.current,
        -px * 8 + Math.sin(t / 42) * 13,
        -py * 8 + Math.cos(t / 28) * 10);
      tx(bloomGoldRef.current,
        px * 5  + Math.sin(t / 33) * 9,
        py * 5  + Math.cos(t / 40) * 8);

      // Star layers — 3 depths
      tx(starRefFar.current,  px * 5,  py * 5);
      tx(starRefMid.current,  px * 10, py * 10);
      tx(starRefNear.current, px * 18, py * 18);

      // Logo area + typography
      tx(logoAreaRef.current, px * 4,   py * 4);
      tx(typoRef.current,     px * 1.5, py * 1.5);

      rafId = requestAnimationFrame(tick);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [reduce]);

  // Logo: reveal at 2500ms → breathe on 9s cycle
  useEffect(() => {
    const run = async () => {
      if (reduce) {
        logoControls.start({ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } });
        return;
      }
      await logoControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 2.0, ease: "easeOut", delay: 2.5 },
      });
      logoControls.start({
        scale: [1, 1.005, 1],
        transition: { duration: 9, ease: "easeInOut", repeat: Infinity },
      });
    };
    run();
  }, [reduce, logoControls]);

  // Halo: ramps in at 4000ms → breathes on 9s cycle (synced with logo)
  useEffect(() => {
    const run = async () => {
      if (reduce) {
        await haloControls.start({ opacity: 0.32, transition: { duration: 0.5, delay: 0.3 } });
        haloControls.start({
          opacity: [0.25, 0.38, 0.25],
          transition: { duration: 12, ease: "easeInOut", repeat: Infinity },
        });
        return;
      }
      await new Promise((r) => setTimeout(r, 4000));
      await haloControls.start({ opacity: 0.32, transition: { duration: 1.5, ease: "easeOut" } });
      haloControls.start({
        opacity: [0.25, 0.40, 0.25],
        transition: { duration: 9, ease: "easeInOut", repeat: Infinity },
      });
    };
    run();
  }, [reduce, haloControls]);

  return (
    <main>
      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="hp-hero hp-hero--v2" aria-label="Welcome to HOME">

        {/* Layer 1 — Atmosphere wrapper bleeds 80px above (behind nav) and
            200px below (into the next section). Three blooms only:
            cool upper-left, warm lower-right, gold centered halo. */}
        <div className="hero-atmosphere" aria-hidden="true">
          <motion.div
            className="hero-bloom hero-bloom-cool"
            ref={bloomCoolRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.3 : 1.5, ease: "easeOut" }}
          />
          <motion.div
            className="hero-bloom hero-bloom-warm"
            ref={bloomWarmRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.3 : 1.5, ease: "easeOut", delay: reduce ? 0 : 0.3 }}
          />
          <motion.div
            className="hero-bloom hero-bloom-gold"
            ref={bloomGoldRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.3 : 1.5, ease: "easeOut", delay: reduce ? 0 : 0.5 }}
          />
        </div>

        {/* Layer 2 — Star field (3 depth layers: far / mid / near) */}
        <StarField refs={[starRefFar, starRefMid, starRefNear]} />

        {/* Layers 3 + 4 — Logo lockup + typography */}
        <div className="hp-hero__inner">

          {/* WELCOME eyebrow — reveals at 1500ms */}
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.3 : 1.0, ease: "easeOut", delay: reduce ? 0.05 : 1.5 }}
          >
            WELCOME
          </motion.p>

          {/* Logo area — full HOME lockup (H emblem + "home" wordmark).
              Halo sits BEHIND the image via grid stacking; offset bias toward
              the LEFT so the H reads as the light source. No mix-blend-mode. */}
          <div className="hero-logo-area" ref={logoAreaRef}>

            <motion.div
              className="hero-logo-halo"
              initial={{ opacity: 0 }}
              animate={haloControls}
              aria-hidden="true"
            />

            <motion.div
              className="hero-logo-img-wrapper"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
              animate={logoControls}
            >
              <Image
                src="/home-logo-transparent.png"
                alt="HOME"
                width={1536}
                height={511}
                priority
                quality={95}
                sizes="(max-width: 768px) 88vw, (max-width: 1024px) 70vw, 832px"
                className="hero-logo-img"
              />
            </motion.div>
          </div>

          {/* Typography — mission line (bold) + quiet subline */}
          <div className="hero-typo" ref={typoRef}>
            <motion.p
              className="hero-mission"
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.4 : 1.2, ease: "easeOut", delay: reduce ? 0.3 : 5.0 }}
            >
              Life is a family, not a marketplace.
            </motion.p>

            <motion.p
              className="hero-subline"
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.3 : 1.0, ease: "easeOut", delay: reduce ? 0.4 : 6.3 }}
            >
              A relational ecosystem for those who recognize the difference.
            </motion.p>
          </div>
        </div>

        {/* Bottom atmosphere fade — blends hero seamlessly into next section */}
        <div className="hero-fade-bottom" aria-hidden="true" />

        {/* Scroll indicator */}
        <div className="hero-scroll-wrapper" aria-hidden="true">
          <motion.div
            className="hero-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: reduce ? 0 : [0, 6, 0] }}
            transition={{
              opacity: { duration: reduce ? 0.3 : 1.5, ease: "easeInOut", delay: reduce ? 0.5 : 7.5 },
              y: { duration: 3, ease: "easeInOut", repeat: Infinity, delay: 9 },
            }}
          >
            <span className="hero-scroll-line" />
            <span className="hero-scroll-label">scroll to enter</span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ Everything below hero — unchanged ═══════════════ */}
      <div className="container">
        {/* Pillars */}
        <section className="hp-section hp-pillars" aria-labelledby="pillars-heading">
          <div className="hp-section__header">
            <h2 className="hp-section__title" id="pillars-heading">
              What HOME is built on.
            </h2>
            <Link href="/philosophy" className="hp-section__link">
              Read the philosophy &rarr;
            </Link>
          </div>
          <div className="hp-pillars__list">
            {homePillars.map((pillar, i) => (
              <article key={pillar.title} className="hp-pillar">
                <span className="hp-pillar__number">0{i + 1}</span>
                <h3 className="hp-pillar__title">{pillar.title}</h3>
                <p className="hp-pillar__body">{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Featured Profiles */}
        <section className="hp-section hp-profiles" aria-labelledby="profiles-heading">
          <div className="hp-section__header">
            <h2 className="hp-section__title" id="profiles-heading">
              People creating the future of the Relational Economy.
            </h2>
            <Link href="/featured" className="hp-section__link">
              View All Features &rarr;
            </Link>
          </div>
          <div className="hp-feat-preview-grid">
            {recentFeatures.map((feature) => (
              <FeaturePreviewBlock key={feature.slug} feature={feature} />
            ))}
          </div>
        </section>

        {/* Featured Stories */}
        <section className="hp-section hp-stories" aria-labelledby="stories-heading">
          <div className="hp-section__header">
            <h2 className="hp-section__title" id="stories-heading">
              Stories that move with a different rhythm.
            </h2>
            <Link href="/stories" className="hp-section__link">
              View all stories &rarr;
            </Link>
          </div>
          <div className="hp-stories__layout">
            {leadStory ? <StoryCard story={leadStory} lead /> : null}
            <div className="hp-story-rail">
              {storyList.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Manifesto */}
      <section className="hp-manifesto" aria-label="HOME manifesto">
        <div className="hp-manifesto__glow" aria-hidden="true" />
        <div className="hp-manifesto__inner">
          <span className="hp-manifesto__mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="hp-manifesto__quote">{homePhilosophyStrip}</blockquote>
          <Link href="/philosophy" className="hp-manifesto__cta">
            Read the full philosophy &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <div className="container">
        <section className="hp-section hp-cta" aria-labelledby="cta-heading">
          <h2 className="hp-cta__title" id="cta-heading">
            {welcomeHomeBlock.title}
          </h2>
          <p className="hp-cta__body">{welcomeHomeBlock.body}</p>
          <div className="hp-cta__actions">
            <Link href="/ecosystem" className="hp-section__link">
              Explore the ecosystem &rarr;
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
