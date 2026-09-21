import { useState } from "react";
import { PROFILE } from "../../data/constants.js";
import { api } from "../../api/client.js";
import { useApp } from "../../context/AppContext.jsx";
import Logo from "../ui/Logo.jsx";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const { toast } = useApp();
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
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
          <p className="sec-num">04 / contact</p>
          <h2 className="section-title mt-5">Let&apos;s make something <em>useful.</em></h2>
          <p className="mt-6 max-w-lg leading-7 text-muted">
            Have a product, backend problem or AI workflow in mind? Send a note and let&apos;s start there.
          </p>

          <div className="mt-10 space-y-4 font-mono text-xs">
            <a className="flex items-center gap-3 w-fit u-link" href={`mailto:${PROFILE.email}`}>
              <Logo name="google" label="Email" size={18} /> {PROFILE.email}
            </a>
            <a className="flex items-center gap-3 w-fit u-link" href={`tel:${PROFILE.phone.replace(/[^+\d]/g, "")}`}>
              <span className="flex h-[18px] w-[18px] items-center justify-center border border-ink/30 text-[9px]">☎</span>
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

        <div className="form-header"><span>CONTACT / 01</span><span>REPLY VIA EMAIL</span></div><form onSubmit={submit} className="contact-panel">
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
        </form>
      </div>
    </section>
  );
}
