import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function FactionsPage() {
  return (
    <MechanicPage
      title="Factions & Co-Ops"
      subtitle="Build reputation with the three factions and contribute to community goals"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>The Three Factions</h2>
      <p>
        Kamigotchi has three factions, each representing a different power in
        the world. As you complete quests, you build <strong>reputation</strong>{" "}
        with these factions, unlocking new opportunities and climbing faction
        leaderboards.
      </p>
      <StatTable
        headers={["Faction", "Also Known As", "Description"]}
        rows={[
          [
            "The Agency",
            "Agency",
            "The world administrators. You build reputation by completing main story quests.",
          ],
          [
            "The Elders",
            "Mina",
            "Mina and her business network. Complete Mina's faction quests to earn their loyalty.",
          ],
          [
            "The Nursery",
            "Nursery",
            "A mysterious force connected to the Nursery. Reputation gained through specific quests.",
          ],
        ]}
      />

      <h2>How Reputation Works</h2>
      <p>
        You earn faction reputation primarily by <strong>completing quests</strong>.
        Different quests reward different amounts of reputation:
      </p>
      <ul>
        <li>
          <strong>Agency Reputation</strong> — earned from main story quests,
          typically 2, 4, or 6 points per quest
        </li>
        <li>
          <strong>Elders Loyalty</strong> — earned from Mina&apos;s faction
          quests, typically 2, 4, or 6 points per quest
        </li>
        <li>
          <strong>Nursery Dedication</strong> — earned from specific quests,
          typically 4 points per quest
        </li>
      </ul>
      <p>
        Reputation only goes up through quest rewards — there is no way to lose
        reputation through normal gameplay.
      </p>

      <InfoBox variant="tip">
        Faction reputation is tracked on leaderboards, so you can see how you
        stack up against other players in each faction.
      </InfoBox>

      <h2>NPCs and Factions</h2>
      <p>
        NPCs in the game can belong to factions. For example, Mina belongs to
        The Elders faction. Building reputation with a faction strengthens your
        relationship with its associated NPCs, which may unlock special
        interactions and quest lines.
      </p>

      <h2>Community Goals (Co-Ops)</h2>
      <p>
        Community Goals — also called <strong>Co-Ops</strong> — are shared
        objectives where all players pool their resources toward a common
        target. When the goal is reached, every contributor can claim rewards
        based on how much they chipped in.
      </p>
      <p>
        Here is how Co-Ops work:
      </p>
      <ol>
        <li>
          <strong>A goal is announced</strong> — it has a target amount (e.g.,
          contribute 10,000 Musu collectively).
        </li>
        <li>
          <strong>You contribute</strong> — donate the required resource. Your
          contribution is tracked individually.
        </li>
        <li>
          <strong>The goal completes</strong> — once the community hits the
          target, no more contributions are accepted.
        </li>
        <li>
          <strong>Claim your rewards</strong> — every contributor can claim
          tiered and proportional rewards.
        </li>
      </ol>

      <h2>Co-Op Reward Tiers</h2>
      <p>
        Co-Ops have tiered rewards based on how much you contributed:
      </p>
      <ul>
        <li>
          <strong>Bronze tier</strong> — contribute at least the Bronze cutoff
          amount
        </li>
        <li>
          <strong>Silver tier</strong> — contribute at least the Silver cutoff
          (also gets Bronze rewards)
        </li>
        <li>
          <strong>Gold tier</strong> — contribute at least the Gold cutoff (gets
          Gold + Silver + Bronze rewards)
        </li>
      </ul>
      <InfoBox variant="info">
        Tier rewards <strong>stack</strong>. If you hit Gold, you receive all
        three tiers of rewards, not just the Gold one.
      </InfoBox>
      <p>
        On top of tiers, some rewards are <strong>proportional</strong> — the
        more you contribute, the more you receive. Big contributors get
        proportionally bigger payouts.
      </p>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Faction Registry Details</h2>
      <StatTable
        headers={["Index", "Name", "Key", "Description"]}
        rows={[
          [
            "1",
            "The Agency",
            "Agency",
            "Relationship with the world administrators (the Menu)",
          ],
          [
            "2",
            "The Elders",
            "Mina",
            "Relationship with Mina and her business/investors",
          ],
          [
            "3",
            "The Nursery",
            "Nursery",
            "Relationship with the Nursery and its mysterious forces",
          ],
        ]}
      />

      <h2>Reputation Earning Rates</h2>
      <StatTable
        headers={["Faction", "Source", "Points Per Quest"]}
        rows={[
          ["Agency", "Main story quests", "2, 4, or 6"],
          ["Elders", "Mina's faction quests", "2, 4, or 6"],
          ["Nursery", "Specific quests", "4"],
        ]}
      />
      <p>
        Reputation can also be decremented by the system, though this is not
        currently used in standard gameplay.
      </p>

      <h2>Community Goal Mechanics</h2>

      <h3>Contribution Flow</h3>
      <p>
        When contributing to a goal, the system performs these steps:
      </p>
      <ol>
        <li>Verify the goal exists and is enabled</li>
        <li>
          Check requirements — you must meet all prerequisites, and be in the
          correct room if the goal is room-gated
        </li>
        <li>Verify the goal is not yet complete</li>
        <li>
          Cap your contribution if it would exceed the target (you only donate
          the remaining amount needed)
        </li>
        <li>Deduct the resource from your account</li>
        <li>Increment the goal&apos;s progress and your personal contribution</li>
      </ol>

      <FormulaBlock label="Contribution Capping">
        {
          "if (currentBalance + contribution >= target):\n    contribution = target - currentBalance\n    goal is marked complete"
        }
      </FormulaBlock>

      <h3>Reward Tiers</h3>
      <p>
        Each tier has a cutoff — the minimum contribution amount to qualify:
      </p>
      <StatTable
        headers={["Cutoff Value", "Behavior"]}
        rows={[
          ["> 0", "Standard tier — qualify if your contribution >= cutoff"],
          [
            "= 0",
            "Special: proportional rewards multiplied by your contribution amount",
          ],
        ]}
      />

      <h3>Proportional Rewards</h3>
      <FormulaBlock label="Proportional Reward Formula">
        {"reward_amount = base_reward x contribution_amount"}
      </FormulaBlock>
      <p>
        This means if you contribute 100 units and the proportional reward is 5
        items per unit, you receive 500 items. Larger contributors always
        receive proportionally more.
      </p>

      <h3>Tier Stacking</h3>
      <p>
        Higher tier rewards include all lower tier rewards. A Gold-tier
        contributor receives:
      </p>
      <ul>
        <li>All Gold-tier rewards</li>
        <li>All Silver-tier rewards</li>
        <li>All Bronze-tier rewards</li>
        <li>Plus any proportional rewards based on contribution amount</li>
      </ul>

      <h3>Room Gating</h3>
      <p>
        Some goals require you to be in a specific room to contribute or claim.
        If no room is specified, the goal is global and you can participate from
        anywhere.
      </p>

      <h3>Claiming Rewards</h3>
      <p>
        You can claim rewards only after the goal is complete. Each account can
        only claim once — the system marks your contribution as claimed to
        prevent double-claiming.
      </p>

      <h2>Goal Reward Types</h2>
      <StatTable
        headers={["Reward Type", "Description"]}
        rows={[
          ["ITEM", "Items, Musu, XP"],
          ["ITEM_DROPTABLE", "Random loot via commit-reveal"],
          ["STAT", "Direct stat modifications"],
          ["DISPLAY_ONLY", "Shown in UI only, not actually distributed"],
        ]}
      />
    </>
  );
}
