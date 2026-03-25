"use client";

import { useState, useMemo } from "react";
import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";
import skillsData from "@/data/skills.json";

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
const trees = Array.from(new Set(skills.map((s) => s.tree)));

export default function LevelsAndSkillsPage() {
  return (
    <MechanicPage
      title="Levels & Skills"
      subtitle="How your Kami gains experience, levels up, and learns powerful skills"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>Leveling Up</h2>
      <p>
        Your Kami earns experience points (XP) by performing activities in the
        world. When it accumulates enough XP, you can spend that XP to level up.
        Each level-up grants <strong>1 skill point</strong> that you can invest
        into your skill trees.
      </p>

      <InfoBox variant="info">
        XP is <strong>consumed</strong> when you level up, not cumulative. If you
        need 40 XP to reach level 2 and you have 55 XP, you&apos;ll spend 40 and
        keep 15 for the next level.
      </InfoBox>

      <h2>How to Earn XP</h2>
      <ul>
        <li>
          <strong>Harvesting</strong> — XP equal to the amount of resources
          harvested, awarded when you stop or collect
        </li>
        <li>
          <strong>Kill salvage</strong> — If your Kami is killed, it receives XP
          equal to the salvage amount
        </li>
        <li>
          <strong>Quest rewards</strong> — Some quests grant XP as a reward
        </li>
        <li>
          <strong>Item effects</strong> — Certain items award XP when used
        </li>
      </ul>

      <h2>XP Cost Per Level</h2>
      <p>
        The XP required to level up increases exponentially. Early levels are
        cheap, but high levels demand serious grinding:
      </p>
      <StatTable
        headers={["Level", "XP to Next Level", "Cumulative XP"]}
        rows={[
          [1, 40, 40],
          [2, 50, 90],
          [3, 63, 153],
          [4, 80, 233],
          [5, 100, 333],
          [6, 126, 459],
          [7, 159, 618],
          [8, 200, 818],
          [9, 252, "1,070"],
          [10, 317, "1,387"],
        ]}
      />

      <InfoBox variant="tip">
        Your Kami must be in the <strong>Resting</strong> state to level up. You
        cannot level up while harvesting, dead, or unstaked.
      </InfoBox>

      <h2>The Four Skill Trees</h2>
      <p>
        Skills are permanent stat modifiers organized into four specialized
        trees. Each tree has <strong>6 tiers</strong> with <strong>3 skills per
        tier</strong> (18 skills per tree, 72 total).
      </p>
      <StatTable
        headers={["Tree", "Focus", "Key Benefits"]}
        rows={[
          [
            "Predator",
            "Combat offense",
            "Violence, attack threshold, spoils ratio, cooldown reduction",
          ],
          [
            "Enlightened",
            "Sustain & recovery",
            "Resting recovery, harvest bounty, strain reduction",
          ],
          [
            "Guardian",
            "Defense",
            "Harmony, defense threshold, salvage ratio, health, harvest intensity",
          ],
          [
            "Harvester",
            "Resource gathering",
            "Power, harvest fertility/bounty, strain reduction, defense",
          ],
        ]}
      />

      <h2>Tier Gates</h2>
      <p>
        Higher-tier skills require you to invest a minimum number of skill points
        in the same tree before they unlock:
      </p>
      <StatTable
        headers={["Tier", "Tree Points Required"]}
        rows={[
          [1, "0 (unlocked from start)"],
          [2, 5],
          [3, 15],
          [4, 25],
          [5, 40],
          [6, 55],
          [7, 75],
          [8, 95],
        ]}
      />

      <h2>Mutual Exclusion</h2>
      <p>
        At <strong>Tier 3</strong> (tree points 25) and <strong>Tier 6</strong>{" "}
        (tree points 55), the three skills in each tree are{" "}
        <strong>mutually exclusive</strong> — you can only invest in one of the
        three. Choose carefully, as this decision shapes your Kami&apos;s
        specialization.
      </p>

      <InfoBox variant="warning">
        Mutual exclusion means once you pick one Tier 3 or Tier 6 skill, the
        other two in that tier are permanently locked. The only way to change is
        to use a <strong>Respec Potion</strong>, which resets ALL skills.
      </InfoBox>

      <h2>Respec</h2>
      <p>
        If you want to rebuild your skill tree, you can use a{" "}
        <strong>Respec Potion</strong> (item index 11403). This resets all
        invested skills and refunds every skill point. You lose all current skill
        bonuses and get to redistribute your points from scratch.
      </p>

      <h2>Skill Browser</h2>
      <p>
        Browse all skills below, grouped by tree and tier:
      </p>
      <SkillBrowser />
    </>
  );
}

