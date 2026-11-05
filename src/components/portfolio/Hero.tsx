import { ArrowDownRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PipelineAnimation } from "./PipelineAnimation";
import { marquee, profile } from "@/lib/portfolio-data";
import resume from "@/assets/resume.pdf.asset.json";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-x opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-glow" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Left: name + intro */}
        <div className="min-w-0 animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 font-mono text-[11px] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-success" />
            open to entry-level data engineer roles
          </div>

          <p className="mt-8 font-mono text-sm text-primary">// hello, world — I'm</p>
          <h1 className="mt-3 font-display text-[2.6rem] font-extrabold leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl">
            <span className="block text-foreground">{profile.firstName}</span>
            <span className="block text-gradient-name">{profile.lastName}</span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              {profile.role}
            </span>
            <span className="h-1.5 w-16 rounded-full bg-medallion" />
            <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {profile.location}
            </span>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I turn raw, messy data into{" "}
            <span className="text-foreground">reliable, analytics-ready tables</span> — streaming
            and batch pipelines on Spark, Databricks, Delta Lake, Snowflake and Airflow.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="hero" size="xl" asChild>
              <a href="#projects">
                View pipelines <ArrowDownRight />
              </a>
            </Button>
            <Button variant="terminal" size="xl" asChild>
              <a href={resume.url} download="Mahendra-Reddy-RV-Resume.pdf">
                <Download /> Download resume
              </a>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {[
              { href: profile.github, icon: Github, label: "GitHub" },
              { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Right corner: animated pipeline */}
        <div className="relative min-w-0 animate-rise [animation-delay:200ms]">
          <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-glow blur-2xl" />
          <PipelineAnimation />
        </div>
      </div>

      {/* Tech marquee */}
      <div className="relative mt-20 border-y border-border bg-surface/40 py-4 mask-fade-x">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-sm text-muted-foreground">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              {m}
              <span className="text-primary">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
