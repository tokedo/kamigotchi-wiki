import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

function Overview() {
  return (
    <>
      <h2>Bonus Loot from Harvesting</h2>
      <p>
        Scavenging is a <strong>secondary reward system</strong> that runs
        alongside harvesting. As your Kami harvests, it fills up a{" "}
        <strong>scavenge bar</strong> at the current node. When the bar reaches
        a threshold, you can claim bonus rewards &mdash; items, stat boosts, or
        random loot from a droptable.
      </p>

      <h3>How It Works</h3>
      <ol>
        <li>
          Your Kami harvests at a node, generating Musu. The amount of Musu
          produced is also added to your <strong>scavenge points</strong> for
          that node.
        </li>
        <li>
          Once your points reach the node&apos;s <strong>tier cost</strong>,
          you can claim a reward tier.
        </li>
        <li>
          After claiming, your points reset to the leftover (partial progress
          toward the next tier is kept).
        </li>
      </ol>

      <InfoBox variant="tip">
        More productive harvesting fills the scavenge bar faster. A Kami with
        matched affinities earning 2x Musu also accumulates scavenge points
        at 2x speed.
      </InfoBox>

      <h3>Tier Costs</h3>
      <p>
        Different nodes have different scavenge costs. Higher-cost nodes
        require more harvesting per reward, but typically offer rarer loot:
      </p>
      <StatTable
        headers={["Tier Cost", "Node Examples"]}
        rows={[
          ["100", "Misty Riverside, Tunnel of Trees, starter nodes"],
          ["200", "Forest paths, cave rooms, mid-tier nodes"],
          ["300", "Deeper Forest Path, Airplane Crash, advanced nodes"],
          ["500", "Scrap Confluence, Techno Temple, premium nodes"],
        ]}
      />

      <h3>Reward Types</h3>
      <StatTable
        headers={["Type", "What You Get"]}
        rows={[
          ["Item Droptable", "Random item from the node's loot table"],
          ["Stat Boost", "Direct stat modifications"],
          ["Bonus", "Temporary buffs"],
        ]}
      />

      <h3>Per-Node Tracking</h3>
      <p>
        Scavenge progress is tracked <strong>per account, per node</strong>.
        Your progress at Misty Riverside is completely separate from your
        progress at Scrap Confluence. You can work toward rewards at multiple
        nodes simultaneously.
      </p>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Point Accumulation</h2>
      <p>
        Points are added whenever your Kami collects or stops harvesting:
      </p>

      <FormulaBlock label="Scavenge Points">
        {`pointsAdded = harvestOutputAmount`}
      </FormulaBlock>

      <p>
        The scavenge points added equal the harvest output. More productive
        harvests generate more scavenge points.
      </p>

      <InfoBox>
        Points are stored per-account per-node. Each account has a separate
        scavenge tracker for every node they harvest at.
      </InfoBox>

      <h2>Claiming Rewards</h2>

      <FormulaBlock label="Tier Calculation">
        {`tiers = floor(currentPoints / tierCost)
remainingPoints = currentPoints % tierCost

If tiers = 0: nothing to claim (revert)`}
      </FormulaBlock>

      <p>
        You can accumulate multiple tiers before claiming. If the tier cost is
        100 and you have 350 points, you claim 3 tiers of rewards and keep 50
        points of progress toward the next tier.
      </p>

      <h2>Reward Distribution</h2>
      <p>
        Rewards are configured as allocation entities anchored to the scavenge
        bar. Each tier claim distributes all configured rewards, multiplied by
        the number of tiers claimed.
      </p>

      <h3>Reward Types</h3>
      <StatTable
        headers={["Type", "Description"]}
        rows={[
          ["ITEM_DROPTABLE", "Creates a droptable commit (random loot via commit-reveal scheme)"],
          ["STAT", "Applies stat modifications to the account or Kami"],
          ["BONUS", "Assigns temporary bonuses"],
          ["CLEAR_BONUS", "Clears all bonuses from the holder"],
          ["Basic types", "Gives items, XP, reputation, etc."],
          ["DISPLAY_ONLY", "No actual distribution, used for UI display only"],
        ]}
      />

      <InfoBox variant="tip">
        Droptable rewards use a commit-reveal scheme. After claiming, you must
        separately reveal the droptable result to receive the actual item.
      </InfoBox>

      <h2>Scavenge Bar Configuration</h2>
      <StatTable
        headers={["Field", "Description"]}
        rows={[
          ["Type", "Field type (e.g. NODE)"],
          ["Index", "Node index this bar belongs to"],
          ["Affinity", "Matches the node's affinity type"],
          ["Value (Tier Cost)", "Points needed per reward tier"],
        ]}
      />

      <h2>Logging</h2>
      <p>
        Scavenge claims are logged for quest tracking and analytics:
      </p>
      <StatTable
        headers={["Data Key", "Scope", "Description"]}
        rows={[
          ["SCAV_CLAIM_{FIELD}", "Per account (total)", "Total scavenge claims across all nodes"],
          ["SCAV_CLAIM_{FIELD}", "Per account per node", "Claims at a specific node"],
          ["SCAV_CLAIM_AFFINITY_{AFF}", "Per account per affinity", "Claims by node affinity type (e.g. all Eerie nodes)"],
        ]}
      />

      <InfoBox>
        These logs enable quests that require scavenging at specific nodes or
        collecting from nodes with a particular affinity type.
      </InfoBox>
    </>
  );
}

export default function ScavengingPage() {
  return (
    <MechanicPage
      title="Scavenging"
      subtitle="Fill the scavenge bar with harvest output to earn bonus loot from droptables"
      overview={<Overview />}
      details={<Details />}
    />
  );
}
