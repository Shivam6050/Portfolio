import { STACK_GROUPS } from "../../data/constants.js";
import Logo from "../ui/Logo.jsx";

export default function Stack() {
  return (
    <section id="stack" className="section-shell section-block stack-section">
      <div className="section-heading">
        <p className="sec-num">03 / toolkit</p>
        <div>
          <div className="section-meta"><span>Technical stack</span><span>Hands-on</span></div><h2 className="section-title">Tools of the <em>trade</em></h2>
          <p className="section-lede">
            A practical stack spanning product interfaces, APIs, databases, AI integrations and delivery.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {STACK_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {group.title}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map(([name, label]) => (
                    <div className="logo-grid-item" key={name}>
                      <Logo name={name} label={label} size={24} />
                      <span className="text-xs">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
