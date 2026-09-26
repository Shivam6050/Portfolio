/**
 * Toolkit cards use STACK_GROUPS and original local icons. Keep descriptions aligned with category order. Observer reveals each card once per mount; mouse tilt respects reduced motion. Current toolkit animation is CSS-based, not ToolkitThreeScene.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import { useEffect, useRef } from "react";
/* Import STACK_GROUPS, PORTFOLIO_CONFIG from ../../data/constants.js; edit that module for the shared implementation. */
import { STACK_GROUPS, PORTFOLIO_CONFIG } from "../../data/constants.js";
/* Import ToolkitLogo from ../ui/ToolkitLogo.jsx; edit that module for the shared implementation. */
import ToolkitLogo from "../ui/ToolkitLogo.jsx";

/* Toolkit helper copy indexed alongside STACK_GROUPS; reorder both together. */
const descriptions = [
  "The foundations behind every build.",
  "Interfaces that feel clear and considered.",
  "The systems working behind the screen.",
  "Intelligence woven into useful products.",
  "Built with trust and resilience in mind.",
  "From the first commit to production."
];

/* Toolkit cards use STACK_GROUPS and original local icons. Keep descriptions aligned with category order. Observer reveals each card once per mount; mouse tilt respects reduced motion. Current toolkit animation is CSS-based, not ToolkitThreeScene. */
export default function Stack() {
  /* Read toolkit headings/lede from PORTFOLIO_CONFIG. */
  const { stack } = PORTFOLIO_CONFIG;
  /* Mounted toolkit grid reference used to discover reveal wrappers. */
  const gridRef = useRef(null);
  /* Run this lifecycle effect after render; dependencies determine reruns. Keep cleanup paired with each timer, observer, or listener. */
  useEffect(() => {
    /* Guard: !("IntersectionObserver" in window). Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!("IntersectionObserver" in window)) return;
    /* Visibility observer; change options to tune activation and always disconnect on cleanup. */
    const observer = new IntersectionObserver((entries) => {
      /* Apply the CSS state class that activates the toolkit entrance animation. */
      entries.forEach((entry) => {
        /* Guard: !entry.isIntersecting. Run the following branch only when true; preserve early returns when modifying this flow. */
        if (!entry.isIntersecting) return;
        /* Apply the CSS state class that activates the toolkit entrance animation. */
        entry.target.classList.add("is-visible");
        /* Stop watching an already-revealed card; entrance runs once per mount. */
        observer.unobserve(entry.target);
      });
    }, { /* Reveal after 12% of the card intersects; change this fraction to tune entrance timing. */ threshold: 0.12 });
    /* Observe the mounted target so near-viewport state can activate work. */
    gridRef.current?.querySelectorAll(".toolkit-reveal").forEach((card) => observer.observe(card));
    /* Release observer/database resources during cleanup. */
    return () => observer.disconnect();
  }, []);

  /* Convert stable wrapper-relative mouse position into small CSS rotations/glow coordinates; change multipliers to tune intensity. */
  const tilt = (event) => {
    /* Guard: event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    /* Toolkit card receiving CSS variables; parent bounds stay stable while the card tilts. */
    const card = event.currentTarget;
    /* Surface bounds; subtract its origin before normalizing pointer coordinates. */
    const rect = card.parentElement.getBoundingClientRect();
    /* Normalized pointer X coordinate; toolkit clamps it to 0-1, projects convert it to 0-100 percent. */
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    /* Normalized vertical coordinate, distributed from +1 to -1 for spherical node placement. */
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    card.style.setProperty("--tilt-x", (0.5 - y) * 7 + "deg");
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    card.style.setProperty("--tilt-y", (x - 0.5) * 7 + "deg");
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    card.style.setProperty("--glow-x", x * 100 + "%");
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    card.style.setProperty("--glow-y", y * 100 + "%");
  };
  /* Reset pointer styles on leave/cancel so CSS resting values apply again. */
  const resetTilt = (event) => {
    /* Remove temporary inline CSS variables so resting fallback values apply again. */
    ["--tilt-x", "--tilt-y", "--glow-x", "--glow-y"].forEach((key) => event.currentTarget.style.removeProperty(key));
  };
  return (
    /* Page section anchored by stack; update navigation destinations if renaming the ID. */
    <section id="stack" className="section-shell section-block stack-section">
      {/* Render div with styling hook section-heading. Change its content binding for copy, classes/CSS for layout. */}<div className="section-heading">
        {/* Render p with styling hook sec-num. Change its content binding for copy, classes/CSS for layout. */}<p className="sec-num">{stack.sectionNumber}</p>
        {/* Render div for this content group. Change its content binding for copy, classes/CSS for layout. */}<div>
          {/* Render div with styling hook section-meta. Change its content binding for copy, classes/CSS for layout. */}<div className="section-meta"><span>{stack.meta}</span><span>Hands-on / Always evolving</span></div>
          {/* Level-2 heading; edit referenced text/data without breaking heading hierarchy. */}<h2 className="section-title">{stack.title} <em>{stack.titleEmphasis}</em></h2>
          {/* Render p with styling hook section-lede. Change its content binding for copy, classes/CSS for layout. */}<p className="section-lede">{stack.lede}</p>
        </div>
      </div>
      {/* Render div with styling hook toolkit-grid. Change its content binding for copy, classes/CSS for layout. */}<div className="toolkit-grid" ref={gridRef}>
        {STACK_GROUPS.map((group, index) => (
          /* Render div with styling hook toolkit-reveal. Change its content binding for copy, classes/CSS for layout. */
          <div className="toolkit-reveal" key={group.title} style={{ "--reveal-delay": (index % 3) * 90 + "ms" }}>
          {/* Independent record/card; data supplies content and classes select presentation. */}<article className="toolkit-group" aria-labelledby={"toolkit-heading-" + index} onPointerMove={tilt} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
            {/* Render span with styling hook toolkit-sheen. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<span className="toolkit-sheen" aria-hidden="true" />
            {/* Render div with styling hook toolkit-group-meta. Change its content binding for copy, classes/CSS for layout. */}<div className="toolkit-group-meta">
              {/* Render span with styling hook toolkit-number. Change its content binding for copy, classes/CSS for layout. */}<span className="toolkit-number">{String(index + 1).padStart(2, "0")}</span>
              {/* Render span for this content group. Change its content binding for copy, classes/CSS for layout. */}<span>{String(group.items.length).padStart(2, "0")} tools &amp; practices</span>
            </div>
            {/* Level-3 heading; edit referenced text/data without breaking heading hierarchy. */}<h3 id={"toolkit-heading-" + index}>{group.title}</h3>
            {/* Render p with styling hook toolkit-description. Change its content binding for copy, classes/CSS for layout. */}<p className="toolkit-description">{descriptions[index]}</p>
            {/* Semantic list container; use stable keys for mapped entries. */}<ul className="toolkit-card-grid">
              {group.items.map(([name, label]) => (
                /* Semantic list item; use stable keys for mapped entries. */
                <li className="toolkit-card" key={name}>
                  {/* Render span with styling hook toolkit-icon. Change its content binding for copy, classes/CSS for layout. */}<span className="toolkit-icon"><ToolkitLogo name={name} /></span>
                  {/* Render span with styling hook toolkit-label. Change its content binding for copy, classes/CSS for layout. */}<span className="toolkit-label">{label}</span>
                </li>
              ))}
            </ul>
          </article>
          </div>
        ))}
      </div>
    </section>
  );
}
