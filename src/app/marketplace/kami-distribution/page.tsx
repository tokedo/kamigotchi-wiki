import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function KamiDistributionPage() {
  return (
    <MechanicPage
      title="Kami Distribution"
      subtitle="Gacha minting, rerolling, GDA ticket auctions, and the Newbie Vendor"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>How to Get a Kami</h2>
      <p>
        There are four ways to acquire a new Kami in Kamigotchi. Each path suits
        different situations — whether you are a brand-new player, a veteran
        looking to reroll, or someone willing to spend Musu on the open auction.
      </p>

      <StatTable
        headers={["Method", "Cost", "Best For"]}
        rows={[
          [
            "Gacha Mint",
            "1 Gacha Ticket per Kami (up to 5 per tx)",
            "Primary way to get new Kamis",
          ],
          [
            "Reroll",
            "1 Reroll Token + 1 existing Kami per swap",
            "Trading an unwanted Kami for a random new one",
          ],
          [
            "GDA Auction (Tickets)",
            "Musu (dynamic price, starts at 32,000)",
            "Buying Gacha Tickets without ETH",
          ],
          [
            "Newbie Vendor",
            "ETH (TWAP-based, min 0.005 ETH)",
            "Brand-new players (first 24 hours)",
          ],
        ]}
      />

      <h2>Gacha Minting</h2>
      <p>
        The gacha is the main Kami creation system. You spend a{" "}
        <strong>Gacha Ticket</strong> to add a new Kami to the shared pool, then
        reveal to receive a random Kami from that pool. You can mint up to{" "}
        <strong>5 Kamis per transaction</strong>.
      </p>
      <p>
        The key thing to understand: minting adds a fresh Kami to the pool, but
        the Kami you receive on reveal is drawn <strong>randomly</strong> from
        the entire pool. You might get the one you just created, or you might
        get one someone else minted earlier.
      </p>

      <InfoBox variant="info">
        The gacha uses a <strong>commit-reveal</strong> pattern for fairness.
        First you commit (spend the ticket), then you reveal (receive a random
        Kami). This prevents anyone from predicting or manipulating which Kami
        they get.
      </InfoBox>

      <h2>Rerolling</h2>
      <p>
        Got a Kami you do not love? Rerolling lets you swap it for a random one.
        You need one <strong>Reroll Token</strong> and one Kami in the{" "}
        <strong>RESTING</strong> state. Your Kami goes into the pool, and you
        draw a new random one.
      </p>
      <p>
        Each Kami tracks how many times it has been rerolled. This counter
        increments each time a Kami is drawn from the pool, so you can see if a
        Kami has been through multiple hands.
      </p>

      <h2>GDA Ticket Auctions</h2>
      <p>
        Do not have a Gacha Ticket? You can buy them through the{" "}
        <strong>Gradual Dutch Auction</strong> system. The price starts high and
        decays over time, but rises with each purchase. This creates a natural
        equilibrium where tickets are always available, just at a market-driven
        price.
      </p>
      <StatTable
        headers={["Auction", "Currency", "Supply", "Target Price", "Decay Rate"]}
        rows={[
          [
            "Gacha Ticket",
            "Musu",
            "17,222 tickets",
            "32,000 Musu",
            "0.75x per day (targets 32 sales/day)",
          ],
          [
            "Reroll Token",
            "Onyx Shards",
            "100,000 tokens",
            "50 Onyx",
            "0.5x per day (targets 16 sales/day)",
          ],
        ]}
      />
      <p>
        If nobody buys for a while, the price drops. If many people buy quickly,
        the price spikes. Over time it trends toward an equilibrium.
      </p>

      <h2>Newbie Vendor</h2>
      <p>
        The Newbie Vendor is a <strong>one-time purchase</strong> available to
        accounts less than <strong>24 hours old</strong>. You get to pick from 3
        Kamis that rotate every <strong>48 hours</strong>. The price is based on
        recent marketplace sale prices (TWAP oracle), with a floor of{" "}
        <strong>0.005 ETH</strong>.
      </p>

      <InfoBox variant="tip">
        The Newbie Vendor is the easiest way for new players to get their first
        Kami. The 3-day soulbind after purchase prevents immediate flipping, but
        you can start harvesting and questing right away.
      </InfoBox>

      <h2>Buying Gacha Tickets with ETH</h2>
      <p>
        During mint events, you can also buy Gacha Tickets directly with ETH:
      </p>
      <ul>
        <li>
          <strong>Whitelist mint</strong> — 0.05 ETH per ticket, max 1 per
          account
        </li>
        <li>
          <strong>Public mint</strong> — 0.1 ETH per ticket, max 222 per account
        </li>
      </ul>
      <p>
        There is a global cap of <strong>3,000 tickets</strong> across all ETH
        purchases.
      </p>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Commit-Reveal Pattern</h2>
      <p>
        All gacha operations (mint and reroll) use a two-step commit-reveal
        pattern for verifiable randomness:
      </p>

      <h3>Step 1: Commit</h3>
      <p>
        When you mint or reroll, the system records the current block number and
        your account ID. Commit IDs are derived via iterative chaining:
      </p>
      <FormulaBlock label="Commit ID Generation">
        {"id = world.getUniqueEntityId()\nfor i in 0..amount:\n    id = keccak256(id, i)\n    commitID[i] = id"}
      </FormulaBlock>

      <h3>Step 2: Reveal</h3>
      <p>
        Anyone can trigger the reveal (it is owner-agnostic). The system:
      </p>
      <ol>
        <li>Verifies all commits are of type GACHA_COMMIT</li>
        <li>Sorts commits by entity ID for chronological ordering</li>
        <li>
          Extracts random seeds from block hashes:{" "}
          <code>seed = keccak256(blockhash(revealBlock), entityID)</code>
        </li>
        <li>
          Draws random Kamis from the pool using no-replacement sampling
        </li>
        <li>Transfers selected Kamis to the original committer</li>
        <li>Increments the reroll counter on each withdrawn Kami</li>
      </ol>

      <InfoBox variant="warning">
        There is a <strong>256-block window</strong> to reveal. After that,
        the block hash becomes unavailable and an admin must call{" "}
        <code>forceReveal()</code> to reset the commit blocks.
      </InfoBox>

      <h2>Gacha Pool</h2>
      <p>
        The pool contains all Kamis owned by the GACHA_ID sentinel entity.
        Pool size is queried dynamically. When minting adds a Kami and reveal
        draws one, the pool acts as a shared buffer.
      </p>
      <p>
        Selection uses <code>LibRandom.getRandomBatchNoReplacement</code> to
        ensure no duplicate draws within a single reveal batch.
      </p>

      <h2>Reroll Counter</h2>
      <StatTable
        headers={["Event", "Counter Behavior"]}
        rows={[
          ["Kami enters pool (deposit)", "Counter is cleared"],
          ["Kami exits pool (withdraw)", "Counter is incremented by 1"],
          [
            "Reroll commit",
            "Old Kami's counter is saved on the commit entity",
          ],
        ]}
      />

      <h2>Mint Limits (ETH Purchases)</h2>
      <StatTable
        headers={["Config", "Value"]}
        rows={[
          ["Max total tickets (global)", "3,000"],
          ["WL start", "2025-05-01 08:00 UTC"],
          ["WL price", "0.05 ETH"],
          ["Max WL per account", "1"],
          ["Public price", "0.1 ETH"],
          ["Max public per account", "222"],
          ["Max mints per transaction", "5"],
        ]}
      />

      <h2>GDA Price Formula</h2>
      <p>
        The Gradual Dutch Auction price uses this formula:
      </p>
      <FormulaBlock label="GDA Spot Price">
        {"spotPrice = targetPrice x decay^(timeDelta) / decay^(prevSold / rate)\n\nWhere:\n  timeDelta = (block.timestamp - startTs) / period\n  prevSold  = total units sold so far\n  decay     = decay factor (stored as int32 x 1e6)\n  rate      = target sales per period\n\nBatch cost = geometric series over qty units at spotPrice\nFinal cost = ceil(result / 1e18)"}
      </FormulaBlock>

      <h3>Current Auction Parameters</h3>
      <StatTable
        headers={[
          "Auction",
          "Item",
          "Currency",
          "Supply",
          "Target Price",
          "Period",
          "Decay",
          "Rate",
        ]}
        rows={[
          [
            "Gacha Ticket",
            "Item 10",
            "Musu (Item 1)",
            "17,222",
            "32,000",
            "86,400s (1 day)",
            "0.75",
            "32/day",
          ],
          [
            "Reroll Token",
            "Item 11",
            "Onyx (Item 100)",
            "100,000",
            "50",
            "86,400s (1 day)",
            "0.5",
            "16/day",
          ],
        ]}
      />

      <h2>Newbie Vendor Details</h2>

      <h3>Eligibility</h3>
      <p>All three conditions must be true:</p>
      <ol>
        <li>
          <code>NEWBIE_VENDOR_ENABLED</code> is true
        </li>
        <li>Account has not previously purchased from the vendor</li>
        <li>
          Account was created within the last 24 hours
        </li>
      </ol>

      <h3>Display Pool Cycling</h3>
      <p>
        The vendor holds a rotating pool of Kamis. At any moment, 3 are
        visible:
      </p>
      <FormulaBlock label="Display Window">
        {"cycleNumber = (block.timestamp - cycleStart) / NEWBIE_VENDOR_CYCLE\noffset = (cycleNumber x 3) % pool.length\n\ndisplayIndices = [\n  pool[(offset + 0) % len],\n  pool[(offset + 1) % len],\n  pool[(offset + 2) % len]\n]"}
      </FormulaBlock>
      <p>
        When a Kami is purchased, it is removed from the pool via swap-with-last.
      </p>

      <h3>Price Calculation</h3>
      <FormulaBlock label="Vendor Price">
        {"price = max(twapPrice, minPrice)\n\nminPrice = 0.005 ETH (NEWBIE_VENDOR_MIN_PRICE)\n\ntwapPrice = (liveCumulative - snapshotCumulative) / windowTime\n\nWhere:\n  liveCumulative = cumulativePriceSeconds + lastPrice x (now - lastUpdateTime)\n  windowTime = now - snapshotTimestamp\n  TWAP window = 86,400 seconds (24 hours)"}
      </FormulaBlock>
      <p>
        The TWAP oracle is fed by every KamiSwap marketplace sale, ensuring the
        vendor price tracks the real market.
      </p>

      <h3>After Purchase</h3>
      <ul>
        <li>
          The Kami is <strong>soulbound for 3 days</strong> (cannot be listed,
          transferred, or offered)
        </li>
        <li>ETH is sent to the configured vendor address</li>
        <li>
          Excess ETH above the price is refunded to the buyer
        </li>
      </ul>

      <h3>Newbie Vendor Config</h3>
      <StatTable
        headers={["Config", "Value"]}
        rows={[
          ["NEWBIE_VENDOR_ENABLED", "true"],
          ["NEWBIE_VENDOR_MIN_PRICE", "0.005 ETH"],
          ["NEWBIE_VENDOR_CYCLE", "172,800 seconds (48 hours)"],
          ["NEWBIE_VENDOR_TWAP_WINDOW", "86,400 seconds (24 hours)"],
        ]}
      />
    </>
  );
}
