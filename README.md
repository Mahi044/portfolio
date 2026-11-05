# Mahendra Reddy R V — Portfolio

Portfolio site for **Mahendra Reddy R V**, Data Engineer (Bangalore, India).

The landing screen shows the name on the left and an animated data pipeline on the
right: events flowing in from Event Hubs, Kafka and S3, through Spark, into the
Bronze / Silver / Gold lakehouse layers and out to dashboards, ML models and BI —
with a live log line and counters for events per second and rows processed.

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7)
- Tailwind CSS v4, shadcn/ui components
- TypeScript, Vitest for tests
- Bun (or npm) for installing and running

## Run it locally

```sh
git clone https://github.com/Mahi044/portfolio.git
cd portfolio
bun install        # or: npm install
bun run dev        # or: npm run dev
```

Then open the URL the dev server prints (http://localhost:8080 by default).

Other commands: `bun run build`, `bun run preview`, `bun run lint`, `bun run test`.

## Where things are

| Path | What lives there |
| --- | --- |
| `src/lib/portfolio-data.ts` | All portfolio text: profile, projects, skills, education, stats |
| `src/components/portfolio/` | Page sections: hero, animated pipeline, nav, contact |
| `src/components/portfolio/PipelineAnimation.tsx` | The animated data-pipeline graphic |
| `src/routes/` | Pages and the root layout |
| `src/styles.css` | Design tokens (colors, gradients, shadows) and global styles |

Editing the text on the site means editing `src/lib/portfolio-data.ts` — the sections
only render what that file provides.

## Deploy

The site is a static-capable React app, so it deploys to Vercel, Netlify,
Cloudflare Pages or any Node host with `bun run build`.
