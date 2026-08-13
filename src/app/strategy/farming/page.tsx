import type { Metadata } from "next";
import Link from "next/link";
import { StrategyPage, DoctrineTable, MathLives } from "@/components/strategy-page";

export const metadata: Metadata = {
  title: "Farming Well",
};

export default function StrategyFarmingPage() {
  return (
    <StrategyPage
      title="Farming Well"
      subtitle="Every Kami is a tank with a fixed capacity. Farming well is the art of filling it exactly once per cycle."
    >
      <h2>Your Kami Is a Strain Tank</h2>
      <p>
        Harvesting spends health to make Musu. That trade has a hard ceiling:
        a single uninterrupted sit can never bank more than the Musu its
        current health can pay strain for. Think of the Kami not as a rate but
        as a <strong>tank</strong> with a capacity, which empties as it fills.
      </p>
      <p>The capacity, before any strain-reduction bonuses, is:</p>
      <p>
        <strong>current HP × (Harmony + 20) ÷ 6.5</strong>
      </p>
      <p>
        That is the same ceiling the mechanics section derives as{" "}
        <strong>Max Musu</strong> — the starve cutoff. It is worth internalizing
        as a number rather than a formula, because once you know your Kami&apos;s
        tank size, the whole operating question becomes simple: how do you fill
        it with as few actions as possible?
      </p>
      <p>
        The answer is <strong>about one fill per start/stop pair</strong>. One
        long sit that runs the tank close to the ceiling, one stop, then rest,
        then repeat. Everything below is why that beats the alternatives.
      </p>

      <MathLives>
        The exact starve cutoff and the strain equation it inverts:{" "}
        <Link href="/formulas/harvesting#starve-cutoff">
          Harvesting → Starve Cutoff
        </Link>
        . How Harmony enters the denominator:{" "}
        <Link href="/formulas/harvesting">Harvesting → Strain</Link>.
      </MathLives>

      <h2>Why One Long Sit Beats Many Short Ones</h2>
      <p>
        Harvest income has two halves. Fertility is steady — it pays the same
        in the first minute as the fifth hour. Intensity ramps with time spent
        on the node, and this is where the whole argument lives.
      </p>
      <p>
        Intensity is evaluated at the moment the harvest is settled, and then
        applied to the <em>entire</em> elapsed duration since the last
        settlement. Time you leave untouched is therefore paid at the ramp&apos;s
        highest value, not its average. Uninterrupted time earns
        superlinearly.
      </p>
      <p>
        The corollary is unforgiving. Banking in many small cycles forfeits the
        ramp entirely: <strong>cutting your sits in half roughly halves what
        each stop could have banked</strong>. That is not a rounding loss, it
        is most of the upside of the intensity engine.
      </p>
      <p>
        One refinement: stop <em>slightly before</em> the ceiling, not at it. A
        Kami that hits the starve cutoff stops earning and simply sits there,
        parked at zero income, until its owner comes back. Leaving a little
        headroom costs almost nothing and never wastes hours.
      </p>

      <h2>Feeding Resets the Ramp</h2>
      <p>
        Using any item on a Kami zeroes its intensity ramp. Food, potions,
        experience items — all of them. This is the fact that splits farming
        into two coherent patterns, and it is why &ldquo;just feed it and keep
        going&rdquo; is not the free lunch it looks like.
      </p>

      <DoctrineTable
        headers={["Pattern", "The rule", "What it optimizes"]}
        rows={[
          [
            <strong key="a">The tank pattern</strong>,
            "Never feed mid-sit. Run the tank down, stop, rest, start again.",
            "Intensity. Income comes from long untouched stretches, and the transaction count per day stays tiny.",
          ],
          [
            <strong key="b">The always-on pattern</strong>,
            "Feed on a schedule and accept the reset every time.",
            "Uptime. Income is fertility-driven, so it scales with Power and affinity rather than with patience.",
          ],
        ]}
      />

      <p>
        Both are legitimate. What is not legitimate is running the tank pattern
        while feeding whenever the health bar looks low — that pays the food
        bill of one pattern and the intensity of neither.
      </p>

      <MathLives>
        What resets the ramp, and how retroactive settlement works:{" "}
        <Link href="/formulas/harvesting">Harvesting → Intensity</Link>. Rest
        speed and the healing clock:{" "}
        <Link href="/formulas/harvesting">
          Harvesting → Recovery While Resting
        </Link>
        .
      </MathLives>

      <h2>The Two Farming Archetypes</h2>

      <h3>The tank / intensity farmer</h3>
      <p>
        High Health and high Harmony, with intensity skills on top. Health sets
        the tank size, Harmony makes each Musu cheaper in strain and speeds the
        rest that refills the tank, and the intensity skills turn long sits
        into the main income engine rather than a garnish.
      </p>
      <p>
        Operationally it is one start and one stop per cycle: very few
        transactions per day, so the gas line barely registers. It is strongest
        on quiet ground, or on ground someone else is defending, because a long
        sit is also a long exposure.
      </p>

      <h3>The always-on / fertility farmer</h3>
      <p>
        High Power, matched to a node of its own affinity, and fed at intervals
        sized to its safety margin rather than to its hunger. Gross income per
        Kami is higher than the tank&apos;s, and it arrives steadily instead of
        in lumps.
      </p>
      <p>
        The catch is the cost side, and it decides everything.{" "}
        <strong>The food bill is the margin.</strong> Bought at retail, food can
        consume a large share of gross — which is why serious always-on farms
        secure their own food supply, farming the materials and crafting rather
        than buying finished consumables. On top of that sit many more
        transactions per day: every feed and every collect is its own gas
        charge.
      </p>

      <h3>Choose the template and the cycle separately</h3>
      <p>
        Stat template and operating cycle are independent choices. A
        harvester-statted Kami can run tank cycles perfectly well, and a tanky
        Kami can be run always-on. Trait rolls are fixed at mint and skills can
        be respecced, so the cycle is the decision you can revisit any day —
        make it deliberately rather than inheriting it from whichever Kami you
        happened to buy.
      </p>

      <MathLives>
        Which stats feed which engine, and what skills shift them:{" "}
        <Link href="/formulas/stats">Stats &amp; Bonuses</Link> and{" "}
        <Link href="/formulas/harvesting">Harvesting → Fertility</Link>. Food
        prices, crafting, and the shop curve:{" "}
        <Link href="/formulas/economy">Economy</Link>.
      </MathLives>

      <h2>Farming Is Not Separate From Defense</h2>
      <p>
        A long sit is worth more and is also worth more to steal. The sit
        length that maximizes income on empty ground is not the sit length that
        survives on contested ground — see{" "}
        <Link href="/strategy/defense">Staying alive on contested ground</Link>{" "}
        for what the trade actually costs, and{" "}
        <Link href="/strategy/ground">Choosing ground</Link> for how to avoid
        needing to make it at all.
      </p>
    </StrategyPage>
  );
}
