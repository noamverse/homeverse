"use client";

import { COLORS } from "@/lib/calculator";

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  suffix,
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <label style={{ fontSize: 12, color: COLORS.t2, fontWeight: 500 }}>
          {label}
        </label>
        <span
          style={{
            fontSize: 13,
            color: COLORS.t1,
            fontWeight: 600,
            fontFamily: '"IBM Plex Mono", monospace',
          }}
        >
          {format ? format(value) : value}
          {suffix || ""}
        </span>
      </div>

      <div
        style={{
          position: "relative",
          height: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 4,
            borderRadius: 999,
            background: COLORS.border,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              borderRadius: 999,
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.blue})`,
            }}
          />
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(parseFloat(event.target.value))}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            height: 20,
            cursor: "pointer",
            margin: 0,
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}
