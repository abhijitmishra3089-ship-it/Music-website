/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dhun: {
          dark: "#09090f",
          card: "#151520",
          purple: "#7c3aed",
          accent: "#a855f7",
        },
      },
    },
  },
  plugins: [],
};