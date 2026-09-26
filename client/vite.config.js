/**
 * Vite frontend configuration. /api proxy forwards local requests to Express on 5000; it does not provision a production API. Set VITE_API_URL before production build if using a separate backend and configure server CLIENT_ORIGIN.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import defineConfig from vite; use its public API here rather than modifying installed dependency files. */
import { defineConfig } from "vite";
/* Import react from @vitejs/plugin-react; use its public API here rather than modifying installed dependency files. */
import react from "@vitejs/plugin-react";

export default defineConfig({
  /* Plugin configuration; keep the corresponding npm dependencies installed. */
  plugins: [react()],
  /* Vite local development options, not production deployment settings. */
  server: {
    /* Local port; coordinate with frontend CLIENT_ORIGIN if changed. */
    port: 5173,
    /* Local API forwarder; production routing must be configured separately. */
    proxy: {
      /* Set /api for this object; coordinate key renames with the consumer. */
      "/api": {
        /* Local Express origin receiving proxied API requests. */
        target: "http://localhost:5000",
        /* Rewrite the proxy Host header for the target server. */
        changeOrigin: true
      }
    }
  }
});
