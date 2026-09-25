import { TOOLKIT_BRANDS, TOOLKIT_SYMBOLS } from "../../data/toolkitIcons.js";

export default function ToolkitLogo({ name }) {
  const brand = TOOLKIT_BRANDS[name];
  if (brand) {
    return <img className="toolkit-brand-logo" src={"/assets/toolkit/" + brand + ".svg"} width="26" height="26" alt="" aria-hidden="true" loading="lazy" />;
  }
  return (
    <svg className="toolkit-concept-icon" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(TOOLKIT_SYMBOLS[name] || []).map((path, index) => <path key={index} d={path} />)}
    </svg>
  );
}
