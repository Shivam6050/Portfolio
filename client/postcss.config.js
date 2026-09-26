/**
 * CSS plugins execute Tailwind expansion then Autoprefixer. Keep both installed in client/package.json. Vite consumes this config; React does not import it.
 * Editing map: CODE_GUIDE.md at repository root.
 */
export default {
  /* Plugin configuration; keep the corresponding npm dependencies installed. */
  plugins: {
    /* Expand Tailwind directives using tailwind.config.js. */
    tailwindcss: {},
    /* Add vendor prefixes for the configured/default browser targets. */
    autoprefixer: {}
  }
};
