import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function KamigotchiOverviewPage() {
  return (
    <MechanicPage
      title="What is a Kami?"
      subtitle="The heart of Kamigotchi — your on-chain virtual companion"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>Your On-Chain Companion</h2>
      <p>
        A <strong>Kami</strong> is your virtual pet in Kamigotchi. Every Kami is a
        unique, one-of-a-kind creature that lives entirely on the blockchain. You
        can harvest resources with it, send it into combat, teach it skills, equip
        it with gear, and much more. Think of it as a Tamagotchi that truly
        belongs to you.
      </p>

      <h2>Every Kami is an NFT</h2>
      <p>
        Each Kami is an <strong>ERC-721 NFT</strong> on Yominet. There will only
        ever be <strong>22,222 Kamis</strong> in existence — no more can ever be
        created. Because they live on-chain, you truly own your Kami and can trade
        or transfer it freely.
      </p>

      <h2>In-Game vs External</h2>
      <p>
        Your Kami exists in one of two states:
      </p>
      <ul>
        <li>
          <strong>In-game (staked)</strong> — Your Kami is active in the world. It
          can harvest, fight, learn skills, and do everything the game offers.
          While in-game, the NFT is held by the game contract.
        </li>
        <li>
          <strong>External</strong> — Your Kami sits in your wallet as a standard
          NFT. You can trade it on marketplaces, transfer it to friends, or just
          hold it. It cannot perform any in-game actions while external.
        </li>
      </ul>
      <p>
        You bridge your Kami between these states from <strong>Room 12</strong>{" "}
        (the bridge room). Staking brings it in-game; unstaking sends it to your
        wallet.
      </p>

      <InfoBox variant="info">
        Unstaking requires your Kami to be in the <strong>Resting</strong> state
        and not soulbound. You must be in Room 12 to stake or unstake.
      </InfoBox>

      <h2>How Kamis are Born</h2>
      <p>
        New Kamis are created through the <strong>Gacha</strong> minting system.
        When a Kami is born, it receives:
      </p>
      <ul>
        <li>A default name (like &quot;Kamigotchi 42&quot;)</li>
        <li>
          <strong>5 random traits</strong> — Face, Hand, Body, Background, and
          Color — each chosen by weighted random selection
        </li>
        <li>
          Stats calculated from a base plus all trait modifiers
        </li>
        <li>Level 1 with 1 skill point and 0 experience</li>
        <li>The &quot;Resting&quot; state, ready for action</li>
      </ul>

      <h2>The 5 Trait Slots</h2>
      <p>
        Every Kami has exactly 5 traits that define its appearance and stats.
        Traits are permanent — they never change after creation.
      </p>
      <StatTable
        headers={["Slot", "Trait Type", "What It Affects"]}
        rows={[
          ["1", "Face", "Appearance + stat modifiers"],
          ["2", "Hand", "Appearance + stat modifiers + hand affinity"],
          ["3", "Body", "Appearance + stat modifiers + body affinity"],
          ["4", "Background", "Appearance + stat modifiers"],
          ["5", "Color", "Appearance + stat modifiers"],
        ]}
      />
      <p>
        Rarer traits tend to give stronger stat bonuses. Your Kami&apos;s Body and
        Hand traits also determine its <strong>affinity types</strong>, which
        affect harvesting efficiency and combat effectiveness.
      </p>

      <h2>Why Your Kami Matters</h2>
      <p>
        Your Kami&apos;s traits, stats, and affinity determine everything about
        how it performs. A Kami with high Violence excels in combat; one with high
        Harmony recovers faster. As you level up and invest skill points, your
        Kami becomes increasingly specialized. Choose wisely — there are no
        do-overs on traits!
      </p>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>ERC-721 Contract Details</h2>
      <StatTable
        headers={["Property", "Value"]}
        rows={[
          ["Token Name", "Kamigotchi"],
          ["Symbol", "KAMI"],
          ["Standard", "ERC-721 + ERC-721Enumerable + ERC-2981"],
          ["Max Supply", "22,222"],
          ["Default Royalty", "3.33% (333 basis points)"],
        ]}
      />

      <h2>Kami States</h2>
      <StatTable
        headers={["State", "Description"]}
        rows={[
          ["RESTING", "Idle — can harvest, level up, learn skills, be sent"],
          ["HARVESTING", "Actively harvesting resources at a node"],
          ["DEAD", "Killed in combat or sacrificed — needs revival"],
          ["721_EXTERNAL", "Unstaked — held in player wallet as standard NFT"],
        ]}
      />

      <h2>Creation Flow</h2>
      <p>
        The exact creation process executes these steps in order:
      </p>
      <ol>
        <li>Assign a sequential index based on total supply + 1</li>
        <li>Generate a deterministic entity ID from the index</li>
        <li>Verify uniqueness (no duplicate entity)</li>
        <li>Set base properties (name, state, level, XP, skill points)</li>
        <li>Roll 5 traits via weighted random selection using blockhash-based seed</li>
        <li>Compute stats: base values + sum of all trait stat deltas</li>
        <li>Pack trait indices into a media URI for the image</li>
        <li>Mint the ERC-721 token (held by the contract, in-game from birth)</li>
      </ol>

      <h2>Base Stats at Creation</h2>
      <p>
        Before traits are applied, every Kami starts with these hardcoded base
        values:
      </p>
      <StatTable
        headers={["Stat", "Base Value"]}
        rows={[
          ["Health", 50],
          ["Power", 10],
          ["Violence", 10],
          ["Harmony", 10],
          ["Slots", 0],
        ]}
      />
      <FormulaBlock label="Final Stat at Creation">
        {"Final Stat = Base + sum(trait stat deltas for all 5 traits)"}
      </FormulaBlock>

      <h2>Initial Stat Component Values</h2>
      <p>
        Stats are stored as 4-part structs (base, shift, boost, sync). At
        creation, shift and boost start at 0. Health and Slots are
        &quot;depletable&quot; — their sync value starts at full (equal to base).
      </p>
      <StatTable
        headers={["Stat", "base", "shift", "boost", "sync"]}
        rows={[
          ["Health", "computed", "0", "0", "= base (starts full)"],
          ["Power", "computed", "0", "0", "0"],
          ["Violence", "computed", "0", "0", "0"],
          ["Harmony", "computed", "0", "0", "0"],
          ["Slots", "computed", "0", "0", "= base (starts full)"],
        ]}
      />

      <h2>Trait Rolling Mechanics</h2>
      <FormulaBlock label="Randomness Seed">
        {"seed = keccak256(blockhash(block.number - 1), kamiEntityID)\ntraitSeed[i] = keccak256(seed, i)  // per-slot seed"}
      </FormulaBlock>
      <FormulaBlock label="Trait Weight">
        {"weight = rarity > 0 ? 2^(rarity - 1) : 0\n\nHigher rarity value = higher weight = more common.\nRarity 0 traits cannot be selected."}
      </FormulaBlock>

      <h2>Staking / Unstaking</h2>
      <p>
        <strong>Staking (Bridge In)</strong> — requires Room 12, transfers the
        ERC-721 token from your wallet to the game contract. Supports batch
        staking.
      </p>
      <p>
        <strong>Unstaking (Bridge Out)</strong> — requires Room 12, Kami must be
        Resting and not soulbound. Transfers the token back to your wallet.
        Supports batch unstaking.
      </p>

      <h2>Metadata</h2>
      <p>
        On-chain JSON metadata includes: name, all 5 trait names, body affinity,
        hand affinity, breed (Pure or Mixed), base stats, and level. The image URL
        is derived from the packed media URI of trait indices.
      </p>
      <InfoBox variant="info">
        <strong>Breed</strong> is derived from affinities: if body and hand
        affinity match, the Kami is <strong>Pure</strong>; otherwise it
        is <strong>Mixed</strong>.
      </InfoBox>
    </>
  );
}
