/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f2ede4",
        paper: "#ebe5d8",
        ink: "#141413",
        muted: "#6b6760",
        rust: "#b8431a",
        moss: "#4a5d3a"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
        mono: ["JetBrains Mono", "monospace"]
      }
    }
  },
  plugins: []
};
