import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS } from "../data/constants.js";
import { api } from "../api/client.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Portfolio content lives in data/constants.js. Components only render the template.
  const projects = PROJECTS;
  const loading = false;
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ views: 0 });
  const [toasts, setToasts] = useState([]);

  const timers = useRef(new Set());
  useEffect(() => () => {
    timers.current.forEach(timer => window.clearTimeout(timer));
    timers.current.clear();
  }, []);

  const toast = useCallback((message, type = "success") => {
    const id = `portfolio-${Date.now()}-${Math.random()}`;
    setToasts((current) => [...current, { id, message, type }]);
    const timer = window.setTimeout(() => {
      timers.current.delete(timer);
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3800);
    timers.current.add(timer);
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
    [projects, loading, error, stats, toasts, toast]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
