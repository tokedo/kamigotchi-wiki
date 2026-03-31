import {
  MechanicPage,
  FormulaBlock,
  StatTable,
  InfoBox,
} from "@/components/mechanic-page";

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
            their harvest. But the relationship follows an S-curve — there are
            diminishing returns at the extremes. You cannot simply stack Violence
            to 100% threshold.
          </p>
          <p>
            Affinity matchups also matter. Your Kami&apos;s{" "}
            <strong>hand affinity</strong> is compared against the victim&apos;s{" "}
            <strong>body affinity</strong>. A strong matchup (same type) gives
            you a significant boost. A weak matchup (mismatched non-Normal types)
            makes the kill harder.
          </p>
          <StatTable
            headers={["Matchup", "Effect"]}
            rows={[
              ["Strong (same type)", "Kill threshold increases — easier kill"],
              ["Weak (mismatched)", "Kill threshold decreases — harder kill"],
              ["Neutral (Normal involved)", "No change"],
            ]}
          />

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
                "Takes recoil damage (karma × strain, modified by affinity)",
                "Kami dies — state becomes DEAD, HP drops to 0",
              ],
              [
                "Enters a kill cooldown",
                "All temporary bonuses are cleared",
              ],
            ]}
          />

          <InfoBox variant="warning">
            Killing is not free. Recoil damage now scales on a{" "}
            <strong>smooth curve</strong> — the stronger the victim relative to
            you, the more punishment you take. Affinity matchups matter too:
            the defender&apos;s hand affinity vs your body affinity can increase
            or decrease how much recoil you suffer. Kill a high-Violence target
            with a bad affinity matchup and you might lose so much HP that
            someone else can immediately liquidate you. Always check your
            target&apos;s stats and affinity before committing.
          </InfoBox>

          <h3>Death and Revival</h3>
          <p>
            When a Kami dies — whether from a kill or from harvest strain draining
            HP to zero — it enters the DEAD state. Dead Kamis are completely
            locked out: no harvesting, no leveling, no equipping, no quests, no
            marketplace access. To bring a Kami back you need{" "}
            <strong>33 Onyx Shards</strong>, and it revives with only{" "}
            <strong>33 HP</strong> regardless of max health. After revival it
            enters RESTING state and begins passively healing through metabolism.
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
              "animosity": "base kill chance derived from Violence-to-Harmony ratio (S-curve, 0% to ~40%)",
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
            Animosity represents how likely your kill attempt succeeds, based on
            your Violence vs their Harmony. It uses a{" "}
            <strong>Gaussian CDF</strong> (the cumulative normal distribution)
            applied to the natural log of the stat ratio. In plain terms, this
            produces an <strong>S-curve from 0% to ~40%</strong> based on how
            much your Violence outweighs their Harmony:
          </p>
          <FormulaBlock
            label="Animosity"
            vars={{
              "animosity": "resulting base kill chance (0% to ~40% of max HP)",
              "NormCdf": "Gaussian cumulative distribution function — produces the S-curve shape",
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
              kill nearly impossible through stats alone.
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
              "affinityShift": "combined body shift + hand shift from the attacker-vs-victim affinity matchup",
              "atkBonus": "ATK_THRESHOLD_RATIO bonus on the attacker from Predator skills and equipment",
              "defBonus": "DEF_THRESHOLD_RATIO bonus on the victim from Guardian skills and equipment",
            }}
          >
            {`efficacy = baseEfficacy + affinityShift + (atkBonus − defBonus)`}
          </FormulaBlock>
          <StatTable
            headers={["Affinity Matchup", "Body Shift", "Hand Shift"]}
            rows={[
              ["Strong (same type vs body)", "+650", "+350"],
              ["Weak (mismatched non-Normal)", "-250", "-100"],
              ["Neutral (Normal involved)", "0", "0"],
            ]}
          />
          <p>
            A strong affinity matchup can boost your effective threshold by up to
            +1,000 (body + hand shifts combined). A weak matchup penalizes by up
            to -350. Skills from the Predator tree add to your ATK_THRESHOLD_RATIO,
            while Guardian skills add to the victim&apos;s DEF_THRESHOLD_RATIO.
          </p>

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
                "Multiplied with animosity — scales with your Violence advantage",
                "Predators with high Violence who already outstat targets",
              ],
              [
                "Shift (ATK/DEF_THRESHOLD_SHIFT)",
                "Added flat after the multiplication — independent of stat ratios",
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
            Suppose an attacker with 150 Violence targets a victim with 100
            Harmony and 1,000 max HP. Both have the same affinity type (strong
            matchup), and neither has skill bonuses:
          </p>
          <FormulaBlock
            label="Example Calculation"
            variant="example"
            vars={{
              "150": "attacker's Violence stat in this example",
              "100": "victim's Harmony stat in this example",
              "1000": "victim's maximum HP in this example",
              "NormCdf": "Gaussian cumulative distribution function (S-curve)",
              "650 / 350": "body shift and hand shift for a strong (same-type) affinity matchup",
            }}
          >
            {`Step 1 — Animosity:
  ln(150 / 100) = ln(1.5) ≈ 0.405
  NormCdf(0.405) ≈ 0.657  (65.7% of the bell curve)
  animosity = 0.657 × ratio / precision

Step 2 — Efficacy (strong matchup, no bonuses):
  efficacy = base + 650 + 350 = base + 1000

Step 3 — Threshold:
  threshold = (animosity × efficacy) × 1000 / precision

The victim becomes killable once harvest strain has drained
their HP below this threshold value.`}
          </FormulaBlock>
          <p>
            Now compare: if the attacker had only 80 Violence against the same
            100 Harmony victim:
          </p>
          <FormulaBlock
            label="Weaker Attacker"
            variant="example"
            vars={{
              "80": "attacker's Violence stat (weaker than the victim's Harmony)",
              "100": "victim's Harmony stat",
              "NormCdf": "Gaussian cumulative distribution function (S-curve)",
            }}
          >
            {`ln(80 / 100) = ln(0.8) ≈ -0.223
NormCdf(-0.223) ≈ 0.412  (41.2% of the bell curve)

A much lower animosity — the victim would need to be far deeper
into harvest strain before they become vulnerable.`}
          </FormulaBlock>

          {/* ─── Diminishing Violence ─── */}

          <h3>Diminishing Violence</h3>
          <p>
            Because animosity uses the Gaussian CDF, Violence has sharply
            diminishing returns at high values. Consider these scenarios against
            a victim with 100 Harmony:
          </p>
          <StatTable
            headers={["Your Violence", "ln(V/H)", "NormCdf Result", "Relative Gain"]}
            rows={[
              ["50", "-0.69", "~24.5%", "—"],
              ["100", "0.00", "~50.0%", "+25.5 points"],
              ["200", "+0.69", "~75.5%", "+25.5 points"],
              ["400", "+1.39", "~91.7%", "+16.2 points"],
              ["800", "+2.08", "~98.1%", "+6.4 points"],
              ["1600", "+2.77", "~99.7%", "+1.6 points"],
            ]}
          />
          <p>
            Going from 100 to 200 Violence (doubling) gains you 25.5 percentage
            points of CDF output. But going from 800 to 1600 (also doubling)
            gains only 1.6 points. Past a certain point, investing in Violence
            gives almost nothing. You are better off investing in Power (for
            better spoils), Harmony (to reduce recoil karma), or equipment.
          </p>

          <InfoBox variant="tip">
            The sweet spot for Violence investment is roughly 1x to 3x the
            target&apos;s Harmony. Below that, you struggle to hit the threshold.
            Above that, additional Violence is wasted. Smart predators scout
            their targets and invest accordingly.
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
              "baseRatio": "minimum salvage ratio before any modifiers",
              "baseOffset": "constant added to Power before scaling",
              "victimPower": "the killed Kami's total Power stat",
              "scaleFactor": "multiplier that converts Power into salvage percentage points",
              "DEF_SALVAGE_RATIO": "bonus salvage from Guardian skills and defensive equipment",
              "salvage": "final Musu amount the victim retains",
              "bounty": "victim's total uncollected harvest Musu at the time of death",
              "precision": "internal scaling constant (1,000) used for fixed-point math",
            }}
          >
            {`salvageRatio = baseRatio + (baseOffset + victimPower) × scaleFactor + DEF_SALVAGE_RATIO
salvage = bounty × salvageRatio / precision

Capped at 100% of bounty.`}
          </FormulaBlock>
          <p>
            Two things increase your salvage: higher <strong>Power</strong> on
            the victim (your stat investment pays off even in death), and{" "}
            <strong>DEF_SALVAGE_RATIO</strong> bonuses from Guardian skills and
            defensive equipment.
          </p>

          <h4>Salvage Example</h4>
          <FormulaBlock
            label="Example"
            variant="example"
            vars={{
              "50": "victim's Power stat in this example",
              "10,000": "victim's uncollected harvest bounty in Musu",
              "baseRatio": "minimum salvage ratio before modifiers",
              "baseOffset": "constant added to Power before scaling",
              "scaleFactor": "multiplier converting Power to salvage percentage",
            }}
          >
            {`A Kami with 50 Power is killed while sitting on 10,000 Musu bounty.
With default config and no skill bonuses:

  salvageRatio = baseRatio + (baseOffset + 50) × scaleFactor
  salvage = 10,000 × salvageRatio / precision

The victim's account receives this Musu, plus the Kami
earns equivalent XP — a small consolation for dying.`}
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
              "baseRatio": "minimum spoils ratio before any modifiers",
              "baseOffset": "constant added to Power before scaling",
              "attackerPower": "the killer's total Power stat",
              "scaleFactor": "multiplier that converts Power into spoils percentage points",
              "ATK_SPOILS_RATIO": "bonus spoils from Predator skills and offensive equipment",
              "spoils": "final Musu amount added to the killer's harvest bounty",
              "bounty": "victim's total uncollected harvest Musu at the time of death",
              "salvage": "Musu already claimed by the victim (subtracted before spoils)",
              "precision": "internal scaling constant (1,000) used for fixed-point math",
            }}
          >
            {`spoilsRatio = baseRatio + (baseOffset + attackerPower) × scaleFactor + ATK_SPOILS_RATIO
spoils = (bounty − salvage) × spoilsRatio / precision

Capped at 100% of remaining bounty.`}
          </FormulaBlock>
          <p>
            Higher <strong>Power</strong> on the attacker means bigger spoils.
            Predator skills boost the <strong>ATK_SPOILS_RATIO</strong> further.
            Note that spoils go into your <em>harvest bounty</em>, not directly
            into your inventory — you still need to collect your harvest to
            actually receive the Musu.
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
              "10,000": "victim's total uncollected harvest bounty in Musu",
              "80": "attacker's Power stat in this example",
              "salvage": "Musu already claimed by the victim",
              "atkSkillBonus": "ATK_SPOILS_RATIO from Predator skills",
              "remaining": "bounty left after the victim's salvage is deducted",
            }}
          >
            {`Continuing the example above: 10,000 Musu bounty, victim salvages
some portion. The attacker has 80 Power and Predator skills:

  remaining = 10,000 − salvage
  spoilsRatio = baseRatio + (baseOffset + 80) × scaleFactor + atkSkillBonus
  spoils = remaining × spoilsRatio / precision

The spoils are added to the attacker's harvest bounty.
Plus, the attacker always receives 1 Obol per kill.`}
          </FormulaBlock>

          {/* ───────────────────── RECOIL ───────────────────── */}

          <h2>Recoil Damage to the Attacker</h2>
          <p>
            Every kill costs the attacker HP. Recoil has two components:{" "}
            <strong>karma</strong> (the victim fighting back) and{" "}
            <strong>strain</strong> (your own harvest damage). Together they
            determine how much HP you lose for committing the kill.
          </p>

          <h3>Karma — The Victim Hits Back</h3>
          <p>
            Karma is now a <strong>Gaussian CDF-based multiplier</strong> that
            scales recoil damage. It reverses the stat check: the{" "}
            <em>victim&apos;s</em> Violence vs <em>your</em> Harmony. Unlike
            the old linear formula, this produces a smooth S-curve — recoil
            scales gradually rather than having a hard cutoff.
          </p>
          <FormulaBlock
            label="Karma"
            vars={{
              "karma": "resulting recoil multiplier (~0 to ratio) — NOT raw HP damage",
              "NormCdf": "Gaussian cumulative distribution function — same S-curve as animosity",
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
            The switch from linear to Gaussian means karma now scales{" "}
            <strong>smoothly</strong>. Under the old formula, there was a hard
            cutoff where karma dropped to zero. Now it tapers off gradually —
            even weak victims deal a small amount of karma, and very strong
            victims are punishing but not infinite.
          </InfoBox>

          <h3>Recoil Efficacy — Affinity Affects Recoil</h3>
          <p>
            Recoil efficacy is a new affinity-based modifier that adjusts recoil
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
            headers={["Matchup", "Shift", "Meaning"]}
            rows={[
              [
                "Advantaged (e.g., defender EERIE hand vs attacker SCRAP body)",
                "+1000",
                "Attacker takes more recoil",
              ],
              [
                "Disadvantaged (opposite triangle edge)",
                "+1000",
                "Symmetric — same increase",
              ],
              [
                "Neutral (different types, no edge)",
                "0",
                "No change",
              ],
              [
                "Same non-NORMAL type",
                "0",
                "No change",
              ],
              [
                "NORMAL vs NORMAL",
                "+400",
                "Special case — slight increase",
              ],
            ]}
          />
          <InfoBox variant="tip">
            This is a new layer of defense. A defender with the right hand
            affinity can make an attacker pay more recoil, even if the attacker
            has great stats. When scouting targets, check their hand affinity
            against your body — not just their Violence.
          </InfoBox>

          <h3>Total Recoil</h3>
          <p>
            Your total HP loss now uses karma and recoil efficacy as{" "}
            <strong>multiplicative factors</strong> with harvest strain. This
            replaced the old additive formula:
          </p>
          <FormulaBlock
            label="Recoil"
            vars={{
              "karma": "Gaussian CDF multiplier from victim's Violence vs your Harmony (see above)",
              "recoilEfficacy": "affinity-based nudge from defender's hand vs your body (see above)",
              "yourStrain": "attacker's accumulated harvest strain damage at the time of the kill",
              "boost": "overall recoil multiplier: base + ATK_RECOIL_BOOST (floored at 0)",
              "ATK_RECOIL_BOOST": "bonus from the attacker's equipment — can reduce recoil taken",
              "recoil": "final HP lost by the attacker after the kill",
              "precision": "internal scaling constant used for fixed-point math",
            }}
          >
            {`recoil = (karma + recoilEfficacy) × yourStrain × boost / precision

boost = max(0, baseBoost + ATK_RECOIL_BOOST)`}
          </FormulaBlock>
          <p>
            Karma and recoil efficacy are <strong>additive</strong> with each
            other, then <strong>multiplicative</strong> with strain and boost.
            This means your timing still matters — high strain amplifies all
            recoil. But now the defender&apos;s affinity and skills also play a
            direct role in how much you suffer.
          </p>

          <h4>Recoil Example</h4>
          <FormulaBlock
            label="Example"
            variant="example"
            vars={{
              "120": "victim's Violence stat in this example",
              "80": "attacker's Harmony stat in the first scenario",
              "200": "attacker's Harmony stat in the second scenario",
              "NormCdf": "Gaussian CDF (S-curve) used for karma calculation",
            }}
          >
            {`You kill a target with 120 Violence while you have 80 Harmony.
You have accumulated moderate harvest strain.

  karma = NormCdf( ln(120 / 80) ) × ratio / precision
       = NormCdf(0.405) ≈ high multiplier (victim is stronger)
  recoilEfficacy = affinity nudge (depends on hand/body matchup)
  recoil = (karma + recoilEfficacy) × strain × boost / precision

If you had 200 Harmony instead:
  karma = NormCdf( ln(120 / 200) ) × ratio / precision
       = NormCdf(-0.51) ≈ low multiplier (you outstat the victim)

High Harmony predators still take less karma, but it never
drops to exactly zero — the S-curve just makes it very small.`}
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
            A Kami dies when its HP hits 0, whether from a kill or from harvest
            strain. Dead Kamis are completely locked out of the game until
            revived.
          </p>
          <StatTable
            headers={["What Dead Kamis Cannot Do", ""]}
            rows={[
              ["Harvest at nodes", "Level up"],
              ["Equip or use items", "Accept quests"],
              ["Be sent to other accounts", "Enter the marketplace"],
            ]}
          />

          <h3>Revival</h3>
          <StatTable
            headers={["Revival Detail", "Value"]}
            rows={[
              ["Cost", "33 Onyx Shards"],
              ["HP after revival", "33 HP (regardless of max health)"],
              ["State after revival", "RESTING"],
              ["Stats affected", "None — Power, Violence, Harmony all unchanged"],
              ["Healing", "Passive metabolism healing begins immediately"],
            ]}
          />
          <p>
            Revival is expensive and leaves you fragile. A freshly revived Kami
            has only 33 HP and needs time to heal back up before it can safely
            return to harvesting. Factor revival costs into your risk assessment
            before engaging in PvP.
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

          {/* ───────────────────── COOLDOWN ───────────────────── */}

          <h2>Kill Cooldown</h2>
          <p>
            After a successful kill, your Kami enters a cooldown period before it
            can kill again. The base cooldown can be modified by the{" "}
            <strong>STND_COOLDOWN_SHIFT</strong> bonus from Predator skills —
            faster cooldowns mean more kills per harvest session.
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
              ["ATK_THRESHOLD_RATIO", "Attacker", "Increases efficacy — makes kill threshold higher"],
              ["DEF_THRESHOLD_RATIO", "Defender", "Increases efficacy against you — makes you harder to kill"],
              ["ATK_THRESHOLD_SHIFT", "Attacker", "Flat increase to kill threshold"],
              ["DEF_THRESHOLD_SHIFT", "Defender", "Flat decrease to kill threshold — can make you unkillable"],
              ["ATK_SPOILS_RATIO", "Attacker", "Increases the percentage of loot stolen"],
              ["DEF_SALVAGE_RATIO", "Defender", "Increases the percentage of loot retained on death"],
              ["ATK_RECOIL_BOOST", "Attacker", "Reduces (or increases) total recoil damage taken after killing"],
              ["STND_COOLDOWN_SHIFT", "Attacker", "Reduces cooldown between kills"],
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
