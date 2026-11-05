import { useState, type ChangeEvent, type FormEvent } from "react";
import { Github, Globe, Linkedin, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { profile } from "@/lib/portfolio-data";

// EmailJS public identifiers (carried over from the original portfolio).
const EMAILJS = {
  serviceId: "service_275epwa",
  templateId: "template_q73xy6v",
  publicKey: "KlXpR4FVRw6ql64i0",
};

const fieldClass =
  "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.serviceId,
          template_id: EMAILJS.templateId,
          user_id: EMAILJS.publicKey,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
            to_email: profile.email,
          },
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setState("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setState("error");
    }
  };

  const links = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: profile.phoneHref },
    { icon: Linkedin, label: "linkedin / mahendra-reddy-rv", href: profile.linkedin },
    { icon: Github, label: "github / Mahi044", href: profile.github },
    { icon: Globe, label: "mahendrareddyrv.vercel.app", href: profile.website },
  ];

  return (
    <section id="contact" className="relative border-t border-border bg-surface/40 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          kicker="contact"
          title="Let's build reliable pipelines."
          intro="Hiring for a data engineering role, or have a data problem to talk through? My inbox is open."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <ul className="space-y-3">
            {links.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-primary/50"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-sm text-foreground/90 group-hover:text-primary">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            <p className="font-mono text-xs text-muted-foreground">
              <span className="text-primary">$</span> send_message --to mahendra
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-xs text-muted-foreground">name</span>
                <input name="name" required value={form.name} onChange={onChange} placeholder="Your name" className={fieldClass} />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-xs text-muted-foreground">email</span>
                <input type="email" name="email" required value={form.email} onChange={onChange} placeholder="you@company.com" className={fieldClass} />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block font-mono text-xs text-muted-foreground">subject</span>
              <input name="subject" required value={form.subject} onChange={onChange} placeholder="Data Engineer role" className={fieldClass} />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-xs text-muted-foreground">message</span>
              <textarea name="message" required rows={5} value={form.message} onChange={onChange} placeholder="Tell me about the role or project…" className={`${fieldClass} resize-none`} />
            </label>

            {state === "success" && (
              <p className="rounded-lg border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">
                Message delivered. Mahendra will get back to you soon.
              </p>
            )}
            {state === "error" && (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                Couldn't send right now — please email {profile.email} directly.
              </p>
            )}

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={state === "sending"}>
              {state === "sending" ? "Sending…" : (<>Send message <Send /></>)}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 font-mono text-xs text-muted-foreground sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>
          built with <span className="text-bronze">bronze</span> ·{" "}
          <span className="text-silver">silver</span> · <span className="text-gold">gold</span>
        </span>
      </div>
    </footer>
  );
}
