/**
 * Live OS/browser reduced-motion preference. Consumers render static scenes or disable motion. Pair event registration with cleanup; a one-time read would miss preference changes while the page is open.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import { useEffect, useState } from "react";
/* Live OS/browser reduced-motion preference. Consumers render static scenes or disable motion. Pair event registration with cleanup; a one-time read would miss preference changes while the page is open. */
export default function useReducedMotion() {
  /* Initialize from the browser preference, guarding window for non-browser imports; the effect keeps this state current. */
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  /* Run this lifecycle effect after render; dependencies determine reruns. Keep cleanup paired with each timer, observer, or listener. */
  useEffect(() => {
    /* Live reduced-motion MediaQueryList; register/remove the same callback for changes. */
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    /* Synchronize reduced-motion state with query.matches whenever the preference changes. */
    const update = () => setReduced(query.matches);
    /* Recompute the hook state from the latest visibility/preference value. */
    update();
    /* Subscribe to this event; cleanup must remove the same callback. */
    query.addEventListener("change", update);
    /* Remove the matching event listener to avoid duplicated handlers after remount. */
    return () => query.removeEventListener("change", update);
  }, []);
  /* Return reduced; this ends the current function path. */
  return reduced;
}
