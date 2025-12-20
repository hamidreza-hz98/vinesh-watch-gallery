const palette = {
  mode: "light",
  primary: {
    main: "#f4c025", // gold brand color
    contrastText: "#000000",
  },
  secondary: {
    main: "#ffffff",
    contrastText: "#000000",
  },
  background: {
    default: "#221e10", // tailwind background-dark
    paper: "#121212", // navbar and surfaces
  },
  text: {
    primary: "#f8f8f5", // light text on dark
    secondary: "#b3b3b3", // muted gray text
    disabled: "#6e6e6e",
  },
  divider: "rgba(244,192,37,0.2)", // gold accent divider
  grey: {
    50: "#f8f8f5",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#4d4d4d",
    700: "#333333", // buttons background
    800: "#1f1f1f",
    900: "#121212",
  },
  action: {
    active: "#f4c025",
    hover: "rgba(244,192,37,0.08)",
    selected: "rgba(244,192,37,0.16)",
    disabled: "#6e6e6e",
    disabledBackground: "rgba(255,255,255,0.08)",
    focus: "rgba(244,192,37,0.12)",
  },
};

export default palette;
