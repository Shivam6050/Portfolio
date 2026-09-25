import { useEffect, useRef } from "react";
import { STACK_GROUPS, PORTFOLIO_CONFIG } from "../../data/constants.js";
import ToolkitLogo from "../ui/ToolkitLogo.jsx";

const descriptions = [
  "The foundations behind every build.",
  "Interfaces that feel clear and considered.",
  "The systems working behind the screen.",
  "Intelligence woven into useful products.",
  "Built with trust and resilience in mind.",
  "From the first commit to production."
];

export default function Stack() {
  const { stack } = PORTFOLIO_CONFIG;
  const gridRef = useRef(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    gridRef.current?.querySelectorAll(".toolkit-reveal").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const tilt = (event) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const rect = card.parentElement.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    card.style.setProperty("--tilt-x", (0.5 - y) * 7 + "deg");
    card.style.setProperty("--tilt-y", (x - 0.5) * 7 + "deg");
    card.style.setProperty("--glow-x", x * 100 + "%");
    card.style.setProperty("--glow-y", y * 100 + "%");
  };
  const resetTilt = (event) => {
    ["--tilt-x", "--tilt-y", "--glow-x", "--glow-y"].forEach((key) => event.currentTarget.style.removeProperty(key));
  };
  return (
    <section id="stack" className="section-shell section-block stack-section">
      <div className="section-heading">
        <p className="sec-num">{stack.sectionNumber}</p>
        <div>
          <div className="section-meta"><span>{stack.meta}</span><span>Hands-on / Always evolving</span></div>
          <h2 className="section-title">{stack.title} <em>{stack.titleEmphasis}</em></h2>
          <p className="section-lede">{stack.lede}</p>
        </div>
      </div>
      <div className="toolkit-grid" ref={gridRef}>
        {STACK_GROUPS.map((group, index) => (
          <div className="toolkit-reveal" key={group.title} style={{ "--reveal-delay": (index % 3) * 90 + "ms" }}>
          <article className="toolkit-group" aria-labelledby={"toolkit-heading-" + index} onPointerMove={tilt} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
            <span className="toolkit-sheen" aria-hidden="true" />
            <div className="toolkit-group-meta">
              <span className="toolkit-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{String(group.items.length).padStart(2, "0")} tools &amp; practices</span>
            </div>
            <h3 id={"toolkit-heading-" + index}>{group.title}</h3>
            <p className="toolkit-description">{descriptions[index]}</p>
            <ul className="toolkit-card-grid">
              {group.items.map(([name, label]) => (
                <li className="toolkit-card" key={name}>
                  <span className="toolkit-icon"><ToolkitLogo name={name} /></span>
                  <span className="toolkit-label">{label}</span>
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
