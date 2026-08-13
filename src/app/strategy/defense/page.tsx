import type { Metadata } from "next";
import Link from "next/link";
import { StrategyPage, DoctrineTable, MathLives } from "@/components/strategy-page";

export const metadata: Metadata = {
  title: "Staying Alive on Contested Ground",
};

export default function StrategyDefensePage() {
  return (
    <StrategyPage
      title="Staying Alive on Contested Ground"
      subtitle="You cannot out-react a predator. You can only be above their threshold, or not be there."
    >
      <h2>The Threat Model</h2>
      <p>
        A liquidation is not a fight. It is a check: if your Kami&apos;s current
        health has fallen below a threshold computed from the attacker&apos;s
        Violence against your Harmony, the kill lands, and if it has not, the
        attempt reverts. There is no dice roll to be lucky on.
      </p>
      <p>
        This has one very useful consequence. The threshold is{" "}
        <strong>computable from public stats</strong> — compute it, do not guess
        at it. The inputs are visible: the attacker&apos;s Violence, your Harmony,
        your maximum health, and the affinity matchup between their hand and
        your body. Run the numbers on the specific Kamis you are worried about
        and you get an actual health floor to stay above.
      </p>
      <p>Size that floor properly:</p>
      <ul>
        <li>
          Against the <strong>strongest active killer</strong> of the relevant
          hand affinity that frequents your node — not the average one, and not
          a killer who has stopped playing.
        </li>
        <li>
          Include the attacker&apos;s <strong>consumables</strong> in the worst
          case. Attack potions stack, and debuffs can be cast onto your Kami
          directly. A margin computed against a sober attacker is not a margin.
        </li>
      </ul>
      <p>
        Build the margin out of <strong>stats and skills</strong>. Those are the
        terms to carry into the arithmetic; treat anything else your Kami is
        wearing as flavor rather than as a number you are relying on to
        survive.
      </p>

      <MathLives>
        The full threshold calculation, the affinity table that scales it, and
        the attack and defense bonus channels:{" "}
        <Link href="/formulas/liquidations">Liquidations → Kill Threshold</Link>
        . Where Harmony and Health come from:{" "}
        <Link href="/formulas/stats">Stats &amp; Bonuses</Link>.
      </MathLives>

      <h2>Margins Protect. Reaction Time Does Not.</h2>
      <p>
        The instinct is to watch the node and pull your Kami off when someone
        dangerous walks in. Abandon it. Attack cadence is a build variable, and
        its floor is zero — cooldown reduction is a thing predators buy on
        purpose. A properly built assassin can sweep every exposed accrual on a
        node in seconds.
      </p>
      <p>
        Assume you will not out-react anyone. Every defense that works is a
        defense that holds while you are asleep.
      </p>

      <MathLives>
        The cooldown arithmetic and how far it can be pushed:{" "}
        <Link href="/formulas/liquidations">Liquidations → Kill Cooldown</Link>{" "}
        and <Link href="/formulas/harvesting">Harvesting → Cooldown</Link>.
      </MathLives>

      <h2>The Post-Kill Window</h2>
      <p>
        Killing is not free. A Kami that liquidates absorbs the strain of the
        spoils it just took, plus recoil damage scaled by its victim&apos;s
        Violence. For a few moments after its own kill, a predator is at its
        most killable — health low, and standing in exactly the place everyone
        is looking.
      </p>
      <p>
        Two things follow. A Kami that never kills never opens that window at
        all, which is a quiet argument for pure farm builds on dangerous
        ground. And hunters of hunters live inside that window: countering
        predation is largely a matter of being present and healthy when someone
        else has just paid the cost of a kill.
      </p>

      <MathLives>
        Recoil, karma, and what the killer pays in health:{" "}
        <Link href="/formulas/liquidations">
          Liquidations → Recoil Damage to the Attacker
        </Link>
        .
      </MathLives>

      <h2>Three Ways to Hold Dangerous Ground</h2>
      <p>
        All three work. All three cost. The mistake is choosing one without
        pricing it.
      </p>

      <h3>1. Bank early and small</h3>
      <p>
        The standard answer: keep the uncollected pile small so there is
        nothing worth taking, collecting or stopping well before the tank
        fills. It is reliable and it needs no allies.
      </p>
      <p>
        The price is not paid in deaths, it is paid in forfeited ramp. Halving
        your sit length roughly halves what each stop could have banked. You
        are buying safety with income, at a rate you should at least know.
      </p>

      <h3>2. A bodyguard squad</h3>
      <p>
        Violence-built protectors parked on the same node as the farm,
        suppressing raiders. It works in the sense that raiders get killed —
        but the squad itself nets roughly zero, so protection is a make-or-buy
        decision where <strong>there is nothing to buy</strong>: no protection
        market exists, so it means running fighters in-house and carrying their
        whole cost.
      </p>
      <p>
        It also has a structural flaw. On busy ground the bodyguards&apos; own
        kills keep opening the post-kill window, and the squad gets
        counter-hunted. Bodyguarding fails exactly where it is most needed.
      </p>

      <h3>3. Feed-tanking</h3>
      <p>
        Keep a big-health fleet fed so that health never drops far. If your
        Kamis stay above every attacker&apos;s threshold, your accruals become
        uneconomic to take at any size — not because they are hidden, but
        because the check never passes.
      </p>
      <p>
        This is the most gas-elegant defense available. Once health is no
        longer the binding constraint, sit length stops being a safety
        parameter and becomes a pure cost-amortization knob: sit as long as the
        transaction economics prefer, not as long as you dare.
      </p>

      <DoctrineTable
        headers={["Defense", "What it costs", "Where it breaks"]}
        rows={[
          [
            <strong key="a">Bank early and small</strong>,
            "Roughly half of what each sit could have banked.",
            "Nowhere — it just permanently taxes your income.",
          ],
          [
            <strong key="b">Bodyguard squad</strong>,
            "Fighters that net about zero, run in-house because nobody sells the service.",
            "Busy ground: their own kills expose them to counter-hunting.",
          ],
          [
            <strong key="c">Feed-tanking</strong>,
            "A standing food bill and high-Health Kamis to put it on.",
            "Nothing structural; it is limited by how much Health you can assemble.",
          ],
        ]}
      />

      <h2>Death Is a Cost Line, Not a Catastrophe</h2>
      <p>
        Losing a Kami feels like a disaster and is priced like one by most new
        players. Run the numbers instead. Revive-and-redeploy is cheap at scale
        — on the order of one percent of gross for a well-run fleet.
      </p>
      <p>
        So price your margins against <strong>expected loss</strong>, not
        against never dying. A defensive posture that costs you a third of your
        income to avoid a one-percent line item is a bad trade, however much
        better it feels.
      </p>

      <MathLives>
        Revival costs and what death actually removes:{" "}
        <Link href="/formulas/liquidations">
          Liquidations → Death and Revival
        </Link>
        . What the attacker takes and what is destroyed:{" "}
        <Link href="/formulas/liquidations">Liquidations → Salvage</Link>.
      </MathLives>

      <h2>Or: Do Not Be There</h2>
      <p>
        Every defense above is for players who have decided a particular node
        is worth holding. Most of the time it is not. See{" "}
        <Link href="/strategy/ground">Choosing ground and counting costs</Link>{" "}
        — quiet, affinity-matched ground at par yield is a complete answer to
        this entire page.
      </p>
    </StrategyPage>
  );
}
