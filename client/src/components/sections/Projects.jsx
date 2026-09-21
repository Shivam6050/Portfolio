import { useEffect, useState } from "react";
import Logo from "../ui/Logo.jsx";
import { useApp } from "../../context/AppContext.jsx";

function Skeleton() {
  return (
    <div className="project-card-skeleton">
      <div className="skeleton project-skeleton-media" />
      <div className="skeleton project-skeleton-copy" />
    </div>
  );
}

function ProjectPreview({ project }) {
  const previews = project.previews?.length ? project.previews : [project.preview];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (previews.length < 2) return undefined;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % previews.length),
      4500
    );
    return () => window.clearInterval(timer);
  }, [previews.length]);

  const move = (direction) => {
    setActive((current) => (current + direction + previews.length) % previews.length);
  };

  if (!previews[active]) return null;

  return (
    <div className="project-preview-shell">
      <a
        className="project-preview-link"
        href={project.demo || project.code}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open live ${project.title}`}
      >
        <img
          className="project-preview-image"
          src={previews[active]}
          alt={`${project.title} live website preview`}
          loading="lazy"
          draggable="false"
        />
        <span className="project-preview-overlay">
          <span>{project.demo ? "Open live site" : "View source"}</span>
          <span aria-hidden="true">↗</span>
        </span>
      </a>

      {previews.length > 1 && (
        <>
          <button
            type="button"
            className="project-preview-arrow project-preview-prev"
            onClick={() => move(-1)}
            aria-label="Previous project preview"
          >
            ←
          </button>
          <button
            type="button"
            className="project-preview-arrow project-preview-next"
            onClick={() => move(1)}
            aria-label="Next project preview"
          >
            →
          </button>
          <div className="project-preview-dots" aria-label="Project preview selector">
            {previews.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`project-preview-dot ${index === active ? "is-active" : ""}`}
                onClick={() => setActive(index)}
                aria-label={`Show preview ${index + 1}`}
                aria-pressed={index === active}
              />
            ))}
          </div>
        </>
      )}

      <span className="project-preview-status">
        {previews.length > 1 ? `${String(active + 1).padStart(2, "0")} / ${String(previews.length).padStart(2, "0")}` : "LIVE PREVIEW"}
      </span>
    </div>
  );
}

export default function Projects() {
  const { projects, loading, error } = useApp();

  return (
    <section id="work" className="section-shell section-block">
      <div className="section-heading">
        <p className="sec-num">02 / selected work</p>
        <div>
          <div className="section-meta"><span>03 projects</span><span>01—03</span></div>
          <h2 className="section-title">Things I&apos;ve <em>built</em></h2>
          <p className="section-lede">
            Systems where product thinking, backend architecture and AI meet practical software.
          </p>
        </div>
      </div>

      <div className="project-list">
        {loading
          ? [1, 2, 3].map((item) => <Skeleton key={item} />)
          : projects.map((project, index) => (
              <article
                key={project._id || project.slug}
                className="project-card project-card-featured"
                style={{ "--delay": `${index * 120}ms` }}
              >
                <div className="project-index">0{index + 1}</div>

                <div className="project-content">
                  <div className="project-heading-row">
                    <span className="project-tag">{project.tag}</span>
                    <span className="project-type">{project.demo ? "Live project" : "Open source"}</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-detail">{project.detail}</p>

                  <div className="project-stack">
                    {project.stack.map((item) => (
                      <span className="tag" key={item.name}>
                        <Logo name={item.name} label={item.label} size={15} />
                        {item.label}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.demo ? (
                      <a className="project-primary-link" href={project.demo} target="_blank" rel="noreferrer">
                        Visit live site ↗
                      </a>
                    ) : null}
                    <a className="u-link" href={project.code} target="_blank" rel="noreferrer">
                      View source ↗
                    </a>
                  </div>
                </div>

                <ProjectPreview project={project} />
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
