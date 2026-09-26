/**
 * Accessible AppContext notification list. The provider owns IDs and 3800ms expiry; change timing there. Keep the polite live region so feedback is announced without stealing focus.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import useApp from ../../context/AppContext.jsx; edit that module for the shared implementation. */
import { useApp } from "../../context/AppContext.jsx";

/* Accessible AppContext notification list. The provider owns IDs and 3800ms expiry; change timing there. Keep the polite live region so feedback is announced without stealing focus. */
export default function Toast() {
  /* Notification queue; use functional updates to handle concurrent additions/expiry. */
  const { toasts } = useApp();

  return (
    /* Render div with styling hook fixed bottom-5 right-5 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2. Change its content binding for copy, classes/CSS for layout. */
    <div role="status" aria-live="polite" aria-atomic="true" className="fixed bottom-5 right-5 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((item) => (
        /* Render div with styling hook `toast-enter border border-ink/10 bg-ink px-4 py-3 text-sm text-cream shadow-xl ${ it. Change its content binding for copy, classes/CSS for layout. */
        <div
          key={item.id}
          className={`toast-enter border border-ink/10 bg-ink px-4 py-3 text-sm text-cream shadow-xl ${
            item.type === "error" ? "border-rust/60" : ""
          }`}
        >
          {/* Render span with styling hook mr-2 inline-block h-2 w-2 rounded-full bg-moss. Change its content binding for copy, classes/CSS for layout. */}<span className="mr-2 inline-block h-2 w-2 rounded-full bg-moss" />
          {item.message}
        </div>
      ))}
    </div>
  );
}
