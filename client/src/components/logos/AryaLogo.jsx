/**
 * Legacy standalone logo, currently not imported by page sections. Active logos use Logo.jsx/LOGOS or ToolkitLogo. size controls dimensions. Do not treat these illustrative components as the original toolkit asset registry.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Legacy standalone logo, currently not imported by page sections. Active logos use Logo.jsx/LOGOS or ToolkitLogo. size controls dimensions. Do not treat these illustrative components as the original toolkit asset registry. */
export default function AryaLogo({ size = 48 }) {
  return (
    /* Inline vector: viewBox sets coordinates; retain role/label for meaningful artwork or aria-hidden for decoration. */
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Arya College of Engineering">
      {/* SVG rectangle sets background dimensions, corner rounding, and fill. */}<rect width="48" height="48" rx="12" fill="#141413" />
      {/* SVG shape coordinates use parent viewBox units; edit the path to change the illustration/flourish. */}<path d="M9 37 24 10l15 27H30l-2.4-5H20.5l-2.4 5H9Zm13.8-10.5h2.4L24 23.9l-1.2 2.6Z" fill="#b8431a" />
    </svg>
  );
}
