import { useEffect, useState } from "react";
import Logo from "../ui/Logo.jsx";
import { useApp } from "../../context/AppContext.jsx";
import { PORTFOLIO_CONFIG } from "../../data/constants.js";

function Skeleton() {
  return (
    <div className="project-card-skeleton">
      <div className="skeleton project-skeleton-media" />
      <div className="skeleton project-skeleton-copy" />
    </div>
  );
}

function PreviewArtwork({ project, variant }) {
  const labels = {
    overview: ["dashboard", "usage → billing"],
    store: ["storefront", "products → cart"],
    cart: ["shopping cart", "items → totals"],
    checkout: ["checkout", "address → payment"],
  };

  const [eyebrow, caption] = labels[variant] || [project.thumbLabel, project.thumbSub];

  return (
    <div className={`project-preview-artwork ${project.pattern}`} aria-hidden="true">
      <div className="preview-browser-bar">
        <span /><span /><span />
      </div>
      <div className="preview-artwork-body">
        <p className="preview-artwork-eyebrow">{eyebrow}</p>
        <h4>{project.title}</h4>
        <div className="preview-artwork-grid">
          <span />
          <span />
          <span />
        </div>
        <div className="preview-artwork-footer">
          <span>{caption}</span>
          <span>↗</span>
        </div>
      </div>
    </div>
  );
}

function ProjectPreview({ project }) {
  const variants = project.previewVariants?.length
    ? project.previewVariants
    : project.previews?.length
      ? project.previews
      : project.preview
        ? [project.preview]
        : ["overview"];
  const [active, setActive] = useState(0);
  const hasRemoteImages = variants.some((item) => /^https?:\/\//.test(item));

  useEffect(() => {
    if (variants.length < 2) return undefined;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % variants.length),
      4500
    );
    return () => window.clearInterval(timer);
  }, [variants.length]);

  const move = (direction) => {
    setActive((current) => (current + direction + variants.length) % variants.length);
  };

  const current = variants[active];
  const isImage = /^https?:\/\//.test(current);

  return (
    <div className="project-preview-shell">
      <a
        className="project-preview-link"
        href={project.demo || project.code}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.demo ? "live " : ""}${project.title}`}
      >
        {isImage ? (
          <img
            className="project-preview-image"
            src={current}
            alt={`${project.title} preview`}
            loading="lazy"
            draggable="false"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <PreviewArtwork project={project} variant={current} />
        )}
        <span className="project-preview-overlay">
          <span>{project.demo ? "Open live site" : "View source"}</span>
          <span aria-hidden="true">↗</span>
        </span>
      </a>

      {variants.length > 1 && (
        <>
          <button type="button" className="project-preview-arrow project-preview-prev" onClick={() => move(-1)} aria-label="Previous project preview">←</button>
          <button type="button" className="project-preview-arrow project-preview-next" onClick={() => move(1)} aria-label="Next project preview">→</button>
          <div className="project-preview-dots" aria-label="Project preview selector">
            {variants.map((_, index) => (
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
        {variants.length > 1
          ? `${String(active + 1).padStart(2, "0")} / ${String(variants.length).padStart(2, "0")}`
          : "PROJECT PREVIEW"}
      </span>
    </div>
  );
}

export default function Projects() {
  const { projects, loading, error } = useApp();
  const { work } = PORTFOLIO_CONFIG;

  return (
    <section id="work" className="section-shell section-block">
      <div className="section-heading">
        <p className="sec-num">{work.sectionNumber}</p>
        <div>
          <div className="section-meta"><span>{projects.length} projects</span><span>01—{String(projects.length).padStart(2, "0")}</span></div>
          <h2 className="section-title">{work.title} <em>{work.titleEmphasis}</em></h2>
          <p className="section-lede">
            {work.lede}
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
