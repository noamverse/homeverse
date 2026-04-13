"use client";

import { COLORS, formatCompactCurrency } from "@/lib/calculator";

export default function GrowthChart({ noFee, withFee, years }) {
  const width = 520;
  const height = 200;
  const paddingX = 44;
  const paddingTop = 24;
  const paddingBottom = 28;

  const values = [...noFee, ...withFee].map((item) => item.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1;

  const toX = (year) => paddingX + (year / years) * (width - paddingX - 12);
  const toY = (value) =>
    paddingTop + (1 - (value - minValue) / range) * (height - paddingTop - paddingBottom);

  const pathFor = (data) =>
    data
      .map((point, index) => `${index === 0 ? "M" : "L"}${toX(point.year).toFixed(1)},${toY(point.value).toFixed(1)}`)
      .join(" ");

  const areaFor = (data) =>
    `${pathFor(data)} L${toX(data[data.length - 1].year).toFixed(1)},${height - paddingBottom} L${toX(0)},${height - paddingBottom} Z`;

  const yLabels = Array.from({ length: 5 }, (_, index) => minValue + (range / 4) * index);
  const xMarks = [0, Math.round(years / 4), Math.round(years / 2), Math.round((years * 3) / 4), years];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={COLORS.accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.red} stopOpacity="0.1" />
          <stop offset="100%" stopColor={COLORS.red} stopOpacity="0" />
        </linearGradient>
      </defs>

      {yLabels.map((value) => (
        <g key={value}>
          <line
            x1={paddingX}
            y1={toY(value)}
            x2={width - 12}
            y2={toY(value)}
            stroke={COLORS.border}
            strokeWidth="0.5"
          />
          <text
            x={paddingX - 6}
            y={toY(value) + 3}
            textAnchor="end"
            fill={COLORS.t3}
            fontSize="8"
            fontFamily="'IBM Plex Mono', monospace"
          >
            {formatCompactCurrency(value)}
          </text>
        </g>
      ))}

      {xMarks.map((year) => (
        <text
          key={year}
          x={toX(year)}
          y={height - paddingBottom + 14}
          textAnchor="middle"
          fill={COLORS.t3}
          fontSize="8"
          fontFamily="'IBM Plex Mono', monospace"
        >
          {year}y
        </text>
      ))}

      <path d={areaFor(noFee)} fill="url(#gGreen)" />
      <path d={areaFor(withFee)} fill="url(#gRed)" />

      <path
        d={pathFor(noFee)}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={pathFor(withFee)}
        fill="none"
        stroke={COLORS.red}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx={toX(years)} cy={toY(noFee[noFee.length - 1].value)} r="3.5" fill={COLORS.accent} />
      <circle cx={toX(years)} cy={toY(withFee[withFee.length - 1].value)} r="3.5" fill={COLORS.red} />
    </svg>
  );
}
