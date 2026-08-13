import type { Metadata } from "next";
import {
  MechanicPage,
  FormulaBlock,
  StatTable,
  InfoBox,
} from "@/components/mechanic-page";

export const metadata: Metadata = {
  title: "Liquidations",
};

export default function LiquidationsFormulasPage() {
  return (
    <MechanicPage
      title="Liquidation & Combat"
      subtitle="Everything you need to know about killing other Kamis, surviving attacks, and the sacrifice system."
      overview={
        <>
          <h2>The Predator&apos;s Game</h2>
          <p>
            Liquidation is Kamigotchi&apos;s PvP system. When two Kamis are
            harvesting at the same node, the stronger one can kill the weaker one
            and steal part of its harvest. It&apos;s high-risk, high-reward:
            you walk away with Musu and an Obol trophy, but you take damage in
            the process and might leave yourself open to a counter-kill.
          </p>
          <p>
            Liquidation success depends on three factors:{" "}
            <strong>Kill Threshold</strong> (can you actually land the kill),{" "}
            <strong>Recoil Damage</strong> (how much it costs you), and{" "}
            <strong>Musu Gains</strong> (how much loot you walk away with).
          </p>

          <InfoBox variant="tip">
            Think of harvesting nodes as contested territory. The longer a Kami
            harvests, the more its HP drains from strain. At some point it dips
            below the kill threshold and becomes vulnerable. Predators wait for
            that moment; Guardians try to make sure it never comes.
          </InfoBox>

          <h3>When Can You Kill?</h3>
          <p>
            Both Kamis must be actively harvesting on the <strong>same node</strong>.
            You cannot attack while resting, and you cannot attack a Kami that is
            on a different node. Your Kami also needs to be healthy (HP above 0)
            and past any kill cooldown from a previous liquidation.
          </p>
          <p>
            The core question is simple: has the victim&apos;s HP dropped below
            the <strong>kill threshold</strong>? If yes, the kill goes through.
            If not, the victim is safe — for now.
          </p>

          <h3>What Decides the Kill Threshold?</h3>
          <p>
            The threshold is a percentage of the victim&apos;s max HP, driven by
            the ratio of your <strong>Violence</strong> to their{" "}
            <strong>Harmony</strong>. More Violence relative to their Harmony
            means a higher threshold, which means they become killable earlier in
            their harvest. But the relationship follows an S-curve with a hard
            ceiling: before affinity modifiers, the threshold tops out
            at <strong>40% of the victim&apos;s max HP</strong>, and equal
            Violence-vs-Harmony lands at 20%. Violence alone can never buy you
            a guaranteed kill: against an attacker carrying no threshold-shift
            bonuses, a healthy rested Kami is out of reach. Flat threshold
            shifts from skills and gear are the one thing that moves that
            ceiling in either direction — see{" "}
            <strong>Threshold Shift vs Ratio Shift</strong> in the details.
          </p>
          <p>
            Affinity matchups also matter — and combat uses a{" "}
            <strong>rock-paper-scissors triangle</strong>, unlike harvesting&apos;s
            &ldquo;match the node&rdquo; rule. Your <strong>hand affinity</strong>{" "}
            attacks the victim&apos;s <strong>body affinity</strong>:
            EERIE beats SCRAP, SCRAP beats INSECT, INSECT beats EERIE.
          </p>
          <StatTable
            headers={["Your hand vs their body", "Threshold Multiplier"]}
            rows={[
              ["Advantage (e.g. EERIE hands vs SCRAP body)", "1.5x — much easier kill"],
              ["Disadvantage (e.g. SCRAP hands vs EERIE body)", "0.5x — very hard kill"],
              ["NORMAL hands vs NORMAL body", "1.2x — small edge"],
              ["Anything else (neutral)", "1.0x"],
            ]}
          />
          <p>
            The 3x swing between advantage and disadvantage is bigger than any
            realistic stat difference — a predator&apos;s hand type effectively
            decides which bodies it hunts.
          </p>

          <h3>What Happens When You Kill</h3>
          <p>
            A successful kill triggers a chain of consequences for both sides:
          </p>
          <StatTable
            headers={["For the Killer", "For the Victim"]}
            rows={[
              [
                "Steals a portion of the victim's harvest (spoils)",
                "Keeps a portion of their own harvest (salvage)",
              ],
              [
                "Receives 1 Obol as a trophy",
                "Any unsalvaged, unspoiled Musu is destroyed",
              ],
              [
                "Takes recoil damage — karma multiplied by the strain cost of the loot just taken, modified by affinity",
                "Kami dies — state becomes DEAD, HP drops to 0",
              ],
              [
                "Enters a kill cooldown",
                "All temporary bonuses are cleared",
              ],
            ]}
          />

          <InfoBox variant="warning">
            Killing is not free, and the bill scales with the payday. Recoil is
            built on the strain <em>you</em> would pay to harvest the loot you
            just stole, so the fatter the steal, the harder the hit. On top of
            that it scales on a <strong>smooth curve</strong> with the
            victim&apos;s Violence against your Harmony — the stronger the
            victim relative to you, the more punishment you take. Affinity
            matters too: the defender&apos;s hand affinity vs your body affinity
            can raise or lower recoil. Take a rich, high-Violence target on a
            bad matchup and you may lose so much HP that someone else can
            immediately liquidate you. Check the target&apos;s stats, affinity,
            and how long it has been sitting before committing.
          </InfoBox>

          <h3>What Predation Actually Pays</h3>
          <p>
            There is a hard ceiling on what any one kill can be worth, and it
            is worth understanding before you build around predation. A
            victim&apos;s uncollected bounty can never exceed what its own HP
            could pay for in strain, so the pot you are stealing from is
            bounded by the victim&apos;s Health and Harmony — five-digit steals
            are not a matter of luck, they are impossible. You then take only
            a share of what is left after the victim&apos;s salvage.
          </p>
          <p>
            That makes liquidation income spiky and capped, where harvesting is
            steady. The rest of the predator economy is the{" "}
            <strong>Obol</strong>: every kill pays exactly 1, 5 craft a Wonder
            Egg, and the Wonder Egg is the only source of several items —
            the Heart Crystals, the Teardrop Jewels, the Ash Pearl. Predation
            is also the enforcement mechanism that keeps everyone else honest
            about HP management.
          </p>

          <h3>Death and Revival</h3>
          <p>
            Only two things actually kill a Kami: being{" "}
            <strong>liquidated</strong>, or being <strong>sacrificed</strong>.
            Running out of HP does not. A harvesting Kami whose HP hits zero
            stays in the harvesting state, but it cannot stop or collect
            — it is stuck on the node, unable to bank its own bounty, and
            liquidatable by anyone who can reach it. That stranded state is
            usually how the death actually arrives.
          </p>
          <p>
            A Kami that does die enters the DEAD state and is locked out of
            harvesting, levelling, equipping, being sent to another account,
            and the marketplace. There are two ways back:{" "}
            <strong>33 Onyx Shards</strong> (revives with 33 HP), or a revive
            item used on it — a <strong>Red Ribbon Gummy</strong> (10 HP) or a{" "}
            <strong>Melkarth&apos;s Heroic Awakening Spell Card</strong>{" "}
            (50 HP). Items can be used on a dead Kami, which is what makes the
            item route work at all. Either way the Kami returns to resting well
            short of full and heals passively from there.
          </p>

          <h3>Skills That Shape Combat</h3>
          <p>
            The <strong>Predator</strong> skill tree boosts your kill power,
            spoils ratio, and cooldown speed. The <strong>Guardian</strong> tree
            improves your defense threshold, salvage rate, and survivability.
            Various bonuses from skills and equipment can shift any encounter
            — check the Skill Trees page for specifics.
          </p>

          <h2>Sacrifice</h2>
          <p>
            Sacrifice is entirely separate from PvP. You voluntarily and{" "}
            <strong>permanently destroy</strong> one of your Kamis in exchange
            for a random item reward. The Kami&apos;s NFT is burned to a dead
            address — unlike normal death, there is no revival. It is gone
            forever.
          </p>
          <p>
            Why would anyone do this? Because the sacrifice droptables are the
            source of <strong>pet equipment</strong> — the wearable items
            (Critters, Ledgers, Wraths, Contempt masks, and the rest) that give
            Kamis their equipment bonuses. In practice, players buy cheap
            low-stat Kamis off the market specifically as sacrifice fodder to
            gear up their real roster.
          </p>
          <p>
            The process uses a commit-reveal pattern: you commit the sacrifice
            (the Kami is burned immediately), then reveal after a short delay to
            receive your random item from the sacrifice droptable. A built-in{" "}
            <strong>pity system</strong> guarantees better rewards at regular
            intervals:
          </p>
          <StatTable
            headers={["Milestone", "Reward Quality"]}
            rows={[
              ["Every 100th sacrifice", "Guaranteed rare or better"],
              ["Every 20th sacrifice", "Guaranteed uncommon or better"],
              ["All other sacrifices", "Normal droptable"],
            ]}
          />
          <p>
            When milestones overlap (e.g., sacrifice #100 hits both the 100th
            and 20th marks), you get the better droptable.
          </p>
          <p>
            The odds are worth internalising before you buy fodder in bulk. An
            ordinary sacrifice pays out a <strong>Common</strong> piece about{" "}
            <strong>78%</strong> of the time, an Uncommon about{" "}
            <strong>20%</strong>, and a Rare only{" "}
            <strong>2.4%</strong> &mdash; roughly one in 41. The pity milestones
            exist because that Rare rate alone would be brutal: they are what
            makes grinding sacrifices a plan rather than a prayer.
          </p>
          <StatTable
            headers={["Sacrifice", "Common", "Uncommon", "Rare"]}
            rows={[
              ["Ordinary", "78%", "19.5%", "2.4%"],
              ["Every 20th (uncommon pity)", "—", "88.9%", "11.1%"],
              ["Every 100th (rare pity)", "—", "—", "100%"],
            ]}
          />
          <InfoBox variant="tip">
            Read down the columns and the grind plan writes itself: across 100
            sacrifices you bank four guaranteed Uncommon-or-better rolls (at 20,
            40, 60 and 80) plus one guaranteed Rare at 100, on top of whatever
            the ordinary rolls happen to give. If a specific Rare piece is your
            goal, the 100th sacrifice is the one that pays &mdash; check your
            counter before you spend.
          </InfoBox>
        </>
      }
      details={
        <>
          {/* ───────────────────── KILL THRESHOLD ───────────────────── */}

          <h2>Kill Threshold</h2>
          <p>
            A victim can be killed when their current HP falls below the
            calculated kill threshold. The full formula is:
          </p>
          <FormulaBlock
            label="Kill Threshold"
            vars={{
              "killThreshold": "HP value below which the victim can be killed",
              "animosity": "base threshold factor derived from Violence-to-Harmony ratio (S-curve, 0% to ~40%)",
              "efficacy": "affinity matchup multiplier plus skill/equipment combat bonuses",
              "thresholdShift": "flat bonus or penalty from ATK/DEF_THRESHOLD_SHIFT skills and gear",
              "maxHP": "victim's maximum Health Points",
              "precision": "internal scaling constant (1,000) used for fixed-point math",
            }}
          >
            {`killThreshold = (animosity × efficacy + thresholdShift) × maxHP / precision`}
          </FormulaBlock>
          <p>
            If the combined value{" "}
            <code>(animosity × efficacy + thresholdShift)</code> is negative,
            the threshold is 0 — meaning the victim is unkillable regardless of
            their current HP. Let&apos;s break down each piece.
          </p>

          {/* ─── Animosity ─── */}

          <h3>Animosity — Violence vs Harmony</h3>
          <p>
            Animosity determines what fraction of the victim&apos;s max HP
            becomes the kill threshold. It uses a{" "}
            <strong>Gaussian CDF</strong> as a mathematical S-curve function
            applied to the natural log of the Violence/Harmony ratio. There is
            no randomness — the result is fully deterministic. The output
            ranges from <strong>0% to ~40%</strong> based on how much your
            Violence outweighs their Harmony:
          </p>
          <FormulaBlock
            label="Animosity"
            vars={{
              "animosity": "resulting threshold factor (0% to ~40% of max HP)",
              "NormCdf": "Gaussian CDF — used here purely as an S-curve function, not for probability",
              "ln": "natural logarithm of the stat ratio",
              "yourViolence": "attacker's total Violence stat",
              "theirHarmony": "victim's total Harmony stat",
              "ratio": "ceiling multiplier that caps the maximum animosity output",
              "precision": "internal scaling constant (1,000) used for fixed-point math",
            }}
          >
            {`animosity = NormCdf( ln(yourViolence / theirHarmony) ) × ratio / precision`}
          </FormulaBlock>
          <ul>
            <li>
              When Violence equals Harmony, the CDF returns 50% of its range —
              a moderate base threshold.
            </li>
            <li>
              When Violence is much higher, the CDF approaches its ceiling —
              but never quite reaches 100%.
            </li>
            <li>
              When Violence is much lower, the CDF approaches zero — making the
              kill threshold near 0 HP.
            </li>
          </ul>

          <InfoBox variant="tip">
            The S-curve shape is the key insight. Small stat advantages when
            Violence and Harmony are close produce meaningful differences. But
            once you massively outstat someone, adding more Violence gives
            diminishing returns. The system rewards smart matchups over raw stat
            stacking.
          </InfoBox>

          {/* ─── Efficacy ─── */}

          <h3>Threshold Efficacy — Affinity and Bonus Modifiers</h3>
          <p>
            Threshold efficacy adjusts the kill threshold based on the affinity
            matchup between your hand and the victim&apos;s body, plus any
            combat bonuses from skills and equipment. (This is distinct from{" "}
            <em>Recoil Efficacy</em>, which uses the opposite affinity
            direction — see below.)
          </p>
          <FormulaBlock
            label="Efficacy"
            vars={{
              "efficacy": "final multiplier applied to animosity before threshold calculation",
              "baseEfficacy": "default efficacy value before any modifiers",
              "affinityShift": "shift from the attacker-hand vs victim-body matchup on the combat triangle",
              "atkBonus": "ATK_THRESHOLD_RATIO bonus on the attacker from Predator skills and equipment",
              "defBonus": "DEF_THRESHOLD_RATIO bonus on the victim from Guardian skills and equipment",
              "advantaged or NORMAL vs NORMAL": "the only two matchups on which the ratio bonuses apply at all",
            }}
          >
            {`efficacy = baseEfficacy + affinityShift

  where affinityShift, by matchup, is:

    Advantaged        +500 + (atkBonus − defBonus)
    NORMAL vs NORMAL  +200 + (atkBonus − defBonus)
    Neutral              0   (ratio bonuses have NO effect)
    Disadvantaged     −500   (ratio bonuses have NO effect)`}
          </FormulaBlock>
          <StatTable
            headers={[
              "Your hand vs their body",
              "Efficacy Shift",
              "Resulting Multiplier",
              "Do ratio bonuses apply?",
            ]}
            rows={[
              [
                "Advantage (EERIE→SCRAP, SCRAP→INSECT, INSECT→EERIE)",
                "+500 + (atkBonus − defBonus)",
                "1.5x, moved by the bonuses",
                "Yes",
              ],
              [
                "NORMAL vs NORMAL",
                "+200 + (atkBonus − defBonus)",
                "1.2x, moved by the bonuses",
                "Yes",
              ],
              ["Any other combination (neutral)", "0", "1.0x", "No"],
              ["Disadvantage (the reverse direction)", "−500", "0.5x", "No"],
            ]}
          />
          <p>
            Note this is a <strong>single check</strong> — attacker&apos;s hand
            vs victim&apos;s body on the combat triangle — unlike harvesting,
            which checks body and hand separately against the node.
          </p>
          <InfoBox variant="warning">
            The ratio bonuses are <strong>conditional, not universal</strong>.
            The threshold calculation picks exactly one shift slot based on the
            matchup, and the ATK/DEF_THRESHOLD_RATIO difference is only written
            into the advantaged and NORMAL-vs-NORMAL slots. On a neutral or
            disadvantaged matchup those bonuses contribute nothing at all.
            <br /><br />
            For builds this cuts both ways. Ratio skills do nothing for a
            predator attacking into a disadvantage, so they are only worth
            buying if you intend to pick fights your hand type wins. And a
            defender&apos;s DEF_THRESHOLD_RATIO protects them only against
            attackers who already have the type advantage — against a neutral
            attacker it is dead weight. If you want protection that always
            applies, that is the <em>shift</em> line, not the ratio line.
          </InfoBox>

          {/* ─── Threshold Shifts ─── */}

          <h3>Threshold Shift vs Ratio Shift</h3>
          <p>
            Skills and equipment can modify the kill threshold in two distinct
            ways, and understanding the difference matters for builds:
          </p>
          <FormulaBlock
            label="Threshold Shift"
            vars={{
              "thresholdShift": "net flat modifier added to the kill threshold after the animosity-efficacy product",
              "ATK_THRESHOLD_SHIFT": "attacker's flat threshold bonus from Predator skills and equipment",
              "DEF_THRESHOLD_SHIFT": "victim's flat threshold reduction from Guardian skills and equipment",
              "shiftPrecision": "scaling constant that converts shift values into the threshold's numeric range",
            }}
          >
            {`thresholdShift = (ATK_THRESHOLD_SHIFT − DEF_THRESHOLD_SHIFT) × shiftPrecision`}
          </FormulaBlock>
          <StatTable
            headers={["Modifier Type", "How It Works", "Best For"]}
            rows={[
              [
                "Ratio (ATK/DEF_THRESHOLD_RATIO)",
                "Folded into efficacy, then multiplied with animosity — but only on advantaged and NORMAL-vs-NORMAL matchups. Ignored entirely on neutral and disadvantaged ones.",
                "Predators who pick targets their hand type counters, and defenders worried about attackers with the type advantage",
              ],
              [
                "Shift (ATK/DEF_THRESHOLD_SHIFT)",
                "Added flat after the multiplication — independent of stat ratios and of the affinity matchup, so it always applies",
                "Guaranteeing kills regardless of stat matchup, or blocking kills entirely on defense",
              ],
            ]}
          />

          <InfoBox>
            Defensive threshold shift is particularly powerful. A large enough
            DEF_THRESHOLD_SHIFT can make{" "}
            <code>animosity × efficacy + shift</code> go negative, setting the
            threshold to 0 — making you unkillable even against a much stronger
            attacker. This is the Guardian&apos;s ultimate defense.
          </InfoBox>

          {/* ─── Worked Example ─── */}

          <h3>Worked Example: Kill Threshold</h3>
          <p>
            Suppose an attacker with 30 Violence and EERIE hands targets a
            SCRAP-bodied victim with 20 Harmony and 200 max HP (type
            advantage), with no skill bonuses on either side:
          </p>
          <FormulaBlock
            label="Example Calculation"
            variant="example"
            vars={{
              "30": "attacker's Violence stat in this example",
              "20": "victim's Harmony stat in this example",
              "200": "victim's maximum HP in this example",
              "NormCdf": "Gaussian CDF (S-curve)",
              "1.5": "efficacy multiplier for a hand-vs-body type advantage",
            }}
          >
            {`Step 1 — Animosity:
  ln(30 / 20) = ln(1.5) ≈ 0.405
  NormCdf(0.405) ≈ 0.657  (65.7% of the S-curve)
  animosity = 0.657 × 40% ceiling ≈ 26.3% of the victim's max HP

Step 2 — Efficacy (type advantage, no bonuses):
  efficacy = 1.0 + 0.5 = 1.5

Step 3 — Threshold:
  threshold = 26.3% × 1.5 × 200 HP ≈ 79 HP

The victim becomes killable once harvest strain drags it below
~79 of its 200 HP. With a type DISADVANTAGE instead, the same
numbers give only ~26 HP — the victim is nearly starving before
it's ever in danger. That 3x swing is the triangle at work.`}
          </FormulaBlock>
          <p>
            Compare: if the attacker had only 12 Violence against the same
            20 Harmony victim:
          </p>
          <FormulaBlock
            label="Weaker Attacker"
            variant="example"
            vars={{
              "12": "attacker's Violence stat (weaker than the victim's Harmony)",
              "20": "victim's Harmony stat",
              "NormCdf": "Gaussian CDF (S-curve)",
            }}
          >
            {`ln(12 / 20) = ln(0.6) ≈ -0.511
NormCdf(-0.511) ≈ 0.305  (30.5% of the S-curve)
animosity ≈ 0.305 × 40% ≈ 12.2% of max HP

With a neutral affinity matchup (efficacy 1.0), the same 200-HP
victim is only killable below ~24 HP — the attacker would have to
catch it moments from starving anyway.`}
          </FormulaBlock>

          {/* ─── Diminishing Violence ─── */}

          <h3>What Violence Buys You (Real Ranges)</h3>
          <p>
            Because animosity uses the Gaussian CDF, every point of Violence
            matters most when you and the target are evenly matched. Here is the
            playing field the rules define: base Violence starts at 10 with no
            trait contribution and reaches 42 on the best trait roll available,
            with the average roll near 14. Skills add on top — the Predator tree
            alone offers +5 from Aggression, +3 from Warmonger and +5 from the
            Warlord ultimate.
          </p>
          <p>
            Take as the defender a Kami with an average Harmony roll (14) that
            has bought the Guardian tree&apos;s cheap Harmony skills
            (Defensiveness +5, Anxiety +3) — 22 effective Harmony. Against that
            defender:
          </p>
          <StatTable
            headers={[
              "Your Violence",
              "Profile",
              "Threshold (% of victim's max HP, neutral affinity)",
            ]}
            rows={[
              ["10", "Floor — no Violence from any trait", "~8.6%"],
              ["15", "Average trait roll", "~14%"],
              ["22", "Even match with this defender", "20%"],
              ["30", "Built predator", "~25%"],
              ["40", "Near the top of the trait range", "~29%"],
            ]}
          />
          <p>
            The spread from an average trait roll to the top of the trait
            range is 14% → 29% — roughly doubling the danger zone. But
            notice the affinity lesson from the worked example above: a
            hand-vs-body type advantage multiplies the threshold by 1.5x (and
            a disadvantage halves it — a 3x swing), which outweighs any
            realistic Violence difference. Type advantage beats stat stacking.
          </p>

          <InfoBox variant="tip">
            Practical guidance straight from these curves: 20+ base Violence
            is the bar for a serious predator, every point up to ~1.5x the
            target&apos;s Harmony pays well, and picking targets whose body
            type your hands counter is worth more than any single stat point.
            Scout the victim, not just your own sheet.
          </InfoBox>

          {/* ───────────────────── LOOT ───────────────────── */}

          <h2>Salvage — What the Victim Keeps</h2>
          <p>
            When your Kami is killed, you do not lose everything. A portion of
            your uncollected harvest bounty is salvaged to your account as Musu,
            and your Kami earns XP equal to the salvage amount:
          </p>
          <FormulaBlock
            label="Salvage"
            vars={{
              "salvageRatio": "percentage of the bounty the victim keeps (capped at 100%)",
              "victimPower": "the killed Kami's total Power stat — 1 point = 1% kept",
              "DEF_SALVAGE_RATIO": "bonus salvage from Guardian skills and defensive equipment",
              "salvage": "final Musu amount the victim retains",
              "bounty": "victim's total uncollected harvest Musu at the time of death",
            }}
          >
            {`salvageRatio = victimPower × 1%  +  DEF_SALVAGE_RATIO bonuses

salvage = bounty × salvageRatio      (capped at 100% of bounty)`}
          </FormulaBlock>
          <p>
            With production config values, the formula collapses to something
            memorable: <strong>each point of the victim&apos;s Power saves 1%
            of the bounty</strong>, plus any DEF_SALVAGE_RATIO bonuses from
            Guardian skills. A Kami on an average Power roll (~15) keeps about 15% of
            what it was carrying; a high-Power harvester (Power 30) keeps 30%.
            Your Power investment pays off even in death.
          </p>

          <h4>Salvage Example</h4>
          <FormulaBlock
            label="Example"
            variant="example"
            vars={{
              "16": "victim's Power stat — a shade above the average roll",
              "1,500": "victim's uncollected bounty in Musu (a fat but realistic target)",
            }}
          >
            {`A Power-16 Kami is killed sitting on a 1,500 Musu bounty.
No salvage skill bonuses:

  salvageRatio = 16 × 1% = 16%
  salvage = 1,500 × 16% = 240 Musu

The victim's account receives 240 Musu, and the dead Kami earns
240 XP — a small consolation for dying.`}
          </FormulaBlock>

          <h2>Spoils — What the Killer Gets</h2>
          <p>
            The killer steals a portion of the remaining bounty (after salvage is
            deducted) and adds it to their own harvest bounty:
          </p>
          <FormulaBlock
            label="Spoils"
            vars={{
              "spoilsRatio": "percentage of the remaining bounty the killer steals (capped at 100%)",
              "45": "base spoils percentage before Power",
              "attackerPower": "the killer's total Power stat — 1 point = +1% stolen",
              "ATK_SPOILS_RATIO": "bonus spoils from Predator skills and offensive equipment",
              "spoils": "final Musu amount added to the killer's harvest bounty",
              "bounty": "victim's total uncollected harvest Musu at the time of death",
              "salvage": "Musu already claimed by the victim (subtracted before spoils)",
            }}
          >
            {`spoilsRatio = (45 + attackerPower) × 1%  +  ATK_SPOILS_RATIO bonuses

spoils = (bounty − salvage) × spoilsRatio      (capped at 100% of remainder)`}
          </FormulaBlock>
          <p>
            Again the production numbers make it concrete: the killer steals a
            base <strong>45% plus 1% per point of their own Power</strong> from
            what&apos;s left after salvage. A predator on an average Power roll (~15)
            takes ~60% of the remainder; Predator-tree ATK_SPOILS_RATIO skills
            push it higher. Note that spoils land in your <em>harvest
            bounty</em>, not directly in your inventory — you still need to
            collect (and pay the strain) to bank the stolen Musu.
          </p>

          <InfoBox>
            Whatever is left after salvage and spoils is destroyed. The full
            equation is:{" "}
            <strong>bounty = salvage + spoils + destroyed</strong>. Neither side
            gets 100% — PvP always burns some Musu from the economy.
          </InfoBox>

          <h4>Spoils Example</h4>
          <FormulaBlock
            label="Example"
            variant="example"
            vars={{
              "1,500": "victim's total uncollected bounty (from the salvage example)",
              "240": "Musu already salvaged by the victim",
              "20": "attacker's Power stat — a decently built predator",
            }}
          >
            {`Continuing the example: 1,500 Musu bounty, victim salvaged 240.
The attacker has Power 20 and no spoils skills:

  remaining = 1,500 − 240 = 1,260
  spoilsRatio = (45 + 20) × 1% = 65%
  spoils = 1,260 × 65% = 819 Musu

819 Musu joins the attacker's own harvest bounty, the remaining
441 is destroyed, and the attacker banks 1 Obol. Note that the
attacker has not banked the 819 yet: it sits in their harvest
bounty, and collecting it will cost them strain on top of the
recoil they already took.`}
          </FormulaBlock>

          {/* ───────────────────── RECOIL ───────────────────── */}

          <h2>Recoil Damage to the Attacker</h2>
          <p>
            Every kill costs the attacker HP. Recoil is built from two
            ingredients: <strong>karma</strong> (the victim fighting back) and{" "}
            <strong>the strain on the spoils</strong> — the HP cost the killer
            would have paid to harvest the loot it just took. Together they
            determine how much HP you lose for committing the kill.
          </p>
          <InfoBox variant="warning">
            The strain in the recoil formula is <strong>not</strong> your
            accumulated harvest damage. It is computed fresh, on your own
            Harmony, against the <em>spoils from this kill</em>. Recoil
            therefore scales with the size of the steal, not with how long you
            had been sitting on the node.
          </InfoBox>

          <h3>Karma — The Victim Hits Back</h3>
          <p>
            Karma is a <strong>Gaussian CDF-based multiplier</strong> that
            scales recoil damage. It reverses the stat check: the{" "}
            <em>victim&apos;s</em> Violence vs <em>your</em> Harmony. Being an
            S-curve rather than a straight line, it scales recoil gradually
            instead of snapping at a hard cutoff.
          </p>
          <FormulaBlock
            label="Karma"
            vars={{
              "karma": "resulting recoil multiplier (~0 to ratio) — NOT raw HP damage",
              "NormCdf": "Gaussian CDF — same deterministic S-curve as animosity",
              "ln": "natural logarithm of the stat ratio",
              "victimViolence": "the killed Kami's total Violence stat — higher means more karma",
              "attackerHarmony": "the killer's total Harmony stat — higher absorbs more karma",
              "ratio": "ceiling multiplier that caps the maximum karma output",
              "precision": "internal scaling constant (1,000) used for fixed-point math",
            }}
          >
            {`karma = NormCdf( ln(victimViolence / attackerHarmony) ) × ratio / precision`}
          </FormulaBlock>
          <StatTable
            headers={["Factor", "What It Means"]}
            rows={[
              [
                "victimViolence",
                "The victim's total Violence — high-Violence victims deal more karma",
              ],
              [
                "attackerHarmony",
                "Your total Harmony — higher Harmony absorbs more karma",
              ],
              [
                "S-curve shape",
                "Killing a much stronger Kami is very risky (karma near max). Killing a much weaker one is safer (karma near zero). No hard cutoff.",
              ],
            ]}
          />
          <InfoBox variant="info">
            Because the curve is Gaussian, karma scales{" "}
            <strong>smoothly</strong> with no cutoff anywhere: it tapers off
            gradually instead of falling to zero. Even weak victims deal a small
            amount of karma, and very strong victims are punishing without being
            unbounded.
          </InfoBox>

          <h3>Recoil Efficacy — Affinity Affects Recoil</h3>
          <p>
            Recoil efficacy is an affinity-based modifier that adjusts recoil
            damage. It checks the <strong>defender&apos;s hand affinity</strong>{" "}
            vs the <strong>attacker&apos;s body affinity</strong> — the{" "}
            <em>opposite direction</em> from the kill threshold efficacy check.
          </p>
          <FormulaBlock
            label="Recoil Efficacy"
            vars={{
              "recoilEfficacy": "affinity nudge added to karma before multiplication — floored at 0",
              "baseEfficacy": "default recoil efficacy value before affinity modifiers",
              "affinityShift": "shift from the defender's hand vs attacker's body matchup",
            }}
          >
            {`recoilEfficacy = max(0, baseEfficacy + affinityShift)`}
          </FormulaBlock>
          <StatTable
            headers={["Defender's hand vs attacker's body", "Shift", "Meaning"]}
            rows={[
              [
                "Advantaged (e.g., defender EERIE hand vs attacker SCRAP body)",
                "+1000",
                "Recoil nudge doubles (1.0 → 2.0) — attacker bleeds much more",
              ],
              [
                "Disadvantaged (the reverse triangle edge)",
                "−1000",
                "Recoil nudge floors at 0 — the safest possible target",
              ],
              [
                "Neutral (no triangle edge, or same type)",
                "0",
                "Baseline nudge (1.0)",
              ],
              [
                "NORMAL vs NORMAL",
                "+400",
                "Special case — mild increase (1.4)",
              ],
            ]}
          />
          <InfoBox variant="tip">
            This is a whole layer of defense that has nothing to do with stats. A
            defender with the right hand affinity makes an attacker pay more
            recoil no matter how well built the attacker is. When scouting
            targets, check their hand affinity against your body — not just
            their Violence.
          </InfoBox>

          <h3>Total Recoil</h3>
          <p>
            Your total HP loss combines karma and recoil efficacy as{" "}
            <strong>multiplicative factors</strong> with the spoils strain:
          </p>
          <FormulaBlock
            label="Recoil"
            vars={{
              "karma": "Gaussian CDF multiplier from victim's Violence vs your Harmony (see above)",
              "recoilEfficacy": "affinity-based nudge from defender's hand vs your body (see above)",
              "spoilsStrain": "the strain YOU would take harvesting the spoils this kill just handed you — the ordinary strain formula, run on your Harmony against the stolen Musu",
              "boost": "overall recoil multiplier: base + ATK_RECOIL_BOOST (floored at 0)",
              "ATK_RECOIL_BOOST": "bonus from the attacker's equipment — can reduce recoil taken",
              "recoil": "final HP lost by the attacker after the kill",
              "precision": "internal scaling constant used for fixed-point math",
            }}
          >
            {`spoilsStrain = ceil(spoils x 6.5 x Strain Modifier / (your Harmony + 20))

recoil = (karma + recoilEfficacy) × spoilsStrain × boost / precision

boost = max(0, baseBoost + ATK_RECOIL_BOOST)`}
          </FormulaBlock>
          <p>
            Karma and recoil efficacy are <strong>additive</strong> with each
            other, then <strong>multiplicative</strong> with the spoils strain
            and the boost. Read the consequences carefully, because they are not
            the obvious ones:
          </p>
          <ul>
            <li>
              <strong>The bigger the steal, the bigger the recoil.</strong>{" "}
              Recoil is proportional to the spoils. A fat victim is a more
              expensive kill, not a free one — the payday and the bill arrive
              together.
            </li>
            <li>
              <strong>Harmony pays twice.</strong> It shrinks karma{" "}
              <em>and</em> it shrinks the spoils strain, since it sits in the
              denominator of the strain formula. It is the single best defensive
              investment a predator can make.
            </li>
            <li>
              <strong>A Kami is at its most vulnerable right after its own
              kill.</strong> It has just taken the recoil, it is still parked on
              the node, and the spoils have been added to its own uncollected
              bounty — which it will have to pay real strain on when it finally
              collects. Low HP plus a bounty that just grew is precisely the
              profile predators hunt. Chaining kills is exactly the moment a
              third party gets a free one.
            </li>
          </ul>

          <h4>Recoil Example</h4>
          <FormulaBlock
            label="Example"
            variant="example"
            vars={{
              "15": "victim's Violence stat (an average trait roll)",
              "35": "victim's Violence stat (strong predator)",
              "20": "attacker's Harmony stat in this example",
              "NormCdf": "Gaussian CDF (S-curve) used for karma calculation",
            }}
          >
            {`You kill an average-roll harvester (Violence 15) while you have 20 Harmony.

  karma = NormCdf( ln(15 / 20) ) × ratio / precision
       = NormCdf(-0.29) ≈ low multiplier (you outstat the victim)
  recoilEfficacy = affinity nudge (depends on hand/body matchup)
  spoilsStrain   = your strain cost on the Musu this kill just handed you
  recoil = (karma + recoilEfficacy) × spoilsStrain × boost / precision

Next, you kill a strong predator (Violence 35) with the same 20 Harmony:

  karma = NormCdf( ln(35 / 20) ) × ratio / precision
       = NormCdf(0.56) ≈ high multiplier (victim hits back hard)

Karma never drops to exactly zero — the S-curve just makes it
very small when your Harmony exceeds the victim's Violence.`}
          </FormulaBlock>

          {/* ─── Harmony vs Health analysis ─── */}

          <h3>Harmony vs Health for Predators</h3>
          <p>
            Predator-focused Kamis face an interesting trade-off between
            investing in Harmony vs raw Health:
          </p>
          <StatTable
            headers={["Strategy", "Advantage", "Risk"]}
            rows={[
              [
                "High Harmony",
                "Reduces karma taken per kill — can chain kills safely",
                "Does not directly increase HP pool; still vulnerable if strain is high",
              ],
              [
                "High Health",
                "Larger HP buffer absorbs recoil — survive even with heavy karma",
                "Still takes full karma damage each kill, limiting sustained aggression",
              ],
              [
                "Balanced",
                "Moderate karma reduction + reasonable HP buffer",
                "Neither best at chaining kills nor best at tanking single large hits",
              ],
            ]}
          />

          <InfoBox variant="tip">
            For serial killers who plan to liquidate multiple targets in one
            harvest session, Harmony is usually better. Each kill costs less HP
            because karma is reduced. For Kamis that do one big kill then
            collect, Health gives a safer margin against being counter-killed.
          </InfoBox>

          {/* ───────────────────── DEATH & REVIVAL ───────────────────── */}

          <h2>Death and Revival</h2>
          <p>
            Death has exactly two causes: <strong>liquidation</strong> and{" "}
            <strong>sacrifice</strong>. Nothing else sets a Kami to DEAD —
            in particular, draining to 0 HP does not.
          </p>
          <InfoBox variant="warning">
            A harvesting Kami at 0 HP is <em>not</em> dead. It stays in the
            harvesting state, but every action that needs a healthy Kami now
            fails — including stop and collect. It cannot bank the bounty it is
            sitting on, it cannot leave the node, and it stays there,
            liquidatable, until someone takes it. Watch your HP against the cap
            rather than assuming a starved Kami simply stops.
          </InfoBox>
          <StatTable
            headers={["What Dead Kamis Cannot Do", "What Still Works"]}
            rows={[
              ["Harvest at nodes", "Items can be used on them — this is how revive items work"],
              ["Level up", "Quests are account-scoped and are not blocked by a Kami's state"],
              ["Equip or unequip items", ""],
              ["Be sent to other accounts", ""],
              ["Enter the marketplace", ""],
            ]}
          />

          <h3>Revival</h3>
          <StatTable
            headers={["Route", "Cost", "HP restored"]}
            rows={[
              ["Onyx revive", "33 Onyx Shards", "33 HP"],
              ["Red Ribbon Gummy", "One item", "10 HP"],
              ["Melkarth's Heroic Awakening Spell Card", "One item", "50 HP"],
            ]}
          />
          <StatTable
            headers={["Revival Detail", "Value"]}
            rows={[
              ["HP after revival", "A flat amount, regardless of max health"],
              ["State after revival", "RESTING"],
              ["Stats affected", "None — Power, Violence, Harmony all unchanged"],
              ["Healing", "Passive metabolism healing begins immediately"],
            ]}
          />
          <p>
            Revival is expensive and leaves you fragile. A freshly revived Kami
            is nowhere near full and needs time to heal back up before it can
            safely return to harvesting. Factor revival costs into your risk
            assessment before engaging in PvP.
          </p>

          {/* ───────────────────── SACRIFICE ───────────────────── */}

          <h2>Sacrifice System</h2>
          <p>
            Sacrifice is a voluntary, permanent destruction of a Kami in exchange
            for a random item reward. It is entirely separate from PvP combat —
            you choose to sacrifice, and unlike normal death, there is no coming
            back.
          </p>

          <h3>Requirements</h3>
          <ul>
            <li>You must own the Kami</li>
            <li>The Kami must be in RESTING state (not harvesting, not dead)</li>
            <li>One Kami per transaction</li>
          </ul>

          <h3>Commit-Reveal Process</h3>
          <p>
            Sacrifice uses a two-step process for manipulation-resistant
            randomness:
          </p>
          <StatTable
            headers={["Step", "What Happens"]}
            rows={[
              [
                "Commit",
                "Your Kami is immediately burned (NFT transferred to dead address, state set to DEAD, removed from your party). The pity counter increments and selects which droptable to use.",
              ],
              [
                "Reveal",
                "After a short delay, you reveal to receive 1 random item from the selected droptable via weighted random selection using a blockhash seed.",
              ],
            ]}
          />

          <InfoBox variant="warning">
            Sacrifice is <strong>permanent and irreversible</strong>. The
            Kami&apos;s NFT is burned. Unlike normal death, sacrificed Kamis
            cannot be revived — ever. Only sacrifice Kamis you are truly willing
            to lose.
          </InfoBox>

          <h3>Reveal Rules</h3>
          <p>
            The reveal half of a sacrifice follows the same rules as every other
            commit-reveal in the game:
          </p>
          <StatTable
            headers={["Rule", "Detail"]}
            rows={[
              [
                "256-block window",
                "The block hash the outcome depends on is only readable for 256 blocks after the commit. Reveal promptly; a missed window needs a community manager to rescue the commitment.",
              ],
              [
                "No duplicates in one reveal",
                "Revealing several sacrifices at once is fine, but the same commitment must not appear twice in the same call — a duplicate rejects the entire call rather than being ignored.",
              ],
              [
                "Anyone can reveal",
                "The reward always goes to the account that committed, so it does not matter who submits the reveal transaction.",
              ],
            ]}
          />

          <h3>Pity Milestones</h3>
          <p>
            Each account has a running sacrifice counter. At certain milestones,
            you are guaranteed a better droptable:
          </p>
          <StatTable
            headers={["Milestone", "Droptable Used", "Priority"]}
            rows={[
              ["Every 100th sacrifice", "Rare droptable (rare+ items guaranteed)", "Highest — checked first"],
              ["Every 20th sacrifice", "Uncommon droptable (uncommon+ items guaranteed)", "Second — checked if not rare"],
              ["All others", "Normal droptable", "Default"],
            ]}
          />
          <p>
            When milestones overlap (e.g., sacrifice #100 is both a 100th and a
            20th), the rare droptable takes precedence — you always get the
            better outcome.
          </p>

          <h3>Reward Pool and Exact Odds</h3>
          <p>
            All three droptables draw from the same set of{" "}
            <strong>36 pet-slot equipment items</strong>: 12 themed sets of 3
            tiers each &mdash; a Common, an Uncommon and a Rare per set (Mask /
            Veil / Visage of Avarice, and so on through the other eleven
            themes). Every item of a given tier carries the same weight, so each
            table is uniform <em>within</em> a tier and the only thing that
            varies is which tiers are in the pot.
          </p>
          <p>
            Droptable weights are exponential, not linear: a stored weight{" "}
            <code>w</code> counts as <code>2^(w−1)</code> when the roll is made.
            The three sacrifice tables store 9 / 7 / 4 for Common / Uncommon /
            Rare, which works out as effective weights of 256 / 64 / 8 per item.
          </p>
          <FormulaBlock
            label="Effective Weight"
            vars={{
              "w": "the stored tier weight (9 Common, 7 Uncommon, 4 Rare)",
              "effective weight": "the value actually used in the weighted draw",
            }}
          >
            {`effective weight = 2^(w − 1)

  Common   w=9  →  256 per item  (12 items)
  Uncommon w=7  →   64 per item  (12 items)
  Rare     w=4  →    8 per item  (12 items)`}
          </FormulaBlock>
          <StatTable
            headers={[
              "Table",
              "Tiers in the pot",
              "Common",
              "Uncommon",
              "Rare",
            ]}
            rows={[
              [
                "Normal",
                "All three",
                "78.05% (6.50% per item)",
                "19.51% (1.63% per item)",
                "2.44% (0.203% per item)",
              ],
              [
                "Uncommon Pity",
                "Uncommon + Rare",
                "—",
                "88.89% (7.41% per item)",
                "11.11% (0.926% per item)",
              ],
              [
                "Rare Pity",
                "Rare only",
                "—",
                "—",
                "100% (8.33% per item)",
              ],
            ]}
          />
          <InfoBox variant="tip">
            Every sacrifice grants exactly <strong>one</strong> roll, so those
            percentages are the whole story per Kami burned. The per-item column
            is the one that matters if you are chasing a specific piece: a named
            Rare on the normal table lands at roughly 1 in 500, while the rare
            pity table puts the same named piece at 1 in 12. Hunting a specific
            Visage is a pity-counter exercise, not a luck exercise.
          </InfoBox>

          {/* ───────────────────── COOLDOWN ───────────────────── */}

          <h2>Kill Cooldown</h2>
          <p>
            After a successful kill, your Kami enters the standard{" "}
            <strong>180-second cooldown</strong> before it can act again — the
            same cooldown that follows starting, collecting, or stopping a
            harvest. Cooldown is a <strong>build variable</strong>, not a fixed
            tax: Cooldown Shift is added to the 180-second base and the result
            is floored at zero, so a Predator investment can erase it
            completely.
          </p>
          <StatTable
            headers={["Source", "Where it sits", "Cooldown Shift"]}
            rows={[
              ["Sniper", "Predator Tier 2, 5 levels", "−10s per level (−50s maxed)"],
              ["Marksman", "Predator Tier 4, 5 levels", "−10s per level (−50s maxed)"],
              ["Assassin", "Predator Tier 6 ultimate, 1 level", "−50s"],
              ["Energy Drink", "Consumable, lasts until the next cooldown is set", "−30s"],
            ]}
          />
          <p>
            Add those up and the surface reaches exactly zero: the three
            Predator cooldown skills fully invested come to −150 seconds, and an
            Energy Drink covers the last −30. A mono-Predator build deep enough
            for the Tier 6 ultimate can therefore act with{" "}
            <strong>no cooldown at all</strong> on the action after the drink.
            Do not assume a predator who has just arrived at your node, or who
            has just taken a kill, needs to wait before striking again — assume
            the opposite until you have seen otherwise.
          </p>

          {/* ───────────────────── COMBAT BONUSES ───────────────────── */}

          <h2>Combat Bonus Reference</h2>
          <p>
            These bonuses from skills and equipment directly affect liquidation
            calculations. Predator bonuses favor the attacker; Guardian bonuses
            protect the defender.
          </p>
          <StatTable
            headers={["Bonus", "Side", "Effect"]}
            rows={[
              ["ATK_THRESHOLD_RATIO", "Attacker", "Raises efficacy — but only on advantaged and NORMAL-vs-NORMAL matchups; no effect otherwise"],
              ["DEF_THRESHOLD_RATIO", "Defender", "Lowers the attacker's efficacy — but only when the attacker has the type advantage, or on NORMAL vs NORMAL; no effect otherwise"],
              ["ATK_THRESHOLD_SHIFT", "Attacker", "Flat increase to kill threshold — applies on every matchup"],
              ["DEF_THRESHOLD_SHIFT", "Defender", "Flat decrease to kill threshold — applies on every matchup, and can make you unkillable"],
              ["ATK_SPOILS_RATIO", "Attacker", "Increases the percentage of loot stolen"],
              ["DEF_SALVAGE_RATIO", "Defender", "Increases the percentage of loot retained on death"],
              ["ATK_RECOIL_BOOST", "Attacker", "Reduces (or increases) total recoil damage taken after killing"],
              ["STND_COOLDOWN_SHIFT", "Attacker", "Reduces the cooldown between actions — floored at zero, and reachable at zero"],
            ]}
          />

          {/* ───────────────────── HITMAN ───────────────────── */}

          <h2>Hitman Quests</h2>
          <p>
            Kill events are tracked and can serve as quest objectives, enabling
            &quot;hitman contract&quot; style missions:
          </p>
          <StatTable
            headers={["Tracked Data", "What It Measures"]}
            rows={[
              ["Total kills", "Your account's lifetime kill count"],
              ["Kills at node", "Kills at a specific node location"],
              ["Kills during phase", "Kills during a specific day/night cycle phase"],
              ["Times killed", "How many times your Kami has been the victim"],
              ["Kills of target", "Kills of a specific player's Kami"],
            ]}
          />
        </>
      }
    />
  );
}
