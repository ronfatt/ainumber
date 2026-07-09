import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        night: "#070A1F",
        ink: "#0B102A",
        amethyst: "#8B5CF6",
        aura: "#E879F9",
        astral: "#60A5FA",
        gold: "#F5D28A",
        mist: "#A8A3BD",
        ivory: "#F8F4E8"
      },
      boxShadow: {
        glow: "0 0 36px rgba(245, 210, 138, 0.24)",
        purple: "0 0 52px rgba(139, 92, 246, 0.28)"
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
