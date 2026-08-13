import type { Metadata } from "next";
import Link from "next/link";
import { StrategyPage, DoctrineTable, MathLives } from "@/components/strategy-page";
import { YieldThreatFigure } from "@/components/figures/yield-threat";

export const metadata: Metadata = {
  title: "Choosing Ground and Counting Costs",
};

export default function StrategyGroundPage() {
  return (
    <StrategyPage
      title="Choosing Ground and Counting Costs"
      subtitle="Where you park and what it costs to keep you there. Two questions that decide more than any build does."
    >
      <h2>Node Choice Is One Computation</h2>
      <p>
        <strong>Yield × threat.</strong> That is the whole decision, and it is
        worth doing explicitly rather than by feel.
      </p>
      <p>Nodes differ from each other in exactly three ways:</p>
      <ul>
        <li>
          <strong>Affinity</strong> — which decides whether your Kami harvests
          at a bonus or a penalty there.
        </li>
        <li>
          <strong>Yield currency</strong> — most nodes pay Musu; some do not.
        </li>
        <li>
          <strong>Resident predators</strong> — who else habitually stands
          there.
        </li>
      </ul>
      <p>
        They do <em>not</em> differ in mechanics. No node is more dangerous
        than another by rule: the liquidation check is identical everywhere,
        and the only reason one node kills more Kamis than the next is that
        more killers stand on it. Danger is a property of the population, not
        of the ground.
      </p>

      <MathLives>
        Affinity matching and what a match is worth:{" "}
        <Link href="/formulas/harvesting">Harvesting → Affinity and Efficacy</Link>
        . Every node, its affinity and its level cap:{" "}
        <Link href="/map">World Map</Link>.
      </MathLives>

      <h2>Kill-Zone Geography</h2>
      <p>
        Most of the map is quiet. A handful of high-yield nodes are
        persistently contested war ground, and the concentration is extreme:
        the single busiest kill node accounts for roughly a quarter of all
        kills in the world.
      </p>
      <p>
        The uncomfortable part is that these are not separate problems.{" "}
        <strong>The best intensity-farming ground and the worst kill zone
        overlap.</strong> Yield attracts farmers, farmers attract predators,
        and the yield that made the node worth farming is the same yield that
        makes it worth raiding. The yield-versus-safety trade-off is therefore
        the central siting decision in the game, not a detail.
      </p>
      <p>
        For anyone who is not specifically building to hold contested ground,
        the answer is straightforward: <strong>quiet, affinity-matched ground
        at par yield</strong>. A node that pays ordinary rates and where nobody
        is hunting beats a rich node you have to defend, and it beats it
        without a food bill or a bodyguard squad attached.
      </p>

      <YieldThreatFigure />

      <h2>The Second Currency</h2>
      <p>
        Some nodes yield <strong>VIPP</strong> rather than Musu. It is easy to
        read the harvest numbers off those nodes and slot them into the same
        spreadsheet as everything else. Do not.
      </p>
      <p>
        VIPP is a separate economy. Its value runs through an external reward
        program, and there is no fixed exchange rate to Musu — nothing in the
        game converts one into the other at a known price.{" "}
        <strong>Never add VIPP income and Musu income into one number.</strong>{" "}
        A VIPP operation is a different business with externally-priced
        returns; run it deliberately if you want it, but keep the two ledgers
        apart.
      </p>

      <h2>Gas and Taxes Are Cost Lines</h2>
      <p>
        Every action is a blockchain transaction, so the number of times you
        touch your Kamis in a day is a bill, not a habit. The difference
        between the two farming archetypes is real money:
      </p>

      <DoctrineTable
        headers={["Cycle", "Transactions per Kami per day", "Consequence"]}
        rows={[
          [
            <strong key="a">Tank</strong>,
            "A handful — one start, one stop, per long sit.",
            "The gas line is close to noise. Scales to a large fleet cheaply.",
          ],
          [
            <strong key="b">Always-on</strong>,
            "Many — every feed and every collect, per Kami.",
            "Gas becomes a genuine line item alongside the food bill.",
          ],
        ]}
      />

      <p>
        This is an economic difference, not a stylistic one. Two operators with
        the same gross can end the week in very different places purely on
        transaction count.
      </p>
      <p>
        The other line is the <strong>harvest tax</strong>. A tax rate of up to
        20% can be attached when a harvest is started, and it is fixed at that
        moment for that sit. It comes off the top of everything the sit
        produces, so it also comes off the experience the Kami earns.
      </p>

      <MathLives>
        How the harvest tax is set and split:{" "}
        <Link href="/formulas/harvesting">Harvesting → Tax</Link> and{" "}
        <Link href="/formulas/economy">Economy → Harvest Tax</Link>.
      </MathLives>

      <h2>Automation Services</h2>
      <p>
        Community services exist that run your Kamis for you — starting,
        collecting, feeding and restarting harvests without you being at the
        keyboard. They price the service as a{" "}
        <strong>harvest tax on the harvests they start</strong>, using the same
        mechanism described above. The rate is a quote rather than a fixed
        number, commonly around 10%, and transactions routed through a service
        carry some extra gas overhead compared with sending them yourself.
      </p>
      <p>
        The trade is simple to state. Running your own operation keeps both
        lines — the tax and the overhead — in your pocket, and costs you your
        attention. Paying a service spends both lines and buys hands-off play.
        Both are legitimate ways to play the game; which is better depends
        entirely on what your time is worth to you and how large your fleet is.
      </p>
      <p>
        One such service is{" "}
        <a
          href="https://kamibots.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          kamibots.xyz
        </a>
        .
      </p>

      <h2>Putting It Together</h2>
      <p>
        Pick the node from affinity and quiet first, currency second. Pick the
        cycle from what your transaction budget and food supply can carry. Then
        size the sit — on safe ground, sit length is a pure{" "}
        <Link href="/strategy/farming">cost-amortization choice</Link>; on
        contested ground it is a{" "}
        <Link href="/strategy/defense">safety parameter</Link> as well, and
        that is the extra cost of standing somewhere rich.
      </p>
    </StrategyPage>
  );
}
