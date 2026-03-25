import { InfoBox, StatTable } from "@/components/mechanic-page";

export default function GettingStartedPage() {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your first steps in Kamigotchi — from wallet setup to your first
          harvest
        </p>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>What Is Kamigotchi?</h2>
        <p>
          Kamigotchi is a <strong>pure on-chain MMORPG</strong> running on
          Yominet. You adopt, raise, and manage creatures called{" "}
          <strong>Kamis</strong> — harvesting resources, crafting items,
          completing quests, and competing with other players. Everything happens
          on-chain: your Kami, your items, your progress. No centralized servers,
          no wipes, no takebacks.
        </p>

        <InfoBox variant="info">
          Kamigotchi uses its own in-game currencies. <strong>Musu</strong> is
          the base resource you earn by harvesting. <strong>Obol</strong> is the
          premium currency. <strong>Onyx Shards</strong> can be bridged
          to/from the ERC-20 Onyx token.
        </InfoBox>

        <h2>Step 1: Set Up Your Wallet</h2>
        <p>
          You need a wallet that supports the Yominet network. The game runs
          fully on-chain, so every action is a transaction. Here is what you
          need:
        </p>
        <ul>
          <li>
            A browser wallet (such as MetaMask or Rabby) configured for the
            Yominet chain
          </li>
          <li>
            A small amount of ETH on Yominet for gas fees — transactions are
            cheap, but you still need some
          </li>
        </ul>

        <h2>Step 2: Get Your First Kami</h2>
        <p>
          There are several ways to obtain a Kami, but the easiest path for new
          players is the <strong>Newbie Vendor</strong>. If your account is less
          than 24 hours old, you can purchase a Kami at a fair market price
          (based on recent marketplace sales, with a floor of 0.005 ETH). You
          get to pick from 3 Kamis that rotate every 48 hours.
        </p>
        <p>Other ways to get a Kami:</p>
        <ul>
          <li>
            <strong>Gacha mint</strong> — spend a Gacha Ticket to mint a random
            Kami from the pool (up to 5 per transaction)
          </li>
          <li>
            <strong>GDA auction</strong> — buy Gacha Tickets with Musu at a
            dynamic price that decays over time
          </li>
          <li>
            <strong>KamiSwap marketplace</strong> — buy a Kami directly from
            another player
          </li>
        </ul>
        <p>
          See{" "}
          <a href="/marketplace/kami-distribution" className="text-primary underline">
            Kami Distribution
          </a>{" "}
          for full details on all acquisition methods.
        </p>

        <InfoBox variant="tip">
          Every Kami is born with 5 permanent traits that determine its stats and
          appearance. Pay attention to the <strong>Power</strong> stat (harvest
          speed), <strong>Harmony</strong> (strain resistance), and{" "}
          <strong>affinities</strong> (harvest bonuses on matching nodes). Check
          the{" "}
          <a href="/kamigotchi/traits" className="text-primary underline">
            Traits
          </a>{" "}
          page to learn what makes a good Kami.
        </InfoBox>

        <h2>Step 3: Start Harvesting</h2>
        <p>
          Harvesting is <strong>the</strong> core gameplay loop. You place your
          Kami on a harvest node in a room, and it passively generates{" "}
          <strong>Musu</strong> over time. The basic flow:
        </p>
        <ol>
          <li>Move to a room that has harvest nodes</li>
          <li>
            Place your Kami on a node — it starts earning Musu and gaining XP
          </li>
          <li>
            Collect periodically to bank your earnings (and fill the scavenge
            bar for bonus loot)
          </li>
          <li>Stop when you want to do something else with your Kami</li>
        </ol>

        <InfoBox variant="warning">
          While harvesting, your Kami takes <strong>strain damage</strong> (HP
          drain). If its HP drops too low, another player on the same node can{" "}
          <strong>liquidate</strong> it — killing your Kami and stealing a
          portion of your bounty. Collect often and watch your HP!
        </InfoBox>

        <p>
          Your harvest output depends on your Kami&apos;s <strong>Power</strong>{" "}
          stat and how well its <strong>affinities</strong> match the node. A
          perfect affinity match can double your earnings. See the{" "}
          <a href="/harvesting" className="text-primary underline">
            Harvesting
          </a>{" "}
          page for formulas and strategy.
        </p>

        <h2>Step 4: Your First Quest</h2>
        <p>
          Quests give you direction, rewards, and XP. The game has{" "}
          <strong>155 quests</strong> organized in chains with prerequisites. To
          get started:
        </p>
        <ol>
          <li>
            Open the quest log — you will see quests available based on your
            current level and location
          </li>
          <li>
            Accept a quest and follow its objectives (deliver items, reach a
            location, craft something, etc.)
          </li>
          <li>
            Complete it to earn rewards — items, XP, skill points, and sometimes
            access to new areas
          </li>
        </ol>
        <p>
          Explore the full{" "}
          <a href="/quests" className="text-primary underline">
            Quest system
          </a>{" "}
          and the interactive{" "}
          <a href="/quests/graph" className="text-primary underline">
            Quest Graph
          </a>{" "}
          to plan your progression.
        </p>

        <h2>Key Concepts at a Glance</h2>
        <StatTable
          headers={["Concept", "What It Means"]}
          rows={[
            [
              "Musu",
              "Base resource earned from harvesting. Used to buy items, craft, and trade.",
            ],
            [
              "Obol",
              "Premium currency. Costs 1 Obol to liquidate another Kami.",
            ],
            [
              "Onyx Shards",
              "In-game form of the Onyx ERC-20 token. Can be bridged in/out.",
            ],
            [
              "Affinity",
              "Body and Hand traits have types (Eerie, Scrap, Insect, Normal) that affect harvest rate on matching nodes.",
            ],
            [
              "Strain",
              "HP damage your Kami takes while harvesting. Higher Harmony = less strain.",
            ],
            [
              "Liquidation",
              "Another player kills your harvesting Kami and steals some of your bounty.",
            ],
            [
              "Stamina",
              "Account-level resource that regenerates over time. Spent on movement, crafting, and other actions.",
            ],
            [
              "Skill Points",
              "Earned on level-up. Spent to unlock skills across 4 trees (Predator, Enlightened, Guardian, Harvester).",
            ],
          ]}
        />

        <h2>Where to Go Next</h2>
        <StatTable
          headers={["Topic", "Page"]}
          rows={[
            ["Understand your Kami's stats", "/kamigotchi/stats"],
            ["Learn about traits and affinities", "/kamigotchi/traits"],
            ["Master harvesting", "/harvesting"],
            ["Browse items and equipment", "/items"],
            ["Plan your skill build", "/kamigotchi/levels-and-skills"],
            ["Explore the world map", "/world/map"],
            ["Start questing", "/quests"],
            ["Trade and sell", "/marketplace"],
          ]}
        />
      </div>
    </article>
  );
}
