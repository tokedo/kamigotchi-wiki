import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function TradingPage() {
  return (
    <MechanicPage
      title="Player Trading"
      subtitle="Trade items with other players through a 3-step escrow system"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>How Trading Works</h2>
      <p>
        Player-to-player trading in Kamigotchi uses a{" "}
        <strong>3-step escrow</strong> system. This means your items are held
        safely during the trade — neither party can run off with the goods.
      </p>
      <p>
        Think of it like a bulletin board: you post what you are selling and
        what you want in return, someone accepts and sends their part, and then
        you pick up what they sent.
      </p>

      <h2>The 3 Steps</h2>
      <StatTable
        headers={["Step", "Who", "What Happens"]}
        rows={[
          [
            "1. Create",
            "Maker",
            "Post a trade offer — your items go into escrow. You specify what you want and what you're giving.",
          ],
          [
            "2. Execute",
            "Taker",
            "Accept the trade — your items go into escrow, and you receive the maker's items (after tax).",
          ],
          [
            "3. Complete",
            "Maker",
            "Finalize the trade — pick up the taker's items from escrow (after tax).",
          ],
        ]}
      />

      <h2>Trade Rules</h2>
      <ul>
        <li>Each side of the trade must be exactly <strong>one item type</strong></li>
        <li>
          One side <strong>must be Musu</strong> — you cannot do pure barter
          (item for item without Musu)
        </li>
        <li>Both sides cannot be Musu</li>
        <li>Items with the &quot;untradable&quot; flag cannot be traded</li>
        <li>
          You can optionally target a <strong>specific player</strong> — only
          they can accept the trade
        </li>
      </ul>

      <InfoBox variant="info">
        Every trade involves Musu on one side. If you want to sell 10 Pine
        Cones, you list them for sale in exchange for Musu. If you want to buy
        Scrap Metal, you offer Musu in exchange.
      </InfoBox>

      <h2>Fees</h2>
      <p>
        Trading involves two types of fees, both paid in Musu:
      </p>
      <ul>
        <li>
          <strong>Creation fee</strong> — paid by the maker when creating the
          trade
        </li>
        <li>
          <strong>Delivery fee</strong> — paid by whoever is acting at each step
          (create, execute, complete, or cancel)
        </li>
      </ul>

      <InfoBox variant="tip">
        The delivery fee is <strong>waived in Room 66</strong> (the Trade Room).
        If you are trading frequently, head to Room 66 to save on fees!
      </InfoBox>

      <h2>Tax</h2>
      <p>
        A tax is applied when Musu leaves escrow. Only the{" "}
        <strong>Musu side</strong> of the trade is taxed — items are transferred
        in full. The taxed Musu is burned (removed from the game), not given to
        anyone.
      </p>

      <h2>Canceling Trades</h2>
      <p>
        Only the <strong>maker</strong> can cancel a trade, and only while it is
        still in the <strong>Pending</strong> state (before anyone has accepted
        it). Canceling returns your escrowed items, but you still pay the
        delivery fee.
      </p>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Trade Lifecycle (Technical)</h2>

      <h3>Step 1: Create (Maker)</h3>
      <ol>
        <li>Verify you have not exceeded the maximum trades per account</li>
        <li>Verify trade structure (one item each side, one must be Musu)</li>
        <li>Verify all items are tradable</li>
        <li>Deduct creation fee (Musu)</li>
        <li>Deduct delivery fee (Musu) — waived if you are in Room 66</li>
        <li>Create trade entity with state PENDING</li>
        <li>Escrow your sell-side items (transferred from your inventory to the trade entity)</li>
      </ol>

      <h3>Step 2: Execute (Taker)</h3>
      <ol>
        <li>Verify trade exists, is PENDING, and you are a valid taker (not the maker)</li>
        <li>If the trade targets a specific account, verify you are that account</li>
        <li>Deduct delivery fee from you (waived in Room 66)</li>
        <li>Transfer your buy-side items into escrow</li>
        <li>Transfer the maker&apos;s escrowed sell-side items to you, after deducting tax on the Musu portion</li>
        <li>Set trade state to EXECUTED, record your account as taker</li>
      </ol>

      <h3>Step 3: Complete (Maker)</h3>
      <ol>
        <li>Verify trade is EXECUTED and you are the maker</li>
        <li>Deduct delivery fee (waived in Room 66)</li>
        <li>Transfer the taker&apos;s escrowed buy-side items to you, after deducting tax on the Musu portion</li>
        <li>Clean up all trade data</li>
      </ol>

      <h3>Cancel (Maker only, while Pending)</h3>
      <ol>
        <li>Verify trade is PENDING and you are the maker</li>
        <li>Deduct delivery fee</li>
        <li>Return escrowed sell-side items to your inventory</li>
        <li>Remove all trade data</li>
      </ol>

      <h2>Fee Structure</h2>
      <StatTable
        headers={["Fee", "Config Key", "When Charged", "Who Pays"]}
        rows={[
          ["Creation fee", "TRADE_CREATION_FEE", "On trade create", "Maker"],
          [
            "Delivery fee",
            "TRADE_DELIVERY_FEE",
            "On create, execute, complete, and cancel",
            "Whoever is acting (waived in Room 66)",
          ],
        ]}
      />

      <h2>Tax Calculation</h2>
      <FormulaBlock label="Trade Tax">
        {"tax = (amount x TRADE_TAX_RATE[1]) / 10^TRADE_TAX_RATE[0]\n\nTax applies ONLY to Musu transfers.\nNon-Musu items are transferred in full.\nTaxed Musu is burned (removed from the game)."}
      </FormulaBlock>
      <p>
        The tax config is stored as an array where index 0 is the precision
        exponent and index 1 is the rate numerator.
      </p>

      <h2>Trade Room (Room 66)</h2>
      <p>
        Room 66 is the designated Trade Room. Players in this room are exempt
        from the delivery fee at every step (create, execute, complete, cancel).
        This incentivizes using a specific in-game location for trading and
        creates a natural trading hub.
      </p>
      <InfoBox variant="info">
        The creation fee is always charged regardless of location. Only the
        delivery fee is waived in Room 66.
      </InfoBox>

      <h2>Structure Constraints</h2>
      <StatTable
        headers={["Constraint", "Detail"]}
        rows={[
          ["Items per side", "Exactly 1 item type per side"],
          ["Currency requirement", "One side must be Musu (index 1)"],
          ["No self-trade", "Both sides cannot be Musu"],
          ["Tradability", "Items with NOT_TRADABLE flag are blocked"],
          ["Target", "Optional — restrict to a specific taker account"],
        ]}
      />
    </>
  );
}
