export function SectionHeading({
  index,
  kicker,
  title,
  intro,
}: {
  index: string;
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-14 max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
        {index} — {kicker}
      </p>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
