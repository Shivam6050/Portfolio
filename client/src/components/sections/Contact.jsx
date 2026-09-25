import { useState } from "react";
import { PROFILE, PORTFOLIO_CONFIG } from "../../data/constants.js";
import { api } from "../../api/client.js";
import { useApp } from "../../context/AppContext.jsx";
import Logo from "../ui/Logo.jsx";
import AuraParticleCanvas from "../ui/AuraParticleCanvas.jsx";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const { contact } = PORTFOLIO_CONFIG;
  const { toast } = useApp();
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handlePointerMove = (event) => {
    const surface = event.currentTarget;
    const rect = surface.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    surface.style.setProperty("--contact-mx", `${x}%`);
    surface.style.setProperty("--contact-my", `${y}%`);
    surface.style.setProperty("--contact-rx", `${((50 - y) * 0.035).toFixed(2)}deg`);
    surface.style.setProperty("--contact-ry", `${((x - 50) * 0.045).toFixed(2)}deg`);
  };

  const resetTilt = (event) => {
    const surface = event.currentTarget;
    surface.style.setProperty("--contact-mx", "50%");
    surface.style.setProperty("--contact-my", "50%");
    surface.style.setProperty("--contact-rx", "0deg");
    surface.style.setProperty("--contact-ry", "0deg");
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) return toast("Please enter your name.", "error");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return toast("Please enter a valid email.", "error");
    }
    if (form.message.trim().length < 10) {
      return toast("Message must be at least 10 characters.", "error");
    }

    try {
      setSending(true);
      await api.sendMessage(form);
      setForm(initialForm);
      toast("Message sent — I’ll get back to you soon.");
    } catch (error) {
      toast(error.message || "Could not send your message.", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-shell section-block contact-section">
      <div className="contact-grid">
        <div>
          <p className="sec-num">{contact.sectionNumber}</p>
          <h2 className="section-title mt-5">{contact.title} <em>{contact.titleEmphasis}</em></h2>
          <p className="mt-6 max-w-lg leading-7 text-muted">
            {contact.lede}
          </p>

          <div className="contact-details">
            <a className="u-link" href={`mailto:${PROFILE.email}`}>
              <Logo name="gmail" label="Gmail" size={18} /> {PROFILE.email}
            </a>
            <a className="flex items-center gap-3 w-fit u-link" href={`tel:${PROFILE.phone.replace(/[^+\d]/g, "")}`}>
              <span className="contact-icon flex h-[18px] w-[18px] items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              {PROFILE.phone}
            </a>
            <a className="flex items-center gap-3 w-fit u-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              <Logo name="linkedin" label="LinkedIn" size={18} /> LinkedIn
            </a>
            <a className="flex items-center gap-3 w-fit u-link" href={PROFILE.github} target="_blank" rel="noreferrer">
              <Logo name="github" label="GitHub" size={18} /> GitHub
            </a>
          </div>
        </div>

        <div className="contact-panel contact-panel-3d" onPointerMove={handlePointerMove} onPointerLeave={resetTilt} style={{ "--contact-mx": "50%", "--contact-my": "50%", "--contact-rx": "0deg", "--contact-ry": "0deg" }}>
          <span className="contact-depth-grid" aria-hidden="true" />
          <span className="contact-depth-orbit contact-depth-orbit-a" aria-hidden="true" />
          <span className="contact-depth-orbit contact-depth-orbit-b" aria-hidden="true" />
          <span className="contact-depth-glow" aria-hidden="true" />
          <span className="contact-depth-corner contact-depth-corner-tl" aria-hidden="true" />
          <span className="contact-depth-corner contact-depth-corner-br" aria-hidden="true" />
          <div className="contact-particle-canvas" aria-hidden="true"><AuraParticleCanvas motion speedMultiplier={0.55} spreadMultiplier={1.8} /></div>
          <div className="contact-form-surface"><div className="form-header"><span>CONTACT / 01</span><span>REPLY VIA EMAIL</span></div><form onSubmit={submit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="form-label">
              Name
              <input className="form-input" name="name" value={form.name} onChange={update} maxLength={80} placeholder="Your name" />
            </label>
            <label className="form-label">
              Email
              <input className="form-input" name="email" type="email" value={form.email} onChange={update} maxLength={160} placeholder="you@example.com" />
            </label>
          </div>
          <label className="form-label mt-6">
            Message
            <textarea className="form-input min-h-44 resize-y" name="message" value={form.message} onChange={update} minLength={10} maxLength={3000} placeholder="Tell me what you're building..." />
          </label>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
              {form.message.length}/3000
            </span>
            <button className="btn-ink" type="submit" disabled={sending}>
              {sending ? "Sending…" : "Send message ↗"}
            </button>
          </div>
        </form></div>
        </div>
      </div>
    </section>
  );
}
