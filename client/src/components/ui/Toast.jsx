import { useApp } from "../../context/AppContext.jsx";

export default function Toast() {
  const { toasts } = useApp();

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="fixed bottom-5 right-5 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((item) => (
        <div
          key={item.id}
          className={`toast-enter border border-ink/10 bg-ink px-4 py-3 text-sm text-cream shadow-xl ${
            item.type === "error" ? "border-rust/60" : ""
          }`}
        >
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-moss" />
          {item.message}
        </div>
      ))}
    </div>
  );
}
