import type { Metadata } from "next";
import Link from "next/link";
import { InfoBox } from "@/components/mechanic-page";

export const metadata: Metadata = {
  title: "Start Here",
};

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-xs font-bold"
          style={{ fontFamily: "var(--font-pixel), monospace" }}
        >
          {n}
        </span>
        <h2 className="text-2xl font-bold tracking-tight m-0">{title}</h2>
      </div>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
}

export default function StartHerePage() {
  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Start Here</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          What a joining player actually does in their first days: get a Kami,
          put it on the right node, keep it alive, and find something to aim
          at.
        </p>
      </header>

      <Step n={1} title="Get a Kami">
        <p>
          Everything in Kamigotchi runs through a Kami, so the first job is
          owning one. There are three ways in, and one of them has a clock on
          it.
        </p>

        <h3>The Newbie Vendor — use it on day one</h3>
        <p>
          A freshly created account can buy <strong>one</strong> Kami from the
          Newbie Vendor, at a fair price, but only while the account is less
          than <strong>24 hours old</strong>. The purchase is once per account
          and the eligibility window does not come back. If you are reading
          this on your first day, this is the cheapest entry you will get.
        </p>
        <p>What to expect at the vendor:</p>
        <ul>
          <li>
            <strong>The price tracks the market.</strong> It is derived from a
            time-weighted average of recent Kami marketplace sales, with a
            floor beneath it (0.005 ETH), so you pay roughly what Kamis are
            going for rather than a made-up sticker price.
          </li>
          <li>
            <strong>The selection rotates.</strong> Three Kamis from the
            vendor&apos;s pool are on display at any moment, and the window
            advances through the pool on a 48-hour cycle. Sold Kamis leave the
            pool.
          </li>
          <li>
            <strong>It is soulbound for 3 days.</strong> A Kami bought here
            cannot be listed, sold into an offer, or unstaked for three days
            after purchase. Play it, do not flip it.
          </li>
        </ul>

        <h3>The other two doors</h3>
        <ul>
          <li>
            <strong>The Kami marketplace.</strong> An on-chain orderbook where
            players list Kamis for ETH and make offers on specific Kamis or on
            the collection as a whole. This is where you go when you want a
            <em> particular</em> stat spread rather than whatever is on
            display.
          </li>
          <li>
            <strong>The gacha.</strong> Spend a Gacha Ticket to mint a random
            Kami out of the pool. Tickets are sold at the auction for Musu, so
            this door opens up once you are earning in-game rather than
            spending ETH.
          </li>
        </ul>

        <InfoBox variant="tip">
          Stats are fixed at mint and never change, so whichever door you use,
          check the trait roll before you commit. See{" "}
          <Link href="/formulas/stats">Stats &amp; Bonuses</Link> for what a
          good roll looks like — the honest answer is that the ranges are
          narrower than newcomers expect.
        </InfoBox>
      </Step>

      <Step n={2} title="Your first harvest">
        <p>
          Harvesting is the engine of the whole game: you park a Kami on a
          node, it accrues Musu over time, and you collect. Three things
          decide whether that first sit goes well.
        </p>

        <h3>Match the node to your Kami&apos;s affinities</h3>
        <p>
          Every Kami has a <strong>body</strong> affinity and a{" "}
          <strong>hand</strong> affinity; every node has an affinity too. Match
          both and your harvest rate is <strong>double</strong> what a neutral
          pairing earns. Mismatch both and you are earning about two thirds of
          par. Nothing else you can do on day one comes close to that as a
          multiplier — it is free, and it is one click of thought before you
          start.
        </p>
        <p>
          The <Link href="/map">World Map</Link> lists every node with its
          affinity, and{" "}
          <Link href="/formulas/harvesting">Harvesting</Link> has the full
          matching table.
        </p>

        <h3>Starter nodes are quieter than the rest</h3>
        <p>
          Some nodes carry a <strong>maximum</strong> Kami level for harvesting
          there — a common cap is level 15. That is a ceiling, not a floor:
          high-level Kamis are locked out of those nodes entirely, which is why
          early ground is relatively calm. Enjoy it while you are under the
          cap.
        </p>

        <h3>The harvest costs health, and your health caps the payout</h3>
        <p>
          Collecting Musu inflicts <strong>strain</strong> — health drains in
          proportion to what you harvest, and higher Harmony makes each Musu
          cheaper. This produces the single most important rule of your first
          week:
        </p>
        <InfoBox variant="warning">
          A Kami&apos;s current health caps how much a single uninterrupted sit
          can bank. Once the bounty hits that ceiling it stops growing, and if
          you let health reach zero the Kami cannot collect{" "}
          <em>or</em> stop — it is stranded on the node and open to being
          liquidated until someone does exactly that.{" "}
          <strong>Collect or stop before you run empty.</strong>
        </InfoBox>
        <p>
          Also expect to wait between actions: after starting, collecting,
          stopping, or using an item, a Kami is on a{" "}
          <strong>3-minute cooldown</strong> and cannot act again until it
          clears.
        </p>
      </Step>

      <Step n={3} title="Stay alive">
        <p>
          Kamigotchi has player-versus-player combat, but it is much narrower
          than the phrase suggests, and understanding the narrowness is the
          whole defense.
        </p>
        <ul>
          <li>
            <strong>You can only be liquidated while harvesting</strong>, and
            only by a Kami that is harvesting the{" "}
            <strong>same node</strong> as yours. There is no ambush on the
            road, no attacking a Kami sitting at home.
          </li>
          <li>
            <strong>A rested, healthy Kami is never killable.</strong> A
            resting Kami is not a legal target at all, and a harvesting one at
            full health cannot be killed on stats alone. It only becomes
            killable once its health has fallen below a threshold that sits at
            a fraction of its maximum — a fraction that rises the bigger the
            attacker&apos;s affinity advantage over it.
          </li>
          <li>
            <strong>Low health plus a fat uncollected bounty is the
            signature predators hunt for.</strong> The two together are what
            makes you worth the attempt: the low health lets the kill land, and
            the uncollected pile is the prize.
          </li>
        </ul>
        <p>
          Death is recoverable but not cheap when you are starting out. A dead
          Kami comes back either through a revive item or by spending Onyx
          Shards — 33 of them, which restores 33 health rather than a full bar.
          Early on that is a real setback; later it is a line item. The{" "}
          <Link href="/formulas/liquidations">Liquidations</Link> page has the
          exact threshold math if you want to know precisely how much margin
          you are carrying.
        </p>
      </Step>

      <Step n={4} title="Feed, rest, repeat">
        <p>
          The harvest-rest cycle is the rhythm of the early game, and its
          bottleneck is not the harvesting — it is the recovery.
        </p>
        <p>
          <strong>Resting heals slowly.</strong> Recovery runs in hours, not
          minutes: a low-Harmony Kami needs the better part of three hours
          to refill a small health bar, and a bigger bar takes proportionally
          longer. Healing happens on its own whether or not you are online, but
          it happens at its own pace.
        </p>
        <p>
          <strong>Food is how you buy that time back.</strong> Feeding restores
          health, which both rescues a Kami that is running low and raises the
          ceiling on what the current sit can bank.
        </p>
        <InfoBox variant="info">
          There is a catch worth knowing before you form habits: using{" "}
          <em>any</em> item on a Kami resets its intensity ramp — the part of
          the harvest rate that grows the longer a sit runs untouched. Feeding
          is not free even when the food is. The trade-off is worked through on{" "}
          <Link href="/formulas/harvesting">Harvesting</Link>, and the two
          coherent ways to play around it are on{" "}
          <Link href="/strategy/farming">Farming well</Link>.
        </InfoBox>
      </Step>

      <Step n={5} title="First goals">
        <p>
          Once the loop is running, you need something to point it at. In
          rough order of usefulness:
        </p>
        <ul>
          <li>
            <strong>Quests.</strong> The fastest source of early items and
            experience, and the game&apos;s built-in tutorial for systems you
            have not met. Browse the whole chain on the{" "}
            <Link href="/quests">Quest Database</Link>.
          </li>
          <li>
            <strong>Levels, which you get for free.</strong> Every Musu a Kami
            collects is also a point of experience for it. Earning and
            leveling are the same act — there is no separate grind, and a Kami
            that farms is a Kami that improves.
          </li>
          <li>
            <strong>The level-16 skill pick.</strong> This is the first build
            moment that really matters: fifteen points into a single tree
            unlocks its Tier 3 skills, and the sixteenth buys one of three
            mutually exclusive options. You choose one and lock out the others,
            and that choice is what makes your Kami a particular kind of Kami.
            The costs and the trees are on{" "}
            <Link href="/formulas/leveling">Leveling &amp; XP</Link>.
          </li>
          <li>
            <strong>Trading.</strong> Kamis change hands on the on-chain
            orderbook; items change hands through direct player trades. Those
            trades carry a delivery fee — which is waived entirely if you are
            standing in Room 66, the Trade Room. See{" "}
            <Link href="/formulas/economy">Economy</Link> for the fee
            structure.
          </li>
        </ul>
      </Step>

      <Step n={6} title="Choose your path">
        <p>
          After the first week the game stops being about mechanics and starts
          being about other players. There are farmers who optimize long
          untouched sits for a handful of transactions a day, farmers who feed
          on a schedule and run their Kamis around the clock, tanks built so
          high that nobody can profitably touch them, and predators who make
          their living on other people&apos;s uncollected bounty. There is
          quiet ground and there is ground worth fighting over, and the
          difference is a fact about the population rather than about the
          nodes.
        </p>
        <p>
          None of that is in the rules. It is in{" "}
          <Link href="/strategy">Playing Well</Link> — the doctrine section,
          which describes what players have actually settled on, and which
          carries a date because it will change.
        </p>
      </Step>

      <Step n={7} title="Playing hands-off">
        <p>
          Kamigotchi rewards attention, and not everybody has attention to
          give. Community automation services exist that run your Kamis for you
          — starting, collecting and feeding on your behalf — and charge for it
          as a tax on the harvests they start. One such service is{" "}
          <a
            href="https://kamibots.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            kamibots.xyz
          </a>
          .
        </p>
        <p>
          Whether that trade is worth making is covered alongside the other
          cost lines on{" "}
          <Link href="/strategy/ground">Choosing ground and counting costs</Link>
          .
        </p>
      </Step>
    </article>
  );
}
