import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function VipPage() {
  return (
    <MechanicPage
      title="VIP Program"
      subtitle="Earn engagement scores across 2-week epochs for Initia VIP rewards"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>What Is the VIP Program?</h2>
      <p>
        The VIP program tracks your engagement with Kamigotchi and reports it to{" "}
        <strong>Initia VIP</strong>. The more you play, the higher your score,
        and the better your rewards.
      </p>

      <h2>How It Works</h2>
      <p>
        The VIP system operates on <strong>2-week epochs</strong> called{" "}
        <strong>stages</strong>. Each stage has its own leaderboard of player
        scores. As you play the game and interact with various systems, your VIP
        score for the current stage increases.
      </p>
      <ul>
        <li>Each stage lasts exactly <strong>2 weeks</strong> (1,209,600 seconds)</li>
        <li>Stages are numbered starting from 1</li>
        <li>The genesis date is <strong>April 24, 2025</strong> at 08:00 UTC</li>
        <li>Your score only counts for the current active stage</li>
      </ul>

      <InfoBox variant="tip">
        Your VIP score accumulates throughout each 2-week stage. Stay active
        and engage with different game systems to maximize your score before
        the stage ends!
      </InfoBox>

      <h2>What Earns VIP Score?</h2>
      <p>
        Various in-game actions contribute to your VIP score. The more you
        engage with the game&apos;s systems — harvesting, crafting, trading,
        completing quests, and more — the higher your score climbs.
      </p>

      <h2>Stage Lifecycle</h2>
      <ol>
        <li>
          A new stage begins automatically when the previous one ends
        </li>
        <li>
          During the stage, your actions earn VIP score points
        </li>
        <li>
          When the stage ends, it is finalized and scores are locked in
        </li>
        <li>
          The next stage begins immediately — there is no gap between stages
        </li>
      </ol>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Stage Calculation</h2>
      <FormulaBlock label="Current Stage Number">
        {"stage = ((currentTime - genesisStart) / epochLength) + 1\n\ngenesisStart = 1745481600 (April 24, 2025, 08:00 UTC)\nepochLength  = 1209600 seconds (2 weeks)\n\nStages are 1-indexed. Stage 0 is invalid."}
      </FormulaBlock>

      <h2>Configuration</h2>
      <StatTable
        headers={["Config Key", "Value", "Description"]}
        rows={[
          ["VIP_STAGE[0]", "1745481600", "Genesis timestamp: April 24, 2025, 08:00 UTC"],
          ["VIP_STAGE[1]", "1209600", "Epoch length: 1,209,600 seconds (2 weeks)"],
        ]}
      />

      <h2>Score Architecture</h2>
      <p>
        The VIP system writes scores to two locations simultaneously:
      </p>
      <ol>
        <li>
          <strong>In-game scoring</strong> — via LibScore, integrated with the
          game&apos;s leaderboard system
        </li>
        <li>
          <strong>External VipScore contract</strong> — a standalone on-chain
          contract that Initia reads for VIP reward distribution
        </li>
      </ol>
      <FormulaBlock label="Score Flow">
        {"Game Action --> LibVIP.inc() --> LibScore (in-game leaderboard)\n                              --> VipScore contract (external, Initia reads this)"}
      </FormulaBlock>

      <h2>Stage Finalization</h2>
      <p>
        When a score is incremented for stage N, the system automatically
        checks whether stage N-1 needs to be finalized:
      </p>
      <ul>
        <li>If stage N-1 is not yet finalized, it is finalized automatically</li>
        <li>Finalizing a stage locks it — no more score changes allowed</li>
        <li>The next stage (N+1) is created automatically if it does not exist</li>
      </ul>
      <InfoBox variant="info">
        Stage finalization happens automatically. You do not need to do
        anything manually — the system takes care of transitioning between
        stages.
      </InfoBox>

      <h2>VipScore Contract Details</h2>
      <p>
        The external VipScore contract provides these capabilities:
      </p>
      <StatTable
        headers={["Function", "Description"]}
        rows={[
          ["increaseScore", "Add to a player's score for a stage (reverts if finalized)"],
          ["decreaseScore", "Subtract from a player's score (reverts if finalized)"],
          ["updateScore", "Set an exact score value (adjusts totals by difference)"],
          ["finalizeStage", "Close a stage and auto-create the next one"],
          ["getScores", "Paginated query of all scores for a stage"],
        ]}
      />

      <h2>Per-Stage Data</h2>
      <StatTable
        headers={["Field", "Description"]}
        rows={[
          ["stage", "Stage number (1-indexed)"],
          ["totalScore", "Sum of all player scores in this stage"],
          ["isFinalized", "Whether the stage is closed for further scoring"],
        ]}
      />

      <h2>Access Control</h2>
      <p>
        The VipScore contract uses an allow-list for write access. The game
        world is granted access through a proxy component, ensuring that only
        authorized game systems can increment VIP scores.
      </p>
    </>
  );
}
