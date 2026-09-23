const FALLBACK_COLOR = "#141413";

function initials(label = "") {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function ConceptMark({ label, size }) {
  const text = initials(label).slice(0, 3);
  return (
    <span
      aria-hidden="true"
      className="font-mono text-[9px] font-bold tracking-[-0.04em]"
      style={{ color: FALLBACK_COLOR, fontSize: Math.max(8, Math.round(size * 0.32)) }}
    >
      {text}
    </span>
  );
}

export default function Logo({ name, label, size = 28, className = "" }) {
  const src = typeof name === "string" ? name : null;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-sm ${className}`}
      style={{ width: size, height: size }}
      title={label}
      aria-label={label}
    >
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <ConceptMark label={label} size={size} />
      </span>

      {src ? (
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="relative z-[1] h-full w-full object-contain"
          onError={(event) => {
            event.currentTarget.remove();
          }}
        />
      ) : null}
    </span>
  );
}
