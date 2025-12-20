// src/theme/mui/typography.js
const baseFont = "'Vazirmatn', 'Noto Sans Arabic', system-ui, -apple-system, 'Segoe UI', Roboto, Arial";

const typography = {
  fontFamily: baseFont,
  htmlFontSize: 16,
  h1: { fontSize: "2.125rem", fontWeight: 700, lineHeight: 1.2, letterSpacing: "0em" },
  h2: { fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.25 },
  h3: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.3 },
  h4: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.35 },
  h5: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.4 },
  h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.4 },
  subtitle1: { fontSize: "0.95rem", fontWeight: 500 },
  subtitle2: { fontSize: "0.85rem", fontWeight: 500 },
  body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.8 },
  body2: { fontSize: "0.95rem", fontWeight: 400, lineHeight: 1.6 },
  button: { textTransform: "none", fontWeight: 600 },
  caption: { fontSize: "0.8rem" },
  overline: { fontSize: "0.75rem", textTransform: "none" },
};

export default typography;
