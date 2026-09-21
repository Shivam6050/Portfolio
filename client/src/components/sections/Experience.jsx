import { PROFILE } from "../../data/constants.js";

export default function Experience() {
  return (
    <section id="experience" className="section-shell border-y border-ink/10 bg-paper py-20 sm:py-28">
      <div className="grid gap-10 md:grid-cols-[100px_1fr]">
        <p className="sec-num">03 / background</p>

        <div>
          <h2 className="section-title">Experience, <em>education</em> &amp; training</h2>
          <p className="mt-4 max-w-2xl text-muted">
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
                    <p className="font-serif text-2xl italic">{item.company}</p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted">{item.period}</p>
                    <p className="mt-3 text-sm font-medium">{item.role}</p>
                    <p className="mt-1 font-mono text-[9px] leading-5 text-muted">{item.stack}</p>
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
                    <p className="font-serif text-xl italic">{item.institution}</p>
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
                    <p className="font-mono text-[9px] uppercase tracking-widest text-rust">{item.issuer}</p>
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
    </section>
  );
}
