import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        background: {
          primary: "#1a1a1a",
          secondary: "#2a2a2a",
        },
        border: {
          subtle: "#3a3a3a",
        },
        text: {
          primary: "#d0d0d0",
          secondary: "#999999",
        },
        accent: {
          primary: "#ff6b35",
          secondary: "#00d4ff",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "Inter", "Roboto", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 107, 53, 0.25)",
      },
      borderRadius: {
        soft: "12px",
      },
      backgroundImage: {
        "hero-noise":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0, transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
