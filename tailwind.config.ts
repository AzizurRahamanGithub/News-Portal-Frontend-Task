import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hind: ["var(--font-hind)", "Noto Sans Bengali", "sans-serif"],
      },
      colors: {
        primary: "#1a1a2e",
        accent: "#c0392b",
        secondary: "#2c3e50",
      },
    },
  },
  plugins: [],
};

export default config;
