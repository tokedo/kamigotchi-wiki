# Kamigotchi Wiki

**[kamiwiki.xyz](https://kamiwiki.xyz)**

Community game guide for [Kamigotchi](https://kamigotchi.com) — a pure on-chain MMORPG on Yominet.

Three sections plus the catalogs:

- **Start Here** — onboarding for a joining player's first days.
- **Mechanics** — the rules and the exact formulas behind stats, harvesting, combat, leveling and the economy.
- **Playing Well** — how the game is actually played: farming doctrine, defence, predation, and choosing ground.

Plus the item database, quest graph, world map, and a list of community resources.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site locally.

## Tech Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- CSV catalogs from GDD converted to JSON at build time
- Static export (SSG) with client components for interactivity
