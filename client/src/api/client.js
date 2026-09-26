/**
 * Browser API contract. VITE_API_URL is a public build-time origin, never a secret; blank means same-origin /api. Success requires successful HTTP status AND JSON success: true. Keep paths aligned with Express routes. Tests mock fetch.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Public build-time API origin without trailing slash; blank selects same-origin /api. */
const API_BASE_URL = (import.meta.env?.VITE_API_URL || "").replace(/\/$/, "");

/* Shared async fetch wrapper: merge options/headers, apply timeout, parse JSON, and reject unsuccessful envelopes. */
const request = async (path, options = {}) => {
  /* Fetch response includes HTTP status and headers; parse its JSON body and validate success before returning. */
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    /* Caller cancellation signal or default 15-second timeout. */
    signal: options.signal || AbortSignal.timeout(15000),
    /* Request headers merged by the API wrapper. */
    headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) }
  });
  /* Parse JSON or throw a readable invalid-response error; HTML hosting fallbacks must never count as successful submissions. */
  const body = await response.json().catch(() => {
    /* Stop with a clear error; caller/error boundary owns reporting and recovery. */
    throw new Error("The server returned an invalid response. Please try again later.");
  });
  /* Guard: !response.ok || body?.success !== true. Run the following branch only when true; preserve early returns when modifying this flow. */
  if (!response.ok || body?.success !== true) throw new Error(body?.message || "Request failed");
  /* Return body; this ends the current function path. */
  return body;
};

/* Named API methods centralize endpoint paths and serialization; keep synchronized with the mounted Express routes. */
export const api = {
  /* Fetch database project records; current AppContext does not use this method for the visible gallery. */
  getProjects: () => request("/api/projects"),
  /* Read the optional views counter envelope. */
  getStats: () => request("/api/stats"),
  /* POST an atomic view increment; AppContext applies a best-effort session flag. */
  incrementView: () => request("/api/stats/view", { method: "POST" }),
  /* Serialize allowed form payload as JSON and POST to the contact route. */
  sendMessage: (payload) => request("/api/messages", { method: "POST", body: JSON.stringify(payload) }),
  /* Process-health endpoint; it does not prove database connectivity. */
  health: () => request("/api/health")
};
