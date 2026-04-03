import type { Metadata } from "next";
import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export const metadata: Metadata = {
  title: "Harvesting",
};

export default function HarvestingFormulasPage() {
  return (
    <MechanicPage
      title="Harvesting"
      subtitle="How your Kami earns Musu, what it costs in HP, and how to get the most out of every session."
      overview={
        <>
          <h2>What Is Harvesting?</h2>
          <p>
            Harvesting is your Kami&apos;s job. You park it on a{" "}
            <strong>node</strong> (a resource spot inside a room) and it
            passively generates <strong>Musu</strong> — the core currency of
            Kamigotchi. Think of it as mining: your Kami works a resource vein,
            earning Musu every second it stays on the node.
          </p>
          <p>
            The catch? Harvesting hurts. Every bit of Musu your Kami earns
            costs a little HP through <strong>strain</strong>. Push too long
            and your Kami dies. Pull out too early and you leave Musu on the
            table. Meanwhile, other players can <strong>liquidate</strong> your
            Kami while it harvests — raiding your bounty and killing it in the
            process.
          </p>
          <p>
            Great harvesting is about finding the sweet spot: maximizing income
            while managing your HP, your timing, and your risk.
          </p>

          <h3>The Harvest Loop</h3>
          <p>
            Every harvest follows the same rhythm. You <strong>start</strong>{" "}
            your Kami on a node, and it begins accruing Musu (while taking
            strain). Then you choose when and how to cash out:
          </p>
          <ul>
            <li>
              <strong>Collect</strong> — grab your accrued Musu but keep
              harvesting. Good for banking progress without losing your spot.
            </li>
            <li>
              <strong>Stop</strong> — collect everything and pull your Kami off
              the node. It returns to resting and starts healing.
            </li>
            <li>
              <strong>Liquidate</strong> (by another player) — someone on the
              same node raids your harvest, takes a cut of your bounty, and
              kills your Kami. You keep a small salvage portion, but the rest is
              lost or stolen.
            </li>
          </ul>

          <InfoBox variant="tip">
            Every time you collect or stop, you also earn{" "}
            <strong>XP</strong> equal to the Musu collected, trigger a{" "}
            <strong>scavenge roll</strong> for bonus item drops, and gain{" "}
            <strong>leaderboard score</strong>. Harvesting feeds your
            progression on multiple fronts.
          </InfoBox>

          <h3>Two Engines of Income</h3>
          <p>
            Your Musu income comes from two separate sources that add together:
          </p>
          <p>
            <strong>Fertility</strong> is your baseline earning rate. It depends
            on your <strong>Power</strong> stat and how well your Kami matches
            the node (more on that below). Fertility is steady and predictable —
            it pays the same amount every second.
          </p>
          <p>
            <strong>Intensity</strong> is a ramping bonus tied to your{" "}
            <strong>Violence</strong> stat. It starts small but grows every
            minute you stay on the node. Intensity rewards patience — but the
            longer you camp, the more strain you accumulate and the more exposed
            you are to liquidation.
          </p>
          <p>
            For most Kamis, Fertility dominates your short-term income.
            Intensity becomes significant in longer sessions (hours, not
            minutes).
          </p>

          <h3>Affinity Matching</h3>
          <p>
            Every Kami has two affinities — a <strong>body</strong> affinity and
            a <strong>hand</strong> affinity — chosen from EERIE, SCRAP, INSECT,
            or NORMAL. Each harvest node also has one or two affinities.
          </p>
          <p>
            When your Kami&apos;s affinities match the node, you earn
            substantially more Musu. When they clash, you get penalized. This is
            the single biggest factor in your harvest output besides raw Power.
          </p>
          <StatTable
            headers={["Matchup", "Harvest Multiplier", "What This Means"]}
            rows={[
              [
                "Both body and hand match",
                "2.0x",
                "Double output — always aim for this when possible",
              ],
              [
                "Body matches, hand clashes",
                "~1.55x",
                "Still strong — body affinity matters most",
              ],
              [
                "Neutral (NORMAL affinity)",
                "1.0x",
                "No bonus, no penalty — safe but not optimal",
              ],
              [
                "Both body and hand clash",
                "0.65x",
                "Harsh penalty — avoid mismatched nodes",
              ],
            ]}
          />
          <p>
            A perfectly matched Kami earns roughly <strong>3x more</strong> than
            a fully mismatched one on the same node. Picking the right node for
            your Kami&apos;s affinities is one of the most impactful decisions
            you can make.
          </p>

          <h3>Strain: The Price of Musu</h3>
          <p>
            Nothing comes free. Every Musu your Kami earns drains a little HP
            through <strong>strain</strong>. Your <strong>Harmony</strong> stat
            acts as armor against strain — higher Harmony means less HP lost per
            Musu earned. But even the toughest Kami can&apos;t harvest forever.
          </p>

          <InfoBox variant="warning">
            A starting Kami with Power 10 and Harmony 10 can harvest roughly{" "}
            <strong>230 Musu</strong> before its 50 HP runs out. On a neutral
            node, that takes about <strong>15 hours</strong> — but on a
            perfectly matched node with higher Power, you can burn through your
            HP much faster. Investing in Harmony through skills, equipment, and
            food buffs is essential for extending your total harvest output.
          </InfoBox>

          <h3>Recovery While Resting</h3>
          <p>
            When your Kami is resting (not harvesting), it passively regenerates
            HP based on its <strong>Harmony</strong>. A Harmony-10 Kami
            recovers about 18 HP per hour — so going from 0 to 50 HP takes
            roughly 2.8 hours. Higher Harmony speeds this up significantly.
            Your Kami does not heal while harvesting.
          </p>

          <h3>Cooldowns and Scavenging</h3>
          <p>
            After starting, collecting, or stopping a harvest, your Kami enters
            a <strong>3-minute cooldown</strong> before it can act again. Skills
            can shorten this.
          </p>
          <p>
            As you harvest, you also accumulate{" "}
            <strong>scavenge points</strong> equal to your Musu output. Once
            enough points fill a tier, you can claim bonus items from the
            node&apos;s loot table. Harder nodes require more points per tier
            but drop rarer rewards.
          </p>

          <h3>Tips for Maximizing Your Harvest</h3>
          <ul>
            <li>
              <strong>Match your affinities.</strong> This is the single easiest
              way to double your output. Always check a node&apos;s affinity
              before committing your Kami.
            </li>
            <li>
              <strong>Invest in Harmony early.</strong> More Harmony means less
              strain per Musu, which means longer sessions and more total
              income before you need to rest.
            </li>
            <li>
              <strong>Use food buffs strategically.</strong> Bounty-boosting
              food (+25% output) only lasts until your next harvest action.
              Eat right before collecting to get the most from the buff.
            </li>
            <li>
              <strong>Watch your HP.</strong> Collect and stop before your HP
              gets dangerously low. A dead Kami earns nothing and is expensive
              to revive.
            </li>
            <li>
              <strong>Be aware of liquidation.</strong> Other players on your
              node can raid you. If you&apos;re sitting on a large uncollected
              bounty, you&apos;re a target. Collect frequently on contested
              nodes.
            </li>
          </ul>
        </>
      }
      details={
        <>
          <h2>Bounty (Total Musu Earned)</h2>
          <p>
            Your <strong>bounty</strong> is the total Musu your Kami has accrued
            since its last sync. It combines your two income sources — Fertility
            and Intensity — multiplied by how long you&apos;ve been harvesting
            and any active bounty boosts.
          </p>
          <FormulaBlock
            label="Total Harvest Rate"
            vars={{
              "Fertility": "steady Musu/hr from Power and affinity (see below)",
              "Intensity": "ramping Musu/hr from Violence and time on node (see below)",
              "Bounty Boost": "base 1.0x, increased by food (+25%) or equipment (+12% to +20%)",
            }}
          >
            {`Total Musu per Hour = (Fertility + Intensity) × Bounty Boost`}
          </FormulaBlock>
          <p>
            In practice, Fertility usually dominates for short sessions. Intensity
            becomes more meaningful the longer you stay on a node, but most Kamis
            will hit lethal strain long before Intensity becomes the bigger
            contributor.
          </p>

          <h2>Fertility (Power-Based Steady Rate)</h2>
          <p>
            Fertility is the bread-and-butter of your harvest income — a
            constant rate that scales directly with your <strong>Power</strong>{" "}
            stat and your <strong>Efficacy</strong> (affinity match). More Power
            and better affinity matching means more Musu per hour.
          </p>
          <FormulaBlock
            label="Harvest Fertility"
            vars={{
              "Power": "your Kami's Power stat",
              "Efficacy": "affinity match multiplier: 1.0 (neutral), up to 2.0 (perfect match), down to 0.65 (full mismatch)",
              "1.5": "base harvest rate constant",
            }}
          >
            {`Fertility (Musu/hr) = Power × Efficacy × 1.5`}
          </FormulaBlock>
          <p>
            This is the simplified player-facing formula — the on-chain math
            uses intermediate precision values, but the result is the same.
            Efficacy ranges from 0.65x (full mismatch) to 2.0x (perfect match)
            depending on affinity — covered in detail below.
          </p>

          <h3>Fertility Examples</h3>
          <p>
            These examples show Fertility contribution over 1 hour, with no
            bounty boosts:
          </p>
          <StatTable
            headers={["Power", "Affinity Match", "Efficacy", "Musu per Hour"]}
            rows={[
              ["10", "Neutral", "1.0x", "15"],
              ["10", "Perfect match", "2.0x", "30"],
              ["10", "Full mismatch", "0.65x", "9.75"],
              ["20", "Neutral", "1.0x", "30"],
              ["20", "Perfect match", "2.0x", "60"],
            ]}
          />
          <InfoBox variant="tip">
            Doubling your Power doubles your Fertility. But getting a perfect
            affinity match also doubles it — and matching costs nothing. Always
            check node affinities before you start harvesting.
          </InfoBox>

          <h2>Intensity (Violence-Based Ramping Rate)</h2>
          <p>
            Intensity is a bonus that grows the longer you stay on a node. It
            scales with your <strong>Violence</strong> stat and increases every
            minute you remain harvesting.
          </p>
          <FormulaBlock
            label="Harvest Intensity"
            vars={{
              "Violence": "your Kami's Violence stat",
              "5": "Violence scaling factor",
              "Minutes on Node": "whole minutes since intensity last reset — grows over time",
              "48": "rate divisor (derived from internal 480/10 equilibrium constant)",
            }}
          >
            {`Intensity (Musu/hr) = (Violence × 5 + Minutes on Node) / 48`}
          </FormulaBlock>
          <p>
            Intensity is small at first but adds up. After several hours, the
            accumulated minutes make Intensity a meaningful addition to your
            income. The intensity timer resets on certain actions like equipment
            changes.
          </p>

          <h3>How Intensity Ramps Over Time</h3>
          <p>
            For a Kami with Violence 10 and no boost items:
          </p>
          <StatTable
            headers={["Time on Node", "Intensity (Musu/hr)"]}
            rows={[
              ["Just started (0 min)", "~1.0"],
              ["1 hour (60 min)", "~2.3"],
              ["4 hours (240 min)", "~6.0"],
              ["8 hours (480 min)", "~11.0"],
              ["16 hours (960 min)", "~21.0"],
            ]}
          />
          <p>
            Compare this to Fertility: a Power-10 Kami on a neutral node earns
            15 Musu/hr from Fertility alone. At the 1-hour mark, Intensity adds
            only ~2.3 Musu/hr on top — about 15% more. After 8 hours it reaches
            ~11 Musu/hr, nearly doubling total output. Intensity rewards
            patience, but Fertility is the dominant income source for most
            sessions.
          </p>

          <h2>Affinity and Efficacy</h2>
          <p>
            Efficacy is the multiplier applied to Fertility based on how well
            your Kami&apos;s affinities match the node. It&apos;s made up of
            two components: a <strong>body affinity</strong> check (which has a
            bigger impact) and a <strong>hand affinity</strong> check (smaller
            impact).
          </p>
          <p>
            Four affinity types exist: <strong>EERIE</strong>,{" "}
            <strong>SCRAP</strong>, <strong>INSECT</strong>, and{" "}
            <strong>NORMAL</strong>. When a Kami&apos;s affinity matches the
            node&apos;s, it gets a boost. When they clash, it gets a penalty.
            NORMAL is always neutral — no bonus, no penalty.
          </p>

          <h3>How Body and Hand Contribute</h3>
          <FormulaBlock
            label="Efficacy"
            vars={{
              "Body Shift": "+0.65 if body matches, -0.25 if it clashes, 0 if neutral",
              "Hand Shift": "+0.35 if hand matches, -0.10 if it clashes, 0 if neutral",
            }}
          >
            {`Efficacy = 1.0 + Body Shift + Hand Shift`}
          </FormulaBlock>
          <StatTable
            headers={["Check", "Match (bonus)", "Clash (penalty)"]}
            rows={[
              ["Body affinity", "+0.65", "-0.25"],
              ["Hand affinity", "+0.35", "-0.10"],
            ]}
          />
          <p>
            Body affinity is weighted roughly twice as heavily as hand. This
            means your body affinity is the more important one to match, though
            getting both right is the ideal.
          </p>

          <h3>All Efficacy Scenarios</h3>
          <StatTable
            headers={["Scenario", "Efficacy", "Effect on Harvest"]}
            rows={[
              [
                "Both body and hand match",
                "1.0 + 0.65 + 0.35 = 2.0x",
                "Double output",
              ],
              [
                "Body matches, hand clashes",
                "1.0 + 0.65 - 0.10 = 1.55x",
                "Strong output — body carries it",
              ],
              [
                "Body matches, hand neutral",
                "1.0 + 0.65 + 0 = 1.65x",
                "Good output",
              ],
              [
                "Both neutral (NORMAL Kami)",
                "1.0 + 0 + 0 = 1.0x",
                "Baseline — no adjustment",
              ],
              [
                "Body clashes, hand matches",
                "1.0 - 0.25 + 0.35 = 1.10x",
                "Slight boost, but wasting body potential",
              ],
              [
                "Body clashes, hand neutral",
                "1.0 - 0.25 + 0 = 0.75x",
                "Noticeable penalty",
              ],
              [
                "Both body and hand clash",
                "1.0 - 0.25 - 0.10 = 0.65x",
                "Harsh penalty — avoid this",
              ],
            ]}
          />
          <InfoBox variant="tip">
            For dual-affinity nodes (like EERIE-SCRAP), the game automatically
            gives your body the better matchup. If your body matches one of the
            node&apos;s affinities and your hand matches the other, you get the
            full 2.0x bonus.
          </InfoBox>

          <h3>Worked Example: Affinity in Action</h3>
          <p>
            Suppose you have an EERIE/EERIE Kami with Power 26 on an EERIE
            node:
          </p>
          <FormulaBlock
            variant="example"
            label="Example: Perfect Match Fertility"
            vars={{
              "26": "Kami's Power stat",
              "2.0": "Efficacy from perfect affinity match (both body and hand)",
              "1.5": "base harvest rate constant",
            }}
          >
            {`Efficacy = 1.0 + 0.65 (body match) + 0.35 (hand match) = 2.0

Fertility = 26 × 2.0 × 1.5 = 78 Musu per hour (from Fertility alone)`}
          </FormulaBlock>
          <p>
            Now compare the same Kami on a SCRAP node (full mismatch):
          </p>
          <FormulaBlock
            variant="example"
            label="Example: Full Mismatch Fertility"
            vars={{
              "26": "Kami's Power stat",
              "0.65": "Efficacy from full affinity mismatch (both body and hand clash)",
              "1.5": "base harvest rate constant",
            }}
          >
            {`Efficacy = 1.0 - 0.25 (body clash) - 0.10 (hand clash) = 0.65

Fertility = 26 × 0.65 × 1.5 = 25.35 Musu per hour`}
          </FormulaBlock>
          <p>
            That&apos;s a 3x difference in output just from choosing the right
            node.
          </p>

          <h2>Strain (HP Cost of Harvesting)</h2>
          <p>
            Strain is the HP damage your Kami takes for each Musu it earns.
            Every time a sync happens, the Musu accrued since the last sync is
            converted into HP damage, reduced by your{" "}
            <strong>Harmony</strong> stat.
          </p>
          <FormulaBlock
            label="Strain"
            vars={{
              "Musu Earned": "amount of Musu accrued since last sync",
              "6.5": "base strain rate constant",
              "Strain Modifier": "base 1.0x; food can reduce it (-25%) or increase it (+50%)",
              "Harmony": "your Kami's Harmony stat",
              "20": "base buffer added to Harmony",
              "ceil()": "rounds up -- you always lose at least 1 HP if any Musu was earned",
            }}
          >
            {`Strain = ceil(Musu Earned x 6.5 x Strain Modifier / (Harmony + 20))`}
          </FormulaBlock>
          <StatTable
            headers={["Variable", "What It Is"]}
            rows={[
              ["Musu Earned", "Amount of Musu accrued since last sync"],
              [
                "6.5",
                "Base strain rate — determines how harsh the HP cost is",
              ],
              [
                "Strain Modifier",
                "Base 1.0x; food can reduce it (-25%) or increase it (+50%)",
              ],
              [
                "Harmony + 20",
                "Your Harmony stat plus a base buffer of 20 — higher Harmony means less strain",
              ],
            ]}
          />
          <p>
            The <code>ceil()</code> means you always lose at least 1 HP per
            sync if you earned any Musu at all. There is no way to harvest with
            zero strain.
          </p>

          <h3>Strain Examples</h3>
          <StatTable
            headers={[
              "Musu Earned",
              "Harmony",
              "Strain Modifier",
              "HP Lost",
            ]}
            rows={[
              ["100", "10", "1.0x (no buff)", "ceil(100 x 6.5 / 30) = 22 HP"],
              [
                "100",
                "30",
                "1.0x (no buff)",
                "ceil(100 x 6.5 / 50) = 13 HP",
              ],
              [
                "100",
                "10",
                "0.75x (strain reduction food)",
                "ceil(100 x 6.5 x 0.75 / 30) = 17 HP",
              ],
              [
                "100",
                "10",
                "1.5x (strain increase food)",
                "ceil(100 x 6.5 x 1.5 / 30) = 33 HP",
              ],
            ]}
          />

          <h3>Diminishing Harmony</h3>
          <p>
            Because Harmony appears in the denominator alongside a base value of
            20, its impact follows a diminishing returns curve. Going from 10 to
            20 Harmony drops your strain per 100 Musu from 22 to 17 HP — a big
            improvement. But going from 50 to 60 Harmony only drops it from 10
            to 9 HP. The first points of Harmony are the most valuable.
          </p>
          <StatTable
            headers={[
              "Harmony",
              "Strain per 100 Musu",
              "Improvement from +10",
            ]}
            rows={[
              ["10", "22 HP", "—"],
              ["20", "17 HP", "-5 HP (23% less strain)"],
              ["30", "13 HP", "-4 HP (24% less)"],
              ["50", "10 HP", "-3 HP (23% less, over +20)"],
              ["80", "7 HP", "-3 HP (30% less, over +30)"],
            ]}
          />

          <h3>Maximum Musu Before Death</h3>
          <p>
            You can estimate how much total Musu your Kami can harvest before
            dying from strain by rearranging the formula:
          </p>
          <FormulaBlock
            label="Max Musu Before Death"
            vars={{
              "Current HP": "your Kami's remaining health points",
              "Harmony": "your Kami's Harmony stat",
              "20": "base buffer added to Harmony",
              "6.5": "base strain rate constant",
              "Strain Modifier": "base 1.0x; food can reduce it (-25%) or increase it (+50%)",
              "floor()": "rounds down to the last whole Musu your Kami can safely earn",
            }}
          >
            {`Max Musu = floor(Current HP x (Harmony + 20) / (6.5 x Strain Modifier))`}
          </FormulaBlock>
          <StatTable
            headers={["HP", "Harmony", "Strain Modifier", "Max Musu"]}
            rows={[
              ["50 (starting)", "10", "1.0x", "~230 Musu"],
              ["50", "30", "1.0x", "~384 Musu"],
              ["100", "10", "1.0x", "~461 Musu"],
              ["50", "10", "0.75x (strain reduction)", "~307 Musu"],
            ]}
          />

          <InfoBox variant="warning">
            A starting Kami (50 HP, Harmony 10) can only harvest about 230 Musu
            before dying. At 15 Musu/hr (neutral node, Power 10), that&apos;s
            roughly 15 hours — but a stronger Kami with perfect affinity match
            can burn through HP much faster. Building Harmony and using
            strain-reduction food are critical for extending your total output.
          </InfoBox>

          <h2>Recovery While Resting</h2>
          <p>
            When your Kami is resting (not harvesting), it passively regenerates
            HP. The rate depends on your <strong>Harmony</strong> stat — the
            same stat that reduces strain.
          </p>
          <FormulaBlock
            label="Healing Rate"
            vars={{
              "Harmony": "your Kami's Harmony stat",
              "20": "base buffer added to Harmony",
              "0.6": "base recovery multiplier",
              "Recovery Boost": "base 1.0x; can be increased by items or bonuses",
              "3600": "converts to a per-second rate",
              "Seconds Resting": "elapsed time since Kami started resting",
              "floor()": "rounds down -- partial HP is not granted",
            }}
          >
            {`HP per second = (Harmony + 20) x 0.6 x Recovery Boost / 3600

HP recovered = floor(Seconds Resting x HP per second)`}
          </FormulaBlock>
          <StatTable
            headers={["Variable", "What It Is"]}
            rows={[
              [
                "Harmony + 20",
                "Your Harmony stat plus a base buffer of 20",
              ],
              [
                "0.6",
                "Base recovery multiplier",
              ],
              [
                "Recovery Boost",
                "Base 1.0x; can be increased by items or bonuses",
              ],
            ]}
          />

          <h3>Healing Examples</h3>
          <StatTable
            headers={[
              "Harmony",
              "HP per Second",
              "HP per Hour",
              "Time to Full (50 HP)",
            ]}
            rows={[
              ["10", "0.005", "18 HP", "~2.8 hours"],
              ["20", "0.0067", "24 HP", "~2.1 hours"],
              ["30", "0.0083", "30 HP", "~1.7 hours"],
            ]}
          />
          <p>
            Healing is computed lazily — your Kami&apos;s HP only updates when
            it performs an action. The game calculates recovery based on elapsed
            time since the last sync. You do not need to stay online for healing
            to happen.
          </p>

          <h2>Cooldown</h2>
          <p>
            After starting, collecting, stopping, or liquidating, your Kami
            enters a <strong>3-minute cooldown</strong> (180 seconds). During
            cooldown it cannot act.
          </p>
          <FormulaBlock
            label="Cooldown"
            vars={{
              "180 seconds": "base cooldown duration (3 minutes)",
              "Cooldown Shift": "modifier from skills -- a negative value shortens the wait",
            }}
          >
            {`Cooldown Duration = 180 seconds + Cooldown Shift

Cooldown Shift comes from skills — a negative shift shortens the wait.
Cooldown cannot go below 0 seconds.`}
          </FormulaBlock>

          <h2>Tax</h2>
          <p>
            When starting a harvest, you can assign a <strong>taxer</strong>{" "}
            (for example, a faction leader or referrer). The taxer receives a
            percentage of your Musu each time you collect.
          </p>
          <FormulaBlock
            label="Tax"
            vars={{
              "Musu Collected": "gross Musu from this collect or stop action",
              "Tax Rate": "percentage set by the taxer, up to 20% each",
            }}
          >
            {`Tax Amount = Musu Collected x Tax Rate / 100

Tax Rate: up to 20% per taxer.
Multiple taxes apply to the original amount, not sequentially.
Your net = Collected Musu - sum of all taxes.`}
          </FormulaBlock>

          <h2>Scavenging</h2>
          <p>
            Scavenge points accumulate alongside your harvest output — you earn
            points equal to the Musu you collect. When enough points fill a{" "}
            <strong>tier</strong>, you can claim bonus item drops from the
            node&apos;s loot table.
          </p>
          <FormulaBlock
            label="Scavenge Tiers"
            vars={{
              "Scavenge Points": "cumulative points earned from harvesting (1 point per Musu collected)",
              "Musu Collected": "Musu received on this collect or stop action",
              "Tier Cost": "points required per scavenge tier (100 to 500, depends on node)",
              "Claimable Tiers": "number of complete tiers you can claim rewards from",
              "Leftover Points": "remaining points that carry over to the next cycle",
            }}
          >
            {`Scavenge Points += Musu Collected  (on each collect or stop)

Claimable Tiers = floor(Current Points / Tier Cost)
Leftover Points = Current Points mod Tier Cost

Each tier grants one or more rolls from the node's droptable.
Leftover points carry over to the next cycle.`}
          </FormulaBlock>
          <StatTable
            headers={["Tier Cost", "Node Type", "Examples"]}
            rows={[
              ["100", "Starter nodes", "Misty Riverside, Tunnel of Trees"],
              ["200", "Mid-tier nodes", "Forest paths, cave rooms"],
              ["300", "Advanced nodes", "Deeper Forest Path, Airplane Crash"],
              [
                "500",
                "Premium nodes",
                "Scrap Confluence, Techno Temple",
              ],
            ]}
          />
          <p>
            Higher tier costs mean more harvesting per reward, but premium
            nodes tend to have rarer and more valuable loot in their droptables.
          </p>

          <h2>Harvest Boosts from Items</h2>
          <p>
            Several items can improve (or worsen) your harvesting. Here are the
            main buff types:
          </p>
          <StatTable
            headers={["Buff", "Source", "Effect", "Duration"]}
            rows={[
              [
                "Bounty Boost",
                "Food",
                "+25% harvest output",
                "Until next harvest action",
              ],
              [
                "Bounty Boost",
                "Equipment",
                "+12% to +20% harvest output",
                "While equipped",
              ],
              [
                "Intensity Boost",
                "Food or Equipment",
                "Increases Intensity growth rate",
                "Varies by source",
              ],
              [
                "Strain Reduction",
                "Food",
                "-25% strain (less HP lost)",
                "Until next harvest action",
              ],
              [
                "Strain Increase",
                "Food (be careful!)",
                "+50% strain (more HP lost)",
                "Until next harvest action",
              ],
            ]}
          />
          <InfoBox variant="warning">
            Food buffs are consumed on your next harvest action (collect, stop,
            or feed). They do not persist through multiple collections. Eat
            right before you collect to get the most value from the buff.
          </InfoBox>

          <h2>Strategic Comparisons</h2>

          <h3>Bounty Boost vs Fertility Boost</h3>
          <p>
            A bounty boost multiplies your <em>total</em> output (Fertility +
            Intensity combined), while Fertility only scales with Power and
            Efficacy. In practice, a +25% bounty boost from food is almost
            always better than trying to squeeze more out of a single stat,
            because it multiplies everything — including Intensity gains from
            longer sessions.
          </p>

          <h3>Power vs Violence for Harvesting</h3>
          <p>
            Power directly drives Fertility, which is your primary income source.
            Violence drives Intensity, which is small for short sessions and
            only becomes meaningful after hours of continuous harvesting. For
            most players, <strong>Power is the better investment</strong> for
            harvest income. Violence has other uses (combat, liquidation) but is
            a secondary harvest stat.
          </p>

          <h3>Harmony: Double Duty</h3>
          <p>
            Harmony reduces strain <em>and</em> speeds up resting recovery. This
            makes it arguably the most efficient harvesting stat overall — it
            lets you harvest more Musu per session (less HP lost) and get back
            to harvesting faster (quicker healing). The first 20-30 points of
            Harmony have the strongest impact due to diminishing returns.
          </p>

          <h2>Full Worked Example</h2>
          <p>
            Let&apos;s walk through a complete harvest scenario to see how all
            the pieces connect.
          </p>
          <InfoBox variant="tip">
            <strong>Setup:</strong> A Kami with Power 15, Violence 10, Harmony
            10, body=EERIE, hand=EERIE, harvesting an EERIE node. No item
            bonuses. Starting at 50 HP.
          </InfoBox>

          <h3>1. Efficacy</h3>
          <p>
            Both body and hand are EERIE, and the node is EERIE — a perfect
            match.
          </p>
          <FormulaBlock
            variant="example"
            vars={{
              "0.65": "body affinity match bonus",
              "0.35": "hand affinity match bonus",
            }}
          >
            {`Efficacy = 1.0 + 0.65 (body match) + 0.35 (hand match) = 2.0x`}
          </FormulaBlock>

          <h3>2. Fertility</h3>
          <FormulaBlock
            variant="example"
            vars={{
              "15": "Kami's Power stat",
              "2.0": "Efficacy from perfect affinity match",
              "1.5": "base harvest rate constant",
            }}
          >
            {`Fertility = 15 × 2.0 × 1.5 = 45 Musu per hour`}
          </FormulaBlock>

          <h3>3. Max Musu Before Death</h3>
          <FormulaBlock
            variant="example"
            vars={{
              "50": "Kami's current HP",
              "10": "Kami's Harmony stat",
              "20": "base buffer added to Harmony",
              "6.5": "base strain rate constant",
            }}
          >
            {`Max Musu = floor(50 x (10 + 20) / 6.5) = floor(230.8) = 230 Musu`}
          </FormulaBlock>

          <h3>4. How Long Can This Kami Harvest?</h3>
          <p>
            At 45 Musu per hour from Fertility (ignoring Intensity, which adds
            only a small amount at this scale), reaching 230 Musu takes about:
          </p>
          <FormulaBlock
            variant="example"
            vars={{
              "230": "max Musu before death (from step 3)",
              "45": "Fertility rate in Musu per hour (from step 2)",
            }}
          >
            {`230 / 45 = ~5.1 hours`}
          </FormulaBlock>

          <h3>5. Strain Check</h3>
          <p>
            After earning 230 Musu, the total strain would be:
          </p>
          <FormulaBlock
            variant="example"
            vars={{
              "230": "total Musu earned",
              "6.5": "base strain rate constant",
              "30": "Harmony (10) + base buffer (20)",
            }}
          >
            {`Strain = ceil(230 x 6.5 / 30) = ceil(49.8) = 50 HP

50 HP = full health drained. The Kami dies exactly at this point.`}
          </FormulaBlock>

          <h3>6. Practical Strategy</h3>
          <p>
            In practice, you would <strong>not</strong> harvest to death. You
            would collect around 150-200 Musu, stop, rest for a couple hours to
            heal, then start again. A harvest-rest-harvest cycle is the
            sustainable way to farm. Using strain-reduction food or investing in
            Harmony extends each cycle significantly.
          </p>

          <h2>Liquidation (PvP Raiding)</h2>
          <p>
            If another Kami is harvesting on the same node as yours, it can
            attempt to <strong>liquidate</strong> you — stealing part of your
            bounty and killing your Kami.
          </p>
          <StatTable
            headers={["What Happens", "Description"]}
            rows={[
              [
                "Salvage",
                "The victim retains a small portion of their bounty",
              ],
              [
                "Spoils",
                "The killer steals a portion of what remains",
              ],
              [
                "Destroyed",
                "Any Musu not salvaged or spoiled is burned — gone forever",
              ],
              [
                "Recoil",
                "The killer takes HP damage for performing the liquidation",
              ],
            ]}
          />
          <p>
            Both Kamis must be harvesting on the same node, and the attacker
            must pass a violence threshold check. After liquidation, the victim
            is set to DEAD (HP = 0, harvest ends, all bonuses reset). Detailed
            salvage, spoils, and recoil formulas are covered in the Combat
            section.
          </p>

          <InfoBox>
            You cannot liquidate a Kami on a different node, even if you are in
            the same room. Both must be on the exact same node.
          </InfoBox>
        </>
      }
    />
  );
}
