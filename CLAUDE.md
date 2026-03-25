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

The technical GDD repo is your **only source of game facts**:

    /Users/anatolyzaytsev/kamigotchi-gdd/

It contains:
- `mechanics/` — system logic, formulas, rules (organized by domain)
- `catalogs/` — game data (CSV + markdown): items, skills, quests, rooms,
  NPCs, traits, factions, assets
- `meta/coverage.md` — index of all 48 mechanic files
- `meta/next-step.md` — catalog inventory with file counts

### Key catalogs
| Data | Path | Records |
|------|------|---------|
| Items | `catalogs/items/items.csv` | 177 items |
| Skills | `catalogs/skills/skills.csv` | 71 skills |
| Quests | `catalogs/quests/quests.csv` | 155 quests |
| Rooms | `catalogs/rooms/rooms.csv` | 70 rooms |
| Nodes | `catalogs/rooms/nodes.csv` | 64 nodes |
| Traits | `catalogs/traits/` | 135 traits (5 CSVs) |
| NPCs | `catalogs/npcs/` | 2 NPCs + 19 shop listings |
| Recipes | `catalogs/crafting/recipes.csv` | 41 recipes |
| Factions | `catalogs/factions/factions.csv` | 3 factions |
| Quest dialogues | `catalogs/quests/dialogues/` | 106 dialogue lines |
| Quest chains | `catalogs/quests/quest-lines.md` | Dependency graph |

## Rules

- NEVER reference or read the original Kamigotchi source code
- The GDD is verified against source at commit d9b50091 — trust it
- If something in the GDD is unclear, flag it with a TODO rather than guessing
- Write for players, not engineers — no Solidity, no entity IDs, no WAD math
- Keep technical precision: don't simplify formulas to the point of being wrong
- Use game terminology (Kami, Musu, Obol, Harmony) not code terms (uint256,
  entity, component)

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

Sidebar sections:
- Getting Started (new player guide)
- Core Mechanics (stats, health, leveling, death)
- Economy (harvesting, items, crafting, trading)
- Combat (killing, liquidation, sacrifice)
- World (rooms, nodes, scavenging, day/night)
- Progression (skills, quests, factions, goals)
- Marketplace (Kami market, auctions, token portal, VIP)
- Databases (items, quests, rooms — interactive)
- Tools (skill calculator — future)
