import type { Metadata } from "next";
import Link from "next/link";
import {
  MechanicPage,
  FormulaBlock,
  StatTable,
  InfoBox,
} from "@/components/mechanic-page";
import { GdaPricingFigure } from "@/components/figures/gda-pricing";

export const metadata: Metadata = {
  title: "Economy",
};

export default function EconomyFormulasPage() {
  return (
    <MechanicPage
      title="Economy & Trading"
      subtitle="How Musu flows through the world — NPC shop pricing, player trading fees, crafting costs, the Token Portal, and every Obol sink and faucet."
      overview={
        <>
          <h2>Currencies at a Glance</h2>
          <p>
            Kamigotchi runs on three currencies, each with a different role in
            the economy.
          </p>
          <p>
            <strong>Musu</strong> is the everyday currency. Your Kami harvests it
            from nodes, and you spend it on food, crafting materials, trade fees,
            and most NPC shop items. Think of it as gold in a traditional RPG
            &mdash; easy to earn, easy to spend, and always in demand.
          </p>
          <p>
            <strong>Onyx Shards</strong> are the premium currency. They exist
            both as an in-game item and as the $ONYX blockchain token,
            bridgeable through the Token Portal (100 token units = 1 in-game
            shard). Onyx buys Reroll Tokens (used to reroll Kami traits at the
            auction), premium items, and — importantly — <strong>revives</strong>:
            bringing a dead Kami back costs 33 shards.
          </p>
          <p>
            <strong>Obols</strong> are the predator&apos;s currency: you
            earn <strong>1 Obol per liquidation</strong> (killing another
            player&apos;s Kami), and 5 Obols craft a Wonder Egg — a lootbox
            that is the only source of certain exclusive items. No kills, no
            Obols.
          </p>

          <StatTable
            headers={["Currency", "How You Get It", "Main Uses"]}
            rows={[
              [
                "Musu",
                "Harvesting nodes, receiving trades",
                "NPC shops, crafting, trade fees, item transfers, Gacha Tickets",
              ],
              [
                "Onyx Shards",
                "Token Portal (deposit $ONYX from blockchain)",
                "Kami revival (33/revive), Reroll Tokens (auction), premium items, Token Portal (withdraw)",
              ],
              [
                "Obols",
                "1 per successful liquidation",
                "Wonder Eggs (5 Obols each) — exclusive item lootboxes",
              ],
            ]}
          />

          <h2>NPC Shops</h2>
          <p>
            Two NPC merchants sell items in Kamigotchi: <strong>Mina</strong> (in
            town) and the <strong>Vending Machine</strong> (in the Cave). Both
            carry a similar selection of food and consumables, but their pricing
            behaves differently.
          </p>
          <p>
            Most items use <strong>dynamic pricing</strong> &mdash; a system
            where the price drops over time but jumps up whenever someone buys.
            Imagine a clock ticking the price down toward a target, but every
            purchase winds the clock back up. If players are buying faster than
            expected, prices rise above the target. If nobody is buying, prices
            fall below it. This creates a natural supply-and-demand equilibrium
            without any manual intervention.
          </p>
          <p>
            The slide has a bottom, though. However long a listing sits
            untouched, its price never falls below{" "}
            <strong>12.5% of the item&apos;s target price</strong> &mdash; a
            hard floor at one eighth of target. A dormant shop is a cheap shop,
            not a free one.
          </p>
          <p>
            A few items &mdash; like the Spice Grinder (2,500 Musu) and
            Portable Burner (4,000 Musu) &mdash; have simple{" "}
            <strong>fixed prices</strong> that never change.
          </p>
          <p>
            You must be in the <strong>same room</strong> as the NPC to trade
            with them. Some listings also have requirements (like owning a
            certain item or reaching a certain level) before you can purchase.
          </p>
          <p>
            The traffic runs one way: no shop listing carries a sell price, so{" "}
            <strong>NPCs do not buy items from you</strong>. Everything you want
            to turn back into Musu goes through the player orderbook or the
            fountain&apos;s item pools instead.
          </p>

          <InfoBox variant="tip">
            If a consumable&apos;s price is spiking, be patient. Dynamic prices
            decay roughly 50% per period when nobody is buying, down to the
            12.5% floor. Waiting even a few hours can save you significant Musu.
            The Vending Machine in the Cave has lower throughput expectations
            than Mina, so its prices spike more easily with fewer purchases
            &mdash; Mina is usually the cheaper option.
          </InfoBox>
          <InfoBox variant="warning">
            There is also a ceiling on how much you can buy in one go. A single
            purchase cannot exceed <strong>100 periods&apos; worth</strong> of a
            listing&apos;s expected sales rate &mdash; for an item the shop
            expects to sell 20 of per day, that caps one transaction at 2,000
            units. Larger orders are refused outright, so split genuinely big
            hauls across several purchases.
          </InfoBox>

          <h2>Player-to-Player Trading</h2>
          <p>
            You can trade items directly with other players through an{" "}
            <strong>orderbook</strong> — this is where crafting materials,
            food, and XP-potion ingredients change hands, since NPCs will not
            buy anything back from you. Trading follows a three-step handshake:
          </p>
          <ol>
            <li>
              <strong>Create</strong> &mdash; you post what you want to buy and
              what you&apos;re offering. One side must always be Musu (no pure
              barter). Your offered items go into escrow immediately, so they
              leave your inventory.
            </li>
            <li>
              <strong>Fill</strong> &mdash; another player accepts your offer
              and sends the items you wanted. They receive your escrowed items
              right away (minus any tax on Musu).
            </li>
            <li>
              <strong>Confirm</strong> &mdash; you pick up the items they sent,
              completing the trade.
            </li>
          </ol>
          <p>
            You can optionally target a specific player when creating a trade
            &mdash; useful for pre-arranged deals. You can also cancel a pending
            trade to get your escrowed items back, though fees are not refunded.
          </p>

          <InfoBox variant="tip">
            Head to <strong>Room 66 (the Trade Room)</strong> to skip delivery
            fees entirely. Both the maker and taker are exempt from delivery fees
            when trading from this room. If you trade frequently, it pays to
            park your Kami there.
          </InfoBox>

          <h3>Trading Costs</h3>
          <p>
            Every trade involves three kinds of fees, all paid in Musu:
          </p>
          <StatTable
            headers={["Fee", "When It Hits", "Who Pays", "Notes"]}
            rows={[
              [
                "Creation fee",
                "When you post a trade",
                "Maker",
                "Flat Musu cost, paid once",
              ],
              [
                "Delivery fee",
                "Every step (create, fill, confirm, cancel)",
                "Whoever acts",
                "Waived in the Trade Room (Room 66)",
              ],
              [
                "Trade tax",
                "When Musu leaves escrow",
                "Receiver of Musu",
                "Percentage-based; the taxed Musu is burned permanently",
              ],
            ]}
          />

          <h3>Item Transfers</h3>
          <p>
            For simple gifting, you can directly transfer items to another
            player&apos;s account for{" "}
            <strong>15 Musu per item type</strong> transferred. The fee is per
            distinct item type, not per unit &mdash; sending 500 Pine Pollen
            costs the same 15 Musu as sending 1. Sending three different items
            in one transfer costs 45 Musu. Some items are marked non-tradable
            and cannot be transferred at all.
          </p>

          <h2>Crafting</h2>
          <p>
            Crafting converts input materials into output items using predefined
            recipes. Each recipe costs <strong>account stamina</strong> (your
            operator&apos;s stat, not the Kami&apos;s) and grants{" "}
            <strong>account XP</strong>. You can craft in batches &mdash;
            everything scales linearly (inputs, outputs, stamina, and XP all
            multiply by the batch amount).
          </p>
          <p>
            Stamina is the real throttle: it caps at <strong>100</strong> and
            regenerates <strong>1 point per minute</strong>, and moving between
            rooms costs 5 from the same pool. Expensive recipes like the
            Fortified XP Potion cost 75 stamina — most of a full bar per craft.
            Serious crafters restore stamina with items (e.g. Rock Candyfloss,
            +80) instead of waiting out the clock.
          </p>
          <p>
            Some recipes require specific <strong>tools</strong> in your
            inventory &mdash; the tool is not consumed, you just need to own it.
            Others may require a minimum account level or being in a particular
            room.
          </p>

          <StatTable
            headers={["Tool", "Sold By", "Price", "What It Unlocks"]}
            rows={[
              [
                "Spice Grinder",
                "Mina",
                "2,500 Musu (fixed)",
                "Grinding recipes: raw materials into reagents (pollen, powders)",
              ],
              [
                "Portable Burner",
                "Mina",
                "4,000 Musu (fixed)",
                "Brewing recipes: potions and processed liquids",
              ],
            ]}
          />

          <InfoBox variant="tip">
            Both crafting tools are one-time purchases from Mina at fixed
            prices. Buy the Spice Grinder first &mdash; it unlocks the reagent
            recipes you need as inputs for the Portable Burner&apos;s potion
            recipes.
          </InfoBox>

          <h2>Auctions (Global Sales)</h2>
          <p>
            Auctions are system-level item sales that are not tied to any NPC or
            room &mdash; they are accessible globally. Like NPC shops, auctions
            use dynamic pricing that adjusts based on demand, but each auction
            has a <strong>limited total supply</strong>.
          </p>
          <p>
            There are currently two active auctions:
          </p>
          <StatTable
            headers={["Auction", "What You Get", "Currency", "Total Supply", "Target Price"]}
            rows={[
              [
                "Gacha Tickets",
                "Gacha Ticket (mint a new Kami)",
                "Musu",
                "17,222 total",
                "32,000 Musu",
              ],
              [
                "Reroll Tokens",
                "Reroll Token (reroll Kami traits)",
                "Onyx Shards",
                "100,000 total",
                "50 Onyx",
              ],
            ]}
          />

          <InfoBox>
            The Gacha auction has gentle price swings (25% decay per day, target
            of 32 sales per day) so the price stays relatively stable. The
            Reroll auction is far more volatile &mdash; a sharper 50% decay
            against a target of only 16 sales per day, so a quiet day halves
            the price and a busy one doubles it. If you want a Reroll Token,
            timing your purchase matters much more.
          </InfoBox>

          <h2>Token Portal</h2>
          <p>
            The Token Portal bridges between blockchain tokens and in-game
            items. You can <strong>deposit</strong> tokens (like Onyx) to get
            in-game items, or <strong>withdraw</strong> in-game items back to
            tokens on the blockchain.
          </p>
          <ul>
            <li>
              <strong>Deposits</strong> are instant &mdash; tokens convert to
              in-game items immediately, minus a small import tax.
            </li>
            <li>
              <strong>Withdrawals</strong> have a mandatory{" "}
              <strong>24-hour waiting period</strong> before you can claim your
              tokens, plus an export tax.
            </li>
            <li>
              Both directions charge a tax of{" "}
              <strong>1 unit flat + 1% of the amount</strong>.
            </li>
          </ul>

          <InfoBox variant="warning">
            Withdrawals are not instant. After initiating a withdrawal, your
            items are removed from your inventory immediately, but you must wait
            24 hours before claiming the blockchain tokens. You can cancel a
            pending withdrawal to get your items back, but the tax is not
            refunded.
          </InfoBox>
          <p>
            The portal is the only door tokens come through. Once Onyx is
            inside, it behaves as an ordinary item: you can spend it, trade it,
            or supply it to an{" "}
            <Link href="/formulas/item-pools">item pool</Link> at the fountain.
            Because pools never create items, Onyx sitting in a pool reserve
            stays backed one-for-one by tokens the portal is holding.
          </p>

          <h2>Kami Marketplace</h2>
          <p>
            The Kami Marketplace is where players buy and sell Kami NFTs for ETH.
            It works like a simple orderbook with three order types:
          </p>
          <ul>
            <li>
              <strong>Listings</strong> &mdash; sell a specific Kami at a fixed
              ETH price. Your Kami stays in your wallet (no escrow) but is
              locked from other actions while listed.
            </li>
            <li>
              <strong>Specific offers</strong> &mdash; offer WETH for a
              particular Kami you want. The WETH stays in your wallet until the
              seller accepts.
            </li>
            <li>
              <strong>Collection offers</strong> &mdash; offer WETH per Kami for{" "}
              <em>any</em> Kami, up to a quantity you choose. Sellers can accept
              one at a time.
            </li>
          </ul>
          <p>
            A marketplace fee is deducted from every sale, and the Kami enters a{" "}
            <strong>1-hour cooldown</strong> after purchase before it can
            harvest, equip items, or take other actions.
          </p>
          <InfoBox>
            Equipment never travels with a Kami. Listing, selling, sending,
            sacrificing, bridging out, or rerolling a Kami automatically{" "}
            <strong>unequips all of its gear and returns it to the previous
            owner&apos;s inventory</strong>. A buyer always receives a bare
            Kami, and the seller keeps every item that was equipped on it.
          </InfoBox>

          <h2>Newbie Vendor</h2>
          <p>
            Brand-new accounts (created within the last 24 hours) can purchase{" "}
            <strong>one Kami</strong> from the Newbie Vendor at a fair market
            price. The vendor price tracks the{" "}
            <strong>time-weighted average</strong> of recent marketplace sales,
            with a floor of 0.005 ETH so it never goes too low. Three Kamis are
            available at a time, and the selection rotates every 48 hours. After
            buying, the Kami is <strong>soulbound for 3 days</strong> (cannot be
            listed or traded) &mdash; this prevents reselling for a quick flip.
          </p>

          <h2>Where Does Musu Go?</h2>
          <p>
            The economy is designed with natural checks on inflation. Here is
            how Musu enters and leaves the game:
          </p>
          <StatTable
            headers={["Faucets (Musu enters the economy)", "Sinks (Musu leaves the economy)"]}
            rows={[
              [
                "Harvesting nodes (primary source)",
                "NPC shop purchases (dynamic + fixed prices)",
              ],
              [
                "Receiving Musu in player trades",
                "Trade creation fees + delivery fees",
              ],
              [
                "Quest rewards",
                "Trade tax (Musu is permanently burned)",
              ],
              [
                "",
                "Item transfer fees (15 Musu per item type)",
              ],
              [
                "",
                "Crafting (consumes items worth Musu)",
              ],
              [
                "",
                "Gacha Ticket auction (~32,000 Musu per ticket)",
              ],
            ]}
          />

          <InfoBox>
            Dynamic NPC prices act as an automatic inflation valve &mdash;
            when lots of players are harvesting and spending, prices rise,
            pulling more Musu out of circulation. When activity slows, prices
            fall, making it cheaper to buy. The trade tax is a hard sink that
            permanently burns Musu on every player-to-player exchange,
            preventing unlimited accumulation.
          </InfoBox>
        </>
      }
      details={
        <>
          <h2>GDA Pricing (Gradual Dutch Auction)</h2>
          <p>
            Most NPC shop items and both global auctions use a pricing model
            called a <strong>Gradual Dutch Auction</strong>. The core idea is
            simple: the price drops over time when nobody is buying, and resets
            upward whenever someone makes a purchase. If players buy at exactly
            the expected rate, the price sits right at the target. Buy faster
            than expected and the price climbs; buy slower and it falls.
          </p>
          <p>
            Each listing has a set of parameters that control how the price
            behaves:
          </p>
          <StatTable
            headers={["Parameter", "What It Controls", "Typical Values"]}
            rows={[
              [
                "Target price",
                "The equilibrium price when sales match the expected rate",
                "60 - 450 Musu (varies per item)",
              ],
              [
                "Period",
                "The time window for decay and rate calculations",
                "1 day or 2 days",
              ],
              [
                "Decay",
                "How fast the price drops per period with no purchases",
                "0.50 (50% decay per period)",
              ],
              [
                "Rate",
                "The expected number of purchases per period to maintain the target price",
                "2 - 250 per period (varies per item)",
              ],
            ]}
          />

          <h3>How the Price Is Calculated</h3>
          <p>
            The system tracks how many units have been sold and how much time
            has passed since the listing began. It compares actual sales to the
            expected sales rate to decide whether the price should be above or
            below the target.
          </p>
          <FormulaBlock
            label="GDA Spot Price"
            vars={{
              "timeSinceStart": "how many periods have elapsed since the listing went live",
              "now": "current time",
              "startTime": "when the listing was first created",
              "period": "the time window for decay and rate calculations (e.g. 1 day)",
              "spotPrice": "the current cost per unit right now",
              "targetPrice": "the equilibrium price when sales match the expected rate",
              "decay": "fraction the price drops per period with no purchases (e.g. 0.50 = halves each period)",
              "totalSold": "total units purchased since the listing began",
              "rate": "expected number of purchases per period to maintain the target price",
            }}
          >
            {`timeSinceStart = (now - startTime) / period

spotPrice = targetPrice * decay ^ (timeSinceStart - totalSold / rate)`}
          </FormulaBlock>
          <p>
            The exponent <code>timeSinceStart - totalSold / rate</code> is the
            key. When it is zero, sales are exactly on pace and the price equals
            the target. When it is positive (sales falling behind), the decay
            pushes the price down. When it is negative (sales running ahead),
            the price rises because decay raised to a negative power inverts
            into a multiplier.
          </p>

          <h3>The Price Floor</h3>
          <p>
            That exponent is <strong>clamped</strong>. A listing is only ever
            allowed to count as <strong>3 periods</strong> behind its sales
            schedule, no matter how long it actually sat untouched. The
            exponent therefore bottoms out at 3, which puts a hard floor under
            the spot price:
          </p>
          <FormulaBlock
            label="Minimum Spot Price"
            vars={{
              "minSpotPrice": "the cheapest a listing can ever get, per unit",
              "targetPrice": "the equilibrium price when sales match the expected rate",
              "decay": "fraction the price drops per period with no purchases",
              "maxDeficitPeriods": "how many periods a listing may run behind schedule (3)",
            }}
          >
            {`minSpotPrice = targetPrice × decay ^ maxDeficitPeriods

Every shop listing runs decay = 0.50, so:
  minSpotPrice = targetPrice × 0.50³ = targetPrice / 8

  = 12.5% of target price`}
          </FormulaBlock>

          <GdaPricingFigure />
          <StatTable
            headers={["Item", "Target Price", "Floor Price (12.5%)"]}
            rows={[
              ["Maple-Flavor Ghost Gum", "60 Musu", "8 Musu"],
              ["Red Ribbon Gummy", "100 Musu", "13 Musu"],
              ["Pom-Pom Fruit Candy", "100 Musu", "13 Musu"],
              ["Gakki Cookie Sticks", "160 Musu", "20 Musu"],
              ["Ice Cream", "150 Musu", "19 Musu"],
              ["Better Ice Cream", "250 Musu", "32 Musu"],
              ["Best Ice Cream", "450 Musu", "57 Musu"],
            ]}
          />
          <p>
            The clamp is not only a display rule &mdash; buying against a
            dormant listing also <strong>settles</strong> its backlog. The
            listing&apos;s schedule is pulled forward so that at most 3
            periods&apos; worth of sales is owed, which means the price starts
            responding to your purchases immediately instead of letting an
            unbounded backlog clear at the floor. Selling back does not settle
            anything; the next purchase does it.
          </p>
          <InfoBox variant="tip">
            The practical shape of this: a shop nobody has touched for a week is
            sitting at exactly 12.5% of target, and the first{" "}
            <strong>3 periods&apos; worth</strong> of stock is what clears near
            that price. Past that, prices climb back toward target quickly. If
            you find a neglected listing, the cheap window is real but it is
            finite &mdash; and a competing buyer who gets there first consumes
            it.
          </InfoBox>

          <h3>Maximum Purchase Size</h3>
          <p>
            A single purchase is also bounded: the amount cannot exceed{" "}
            <strong>100 periods</strong> of the listing&apos;s rate. Ask for
            more and the transaction is rejected with{" "}
            <code>batch too large</code> rather than being partially filled.
          </p>
          <FormulaBlock
            label="Batch Limit"
            variant="example"
            vars={{
              "maxAmount": "the largest quantity a single purchase may request",
              "rate": "expected purchases per period for that listing",
            }}
          >
            {`maxAmount = rate × 100

Examples:
  Gakki Cookie Sticks at Mina (rate 250/day) → 25,000 per purchase
  Best Ice Cream at Mina    (rate 8/day)     → 800 per purchase
  Best Ice Cream in the Cave (rate 2/2 days) → 200 per purchase`}
          </FormulaBlock>

          <h3>Buying Multiple at Once</h3>
          <p>
            When you buy more than one unit in a single transaction, each
            subsequent unit costs slightly more than the last (since each unit
            advances the total sold counter). The total cost is calculated as a
            geometric series:
          </p>
          <FormulaBlock
            label="Batch Purchase Cost"
            vars={{
              "c": "per-unit price multiplier, derived from decay and rate",
              "decay": "fraction the price drops per period with no purchases",
              "rate": "expected purchases per period at equilibrium",
              "cost": "total cost for the entire batch before rounding",
              "spotPrice": "current price of the first unit at time of purchase",
              "quantity": "number of units being bought in this transaction",
              "finalPrice": "actual Musu charged (cost rounded up to the nearest whole number)",
            }}
          >
            {`c = decay ^ (-1 / rate)

cost = spotPrice * (c^quantity - 1) / (c - 1)

finalPrice = ceil(cost)       (always rounded up)`}
          </FormulaBlock>

          <h3>Worked Example: Buying Red Ribbon Gummy from Mina</h3>
          <InfoBox variant="tip">
            Red Ribbon Gummy at Mina&apos;s shop: target price = 100 Musu, rate
            = 300 per day, decay = 0.50 per day.
            <br /><br />
            <strong>Scenario A &mdash; exactly on schedule:</strong> 150 units
            sold in the first 12 hours (timeSinceStart = 0.5 days).
            <br />
            Exponent = 0.5 - 150/300 = 0.0 (perfectly on pace)
            <br />
            Spot price = 100 * 0.50^0 = <strong>100 Musu</strong> (right at
            target)
            <br /><br />
            <strong>Scenario B &mdash; buying frenzy:</strong> 450 units sold in
            12 hours (50% ahead of schedule).
            <br />
            Exponent = 0.5 - 450/300 = -1.0
            <br />
            Spot price = 100 * 0.50^(-1) = <strong>200 Musu</strong> (doubled!)
            <br /><br />
            <strong>Scenario C &mdash; nobody buying:</strong> only 50 sold in
            12 hours (way behind schedule).
            <br />
            Exponent = 0.5 - 50/300 = 0.333
            <br />
            Spot price = 100 * 0.50^0.333 = <strong>79 Musu</strong> (discount!)
          </InfoBox>

          <h3>Fixed-Price Listings</h3>
          <p>
            A few NPC items use simple flat pricing that never changes:
          </p>
          <FormulaBlock
            variant="example"
            label="Fixed Price"
            vars={{
              "cost": "total Musu charged for the purchase",
              "price": "the item's unchanging per-unit price",
              "quantity": "number of units being bought",
            }}
          >
            {`cost = price * quantity

Examples:
  Spice Grinder:    2,500 Musu each (always)
  Portable Burner:  4,000 Musu each (always)`}
          </FormulaBlock>

          <h3>All NPC Shop Listings</h3>
          <p>
            Mina stocks nine purchasable listings, the Vending Machine seven.
            Every one of them is priced in Musu.
          </p>
          <StatTable
            headers={["NPC", "Item", "Currency", "Target Price", "Pricing"]}
            rows={[
              ["Mina", "Red Ribbon Gummy", "Musu", "100", "GDA: 150/day, 50% decay"],
              ["Mina", "Maple-Flavor Ghost Gum", "Musu", "60", "GDA: 150/day, 50% decay"],
              ["Mina", "Pom-Pom Fruit Candy", "Musu", "100", "GDA: 150/day, 50% decay"],
              ["Mina", "Gakki Cookie Sticks", "Musu", "160", "GDA: 250/day, 50% decay"],
              ["Mina", "Ice Cream", "Musu", "150", "GDA: 25/day, 50% decay"],
              ["Mina", "Better Ice Cream", "Musu", "250", "GDA: 20/day, 50% decay"],
              ["Mina", "Best Ice Cream", "Musu", "450", "GDA: 8/day, 50% decay"],
              ["Mina", "Spice Grinder", "Musu", "2,500", "Fixed"],
              ["Mina", "Portable Burner", "Musu", "4,000", "Fixed"],
              ["Vending Machine", "Red Ribbon Gummy", "Musu", "100", "GDA: 10/day, 50% decay"],
              ["Vending Machine", "Maple-Flavor Ghost Gum", "Musu", "60", "GDA: 40/period, 50% (2-day period)"],
              ["Vending Machine", "Pom-Pom Fruit Candy", "Musu", "100", "GDA: 30/period, 50% (2-day period)"],
              ["Vending Machine", "Gakki Cookie Sticks", "Musu", "160", "GDA: 50/period, 50% (2-day period)"],
              ["Vending Machine", "Ice Cream", "Musu", "150", "GDA: 6/period, 50% (2-day period)"],
              ["Vending Machine", "Better Ice Cream", "Musu", "250", "GDA: 4/period, 50% (2-day period)"],
              ["Vending Machine", "Best Ice Cream", "Musu", "450", "GDA: 2/period, 50% (2-day period)"],
            ]}
          />

          <InfoBox>
            Notice how the Vending Machine has much lower rate expectations
            than Mina. Ghost Gum at Mina absorbs 150 purchases per day at the
            target price, while the Vending Machine expects only 40 per 2-day
            period (20/day). A handful of extra purchases in the Cave spikes the
            price; the same handful barely registers at Mina&apos;s shop. If
            both shops sell the same item, Mina is almost always the cheaper
            option &mdash; the Cave machine is a convenience premium for Kamis
            already underground.
          </InfoBox>
          <InfoBox variant="tip">
            The ice creams are the sharpest listings on the board. Best Ice
            Cream expects 8 sales a day at Mina and 2 per 2-day period in the
            Cave, so its price swings hardest in both directions: a quiet day
            can put it near its 57 Musu floor, and a small buying burst can send
            it far above the 450 target. Check before you stock up.
          </InfoBox>

          <h2>Player Trading</h2>

          <h3>Fees and Costs</h3>
          <p>
            Player-to-player trades incur three types of fees, all denominated
            in Musu:
          </p>
          <StatTable
            headers={["Fee", "Paid In", "When Charged", "Notes"]}
            rows={[
              [
                "Creation fee",
                "Musu",
                "Once, when the maker posts the trade",
                "Non-refundable (even if cancelled)",
              ],
              [
                "Delivery fee",
                "Musu",
                "On every step: create, fill, confirm, and cancel",
                "Waived entirely in Room 66 (the Trade Room)",
              ],
            ]}
          />

          <h3>Trade Tax (Musu Burn)</h3>
          <p>
            Whenever Musu leaves escrow and reaches a player, a percentage is
            burned. This applies only to the Musu side of a trade &mdash;
            non-Musu items (equipment, materials, etc.) pass through untaxed.
            The burned Musu is permanently removed from the game, not
            transferred to anyone.
          </p>
          <FormulaBlock
            label="Trade Tax"
            vars={{
              "tax": "Musu burned (permanently removed from the game) on this trade",
              "amount": "the Musu being transferred out of escrow to the receiving player",
              "taxRate": "the tax rate numerator (e.g. 100 for 1%)",
              "precision": "number of decimal digits in the rate (10^precision is the denominator)",
            }}
          >
            {`tax = amount * taxRate / 10^precision

The taxed amount is burned (removed from the economy).
Only Musu transfers are taxed; items pass through untaxed.`}
          </FormulaBlock>

          <h3>Total Cost of a Trade</h3>
          <p>
            Here is the complete fee picture across the trade lifecycle,
            assuming both players are outside the Trade Room:
          </p>
          <StatTable
            headers={["Step", "Who", "What They Pay"]}
            rows={[
              [
                "Create",
                "Maker",
                "Creation fee + delivery fee, and their offered items go into escrow",
              ],
              [
                "Fill",
                "Taker",
                "Delivery fee + buy-side items. Receives the maker's escrowed items (minus tax if Musu)",
              ],
              [
                "Confirm",
                "Maker",
                "Delivery fee. Receives the taker's items (minus tax if Musu)",
              ],
              [
                "Cancel (instead of fill)",
                "Maker",
                "Delivery fee. Gets escrowed items back (creation fee not refunded)",
              ],
            ]}
          />

          <InfoBox variant="warning">
            Cancelling a trade is not free. You pay the creation fee (already
            spent) plus two delivery fees (one at create, one at cancel). If you
            trade from Room 66, the delivery fees are waived, so cancellation
            only costs the creation fee.
          </InfoBox>

          <h3>Trade Rules</h3>
          <StatTable
            headers={["Rule", "Details"]}
            rows={[
              ["Items per side", "Exactly one item type per side"],
              ["Currency requirement", "One side must be Musu (no pure item-for-item barter)"],
              ["Self-trade block", "Both sides cannot be Musu"],
              ["Tradability", "Items flagged as non-tradable cannot be used in trades"],
              ["Targeted trades", "You can optionally restrict a trade to a specific player"],
            ]}
          />

          <h2>Item Transfers</h2>
          <p>
            Direct transfers are simpler than trades &mdash; you just send items
            to another player&apos;s account. The fee structure is
            straightforward:
          </p>
          <FormulaBlock
            variant="example"
            label="Transfer Fee"
            vars={{
              "fee": "total Musu charged to the sender",
              "number of distinct item types": "count of unique items in the transfer (quantity per type does not matter)",
            }}
          >
            {`fee = 15 Musu * number of distinct item types

Sending 500 Pine Pollen (1 type)     = 15 Musu
Sending 3 different items (3 types)  = 45 Musu
Sending 10 stacks of the same item   = 15 Musu`}
          </FormulaBlock>

          <h2>Crafting</h2>
          <p>
            Crafting scales linearly with batch size. Every aspect of the recipe
            &mdash; input costs, output amounts, stamina drain, and XP reward
            &mdash; is multiplied by the number of times you craft:
          </p>
          <FormulaBlock
            label="Batch Crafting"
            vars={{
              "recipe inputs": "materials required for a single craft of this recipe",
              "recipe outputs": "items produced by a single craft of this recipe",
              "recipe stamina": "stamina drained from your account (the operator, not the Kami) for a single craft",
              "recipe XP": "account XP awarded for a single craft",
              "batchAmount": "how many times you are crafting the recipe in one action",
            }}
          >
            {`inputs consumed  = recipe inputs  * batchAmount
outputs produced = recipe outputs * batchAmount
stamina cost     = recipe stamina * batchAmount
XP earned        = recipe XP      * batchAmount`}
          </FormulaBlock>
          <p>
            If you lack any input material, the entire craft fails &mdash; there
            is no partial crafting. The XP goes to your account (not your Kami).
          </p>

          <h3>Sample Recipes (the XP-potion chain)</h3>
          <p>
            These are the recipes behind the XP economy — the chain that turns
            harvested Pine Cones into the XP potions every serious build is fed
            with:
          </p>
          <StatTable
            headers={["Recipe", "Inputs", "Output", "Stamina", "Requires"]}
            rows={[
              [
                "Extract Pine Pollen",
                "1 Pine Cone",
                "500 Pine Pollen",
                "10",
                "Spice Grinder",
              ],
              [
                "Brew XP Potion (+1,000 XP)",
                "1 Plastic Bottle + 250 Pine Pollen",
                "1 XP Potion",
                "20",
                "Portable Burner",
              ],
              [
                "Brew Greater XP Potion (+15,000 XP)",
                "1 Glass Jar + 2,500 Pine Pollen",
                "1 Greater XP Potion",
                "50",
                "Portable Burner",
              ],
              [
                "Craft Fortified XP Potion (+50,000 XP)",
                "1 Greater XP Potion + 300 Powdered Red Amber + 1 Essence of Thought",
                "1 Fortified XP Potion",
                "75",
                "Portable Burner, account level 20+",
              ],
              [
                "Brew Respec Potion",
                "1 Plastic Bottle + 500 Shredded Mint",
                "1 Respec Potion",
                "50",
                "Portable Burner",
              ],
            ]}
          />
          <p>
            Follow the chain: one Greater XP Potion needs 2,500 Pine Pollen =
            5 Pine Cones&apos; worth of grinding, and a Fortified adds rare
            scavenge drops (Red Amber, Essence of Thought) on top. Multiply by
            the ~4 Fortified potions a level-32 build costs and you can see why
            these materials hold their value on the player market.
          </p>

          <h2>Auction Pricing</h2>
          <p>
            Auctions use the same GDA formula as NPC shops, but with finite
            total supply. Once all units are sold, the auction is exhausted
            permanently.
          </p>
          <InfoBox variant="warning">
            <strong>Auctions have no price floor.</strong> The 12.5% floor and
            the 3-period deficit clamp that bound NPC shop listings do not apply
            here &mdash; auction decay is unbounded, so a dormant auction keeps
            decaying toward zero with no per-unit minimum. This is the single
            biggest difference between shop pricing and auction pricing, and it
            is what makes waiting out a quiet auction so much more rewarding
            than waiting out a quiet shop listing.
          </InfoBox>
          <FormulaBlock
            label="Auction Spot Price"
            vars={{
              "timeSinceStart": "how many periods have elapsed since the auction opened",
              "now": "current time",
              "auctionStart": "when the auction first became available",
              "period": "the time window for decay and rate calculations (e.g. 1 day)",
              "spotPrice": "the current cost of the next unit right now",
              "targetPrice": "the equilibrium price when sales match the expected rate",
              "decay": "fraction the price drops per period with no purchases",
              "totalSold": "total units purchased from this auction so far",
              "rate": "expected purchases per period at the target price",
            }}
          >
            {`timeSinceStart = (now - auctionStart) / period

spotPrice = targetPrice * decay ^ (timeSinceStart - totalSold / rate)

Batch cost uses the same geometric series as NPC shops.`}
          </FormulaBlock>

          <h3>Active Auctions</h3>
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
                "Gacha Tickets",
                "Gacha Ticket",
                "Musu",
                "17,222",
                "32,000",
                "1 day",
                "0.75 (25% drop/day)",
                "32/day",
              ],
              [
                "Reroll Tokens",
                "Reroll Token",
                "Onyx Shards",
                "100,000",
                "50",
                "1 day",
                "0.50 (50% drop/day)",
                "16/day",
              ],
            ]}
          />

          <h3>Worked Example: Gacha Ticket Timing</h3>
          <InfoBox variant="tip">
            The Gacha auction targets 32 sales per day at 32,000 Musu. With
            0.75 decay, the price drops 25% per day with no buyers.
            <br /><br />
            <strong>Scenario:</strong> 16 tickets sold in the first 12 hours
            (exactly on pace).
            <br />
            Exponent = 0.5 - 16/32 = 0.0
            <br />
            Price = 32,000 * 0.75^0 = <strong>32,000 Musu</strong>
            <br /><br />
            If 48 tickets sold in 12 hours (50% ahead of pace):
            <br />
            Exponent = 0.5 - 48/32 = -1.0
            <br />
            Price = 32,000 * 0.75^(-1) = <strong>42,667 Musu</strong>
            <br /><br />
            If nobody bought for a full day:
            <br />
            Exponent = 1.0 - 0/32 = 1.0
            <br />
            Price = 32,000 * 0.75^1 = <strong>24,000 Musu</strong> (25% off)
          </InfoBox>

          <InfoBox>
            The Reroll auction is far more volatile because of its 0.50 decay.
            One day of no purchases halves the price; a burst of purchases
            doubles it. Its target rate of 16 per day is low enough that a
            modest run of buyers moves the price sharply for whoever comes
            next.
          </InfoBox>

          <h3>Spending a Gacha Ticket</h3>
          <p>
            Buying the ticket is the easy half. Turning tickets into Kamis is a
            two-step process, because the Kami you receive is drawn at random
            and the randomness comes from a future block:
          </p>
          <StatTable
            headers={["Step", "What happens"]}
            rows={[
              [
                "Commit",
                "You spend your tickets (up to 5 per transaction) and the game records a commitment. No Kami is assigned yet.",
              ],
              [
                "Reveal",
                "In a later transaction, the commitment is resolved against a block hash and your Kamis are drawn from the gacha pool.",
              ],
            ]}
          />
          <p>
            The same two-step pattern governs rerolls, scavenge claims,
            lootboxes, and sacrifices &mdash; and the same two rules apply to
            all of them:
          </p>
          <StatTable
            headers={["Rule", "Detail"]}
            rows={[
              [
                "Reveal within 256 blocks",
                "The block hash a commitment depends on is only readable for 256 blocks. Miss that window and the normal reveal fails; a community manager has to rescue the commitment. Reveal promptly.",
              ],
              [
                "Never submit the same commitment twice in one reveal",
                "A reveal call containing a duplicate is rejected in full — not silently de-duplicated. Every commitment in a single reveal must be distinct, or nothing in that call resolves.",
              ],
            ]}
          />

          <h2>Token Portal</h2>

          <h3>Tax on Deposits and Withdrawals</h3>
          <p>
            Both directions charge the same tax: a flat amount plus a percentage
            of the transfer. What you actually receive is the original amount
            minus this tax.
          </p>
          <FormulaBlock
            variant="example"
            label="Portal Tax"
            vars={{
              "tax": "total units deducted from your deposit or withdrawal",
              "amount": "how many units you are depositing or withdrawing",
              "Net received": "what actually arrives after the tax is subtracted",
            }}
          >
            {`tax = 1 + floor(amount * 100 / 10,000)
    = 1 + 1% of the amount

Net received = amount - tax

Example: depositing 1,000 Onyx
  tax = 1 + floor(1000 * 100 / 10000) = 1 + 10 = 11
  received in-game: 989 Onyx`}
          </FormulaBlock>

          <h3>Token Scale</h3>
          <p>
            In-game item units and blockchain token units are not always
            1-to-1. A <strong>scale factor</strong> converts between them:
          </p>
          <FormulaBlock
            label="Token Unit Conversion"
            vars={{
              "blockchain tokens": "the number of token units on-chain (smallest denomination)",
              "in-game items": "the number of items as displayed in your inventory",
              "scale": "the power-of-10 conversion factor between on-chain and in-game units",
            }}
          >
            {`blockchain tokens = in-game items * 10^scale
in-game items     = blockchain tokens / 10^scale

Registered tokens:
  Onyx Shards: scale = 2  (1 in-game Onyx = 100 token units)
  ETH:         scale = 5  (1 in-game ETH  = 100,000 token units)`}
          </FormulaBlock>

          <h3>Withdrawal Timeline</h3>
          <p>
            Withdrawals use a three-step process with a mandatory 24-hour
            waiting period:
          </p>
          <StatTable
            headers={["Step", "What Happens"]}
            rows={[
              [
                "1. Initiate",
                "Items are removed from your inventory immediately. Tax is deducted. A receipt is created with a 24-hour timer.",
              ],
              [
                "2. Wait (24 hours)",
                "The withdrawal is pending. You cannot use those items, but the tokens have not been sent yet.",
              ],
              [
                "3. Claim",
                "After the 24-hour delay, call claim to receive your blockchain tokens.",
              ],
              [
                "Cancel (optional, before claiming)",
                "Items return to your inventory, but the tax is not refunded.",
              ],
            ]}
          />

          <h2>Harvest Tax</h2>
          <p>
            When you start a harvest you may name <strong>one taxer</strong>{" "}
            &mdash; another account you designate, such as a service you use or
            someone who referred you &mdash; and the rate they take. That one
            taxer is bound to the harvest at the moment it starts and receives
            their share of every collection from it. There is no way to attach a
            second, and the pairing is cleared and set again each time you start
            a new harvest.
          </p>
          <FormulaBlock
            variant="example"
            label="Harvest Tax"
            vars={{
              "taxAmount": "Musu sent to the taxer from this harvest",
              "harvestedBounty": "the raw Musu your Kami collected before tax",
              "taxRate": "the taxer's rate in basis points (100 = 1%, max 2,000 = 20%)",
              "remainder": "Musu you actually receive",
            }}
          >
            {`taxAmount = harvestedBounty * taxRate / 10,000
remainder = harvestedBounty - taxAmount

taxRate is in basis points (100 = 1%, 2000 = 20%)
Maximum rate: 2,000 basis points (20%) — set at harvest start,
and rejected outright above that

Example: 1,000 Musu harvested, taxer at 10% (1,000 bps)
  tax = 1000 * 1000 / 10000 = 100 Musu to the taxer
  you receive: 900 Musu`}
          </FormulaBlock>

          <h2>Kami Marketplace</h2>

          <h3>Marketplace Fee</h3>
          <p>
            Every sale on the Kami Marketplace (whether from a listing or an
            accepted offer) incurs a fee that is deducted from the sale price
            before the seller receives payment. The fee goes to a designated
            protocol recipient.
          </p>
          <FormulaBlock
            label="Marketplace Fee"
            vars={{
              "fee": "amount deducted from the sale and sent to the protocol",
              "salePrice": "the full ETH or WETH price the buyer pays",
              "feeNumerator": "the fee rate numerator set by the protocol",
              "feePrecision": "number of decimal digits (10^feePrecision is the denominator)",
              "sellerReceives": "ETH or WETH the seller actually gets after the fee",
            }}
          >
            {`fee = salePrice * feeNumerator / 10^feePrecision

sellerReceives = salePrice - fee

The fee applies to all transaction types:
  - Direct listing purchases (paid in ETH)
  - Specific offer acceptances (paid in WETH)
  - Collection offer acceptances (paid in WETH)`}
          </FormulaBlock>

          <h3>Purchase Cooldown</h3>
          <p>
            After buying any Kami on the marketplace, the Kami enters a{" "}
            <strong>1-hour cooldown</strong>. During this hour, the Kami cannot
            harvest, equip items, or perform any other actions. This prevents
            rapid buy-and-deploy strategies.
          </p>

          <h3>TWAP Price Oracle</h3>
          <p>
            Every marketplace sale automatically feeds its price into a{" "}
            <strong>TWAP (Time-Weighted Average Price)</strong> oracle. This
            oracle smooths out price spikes by averaging prices over a 24-hour
            window. The TWAP is used by the Newbie Vendor to determine fair
            pricing (see below).
          </p>

          <h2>Newbie Vendor Pricing</h2>
          <p>
            The Newbie Vendor sets its price from what Kamis have sold for over
            the last 24 hours. It takes the higher of the TWAP price or a
            minimum floor, ensuring new players neither overpay (price tracks
            market) nor underpay (floor prevents exploitation).
          </p>
          <FormulaBlock
            label="Newbie Vendor Price"
            vars={{
              "vendorPrice": "the ETH price a new player pays for a Kami from the vendor",
              "twapPrice": "time-weighted average of recent marketplace sale prices",
              "windowTime": "duration of the TWAP averaging window (24 hours)",
              "now": "current time",
              "snapshotTimestamp": "when the 24-hour TWAP window started",
              "liveCumulative": "running sum of price-times-seconds up to now",
              "cumulativePriceSeconds": "recorded cumulative value at the last marketplace sale",
              "lastPrice": "the price of the most recent marketplace sale",
              "lastUpdateTime": "when the TWAP oracle was last updated (most recent sale)",
              "snapshotCumulative": "cumulative value recorded at the start of the TWAP window",
            }}
          >
            {`vendorPrice = max(twapPrice, 0.005 ETH)

TWAP Calculation:
  windowTime     = now - snapshotTimestamp
  liveCumulative = cumulativePriceSeconds + lastPrice * (now - lastUpdateTime)
  twapPrice      = (liveCumulative - snapshotCumulative) / windowTime

  TWAP window = 24 hours
  Display rotation cycle = 48 hours (shows 3 Kamis at a time)`}
          </FormulaBlock>
          <p>
            The TWAP is a running average that updates with every marketplace
            sale. If no sales happen, it holds the last known price. If the TWAP
            data is unavailable or too fresh, the vendor falls back to the
            minimum price of 0.005 ETH.
          </p>

          <h3>Newbie Vendor Eligibility</h3>
          <StatTable
            headers={["Requirement", "Details"]}
            rows={[
              ["Account age", "Must be created within the last 24 hours"],
              ["Previous purchases", "Must have never bought from the vendor before"],
              ["Limit", "1 Kami per account, lifetime"],
              ["Post-purchase lock", "Purchased Kami is soulbound for 3 days (cannot list, trade, or transfer)"],
            ]}
          />

          <h2>Musu Sinks and Faucets Summary</h2>
          <p>
            Here is a consolidated view of every mechanism that creates or
            destroys Musu. Understanding these flows helps you predict where the
            economy is heading.
          </p>
          <StatTable
            headers={["System", "Faucet (Musu In)", "Sink (Musu Out)"]}
            rows={[
              [
                "Harvesting",
                "Primary Musu source (continuous)",
                "Strain costs HP, not Musu (indirect via food purchases)",
              ],
              [
                "NPC Shops",
                "--- (no listing carries a sell price, so NPCs do not buy)",
                "Buying items (dynamic + fixed prices)",
              ],
              [
                "Player Trading",
                "Receiving Musu in trades",
                "Creation fee + delivery fees + trade tax (burned)",
              ],
              [
                "Item Transfers",
                "---",
                "15 Musu per item type transferred",
              ],
              [
                "Crafting",
                "---",
                "Consumes items worth Musu (indirect sink)",
              ],
              [
                "Auctions",
                "---",
                "Gacha Tickets cost ~32,000 Musu each",
              ],
              [
                "Quests",
                "Quest rewards grant Musu",
                "---",
              ],
            ]}
          />
        </>
      }
    />
  );
}
