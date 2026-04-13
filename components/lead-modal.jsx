"use client";

import { useState } from "react";
import { COLORS, formatCompactCurrency } from "@/lib/calculator";

export default function LeadModal({ onClose, lostAmount }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.72)",
        backdropFilter: "blur(8px)",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 420,
          background: COLORS.card,
          border: `1px solid ${COLORS.borderHi}`,
          borderRadius: 18,
          padding: 32,
          animation: "modal-in 0.25s ease",
        }}
      >
        {!submitted ? (
          <>
            <div
              style={{
                fontSize: 11,
                color: COLORS.accent,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 10,
              }}
            >
              Free report
            </div>

            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: COLORS.t1,
                lineHeight: 1.25,
                marginBottom: 12,
              }}
            >
              Your fees could cost you {formatCompactCurrency(lostAmount)}
            </div>

            <p style={{ fontSize: 14, color: COLORS.t2, lineHeight: 1.6, marginBottom: 20 }}>
              Get a personalized fee analysis with low-cost alternatives and clear next steps for switching.
            </p>

            <input
              type="email"
              value={email}
              placeholder="you@email.com"
              onChange={(event) => setEmail(event.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 10,
                border: `1px solid ${COLORS.borderHi}`,
                background: COLORS.surface,
                color: COLORS.t1,
                fontSize: 14,
                outline: "none",
                marginBottom: 12,
              }}
            />

            <button
              onClick={() => {
                if (email.includes("@")) {
                  setSubmitted(true);
                }
              }}
              style={{
                width: "100%",
                padding: "12px 0",
                borderRadius: 10,
                border: "none",
                background: COLORS.accent,
                color: COLORS.bg,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Get My Free Report →
            </button>

            <div style={{ fontSize: 11, color: COLORS.t3, textAlign: "center", marginTop: 10 }}>
              We never sell your information.
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.t1, marginBottom: 6 }}>
              Check your inbox
            </div>
            <p style={{ fontSize: 13, color: COLORS.t2, lineHeight: 1.6 }}>
              We sent your personalized fee report to {email}.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 16,
                padding: "8px 24px",
                borderRadius: 8,
                border: `1px solid ${COLORS.border}`,
                background: "transparent",
                color: COLORS.t2,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
