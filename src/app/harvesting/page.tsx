import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

function Overview() {
  return (
    <>
      <h2>The Core Gameplay Loop</h2>
      <p>
        Harvesting is <strong>the</strong> primary way to earn resources in
        Kamigotchi. You assign a Kami to a harvest node in a room, and it
        passively generates <strong>Musu</strong> (the base resource) over
        time. The longer you harvest, the more you earn &mdash; but your Kami
        also takes <strong>strain damage</strong> (HP drain), and other players
        can <strong>liquidate</strong> (kill and raid) your Kami while it
        harvests.
      </p>

      <h3>Harvest Lifecycle</h3>
      <p>
        A harvest session follows a simple flow:
      </p>
      <StatTable
        headers={["Action", "What Happens"]}
        rows={[
          ["Start", "Place your Kami on a node. It begins earning Musu and taking strain."],
          ["Collect", "Withdraw earned Musu without stopping. Kami keeps harvesting."],
          ["Stop", "Collect all earned Musu and end the harvest session."],
          ["Liquidate", "Another player kills your Kami mid-harvest, stealing some of your bounty."],
        ]}
      />

      <InfoBox variant="warning">
        While harvesting, your Kami&apos;s HP drains from strain. If another
        player&apos;s Kami is on the same node and your HP drops below their
        kill threshold, they can liquidate you. Collect often to reduce risk.
      </InfoBox>

      <h3>What Determines Your Earnings?</h3>
      <p>Your harvest output depends on two components:</p>
      <ul>
        <li>
          <strong>Fertility</strong> &mdash; a steady rate based on your
          Kami&apos;s <strong>Power</strong> stat and how well its affinities
          match the node. Higher Power = more Musu per second.
        </li>
        <li>
          <strong>Intensity</strong> &mdash; a bonus that grows over time, based
          on your Kami&apos;s <strong>Violence</strong> stat. The longer you
          stay, the faster this ramps up.
        </li>
      </ul>

      <h3>Affinity Matching</h3>
      <p>
        Every harvest node has an affinity type (Normal, Eerie, Scrap, or
        Insect). Your Kami has two relevant affinities: <strong>body</strong>{" "}
        (bigger impact) and <strong>hand</strong> (smaller impact). When they
        match the node:
      </p>
      <StatTable
        headers={["Match", "Effect"]}
        rows={[
          ["Both match", "Up to 2x harvest rate"],
          ["Both mismatch", "Down to 0.65x harvest rate"],
          ["Normal (either side)", "Neutral (partial bonus from skills/gear only)"],
        ]}
      />

      <InfoBox variant="tip">
        Choose your harvest node wisely. A Kami with Eerie body + Eerie hand on
        an Eerie node gets double output compared to baseline. The same Kami on
        a Scrap node would earn only 65% as much.
      </InfoBox>

      <h3>Strain &mdash; The Cost of Harvesting</h3>
      <p>
        Harvesting is not free. Your Kami takes HP damage proportional to the
        Musu it earns. Higher <strong>Harmony</strong> reduces strain damage,
        making tanky Kamis better suited for long harvest sessions.
      </p>

      <h3>Side Effects</h3>
      <ul>
        <li>
          <strong>XP</strong> &mdash; your Kami gains XP equal to the Musu
          collected
        </li>
        <li>
          <strong>Scavenging</strong> &mdash; harvest output fills a scavenge
          bar that can drop bonus loot
        </li>
        <li>
          <strong>Score</strong> &mdash; your account leaderboard score goes up
        </li>
      </ul>

      <h3>Tax System</h3>
      <p>
        When starting a harvest, you can optionally set a <strong>taxer</strong>{" "}
        (like a guild leader or referrer) who receives a percentage of your
        harvest output.
      </p>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Start Prerequisites</h2>
      <StatTable
        headers={["Check", "Requirement"]}
        rows={[
          ["Ownership", "Kami must belong to your account"],
          ["State", "Kami must be RESTING"],
          ["Cooldown", "Kami must not be on cooldown"],
          ["Health", "Kami HP must be > 0"],
          ["Location", "Your account and the node must be in the same room"],
          ["Node requirements", "Any node-specific conditions (e.g. level limit)"],
        ]}
      />

      <h2>Bounty Formula</h2>
      <p>The total Musu earned since last sync:</p>

      <FormulaBlock label="Bounty">
        {`Bounty = (Fertility + Intensity) x Duration x Boost / Precision`}
      </FormulaBlock>

      <StatTable
        headers={["Variable", "Description"]}
        rows={[
          ["Fertility", "Steady rate from Power stat (see below)"],
          ["Intensity", "Time-ramping bonus from Violence stat (see below)"],
          ["Duration", "Seconds since last sync"],
          ["Boost", "1000 (base) + HARV_BOUNTY_BOOST bonus"],
          ["Precision", "Scaling factor from config decimals"],
        ]}
      />
      <p>
        Config: <code>KAMI_HARV_BOUNTY = [0, 9, 0, 0, 0, 0, 1000, 3]</code>
      </p>

      <h2>Fertility (Power-Based Rate)</h2>
      <p>
        The steady harvest rate determined by your Kami&apos;s Power stat and
        affinity efficacy:
      </p>

      <FormulaBlock label="Fertility">
        {`Fertility = Power x 1500 x Efficacy / 3600`}
      </FormulaBlock>

      <p>
        Config: <code>KAMI_HARV_FERTILITY = [0, 0, 1500, 3, 0, 0, 1000, 3]</code>
      </p>
      <StatTable
        headers={["Parameter", "Value"]}
        rows={[
          ["Ratio", "1500 (at 10^3 precision)"],
          ["Efficacy base", "1000 (see Affinity section)"],
          ["Time divisor", "3600 (converts to per-second rate)"],
        ]}
      />

      <h2>Intensity (Violence-Based Rate)</h2>
      <p>
        A bonus rate that <strong>grows linearly over time</strong>, rewarding
        longer harvest sessions but increasing risk:
      </p>

      <FormulaBlock label="Intensity">
        {`Intensity = (Violence x 5 + minutesElapsed) x 10 / (480 x 3600)`}
      </FormulaBlock>

      <p>
        Config: <code>KAMI_HARV_INTENSITY = [5, 0, 480, 0, 0, 0, 10, 0]</code>
      </p>
      <StatTable
        headers={["Parameter", "Value"]}
        rows={[
          ["Nudge", "5 (multiplied by Violence stat)"],
          ["minutesElapsed", "floor((now - intensityResetTime) / 60)"],
          ["Ratio", "480 (divisor)"],
          ["Boost", "10 + HARV_INTENSITY_BOOST bonus"],
        ]}
      />

      <InfoBox>
        Intensity resets when your Kami performs certain actions like equipment
        changes. The <code>minutesElapsed</code> counter tracks time since the
        last reset, not since harvest start.
      </InfoBox>

      <h2>Affinity Efficacy System</h2>
      <p>
        Efficacy is a multiplier on Fertility. It depends on how your
        Kami&apos;s trait affinities match the node&apos;s affinity.
      </p>

      <h3>Affinity Match Table</h3>
      <StatTable
        headers={["Kami Affinity", "Node Affinity", "Result"]}
        rows={[
          ["Same as node", "Any typed", "Strong (+bonus)"],
          ["Different typed", "Different typed", "Weak (-penalty)"],
          ["NORMAL", "Any", "Neutral (half of equipment/skill bonus shift only)"],
          ["Any", "NORMAL", "Neutral"],
        ]}
      />

      <h3>Efficacy Values</h3>
      <p>
        Each Kami has two affinity slots checked against the node: body
        (stronger impact) and hand (weaker impact).
      </p>
      <StatTable
        headers={["Slot", "Config", "Strong Bonus", "Weak Penalty"]}
        rows={[
          ["Body", "KAMI_HARV_EFFICACY_BODY = [3, 0, 650, 250, 0]", "+650", "-250"],
          ["Hand", "KAMI_HARV_EFFICACY_HAND = [3, 0, 350, 100, 0]", "+350", "-100"],
        ]}
      />

      <FormulaBlock label="Total Efficacy">
        {`Efficacy = 1000 (base) + bodyShift + handShift

Perfect match:   1000 + 650 + 350 = 2000 (2.0x harvest)
Full mismatch:   1000 - 250 - 100 =  650 (0.65x harvest)`}
      </FormulaBlock>

      <InfoBox variant="tip">
        When a node has dual affinities (e.g. Eerie + Scrap), the system picks
        the most favorable matchup order, giving the body slot the better match
        since it has higher config impact.
      </InfoBox>

      <h2>Strain Formula</h2>
      <p>
        HP damage taken while harvesting, proportional to resources gathered:
      </p>

      <FormulaBlock label="Strain (HP Drain)">
        {`strain = ceil(harvestedAmount x 6500 x (1000 + strainBoost) / (10^6 x (Harmony + 20)))`}
      </FormulaBlock>

      <p>
        Config: <code>KAMI_HARV_STRAIN = [20, 0, 6500, 3, 0, 0, 1000, 3]</code>
      </p>
      <StatTable
        headers={["Parameter", "Value"]}
        rows={[
          ["denomBase", "20 (added to Harmony in denominator)"],
          ["core", "6500 (at 10^3 precision)"],
          ["boost", "1000 (base, modified by STND_STRAIN_BOOST bonus)"],
          ["precision", "10^6"],
        ]}
      />

      <InfoBox variant="warning">
        Harmony directly reduces strain damage. A Kami with high Harmony can
        harvest much longer before its HP drops to dangerous levels. The +20
        base in the denominator ensures even a 0-Harmony Kami takes finite
        damage.
      </InfoBox>

      <h2>Tax System</h2>
      <p>
        A taxer (e.g. guild leader, referrer) can be specified when starting a
        harvest. The tax is a percentage of the final collected output:
      </p>
      <StatTable
        headers={["Event", "Behavior"]}
        rows={[
          ["On collect/stop", "Tax is calculated and the taxer receives their share of harvested items"],
          ["On start", "Previous tax is removed and new tax is set"],
          ["Remainder", "Goes to the Kami's account after tax deduction"],
        ]}
      />

      <h2>Collect vs Stop</h2>
      <StatTable
        headers={["Action", "Collects Musu", "Ends Harvest", "Resets Cooldown", "Grants XP", "Triggers Scavenge"]}
        rows={[
          ["Collect", "Yes", "No", "Yes", "Yes", "Yes"],
          ["Stop", "Yes", "Yes", "Yes", "Yes", "Yes"],
        ]}
      />

      <h2>Harvest Entity</h2>
      <StatTable
        headers={["Component", "Description"]}
        rows={[
          ["State", "ACTIVE or INACTIVE"],
          ["TimeStart", "When the harvest began"],
          ["TimeLast", "Last sync timestamp"],
          ["TimeReset", "Last intensity reset timestamp"],
          ["Value", "Accrued but unclaimed bounty"],
        ]}
      />
    </>
  );
}

export default function HarvestingPage() {
  return (
    <MechanicPage
      title="Harvesting"
      subtitle="The primary resource loop: earn Musu, manage strain, dodge liquidation"
      overview={<Overview />}
      details={<Details />}
    />
  );
}
