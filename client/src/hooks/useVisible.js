import { useEffect, useRef, useState } from "react";

// Keep expensive decorations and timers idle outside the viewport or hidden tab.
export default function useVisible() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let intersecting = false;
    const update = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      update();
    }, { rootMargin: "100px" });
    if (ref.current) observer.observe(ref.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return [ref, visible];
}
