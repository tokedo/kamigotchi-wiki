import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

function Overview() {
  return (
    <>
      <h2>What Are Cooldowns?</h2>
      <p>
        After certain actions (starting a harvest, collecting, stopping, or
        liquidating), your Kami enters a <strong>cooldown period</strong> where
        it cannot perform those actions again until the timer expires. Think of
        it as a brief rest between harvest sessions.
      </p>

      <h3>Cooldown at a Glance</h3>
      <StatTable
        headers={["Stat", "Value"]}
        rows={[
          ["Base cooldown", "180 seconds (3 minutes)"],
          ["Minimum possible", "0 seconds (with enough skill/gear reduction)"],
          ["Reduced by", "STND_COOLDOWN_SHIFT bonus (from skills and equipment)"],
        ]}
      />

      <p>
        The base cooldown is <strong>3 minutes</strong>. Skills and equipment
        can reduce this through the STND_COOLDOWN_SHIFT bonus &mdash; a
        negative shift shortens your cooldown, while a positive shift would
        lengthen it (though no current effects increase it).
      </p>

      <InfoBox variant="tip">
        Investing in cooldown reduction skills or gear lets you harvest, collect,
        and restart faster. This can significantly boost your Musu output per
        hour, especially if you play actively and collect frequently.
      </InfoBox>

      <h3>When Does Cooldown Trigger?</h3>
      <ul>
        <li><strong>Starting</strong> a harvest</li>
        <li><strong>Collecting</strong> from an active harvest</li>
        <li><strong>Stopping</strong> a harvest</li>
        <li><strong>Liquidating</strong> another player</li>
      </ul>
      <p>
        While on cooldown, your Kami cannot start harvesting, collect, stop, or
        liquidate. The Kami can still be <em>targeted</em> for liquidation by
        others while on cooldown.
      </p>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Cooldown Calculation</h2>

      <FormulaBlock label="Cooldown Duration">
        {`baseCooldown = KAMI_STANDARD_COOLDOWN   (180 seconds)
bonusShift = STND_COOLDOWN_SHIFT bonus on this Kami
cooldown = max(0, baseCooldown + bonusShift)
endTime = block.timestamp + cooldown`}
      </FormulaBlock>

      <StatTable
        headers={["Parameter", "Value"]}
        rows={[
          ["KAMI_STANDARD_COOLDOWN", "180 seconds (3 minutes)"],
          ["STND_COOLDOWN_SHIFT", "Bonus from skills/equipment (negative = shorter)"],
          ["Minimum cooldown", "0 seconds (floor)"],
        ]}
      />

      <InfoBox>
        A STND_COOLDOWN_SHIFT of -60 would reduce cooldown from 180s to 120s
        (2 minutes). A shift of -180 or more would eliminate cooldown entirely.
      </InfoBox>

      <h2>Cooldown Status Check</h2>
      <FormulaBlock label="Is On Cooldown?">
        {`isActive = block.timestamp < endTime`}
      </FormulaBlock>
      <p>
        The cooldown end time is stored as a future timestamp. The Kami is
        considered &ldquo;on cooldown&rdquo; whenever the current time is before
        that stored timestamp. If the Kami has never had a cooldown set, the end
        time is 0 (always off cooldown).
      </p>

      <h2>Modifying an Active Cooldown</h2>
      <p>
        Cooldowns can be extended or shortened while active:
      </p>
      <FormulaBlock label="Cooldown Modification">
        {`if cooldown is active (endTime > now):
    newEnd = endTime + delta
else:
    newEnd = block.timestamp + delta`}
      </FormulaBlock>
      <p>
        This allows game effects to dynamically adjust an ongoing cooldown.
        A positive delta extends it; a negative delta shortens it.
      </p>

      <h2>Batch Checking</h2>
      <p>
        The system can check multiple Kamis at once. The batch check returns
        true if <strong>any</strong> Kami in the group is currently on cooldown,
        which is useful for multi-Kami operations.
      </p>

      <h2>Cooldown in the Harvest Flow</h2>
      <StatTable
        headers={["Action", "Cooldown Behavior"]}
        rows={[
          ["Harvest Start", "Sets cooldown. Kami must be off cooldown to start."],
          ["Harvest Collect", "Resets cooldown. Kami must be off cooldown to collect."],
          ["Harvest Stop", "Resets cooldown. Kami must be off cooldown to stop."],
          ["Liquidate", "Resets killer's cooldown after the kill."],
        ]}
      />
    </>
  );
}

export default function CooldownPage() {
  return (
    <MechanicPage
      title="Cooldown"
      subtitle="180-second base cooldown between harvest actions, reducible by skills and gear"
      overview={<Overview />}
      details={<Details />}
    />
  );
}
