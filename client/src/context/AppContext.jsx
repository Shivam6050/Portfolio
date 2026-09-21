import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/client.js";

const AppContext = createContext(null);
export function AppProvider({ children }) {
  const [projects, setProjects] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState(""), [stats, setStats] = useState({ views: 0 }), [toasts, setToasts] = useState([]);
  const toast = (message, type = "success") => { const id = `${Date.now()}-${Math.random()}`; setToasts((c) => [...c, { id, message, type }]); window.setTimeout(() => setToasts((c) => c.filter((i) => i.id !== id)), 3800); };
  useEffect(() => { let active = true; async function load() { try { setLoading(true); const [projectResult, statResult] = await Promise.all([api.getProjects(), api.getStats()]); if (!active) return; setProjects(projectResult.data || []); setStats(Object.fromEntries((statResult.data || []).map((i) => [i.key, i.value]))); if (!sessionStorage.getItem("portfolio-viewed")) { const viewResult = await api.incrementView(); if (active && viewResult.data?.value != null) setStats((c) => ({ ...c, views: viewResult.data.value })); sessionStorage.setItem("portfolio-viewed", "true"); } } catch (err) { if (active) setError(err.message || "Could not connect to the API"); } finally { if (active) setLoading(false); } } load(); return () => { active = false; }; }, []);
  const value = useMemo(() => ({ projects, loading, error, stats, toasts, toast }), [projects, loading, error, stats, toasts]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() { const context = useContext(AppContext); if (!context) throw new Error("useApp must be used inside AppProvider"); return context; }
