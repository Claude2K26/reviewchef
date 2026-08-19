import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8f3",
          100: "#d6f0e3",
          200: "#ade0c8",
          300: "#7dcaa9",
          400: "#4ead87",
          500: "#1f6b4f",
          600: "#185a41",
          700: "#144a36",
          800: "#113c2c",
          900: "#0e3024",
          950: "#071b14",
        },
        gold: {
          50: "#fbf5e6",
          400: "#e5c674",
          500: "#d9b44a",
          600: "#bc953a",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        aurora: {
          "0%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(5%, -10%) scale(1.1)" },
          "66%": { transform: "translate(-5%, 10%) scale(0.9)" },
          "100%": { transform: "translate(0%, 0%) scale(1)" },
        },
        "aurora-2": {
          "0%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(-8%, 5%) scale(1.1)" },
          "66%": { transform: "translate(8%, -5%) scale(0.95)" },
          "100%": { transform: "translate(0%, 0%) scale(1)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-in": {
          "0%":   { opacity: "0", transform: "scale(0.4) translateY(20px)" },
          "55%":  { transform: "scale(1.06) translateY(-5px)" },
          "75%":  { transform: "scale(0.93) translateY(3px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "scale-breath": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        tremble: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "20%": { transform: "translate(-1px, -1px) rotate(-0.5deg)" },
          "40%": { transform: "translate(1px, 1px) rotate(0.5deg)" },
          "60%": { transform: "translate(-1px, 1px) rotate(-0.3deg)" },
          "80%": { transform: "translate(1px, -1px) rotate(0.3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite linear",
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        aurora: "aurora 12s ease-in-out infinite",
        "aurora-2": "aurora-2 15s ease-in-out infinite",
        "fade-in": "fade-in 0.7s ease-out both",
        "bounce-in": "bounce-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-breath": "scale-breath 3s ease-in-out infinite",
        tremble: "tremble 0.6s ease-in-out infinite",
        "tremble-slow": "tremble 2s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
