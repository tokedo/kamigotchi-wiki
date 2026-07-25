import type { Metadata } from "next";
import {
  MechanicPage,
  FormulaBlock,
  StatTable,
  InfoBox,
} from "@/components/mechanic-page";

export const metadata: Metadata = {
  title: "Item Pools",
};

export default function ItemPoolsFormulasPage() {
  return (
    <MechanicPage
      title="Item Pools"
      subtitle="The fountain at the crossroads — swap one pooled item straight for another, or supply both sides of a pool and earn a cut of every swap that passes through it."
      overview={
        <>
          <h2>The Fountain at the Crossroads</h2>
          <p>
            Item pools live at the <strong>fountain in Room 31 (Scrapyard
            Exit)</strong> — the fork in the road leading out of the junkyard.
            Click the fountain to open the pool screen, or reach the same screen
            from the Menu wherever you are.
          </p>
          <p>
            A pool is a standing trade between <strong>two items</strong>. It
            holds a reserve of each, and it will always take one and hand back
            the other. There is no counterparty to wait for and no order to
            fill: you throw something in, the waters flow something else back.
          </p>
          <InfoBox variant="tip">
            Mina&apos;s fountain quests walk you through it. <em>A Short
            Pilgrimage</em> asks you to travel to the Scrapyard Exit, and{" "}
            <em>The Fountain of All That Flows</em> explains the pools and hands
            you 10 Stone plus 10 Wooden Stick to experiment with.
          </InfoBox>

          <h2>How the Rate Is Set</h2>
          <p>
            A pool has no price list. The rate comes entirely from the{" "}
            <strong>ratio of the two reserves</strong>. If a pool holds 100,000
            Musu and 2,000 Stone, then Stone is trading around 50 Musu each,
            because that is what the two piles imply.
          </p>
          <p>
            Think of it as a seesaw. Every unit you take out of one side makes
            that side scarcer and the other side more plentiful, so the rate
            shifts against you as you trade. Small swaps land close to the
            implied rate; large swaps walk the rate a long way. This is{" "}
            <strong>price impact</strong>, and it is the single most important
            thing to understand about pools.
          </p>
          <StatTable
            headers={[
              "Swap into a pool of 100,000 Musu / 2,000 Stone",
              "Stone received",
              "Effective rate",
            ]}
            rows={[
              ["1,000 Musu", "19 Stone", "~53 Musu per Stone"],
              ["10,000 Musu", "180 Stone", "~56 Musu per Stone"],
              ["50,000 Musu", "662 Stone", "~76 Musu per Stone"],
            ]}
          />
          <p>
            Ten times the input does not buy ten times the output. Splitting a
            large trade across several visits does not help either, because each
            swap leaves the reserves shifted for the next one — the curve is the
            curve. What actually helps is trading against a <em>deep</em> pool:
            the bigger the reserves, the less your trade moves them.
          </p>
          <InfoBox>
            A pool can never be emptied. The output of a swap approaches the
            reserve it draws from without ever reaching it, so no trade,
            however large, can take the last unit out of a pool.
          </InfoBox>

          <h2>The Swap Fee</h2>
          <p>
            Every pool charges a <strong>swap fee</strong>, skimmed off what you
            put in before the rate is worked out. Fees run up to a maximum of{" "}
            <strong>10%</strong>, and each pool carries its own — check the
            fountain for the pool you are about to trade against.
          </p>
          <p>
            The fee does not leave the pool. It stays in the reserves, which
            means it belongs to whoever is supplying that pool. Fees are the
            entire reason to be a provider rather than a trader.
          </p>

          <h2>Minimum Received (Slippage Protection)</h2>
          <p>
            Because the rate depends on the reserves, someone else&apos;s swap
            landing just before yours changes what you get. Every swap therefore
            takes a <strong>minimum received</strong> figure: the least amount
            of the other item you are willing to accept.
          </p>
          <InfoBox variant="warning">
            If the rate has moved past your minimum by the time your swap lands,
            the swap <strong>fails</strong> rather than filling at a worse rate.
            That is the protection working. Set the minimum too tight on a busy
            pool and your swaps will keep bouncing; set it too loose and you can
            be filled at a rate you would not have accepted.
          </InfoBox>

          <h2>What Can Be Pooled</h2>
          <p>
            Any stackable item can sit in a pool, including <strong>Musu</strong>{" "}
            itself. <strong>Onyx</strong> can be pooled once you have brought it
            in through the Token Portal — inside the game it is an ordinary
            item like any other, so it can be swapped and supplied like one.
          </p>
          <p>
            Pools never create items. Every unit in a reserve was supplied by a
            player, so Onyx sitting in a pool is backed one-for-one by real
            tokens held in the portal. Items flagged non-tradable cannot be
            pooled at all, for the same reason they cannot be traded or sent.
          </p>
          <InfoBox>
            <strong>Which pools exist is live world state, not a fixed list.</strong>{" "}
            Pools are opened by the game, and the pairs available change over
            time. Check the fountain for what is currently swappable rather than
            relying on any list written down elsewhere.
          </InfoBox>

          <h2>Becoming a Provider</h2>
          <p>
            You can supply a pool instead of just trading against it. You
            deposit <strong>both</strong> items at the pool&apos;s current ratio
            and receive a <strong>share</strong> of the pool proportional to
            what you put in. Burn that share whenever you like and you get your
            slice of both reserves back.
          </p>
          <p>
            The point is the fee. Swap fees pile up inside the reserves, so the
            pool your share is a slice of keeps getting slightly larger. The
            longer and busier the pool, the more your share is worth when you
            withdraw.
          </p>
          <StatTable
            headers={["Action", "What happens"]}
            rows={[
              [
                "Deposit",
                "You supply both items at the current ratio and receive a share of the pool. Offer an unbalanced pair and the pool takes only the balanced part of it.",
              ],
              [
                "Hold",
                "Swap fees accumulate in the reserves. Your share does not change size, but what it is worth grows.",
              ],
              [
                "Withdraw",
                "Burn some or all of your share and receive that fraction of both reserves, fees included.",
              ],
            ]}
          />
          <InfoBox variant="warning">
            Providing liquidity is not free money. You end up holding whichever
            of the two items the traders were dumping, in the proportion the
            pool arrived at — if the ratio between the two items moves a long
            way, you can withdraw less total value than if you had simply held
            your items and collected no fees at all. Supply pools whose two
            items you are happy to hold either way.
          </InfoBox>
          <InfoBox variant="tip">
            Withdrawing always works. A pool can be paused by the game, which
            stops swaps and further deposits — but providers can still pull their
            share out of a paused pool, so a pause can never trap what you
            supplied.
          </InfoBox>

          <h2>Pool Output Is Not &ldquo;Collected&rdquo;</h2>
          <p>
            Items that come out of a pool are moved to you, not earned by you.
            They do not count toward lifetime collection totals, so a swap will
            not advance a quest objective that asks you to collect a number of
            some item, and Musu swapped out of a pool does not register as Musu
            earned. If a quest wants you to gather something, gather it —
            trading for it at the fountain does not tick the box.
          </p>
        </>
      }
      details={
        <>
          <h2>Constant-Product Pricing</h2>
          <p>
            A pool prices swaps by holding the <strong>product</strong> of its
            two reserves constant. That single rule produces the whole rate
            curve, the price impact, and the guarantee that a reserve can never
            be drained.
          </p>
          <FormulaBlock
            label="Swap Output"
            vars={{
              "amountIn": "how many units of the input item you are putting in",
              "feeBps": "the pool's swap fee in basis points (100 = 1%, capped at 1,000 = 10%)",
              "amountInWithFee": "your input after the fee is skimmed off, scaled by 10,000",
              "reserveIn": "the pool's reserve of the item you are putting in",
              "reserveOut": "the pool's reserve of the item you are taking out",
              "amountOut": "units of the other item you receive, always rounded down",
            }}
          >
            {`amountInWithFee = amountIn × (10,000 − feeBps)

                     amountInWithFee × reserveOut
amountOut = ─────────────────────────────────────────────
             reserveIn × 10,000 + amountInWithFee`}
          </FormulaBlock>
          <p>
            Written with the fee as a plain fraction{" "}
            <code>f = feeBps / 10,000</code>, the same thing reads:
          </p>
          <FormulaBlock
            label="Swap Output (fee as a fraction)"
            vars={{
              "f": "the swap fee as a fraction (0.01 for a 1% pool)",
              "amountOut": "units of the other item you receive",
              "amountIn": "units of the input item you are putting in",
              "reserveIn": "reserve of the input item",
              "reserveOut": "reserve of the output item",
            }}
          >
            {`amountOut = reserveOut × (1 − f) × amountIn
            ───────────────────────────────
             reserveIn + (1 − f) × amountIn`}
          </FormulaBlock>
          <p>
            Note where the fee sits: it is taken off your input{" "}
            <em>before</em> the input enters the curve. That is precisely why
            the fee stays in the pool — the reserves grow by your full input
            while the curve only credits you for the post-fee part.
          </p>
          <p>
            Every pool calculation rounds <strong>down</strong>, in the
            pool&apos;s favour. Fractions of a unit are never handed out, so the
            product of the reserves can only ever drift upward through rounding.
          </p>

          <h3>Worked Example: Price Impact</h3>
          <FormulaBlock
            label="Swapping Musu for Stone"
            variant="example"
            vars={{
              "100,000": "the pool's Musu reserve in this example",
              "2,000": "the pool's Stone reserve in this example",
              "100": "the pool's fee in basis points (1%)",
            }}
          >
            {`Pool: 100,000 Musu / 2,000 Stone, 1% fee
Implied rate: 100,000 / 2,000 = 50 Musu per Stone

Swap in 1,000 Musu:
  amountInWithFee = 1,000 × (10,000 − 100) = 9,900,000
  amountOut = 9,900,000 × 2,000 / (100,000 × 10,000 + 9,900,000)
            = 19,800,000,000 / 1,009,900,000
            = 19 Stone          (19.60, rounded down)

  At the implied rate 1,000 Musu "should" buy 20 Stone.
  You get 19 — that gap is the fee plus price impact.

Swap in 10,000 Musu (ten times as much):
  amountInWithFee = 99,000,000
  amountOut = 198,000,000,000 / 1,099,000,000
            = 180 Stone         (180.16, rounded down)

  Ten times the input, but 180 Stone rather than 190.
  Effective rate has slipped from ~53 to ~56 Musu per Stone.`}
          </FormulaBlock>
          <InfoBox variant="tip">
            The practical reading: price impact grows faster than your trade
            size, so the cost of impatience is nonlinear. Before a large swap,
            compare the quote against the implied reserve rate — the gap between
            them is what the swap is really costing you, and it is usually
            larger than the fee.
          </InfoBox>

          <h2>Supplying a Pool</h2>

          <h3>Settling the Deposit Ratio</h3>
          <p>
            A deposit must arrive at the pool&apos;s current ratio, otherwise it
            would move the rate. You name how much of each item you are willing
            to put in, plus a floor for each, and the pool settles on the
            balanced pair inside those bounds.
          </p>
          <FormulaBlock
            label="Reserve-Ratio Valuation"
            vars={{
              "amountA": "how much of item A you are valuing",
              "reserveA": "the pool's reserve of item A",
              "reserveB": "the pool's reserve of item B",
            }}
          >
            {`value of amountA, in item B = ⌊amountA × reserveB / reserveA⌋

No fee and no price impact — this is the current ratio only,
used to work out how much of B pairs with your A.`}
          </FormulaBlock>
          <p>
            The pool first checks how much of item B pairs with the item A you
            offered. If that fits inside what you offered of B, it settles
            there. If it does not, it works the other direction instead and
            settles on the amount of A that pairs with your B. Either way your
            floors are respected or the deposit fails, and you can never be
            charged more of either item than you offered.
          </p>

          <h3>What Your Share Is Worth</h3>
          <p>
            Shares are minted pro-rata against the shares already outstanding,
            taking the <strong>smaller</strong> of the two sides so a lopsided
            deposit cannot dilute the providers already in the pool.
          </p>
          <FormulaBlock
            label="Shares Minted"
            vars={{
              "amtA, amtB": "the settled deposit amounts of each item",
              "supply": "shares of this pool already outstanding",
              "reserveA, reserveB": "the pool's reserves before your deposit",
              "shares": "shares minted to you, always rounded down",
            }}
          >
            {`shares = min( ⌊amtA × supply / reserveA⌋ ,
              ⌊amtB × supply / reserveB⌋ )`}
          </FormulaBlock>
          <FormulaBlock
            label="Withdrawing"
            vars={{
              "shares": "shares you are burning",
              "supply": "total shares outstanding at that moment",
              "reserveA, reserveB": "the pool's reserves at that moment",
              "amtA, amtB": "what you receive of each item, rounded down",
            }}
          >
            {`amtA = ⌊shares × reserveA / supply⌋
amtB = ⌊shares × reserveB / supply⌋`}
          </FormulaBlock>
          <p>
            Nothing about the withdrawal formula references what you originally
            deposited. Your share is simply a claim on a fraction of both
            reserves as they stand when you burn it — which is how accumulated
            fees reach you, and equally how a moved ratio reaches you.
          </p>

          <h3>Worked Example: A Provider Position</h3>
          <FormulaBlock
            label="Supplying and withdrawing"
            variant="example"
            vars={{
              "100,000 / 2,000": "the pool's Musu and Stone reserves before the deposit",
              "14,142": "shares already outstanding in this example",
            }}
          >
            {`Pool: 100,000 Musu / 2,000 Stone, 14,142 shares outstanding

You offer 5,000 Musu. The pairing Stone is:
  ⌊5,000 × 2,000 / 100,000⌋ = 100 Stone

Shares minted:
  min( ⌊5,000 × 14,142 / 100,000⌋ , ⌊100 × 14,142 / 2,000⌋ )
  = min(707, 707) = 707 shares

Pool afterwards: 105,000 Musu / 2,100 Stone, 14,849 shares
Your claim: 707 / 14,849 = 4.76% of both reserves

Burn all 707 shares later and you receive 4.76% of whatever the
reserves are then — including every swap fee collected while you
were in, and in whatever proportion the traders left behind.`}
          </FormulaBlock>

          <h3>The Locked Seed</h3>
          <p>
            When a pool opens, its first shares are minted to{" "}
            <strong>the pool itself</strong> and can never be redeemed by
            anyone.
          </p>
          <FormulaBlock
            label="Opening Shares"
            vars={{
              "amtA, amtB": "the amounts the pool is seeded with",
            }}
          >
            {`opening shares = ⌊√(amtA × amtB)⌋      (held by the pool, permanently locked)`}
          </FormulaBlock>
          <p>
            Two consequences matter to you as a provider. Total shares and both
            reserves can never fall to zero, so the value of a share is always
            well defined; and the tiny locked slice is the reason the last
            fraction of a pool is never withdrawable by the last provider out.
          </p>

          <h2>When a Swap or Deposit Fails</h2>
          <p>
            Pool actions either complete exactly or fail entirely — there are no
            partial fills. These are the conditions you will actually run into,
            and what the game tells you:
          </p>
          <StatTable
            headers={["Message", "What it means", "What to do"]}
            rows={[
              [
                "Pool does not exist",
                "No pool has been opened for that pair of items",
                "Check the fountain for the pairs that are actually available",
              ],
              [
                "Pool: slippage exceeded",
                "The rate moved past your minimum received before your swap landed",
                "Re-quote and retry, or loosen the minimum slightly",
              ],
              [
                "Pool: insufficient output",
                "Your input is too small to buy even one whole unit of the other item",
                "Swap a larger amount — outputs round down and fractions are never paid",
              ],
              [
                "Pool: zero input",
                "The swap amount is zero",
                "Enter an amount",
              ],
              [
                "Transfer includes untradeable item",
                "One of the two items carries the non-tradable flag",
                "Nothing to do — that item cannot be pooled",
              ],
              [
                "Pool: insufficient liquidity minted",
                "Your deposit is too small to be worth a whole share of the pool",
                "Deposit more, or pick a pool with smaller reserves",
              ],
              [
                "Pool: insufficient liquidity burned",
                "The shares you are burning are worth nothing on either side",
                "Burn a larger part of your position",
              ],
              [
                "Pool paused",
                "The game has paused the pool: no swaps, no deposits",
                "Withdrawals still work — you can always exit",
              ],
            ]}
          />

          <h3>Tiny Positions in a Lopsided Pool</h3>
          <p>
            Withdrawing requires only that <em>one</em> of the two amounts comes
            out positive, not both. In a pool where the two reserves are wildly
            different sizes, a very small share can round down to zero on the
            large-reserve side — and that side is forfeited when you exit.
          </p>
          <InfoBox>
            The alternative would be worse: if both sides had to be positive, a
            dust-sized position in a lopsided pool could never be withdrawn at
            all and would be frozen forever. The forfeited side is genuinely
            worth less than one whole unit, but it is worth keeping positions
            large enough that rounding never touches them.
          </InfoBox>

          <h2>Tradability and the Portal</h2>
          <StatTable
            headers={["Rule", "Detail"]}
            rows={[
              [
                "Non-tradable items",
                "Cannot be swapped, supplied, or used to open a pool — the same restriction that blocks them from trades and transfers",
              ],
              [
                "Withdrawal exemption",
                "Withdrawing does not re-check tradability, so providers can always exit even if an item in the pair stops being tradable",
              ],
              [
                "Onyx",
                "Becomes poolable once bridged in through the Token Portal; pools never mint, so pooled Onyx stays backed by tokens in portal custody",
              ],
              [
                "Fee ceiling",
                "A pool's swap fee can never exceed 10%",
              ],
            ]}
          />
        </>
      }
    />
  );
}
