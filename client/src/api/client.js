const API_BASE_URL = (import.meta.env?.VITE_API_URL || "").replace(/\/$/, "");

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    signal: options.signal || AbortSignal.timeout(15000),
    headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) }
  });
  const body = await response.json().catch(() => {
    throw new Error("The server returned an invalid response. Please try again later.");
  });
  if (!response.ok || body?.success !== true) throw new Error(body?.message || "Request failed");
  return body;
};

export const api = {
  getProjects: () => request("/api/projects"),
  getStats: () => request("/api/stats"),
  incrementView: () => request("/api/stats/view", { method: "POST" }),
  sendMessage: (payload) => request("/api/messages", { method: "POST", body: JSON.stringify(payload) }),
  health: () => request("/api/health")
};
