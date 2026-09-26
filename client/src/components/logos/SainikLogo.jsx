/**
 * Legacy standalone logo, currently not imported by page sections. Active logos use Logo.jsx/LOGOS or ToolkitLogo. size controls dimensions. Do not treat these illustrative components as the original toolkit asset registry.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Legacy standalone logo, currently not imported by page sections. Active logos use Logo.jsx/LOGOS or ToolkitLogo. size controls dimensions. Do not treat these illustrative components as the original toolkit asset registry. */
export default function SainikLogo({ size = 48 }) {
  return (
    /* Image: src selects asset, alt provides text replacement, loading/decoding tune fetching/rendering. Preserve original brand proportions. */
    <img
      src="/assets/sainik-school-bhubaneswar.png"
      alt="Sainik School Bhubaneswar"
      width={size}
      height={size}
      className="object-contain"
    />
  );
}
