import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        twilight: {
          50: "#f5f6ff",
          100: "#ebeeff",
          200: "#d1d7ff",
          300: "#a9b0ff",
          400: "#7880ff",
          500: "#4d55ff",
          600: "#362de5",
          700: "#2b21b8",
          800: "#251e8f",
          900: "#201c70",
          950: "#0f0c3d"
        }
      }
    }
  },
  plugins: []
};

export default config;
