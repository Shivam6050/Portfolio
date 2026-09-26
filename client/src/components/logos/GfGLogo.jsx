/**
 * Legacy standalone logo, currently not imported by page sections. Active logos use Logo.jsx/LOGOS or ToolkitLogo. size controls dimensions. Do not treat these illustrative components as the original toolkit asset registry.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Legacy standalone logo, currently not imported by page sections. Active logos use Logo.jsx/LOGOS or ToolkitLogo. size controls dimensions. Do not treat these illustrative components as the original toolkit asset registry. */
export default function GfGLogo({ size = 64 }) {
  return (
    /* Inline vector: viewBox sets coordinates; retain role/label for meaningful artwork or aria-hidden for decoration. */
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="GeeksforGeeks">
      {/* SVG rectangle sets background dimensions, corner rounding, and fill. */}<rect width="64" height="64" rx="16" fill="#2F8D46" />
      {/* Render text for this content group. Change its content binding for copy, classes/CSS for layout. */}<text x="32" y="39" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="#fff">
        &lt;/&gt;
      </text>
    </svg>
  );
}
