/**
 * Legacy standalone logo, currently not imported by page sections. Active logos use Logo.jsx/LOGOS or ToolkitLogo. size controls dimensions. Do not treat these illustrative components as the original toolkit asset registry.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Legacy standalone logo, currently not imported by page sections. Active logos use Logo.jsx/LOGOS or ToolkitLogo. size controls dimensions. Do not treat these illustrative components as the original toolkit asset registry. */
export default function FlyRankLogo({ size = 64 }) {
  return (
    /* Inline vector: viewBox sets coordinates; retain role/label for meaningful artwork or aria-hidden for decoration. */
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="FlyRank">
      {/* Reusable SVG definitions referenced by their IDs. */}<defs>
        {/* SVG gradient definition referenced by ID; use unique IDs if rendering multiple copies. */}<linearGradient id="flyrank-gradient" x1="0" y1="1" x2="1" y2="0">
          {/* Gradient color at its offset along the gradient. */}<stop offset="0" stopColor="#b8431a" />
          {/* Gradient color at its offset along the gradient. */}<stop offset="1" stopColor="#d99535" />
        </linearGradient>
      </defs>
      {/* SVG rectangle sets background dimensions, corner rounding, and fill. */}<rect width="64" height="64" rx="16" fill="url(#flyrank-gradient)" />
      {/* SVG shape coordinates use parent viewBox units; edit the path to change the illustration/flourish. */}<path d="M13 48 32 13l19 35H40l-3.1-6.2H27L23.8 48H13Zm18.1-15.3h1.8L32 28.8l-.9 3.9Z" fill="#fff7e9" />
      {/* SVG shape coordinates use parent viewBox units; edit the path to change the illustration/flourish. */}<path d="M22 20h22" stroke="#141413" strokeWidth="3" strokeLinecap="round" opacity=".35" />
    </svg>
  );
}
