/**
 * Toolkit key maps to local brand basename or neutral SVG paths. Keys must match STACK_GROUPS and exist in exactly one map. Brand filenames omit .svg. Concepts use a 24x24 viewBox. Keep vendor licenses and original SVGs intact.
 * Editing map: CODE_GUIDE.md at repository root.
 */
// Brand SVGs are stored unchanged; source URLs and licenses live beside them.
/* Tool keys mapped to local SVG basenames; preserve original artwork and bundled licenses. */
export const TOOLKIT_BRANDS = {
  /* Toolkit key javascript maps to a local original-brand filename without extension; keep it aligned with STACK_GROUPS. */
  javascript: "javascript", typescript: "typescript", cplusplus: "cplusplus", c: "c",
  /* Toolkit key html5 maps to a local original-brand filename without extension; keep it aligned with STACK_GROUPS. */
  html5: "html5", css3: "css3", react: "react", nextjs: "nextjs", nodedotjs: "nodejs",
  /* Toolkit key express maps to a local original-brand filename without extension; keep it aligned with STACK_GROUPS. */
  express: "express", mongodb: "mongodb", postgresql: "postgresql", supabase: "supabase",
  /* Toolkit key prisma maps to a local original-brand filename without extension; keep it aligned with STACK_GROUPS. */
  prisma: "prisma", googlegemini: "gemini", anthropic: "anthropic", openai: "openai",
  /* Toolkit key mcp maps to a local original-brand filename without extension; keep it aligned with STACK_GROUPS. */
  mcp: "mcp", oauth: "google", git: "git", github: "github", githubactions: "githubactions",
  /* Toolkit key vercel maps to a local original-brand filename without extension; keep it aligned with STACK_GROUPS. */
  vercel: "vercel", netlify: "netlify", postman: "postman", vscode: "vscode", vitest: "vitest"
};

// Generic practices have no brand logo: use descriptive, unbranded line symbols.
/* Unbranded practice icons defined by 24x24 SVG paths; do not substitute unrelated brand logos. */
export const TOOLKIT_SYMBOLS = {
  /* Toolkit key sql maps to neutral 24x24 SVG paths; keep it aligned with STACK_GROUPS. */
  sql: ['M4 6c0-4 16-4 16 0s-16 4-16 0Z', 'M4 6v12c0 4 16 4 16 0V6', 'M4 12c0 4 16 4 16 0'],
  /* Toolkit key responsive maps to neutral 24x24 SVG paths; keep it aligned with STACK_GROUPS. */
  responsive: ['M3 4h14v11H3z', 'M7 19h6', 'M10 15v4', 'M17 10h5v11h-5z'],
  /* Toolkit key rag maps to neutral 24x24 SVG paths; keep it aligned with STACK_GROUPS. */
  rag: ['M3 3h9v14H3z', 'M6 7h3M6 10h3', 'M16 11a4 4 0 1 0 0 8 4 4 0 0 0 0-8', 'm19 18 3 3'],
  /* Toolkit key prompt maps to neutral 24x24 SVG paths; keep it aligned with STACK_GROUPS. */
  prompt: ['M3 4h18v13H9l-5 4v-4H3z', 'm7 8 3 3-3 3', 'M13 13h4'],
  /* Toolkit key evaluation maps to neutral 24x24 SVG paths; keep it aligned with STACK_GROUPS. */
  evaluation: ['M8 3h8v4H8z', 'M8 5H5v16h14V5h-3', 'm8 14 3 3 5-6'],
  /* Toolkit key auth maps to neutral 24x24 SVG paths; keep it aligned with STACK_GROUPS. */
  auth: ['M6 10h12v11H6z', 'M8 10V6a4 4 0 0 1 8 0v4', 'M12 14v3'],
  /* Toolkit key authorization maps to neutral 24x24 SVG paths; keep it aligned with STACK_GROUPS. */
  authorization: ['m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6z', 'm8 12 3 3 5-6'],
  /* Toolkit key security maps to neutral 24x24 SVG paths; keep it aligned with STACK_GROUPS. */
  security: ['M3 4h18v16H3z', 'M3 9h18M3 14h18M9 4v16', 'm12 12 2 1 4-3'],
  /* Toolkit key ratelimit maps to neutral 24x24 SVG paths; keep it aligned with STACK_GROUPS. */
  ratelimit: ['M3 17a9 9 0 0 1 18 0', 'm12 16 5-6', 'M3 20h18', 'M5 10l2 2M12 7v3M19 10l-2 2'],
  /* Toolkit key system maps to neutral 24x24 SVG paths; keep it aligned with STACK_GROUPS. */
  system: ['M9 2h6v5H9z', 'M2 17h6v5H2zM16 17h6v5h-6z', 'M12 7v5M5 17v-5h14v5'],
  /* Toolkit key dsa maps to neutral 24x24 SVG paths; keep it aligned with STACK_GROUPS. */
  dsa: ['M2 3h6v6H2zM16 3h6v6h-6zM9 16h6v6H9z', 'M8 6h8M19 9v3h-7v4']
};
