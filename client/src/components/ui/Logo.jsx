/**
 * General logo renderer for projects/experience/contact. LOGOS supplies URLs; failures display up to two initials. Edit constants.js for source URLs. Toolkit separately uses ToolkitLogo and local original-brand assets.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import LOGOS from ../../data/constants.js; edit that module for the shared implementation. */
import { LOGOS } from "../../data/constants.js";

/* Split words, remove empty entries, take at most two initials, and uppercase the fallback label. */
function initials(label = "") {
  /* Return label .split(/\s+/) .filter(Boolean) .slice(0, 2) .map((word) => word[0]) .join("") .toUpperCas; this ends the current function path. */
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/* General logo renderer for projects/experience/contact. LOGOS supplies URLs; failures display up to two initials. Edit constants.js for source URLs. Toolkit separately uses ToolkitLogo and local original-brand assets. */
export default function Logo({ name, label, size = 28, className = "" }) {
  /* General logo URL from LOGOS; missing URLs use initials. */
  const src = LOGOS[name];

  return (
    /* Render span with styling hook `inline-flex shrink-0 items-center justify-center rounded-sm ${className}`. Change its content binding for copy, classes/CSS for layout. */
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-sm ${className}`}
      style={{ /* Match the logo slot width/height to the size prop in pixels; keep both axes equal to preserve a square slot. */ width: size, height: size }}
      title={label}
      aria-label={label}
    >
      {src ? (
        /* Image: src selects asset, alt provides text replacement, loading/decoding tune fetching/rendering. Preserve original brand proportions. */
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          className="h-full w-full object-contain"
          onError={(event) => {
            /* Hide the failed remote image; the sibling initials span becomes the accessible visual fallback. */
            event.currentTarget.style.display = "none";
            /* Reveal the initials fallback following a logo image load error. */
            event.currentTarget.nextElementSibling?.classList.remove("hidden");
          }}
        />
      ) : null}
      {/* Render span with styling hook `${src ? "hidden" : ""} font-mono text-[10px] font-bold text-ink`. Change its content binding for copy, classes/CSS for layout. */}<span className={`${src ? "hidden" : ""} font-mono text-[10px] font-bold text-ink`}>
        {initials(label)}
      </span>
    </span>
  );
}
