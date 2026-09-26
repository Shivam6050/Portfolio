/**
 * Controlled contact form posts to /api/messages and shows toast feedback. The backend stores MongoDB messages; it does not send email. Change field names/limits in initialForm, inputs, messageController, Message schema, and tests together. Failures preserve the draft.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* React hooks/components used below; hooks must stay at the top level of components/custom hooks. */
import { useState } from "react";
/* Import PROFILE, PORTFOLIO_CONFIG from ../../data/constants.js; edit that module for the shared implementation. */
import { PROFILE, PORTFOLIO_CONFIG } from "../../data/constants.js";
/* Import api from ../../api/client.js; edit that module for the shared implementation. */
import { api } from "../../api/client.js";
/* Import useApp from ../../context/AppContext.jsx; edit that module for the shared implementation. */
import { useApp } from "../../context/AppContext.jsx";
/* Import Logo from ../ui/Logo.jsx; edit that module for the shared implementation. */
import Logo from "../ui/Logo.jsx";
/* Lazy scene boundary, aliased here by its visual role; preserve this import to keep viewport-based loading. */
import AuraParticleCanvas from "../ui/DeferredScene.jsx";

/* Empty field shape reused for initialization and successful reset; keep form names synchronized. */
const initialForm = { name: "", email: "", message: "" };

