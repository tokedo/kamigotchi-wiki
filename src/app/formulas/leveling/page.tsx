"use client";

import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";
import skillsData from "@/data/skills.json";
import { useState } from "react";

interface SkillEffect {
  key: string;
  name: string;
  context: string;
  type: string;
  stat: string;
  operation: string;
  units: string;
}

interface Skill {
  index: number;
  name: string;
  tree: string;
  tier: number;
  treeReq: number;
  max: number;
  cost: number;
  effect: SkillEffect;
  effectKey: string;
  value: number;
  units: string;
  exclusion: string | null;
  description: string;
}

const skills = skillsData as Skill[];

const TREES = ["Predator", "Enlightened", "Guardian", "Harvester"] as const;

function formatValue(value: number, units: string): string {
  if (units === "Percent") {
    return `${value > 0 ? "+" : ""}${(value * 100).toFixed(1)}%`;
  }
  if (units === "Seconds") {
    return `${value > 0 ? "+" : ""}${value}s`;
  }
  if (units === "MUSU/hr") {
    return `+${value} MUSU/hr`;
  }
  return `${value > 0 ? "+" : ""}${value}`;
}

function SkillTreeDisplay() {
  const [selectedTree, setSelectedTree] = useState<string>("Predator");

  const treeSkills = skills
    .filter((s) => s.tree === selectedTree)
    .sort((a, b) => a.tier - b.tier || a.index - b.index);

  const tiers = Array.from(new Set(treeSkills.map((s) => s.tier))).sort(
    (a, b) => a - b,
  );

  return (
    <div className="not-prose">
      <div className="flex gap-2 mb-6 flex-wrap">
        {TREES.map((tree) => (
          <button
            key={tree}
            onClick={() => setSelectedTree(tree)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTree === tree
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {tree}
          </button>
        ))}
      </div>

      {tiers.map((tier) => {
        const tierSkills = treeSkills.filter((s) => s.tier === tier);
        const gateReq = tierSkills[0]?.treeReq ?? 0;
        const hasExclusion = tierSkills.some((s) => s.exclusion !== null);

        return (
          <div key={tier} className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Tier {tier}
              </h4>
              {gateReq > 0 && (
                <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  Requires {gateReq} tree points
                </span>
              )}
              {hasExclusion && (
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Mutual Exclusion - pick one
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tierSkills.map((skill) => (
                <div
                  key={skill.index}
                  className={`rounded-lg border p-3 ${
                    hasExclusion
                      ? "border-amber-500/20 bg-amber-500/5"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="font-medium text-sm">{skill.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Max level: {skill.max} | Cost: {skill.cost} SP per level
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">
                      {formatValue(skill.value, skill.units)} per level
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {skill.effect.name}
                  </div>
                  {skill.max > 1 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Fully invested ({skill.max} levels):{" "}
                      {formatValue(skill.value * skill.max, skill.units)} total
                    </div>
                  )}
                  {skill.description && (
                    <div className="text-xs text-muted-foreground/70 mt-1 italic">
                      {skill.description}
                    </div>
                  )}
                  {skill.exclusion && (
                    <div className="text-xs text-amber-400 mt-1">
                      Choosing this locks out the other two options
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const GREATER_XP = 15_000; // Greater XP Potion (item 11402)
const FORTIFIED_XP = 50_000; // Fortified XP Potion (item 11411)

function xpCost(level: number): number {
  return Math.floor(40 * Math.pow(1.259, level - 1));
}

// Total XP to go from level 1 to `level`
function xpToReach(level: number): number {
  let total = 0;
  for (let l = 1; l < level; l++) total += xpCost(l);
  return total;
}

function potions(xp: number, size: number): string {
  const n = xp / size;
  if (n < 1) return "<1";
  return Math.ceil(n).toLocaleString();
}

const MILESTONES: [number, string][] = [
  [10, "Early game — a day or two of ordinary harvesting"],
  [16, "15 SP: Tier 3 in one tree — your exclusive build pick"],
  [26, "25 SP: Tier 4 unlocked"],
  [32, "31 SP: the classic “finished build” level"],
  [37, "36 SP: extended build (deep second tree)"],
  [41, "40 SP: Tier 5 unlocked"],
  [48, "47 SP: deep endgame — a handful of Kamis are here"],
  [56, "55 SP: Tier 6 ultimate skill (mono-tree)"],
];

function XPTable() {
  const rows = MILESTONES.map(([level, why]) => {
    const cum = xpToReach(level);
    return [
      String(level),
      why,
      cum.toLocaleString(),
      potions(cum, GREATER_XP),
      potions(cum, FORTIFIED_XP),
    ];
  });
  return (
    <StatTable
      headers={[
        "Level",
        "Why it's a target",
        "Total XP from L1",
        "= Greater XP Potions (15K)",
        "= Fortified XP Potions (50K)",
      ]}
      rows={rows}
    />
  );
}

export default function LevelingFormulasPage() {
  return (
    <MechanicPage
      title="Leveling, XP & Skills"
      subtitle="How your Kami grows stronger: earning experience, climbing levels, and investing in skill trees."
      overview={
        <>
          <h2>Growing Your Kami</h2>
          <p>
            Every Kami enters the world at <strong>level 1</strong>. As it
            harvests Musu and survives the dangers of Yominet, it accumulates
            experience points. Once your Kami has stored enough XP, you can
            spend it to <strong>level up</strong> — each level grants
            one <strong>skill point</strong> that you invest in permanent
            bonuses through the skill trees.
          </p>
          <p>
            This is the core progression loop: harvest and survive to earn XP,
            level up to earn skill points, spend skill points to become more
            powerful, then harvest and fight more effectively.
          </p>

          <h3>Where Does XP Come From?</h3>
          <p>
            There are two separate XP pools in Kamigotchi, and it is important
            to understand the difference because they do not mix.
          </p>

          <h4>Kami XP (used for leveling)</h4>
          <p>
            This is the XP that matters for leveling up. Your Kami earns it
            directly through three activities:
          </p>
          <StatTable
            headers={["Source", "How Much", "Notes"]}
            rows={[
              [
                "Harvesting",
                "Equal to Musu collected",
                "Your primary source. Every Musu harvested is also 1 XP.",
              ],
              [
                "Kill salvage",
                "Equal to salvage received",
                "If your Kami is killed, the salvage payout also grants XP — a small consolation.",
              ],
              [
                "Item effects",
                "Varies by item",
                "Certain items grant XP directly to the Kami when used on it.",
              ],
            ]}
          />

          <InfoBox variant="tip">
            Set your expectations with real numbers: a typical active Kami
            harvests on the order of <strong>1,000 Musu per day</strong> (strong
            harvester builds manage 3,000–5,000), so harvesting alone carries
            you comfortably through the first ~20 levels. Beyond that, the
            curve outruns your farm rate — a level 32 build costs ~195K XP,
            which is months of passive harvest income. That&apos;s why serious
            leveling is done by feeding <strong>XP items</strong> (see the XP
            items table in the details section), funded by the Musu your Kamis
            harvest.
          </InfoBox>

          <h4>Account XP (separate — does not level up your Kami)</h4>
          <p>
            Your player account also accumulates XP from moving between rooms
            (5 XP per move), crafting items, and completing quests. However,
            Account XP is an entirely separate pool — it does <em>not</em> feed
            into the leveling system and cannot be used to level up your Kami.
          </p>

          <h3>The Levels That Matter</h3>
          <p>
            Experience requirements grow <strong>exponentially</strong> — each
            level costs about 26% more than the one before, and that compounds
            hard. The first level-up needs just 40 XP; going from level 31 to
            32 costs about 50,000. But don&apos;t think of leveling as a slow
            grind through every level — think of it in terms
            of <strong>skill points</strong>. At level N you have banked
            N−1 skill points, and skill tiers inside one tree unlock at 15, 25,
            40, and 55 points invested. That maps to a handful of level
            milestones that players actually build toward:
          </p>
          <StatTable
            headers={["Level", "Skill Points", "Why players stop here", "Total XP from L1"]}
            rows={[
              [
                "16",
                "15",
                "Enough for Tier 3 in one tree — where you make your exclusive, build-defining skill pick",
                "~4,700",
              ],
              [
                "32",
                "31",
                "The classic “finished build” — a full two-tree core (e.g. 15 points to a Tier 3 pick in each of two trees)",
                "~195,000",
              ],
              [
                "37",
                "36",
                "Extended builds that go deeper into a second tree",
                "~616,000",
              ],
              [
                "56",
                "55",
                "All 55 points in a single tree — unlocks that tree's Tier 6 ultimate skill",
                "~49,000,000",
              ],
            ]}
          />
          <p>
            Read that last column again: a level 32 build costs about{" "}
            <strong>195K XP total</strong>, but the level 56 ultimate costs{" "}
            <strong>49 million</strong> — over 250 finished level-32 builds'
            worth of XP for one Kami. This is why in practice the population
            clusters between level 24 and 39, and only a few dozen Kamis in the
            entire game have ever crossed level 48.
          </p>
          <InfoBox variant="tip">
            Practical translation: XP is fed to Kamis mostly
            as <strong>Fortified XP Potions</strong> (50,000 XP each). A
            standard level 32 build costs about <strong>4 potions</strong>;
            level 37 costs ~13; the level 56 ultimate costs ~980. Whether a
            level is &ldquo;worth it&rdquo; is really the question &ldquo;is
            the next skill point worth that many potions?&rdquo; — XP spent
            past your build&apos;s last useful skill point buys nothing until
            the next tier gate.
          </InfoBox>

          <h3>What Leveling Gets You</h3>
          <p>
            Every level-up grants exactly <strong>one skill point</strong>. You
            invest these points across four skill trees, each focused on a
            different playstyle:
          </p>
          <StatTable
            headers={["Tree", "Playstyle"]}
            rows={[
              [
                "Predator",
                "Aggressive combat — boosts Violence, attack power, spoils from kills, and reduces cooldowns",
              ],
              [
                "Enlightened",
                "Efficient sustain — faster resting recovery, harvest bounty bonuses, reduced strain",
              ],
              [
                "Guardian",
                "Defensive resilience — more Harmony, tougher defense thresholds, better salvage, more Health",
              ],
              [
                "Harvester",
                "Harvest optimization — higher Power, better fertility and bounty, reduced strain, some defense",
              ],
            ]}
          />

          <h3>The Big Choices: Tier 3 and Tier 6</h3>
          <p>
            Most skill tiers let you invest freely in all three options. But
            at <strong>Tier 3</strong> and <strong>Tier 6</strong> of each tree,
            the three skills are <strong>mutually exclusive</strong> — you
            can pick only one. These are meaningful build-defining decisions
            that lock you into a specialization until you respec.
          </p>

          <InfoBox>
            Made the wrong choice? You can reset all your skills with
            a <strong>Respec Potion</strong> (craftable: 1 Plastic Bottle +
            500 Shredded Mint). It refunds every skill point you have spent so
            you can redistribute them from scratch — so a mistake costs you
            some Mint, not your Kami.
          </InfoBox>

          <h3>Good to Know</h3>
          <ul>
            <li>
              Your Kami must be in the <strong>Resting</strong> state to level
              up — you cannot level while harvesting, dead, or staked.
            </li>
            <li>
              Each level-up is a separate action. If you have enough XP for
              multiple levels, you still level up one at a time.
            </li>
            <li>
              Any XP beyond the cost carries over. Nothing is wasted.
            </li>
            <li>
              There is no hard level cap. The exponential curve acts as a
              natural soft cap — each successive level simply takes longer.
            </li>
          </ul>
        </>
      }
      details={
        <>
          <h2>XP Cost Curve</h2>
          <p>
            Experience requirements grow exponentially, with a base cost of
            40 XP and a per-level multiplier of 1.259 — each level costs about
            26% more than the previous one. Compounding makes this brutal at
            the top: reaching level 38 requires roughly the same total XP as
            progressing from level 38 to just level 41 — an OSRS-style curve
            where each stretch of a few levels costs as much as your entire
            journey so far.
          </p>
          <FormulaBlock
            label="XP required to advance from a given level"
            vars={{
              "cost(level)": "XP needed to advance from this level to the next",
              "level": "your Kami's current level (starts at 1)",
              "40": "base XP cost for the first level-up",
              "1.259": "growth multiplier per level (~25.9% increase, derived from the ratio 1259 / 1000)",
              "floor": "round down to the nearest whole number",
            }}
          >
            {`cost(level) = floor( 40 x 1.259 ^ (level - 1) )

The base cost is 40 XP for level 1.
The multiplier 1.259 comes from the ratio 1259 / 1000.
Each level costs ~25.9% more than the last.

On-chain, this calculation uses 18-decimal fixed-point (WAD) arithmetic
for precision, but the result is the same.`}
          </FormulaBlock>

          <p>
            There is no hard level cap. The curve itself is the cap — at high
            levels, the XP required per level grows so large that progress
            slows to a crawl. The single level-up from 31 to 32 costs about
            50,000 XP (more than the entire journey to level 26), and the
            level-up from 55 to 56 costs about 12.7 million.
          </p>

          <h3>XP Milestones and Potion Equivalents</h3>
          <p>
            The table below converts the curve into the units players actually
            think in: total XP from a fresh level 1 Kami, and how many
            Greater XP Potions (15,000 XP) or Fortified XP Potions (50,000 XP)
            that represents.
          </p>
          <XPTable />

          <h2>Kami XP Sources</h2>
          <p>
            Only three activities award XP directly to a Kami. Everything else
            (quests, movement, crafting) goes to the separate Account XP pool.
          </p>
          <StatTable
            headers={["Source", "XP Awarded", "When It Happens"]}
            rows={[
              [
                "Harvesting",
                "Equal to Musu collected",
                "Awarded when you collect or stop a harvest session",
              ],
              [
                "Kill salvage",
                "Equal to salvage amount",
                "Awarded to the victim Kami when it is liquidated",
              ],
              [
                "Item effects",
                "Varies by item",
                "When an item with an XP allocation is used on the Kami",
              ],
            ]}
          />

          <h2>XP Items: How Leveling Is Actually Done</h2>
          <p>
            Past the early levels, virtually all leveling XP comes from items
            fed to the Kami. These are the ones that matter, from smallest to
            largest:
          </p>
          <StatTable
            headers={["Item", "XP", "Where it comes from"]}
            rows={[
              [
                "XP Candy (Small / Medium / Large / Huge)",
                "25 / 100 / 200 / 1,000",
                "Quest rewards and giftboxes — early-game snacks, not tradable",
              ],
              [
                "XP Potion",
                "1,000",
                "Crafted: 1 Plastic Bottle + 250 Pine Pollen (20 stamina)",
              ],
              [
                "Greater XP Potion",
                "15,000",
                "Crafted: 1 Glass Jar + 2,500 Pine Pollen (50 stamina)",
              ],
              [
                "Fortified XP Potion",
                "50,000",
                "Crafted: 1 Greater XP Potion + 300 Powdered Red Amber + 1 Essence of Thought (75 stamina, account level 20+)",
              ],
              [
                "Cultivation Spell Cards I–IV",
                "100 / 1,000 / 10,000 / 50,000",
                "Drops and rewards — also heal 20–100 HP; Cultivation IV is a Fortified-potion equivalent",
              ],
              [
                "Heart Crystals (Half / Full / Great)",
                "1,000 / 15,000 / 50,000",
                "Great Heart Crystal drops from Wonder Eggs (crafted from Obols earned by liquidating)",
              ],
            ]}
          />
          <InfoBox variant="tip">
            Notice the crafting chain: Pine Pollen → Greater XP Potion →
            Fortified XP Potion. This single chain is why Pine Pollen nodes
            are permanently farmed and why Pine Pollen holds its value on the
            player market — every serious build in the game is fed through it.
          </InfoBox>

          <h2>Account XP (Separate Pool)</h2>
          <p>
            Your player account has its own XP pool that is completely
            independent from Kami XP. Account XP accumulates from exploration,
            crafting, and quest completion, but it does not feed into the
            level-up system — only Kami XP does that.
          </p>
          <StatTable
            headers={["Source", "XP Awarded", "Details"]}
            rows={[
              [
                "Room movement",
                "5 XP per move",
                "Awarded every time you move to an adjacent room",
              ],
              [
                "Crafting",
                "Varies by recipe",
                "Each recipe defines its own XP reward, multiplied by craft amount",
              ],
              [
                "Quest rewards",
                "Varies by quest",
                "Quests that include XP rewards grant them to your account, not your Kami",
              ],
            ]}
          />

          <h2>How Leveling Up Works</h2>
          <p>
            When your Kami has accumulated enough XP, you can trigger a level-up
            as long as the Kami is in the <strong>Resting</strong> state. The
            system checks that you own the Kami and that it has enough XP to
            cover the cost. If everything checks out, the XP cost is deducted,
            the Kami&apos;s level increases by one, and a skill point is added to
            its pool.
          </p>
          <p>
            Before the level actually applies, the game syncs your Kami&apos;s
            health to account for any passive healing that occurred since your
            last action. After leveling, an NFT metadata update event fires so
            marketplaces and explorers reflect the new level, and your
            account&apos;s total level-ups counter is incremented.
          </p>
          <p>
            You can only gain one level per action. If you have enough XP for
            three levels, you need to level up three separate times. Any XP
            beyond the cost stays in your pool for the next level.
          </p>

          <h2>Skill Trees</h2>
          <p>
            Each skill tree contains 18 skills — 3 per tier across 6 tiers.
            To unlock higher tiers, you need to have invested enough total
            points within that specific tree. Since one level grants one skill
            point, each gate also implies the earliest possible level to reach
            it (going all-in on one tree):
          </p>
          <StatTable
            headers={["Tier", "Tree Points Needed", "Earliest Level", "Notes"]}
            rows={[
              ["Tier 1", "0", "2", "Available immediately"],
              ["Tier 2", "5", "6", ""],
              ["Tier 3", "15", "16", "Mutual exclusion — pick one of three"],
              ["Tier 4", "25", "26", ""],
              ["Tier 5", "40", "41", ""],
              ["Tier 6", "55", "56", "Mutual exclusion — the “ultimate” skills"],
            ]}
          />
          <p>
            &ldquo;Tree points&rdquo; simply means the total number of skill
            points you have spent in that particular tree. Every skill currently
            costs 1 point per level, so if you have invested in 15 levels
            across various Predator skills, you have 15 Predator tree points
            and can unlock Predator Tier 3.
          </p>
          <InfoBox variant="info">
            Some player tools display lower gate values for tiers 4–6 (20/30/40)
            — those come from a stale column in the game&apos;s data files. The
            on-chain check uses the values above (25/40/55): tier 4 genuinely
            requires 25 points in the tree, and the tier 6 ultimate requires 55.
          </InfoBox>

          <h3>Mutual Exclusion at Tiers 3 and 6</h3>
          <p>
            At Tier 3 and Tier 6, the three skills in each tree
            are <strong>mutually exclusive</strong>. Once you invest a single
            point in one of them, the other two are permanently locked out.
            This is where your build identity takes shape — a Predator who
            picks Warmonger plays very differently from one who picks Vampire
            or Bandit.
          </p>
          <p>
            The only way to undo an exclusion choice is a full respec. There is
            no way to selectively reset one skill.
          </p>

          <h3>Respec</h3>
          <p>
            If you want to rebuild your Kami&apos;s skill allocation, you
            need a <strong>Respec Potion</strong>. Using one completely wipes
            all invested skills, removes every bonus they granted, and refunds
            every skill point back to your pool. Your Kami&apos;s level
            stays the same — you keep all the points, they are just unallocated
            again. After a respec, your stats are synced to reflect the
            removed bonuses.
          </p>
          <p>
            This is an all-or-nothing reset. You cannot selectively remove
            individual skills — the potion clears everything so you can start
            your build from scratch.
          </p>

          <h2>Skill Effect Reference</h2>
          <p>
            Each skill grants a specific type of bonus. Here is what each
            effect category does and how its values work:
          </p>
          <StatTable
            headers={["Effect", "What It Does", "Value Type"]}
            rows={[
              ["Health Shift", "Directly increases your Kami's max Health stat", "Flat stat points"],
              ["Power Shift", "Directly increases your Kami's Power stat (harvest rate)", "Flat stat points"],
              ["Violence Shift", "Directly increases your Kami's Violence stat (attack power)", "Flat stat points"],
              ["Harmony Shift", "Directly increases your Kami's Harmony stat (defense)", "Flat stat points"],
              ["Harvest Fertility Boost", "Percentage boost to harvest node fertility", "Percentage per level"],
              ["Harvest Intensity Boost", "Strengthens the time-ramping part of your harvest rate — the longer a single harvest runs, the more this pays. The core skill for tanky “park and forget” builds", "MUSU/hr per level"],
              ["Harvest Bounty Boost", "Percentage boost to total harvest bounty", "Percentage per level"],
              ["Attack Threshold Shift", "Lowers the threshold needed to successfully attack", "Percentage per level"],
              ["Attack Threshold Ratio", "Multiplier on your attack threshold calculation", "Percentage per level"],
              ["Attack Spoils Ratio", "Increases the percentage of loot you take from kills", "Percentage per level"],
              ["Defense Threshold Shift", "Raises the threshold attackers need to overcome", "Percentage per level"],
              ["Defense Threshold Ratio", "Multiplier on your defense threshold calculation", "Percentage per level"],
              ["Defense Salvage Ratio", "Increases the share of your harvest bounty your account keeps (as Musu) when your Kami is liquidated — the Kami also gains that much XP", "Percentage per level"],
              ["Resting Recovery Boost", "Speeds up HP recovery while resting", "Percentage per level"],
              ["Strain Boost", "Reduces strain accumulation (negative values = less strain)", "Percentage per level"],
              ["Cooldown Shift", "Reduces action cooldowns (negative values = faster)", "Seconds per level"],
            ]}
          />
          <InfoBox>
            Percentage-based effects stack additively with other sources of
            the same bonus type. Stat shift effects are flat values added
            directly to the stat. Negative values on Strain Boost and Cooldown
            Shift are beneficial — they represent reductions.
          </InfoBox>

          <h2>Full Skill Catalog ({skills.length} skills)</h2>
          <p>
            Browse all skills organized by tree and tier. Use the tabs to
            switch between trees. Skills at mutually exclusive tiers are
            highlighted — remember, you can only invest in one of the three
            at those tiers.
          </p>
          <SkillTreeDisplay />
        </>
      }
    />
  );
}
