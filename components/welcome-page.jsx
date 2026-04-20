"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".home-reveal");
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("home-revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function WelcomePage() {
  const prefersReduced = useReducedMotion();
  const scrollHintRef = useRef(null);
  const [listEmail, setListEmail] = useState("");
  const [listConfirmed, setListConfirmed] = useState(false);
  useScrollReveal();

  // Fade the scroll hint out as user begins to scroll
  useEffect(() => {
    const hint = scrollHintRef.current;
    if (!hint) return;
    const targetOpacity = prefersReduced ? 0.6 : 0.7;
    const timer = setTimeout(() => {
      hint.style.transition = "opacity 1.4s ease";
      hint.style.opacity = String(targetOpacity);
    }, 2200);
    const onScroll = () => {
      hint.style.transition = "none";
      hint.style.opacity = String(Math.max(0, targetOpacity * (1 - window.scrollY / 180)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [prefersReduced]);

  const ease = [0.22, 1, 0.36, 1];

  return (
    <main className="wh-page">
      <div className="home-grain" aria-hidden="true" />
      <div className="home-bloom-warm" aria-hidden="true" style={{ top: "-8vh", left: "-12vw" }} />
      <div className="home-bloom-cool" aria-hidden="true" style={{ top: "28vh", right: "-8vw" }} />

      {/* ── SECTION 1: THE THRESHOLD ── */}
      <section className="wh-threshold" aria-label="Welcome threshold">
        <div className="wh-threshold__inner">

          {/* Logo with multi-color glow, both pulsing together */}
          <motion.div
            className="wh-threshold__logo-wrap"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
          >
            <motion.div
              className="wh-threshold__glow"
              aria-hidden="true"
              animate={prefersReduced ? {} : { opacity: [0.35, 0.5, 0.35], scale: [1, 1.07, 1] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            <motion.div
              style={{ position: "relative", zIndex: 1 }}
              animate={prefersReduced ? {} : { scale: [1, 1.03, 1] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              <Image
                src="/home.png.png"
                alt="HOME"
                width={500}
                height={500}
                className="wh-threshold__logo"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.p
            className="wh-threshold__you-are"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.65 }}
          >
            You&rsquo;re here.
          </motion.p>

          <motion.h1
            className="wh-threshold__headline"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.95 }}
          >
            Welcome HOME.
          </motion.h1>

          <motion.p
            className="wh-threshold__sub"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 1.25 }}
          >
            This is a world built on one idea &mdash; that life should feel more like a family, and less like a
            marketplace.
          </motion.p>
        </div>

        {/* Scroll hint — fades in late, fades out on scroll via ref */}
        <div ref={scrollHintRef} className="wh-scroll-hint" aria-hidden="true" style={{ opacity: 0 }}>
          <div className="wh-scroll-hint__line" />
          <span className="wh-scroll-hint__text">There&rsquo;s more inside.</span>
        </div>
      </section>

      {/* ── SECTION 2: THE FIRST BREATH ── */}
      <section className="wh-breath">
        <div className="wh-breath__inner home-reveal">
          <p className="wh-eyebrow">Before we go any further.</p>
          <h2 className="wh-breath__headline">
            HOME is not something you join. It is something you recognize.
          </h2>
          <p className="wh-breath__body">
            If you&rsquo;ve ever felt that the world is built more for transactions than for people &mdash; you already
            know HOME. This is the place where that knowing has a home.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: WHAT YOU'LL FIND HERE ── */}
      <section className="wh-doorways">
        <div className="wh-doorways__header home-reveal">
          <p className="wh-eyebrow">Inside</p>
          <h2 className="wh-doorways__headline">What you&rsquo;ll find here</h2>
          <p className="wh-doorways__sub">
            HOME lives through writing, gathering, and building. Here&rsquo;s where to begin, depending on why you
            came.
          </p>
        </div>

        <div className="wh-doorway home-reveal">
          <p className="wh-eyebrow">If you came to read</p>
          <h3 className="wh-doorway__title">Our philosophy, in writing.</h3>
          <p className="wh-doorway__body">
            Start with Philosophy. Then Stories when you&rsquo;re ready for longer reads.
          </p>
          <Link href="/philosophy" className="wh-text-link">Begin with Philosophy &rarr;</Link>
        </div>

        <div className="wh-doorway home-reveal">
          <p className="wh-eyebrow">If you came to meet</p>
          <h3 className="wh-doorway__title">The people we&rsquo;re featuring.</h3>
          <p className="wh-doorway__body">
            Start with Featured. The founders and companies we&rsquo;re currently amplifying.
          </p>
          <Link href="/featured" className="wh-text-link">Begin with Featured &rarr;</Link>
        </div>

        <div className="wh-doorway home-reveal">
          <p className="wh-eyebrow">If you came to build</p>
          <h3 className="wh-doorway__title">The ecosystem we&rsquo;re building.</h3>
          <p className="wh-doorway__body">
            Start with Ecosystem. The map of HOME&rsquo;s multiverse and the vehicles inside it.
          </p>
          <Link href="/ecosystem" className="wh-text-link">Begin with Ecosystem &rarr;</Link>
        </div>
      </section>

      {/* ── SECTION 4: ONE INVITATION ── */}
      <section className="wh-invitation">
        <div
          className="home-bloom-gold"
          aria-hidden="true"
          style={{ top: "5%", left: "50%", transform: "translateX(-50%)" }}
        />
        <div className="wh-invitation__inner home-reveal">
          <p className="wh-eyebrow">One more thing</p>
          <h2 className="wh-invitation__headline">
            If any of this resonates &mdash; write to us.
          </h2>
          <p className="wh-invitation__body">
            There are no forms here. No pressure. Just an email address, and a human on the other end who will read
            what you send. That&rsquo;s how HOME has always worked. It&rsquo;s how it always will.
          </p>
          {/* TODO: Verify email is active once Cloudflare Email Routing is configured */}
          <a href="mailto:hello@homeverse.family" className="wh-text-link wh-text-link--lg">
            hello@homeverse.family &rarr;
          </a>
        </div>
      </section>

      {/* ── SECTION 4.5: QUIET LIST INVITATION ── */}
      <section className="wh-list-invite">
        <div className="wh-list-invite__inner home-reveal">
          <p className="wh-list-invite__eyebrow">And if you want to be written to</p>
          <h3 className="wh-list-invite__headline">
            We write from time to time. No schedule. No selling.
          </h3>
          <p className="wh-list-invite__body">
            Essays, reflections, and dispatches from the ecosystem, sent only when there is something real to share.
            You can leave if it ever stops being real.
          </p>
          <form
            className="wh-list-invite__form"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: Wire to email list provider (Buttondown recommended) once account is set up. Endpoint goes here.
              console.log("List email:", listEmail);
              setListConfirmed(true);
            }}
          >
            <input
              className="wh-list-invite__input"
              type="email"
              value={listEmail}
              onChange={(e) => setListEmail(e.target.value)}
              placeholder="your email"
              aria-label="Your email address"
              required
            />
            <button type="submit" className="wh-list-invite__btn">
              Come inside
            </button>
          </form>
          {listConfirmed && (
            <p className="wh-list-invite__confirm">
              Thank you. We&rsquo;ll be in touch when there&rsquo;s something real to share.
            </p>
          )}
        </div>
      </section>

      {/* ── SECTION 5: THE CLOSING LINE ── */}
      <section className="wh-closing">
        <h2 className="wh-closing__line home-reveal">
          Come as you are. Leave even more yourself.
        </h2>
      </section>
    </main>
  );
}
