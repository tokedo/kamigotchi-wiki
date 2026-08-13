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
            costs a little HP through <strong>strain</strong>. Your earnings
            cap out as HP falls — a harvest can never bank more than your HP can
            pay for — so camping forever stops paying off. Pull out too early
            and you leave Musu on the table. Meanwhile, other players can{" "}
            <strong>liquidate</strong> your Kami while it harvests — raiding your
            bounty and killing it in the process.
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
            Every time you collect or stop, your Kami also earns{" "}
            <strong>XP</strong> equal to the Musu that actually reaches you
            after tax, and that same amount is added to the node&apos;s{" "}
            <strong>scavenge bar</strong>. Collecting is not itself a drop
            roll — the bar fills, and you claim the drops in a separate action
            once it holds a full tier. Harvesting feeds your progression on
            more than one front.
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
            <strong>Intensity</strong> is a ramping rate seeded by your{" "}
            <strong>Violence</strong> stat: it starts small and grows every
            minute the ramp is allowed to run. The ramp starts over when you{" "}
            <strong>start a harvest</strong> and whenever you{" "}
            <strong>use an item on the Kami</strong> — feeding included.
            Collecting does not reset it, so you can bank Musu mid-sit without
            losing the ramp. Intensity rewards patience — but the longer you
            camp, the more strain you accumulate and the more exposed you are
            to liquidation.
          </p>
          <p>
            Intensity is also <strong>retroactive</strong>, and that is the
            whole reason long parks pay. The rate is read at the moment your
            harvest is settled and then applied to the entire stretch since
            the last settlement — so an untouched sit is paid at the ramp&apos;s
            <em> highest</em> value across all those hours, not at its average.
            Doubling the time on a node more than doubles the Intensity half of
            the income.
          </p>
          <p>
            Out of the box, Fertility dominates and Intensity is a rounding
            error. But Intensity has its own multiplier
            (<strong>Harvest Intensity Boost</strong> from Guardian and
            Enlightened skills) that can scale it 5x or more. This is the
            engine behind the popular tanky &ldquo;intensity build&rdquo;: a
            high-Health, high-Harmony Kami with intensity skills parks on a
            node for many hours, and its ever-growing Intensity ends up
            out-earning Fertility entirely. Two very different archetypes,
            same two-part formula: fast Power harvesters cash in on Fertility
            with frequent collects; durable tanks let Intensity snowball.
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
          <p>
            Your <strong>uncollected bounty is capped by your current HP</strong>.
            A harvest never accrues more Musu than collecting it would cost in
            strain — so a Kami can never pile up a bounty large enough to starve
            itself. Once your pending bounty hits that ceiling, it stops growing,
            even if your Kami keeps sitting on the node. To keep earning you have
            to collect (which spends HP), let your Kami heal, and start again.
          </p>

          <InfoBox variant="warning">
            Scale of the ceiling: a Kami at the stat floor (50 HP, Harmony 10)
            can hold about <strong>230 Musu</strong> of pending bounty; an
            average roll (90 HP, Harmony 15) about <strong>484</strong>; a
            built tank (240 HP, Harmony 22) about <strong>1,550</strong>.
            Higher Harmony, more Health, and strain-reduction food all raise
            the ceiling — which is the whole game of building a Kami that can
            bank a big session.
          </InfoBox>

          <h3>Recovery While Resting</h3>
          <p>
            When your Kami is resting (not harvesting), it passively regenerates
            HP based on its <strong>Harmony</strong> — around 20 HP per hour at
            average Harmony, so a typical 90-HP Kami needs 4–5 hours for a full
            recharge from empty (a 200-HP tank, most of a day). Your Kami does
            not heal while harvesting. This dead time is why healing food and
            rest-speed bonuses matter as much as raw harvest rate.
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
          <p>
            Claiming is a two-step affair: the claim locks in your rolls, then a
            second <strong>reveal</strong> transaction actually hands you the
            items. If you let the bar run up for a long time, expect to reveal
            more than once &mdash; see{" "}
            <strong>Claiming a Full Bar</strong> in the details tab.
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
              <strong>Time food buffs to your build.</strong> Bounty-boosting
              food (+25% output) only lasts until your next harvest action, so
              on a Power/Fertility Kami it is worth feeding and then collecting
              while the buff is live. On an Intensity build, do the opposite:
              feeding resets the intensity ramp you have been growing all
              session. Feed between sits, not during one.
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
              "Bounty Boost": "base 1.0x, increased by food (+25%)",
            }}
          >
            {`Total Musu per Hour = (Fertility + Intensity) × Bounty Boost`}
          </FormulaBlock>
          <p>
            In practice, Fertility usually dominates for short sessions. Intensity
            becomes more meaningful the longer you stay on a node, but most Kamis
            will hit the HP bounty cap (see{" "}
            <a href="#starve-cutoff">Starve Cutoff</a> below) long before
            Intensity becomes the bigger contributor.
          </p>
          <InfoBox>
            This rate is what your bounty accrues at — but the accrued total is
            then clamped to what your current HP can sustain:{" "}
            <code>Bounty = min(accrued, Max Musu)</code>. See{" "}
            <a href="#starve-cutoff">Starve Cutoff</a> for the cap formula.
          </InfoBox>

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
              "10": "base intensity multiplier",
              "Intensity Boost": "sum of Harvest Intensity Boost from skills (0 with none; +40 is a typical level-32 Guardian investment)",
              "480": "rate divisor",
            }}
          >
            {`Intensity (Musu/hr) = (Violence × 5 + Minutes on Node) × (10 + Intensity Boost) / 480`}
          </FormulaBlock>
          <p>
            Two things grow this number: <strong>time on node</strong> (the
            ramp) and <strong>Intensity Boost</strong> (the multiplier).
            Without any boost, the multiplier is 10/480 and Intensity stays
            marginal. Guardian-tree skills (Patience +5/level, Loyalty +15,
            Dedication +5/level, the Obsession ultimate +25) raise it
            dramatically.
          </p>

          <h3>What Resets the Ramp</h3>
          <p>
            &ldquo;Minutes on Node&rdquo; is measured from the last{" "}
            <strong>intensity reset</strong>, and exactly two things reset it:
          </p>
          <ul>
            <li>
              <strong>Starting a harvest.</strong> A fresh sit begins the ramp
              at zero.
            </li>
            <li>
              <strong>Using an item on the Kami.</strong> Any item — food,
              potion, XP item — zeroes the ramp the moment it is used.
            </li>
          </ul>
          <p>
            Notably, <strong>collecting does not reset it</strong>. You can bank
            accrued Musu mid-sit and the ramp keeps climbing from where it was.
            A collect does settle the harvest, though, which costs you some of
            the retroactive bonus described below — so collect when you need the
            Musu or the HP headroom, not out of habit. Being liquidated ends the
            harvest outright, so the question does not arise there.
          </p>
          <InfoBox variant="warning">
            This is the trap that ruins intensity builds: feeding a parked Kami
            — even a healing candy, even a strain-reduction snack — throws away
            every minute of ramp it had accumulated. If you are running an
            intensity build, feed it <em>between</em> sits, never during one.
          </InfoBox>

          <h3>Intensity Is Retroactive</h3>
          <p>
            Bounty is not integrated minute by minute. When a harvest is
            settled, the game reads the Intensity rate <em>as it stands at that
            moment</em> and multiplies it by the whole elapsed stretch since the
            previous settlement. The consequence is that an untouched sit is
            paid across all of its hours at the ramp&apos;s final, highest
            value — not at its average.
          </p>
          <p>
            That makes the Intensity half of your income grow with the{" "}
            <em>square</em> of the time parked: a 16-hour sit does not earn
            twice what an 8-hour sit earns, it earns roughly four times as
            much. This is the entire economic case for the park-and-forget
            build, and the reason those Kamis are built to survive many
            uninterrupted hours rather than to harvest fast.
          </p>

          <h3>How Intensity Ramps Over Time</h3>
          <p>
            Two real archetypes, side by side. Left: an unboosted Kami with
            Violence 10. Right: a level-32 tank build with Violence 14 and +40
            Intensity Boost from Guardian skills (multiplier 50/480 instead of
            10/480):
          </p>
          <StatTable
            headers={[
              "Time on Node",
              "No boost, Violence 10 (Musu/hr)",
              "Tank build, Violence 14, +40 boost (Musu/hr)",
            ]}
            rows={[
              ["Just started (0 min)", "~1.0", "~7.3"],
              ["1 hour (60 min)", "~2.3", "~13.5"],
              ["4 hours (240 min)", "~6.0", "~32.3"],
              ["8 hours (480 min)", "~11.0", "~57.3"],
              ["16 hours (960 min)", "~21.0", "~107.3"],
            ]}
          />
          <p>
            Compare this to Fertility: a Power-15 Kami on a neutral node earns
            ~22.5 Musu/hr from Fertility, flat, forever. The unboosted column
            never catches that. The tank build passes it around the 2-hour mark
            and is earning several times more by hour 16 — <em>if</em> it can
            survive that long on the node without collecting. That survival
            requirement is why intensity builds stack Health and Harmony first,
            and why they&apos;re built on Guardian skills rather than raw
            Power.
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
            Compare the same Kami on a SCRAP node (full mismatch):
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
            Because Harmony appears in the denominator alongside a base value
            of 20, its impact follows a diminishing returns curve — and the
            band that matters is narrow. Base Harmony starts at 10 with no
            trait contribution at all and reaches 38 on the single best trait
            roll the catalogue allows; the average roll lands near 14. Skills
            add on top of whatever you rolled.
          </p>
          <StatTable
            headers={[
              "Harmony",
              "What it represents",
              "Strain per 100 Musu",
            ]}
            rows={[
              ["10", "Floor — no Harmony from any trait", "22 HP"],
              ["14", "Average trait roll", "20 HP"],
              ["22", "Average roll plus the Guardian Harmony skills", "16 HP"],
              ["38", "Best possible trait roll", "12 HP"],
              ["56", "Best roll + every Harmony skill", "9 HP"],
            ]}
          />
          <p>
            From the floor to the theoretical ceiling, strain per Musu drops by
            well over half — which means the same HP pool harvests more than
            twice the Musu per cycle. That is why high-Harmony Kamis command a
            premium: skills you can respec, but the trait roll is fixed at
            mint and can never be changed.
          </p>

          <h3 id="starve-cutoff">Starve Cutoff (Bounty Cap by HP)</h3>
          <p>
            A harvest&apos;s accrued bounty is <strong>capped</strong> so a Kami
            can never hold more Musu than its current HP can pay for in strain.
            Each sync, the raw bounty is clamped to this <strong>Max Musu</strong>
            ceiling — the exact inverse of the strain formula, solved for the
            largest amount whose strain would not exceed current HP:
          </p>
          <FormulaBlock
            label="Starve Cutoff"
            vars={{
              "Current HP": "your Kami's remaining health points",
              "Harmony": "your Kami's Harmony stat",
              "20": "base buffer added to Harmony",
              "6.5": "base strain rate constant",
              "Strain Modifier": "base 1.0x; food can reduce it (-25%) or increase it (+50%)",
              "floor()": "rounds down to the last whole Musu the cap allows",
            }}
          >
            {`Bounty = min(accrued bounty, Max Musu)

Max Musu = floor(Current HP x (Harmony + 20) / (6.5 x Strain Modifier))`}
          </FormulaBlock>
          <StatTable
            headers={["HP", "Harmony", "Strain Modifier", "Max Musu (cap)"]}
            rows={[
              ["50 (starting)", "10", "1.0x", "~230 Musu"],
              ["50", "30", "1.0x", "~384 Musu"],
              ["100", "10", "1.0x", "~461 Musu"],
              ["50", "10", "0.75x (strain reduction)", "~307 Musu"],
            ]}
          />

          <InfoBox variant="warning">
            Because the cap follows your <em>current</em> HP, it shrinks as you
            take strain. A starting Kami (50 HP, Harmony 10) can hold at most
            ~230 Musu of pending bounty; once it reaches that ceiling the harvest
            stops accruing until you collect and heal. Raising Harmony and
            using strain-reduction food both lift the cap so each session banks
            more before it tops out.
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
              "HP per Hour",
              "0 to full: fresh Kami (90 HP)",
              "0 to full: built tank (200 HP)",
            ]}
            rows={[
              ["10", "18", "~5.0 hours", "~11.1 hours"],
              ["14 (average)", "~20", "~4.4 hours", "~9.8 hours"],
              ["22 (built defensive)", "~25", "~3.6 hours", "~7.9 hours"],
              ["30", "30", "~3.0 hours", "~6.7 hours"],
            ]}
          />
          <p>
            This is the real bottleneck of the harvest-rest cycle: resting a
            drained Kami takes <em>hours</em>, and the bigger your HP pool the
            longer a full recharge takes. Rest-speed bonuses (Resting Recovery
            Boost skills) and healing food exist precisely
            to shorten this dead time — feeding candy is the alternative to
            waiting out the clock.
          </p>
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
              "Cooldown Shift": "modifier from skills and items -- a negative value shortens the wait",
            }}
          >
            {`Cooldown Duration = 180 seconds + Cooldown Shift

Cooldown Shift comes from skills and items (e.g. an Energy Drink) — a
negative shift shortens the wait. Cooldown cannot go below 0 seconds.`}
          </FormulaBlock>

          <h2>Tax</h2>
          <p>
            When you start a harvest you can name <strong>one taxer</strong> —
            another account you designate, such as a service you use or someone
            who referred you — along with the rate they take. That single taxer
            is bound to the harvest at the moment it starts, and receives their
            cut of your Musu each time you collect or stop. There is no way to
            attach a second taxer to the same harvest, and the pairing is
            cleared and re-set every time you start a new one.
          </p>
          <FormulaBlock
            label="Tax"
            vars={{
              "Musu Collected": "gross Musu from this collect or stop action",
              "Tax Rate": "rate set when the harvest starts, capped at 20%",
            }}
          >
            {`Tax Amount = Musu Collected x Tax Rate / 100

Tax Rate: set at harvest start, capped at 20%.
Your net = Collected Musu - Tax Amount.`}
          </FormulaBlock>
          <p>
            Because the taxer is fixed when the harvest starts, anything that
            starts harvests on your behalf is in a position to name itself the
            taxer — that is the usual way a third-party service charges for
            running your Kami. Check who is set before you commit a long sit.
            And when comparing your in-game earnings against the formulas on
            this page, remember they are all gross: your net arrives after tax.
          </p>

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
              [
                "100",
                "Starter nodes (often capped to Kami level ≤15)",
                "Misty Riverside, Tunnel of Trees, Misty Forest Path",
              ],
              ["300", "Advanced nodes", "Blooming Tree"],
              ["500", "Premium nodes", "Scrap Confluence, Guardian Skull"],
            ]}
          />
          <p>
            Higher tier costs mean more harvesting per reward, but premium
            nodes tend to have rarer and more valuable loot. This is a real
            economic decision: players park Kamis on specific nodes purely for
            the scavenge — for example, farming a node whose droptable carries
            a high-demand crafting material can out-earn the Musu itself when
            you sell the drops on the player market.
          </p>

          <h3>Claiming a Full Bar</h3>
          <p>
            A claim does not hand you items directly. It converts your points
            into a fixed number of <strong>rolls</strong> and records them; a
            second <strong>reveal</strong> transaction resolves those rolls
            against a block hash and delivers the loot. Leftover points below one
            full tier stay on the bar.
          </p>
          <FormulaBlock
            label="Claim Rolls"
            vars={{
              "rolls": "how many draws from the node's droptable this claim is worth",
              "points": "scavenge points currently on the node's bar",
              "tierCost": "points per tier for that node (100 to 500)",
              "leftover": "points that remain on the bar after the claim",
            }}
          >
            {`rolls    = floor(points / tierCost)
leftover = points mod tierCost`}
          </FormulaBlock>
          <p>
            Reveals are <strong>capped at 5,000 rolls per transaction</strong>.
            A claim bigger than that is not lost and is not truncated — it simply
            takes several reveal transactions, each chewing through up to 5,000
            rolls until the claim is drained.
          </p>
          <StatTable
            headers={["Claim size", "Reveal transactions needed"]}
            rows={[
              ["Up to 5,000 rolls", "1"],
              ["5,001 - 10,000 rolls", "2"],
              ["12,000 rolls", "3"],
            ]}
          />
          <InfoBox variant="tip">
            Splitting a claim across several reveals costs you nothing in loot.
            Each roll is keyed to its own fixed position inside the claim, so the
            entire set of results is locked in at claim time &mdash; the drops
            you get are identical no matter how the reveals are chunked, and
            there is no way to re-roll a bad batch by splitting differently.
          </InfoBox>
          <InfoBox variant="warning">
            Two reveal rules bite in practice. The block hash a claim depends on
            is only readable for <strong>256 blocks</strong>, so a very large
            claim that you start revealing too late can strand its tail and need
            a community manager to rescue it &mdash; reveal promptly and finish
            what you start. And never pass the same claim twice in a single
            reveal call: a duplicate rejects the whole call rather than being
            skipped.
          </InfoBox>

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
                "Intensity Boost",
                "Food",
                "Increases Intensity growth rate",
                "Until next harvest action",
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
            Food buffs are consumed on your next harvest action — collect, stop,
            or feeding the Kami again. They do not persist through multiple
            collections. On a Fertility build that means feeding and then
            collecting while the buff is live. On an intensity build it means
            the opposite: feeding also zeroes the intensity ramp (see{" "}
            <strong>What Resets the Ramp</strong> above), so a buff eaten
            mid-sit can easily cost more than it pays.
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
            Which stat earns more depends entirely on the build. Power drives
            Fertility — instant, steady, best when you collect often and match
            affinities. Violence seeds Intensity, which is negligible without
            investment but becomes the <em>primary</em> income engine once you
            stack Harvest Intensity Boost skills on a Kami durable enough to
            park for many hours. Rule of thumb: active play and fast cycles →
            Power; unattended long parks on a tanky Kami → Intensity. Trying
            to do both halfway does neither well.
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
            <strong>Setup:</strong> A realistically average Kami — Power 15,
            Violence 14, Harmony 15, 90 max HP — with body=EERIE and
            hand=EERIE, harvesting an EERIE node. No skills or item bonuses.
            Starting at full 90 HP.
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

          <h3>3. Bounty Cap (Starve Cutoff)</h3>
          <FormulaBlock
            variant="example"
            vars={{
              "90": "Kami's current HP",
              "15": "Kami's Harmony stat",
              "20": "base buffer added to Harmony",
              "6.5": "base strain rate constant",
            }}
          >
            {`Max Musu = floor(90 x (15 + 20) / 6.5) = floor(484.6) = 484 Musu`}
          </FormulaBlock>

          <h3>4. How Long Until the Cap?</h3>
          <p>
            At 45 Musu per hour from Fertility, pending bounty would reach the
            484 Musu cap in about 10.7 hours — Intensity (starting at ~1.5
            Musu/hr and ramping) shaves that to roughly 9.5:
          </p>
          <FormulaBlock
            variant="example"
            vars={{
              "484": "bounty cap from step 3",
              "45": "Fertility rate in Musu per hour (from step 2)",
            }}
          >
            {`484 / 45 = ~10.7 hours (a bit under 10 with Intensity ramping)`}
          </FormulaBlock>

          <h3>5. Strain Check</h3>
          <p>
            After the cap, collecting all 484 Musu costs:
          </p>
          <FormulaBlock
            variant="example"
            vars={{
              "484": "total Musu collected",
              "6.5": "base strain rate constant",
              "35": "Harmony (15) + base buffer (20)",
            }}
          >
            {`Strain = ceil(484 x 6.5 / 35) = ceil(89.9) = 90 HP

Collecting the full cap spends all 90 HP. The cap guarantees strain can
never exceed your HP — the bounty stops growing here rather than letting
the Kami starve.`}
          </FormulaBlock>

          <h3>6. Practical Strategy</h3>
          <p>
            In practice, you would <strong>not</strong> harvest to the cap — a
            Kami hovering at low HP with a fat uncollected bounty is exactly
            what predators scan for, and it has no HP left to pay the strain on
            a big collect. Pulling out somewhere in the 250–400 Musu band on
            this Kami leaves it enough health to absorb the strain and to sit
            above a predator&apos;s kill threshold, then it rests a few hours
            (or takes healing food to skip the wait) and goes again.
          </p>
          <p>
            Everything that separates a weak cycle from a strong one is on this
            page: the affinity match sets the Fertility rate, Harmony sets how
            much Musu each point of HP buys, Health sets how big one cycle can
            be, and the resting curve sets how often you can run it.
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
