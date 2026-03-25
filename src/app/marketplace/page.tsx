import {
  MechanicPage,
  InfoBox,
  StatTable,
} from "@/components/mechanic-page";

export default function MarketplacePage() {
  return (
    <MechanicPage
      title="Marketplace"
      subtitle="Buy, sell, and trade everything in Kamigotchi — from items to Kamis themselves"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>Your Hub for Commerce</h2>
      <p>
        The Marketplace is where Kamigotchi&apos;s economy comes alive. Whether
        you want to buy food from an NPC merchant, trade items with another
        player, or sell your Kami on the open market, there is a system for it.
      </p>

      <h2>Marketplace Systems</h2>
      <StatTable
        headers={["System", "What It Does"]}
        rows={[
          [
            "NPC Merchants",
            "Buy and sell items from Mina and the Vending Machine at fixed or dynamic prices",
          ],
          [
            "Player Trading",
            "Create item trade offers with other players using a 3-step escrow system",
          ],
          [
            "KamiSwap",
            "On-chain orderbook for buying and selling Kami NFTs — listings, offers, and collection offers",
          ],
          [
            "Kami Distribution",
            "Acquire new Kamis through Gacha minting, rerolling, GDA ticket auctions, or the Newbie Vendor",
          ],
          [
            "Onyx & Token Portal",
            "Bridge ERC-20 tokens in and out of the game, with import/export taxes",
          ],
          [
            "VIP Program",
            "Earn engagement scores across 2-week epochs for Initia VIP rewards",
          ],
        ]}
      />

      <h2>Quick Links</h2>
      <ul>
        <li>
          <a href="/marketplace/merchants">NPC Merchants</a> — Mina&apos;s shop
          and the Vending Machine
        </li>
        <li>
          <a href="/marketplace/trading">Player Trading</a> — peer-to-peer item
          escrow
        </li>
        <li>
          <a href="/marketplace/kamiswap">KamiSwap</a> — buy and sell Kami NFTs
        </li>
        <li>
          <a href="/marketplace/kami-distribution">Kami Distribution</a> — Gacha
          minting, auctions, and the Newbie Vendor
        </li>
        <li>
          <a href="/marketplace/onyx">Onyx &amp; Token Portal</a> — ERC-20
          token bridging
        </li>
        <li>
          <a href="/marketplace/vip">VIP Program</a> — engagement scoring and
          epochs
        </li>
      </ul>

      <InfoBox variant="tip">
        Many marketplace actions have fees or taxes. Make sure to check the
        specific page for each system to understand the costs before trading.
      </InfoBox>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Fee Overview</h2>
      <p>
        Each marketplace system has its own fee structure. Here is a summary:
      </p>
      <StatTable
        headers={["System", "Fee Type", "Details"]}
        rows={[
          ["NPC Merchants", "Dynamic pricing", "GDA prices rise with demand, decay over time"],
          ["Player Trading", "Creation + delivery fees", "Musu fees; delivery waived in Room 66"],
          ["Player Trading", "Trade tax", "Applied to Musu side only; taxed amount is burned"],
          ["KamiSwap", "Market fee", "fee = price x numerator / 10^precision"],
          ["KamiSwap", "Purchase cooldown", "1 hour after buying a Kami"],
          ["Token Portal", "Import/export tax", "1 flat + 1% (100 basis points)"],
          ["Token Portal", "Withdrawal delay", "1 day before tokens can be claimed"],
          ["Item Transfer", "Transfer fee", "15 Musu per item type"],
        ]}
      />

      <h2>Room-Based Commerce</h2>
      <p>
        Several marketplace features are tied to specific rooms:
      </p>
      <StatTable
        headers={["Room", "Feature"]}
        rows={[
          ["Room 13", "Mina's shop — buy food, tools, and materials"],
          ["Room 18", "Vending Machine — alternative food vendor in the Caves"],
          ["Room 66", "Trade Room — delivery fees are waived here"],
        ]}
      />
    </>
  );
}
