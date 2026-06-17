import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base":     "var(--bg-base)",
        "bg-surface":  "var(--bg-surface)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-muted":    "var(--bg-muted)",
        "text-primary":    "var(--text-primary)",
        "text-secondary":  "var(--text-secondary)",
        "text-muted":      "var(--text-muted)",
        "text-subtle":     "var(--text-subtle)",
        "accent-primary":  "var(--accent-primary)",
        "accent-dark":     "var(--accent-dark)",
        "accent-rose":     "var(--accent-rose)",
        "accent-orange":   "var(--accent-orange)",
        "accent-sky":      "var(--accent-sky)",
        emerald: { 400: "#00f0a0", 500: "#00d084", 600: "#00b87a", 700: "#009e68" },
        rose:    { 400: "#ff7096", 500: "#ff3f6c", 600: "#e6355c", 700: "#cc2a4c" },
        orange:  { 400: "#ff9068", 500: "#ff6b35", 600: "#e55a25", 700: "#d44d1a" },
        sky:     { 400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7"                 },
      },
      fontFamily: {
        sans:    ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        sm:   "var(--shadow-sm)",
        md:   "var(--shadow-md)",
        lg:   "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float:        "float 5s ease-in-out infinite",
        shimmer:      "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0"  },
        },
      },
    },
  },
  plugins: [],
};

export default config;
