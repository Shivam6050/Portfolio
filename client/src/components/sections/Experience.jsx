/**
 * Maps PROFILE experience, education, training, and activities into sections. The first education period supplies the heading start year; the end is the current year. Move orbitals using .experience-3d-layer CSS, not the text layout.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import PROFILE, PORTFOLIO_CONFIG from ../../data/constants.js; edit that module for the shared implementation. */
import { PROFILE, PORTFOLIO_CONFIG } from "../../data/constants.js";
/* Import Logo from ../ui/Logo.jsx; edit that module for the shared implementation. */
import Logo from "../ui/Logo.jsx";
/* Lazy scene boundary, aliased here by its visual role; preserve this import to keep viewport-based loading. */
import ExperienceThreeScene from "../ui/DeferredScene.jsx";

/* Maps PROFILE experience, education, training, and activities into sections. The first education period supplies the heading start year; the end is the current year. Move orbitals using .experience-3d-layer CSS, not the text layout. */
export default function Experience() {
  /* Read background-section headings/lede from PORTFOLIO_CONFIG. */
  const { background } = PORTFOLIO_CONFIG;
  /* Calendar year at render time; the section start year comes from education data. */
  const currentYear = new Date().getFullYear();
  return (
    /* Page section anchored by experience; update navigation destinations if renaming the ID. */
    <section id="experience" className="section-block experience-section">
      {/* Render div with styling hook experience-3d-layer. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<div className="experience-3d-layer" aria-hidden="true">
        {/* Deferred career decoration; kind selects experience, while CSS positions its layer. */}<ExperienceThreeScene kind="experience" />
      </div>
      {/* Render div with styling hook experience-inner. Change its content binding for copy, classes/CSS for layout. */}<div className="experience-inner">
      {/* Render div with styling hook section-heading. Change its content binding for copy, classes/CSS for layout. */}<div className="section-heading">
        {/* Render p with styling hook sec-num. Change its content binding for copy, classes/CSS for layout. */}<p className="sec-num">{background.sectionNumber}</p>

        {/* Render div for this content group. Change its content binding for copy, classes/CSS for layout. */}<div>
          {/* Render div with styling hook section-meta. Change its content binding for copy, classes/CSS for layout. */}<div className="section-meta"><span>{background.meta}</span><span>{PROFILE.education[0]?.period?.match(/\d{4}/)?.[0] || ""}—{currentYear}</span></div><h2 className="section-title">{background.title} <em>{background.titleEmphasis}</em></h2>
          {/* Render p with styling hook section-lede. Change its content binding for copy, classes/CSS for layout. */}<p className="section-lede">
            {background.lede}
          </p>

          {/* Render div with styling hook mt-12. Change its content binding for copy, classes/CSS for layout. */}<div className="mt-12">
            {/* Render div with styling hook mb-5 flex items-center justify-between border-b border-ink/15 pb-3. Change its content binding for copy, classes/CSS for layout. */}<div className="mb-5 flex items-center justify-between border-b border-ink/15 pb-3">
              {/* Level-3 heading; edit referenced text/data without breaking heading hierarchy. */}<h3 className="font-mono text-[11px] uppercase tracking-[.18em] text-muted">Experience</h3>
              {/* Render span with styling hook font-mono text-[11px] uppercase tracking-widest text-muted. Change its content binding for copy, classes/CSS for layout. */}<span className="font-mono text-[11px] uppercase tracking-widest text-muted">{String(PROFILE.experience.length).padStart(2, "0")}</span>
            </div>

            {/* Render div with styling hook space-y-10. Change its content binding for copy, classes/CSS for layout. */}<div className="space-y-10">
              {PROFILE.experience.map((item) => (
                /* Independent record/card; data supplies content and classes select presentation. */
                <article key={item.company} className="grid gap-5 lg:grid-cols-[190px_1fr]">
                  {/* Render div for this content group. Change its content binding for copy, classes/CSS for layout. */}<div>
                    {/* Render div with styling hook flex items-center gap-3. Change its content binding for copy, classes/CSS for layout. */}<div className="flex items-center gap-3">
                      {/* General logo: name selects registry entry, label names it/provides fallback initials, size sets its slot. */}<Logo name={item.logo} label={item.company} size={34} className="border border-ink/10 bg-cream p-1" />
                      {/* Render p with styling hook font-serif text-2xl italic. Change its content binding for copy, classes/CSS for layout. */}<p className="font-serif text-2xl italic">{item.company}</p>
                    </div>
                    {/* Render p with styling hook mt-1 font-mono text-[11px] uppercase tracking-widest text-muted. Change its content binding for copy, classes/CSS for layout. */}<p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">{item.period}</p>
                    {/* Render p with styling hook mt-3 text-sm font-medium. Change its content binding for copy, classes/CSS for layout. */}<p className="mt-3 text-sm font-medium">{item.role}</p>
                    {/* Render div with styling hook mt-2 flex flex-wrap gap-2. Change its content binding for copy, classes/CSS for layout. */}<div className="mt-2 flex flex-wrap gap-2">
                      {item.stack.map(([name, label]) => (
                        /* Render span with styling hook inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-. Change its content binding for copy, classes/CSS for layout. */
                        <span key={name} className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                          {/* General logo: name selects registry entry, label names it/provides fallback initials, size sets its slot. */}<Logo name={name} label={label} size={13} />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Semantic list container; use stable keys for mapped entries. */}<ul className="space-y-3 text-sm leading-6 text-muted">
                    {item.points.map((point) => (
                      /* Semantic list item; use stable keys for mapped entries. */
                      <li key={point} className="border-l border-ink/15 pl-4">{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          {/* Render div with styling hook mt-16 grid gap-12 lg:grid-cols-2. Change its content binding for copy, classes/CSS for layout. */}<div className="mt-16 grid gap-12 lg:grid-cols-2">
            {/* Render div for this content group. Change its content binding for copy, classes/CSS for layout. */}<div>
              {/* Render div with styling hook mb-5 flex items-center justify-between border-b border-ink/15 pb-3. Change its content binding for copy, classes/CSS for layout. */}<div className="mb-5 flex items-center justify-between border-b border-ink/15 pb-3">
                {/* Level-3 heading; edit referenced text/data without breaking heading hierarchy. */}<h3 className="font-mono text-[11px] uppercase tracking-[.18em] text-muted">Education</h3>
                {/* Render span with styling hook font-mono text-[11px] uppercase tracking-widest text-muted. Change its content binding for copy, classes/CSS for layout. */}<span className="font-mono text-[11px] uppercase tracking-widest text-muted">{String(PROFILE.education.length).padStart(2, "0")}</span>
              </div>

              {/* Render div with styling hook space-y-6. Change its content binding for copy, classes/CSS for layout. */}<div className="space-y-6">
                {PROFILE.education.map((item) => (
                  /* Independent record/card; data supplies content and classes select presentation. */
                  <article key={item.degree} className="border-l-2 border-rust pl-4">
                    {/* Render div with styling hook flex items-center gap-3. Change its content binding for copy, classes/CSS for layout. */}<div className="flex items-center gap-3">
                      {/* General logo: name selects registry entry, label names it/provides fallback initials, size sets its slot. */}<Logo name={item.logo} label={item.institution} size={52} className="border border-ink/10 bg-cream p-1.5" />
                      {/* Render p with styling hook font-serif text-xl italic. Change its content binding for copy, classes/CSS for layout. */}<p className="font-serif text-xl italic">{item.institution}</p>
                    </div>
                    {/* Render p with styling hook mt-1 text-sm. Change its content binding for copy, classes/CSS for layout. */}<p className="mt-1 text-sm">{item.degree}</p>
                    {/* Render p with styling hook mt-1 font-mono text-[11px] uppercase tracking-widest text-muted. Change its content binding for copy, classes/CSS for layout. */}<p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                      {[item.period, item.result].filter(Boolean).join(" · ")}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Render div for this content group. Change its content binding for copy, classes/CSS for layout. */}<div>
              {/* Render div with styling hook mb-5 flex items-center justify-between border-b border-ink/15 pb-3. Change its content binding for copy, classes/CSS for layout. */}<div className="mb-5 flex items-center justify-between border-b border-ink/15 pb-3">
                {/* Level-3 heading; edit referenced text/data without breaking heading hierarchy. */}<h3 className="font-mono text-[11px] uppercase tracking-[.18em] text-muted">Certifications &amp; training</h3>
                {/* Render span with styling hook font-mono text-[11px] uppercase tracking-widest text-muted. Change its content binding for copy, classes/CSS for layout. */}<span className="font-mono text-[11px] uppercase tracking-widest text-muted">{String(PROFILE.certifications.length).padStart(2, "0")}</span>
              </div>

              {/* Render div with styling hook space-y-6. Change its content binding for copy, classes/CSS for layout. */}<div className="space-y-6">
                {PROFILE.certifications.map((item) => (
                  /* Independent record/card; data supplies content and classes select presentation. */
                  <article key={item.issuer} className="border border-ink/10 bg-cream p-5">
                    {/* Render div with styling hook flex items-center gap-3. Change its content binding for copy, classes/CSS for layout. */}<div className="flex items-center gap-3">
                      {/* General logo: name selects registry entry, label names it/provides fallback initials, size sets its slot. */}<Logo name={item.logo} label={item.issuer} size={30} className="border border-ink/10 bg-cream p-1" />
                      {/* Render p with styling hook font-mono text-[11px] uppercase tracking-widest text-rust. Change its content binding for copy, classes/CSS for layout. */}<p className="font-mono text-[11px] uppercase tracking-widest text-rust">{item.issuer}</p>
                    </div>
                    {/* Level-4 heading; edit referenced text/data without breaking heading hierarchy. */}<h4 className="mt-2 font-serif text-2xl italic">{item.title}</h4>
                    {/* Render p with styling hook mt-3 text-sm leading-6 text-muted. Change its content binding for copy, classes/CSS for layout. */}<p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Render div with styling hook mt-14 border-t border-ink/15 pt-6. Change its content binding for copy, classes/CSS for layout. */}<div className="mt-14 border-t border-ink/15 pt-6">
            {/* Render p with styling hook max-w-3xl text-sm leading-6 text-muted. Change its content binding for copy, classes/CSS for layout. */}<p className="max-w-3xl text-sm leading-6 text-muted">
              {PROFILE.additionalActivities.join(" ")}
            </p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
