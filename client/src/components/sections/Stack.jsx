import { STACK_GROUPS, PORTFOLIO_CONFIG } from "../../data/constants.js";
import Logo from "../ui/Logo.jsx";

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
      <div className="toolkit-grid">
        {STACK_GROUPS.map((group, index) => (
          <article className="toolkit-group" key={group.title} aria-labelledby={"toolkit-heading-" + index}>
            <div className="toolkit-group-meta">
              <span className="toolkit-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{String(group.items.length).padStart(2, "0")} tools &amp; practices</span>
            </div>
            <h3 id={"toolkit-heading-" + index}>{group.title}</h3>
            <p className="toolkit-description">{descriptions[index]}</p>
            <ul className="toolkit-card-grid">
              {group.items.map(([name, label]) => (
                <li className="toolkit-card" key={name}>
                  <span className="toolkit-icon"><Logo name={name} label={label} size={22} /></span>
                  <span className="toolkit-label">{label}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
