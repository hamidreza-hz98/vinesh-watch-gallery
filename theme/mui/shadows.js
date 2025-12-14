// src/theme/mui/shadows.js
const base = [
  "none",
  "0px 1px 2px rgba(12,18,33,0.04)",
  "0px 2px 4px rgba(12,18,33,0.06)",
  "0px 4px 8px rgba(12,18,33,0.08)",
  "0px 8px 16px rgba(12,18,33,0.10)",
  "0px 12px 24px rgba(12,18,33,0.12)",
];

const shadows = [
  ...base,
  // fill up to 25 entries
  ...Array.from({ length: 19 }, () => "0px 8px 16px rgba(12,18,33,0.08)"),
];

export default shadows;
