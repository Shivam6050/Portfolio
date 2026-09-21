const request = async (path, options = {}) => {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || "Request failed");
  }
  return body;
};

export const api = {
  getProjects: () => request("/api/projects"),
  getStats: () => request("/api/stats"),
  incrementView: () => request("/api/stats/view", { method: "POST" }),
  sendMessage: (payload) =>
    request("/api/messages", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  health: () => request("/api/health")
};