function Details() {
  return (
    <>
      <h2>XP Cost Formula</h2>
      <FormulaBlock label="XP Required to Level Up">
        {"cost = base × multiplier^(level - 1)\n\nWhere:\n  base       = 40  (KAMI_LVL_REQ_BASE)\n  multiplier = 1.259  (1259 / 1000)\n\nExponentiation uses WAD math (18-decimal fixed-point) via powWad:\n  multiplierWAD = (1e18 × 1259) / 1000\n  multiplier    = powWad(multiplierWAD, (level - 1) × 1e18)\n  cost          = (base × multiplier) / 1e18"}
      </FormulaBlock>

      <h2>Level-Up Process</h2>
      <p>
        The exact steps when leveling up:
      </p>
      <ol>
        <li>Verify ownership — caller must own the Kami</li>
        <li>Verify state — Kami must be RESTING</li>
        <li>Check XP — currentXP must be &gt;= level cost, or revert</li>
        <li>Sync health — update current HP based on time-based healing</li>
        <li>Consume XP — experience -= levelCost</li>
        <li>Increment level — level += 1</li>
        <li>Grant skill point — skillPoints += 1</li>
        <li>Emit NFT metadata update event</li>
        <li>Log KAMI_LEVELS_TOTAL counter on the account</li>
      </ol>

      <InfoBox variant="info">
        One level at a time — there is no batch level-up. Each call advances
        exactly 1 level. XP defaults to 0, Level defaults to 1.
      </InfoBox>

      <h2>Two Separate XP Pools</h2>
      <p>
        The game has two independent XP pools:
      </p>
      <StatTable
        headers={["Pool", "Earned By", "Used For"]}
        rows={[
          ["Kami XP", "Harvesting, kill salvage, quest rewards, items", "Kami leveling (this system)"],
          ["Account XP", "Movement, crafting", "Account progression (no level-up mechanism)"],
        ]}
      />
      <p>
        Only Kami XP feeds into the leveling system. Account XP is a separate
        tracker.
      </p>

      <h2>Skill Tree Structure</h2>
      <p>
        Each tree has 6 tiers with 3 skills each. Tier access is gated by total
        tree points (sum of all skill point costs invested in that tree).
      </p>
      <StatTable
        headers={["Tier", "Tree Points Required", "Config Key"]}
        rows={[
          [1, 0, "(no gate)"],
          [2, 5, "KAMI_TREE_REQ[1]"],
          [3, 15, "KAMI_TREE_REQ[2]"],
          [4, 25, "KAMI_TREE_REQ[3]"],
          [5, 40, "KAMI_TREE_REQ[4]"],
          [6, 55, "KAMI_TREE_REQ[5]"],
          [7, 75, "KAMI_TREE_REQ[6]"],
          [8, 95, "KAMI_TREE_REQ[7]"],
        ]}
      />

      <h2>Skill Upgrade Process</h2>
      <ol>
        <li>Verify the skill registry entry exists</li>
        <li>Verify entity type matches the skill&apos;s target (Kami or Account)</li>
        <li>If Kami: verify ownership, verify RESTING state, sync stats</li>
        <li>
          Verify prerequisites:
          <ul>
            <li>Point balance: holder has enough unspent skill points &gt;= cost</li>
            <li>Max check: current investment &lt; max level</li>
            <li>Tree tier: total tree points &gt;= tier requirement</li>
            <li>Additional conditional requirements pass</li>
          </ul>
        </li>
        <li>Deduct skill points, increment skill instance level</li>
        <li>Apply bonuses via the Bonus system</li>
      </ol>

      <h2>Skill Effect Types</h2>
      <StatTable
        headers={["Key", "Name", "Context", "Units"]}
        rows={[
          ["SHS", "Stat Health Shift", "Stat", "Stat points"],
          ["SPS", "Stat Power Shift", "Stat", "Stat points"],
          ["SVS", "Stat Violence Shift", "Stat", "Stat points"],
          ["SYS", "Stat Harmony Shift", "Stat", "Stat points"],
          ["HFB", "Harvest Fertility Boost", "Harvest", "Percent (\u00d71000)"],
          ["HIB", "Harvest Intensity Boost", "Harvest", "MUSU/hr"],
          ["HBB", "Harvest Bounty Boost", "Harvest", "Percent (\u00d71000)"],
          ["ATS", "Attack Threshold Shift", "Attack", "Percent (\u00d71000)"],
          ["ATR", "Attack Threshold Ratio", "Attack", "Percent (\u00d71000)"],
          ["ASR", "Attack Spoils Ratio", "Attack", "Percent (\u00d71000)"],
          ["DTS", "Defense Threshold Shift", "Defense", "Percent (\u00d71000)"],
          ["DTR", "Defense Threshold Ratio", "Defense", "Percent (\u00d71000)"],
          ["DSR", "Defense Salvage Ratio", "Defense", "Percent (\u00d71000)"],
          ["RMB", "Resting Recovery Boost", "Resting", "Percent (\u00d71000)"],
          ["SB", "Strain Boost", "Standard", "Percent (\u00d71000)"],
          ["CS", "Cooldown Shift", "Standard", "Seconds"],
        ]}
      />

      <h2>Respec Process</h2>
      <ol>
        <li>Verify ownership (account or Kami)</li>
        <li>Consume 1 Respec Potion (item index 11403)</li>
        <li>Apply potion allocations</li>
        <li>
          Reset all skills:
          <ul>
            <li>Calculate total refund: sum(instanceLevel x skillCost) for each skill</li>
            <li>Remove all bonuses from those skill instances</li>
            <li>Delete all skill instance entities</li>
            <li>Add refunded points back to holder</li>
          </ul>
        </li>
        <li>If Kami, sync stats after reset</li>
      </ol>

      <h2>Complete Skill Database</h2>
      <SkillBrowser />
    </>
  );
}

