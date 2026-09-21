import { LOGOS } from "../../data/constants.js";

function initials(label = "") {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Logo({ name, label, size = 28, className = "" }) {
  const src = LOGOS[name];

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-sm ${className}`}
      style={{ width: size, height: size }}
      title={label}
      aria-label={label}
    >
      {src ? (
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          className="h-full w-full object-contain"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.nextElementSibling?.classList.remove("hidden");
          }}
        />
      ) : null}
      <span className={`${src ? "hidden" : ""} font-mono text-[10px] font-bold text-ink`}>
        {initials(label)}
      </span>
    </span>
  );
}
