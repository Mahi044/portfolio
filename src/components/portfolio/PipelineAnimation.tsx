import { useEffect, useState } from "react";

type Node = {
  x: number;
  y: number;
  w: number;
  label: string;
  sub: string;
  tone: "primary" | "bronze" | "silver" | "gold" | "muted";
  delay: number;
};

const H = 38;

const nodes: Node[] = [
  { x: 12, y: 41, w: 108, label: "Event Hubs", sub: "stream", tone: "primary", delay: 0 },
  { x: 12, y: 121, w: 108, label: "Kafka", sub: "topics", tone: "primary", delay: 0.4 },
  { x: 12, y: 201, w: 108, label: "Amazon S3", sub: "batch", tone: "primary", delay: 0.8 },
  { x: 168, y: 121, w: 112, label: "Spark", sub: "ingest", tone: "primary", delay: 1.1 },
  { x: 328, y: 41, w: 140, label: "Bronze", sub: "raw · delta", tone: "bronze", delay: 1.4 },
  { x: 328, y: 121, w: 140, label: "Silver", sub: "clean · conformed", tone: "silver", delay: 1.8 },
  { x: 328, y: 201, w: 140, label: "Gold", sub: "business ready", tone: "gold", delay: 2.2 },
  { x: 12, y: 311, w: 120, label: "Dashboards", sub: "power bi", tone: "muted", delay: 2.5 },
  { x: 180, y: 311, w: 120, label: "ML Models", sub: "features", tone: "muted", delay: 2.7 },
  { x: 348, y: 311, w: 120, label: "SQL / BI", sub: "warehouse", tone: "muted", delay: 2.9 },
];

const toneStroke: Record<Node["tone"], string> = {
  primary: "stroke-primary",
  bronze: "stroke-bronze",
  silver: "stroke-silver",
  gold: "stroke-gold",
  muted: "stroke-muted-foreground",
};
const toneFill: Record<Node["tone"], string> = {
  primary: "fill-primary",
  bronze: "fill-bronze",
  silver: "fill-silver",
  gold: "fill-gold",
  muted: "fill-muted-foreground",
};

type Path = { id: string; d: string; tone: Node["tone"]; dur: number; count: number };

const paths: Path[] = [
  { id: "p-s1", d: "M120,60 C146,60 142,140 168,140", tone: "primary", dur: 1.8, count: 2 },
  { id: "p-s2", d: "M120,140 L168,140", tone: "primary", dur: 1.2, count: 2 },
  { id: "p-s3", d: "M120,220 C146,220 142,140 168,140", tone: "primary", dur: 1.8, count: 2 },
  { id: "p-ib", d: "M280,140 C306,140 302,60 328,60", tone: "bronze", dur: 1.6, count: 3 },
  { id: "p-bs", d: "M398,79 L398,121", tone: "silver", dur: 1.1, count: 2 },
  { id: "p-sg", d: "M398,159 L398,201", tone: "gold", dur: 1.1, count: 2 },
  { id: "p-g1", d: "M398,239 C398,280 72,272 72,311", tone: "gold", dur: 2.6, count: 2 },
  { id: "p-g2", d: "M398,239 C398,280 240,272 240,311", tone: "gold", dur: 2.1, count: 2 },
  { id: "p-g3", d: "M398,239 L398,275 L408,311", tone: "gold", dur: 1.5, count: 2 },
];

const logLines = [
  "bronze.events  ← append  schema=ok",
  "silver.orders  ← merge   dq_checks=passed",
  "gold.daily_kpi ← refresh scd2=applied",
  "airflow.dag    ✓ success retries=0",
  "delta.optimize ✓ z-order(customer_id)",
];

export function PipelineAnimation() {
  const [eps, setEps] = useState(12480);
  const [rows, setRows] = useState(4_812_330);
  const [latency, setLatency] = useState(842);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      const next = 11800 + Math.round(Math.random() * 1600);
      setEps(next);
      setRows((r) => r + Math.round(next / 2.5));
      setLatency(760 + Math.round(Math.random() * 180));
    }, 900);
    const l = setInterval(() => setLogIndex((i) => (i + 1) % logLines.length), 2200);
    return () => {
      clearInterval(t);
      clearInterval(l);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 shadow-card backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[11px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </span>
          <span className="ml-2">pipeline://streamlake_ai</span>
        </div>
        <div className="flex items-center gap-2 text-success">
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-success" />
          RUNNING
        </div>
      </div>

      {/* Diagram */}
      <div className="relative px-2 pt-3">
        <svg
          viewBox="0 0 480 360"
          className="h-auto w-full"
          role="img"
          aria-label="Animated data pipeline: sources flow through Spark into Bronze, Silver and Gold layers, then out to dashboards, ML models and BI"
        >
          <text x="12" y="24" className="fill-muted-foreground font-mono text-[9px] tracking-[0.2em]">
            SOURCES
          </text>
          <text x="168" y="108" className="fill-muted-foreground font-mono text-[9px] tracking-[0.2em]">
            PROCESS
          </text>
          <text x="328" y="24" className="fill-muted-foreground font-mono text-[9px] tracking-[0.2em]">
            MEDALLION LAYERS
          </text>
          <text x="12" y="300" className="fill-muted-foreground font-mono text-[9px] tracking-[0.2em]">
            CONSUMERS
          </text>

          {paths.map((p) => (
            <g key={p.id}>
              <path id={p.id} d={p.d} className="pipe-track" />
              <path d={p.d} className="pipe-flow" />
            </g>
          ))}

          {paths.map((p) =>
            Array.from({ length: p.count }).map((_, i) => (
              <circle key={`${p.id}-${i}`} r="3" className={toneFill[p.tone]}>
                <animateMotion
                  dur={`${p.dur}s`}
                  begin={`${(p.dur / p.count) * i}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath href={`#${p.id}`} />
                </animateMotion>
              </circle>
            )),
          )}

          {nodes.map((n) => (
            <g key={n.label}>
              <rect
                x={n.x - 3}
                y={n.y - 3}
                width={n.w + 6}
                height={H + 6}
                rx="10"
                className={`pipe-node fill-none ${toneStroke[n.tone]}`}
                strokeWidth="1"
                style={{ animationDelay: `${n.delay}s` }}
              />
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={H}
                rx="8"
                className={`fill-surface ${toneStroke[n.tone]}`}
                strokeWidth="1.2"
              />
              <circle cx={n.x + 12} cy={n.y + H / 2} r="3" className={toneFill[n.tone]} />
              <text x={n.x + 22} y={n.y + 16} className="fill-foreground font-sans text-[11px] font-semibold">
                {n.label}
              </text>
              <text x={n.x + 22} y={n.y + 29} className="fill-muted-foreground font-mono text-[8.5px]">
                {n.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Live log */}
      <div className="mx-4 mb-3 flex items-center gap-2 overflow-hidden rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-[11px] text-muted-foreground">
        <span className="text-primary">$</span>
        <span key={logIndex} className="animate-rise truncate">
          {logLines[logIndex]}
        </span>
        <span className="ml-auto h-3 w-1.5 animate-blink bg-primary" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border-t border-border font-mono">
        <Stat label="events / sec" value={eps.toLocaleString("en-US")} />
        <Stat label="rows processed" value={rows.toLocaleString("en-US")} border />
        <Stat label="e2e latency" value={`${latency} ms`} border />
      </div>
    </div>
  );
}

function Stat({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <div className={`px-4 py-3 ${border ? "border-l border-border" : ""}`}>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold tabular-nums text-foreground">{value}</div>
    </div>
  );
}
