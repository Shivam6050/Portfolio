/**
 * Shared state for local projects, optional statistics, and notifications. PROJECTS is bundled content, not a projects API response. Edit constants.js for visible projects. The session flag is approximate analytics, not a unique-visitor guarantee.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
/* Import PROJECTS from ../data/constants.js; edit that module for the shared implementation. */
import { PROJECTS } from "../data/constants.js";
/* Import api from ../api/client.js; edit that module for the shared implementation. */
import { api } from "../api/client.js";

/* Context defaults to null so useApp can detect a missing provider. */
const AppContext = createContext(null);

/* Shared state for local projects, optional statistics, and notifications. PROJECTS is bundled content, not a projects API response. Edit constants.js for visible projects. The session flag is approximate analytics, not a unique-visitor guarantee. */
export function AppProvider({ children }) {
  // Portfolio content lives in data/constants.js. Components only render the template.
  /* Project collection; frontend uses local PROJECTS, while server/seed data is a separate MongoDB source. */
  const projects = PROJECTS;
  /* Currently false because frontend project content is local; changing to remote loading also requires an error/loading design. */
  const loading = false;
  /* Non-blocking error state; statistics failures must not hide static content. */
  const [error, setError] = useState("");
  /* Optional counter state; defaults to zero while the API loads. */
  const [stats, setStats] = useState({ views: 0 });
  /* Notification queue; use functional updates to handle concurrent additions/expiry. */
  const [toasts, setToasts] = useState([]);

  /* Mutable Set of pending toast timeout handles; preserve unmount cleanup to avoid late updates. */
  const timers = useRef(new Set());
  /* Run this lifecycle effect after render; dependencies determine reruns. Keep cleanup paired with each timer, observer, or listener. */
  useEffect(() => () => {
    /* Cancel every remaining toast timeout on unmount to prevent late queue updates. */
    timers.current.forEach(timer => window.clearTimeout(timer));
    /* Drop cancelled handles from the tracking set after cleanup. */
    timers.current.clear();
  }, []);

  /* Stable notification callback; expiry is configured as 3800ms in AppContext. */
  const toast = useCallback((message, type = "success") => {
    /* Toast identity combining time/randomness; expiry removes only this entry. */
    const id = `portfolio-${Date.now()}-${Math.random()}`;
    /* Update the notification queue immutably using latest state, so overlapping timers remain correct. */
    setToasts((current) => [...current, { id, message, type }]);
    /* Timer handle retained so cleanup can cancel background work. */
    const timer = window.setTimeout(() => {
      /* Remove the completed timeout handle from tracking so the set does not grow indefinitely. */
      timers.current.delete(timer);
      /* Update the notification queue immutably using latest state, so overlapping timers remain correct. */
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3800);
    /* Track this new expiry timer so provider cleanup can cancel it. */
    timers.current.add(timer);
  }, []);

  /* Run this lifecycle effect after render; dependencies determine reruns. Keep cleanup paired with each timer, observer, or listener. */
  useEffect(() => {
    /* Current carousel index or effect-liveness guard in this scope; preserve its cleanup/index bounds. */
    let active = true;

    /* Read optional counters and increment after checking the session flag; failures must not block portfolio content. */
    async function loadStats() {
      /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
      try {
        /* Stats response envelope; its data array becomes a key/value object. */
        const statResult = await api.getStats();
        /* Guard: !active. Run the following branch only when true; preserve early returns when modifying this flow. */
        if (!active) return;

        /* Update optional counters from the API; this state must not gate static project content. */
        setStats(Object.fromEntries(
          (statResult.data || []).map((item) => [item.key, item.value])
        ));

        /* Guard: !sessionStorage.getItem("portfolio-viewed"). Run the following branch only when true; preserve early returns when modifying this flow. */
        if (!sessionStorage.getItem("portfolio-viewed")) {
          /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
          try {
            /* Increment response envelope; use the returned value instead of guessing a local count. */
            const viewResult = await api.incrementView();
            /* Guard: active && viewResult.data?.value != null. Run the following branch only when true; preserve early returns when modifying this flow. */
            if (active && viewResult.data?.value != null) {
              /* Update optional counters from the API; this state must not gate static project content. */
              setStats((current) => ({ ...current, views: viewResult.data.value }));
            }
            /* Mark this tab session counted after successful increment; clearing storage allows another count. */
            sessionStorage.setItem("portfolio-viewed", "true");
          } /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch {
            // Analytics must never block portfolio rendering.
          }
        }
      } /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch (err) {
        /* Guard: active. Run the following branch only when true; preserve early returns when modifying this flow. */
        if (active) setError(err.message || "Portfolio stats unavailable");
      }
    }

    /* Start optional analytics once this effect is mounted; static projects do not wait for it. */
    loadStats();
    /* Invalidate this effect so late async responses cannot update its unmounted consumer. */
    return () => {
      /* Invalidate this effect so late async responses cannot update its unmounted consumer. */
      active = false;
    };
  }, []);

  /* Memoized provider value; dependencies include every state/action exposed to consumers. */
  const value = useMemo(
    () => ({ /* Project API path/context field; visible React project content still comes from local constants. */ projects, loading, error, stats, toasts, toast }),
    [projects, loading, error, stats, toasts, toast]
  );

  return /* Expose memoized context state/actions to descendants. */ <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/* Shared state for local projects, optional statistics, and notifications. PROJECTS is bundled content, not a projects API response. Edit constants.js for visible projects. The session flag is approximate analytics, not a unique-visitor guarantee. */
export function useApp() {
  /* Nearest provider value; throw a clear error if used outside AppProvider. */
  const context = useContext(AppContext);
  /* Guard: !context. Run the following branch only when true; preserve early returns when modifying this flow. */
  if (!context) throw new Error("useApp must be used inside AppProvider");
  /* Return context; this ends the current function path. */
  return context;
}
