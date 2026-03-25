import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

function Overview() {
  return (
    <>
      <h2>PvP During Harvest</h2>
      <p>
        Liquidation is Kamigotchi&apos;s core PvP mechanic. When two Kamis are
        harvesting on the <strong>same node</strong>, one can attempt to{" "}
        <strong>kill</strong> the other if the victim&apos;s HP has dropped low
        enough. A successful kill steals part of the victim&apos;s harvest
        bounty and rewards the killer with <strong>1 Obol</strong>.
      </p>

      <h3>How It Works (Simple Version)</h3>
      <ol>
        <li>
          Two Kamis are harvesting on the same node. The longer they harvest,
          the more strain damage they take and the lower their HP drops.
        </li>
        <li>
          The attacker checks if the victim&apos;s current HP is below a{" "}
          <strong>kill threshold</strong>. This threshold depends on the
          attacker&apos;s <strong>Violence</strong> vs. the victim&apos;s{" "}
          <strong>Harmony</strong>.
        </li>
        <li>
          If the victim&apos;s HP is below the threshold, the kill succeeds:
          the victim dies, and loot is distributed.
        </li>
      </ol>

      <InfoBox variant="warning">
        The victim&apos;s Kami <strong>dies</strong> on liquidation &mdash; its
        state becomes DEAD, HP goes to 0, and the harvest ends. The attacker
        also takes recoil damage to their own HP.
      </InfoBox>

      <h3>Key Stats</h3>
      <StatTable
        headers={["Stat", "Role in Combat"]}
        rows={[
          ["Violence (attacker)", "Higher Violence = easier to kill (higher threshold)"],
          ["Harmony (victim)", "Higher Harmony = harder to kill (lower threshold)"],
          ["Power (victim)", "Higher Power = keep more bounty as salvage"],
          ["Power (attacker)", "Higher Power = steal more bounty as spoils"],
        ]}
      />

      <h3>Loot Distribution</h3>
      <p>When a kill succeeds, the victim&apos;s harvest bounty is split:</p>
      <StatTable
        headers={["Portion", "Goes To", "Based On"]}
        rows={[
          ["Salvage", "Victim's account", "Victim's Power (higher = more kept)"],
          ["Spoils", "Killer's harvest bounty", "Killer's Power (higher = more stolen)"],
          ["Destroyed", "Nobody", "Whatever remains after salvage + spoils"],
          ["1 Obol", "Killer's account", "Fixed reward per kill"],
        ]}
      />

      <InfoBox variant="tip">
        The attacker takes <strong>recoil damage</strong> from the kill. This
        combines their own harvest strain with <strong>karma</strong> &mdash;
        HP damage based on the victim&apos;s Violence vs. the attacker&apos;s
        Harmony. Killing is not free; pick your targets wisely.
      </InfoBox>

      <h3>Requirements</h3>
      <ul>
        <li>Both Kamis must be <strong>HARVESTING</strong> on the <strong>same node</strong></li>
        <li>Attacker must be healthy (HP &gt; 0) and off cooldown</li>
        <li>Attacker&apos;s account must be in the same room as the node</li>
        <li>Victim&apos;s HP must be below the kill threshold</li>
      </ul>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Kill Eligibility</h2>
      <p>A victim is killable when:</p>

      <FormulaBlock label="Kill Condition">
        {`threshold > currentHealth`}
      </FormulaBlock>

      <p>
        Where <code>threshold</code> is derived from the attacker&apos;s
        Violence vs. the victim&apos;s Harmony, and <code>currentHealth</code>{" "}
        is the victim&apos;s HP after strain has been applied.
      </p>

      <h2>Animosity (Base Threshold)</h2>
      <p>
        Animosity measures how aggressive the attacker is relative to the
        victim&apos;s defense. It uses a <strong>Gaussian CDF</strong> over
        the natural log of the Violence/Harmony ratio:
      </p>

      <FormulaBlock label="Animosity">
        {`imbalance = ln(attackerViolence / victimHarmony)
base = Gaussian_CDF(imbalance)
animosity = (base x ratio) / precision`}
      </FormulaBlock>

      <StatTable
        headers={["Variable", "Description"]}
        rows={[
          ["attackerViolence", "Attacker's total Violence stat"],
          ["victimHarmony", "Victim's total Harmony stat"],
          ["ratio", "KAMI_LIQ_ANIMOSITY[2] (core animosity baseline)"],
          ["precision", "10^(18 + config[3] - 6)"],
        ]}
      />

      <InfoBox>
        The Gaussian CDF produces a smooth S-curve between 0 and 1. When
        Violence equals Harmony, the CDF returns ~0.5. When Violence greatly
        exceeds Harmony, the result approaches 1.0. This means even a small
        Violence advantage makes killing significantly easier.
      </InfoBox>

      <h2>Attack Efficacy</h2>
      <p>
        Efficacy modifies the threshold based on <strong>affinity matchups</strong>{" "}
        between the attacker and victim:
      </p>

      <FormulaBlock label="Efficacy">
        {`efficacy = base + affinityShift + bonusShift

where:
  base = KAMI_LIQ_THRESHOLD[2]
  affinityShift = attacker hand affinity vs victim body affinity
  bonusShift = ATK_THRESHOLD_RATIO (attacker) - DEF_THRESHOLD_RATIO (victim)`}
      </FormulaBlock>

      <p>
        The affinity check uses the attacker&apos;s <strong>hand</strong>{" "}
        affinity against the victim&apos;s <strong>body</strong> affinity,
        following the same strong/weak/neutral rules as harvest efficacy.
      </p>

      <h2>Kill Threshold (Final)</h2>
      <p>
        The final absolute HP value below which the victim can be killed:
      </p>

      <FormulaBlock label="Kill Threshold">
        {`shift = (ATK_THRESHOLD_SHIFT - DEF_THRESHOLD_SHIFT) x shiftPrecision
threshold = (animosity x efficacy + shift) x totalHealth / precision

If (animosity x efficacy + shift) < 0, threshold = 0 (unkillable)`}
      </FormulaBlock>

      <InfoBox variant="tip">
        The threshold is a <em>proportion</em> of the victim&apos;s max HP.
        A higher max HP does not make you safer &mdash; the threshold scales
        with it.
      </InfoBox>

      <h2>Karma (Recoil Damage to Attacker)</h2>
      <p>
        The attacker takes HP damage from &ldquo;karma&rdquo; &mdash; based on
        the <em>victim&apos;s</em> Violence vs. the <em>attacker&apos;s</em>{" "}
        Harmony (a reversal of the animosity check):
      </p>

      <FormulaBlock label="Karma">
        {`rawKarma = nudge + victimViolence - attackerHarmony
karma = (rawKarma x efficacy x boost) / precision

where:
  nudge = KAMI_LIQ_KARMA[0] (baseline offset)
  efficacy = calculated with roles reversed (victim attacking)
  boost = KAMI_LIQ_KARMA[6]

If nudge + victimViolence - attackerHarmony < 0, karma = 0`}
      </FormulaBlock>

      <InfoBox variant="warning">
        Killing a high-Violence victim is dangerous. If the victim has more
        Violence than you have Harmony (plus the nudge), you take karma
        damage. This can leave you vulnerable to being liquidated yourself.
      </InfoBox>

      <h2>Recoil (Total Attacker HP Loss)</h2>
      <p>
        Total HP damage to the attacker combines karma with their own harvest
        strain:
      </p>

      <FormulaBlock label="Recoil">
        {`core = strain x ratio + karma x 10^config[3]
boost = config[6] + ATK_RECOIL_BOOST bonus
recoil = (core x boost) / precision

where:
  strain = attacker's harvest strain from their own output
  ratio = KAMI_LIQ_RECOIL[2]
  boost = KAMI_LIQ_RECOIL[6] + ATK_RECOIL_BOOST bonus`}
      </FormulaBlock>

      <h2>Loot Distribution</h2>

      <h3>Salvage (to Victim)</h3>
      <FormulaBlock label="Salvage">
        {`ratio = config[2] + (config[0] + victimPower) x scaleFactor + DEF_SALVAGE_RATIO bonus
salvage = bounty x ratio / precision

(capped at 100% of bounty)`}
      </FormulaBlock>
      <p>
        Higher victim Power means more of the bounty is salvaged (kept by the
        victim&apos;s account). The victim&apos;s Kami also earns XP equal to
        the salvage amount.
      </p>

      <h3>Spoils (to Killer)</h3>
      <FormulaBlock label="Spoils">
        {`ratio = config[2] + (config[0] + killerPower) x scaleFactor + ATK_SPOILS_RATIO bonus
spoils = (bounty - salvage) x ratio / precision

(capped at 100% of remaining bounty)`}
      </FormulaBlock>
      <p>
        Spoils are added to the killer&apos;s <strong>harvest bounty</strong>,
        not directly to their inventory. They still need to collect from their
        own harvest to claim the stolen goods.
      </p>

      <h3>Killer Reward</h3>
      <p>
        The killer&apos;s account always receives <strong>1 Obol</strong> per
        successful kill, regardless of other loot calculations.
      </p>

      <h2>Kill Constraints</h2>
      <StatTable
        headers={["Constraint", "Error Message"]}
        rows={[
          ["Killer Kami must be HARVESTING", "\"kami not HARVESTING\""],
          ["Killer HP must be > 0", "\"kami starving..\""],
          ["Killer must own the Kami", "\"kami not urs\""],
          ["Killer's account must be in same room", "\"node too far\""],
          ["Both Kamis on same node", "\"target too far\""],
          ["Killer must be off cooldown", "\"kami on cooldown\""],
          ["Victim HP below threshold", "\"kami lacks violence (weak)\""],
        ]}
      />

      <h2>Liquidation Process</h2>
      <StatTable
        headers={["Step", "Description"]}
        rows={[
          ["1. Sync", "Update both Kamis' health (apply pending strain)"],
          ["2. Salvage", "Victim retains a Power-based portion of their bounty"],
          ["3. Spoils", "Killer steals a Power-based portion of the remainder"],
          ["4. Recoil", "Killer takes HP damage (strain + karma)"],
          ["5. Cooldown", "Killer's cooldown resets"],
          ["6. Victim dies", "State -> DEAD, HP -> 0, harvest stops, bonuses cleared"],
        ]}
      />

      <InfoBox>
        Any bounty that is neither salvaged nor spoiled is{" "}
        <strong>destroyed</strong> &mdash; it does not go to anyone. This means
        some resources are always lost during a liquidation.
      </InfoBox>

      <h2>Hired Hitman (Quest Integration)</h2>
      <p>
        Kill events log data that quest objectives can track:
      </p>
      <StatTable
        headers={["Data Key", "What It Tracks"]}
        rows={[
          ["LIQUIDATE_TOTAL", "Total kills by account"],
          ["LIQUIDATE_AT_NODE", "Kills at a specific node"],
          ["LIQ_WHEN_{phase}", "Kills during a specific time phase"],
          ["LIQUIDATED_VICTIM", "Times killed (on victim's account)"],
          ["LIQ_TARGET_ACC", "Kills of a specific target account"],
        ]}
      />
      <p>
        This enables &ldquo;hitman contract&rdquo; style quest objectives,
        such as killing a specific number of targets, or killing a particular
        player&apos;s Kami.
      </p>
    </>
  );
}

export default function LiquidationsPage() {
  return (
    <MechanicPage
      title="Liquidations"
      subtitle="PvP kill mechanic: steal bounty from other harvesters, earn Obols"
      overview={<Overview />}
      details={<Details />}
    />
  );
}
