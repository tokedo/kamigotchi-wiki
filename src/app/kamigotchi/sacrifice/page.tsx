import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function SacrificePage() {
  return (
    <MechanicPage
      title="Sacrifice"
      subtitle="Permanently burn a Kami for rare item rewards"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>What is Sacrifice?</h2>
      <p>
        Sacrifice is a deliberate, <strong>permanent</strong> way to destroy one
        of your Kamis in exchange for a random item reward. Unlike combat deaths,
        a sacrificed Kami is gone forever — it cannot be revived. The NFT is
        burned and the Kami is removed from the game.
      </p>

      <InfoBox variant="warning">
        Sacrifice is <strong>irreversible</strong>. The Kami&apos;s ERC-721 token
        is transferred to the burn address and can never be recovered. Make sure
        you truly want to sacrifice before committing.
      </InfoBox>

      <h2>Why Sacrifice?</h2>
      <p>
        Sacrifice is a strategic mechanic for <strong>acquiring rare items</strong>.
        It is not combat — it is a resource conversion system. You trade a Kami
        (permanently) for a roll on a reward table. The pity system guarantees
        that persistent players eventually receive higher-quality rewards.
      </p>

      <h2>How It Works</h2>
      <p>
        Sacrifice uses a <strong>two-step commit-reveal pattern</strong> to
        ensure fair randomness:
      </p>
      <ol>
        <li>
          <strong>Commit</strong> — You choose a Kami to sacrifice. The Kami is
          immediately burned (state set to DEAD, HP to 0, NFT sent to burn
          address). The system records which droptable to use based on your pity
          counter.
        </li>
        <li>
          <strong>Reveal</strong> — In a separate transaction (after at least one
          block), you reveal the commit. The system generates a random seed from
          the blockhash and selects one item from the droptable. The item is
          added to your inventory.
        </li>
      </ol>

      <InfoBox variant="tip">
        The two-step process prevents manipulation. Because the random seed is
        based on a future block, no one can predict or influence which item
        they&apos;ll receive.
      </InfoBox>

      <h2>Requirements</h2>
      <ul>
        <li>You must own the Kami</li>
        <li>The Kami must be in the <strong>Resting</strong> state</li>
        <li>One Kami per sacrifice transaction</li>
      </ul>

      <h2>The Pity System</h2>
      <p>
        Every account has a running sacrifice counter. At fixed intervals, you
        are guaranteed a better reward:
      </p>
      <StatTable
        headers={["Milestone", "Droptable Used"]}
        rows={[
          ["Every 20 sacrifices", "Uncommon droptable (guaranteed uncommon+ items)"],
          ["Every 100 sacrifices", "Rare droptable (guaranteed rare+ items)"],
          ["All other sacrifices", "Normal droptable (standard rewards)"],
        ]}
      />
      <p>
        If both milestones align (e.g., sacrifice #100 is both the 20th and
        100th), <strong>rare pity takes precedence</strong> — you get the rare
        droptable.
      </p>

      <InfoBox variant="info">
        The pity counter is per-account, not per-Kami. It accumulates across all
        your sacrifices, so dedicated players are rewarded over time.
      </InfoBox>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Commit Process</h2>
      <p>
        When you commit a sacrifice, the following steps execute:
      </p>
      <ol>
        <li>Verify ownership and RESTING state</li>
        <li>Sync Kami state (update health etc.)</li>
        <li>Increment the account&apos;s pity counter</li>
        <li>Select the droptable based on pity count</li>
        <li>
          Create a commit entity (KAMI_SACRIFICE_COMMIT type) storing the
          droptable ID and Kami ID
        </li>
        <li>
          Burn the Kami:
          <ul>
            <li>
              Transfer ERC-721 token to burn address
              (0x000...dEaD)
            </li>
            <li>Set Kami state to DEAD, health to 0</li>
            <li>Clear ownership (Kami removed from party)</li>
          </ul>
        </li>
      </ol>

      <h2>Reveal Process</h2>
      <p>
        Revealing can be batched — you can reveal multiple commits at once:
      </p>
      <ol>
        <li>Validate all commits are KAMI_SACRIFICE_COMMIT type</li>
        <li>Filter out already-revealed or invalid commits</li>
        <li>
          For each commit:
          <ul>
            <li>Extract droptable ID and holder account</li>
            <li>Generate seed from blockhash</li>
            <li>Select 1 item from the droptable via weighted random</li>
            <li>Distribute item to the account&apos;s inventory</li>
            <li>Emit reveal event</li>
          </ul>
        </li>
      </ol>

      <h2>Pity System Details</h2>
      <FormulaBlock label="Droptable Selection">
        {"pityCount = account.sacrificeCounter + 1\n\nif pityCount % 100 == 0:\n    droptable = \"droptable.sacrifice.rare\"\nelif pityCount % 20 == 0:\n    droptable = \"droptable.sacrifice.uncommon\"\nelse:\n    droptable = \"droptable.sacrifice.normal\""}
      </FormulaBlock>

      <h2>Droptables</h2>
      <StatTable
        headers={["Droptable ID", "Purpose"]}
        rows={[
          [
            "keccak256(\"droptable.sacrifice.normal\")",
            "Standard sacrifice rewards — base pool",
          ],
          [
            "keccak256(\"droptable.sacrifice.uncommon\")",
            "Guaranteed uncommon+ items",
          ],
          [
            "keccak256(\"droptable.sacrifice.rare\")",
            "Guaranteed rare+ items",
          ],
        ]}
      />
      <p>
        Each droptable has its own set of item keys and rarity weights,
        registered at deployment.
      </p>

      <h2>Burn Mechanics</h2>
      <StatTable
        headers={["Action", "Detail"]}
        rows={[
          ["ERC-721 token", "Transferred to 0x000...dEaD (burn address)"],
          ["Kami state", "Set to DEAD"],
          ["Health", "Set to 0"],
          ["Ownership", "Cleared (IDOwnsKami set to 0)"],
          ["Revival", "NOT possible — unlike normal death, sacrifice is permanent"],
        ]}
      />

      <h2>Tracking & Logging</h2>
      <StatTable
        headers={["Data Key", "Scope", "Description"]}
        rows={[
          ["KAMI_SACRIFICE", "Per account", "Total sacrifices by this account"],
          ["KAMI_SACRIFICE_TOTAL", "Global", "Total sacrifices across all accounts"],
          ["SACRIFICE_RARE_PITY", "Per account", "Rare pity triggers"],
          ["SACRIFICE_RARE_PITY_TOTAL", "Global", "Total rare pity triggers"],
          ["SACRIFICE_UNCOMMON_PITY", "Per account", "Uncommon pity triggers"],
          ["SACRIFICE_UNCOMMON_PITY_TOTAL", "Global", "Total uncommon pity triggers"],
          ["SACRIFICE_ITEM_TOTAL", "Per account per item", "Items received from sacrifice"],
        ]}
      />
    </>
  );
}
