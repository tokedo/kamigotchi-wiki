"use client";

import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";
import listings from "@/data/npc-listings.json";

export default function MerchantsPage() {
  return (
    <MechanicPage
      title="NPC Merchants"
      subtitle="Buy and sell items from Mina and the Vending Machine"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>Where to Shop</h2>
      <p>
        Kamigotchi has two NPC merchants you can buy items from. You need to be
        in the <strong>same room</strong> as the merchant to interact with them.
      </p>
      <StatTable
        headers={["Merchant", "Location", "What They Sell"]}
        rows={[
          [
            "Mina",
            "Room 13",
            "Food, crafting tools, materials, and snacks. Accepts both Musu and Onyx Shards.",
          ],
          [
            "Vending Machine",
            "Room 18 (Caves)",
            "Snacks and food items. Accepts Musu only.",
          ],
        ]}
      />

      <h2>Two Pricing Models</h2>
      <p>
        Items at NPC shops use one of two pricing strategies:
      </p>
      <ul>
        <li>
          <strong>Fixed Price</strong> — the price never changes. What you see
          is what you pay, every time. Tools and materials typically use this
          model.
        </li>
        <li>
          <strong>GDA (Gradual Dutch Auction)</strong> — the price goes up when
          lots of people are buying and drops back down when demand is low. Most
          food items use this model, which keeps prices fair based on supply and
          demand.
        </li>
      </ul>

      <InfoBox variant="info">
        With GDA pricing, if an item is being bought faster than its target
        rate, the price rises. If nobody is buying, the price decays back
        toward the target price. This prevents any single player from buying
        out all the cheap stock.
      </InfoBox>

      <h2>Shop Listings</h2>
      <ListingsTable />
    </>
  );
}

function Details() {
  return (
    <>
      <h2>GDA Pricing Formula</h2>
      <p>
        GDA stands for <strong>Gradual Dutch Auction</strong>, specifically a
        perpetual discrete VRGDA (Variable Rate Gradual Dutch Auction). The
        price self-adjusts based on how buying activity compares to an expected
        rate.
      </p>
      <FormulaBlock label="GDA Spot Price">
        {
          "timeDelta = (now - startTimestamp) / period\n\nspotPrice = targetPrice x decay^(timeDelta - prevSold / rate)"
        }
      </FormulaBlock>
      <p>Where:</p>
      <ul>
        <li>
          <strong>targetPrice</strong> — the baseline price when supply matches
          demand
        </li>
        <li>
          <strong>decay</strong> — price decay factor per period when nobody is
          buying (e.g., 0.5 = price halves each period)
        </li>
        <li>
          <strong>period</strong> — time unit for the decay/rate calculation
          (typically 1 day)
        </li>
        <li>
          <strong>rate</strong> — expected purchases per period for steady
          pricing
        </li>
        <li>
          <strong>prevSold</strong> — total units sold so far
        </li>
      </ul>

      <h3>Batch Purchase Cost</h3>
      <p>
        When buying multiple units, the cost is summed via a geometric series:
      </p>
      <FormulaBlock label="Batch Cost (Geometric Series)">
        {
          "c = decay^(-1/rate)    (per-unit price compound)\n\ncost = spotPrice x (c^quantity - 1) / (c - 1)\n\nfinalPrice = ceil(cost)   (rounded up)"
        }
      </FormulaBlock>

      <h3>Price Behavior</h3>
      <ul>
        <li>
          If buying outpaces the <code>rate</code> per <code>period</code>, the
          price rises above the target
        </li>
        <li>
          If buying slows down, the price decays back toward the target price
        </li>
        <li>
          This creates a natural supply/demand equilibrium
        </li>
      </ul>

      <h2>Sell Pricing (SCALED)</h2>
      <p>
        Some listings allow selling items back to the NPC. The sell price is a
        fraction of the current buy price:
      </p>
      <FormulaBlock label="Sell Price">
        {"sellPrice = buyPrice x scale / 1,000,000,000\n\nScale range: 0 to 1,000,000,000 (0% to 100% of buy price)"}
      </FormulaBlock>

      <h2>Buy Process</h2>
      <ol>
        <li>Resolve your account</li>
        <li>Look up the NPC merchant by index</li>
        <li>Verify you are in the same room as the NPC</li>
        <li>For each item in your purchase order:</li>
        <ul>
          <li>Look up the listing for this merchant and item</li>
          <li>Verify you meet any listing requirements</li>
          <li>Calculate the buy price (FIXED or GDA)</li>
          <li>Increment the listing balance (sold counter)</li>
          <li>Add items to your inventory</li>
          <li>Deduct currency from your inventory</li>
        </ul>
      </ol>

      <h2>Balance Tracking</h2>
      <p>
        Each listing tracks a running balance of units bought/sold:
      </p>
      <ul>
        <li>
          <strong>Buying</strong> increments the balance (more purchased means a
          higher GDA price)
        </li>
        <li>
          <strong>Selling back</strong> decrements the balance (lowers GDA
          price)
        </li>
        <li>
          For FIXED pricing, balance is tracked but does not affect the price
        </li>
      </ul>

      <h2>Full Listings Data</h2>
      <ListingsTable />
    </>
  );
}

function ListingsTable() {
  return (
    <div className="not-prose overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-3 py-2 text-left font-medium">Merchant</th>
            <th className="px-3 py-2 text-left font-medium">Item</th>
            <th className="px-3 py-2 text-left font-medium">Currency</th>
            <th className="px-3 py-2 text-right font-medium">Base Price</th>
            <th className="px-3 py-2 text-left font-medium">Pricing Model</th>
            <th className="px-3 py-2 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing, i) => (
            <tr
              key={i}
              className="border-b border-border last:border-0"
            >
              <td className="px-3 py-2">{listing.npcName}</td>
              <td className="px-3 py-2 font-medium">{listing.itemName}</td>
              <td className="px-3 py-2">{listing.currencyName}</td>
              <td className="px-3 py-2 text-right">
                {listing.basePrice.toLocaleString()}
              </td>
              <td className="px-3 py-2 text-xs">{listing.buyPriceModel}</td>
              <td className="px-3 py-2 text-xs">{listing.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 py-2 text-xs text-muted-foreground">
        {listings.length} shop listings total
      </p>
    </div>
  );
}
