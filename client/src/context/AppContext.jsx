import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PROJECTS } from "../data/constants.js";
import { api } from "../api/client.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [projects, setProjects] = useState(PROJECTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ views: 0 });
  const [toasts, setToasts] = useState([]);

  const toast = (message, type = "success") => {
    const id = `1789991390808-${Math.random()}`;
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3800);
  };

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [projectResult, statResult] = await Promise.all([
          api.getProjects(),
          api.getStats()
        ]);

        if (!active) return;

        if (Array.isArray(projectResult.data) && projectResult.data.length > 0) {
          setProjects(projectResult.data);
        }

        setStats(
          Object.fromEntries(
            (statResult.data || []).map((item) => [item.key, item.value])
          )
        );

        if (!sessionStorage.getItem("portfolio-viewed")) {
          try {
            const viewResult = await api.incrementView();
            if (active && viewResult.data?.value != null) {
              setStats((current) => ({ ...current, views: viewResult.data.value }));
            }
            sessionStorage.setItem("portfolio-viewed", "true");
          } catch {
            // View counting must never block portfolio rendering.
          }
        }
      } catch (err) {
        if (active) setError(err.message || "Portfolio API unavailable");
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({ projects, loading, error, stats, toasts, toast }),
    [projects, loading, error, stats, toasts]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
