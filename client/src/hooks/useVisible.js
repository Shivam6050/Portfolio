/**
 * Activity gate for decorative scenes and preview timers. Returns a DOM ref and boolean. The 100px margin starts work just before viewport entry; document.hidden pauses background tabs. Change rootMargin to tune preload distance. Requires IntersectionObserver support.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import { useEffect, useRef, useState } from "react";

// Keep expensive decorations and timers idle outside the viewport or hidden tab.
/* Activity gate for decorative scenes and preview timers. Returns a DOM ref and boolean. The 100px margin starts work just before viewport entry; document.hidden pauses background tabs. Change rootMargin to tune preload distance. Requires IntersectionObserver support. */
export default function useVisible() {
  /* Mutable object/DOM handle; attach it to the rendered target before reading .current. Ref mutations do not trigger React renders. */
  const ref = useRef(null);
  /* Near-viewport AND foreground activity state; this is not a CSS display flag. */
  const [visible, setVisible] = useState(false);
  /* Run this lifecycle effect after render; dependencies determine reruns. Keep cleanup paired with each timer, observer, or listener. */
  useEffect(() => {
    /* Last observed intersection, combined with document.hidden to gate active work. */
    let intersecting = false;
    /* Recompute active state from intersection AND tab visibility; a hidden tab must not animate even if its bounds intersect. */
    const update = () => setVisible(intersecting && !document.hidden);
    /* Visibility observer; change options to tune activation and always disconnect on cleanup. */
    const observer = new IntersectionObserver(([entry]) => {
      /* Remember whether the observed wrapper intersects the expanded viewport, then recompute active state. */
      intersecting = entry.isIntersecting;
      /* Recompute the hook state from the latest visibility/preference value. */
      update();
    }, { /* Expand the observer viewport by 100px to begin work just before entry; larger margins preload earlier. */ rootMargin: "100px" });
    /* Guard: ref.current. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (ref.current) observer.observe(ref.current);
    /* Subscribe to this event; cleanup must remove the same callback. */
    document.addEventListener("visibilitychange", update);
    /* Release observer/database resources during cleanup. */
    return () => {
      /* Release observer/database resources during cleanup. */
      observer.disconnect();
      /* Remove the matching event listener to avoid duplicated handlers after remount. */
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  /* Return [ref, visible]; this ends the current function path. */
  return [ref, visible];
}
