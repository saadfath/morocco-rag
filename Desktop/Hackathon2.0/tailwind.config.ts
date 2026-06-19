import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        atlas: { DEFAULT: "#006233", light: "#007a3f", dark: "#004d28" },
        moroccan: { DEFAULT: "#C1272D", light: "#d93a40" },
        sahara: { DEFAULT: "#D4A017", light: "#e8b82a" },
        warm: "#FAFAFA",
        charcoal: "#111827",
        gov: {
          bg: "#0B1220",
          surface: "#111827",
          border: "#1E293B",
          text: "#F9FAFB",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        ambient:
          "0 8px 32px rgba(0, 98, 51, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
        glow: "0 0 60px rgba(0, 98, 51, 0.15)",
        card: "0 20px 60px rgba(0, 98, 51, 0.12), 0 8px 24px rgba(0, 0, 0, 0.06)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