/* Controlled contact form posts to /api/messages and shows toast feedback. The backend stores MongoDB messages; it does not send email. Change field names/limits in initialForm, inputs, messageController, Message schema, and tests together. Failures preserve the draft. */
export default function Contact() {
  /* Read contact-section headings/lede from PORTFOLIO_CONFIG. */
  const { contact } = PORTFOLIO_CONFIG;
  /* Stable notification callback; expiry is configured as 3800ms in AppContext. */
  const { toast } = useApp();
  /* Controlled form values; copy rather than mutate when editing a field. */
  const [form, setForm] = useState(initialForm);
  /* Busy flag prevents repeat submission and controls the disabled send button. */
  const [sending, setSending] = useState(false);

  /* Copy the input value into the matching form key; keep input name attributes and initialForm keys aligned. */
  const update = (event) => {
    /* Read the changed input name and text; name must match a key in the controlled form object. */
    const { name, value } = event.target;
    /* Copy current form values and replace the field selected by the input name. */
    setForm((current) => ({ ...current, [name]: value }));
  };

  /* Prevent native navigation, reject invalid fields, await confirmed storage, then reset only on success. finally always clears the busy flag. */
  const submit = async (event) => {
    /* Stop native form navigation; this async handler manages submission and feedback. */
    event.preventDefault();
    /* Guard: sending. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (sending) return;

    /* Guard: !form.name.trim(). Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!form.name.trim()) return toast("Please enter your name.", "error");
    /* Guard: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()). Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      /* Queue visitor feedback; edit text here and expiry timing in AppContext. */
      return toast("Please enter a valid email.", "error");
    }
    /* Guard: form.message.trim().length < 10. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (form.message.trim().length < 10) {
      /* Queue visitor feedback; edit text here and expiry timing in AppContext. */
      return toast("Message must be at least 10 characters.", "error");
    }

    /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
    try {
      /* Enter busy state before awaiting the request; the submit button becomes disabled. */
      setSending(true);
      /* Await confirmed message storage before clearing inputs or reporting success. */
      await api.sendMessage(form);
      /* Clear inputs only after server-confirmed success; failures leave the draft intact. */
      setForm(initialForm);
      /* Queue visitor feedback; edit text here and expiry timing in AppContext. */
      toast("Message sent — I’ll get back to you soon.");
    } /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch (error) {
      /* Queue visitor feedback; edit text here and expiry timing in AppContext. */
      toast(error.message || "Could not send your message.", "error");
    } finally {
      /* Leave busy state after success or failure so the visitor can try again. */
      setSending(false);
    }
  };

  return (
    /* Page section anchored by contact; update navigation destinations if renaming the ID. */
    <section id="contact" className="section-shell section-block contact-section">
      {/* Render div with styling hook contact-grid. Change its content binding for copy, classes/CSS for layout. */}<div className="contact-grid">
        {/* Render div for this content group. Change its content binding for copy, classes/CSS for layout. */}<div>
          {/* Render p with styling hook sec-num. Change its content binding for copy, classes/CSS for layout. */}<p className="sec-num">{contact.sectionNumber}</p>
          {/* Level-2 heading; edit referenced text/data without breaking heading hierarchy. */}<h2 className="section-title mt-5">{contact.title} <em>{contact.titleEmphasis}</em></h2>
          {/* Render p with styling hook mt-6 max-w-lg leading-7 text-muted. Change its content binding for copy, classes/CSS for layout. */}<p className="mt-6 max-w-lg leading-7 text-muted">
            {contact.lede}
          </p>

          {/* Render div with styling hook contact-details. Change its content binding for copy, classes/CSS for layout. */}<div className="contact-details">
            {/* Link destination: `mailto:${PROFILE.email}`. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a className="u-link" href={`mailto:${PROFILE.email}`}>
              {/* General logo: name selects registry entry, label names it/provides fallback initials, size sets its slot. */}<Logo name="gmail" label="Gmail" size={18} /> {PROFILE.email}
            </a>
            {/* Link destination: `tel:${PROFILE.phone.replace(/[^+\d]/g, "")}`. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a className="flex items-center gap-3 w-fit u-link" href={`tel:${PROFILE.phone.replace(/[^+\d]/g, "")}`}>
              {/* Render span with styling hook contact-icon flex h-[18px] w-[18px] items-center justify-center. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<span className="contact-icon flex h-[18px] w-[18px] items-center justify-center" aria-hidden="true">
                {/* Inline vector: viewBox sets coordinates; retain role/label for meaningful artwork or aria-hidden for decoration. */}<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {/* SVG shape coordinates use parent viewBox units; edit the path to change the illustration/flourish. */}<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              {PROFILE.phone}
            </a>
            {/* Link destination: PROFILE.linkedin. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a className="flex items-center gap-3 w-fit u-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              {/* General logo: name selects registry entry, label names it/provides fallback initials, size sets its slot. */}<Logo name="linkedin" label="LinkedIn" size={18} /> LinkedIn
            </a>
            {/* Link destination: PROFILE.github. Edit that source/PROFILE value for navigation; preserve accessible labels and external-link attributes. */}<a className="flex items-center gap-3 w-fit u-link" href={PROFILE.github} target="_blank" rel="noreferrer">
              {/* General logo: name selects registry entry, label names it/provides fallback initials, size sets its slot. */}<Logo name="github" label="GitHub" size={18} /> GitHub
            </a>
          </div>
        </div>

        {/* Render div with styling hook contact-panel-stage. Change its content binding for copy, classes/CSS for layout. */}<div className="contact-panel-stage">
          {/* Render div with styling hook contact-particle-field. Change its content binding for copy, classes/CSS for layout. Decorative: omitted from the accessibility tree. */}<div className="contact-particle-field" aria-hidden="true">
            {/* Shared particle decoration. Sections alias DeferredScene by this name; speedMultiplier/spreadMultiplier tune the effect. */}<AuraParticleCanvas motion />
          </div>
          {/* Render div with styling hook contact-panel contact-panel-3d. Change its content binding for copy, classes/CSS for layout. */}<div className="contact-panel contact-panel-3d">
          {/* Render div with styling hook contact-form-surface. Change its content binding for copy, classes/CSS for layout. */}<div className="contact-form-surface"><div className="form-header"><span>LET’S START A CONVERSATION</span><span className="form-status"><i /> OPEN INBOX</span></div><form onSubmit={submit}>
          {/* Render div with styling hook grid gap-6 sm:grid-cols-2. Change its content binding for copy, classes/CSS for layout. */}<div className="grid gap-6 sm:grid-cols-2">
            {/* Label wraps its field for accessible naming and click-to-focus; preserve this association. */}<label className="form-label">
              Name
              {/* Controlled name field: name selects the state key, value/onChange sync input, required/type/length constrain browser entry. Align server limits when editing. */}<input className="form-input" name="name" required autoComplete="name" value={form.name} onChange={update} maxLength={80} placeholder="Your name" />
            </label>
            {/* Label wraps its field for accessible naming and click-to-focus; preserve this association. */}<label className="form-label">
              Email
              {/* Controlled email field: name selects the state key, value/onChange sync input, required/type/length constrain browser entry. Align server limits when editing. */}<input className="form-input" name="email" required autoComplete="email" type="email" value={form.email} onChange={update} maxLength={160} placeholder="you@example.com" />
            </label>
          </div>
          {/* Label wraps its field for accessible naming and click-to-focus; preserve this association. */}<label className="form-label mt-6">
            Message
            {/* Controlled message field: name selects the state key, value/onChange sync input, required/type/length constrain browser entry. Align server limits when editing. */}<textarea className="form-input min-h-44 resize-y" name="message" required value={form.message} onChange={update} minLength={10} maxLength={3000} placeholder="Tell me what you're building..." />
          </label>
          {/* Render div with styling hook mt-6 flex items-center justify-between gap-4. Change its content binding for copy, classes/CSS for layout. */}<div className="mt-6 flex items-center justify-between gap-4">
            {/* Render span with styling hook font-mono text-[9px] uppercase tracking-widest text-muted. Change its content binding for copy, classes/CSS for layout. */}<span className="font-mono text-[9px] uppercase tracking-widest text-muted">
              {form.message.length}/3000
            </span>
            {/* Interactive control: handler changes state; keep type, accessible name, disabled and pressed/expanded attributes aligned with behavior. */}<button className="btn-ink" type="submit" disabled={sending}>
              {sending ? "Sending…" : "Send message ↗"}
            </button>
          </div>
        </form></div>
          </div>
        </div>
      </div>
    </section>
  );
}
