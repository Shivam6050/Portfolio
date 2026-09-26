/**
 * Tailwind scans content globs for utility classes; include new source folders here. Theme aliases define utilities, but index.css also hardcodes palette/fonts, so changing theme alone does not restyle everything.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/** @type {import('tailwindcss').Config} */
export default {
  /* Tailwind source globs; classes in files outside these paths may not be generated. */
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  /* Design tokens for Tailwind utilities; raw CSS values are configured separately. */
  theme: {
    /* Extend Tailwind defaults without replacing the entire theme. */
    extend: {
      /* Named colors for utility classes such as text-rust and bg-cream. */
      colors: {
        /* Light page background token; explicit CSS colors must be updated separately. */
        cream: "#f2ede4",
        /* Secondary paper-surface token. */
        paper: "#ebe5d8",
        /* Primary dark text/control token. */
        ink: "#141413",
        /* Secondary text token; retain sufficient contrast on cream/paper. */
        muted: "#6b6760",
        /* Warm accent token for labels, borders, and actions. */
        rust: "#b8431a",
        /* Green availability/success accent token. */
        moss: "#4a5d3a"
      },
      /* Utility font stacks; font loading is configured in index.css. */
      fontFamily: {
        /* Body font stack; keep matching font import in index.css. */
        sans: ["Inter", "sans-serif"],
        /* Editorial heading/signature font stack. */
        serif: ["Instrument Serif", "serif"],
        /* Metadata/control font stack. */
        mono: ["JetBrains Mono", "monospace"]
      }
    }
  },
  /* Plugin configuration; keep the corresponding npm dependencies installed. */
  plugins: []
};
