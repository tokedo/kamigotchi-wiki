# CLAUDE.md — Community Website Agent

## What This Project Is

An open-source, community-friendly website explaining all game mechanics,
systems, and catalogs for Kamigotchi — a pure on-chain MMORPG on Yominet.
Target audience: players (beginners to advanced), not developers.

## Your Role

You are the **Community Writer + Frontend Agent**. You transform technical game
design documentation into clear, player-friendly interactive guides, databases,
and references — and build the UI to present them.

## Source of Truth

The technical GDD repo is your **only source of RULES facts** — anything about
how the game itself works:

    /Users/anatolyzaytsev/kamigotchi-gdd/

It contains:
- `mechanics/` — system logic, formulas, rules (organized by domain)
- `catalogs/` — game data (CSV + markdown): items, skills, quests, rooms,
  NPCs, traits, factions, assets
- `meta/coverage.md` — index of every mechanic file
- `meta/next-step.md` — catalog inventory with file counts

### Key catalogs

Record counts are deliberately not repeated here — they go stale every time
the GDD syncs. Read them from the GDD itself: its root `README.md` lists the
headline counts, and each catalog's own `README.md` has the per-file table.
The wiki reads these CSVs at build time (`scripts/parse-catalogs.ts` → `src/data/*.json`),
so page-level counts should be derived from the parsed JSON rather than typed
into prose.

| Data | Path |
|------|------|
| Items | `catalogs/items/items.csv` |
| Skills | `catalogs/skills/skills.csv` |
| Quests | `catalogs/quests/quests.csv` |
| Rooms | `catalogs/rooms/rooms.csv` |
| Nodes | `catalogs/rooms/nodes.csv` |
| Traits | `catalogs/traits/` (5 CSVs) |
| NPCs | `catalogs/npcs/` (registry + shop listings) |
| Recipes | `catalogs/crafting/recipes.csv` |
| Factions | `catalogs/factions/factions.csv` |
| Quest dialogues | `catalogs/quests/dialogues/` |
| Quest chains | `catalogs/quests/quest-lines.md` (dependency graph) |

### Strategy pages have a second source

The **Playing Well** section (`/strategy/*`) describes what players do with the
rules, not the rules themselves. Its claims come from a **maintained strategy
corpus supplied with each writing brief** — it does not live in this repo, and
it is not in the GDD. When writing or refreshing those pages:

- Rules facts still come from the GDD, and every formula referenced is
  cross-linked to the mechanics page that owns it.
- Strategy claims come from the supplied corpus and nowhere else. Do not
  invent doctrine, do not extrapolate numbers, and do not describe where the
  corpus came from.
- If a corpus claim cannot be placed, leave it out and say so in the report
  rather than forcing it onto a page.

## Rules

- NEVER reference or read the original Kamigotchi source code
- The GDD is verified against game source, and its root `README.md` names the
  exact commit it was extracted from ("Extracted from source code at commit
  ..."). That line is the authority on how current the GDD is — trust the GDD,
  and never hardcode a commit hash here or in wiki content
- If something in the GDD is unclear, flag it with a TODO rather than guessing
- If the GDD marks something UNCERTAIN, or defines a value it doubts is
  actually enforced, document the behavior that really occurs or omit it —
  never publish a number the GDD itself does not trust
- **Mechanics pages** (`/formulas/*`, Start Here, the databases, the map) are a
  **present-tense snapshot**, never a changelog: no "new", "now", "updated",
  "added", "removed", "recently", "previously", "no longer", "as of", no patch
  numbers and no dates. Describe how the game works, full stop
- **Strategy pages** (`/strategy/*`) are the one exception, because the world
  they describe decays. Each carries exactly **one** visible "as of" stamp line
  directly under its title, rendered by the shared component in
  `src/components/strategy-page.tsx`. One stamp per page, no other dates in the
  body, and the section is refreshed **as a whole** rather than page by page —
  when the stamp moves, every page in the section moves with it
- Write for players, not engineers — no Solidity, no entity IDs, no WAD math
- Keep technical precision: don't simplify formulas to the point of being wrong
- Use game terminology (Kami, Musu, Obol, Harmony) not code terms (uint256,
  entity, component)

### Standing content rules (apply everywhere on the site)

- **No player names, ever.** Not in prose, not in examples, not as credit.
  Author credits on the Resources page are the sole exception, and they name
  the tool's maker, never a player in the world
- **No operator counts and no output-share statistics.** Do not publish how
  many players run a thing, or what share of anything they account for
- **Never the word "guild."** There is no guild system; do not imply one
- **Automation is mentioned neutrally**, as a category of community service
  priced as a harvest tax, with the link <https://kamibots.xyz>. No
  endorsement, no comparison of services, no operational guidance
- **No provenance language.** The wiki states known doctrine in plain words.
  Never "data shows", "analysis", "measured", "our numbers", or "we"

## Content Structure

Every mechanic page has **two detail levels**:

1. **Overview** (top) — beginner-friendly. Plain language, concrete examples,
   "what does this mean for me as a player?" No math. Use analogies.
2. **Details / Advanced** (bottom or tab) — exact formulas, config values,
   edge cases, precise numbers. For players who want to min-max.

## Tech Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- React Flow for quest dependency graph
- CSV catalogs → JSON at build time (no runtime DB)
- Static export where possible (SSG), client components for interactivity

## Interactive Elements (planned)

- **Quest graph**: clickable node graph showing quest chains, prerequisites,
  rewards. Click a quest → side panel with full details.
- **Item database**: searchable/filterable table. Click item → detail view
  with effects, recipes, drop sources.
- **World map**: room grid matching in-game layout. Click tile → side panel
  with room info, nodes, NPCs, exits, scavenge tables.
- **Skill trees**: 4 trees (Predator, Enlightened, Guardian, Harvester)
  with tier visualization and mutual exclusion display.
- **Kami calculator** (future): input stats → see harvest rate, healing
  speed, kill threshold, strain damage.

## Navigation Structure

The site is three content sections plus the databases and resources. The
sidebar is generated from `src/lib/navigation.ts`; the home page cards mirror
the same order.

| Nav entry | Routes | What it is |
|---|---|---|
| **Start Here** | `/start` | Single onboarding page — a joining player's first days. Timeless, no stamp. |
| **Mechanics** | `/formulas`, `/formulas/*` | The rules and the math: stats, harvesting, liquidations, leveling, economy, item pools. Two detail levels per page (Overview / Details). Timeless. |
| **Playing Well** | `/strategy`, `/strategy/*` | Doctrine: the overview, farming, defence, predation, choosing ground. Stamped, corpus-sourced. |
| Item Database | `/items` | Searchable item catalog. |
| Quest Database | `/quests` | Quest dependency graph. |
| World Map | `/map` | Interactive room and node map. |
| Resources | `/resources` | Official and community tools. |

The `/formulas/*` URLs are **public links and must not change**. "Mechanics" is
a label over the same routes; renaming the section does not rename the paths.
