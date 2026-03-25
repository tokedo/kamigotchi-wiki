import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function KamiswapPage() {
  return (
    <MechanicPage
      title="KamiSwap"
      subtitle="The on-chain orderbook for trading Kami NFTs — listings, offers, and collection offers"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>What Is KamiSwap?</h2>
      <p>
        KamiSwap is Kamigotchi&apos;s built-in <strong>on-chain
        marketplace</strong> for trading Kami NFTs. Unlike external NFT
        marketplaces, KamiSwap lives entirely inside the game and integrates
        with all game systems. There are three ways to trade:
      </p>

      <h2>Three Order Types</h2>
      <StatTable
        headers={["Order Type", "Direction", "Currency", "How It Works"]}
        rows={[
          [
            "Listing",
            "Sell",
            "ETH",
            "List your Kami at a fixed ETH price. Buyers pay in ETH.",
          ],
          [
            "Specific Offer",
            "Buy",
            "WETH",
            "Offer WETH for a specific Kami you want. The owner can accept your offer.",
          ],
          [
            "Collection Offer",
            "Buy",
            "WETH",
            "Offer WETH per Kami for any Kami. Sellers can accept with any Kami they own.",
          ],
        ]}
      />

      <h2>Selling a Kami (Listing)</h2>
      <p>
        When you list your Kami for sale:
      </p>
      <ul>
        <li>
          Your Kami stays in your wallet — there is <strong>no escrow</strong>.
          It is simply marked as &quot;Listed&quot; which prevents it from
          harvesting, being bridged, or performing other actions.
        </li>
        <li>You set the price in ETH and an optional expiry date</li>
        <li>Anyone can buy your listing by sending the ETH price</li>
        <li>You can cancel your listing at any time to restore your Kami to Resting</li>
      </ul>

      <h2>Making an Offer</h2>
      <p>
        Want to buy a specific Kami? Make a <strong>specific offer</strong>:
      </p>
      <ul>
        <li>
          You offer WETH for a Kami you want. No WETH is transferred upfront —
          you just need to approve the marketplace vault to spend it.
        </li>
        <li>The Kami&apos;s owner can accept your offer, and the trade
          happens automatically</li>
        <li>You can cancel your offer at any time</li>
      </ul>

      <p>
        Want to buy <strong>any</strong> Kami? Make a{" "}
        <strong>collection offer</strong>:
      </p>
      <ul>
        <li>
          You set a price per Kami and a quantity (e.g., &quot;I will buy any 5
          Kamis at 0.01 WETH each&quot;)
        </li>
        <li>Any player can sell you their Kami at your offered price</li>
        <li>The offer stays open until filled or cancelled</li>
      </ul>

      <h2>Purchase Cooldown</h2>
      <p>
        After buying a Kami through KamiSwap, there is a{" "}
        <strong>1-hour cooldown</strong> before you can re-list it or take other
        marketplace actions with it. This prevents rapid flipping.
      </p>

      <InfoBox variant="info">
        KamiSwap is <strong>non-custodial</strong>. Your Kami stays in your
        wallet during a listing, and WETH stays in the buyer&apos;s wallet
        during an offer. No tokens are locked in escrow.
      </InfoBox>

      <h2>TWAP Oracle</h2>
      <p>
        Every sale on KamiSwap feeds its price into a{" "}
        <strong>TWAP (Time-Weighted Average Price)</strong> oracle. This oracle
        is used by the Newbie Vendor to calculate fair market prices for new
        players. It is essentially a rolling average of all KamiSwap sale
        prices.
      </p>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Listing Flow</h2>
      <h3>Creating a Listing</h3>
      <ol>
        <li>Verify the marketplace is enabled</li>
        <li>Verify you own the Kami and it is in RESTING state</li>
        <li>Verify the Kami is not soulbound</li>
        <li>Set the Kami&apos;s state to LISTED</li>
        <li>Create the listing entity with price, expiry, etc.</li>
      </ol>

      <h3>Buying a Listing</h3>
      <p>
        Supports <strong>batch buying</strong> — purchase multiple listings in
        a single transaction:
      </p>
      <ol>
        <li>First pass: verify all listings (active, not expired, not self-trade), calculate total price</li>
        <li>Verify your ETH sent is sufficient</li>
        <li>For each listing:</li>
        <ul>
          <li>Transfer Kami ownership to you, set state to RESTING</li>
          <li>Apply 1-hour purchase cooldown</li>
          <li>Calculate marketplace fee</li>
          <li>Transfer (price - fee) ETH to the seller</li>
          <li>Feed sale price into the TWAP oracle</li>
        </ul>
        <li>Transfer total fees to the fee recipient</li>
        <li>Refund excess ETH to you</li>
      </ol>

      <h2>Offer Flow</h2>
      <h3>Creating an Offer</h3>
      <p>
        No WETH is transferred when creating an offer. The offer relies on your
        pre-approval of the KamiMarketVault contract to spend your WETH.
      </p>

      <h3>Accepting a Specific Offer</h3>
      <ol>
        <li>Verify Kami index matches the offer&apos;s target</li>
        <li>If the Kami is listed, cancel all its listings first</li>
        <li>Reassign Kami ownership, set to RESTING, apply cooldown</li>
        <li>Pull WETH from buyer via vault: send (price - fee) to seller</li>
        <li>Transfer fee to fee recipient</li>
        <li>Feed sale price into TWAP oracle</li>
      </ol>

      <h3>Accepting a Collection Offer</h3>
      <ol>
        <li>Verify quantity remaining is sufficient</li>
        <li>For each Kami: verify ownership, cancel listings if needed, reassign</li>
        <li>Decrement offer balance (auto-fills when balance reaches 0)</li>
        <li>Batched WETH transfers for efficiency</li>
      </ol>

      <h2>Fee Calculation</h2>
      <FormulaBlock label="KamiSwap Fee">
        {"fee = price x numerator / 10^precision\n\nFee parameters come from KAMI_MARKET_FEE_RATE config: [precision, numerator]\n\nFees paid in the same currency as the trade:\n  - ETH for listings\n  - WETH for offers"}
      </FormulaBlock>

      <h2>Purchase Cooldown</h2>
      <FormulaBlock label="Cooldown">
        {"cooldown = KAMI_MARKET_PURCHASE_COOLDOWN = 3600 seconds (1 hour)\n\nApplied after any Kami purchase (listing buy or offer acceptance).\nPrevents immediate re-listing or other marketplace actions."}
      </FormulaBlock>

      <h2>Order States</h2>
      <StatTable
        headers={["State", "Description"]}
        rows={[
          ["ACTIVE", "Order is live and can be filled"],
          ["FILLED", "Order has been fully executed"],
          ["CANCELLED", "Order was cancelled by its owner"],
        ]}
      />

      <h2>Cancellation</h2>
      <ul>
        <li>
          <strong>Listing cancel:</strong> restores Kami to RESTING state (if
          still LISTED)
        </li>
        <li>
          <strong>Offer/collection cancel:</strong> marks as CANCELLED (no
          funds to return since no WETH was escrowed)
        </li>
        <li>
          Listings are auto-cancelled when a Kami is transferred via offer
          acceptance
        </li>
      </ul>

      <h2>KamiMarketVault</h2>
      <p>
        The KamiMarketVault is a persistent relay contract that handles WETH
        and Kami transfers. Buyers approve the vault (not the marketplace
        system) to spend their WETH. This means your approval persists even
        when marketplace contracts are upgraded.
      </p>

      <h2>TWAP Integration</h2>
      <p>
        Every marketplace sale feeds the price into the TWAP oracle:
      </p>
      <FormulaBlock label="TWAP Update (on each sale)">
        {"1. Accumulate: cumulativePriceSeconds += lastPrice x elapsed\n2. Update: lastPrice = salePrice\n3. Set: lastUpdateTime = now\n4. If window elapsed: roll over snapshot"}
      </FormulaBlock>
      <p>
        The TWAP data is consumed by the{" "}
        <a href="/marketplace/kami-distribution">Newbie Vendor</a> to determine
        fair pricing.
      </p>
    </>
  );
}
