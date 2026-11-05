import { ArrowRight, Github, GraduationCap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { education, profile, projects, skillGroups, stats } from "@/lib/portfolio-data";

const flowTone = (step: string) => {
  const s = step.toLowerCase();
  if (s === "bronze") return "border-bronze/50 text-bronze";
  if (s === "silver") return "border-silver/50 text-silver";
  if (s === "gold") return "border-gold/50 text-gold";
  return "border-primary/40 text-primary";
};

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="01" kicker="about" title="Raw data in. Trusted insight out." />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-foreground/90">{profile.summary}</p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              I know ETL/ELT workflows, Medallion Architecture, batch and stream processing, and
              data warehousing. {profile.seeking}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-card p-5">
                  <div className="font-display text-3xl font-bold text-foreground">{s.value}</div>
                  <div className="mt-1 font-mono text-[11px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <p className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-primary" /> education
            </p>
            <ol className="relative space-y-8 border-l border-border pl-8">
              {education.map((e) => (
                <li key={e.title} className="relative">
                  <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  <p className="font-mono text-xs text-primary">{e.period}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                    {e.title}
                  </h3>
                  <p className="text-sm text-foreground/80">{e.place}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{e.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative border-t border-border bg-surface/40 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          kicker="projects"
          title="Pipelines I've built"
          intro="End-to-end data engineering projects — from ingestion to business-ready Gold tables."
        />

        <div className="space-y-8">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary/40 sm:p-10"
            >
              <span className="pointer-events-none absolute -bottom-12 -right-4 font-display text-[10rem] font-extrabold leading-none text-foreground/[0.04]">
                {p.index}
              </span>

              <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr]">
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-primary">{p.index}</span>
                    <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                      {p.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-lg text-muted-foreground">{p.tagline}</p>

                  {/* Mini architecture flow */}
                  <div className="mt-8 flex flex-wrap items-center gap-2">
                    {p.flow.map((step, i) => (
                      <span key={step} className="flex items-center gap-2">
                        <span
                          className={`rounded-md border bg-background/60 px-3 py-1.5 font-mono text-xs ${flowTone(step)}`}
                        >
                          {step}
                        </span>
                        {i < p.flow.length - 1 && (
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </span>
                    ))}
                  </div>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
                  >
                    <Github className="h-4 w-4" /> view on GitHub
                  </a>
                </div>

                <div>
                  <ul className="space-y-4">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-foreground/85">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-secondary px-3 py-1 font-mono text-[11px] text-secondary-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const layerTone = ["bg-primary", "bg-bronze", "bg-silver", "bg-gold", "bg-primary", "bg-success"];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          kicker="skills"
          title="The stack"
          intro="Tools and concepts I use to move, model and trust data."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <div key={g.label} className="group bg-card p-7 transition-colors hover:bg-surface">
              <div className="flex items-center gap-3">
                <span className={`h-2 w-8 rounded-full ${layerTone[i % layerTone.length]}`} />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  layer_{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{g.label}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-md border border-border bg-background/50 px-3 py-1.5 text-sm text-foreground/90 transition-colors group-hover:border-primary/30"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
