/**
 * Gallery uses local PROJECTS through useApp. Array order controls display; the order property does not sort it. Preview rotation is 4500ms and stops when paused, offscreen, or reduced motion is enabled. CSS variables drive pointer tilt.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import useVisible from ../../hooks/useVisible.js; edit that module for the shared implementation. */
import useVisible from "../../hooks/useVisible.js";
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import { useEffect, useState } from "react";
/* Import useReducedMotion from ../../hooks/useReducedMotion.js; edit that module for the shared implementation. */
import useReducedMotion from "../../hooks/useReducedMotion.js";
/* Import Logo from ../ui/Logo.jsx; edit that module for the shared implementation. */
import Logo from "../ui/Logo.jsx";
/* Import useApp from ../../context/AppContext.jsx; edit that module for the shared implementation. */
import { useApp } from "../../context/AppContext.jsx";
/* Import PORTFOLIO_CONFIG from ../../data/constants.js; edit that module for the shared implementation. */
import { PORTFOLIO_CONFIG } from "../../data/constants.js";
/* Lazy scene boundary, aliased here by its visual role; preserve this import to keep viewport-based loading. */
import AuraParticleCanvas from "../ui/DeferredScene.jsx";

/* Gallery uses local PROJECTS through useApp. Array order controls display; the order property does not sort it. Preview rotation is 4500ms and stops when paused, offscreen, or reduced motion is enabled. CSS variables drive pointer tilt. */
function Skeleton() {
  return (
    /* Render div with styling hook project-card-skeleton. Change its content binding for copy, classes/CSS for layout. */
    <div className="project-card-skeleton">
      {/* Render div with styling hook skeleton project-skeleton-media. Change its content binding for copy, classes/CSS for layout. */}<div className="skeleton project-skeleton-media" />
      {/* Render div with styling hook skeleton project-skeleton-copy. Change its content binding for copy, classes/CSS for layout. */}<div className="skeleton project-skeleton-copy" />
    </div>
  );
}

