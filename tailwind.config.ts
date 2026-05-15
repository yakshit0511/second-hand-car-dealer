import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        card: "#1A1A1A",
        gold: {
          DEFAULT: "#C9A84C",
          hover: "#E2C06A"
        },
        primary: "#F5F5F5",
        muted: "#9A9A9A"
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