function SkillBrowser() {
  const [treeFilter, setTreeFilter] = useState("All");

  const filteredSkills = useMemo(() => {
    if (treeFilter === "All") return skills;
    return skills.filter((s) => s.tree === treeFilter);
  }, [treeFilter]);

  const groupedByTreeAndTier = useMemo(() => {
    const grouped: Record<string, Record<number, Skill[]>> = {};
    for (const skill of filteredSkills) {
      if (!grouped[skill.tree]) grouped[skill.tree] = {};
      if (!grouped[skill.tree][skill.tier]) grouped[skill.tree][skill.tier] = [];
      grouped[skill.tree][skill.tier].push(skill);
    }
    return grouped;
  }, [filteredSkills]);

  const formatValue = (skill: Skill) => {
    if (skill.units === "Percent") {
      return `${(skill.value * 100).toFixed(0)}%`;
    }
    if (skill.units === "Stat") {
      return `+${skill.value}`;
    }
    return `${skill.value}`;
  };

  return (
    <div className="not-prose my-6">
      <div className="mb-4 flex gap-3">
        <select
          value={treeFilter}
          onChange={(e) => setTreeFilter(e.target.value)}
          className="rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="All">All Trees</option>
          {trees.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {Object.entries(groupedByTreeAndTier)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([tree, tiers]) => (
          <div key={tree} className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{tree} Tree</h3>
            {Object.entries(tiers)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([tier, tierSkills]) => (
                <div key={tier} className="mb-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Tier {tier}
                    {tierSkills[0]?.treeReq > 0
                      ? ` (requires ${tierSkills[0].treeReq} tree points)`
                      : ""}
                    {tierSkills[0]?.exclusion ? " — mutually exclusive" : ""}
                  </p>
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-3 py-2 text-left font-medium">Skill</th>
                          <th className="px-3 py-2 text-left font-medium">Effect</th>
                          <th className="px-3 py-2 text-left font-medium">Per Level</th>
                          <th className="px-3 py-2 text-left font-medium">Max</th>
                          <th className="px-3 py-2 text-left font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tierSkills.map((skill) => (
                          <tr
                            key={skill.index}
                            className="border-b border-border last:border-0 hover:bg-muted/30"
                          >
                            <td className="px-3 py-1.5 font-medium whitespace-nowrap">
                              {skill.name}
                            </td>
                            <td className="px-3 py-1.5 text-muted-foreground whitespace-nowrap">
                              {skill.effect.name}
                            </td>
                            <td className="px-3 py-1.5 tabular-nums text-green-400 whitespace-nowrap">
                              {formatValue(skill)}
                            </td>
                            <td className="px-3 py-1.5 tabular-nums">{skill.max}</td>
                            <td className="px-3 py-1.5 text-muted-foreground text-xs max-w-xs">
                              {skill.description.trim()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}
