import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PROJECTS } from "../../../shared/projects.js";
import { api } from "../api/client.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [projects, setProjects] = useState(PROJECTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ views: 0 });
  const [toasts, setToasts] = useState([]);

  const toast = (message, type = "success") => {
    const id = `portfolio-${Date.now()}-${Math.random()}`;
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3800);
  };

  useEffect(() => {
    let active = true;

    async function loadPortfolioData() {
      try {
        const result = await api.getProjects();
        if (!active) return;

        if (Array.isArray(result.data) && result.data.length > 0) {
          setProjects(result.data);
          setError("");
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Live project data unavailable");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPortfolioData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadStats() {
      try {
        const statResult = await api.getStats();
        if (!active) return;

        setStats(Object.fromEntries(
          (statResult.data || []).map((item) => [item.key, item.value])
        ));

        if (!sessionStorage.getItem("portfolio-viewed")) {
          try {
            const viewResult = await api.incrementView();
            if (active && viewResult.data?.value != null) {
              setStats((current) => ({ ...current, views: viewResult.data.value }));
            }
            sessionStorage.setItem("portfolio-viewed", "true");
          } catch {
            // Analytics must never block portfolio rendering.
          }
        }
      } catch (err) {
        if (active) setError(err.message || "Portfolio stats unavailable");
      }
    }

    loadStats();
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
