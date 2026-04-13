"use client";

import { useMemo, useState } from "react";
import GrowthChart from "@/components/growth-chart";
import LeadModal from "@/components/lead-modal";
import SliderInput from "@/components/slider-input";
import { Disclaimer, FAQ, Nav, RelatedPages } from "@/components/site-sections";
import {
  buildStructuredData,
  calculateGrowth,
  COLORS,
  formatCurrency,
  formatPercent,
} from "@/lib/calculator";

const summaryCardStyle = {
  background: COLORS.card,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 12,
  padding: 16,
};

export default function InvestmentFeeAnalyzer() {
  const [principal, setPrincipal] = useState(50000);
  const [annualReturn, setAnnualReturn] = useState(0.08);
  const [currentFee, setCurrentFee] = useState(0.0075);
  const [lowFee, setLowFee] = useState(0.0005);
  const [years, setYears] = useState(30);
  const [showModal, setShowModal] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const lowFeeProjection = calculateGrowth(principal, annualReturn, years, lowFee);
    const currentFeeProjection = calculateGrowth(principal, annualReturn, years, currentFee);

    const finalLowFeeValue = lowFeeProjection[lowFeeProjection.length - 1].value;
    const finalCurrentFeeValue = currentFeeProjection[currentFeeProjection.length - 1].value;
    const lostValue = finalLowFeeValue - finalCurrentFeeValue;
    const lostPercentage = finalLowFeeValue > 0 ? lostValue / finalLowFeeValue : 0;

    return {
      lowFeeProjection,
      currentFeeProjection,
      finalLowFeeValue,
      finalCurrentFeeValue,
      lostValue,
      lostPercentage,
    };
  }, [principal, annualReturn, years, lowFee, currentFee]);

  const summaryCards = [
    {
      label: "With low-cost fund",
      value: formatCurrency(Math.round(results.finalLowFeeValue)),
      color: COLORS.accent,
      sub: `${formatPercent(lowFee)} annual fee`,
    },
    {
      label: "With current fee",
      value: formatCurrency(Math.round(results.finalCurrentFeeValue)),
      color: COLORS.red,
      sub: `${formatPercent(currentFee)} annual fee`,
    },
    {
      label: "You lose to fees",
      value: formatCurrency(Math.round(results.lostValue)),
      color: COLORS.amber,
      sub: `${(results.lostPercentage * 100).toFixed(1)}% of ending value`,
    },
  ];

  return (
    <main style={{ minHeight: "100vh", color: COLORS.t1, animation: "fade-in 0.4s ease" }}>
      {showModal ? <LeadModal onClose={() => setShowModal(false)} lostAmount={results.lostValue} /> : null}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 860,
          margin: "0 auto",
          padding: "20px 20px 56px",
        }}
      >
        <Nav />

        <section style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: 999,
              background: COLORS.accentDim,
              border: `1px solid rgba(91, 255, 176, 0.15)`,
              fontSize: 11,
              fontWeight: 600,
              color: COLORS.accent,
              letterSpacing: "0.06em",
              fontFamily: '"IBM Plex Mono", monospace',
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            HOME tools
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              margin: "0 0 12px",
            }}
          >
            How much are investment
            <br />
            fees costing you?
          </h1>

          <p
            style={{
              fontSize: 15,
              color: COLORS.t2,
              lineHeight: 1.7,
              maxWidth: 580,
              margin: "0 auto",
            }}
          >
            A polished calculator experience for HOME. Enter your portfolio details to see the long-term cost of
            fund fees and compare them against a lower-cost alternative.
          </p>
        </section>

        <section
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 18,
            padding: 28,
            marginBottom: 24,
          }}
        >
          <SliderInput
            label="Portfolio value"
            value={principal}
            onChange={setPrincipal}
            min={5000}
            max={2000000}
            step={5000}
            format={formatCurrency}
          />

          <SliderInput
            label="Expected annual return"
            value={annualReturn}
            onChange={setAnnualReturn}
            min={0.02}
            max={0.14}
            step={0.005}
            format={(value) => (value * 100).toFixed(1)}
            suffix="%"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            <SliderInput
              label="Your current fee"
              value={currentFee}
              onChange={setCurrentFee}
              min={0.0005}
              max={0.02}
              step={0.0005}
              format={(value) => (value * 100).toFixed(2)}
              suffix="%"
            />

            <SliderInput
              label="Low-cost alternative"
              value={lowFee}
              onChange={setLowFee}
              min={0.0003}
              max={0.005}
              step={0.0001}
              format={(value) => (value * 100).toFixed(2)}
              suffix="%"
            />
          </div>

          <SliderInput
            label="Time horizon"
            value={years}
            onChange={setYears}
            min={5}
            max={50}
            step={1}
            format={(value) => value}
            suffix=" years"
          />

          {!calculated ? (
            <button
              onClick={() => setCalculated(true)}
              style={{
                width: "100%",
                padding: "13px 0",
                borderRadius: 10,
                border: "none",
                background: COLORS.accent,
                color: COLORS.bg,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                marginTop: 4,
              }}
            >
              Calculate my fee impact
            </button>
          ) : null}
        </section>

        {calculated ? (
          <section style={{ animation: "slide-up 0.4s ease" }}>
            <div
              style={{
                background: COLORS.redDim,
                border: `1px solid rgba(255, 107, 122, 0.2)`,
                borderRadius: 14,
                padding: "16px 20px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: COLORS.red,
                    fontWeight: 600,
                    fontFamily: '"IBM Plex Mono", monospace',
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 4,
                  }}
                >
                  Fee drag
                </div>
                <div style={{ fontSize: 30, fontWeight: 800, color: COLORS.t1, letterSpacing: "-0.03em" }}>
                  {formatCurrency(Math.round(results.lostValue))}
                </div>
              </div>

              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  background: "rgba(255, 107, 122, 0.15)",
                  color: COLORS.red,
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                -{(results.lostPercentage * 100).toFixed(1)}%
              </div>
            </div>

            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                padding: "20px 20px 14px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 18,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.t1 }}>Portfolio growth comparison</span>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 16, height: 2, background: COLORS.accent, borderRadius: 2 }} />
                    <span style={{ fontSize: 10, color: COLORS.t3, fontFamily: '"IBM Plex Mono", monospace' }}>
                      Low-cost option
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 16, height: 2, background: COLORS.red, borderRadius: 2 }} />
                    <span style={{ fontSize: 10, color: COLORS.t3, fontFamily: '"IBM Plex Mono", monospace' }}>
                      Current fee
                    </span>
                  </div>
                </div>
              </div>

              <GrowthChart noFee={results.lowFeeProjection} withFee={results.currentFeeProjection} years={years} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 12,
                marginBottom: 20,
              }}
            >
              {summaryCards.map((card) => (
                <div key={card.label} style={summaryCardStyle}>
                  <div
                    style={{
                      fontSize: 10,
                      color: COLORS.t3,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 8,
                    }}
                  >
                    {card.label}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: card.color, letterSpacing: "-0.02em" }}>
                    {card.value}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.t3, marginTop: 4 }}>{card.sub}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: `linear-gradient(135deg, ${COLORS.card}, ${COLORS.cardHi})`,
                border: `1px solid ${COLORS.borderHi}`,
                borderRadius: 14,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.t1, marginBottom: 6 }}>
                Want personalized alternatives?
              </div>
              <p style={{ fontSize: 13, color: COLORS.t2, marginBottom: 16, lineHeight: 1.6 }}>
                Get fund-by-fund suggestions, tax-aware switch steps, and a cleaner editorial conversion path for HOME.
              </p>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  padding: "11px 32px",
                  borderRadius: 8,
                  border: "none",
                  background: COLORS.accent,
                  color: COLORS.bg,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Get my free report →
              </button>
            </div>

            <FAQ />
            <RelatedPages />
            <Disclaimer />
          </section>
        ) : null}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData()) }}
      />
    </main>
  );
}
