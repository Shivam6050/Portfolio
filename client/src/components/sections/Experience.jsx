import { PROFILE } from "../../data/constants.js";
import Logo from "../ui/Logo.jsx";

export default function Experience() {
  return (
    <section id="experience" className="section-block experience-section">
      <div className="experience-inner">
      <div className="section-heading">
        <p className="sec-num">03 / background</p>

        <div>
          <div className="section-meta"><span>Experience / education</span><span>2023—2027</span></div><h2 className="section-title">The path <em>so far</em></h2>
          <p className="section-lede">
            Backend AI engineering, MERN development, formal computer-science education, and focused training in modern AI systems.
          </p>

          <div className="mt-12">
            <div className="mb-5 flex items-center justify-between border-b border-ink/15 pb-3">
              <h3 className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">Experience</h3>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted">01</span>
            </div>

            <div className="space-y-10">
              {PROFILE.experience.map((item) => (
                <article key={item.company} className="grid gap-5 lg:grid-cols-[190px_1fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <Logo name={item.logo} label={item.company} size={34} className="border border-ink/10 bg-cream p-1" />
                      <p className="font-serif text-2xl italic">{item.company}</p>
                    </div>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted">{item.period}</p>
                    <p className="mt-3 text-sm font-medium">{item.role}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.stack.map(([name, label]) => (
                        <span key={name} className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-muted">
                          <Logo name={name} label={label} size={13} />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-muted">
                    {item.points.map((point) => (
                      <li key={point} className="border-l border-ink/15 pl-4">{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-5 flex items-center justify-between border-b border-ink/15 pb-3">
                <h3 className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">Education</h3>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">02</span>
              </div>

              <div className="space-y-6">
                {PROFILE.education.map((item) => (
                  <article key={item.degree} className="border-l-2 border-rust pl-4">
                    <div className="flex items-center gap-3">
                      <Logo name={item.logo} label={item.institution} size={52} className="border border-ink/10 bg-cream p-1.5" />
                      <p className="font-serif text-xl italic">{item.institution}</p>
                    </div>
                    <p className="mt-1 text-sm">{item.degree}</p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted">
                      {[item.period, item.result].filter(Boolean).join(" · ")}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-5 flex items-center justify-between border-b border-ink/15 pb-3">
                <h3 className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">Certifications &amp; training</h3>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">03</span>
              </div>

              <div className="space-y-6">
                {PROFILE.certifications.map((item) => (
                  <article key={item.issuer} className="border border-ink/10 bg-cream p-5">
                    <div className="flex items-center gap-3">
                      <Logo name={item.logo} label={item.issuer} size={30} className="border border-ink/10 bg-cream p-1" />
                      <p className="font-mono text-[9px] uppercase tracking-widest text-rust">{item.issuer}</p>
                    </div>
                    <h4 className="mt-2 font-serif text-2xl italic">{item.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-ink/15 pt-6">
            <p className="max-w-3xl text-sm leading-6 text-muted">
              {PROFILE.additionalActivities.join(" ")}
            </p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
