import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function QuestsPage() {
  return (
    <MechanicPage
      title="Quests"
      subtitle="Structured tasks with requirements, objectives, and rewards — 155 quests and counting"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>What Are Quests?</h2>
      <p>
        Quests are structured tasks you can pick up, work toward, and complete
        for rewards. Each quest has <strong>requirements</strong> (things you
        need before you can accept it), <strong>objectives</strong> (things you
        need to do), and <strong>rewards</strong> (items, reputation, or special
        unlocks you earn on completion).
      </p>
      <p>
        Think of quests as your guided journey through Kamigotchi. They teach
        you the ropes, push you to explore new areas, and reward you for
        engaging with different game systems.
      </p>

      <h2>Quest Types</h2>
      <StatTable
        headers={["Type", "Description", "Count"]}
        rows={[
          [
            "Main (MSQ)",
            "The main storyline. These quests form a chain — each one requires completing the previous.",
            "108 quests",
          ],
          [
            "Faction (Mina)",
            "Quests from Mina that build your reputation with The Elders faction.",
            "16 quests",
          ],
          [
            "Side (SQ)",
            "Optional quests from various sources. Less linear, more varied.",
            "24+ quests",
          ],
        ]}
      />

      <h2>How Quests Work</h2>
      <p>
        The basic flow is simple:
      </p>
      <ol>
        <li>
          <strong>Accept</strong> a quest — you must meet all its requirements
          first (like having completed a prior quest or owning a certain item).
        </li>
        <li>
          <strong>Complete objectives</strong> — do whatever the quest asks:
          harvest at a node, collect items, visit a room, craft something, and
          so on.
        </li>
        <li>
          <strong>Turn it in</strong> — once all objectives are met, complete
          the quest to claim your rewards.
        </li>
      </ol>

      <InfoBox variant="tip">
        You can also <strong>drop</strong> a quest if you change your mind. This
        removes it from your active quests so you can pick it up again later.
      </InfoBox>

      <h2>What Can Quests Ask You To Do?</h2>
      <p>
        Quest objectives cover a wide range of activities. Here are some common
        ones:
      </p>
      <ul>
        <li>Harvest at a specific node for a certain amount of time</li>
        <li>Collect or craft specific items</li>
        <li>Visit a particular room</li>
        <li>Buy items from NPC shops</li>
        <li>Move between rooms a number of times</li>
        <li>Complete trades with other players</li>
        <li>Reach a certain level or spend skill points</li>
        <li>Scavenge from specific nodes or affinity types</li>
        <li>Name your Kami, use items, or even get liquidated</li>
      </ul>

      <h2>Repeatable Quests</h2>
      <p>
        Some quests are <strong>repeatable</strong> with a cooldown. After you
        complete a repeatable quest, you can accept it again once the cooldown
        timer expires. This is great for farming specific rewards on a regular
        basis.
      </p>

      <h2>Rewards</h2>
      <p>
        Quest rewards can include:
      </p>
      <ul>
        <li>
          <strong>Items</strong> — Musu, crafting materials, spell cards, and
          more
        </li>
        <li>
          <strong>Reputation</strong> — faction standing with The Agency, The
          Elders, or The Nursery
        </li>
        <li>
          <strong>Flags</strong> — special unlocks like opening new areas (e.g.,
          unlocking the Caves)
        </li>
      </ul>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Objective Tracking System</h2>
      <p>
        Objectives use a <strong>snapshot-based</strong> tracking system. Each
        objective has a <strong>handler type</strong> that determines how
        progress is measured:
      </p>
      <StatTable
        headers={["Handler", "How It Works", "Uses Snapshot?"]}
        rows={[
          [
            "CURRENT",
            "Your value must currently meet the condition (e.g., own 3 Kamis right now)",
            "No",
          ],
          [
            "INCREASE",
            "Your value must have increased by the required amount since you accepted the quest",
            "Yes",
          ],
          [
            "DECREASE",
            "Your value must have decreased by the required amount since acceptance",
            "Yes",
          ],
          [
            "BOOLEAN",
            "A condition must currently be true (e.g., you are in a specific room)",
            "No",
          ],
        ]}
      />

      <h3>How Snapshots Work</h3>
      <p>
        For INCREASE and DECREASE objectives, the game records your current
        value the moment you accept the quest. When you try to complete it, the
        game calculates the difference:
      </p>
      <FormulaBlock label="Snapshot Checks">
        {
          "INCREASE: (currentValue - snapshotValue) >= requiredValue\nDECREASE: (snapshotValue - currentValue) >= requiredValue"
        }
      </FormulaBlock>
      <p>
        This means only progress made <em>after</em> accepting the quest
        counts. You cannot pre-grind objectives before picking up the quest.
      </p>

      <h2>Full Objective Types</h2>
      <StatTable
        headers={["Objective", "Handler", "Description"]}
        rows={[
          ["HARVEST_TIME", "INCREASE", "Time spent harvesting at a specific node"],
          ["DROPTABLE_ITEM_TOTAL", "INCREASE", "Items received from scavenging"],
          ["ITEM_BURN", "INCREASE", "Items consumed or given away"],
          ["ITEM_TOTAL", "INCREASE", "Items collected"],
          ["ITEM_SPEND", "INCREASE", "Musu spent at shops"],
          ["MOVE", "INCREASE", "Times moved between rooms"],
          ["ROOM", "BOOLEAN", "Currently in a specific room"],
          ["SCAV_CLAIM_NODE", "INCREASE", "Scavenge claims at a specific node"],
          ["SCAV_CLAIM_AFFINITY", "INCREASE", "Scavenge claims by affinity type"],
          ["CRAFT_ITEM", "INCREASE", "Items crafted"],
          ["KAMI_LEVELS_TOTAL", "CURRENT", "Total Kami levels gained"],
          ["KAMI_NUM_OWNED", "CURRENT", "Kamis currently owned"],
          ["KAMI_NAME", "INCREASE", "Kamis named"],
          ["LIQUIDATE_TOTAL", "INCREASE", "Liquidations performed"],
          ["LIQUIDATED_VICTIM", "INCREASE", "Times liquidated"],
          ["LISTING_BUY_TOTAL", "INCREASE", "NPC shop purchases"],
          ["TRADE_EXECUTE", "INCREASE", "Trades executed"],
          ["SKILL_POINTS_USE", "CURRENT", "Skill points spent"],
          ["PHASE", "BOOLEAN", "Current game phase (e.g., Moonside)"],
          ["KAMI_GACHA_REROLL", "INCREASE", "Gacha rerolls performed"],
          ["KAMI_ITEM_USE", "INCREASE", "Items used on a Kami"],
        ]}
      />

      <h2>Requirement Types</h2>
      <p>
        Requirements are checked when you try to accept a quest. If you do not
        meet them, you cannot pick it up.
      </p>
      <StatTable
        headers={["Requirement", "Description"]}
        rows={[
          ["QUEST (COMPLETE)", "Must have completed a specific quest"],
          ["GOAL (COMPLETE)", "Must have completed a community goal"],
          ["ITEM (MIN)", "Must own a minimum quantity of an item"],
          ["ROOM (IS)", "Must be in a specific room"],
          ["BLOCKTIME (MIN/MAX)", "Must be after or before a specific time"],
          ["LIQUIDATED_VICTIM (MIN)", "Must have been liquidated at least once"],
        ]}
      />

      <h2>Quest Data Summary</h2>
      <StatTable
        headers={["Type", "Index Range", "Quest Giver", "Description"]}
        rows={[
          ["MAIN", "1-108", "Menu", "Main story quests (MSQ001-MSQ108)"],
          ["FACTION", "2001-2016", "Mina", "Mina's faction quests (MIN001-MIN016)"],
          ["SIDE", "3001-3024+", "Various", "Side quests (SQ001-SQ024+)"],
        ]}
      />

      <h2>Repeatable Quest Mechanics</h2>
      <p>
        Repeatable quests have a cooldown duration. After completing one, you
        must wait for the cooldown before re-accepting:
      </p>
      <FormulaBlock label="Cooldown Check">
        {"Can re-accept when: block.timestamp > timeStart + cooldownDuration"}
      </FormulaBlock>
      <p>
        When you re-accept a repeatable quest, the old instance is overwritten
        and all objectives are re-snapshotted from scratch.
      </p>

      <h2>Dropping Quests</h2>
      <InfoBox variant="warning">
        Dropping a quest removes it entirely and clears all snapshot data.
        Non-repeatable quests can potentially be re-accepted after dropping,
        but this behavior is not fully confirmed. If in doubt, avoid dropping
        important quests.
      </InfoBox>

      <h2>Reward Distribution</h2>
      <p>
        Rewards are distributed automatically on completion. The system supports
        three reward types:
      </p>
      <StatTable
        headers={["Reward Type", "Description"]}
        rows={[
          ["ITEM", "Items added to your account (Musu, materials, spell cards, etc.)"],
          ["REPUTATION", "Faction reputation points (Agency, Elders, Nursery)"],
          ["FLAG", "Special flags set on your account (e.g., FLAG_CAVES_UNLOCKED)"],
        ]}
      />
    </>
  );
}
