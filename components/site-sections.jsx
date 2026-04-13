"use client";

import { useState } from "react";
import { COLORS } from "@/lib/calculator";

export function Disclaimer() {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 10,
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        marginTop: 24,
        fontSize: 11,
        color: COLORS.t3,
        lineHeight: 1.6,
      }}
    >
      <strong style={{ color: COLORS.t2 }}>Disclaimer:</strong> This tool provides educational estimates only and
      should not be treated as personalized financial advice. Past performance does not guarantee future results.
      Actual fees vary by fund, broker, and account structure. Consult a qualified financial advisor before making
      investment decisions. Last updated April 2026.
      <span style={{ display: "block", marginTop: 6 }}>Reviewed by HOME Editorial Team</span>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      q: "How do investment fees affect my returns?",
      a: "Fees reduce your balance every year, which also lowers the amount that can compound in the future. Small annual percentages can have a surprisingly large long-term impact.",
    },
    {
      q: "What is considered a high expense ratio?",
      a: "It depends on the fund category, but broad index funds are often much cheaper than actively managed funds. This calculator helps visualize the difference over time.",
    },
    {
      q: "Are there fees beyond the expense ratio?",
      a: "Yes. Investors may also pay advisory fees, account charges, trading costs, and taxes tied to portfolio changes.",
    },
  ];

  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: COLORS.t1, marginBottom: 14 }}>
        Frequently asked questions
      </h2>

      {items.map((item, index) => {
        const open = openIndex === index;

        return (
          <div
            key={item.q}
            style={{
              borderBottom: `1px solid ${COLORS.border}`,
              padding: "14px 0",
              cursor: "pointer",
            }}
            onClick={() => setOpenIndex(open ? null : index)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: open ? COLORS.t1 : COLORS.t2 }}>{item.q}</span>
              <span
                style={{
                  fontSize: 18,
                  color: COLORS.t3,
                  transition: "transform 0.2s",
                  transform: open ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </div>

            {open ? (
              <p style={{ fontSize: 13, color: COLORS.t2, lineHeight: 1.7, marginTop: 10, animation: "fade-in 0.2s ease" }}>
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}

export function RelatedPages() {
  const links = [
    "Vanguard vs Fidelity: Fee Comparison 2026",
    "Best Low-Cost Index Funds",
    "How to Switch Brokers Without Tax Penalties",
    "Expense Ratio Calculator for 401(k) Plans",
    "Robo-Advisor Fee Comparison",
  ];

  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: COLORS.t2, marginBottom: 12 }}>Related tools and guides</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {links.map((label) => (
          <a
            key={label}
            href="#"
            style={{
              padding: "7px 14px",
              borderRadius: 8,
              border: `1px solid ${COLORS.border}`,
              background: COLORS.surface,
              color: COLORS.t2,
              fontSize: 12,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}

export function Nav() {
  const links = ["Tools", "Guides", "Compare", "Newsletter"];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        padding: "16px 0",
        borderBottom: `1px solid ${COLORS.border}`,
        marginBottom: 32,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.blue})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 800,
            color: COLORS.bg,
          }}
        >
          H
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.t1, letterSpacing: "-0.02em" }}>HOME</span>
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        {links.map((link) => (
          <a
            key={link}
            href="#"
            style={{
              fontSize: 13,
              color: COLORS.t3,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}
