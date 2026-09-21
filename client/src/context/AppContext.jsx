import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/client.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ views: 0 });
  const [toasts, setToasts] = useState([]);

  const toast = (message, type = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3800);
  };

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        const [projectResult, statResult] = await Promise.all([
          api.getProjects(),
          api.getStats()
        ]);

        if (!active) return;
        setProjects(projectResult.data || []);
        const initial = Object.fromEntries(
          (statResult.data || []).map((item) => [item.key, item.value])
        );
        setStats(initial);

        const viewResult = await api.incrementView();
        if (active && viewResult.data?.value != null) {
          setStats((current) => ({ ...current, views: viewResult.data.value }));
        }
      } catch (err) {
        if (active) setError(err.message || "Could not connect to the API");
      } finally {
        if (active) setLoading(false);
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
