export const COLORS = {
  bg: "#06060B",
  surface: "#0C0C14",
  card: "#111119",
  cardHi: "#16161F",
  border: "#1E1E2E",
  borderHi: "#2D2D44",
  t1: "#F2F2FA",
  t2: "#A0A0BE",
  t3: "#6A6A84",
  accent: "#5BFFB0",
  accentDim: "rgba(91,255,176,0.08)",
  accentMed: "rgba(91,255,176,0.15)",
  red: "#FF6B7A",
  redDim: "rgba(255,107,122,0.1)",
  amber: "#FFD166",
  blue: "#60A5FA",
};

export function formatCompactCurrency(value) {
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

export function formatCurrency(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function formatPercent(value, digits = 2) {
  return `${(value * 100).toFixed(digits)}%`;
}

export function calculateGrowth(principal, annualReturn, years, feeRate) {
  let balance = principal;
  const data = [{ year: 0, value: balance }];

  for (let year = 1; year <= years; year += 1) {
    balance = balance * (1 + annualReturn - feeRate);
    data.push({ year, value: balance });
  }

  return data;
}

export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "HOME Investment Fee Analyzer",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "HOME Editorial Team",
    },
    dateModified: "2026-04-13",
  };
}
