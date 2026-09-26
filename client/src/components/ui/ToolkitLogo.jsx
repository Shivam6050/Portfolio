/**
 * Known brands load unchanged local SVG; generic concepts use neutral 24x24 path data. Update toolkitIcons.js and bundled source/license records for new brands. Icons are decorative because neighboring text names the tool.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import TOOLKIT_BRANDS, TOOLKIT_SYMBOLS from ../../data/toolkitIcons.js; edit that module for the shared implementation. */
import { TOOLKIT_BRANDS, TOOLKIT_SYMBOLS } from "../../data/toolkitIcons.js";

/* Known brands load unchanged local SVG; generic concepts use neutral 24x24 path data. Update toolkitIcons.js and bundled source/license records for new brands. Icons are decorative because neighboring text names the tool. */
export default function ToolkitLogo({ name }) {
  /* Local toolkit SVG basename; missing entries use neutral concept paths. */
  const brand = TOOLKIT_BRANDS[name];
  /* Guard: brand. Run the following branch only when true; preserve early returns when modifying this flow. */
  if (brand) {
    return /* Image: src selects asset, alt provides text replacement, loading/decoding tune fetching/rendering. Preserve original brand proportions. Decorative: omitted from the accessibility tree. */ <img className="toolkit-brand-logo" src={"/assets/toolkit/" + brand + ".svg"} width="26" height="26" alt="" aria-hidden="true" loading="lazy" />;
  }
  return (
    /* Inline vector: viewBox sets coordinates; retain role/label for meaningful artwork or aria-hidden for decoration. Decorative: omitted from the accessibility tree. */
    <svg className="toolkit-concept-icon" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(TOOLKIT_SYMBOLS[name] || []).map((path, index) => /* SVG shape coordinates use parent viewBox units; edit the path to change the illustration/flourish. */ <path key={index} d={path} />)}
    </svg>
  );
}
