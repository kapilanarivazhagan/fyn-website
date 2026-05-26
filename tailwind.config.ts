import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fyn: {
          pink: "#E8197A",
          bg: {
            DEFAULT: "#080808",
            surface: "#0F0F0F",
          },
          surface: {
            DEFAULT: "#161616",
            light: "#1E1E1E",
          },
          text: {
            DEFAULT: "#F4F4EF",
            muted: "#7A7A75",
          },
          tint: "rgba(232, 25, 122, 0.12)",
          border: "rgba(232, 25, 122, 0.2)",
        },
      },
      fontFamily: {
        barlow: ["var(--font-barlow)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
