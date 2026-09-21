import Logo from "../ui/Logo.jsx";
import { useApp } from "../../context/AppContext.jsx";

function Skeleton() {
  return (
    <div className="grid animate-pulse gap-6 border-t border-ink/15 py-8 md:grid-cols-[80px_1fr_260px]">
      <div className="skeleton h-6 w-10" />
      <div>
        <div className="skeleton mb-3 h-9 w-3/4" />
        <div className="skeleton h-16 w-full max-w-xl" />
      </div>
      <div className="skeleton h-40 w-full" />
    </div>
  );
}

export default function Projects() {
  const { projects, loading, error } = useApp();

  return (
    <section id="work" className="section-shell section-block">
      <div className="section-heading">
        <p className="sec-num">02 / selected work</p>
        <div><div className="section-meta"><span>03 projects</span><span>01—03</span></div>
          <h2 className="section-title">Things I&apos;ve <em>built</em></h2>
          <p className="section-lede">
            Systems where product thinking, backend architecture and AI meet practical software.
          </p>
        </div>
      </div>

      <div>
        {loading
          ? [1, 2, 3].map((item) => <Skeleton key={item} />)
          : projects.map((project, index) => (
              <article
                key={project._id || project.slug}
                className="proj project-card"
                style={{ "--delay": `${index * 120}ms` }}
              >
                <div className="font-serif text-2xl italic text-rust">0{index + 1}</div>

                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                      {project.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[.92]">
                    {project.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                    {project.summary}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
                    {project.detail}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span className="tag" key={item.name}>
                        <Logo name={item.name} label={item.label} size={17} />
                        {item.label}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.demo ? <a className="u-link" href={project.demo} target="_blank" rel="noreferrer">Live demo ↗</a> : null}
                    <a className="u-link" href={project.code} target="_blank" rel="noreferrer">Code ↗</a>
                  </div>
                </div>

                <div className={`pattern ${project.pattern}`}>
                  <span className="font-mono text-xs font-bold tracking-tight">{project.thumbLabel}</span>
                  <span className="mt-2 font-mono text-[9px] uppercase tracking-widest opacity-70">{project.thumbSub}</span>
                </div>
              </article>
            ))}
      </div>

      {!loading && !projects.length && (
        <div className="border border-rust/30 bg-paper p-6 text-sm">
          {error || "No projects are available yet. Run the server seed command."}
        </div>
      )}
    </section>
  );
}