/* Gallery uses local PROJECTS through useApp. Array order controls display; the order property does not sort it. Preview rotation is 4500ms and stops when paused, offscreen, or reduced motion is enabled. CSS variables drive pointer tilt. */
function ProjectPreview({ project }) {
  /* User motion preference; preserve static content when animation is disabled. */
  const reducedMotion = useReducedMotion();
  /* Attach previewRef to the carousel surface; visible gates its interval when offscreen or in a hidden tab. */
  const [previewRef, visible] = useVisible();
  /* Manual carousel pause state; visibility and reduced motion also suppress its timer. */
  const [paused, setPaused] = useState(false);
  /* Prefer nonempty previews array, otherwise use the single preview URL; edit URLs in PROJECTS. */
  const previews = project.previews?.length ? project.previews : [project.preview];
  /* Calculate preview-relative pointer percentages and rotation degrees; mouse/reduced-motion guard avoids unnecessary touch motion. */
  const handlePointerMove = (event) => {
    /* Guard: reducedMotion || event.pointerType !== "mouse". Run the following branch only when true; preserve early returns when modifying this flow. */
    if (reducedMotion || event.pointerType !== "mouse") return;
    /* Preview DOM surface that owns the CSS tilt/highlight variables. */
    const surface = event.currentTarget;
    /* Surface bounds; subtract its origin before normalizing pointer coordinates. */
    const rect = surface.getBoundingClientRect();
    /* Normalized pointer X coordinate; toolkit clamps it to 0-1, projects convert it to 0-100 percent. */
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    /* Normalized vertical coordinate, distributed from +1 to -1 for spherical node placement. */
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    surface.style.setProperty("--project-mx", `${x}%`);
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    surface.style.setProperty("--project-my", `${y}%`);
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    surface.style.setProperty("--project-rx", `${((50 - y) * 0.045).toFixed(2)}deg`);
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    surface.style.setProperty("--project-ry", `${((x - 50) * 0.055).toFixed(2)}deg`);
  };

  /* Reset pointer styles on leave/cancel so CSS resting values apply again. */
  const resetTilt = (event) => {
    /* Preview DOM surface that owns the CSS tilt/highlight variables. */
    const surface = event.currentTarget;
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    surface.style.setProperty("--project-mx", "50%");
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    surface.style.setProperty("--project-my", "50%");
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    surface.style.setProperty("--project-rx", "0deg");
    /* Write a pointer-derived CSS variable consumed by the matching transform/highlight rules in index.css. */
    surface.style.setProperty("--project-ry", "0deg");
  };
  /* Current carousel index or effect-liveness guard in this scope; preserve its cleanup/index bounds. */
  const [active, setActive] = useState(0);

  /* Run this lifecycle effect after render; dependencies determine reruns. Keep cleanup paired with each timer, observer, or listener. */
  useEffect(() => {
    /* Guard: previews.length < 2 || paused || reducedMotion || !visible. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (previews.length < 2 || paused || reducedMotion || !visible) return undefined;
    /* Timer handle retained so cleanup can cancel background work. */
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % previews.length),
      4500
    );
    /* Return () => window.clearInterval(timer); this ends the current function path. */
    return () => window.clearInterval(timer);
  }, [previews.length, paused, reducedMotion, visible]);

  /* Wrap preview index in either direction; adding length avoids negative JavaScript remainder values. */
  const move = (direction) => {
    /* Advance/reverse the current preview index with wraparound; adding list length avoids a negative remainder. */
    setActive((current) => (current + direction + previews.length) % previews.length);
  };

  /* Guard: !previews[active]. Run the following branch only when true; preserve early returns when modifying this flow. */
  if (!previews[active]) return null;

  return (
    /* Render div with styling hook project-preview-shell project-preview-3d. Change its content binding for copy, classes/CSS for layout. */
    <div
      ref={previewRef}
      className="project-preview-shell project-preview-3d"
      data-project-stage
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{
        /* Resting pointer X is centered; pointer movement overwrites this percentage for the project highlight. */
        "--project-mx": "50%",
        /* Resting pointer Y is centered; pointer movement overwrites this percentage for the project highlight. */
        "--project-my": "50%",
        /* Resting X rotation is zero degrees; mouse movement computes a small tilt. */
        "--project-rx": "0deg",
        /* Resting Y rotation is zero degrees; mouse movement computes a small tilt. */
        "--project-ry": "0deg"
      }}
    >
      {/* Render span with styling hook project-depth-grid. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<span className="project-depth-grid" aria-hidden="true" />
      {/* Render span with styling hook project-depth-orbit project-depth-orbit-a. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<span className="project-depth-orbit project-depth-orbit-a" aria-hidden="true" />
      {/* Render span with styling hook project-depth-orbit project-depth-orbit-b. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<span className="project-depth-orbit project-depth-orbit-b" aria-hidden="true" />
      {/* Render span with styling hook project-depth-glow. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<span className="project-depth-glow" aria-hidden="true" />
      {/* Render span with styling hook project-depth-corner project-depth-corner-tl. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<span className="project-depth-corner project-depth-corner-tl" aria-hidden="true" />
      {/* Render span with styling hook project-depth-corner project-depth-corner-br. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<span className="project-depth-corner project-depth-corner-br" aria-hidden="true" />
      {/* Render div with styling hook project-particle-canvas. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<div className="project-particle-canvas" aria-hidden="true">
        {/* Shared particle decoration. Sections alias DeferredScene by this name; speedMultiplier/spreadMultiplier tune the effect. */}<AuraParticleCanvas motion />
      </div>

      {/* Link destination: project.demo || project.code. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a
        className="project-preview-link"
        href={project.demo || project.code}
        target="_blank"
        rel="noreferrer"
        aria-label={`${project.demo ? "Open live" : "View source for"} ${project.title}`}
      >
        {/* Image: src selects asset, alt provides text replacement, loading/decoding tune fetching/rendering. Preserve original brand proportions. */}<img
          className="project-preview-image"
          src={previews[active]}
          alt={`${project.title} live website preview`}
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        {/* Render span with styling hook project-preview-overlay. Change its content binding for copy, classes/CSS for layout. */}<span className="project-preview-overlay">
          {/* Render span for this content group. Change its content binding for copy, classes/CSS for layout. */}<span>{project.demo ? "Open live site" : "View source"}</span>
          {/* Render span for this content group. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<span aria-hidden="true">↗</span>
        </span>
        {previews.length === 1 && /* Render span with styling hook project-preview-depth-label. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */ <span className="project-preview-depth-label" aria-hidden="true">SHIVAM / 3D WORKSPACE</span>}
      </a>

      {previews.length > 1 && (
        <>
          {/* Interactive control: handler changes state; keep type, accessible name, disabled and pressed/expanded attributes aligned with behavior. */}<button className="project-preview-pause" type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} disabled={reducedMotion}>
            {reducedMotion ? "Motion off" : paused ? "Play previews" : "Pause previews"}
          </button>
          {/* Interactive control: handler changes state; keep type, accessible name, disabled and pressed/expanded attributes aligned with behavior. */}<button
            type="button"
            className="project-preview-arrow project-preview-prev"
            onClick={() => move(-1)}
            aria-label="Previous project preview"
          >
            ←
          </button>
          {/* Interactive control: handler changes state; keep type, accessible name, disabled and pressed/expanded attributes aligned with behavior. */}<button
            type="button"
            className="project-preview-arrow project-preview-next"
            onClick={() => move(1)}
            aria-label="Next project preview"
          >
            →
          </button>
          {/* Render div with styling hook project-preview-dots. Change its content binding for copy, classes/CSS for layout. */}<div className="project-preview-dots" aria-label="Project preview selector">
            {previews.map((_, index) => (
              /* Interactive control: handler changes state; keep type, accessible name, disabled and pressed/expanded attributes aligned with behavior. */
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

      {/* Render span with styling hook project-preview-status. Change its content binding for copy, classes/CSS for layout. */}<span className="project-preview-status">
        {previews.length > 1 ? `${String(active + 1).padStart(2, "0")} / ${String(previews.length).padStart(2, "0")}` : "LIVE PREVIEW"}
      </span>
    </div>
  );
}

/* Gallery uses local PROJECTS through useApp. Array order controls display; the order property does not sort it. Preview rotation is 4500ms and stops when paused, offscreen, or reduced motion is enabled. CSS variables drive pointer tilt. */
export default function Projects() {
  /* Project collection; frontend uses local PROJECTS, while server/seed data is a separate MongoDB source. */
  const { projects, loading, error } = useApp();
  /* Read gallery headings/lede from PORTFOLIO_CONFIG. */
  const { work } = PORTFOLIO_CONFIG;

  return (
    /* Page section anchored by work; update navigation destinations if renaming the ID. */
    <section id="work" className="section-shell section-block">
      {/* Render div with styling hook section-heading. Change its content binding for copy, classes/CSS for layout. */}<div className="section-heading">
        {/* Render p with styling hook sec-num. Change its content binding for copy, classes/CSS for layout. */}<p className="sec-num">{work.sectionNumber}</p>
        {/* Render div for this content group. Change its content binding for copy, classes/CSS for layout. */}<div>
          {/* Render div with styling hook section-meta. Change its content binding for copy, classes/CSS for layout. */}<div className="section-meta"><span>{projects.length} projects</span><span>01—{String(projects.length).padStart(2, "0")}</span></div>
          {/* Level-2 heading; edit referenced text/data without breaking heading hierarchy. */}<h2 className="section-title">{work.title} <em>{work.titleEmphasis}</em></h2>
          {/* Render p with styling hook section-lede. Change its content binding for copy, classes/CSS for layout. */}<p className="section-lede">
            {work.lede}
          </p>
        </div>
      </div>

      {/* Render div with styling hook project-list. Change its content binding for copy, classes/CSS for layout. */}<div className="project-list">
        {loading
          ? [1, 2, 3].map((item) => /* Render Skeleton; edit its imported component for behavior instead of duplicating it here. */ <Skeleton key={item} />)
          : projects.map((project, index) => (
              /* Independent record/card; data supplies content and classes select presentation. */
              <article
                key={project._id || project.slug}
                className="project-card project-card-featured"
                style={{ /* Stagger project entrances by 120ms per list index; match the CSS animation custom-property name. */ "--delay": `${index * 120}ms` }}
              >
                {/* Render div with styling hook project-index. Change its content binding for copy, classes/CSS for layout. */}<div className="project-index">0{index + 1}</div>

                {/* Render div with styling hook project-content. Change its content binding for copy, classes/CSS for layout. */}<div className="project-content">
                  {/* Render div with styling hook project-heading-row. Change its content binding for copy, classes/CSS for layout. */}<div className="project-heading-row">
                    {/* Render span with styling hook project-tag. Change its content binding for copy, classes/CSS for layout. */}<span className="project-tag">{project.tag}</span>
                    {/* Render span with styling hook project-type. Change its content binding for copy, classes/CSS for layout. */}<span className="project-type">{project.demo ? "Live project" : "Open source"}</span>
                  </div>

                  {/* Level-3 heading; edit referenced text/data without breaking heading hierarchy. */}<h3>{project.title}</h3>
                  {/* Render p with styling hook project-summary. Change its content binding for copy, classes/CSS for layout. */}<p className="project-summary">{project.summary}</p>
                  {/* Render p with styling hook project-detail. Change its content binding for copy, classes/CSS for layout. */}<p className="project-detail">{project.detail}</p>

                  {/* Render div with styling hook project-stack. Change its content binding for copy, classes/CSS for layout. */}<div className="project-stack">
                    {project.stack.map((item) => (
                      /* Render span with styling hook tag. Change its content binding for copy, classes/CSS for layout. */
                      <span className="tag" key={item.name}>
                        {/* General logo: name selects registry entry, label names it/provides fallback initials, size sets its slot. */}<Logo name={item.name} label={item.label} size={15} />
                        {item.label}
                      </span>
                    ))}
                  </div>

                  {/* Render div with styling hook project-links. Change its content binding for copy, classes/CSS for layout. */}<div className="project-links">
                    {project.demo ? (
                      /* Link destination: project.demo. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */
                      <a className="project-primary-link" href={project.demo} target="_blank" rel="noreferrer">
                        Visit live site ↗
                      </a>
                    ) : null}
                    {/* Link destination: project.code. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a className="u-link" href={project.code} target="_blank" rel="noreferrer">
                      View source ↗
                    </a>
                  </div>
                </div>

                {/* Render ProjectPreview; edit its imported component for behavior instead of duplicating it here. */}<ProjectPreview project={project} />
              </article>
            ))}
      </div>

      {!loading && !projects.length && (
        /* Render div with styling hook border border-rust/30 bg-paper p-6 text-sm. Change its content binding for copy, classes/CSS for layout. */
        <div className="border border-rust/30 bg-paper p-6 text-sm">
          {error || "No projects are available yet. Run the server seed command."}
        </div>
      )}
    </section>
  );
}
