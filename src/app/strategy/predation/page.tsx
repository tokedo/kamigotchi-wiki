import type { Metadata } from "next";
import Link from "next/link";
import { StrategyPage, DoctrineTable, MathLives } from "@/components/strategy-page";

export const metadata: Metadata = {
  title: "The Predator's Economy",
};

export default function StrategyPredationPage() {
  return (
    <StrategyPage
      title="The Predator's Economy"
      subtitle="Killing moves other people's money. Whether it moves any of it to you depends entirely on your build and your banking discipline."
    >
      <h2>What a Kill Actually Pays</h2>
      <p>
        When a liquidation lands, the victim&apos;s uncollected bounty is split
        four ways. These are rules, not doctrine — the exact arithmetic is on
        the combat page — but the shape of the split is what drives every
        decision below.
      </p>

      <DoctrineTable
        headers={["Slice", "Who gets it", "Size"]}
        rows={[
          [
            <strong key="a">Salvage</strong>,
            "The victim keeps it.",
            "1% of the bounty per point of the victim's Power.",
          ],
          [
            <strong key="b">Spoils</strong>,
            "The killer takes it — into its own harvest bounty.",
            "A base 45% of what remains, plus 1% per point of the killer's Power.",
          ],
          [
            <strong key="c">The remainder</strong>,
            "Nobody. It is destroyed.",
            "Whatever the first two slices leave.",
          ],
          [
            <strong key="d">The Obol</strong>,
            "The killer's account.",
            "Exactly 1 per kill.",
          ],
        ]}
      />

      <p>
        Two details in that table decide more than they look. First, spoils do
        not land in your inventory — they land in your{" "}
        <strong>own harvest bounty</strong>. You still have to collect them,
        and collecting them costs you strain exactly as if you had farmed them
        yourself. A kill is not a payout, it is a deposit into an account you
        must still empty.
      </p>
      <p>
        Second, the arithmetic means killing <strong>redistributes far more
        than it burns</strong>. Most of a dead Kami&apos;s bounty ends up with the
        victim or the killer rather than in the void. Predation&apos;s economic
        weight is targeted transfer, not destruction — which is why it can be
        an income strategy at all, and why it makes enemies rather than just
        making a mess.
      </p>

      <MathLives>
        Salvage, spoils, the Obol reward, and recoil in exact terms:{" "}
        <Link href="/formulas/liquidations">Liquidations</Link>. What collecting
        the spoils costs you in health:{" "}
        <Link href="/formulas/harvesting">Harvesting → Strain</Link>.
      </MathLives>

      <h2>The Viable Models</h2>

      <h3>1. Profit predation</h3>
      <p>
        Episodic raids, timed against fat exposed accruals rather than run on a
        schedule, with the Obol and experience treadmill underneath as a floor.
      </p>
      <p>
        The enabling asymmetry is the whole trick:{" "}
        <strong>predators die banked, victims die mid-accrual</strong>. A
        raider who collects promptly has very little on it at any moment; a
        farmer deep into a long sit has everything. Trading kills with someone
        who has nothing to lose is a losing trade for the farmer even when the
        exchange looks even.
      </p>
      <p>
        Counter-kills come fast, though, and the post-kill window cuts both
        ways — a raider that has just killed is briefly the most attractive
        target on the node.
      </p>

      <h3>2. Attrition warfare</h3>
      <p>
        Symmetric kill exchange on contested ground: two sides parked on the
        same node, killing each other as the thresholds allow. In Musu terms
        this runs <strong>net-negative</strong>. It is a cost of holding
        ground, not an income — worth paying if the ground is worth holding for
        other reasons, never worth entering as a business.
      </p>

      <h3>3. Bodyguarding</h3>
      <p>
        Violence builds parked to suppress raiders on a farm you or an ally
        own. It nets about zero and it does suppress raiders. Its failure mode
        is covered in full on{" "}
        <Link href="/strategy/defense">
          Staying alive on contested ground
        </Link>
        : on busy ground the bodyguards&apos; own kills keep exposing them, and
        the squad gets counter-hunted.
      </p>

      <h3>4. Roaming assassination</h3>
      <p>
        Roam instead of parking. Hit nodes holding passive or starving Kamis —
        targets that cannot counter-kill — and never stay long enough to be
        answered. A single build with cooldown pushed toward zero can take{" "}
        <strong>hundreds of kills in a matter of days</strong> this way.
      </p>
      <p>
        It asks more of the operator than the others, because it depends on
        knowing where the soft targets are right now rather than on holding a
        position.
      </p>

      <h2>The Failure Mode</h2>
      <p>
        The most common way to lose money at this is to fight a war with
        generalist-statted farm Kamis. Specialized violence builds win every
        exchange against generalists — the threshold check is not close, and it
        does not care how much Musu the loser had banked.
      </p>
      <p>
        If you are going to fight, build for it. Fighting without a violence
        build is not brave, it is a losing trade repeated until the Kami dies.
      </p>

      <MathLives>
        What Violence actually buys against a given Harmony, in real stat
        ranges:{" "}
        <Link href="/formulas/liquidations">
          Liquidations → What Violence Buys You
        </Link>
        . Skill lines that shape combat:{" "}
        <Link href="/formulas/leveling">Leveling &amp; XP → Skill Trees</Link>.
      </MathLives>

      <h2>Two Things Predators Get Wrong About Their Own Trade</h2>
      <p>
        <strong>Profitability comes from build and banking discipline, not
        from node choice.</strong> Farmers pick ground; predators pick targets
        and pick when to collect. Sitting on the best node in the world with a
        mediocre violence build and a lazy collection habit pays worse than
        roaming with a sharp one.
      </p>
      <p>
        <strong>Predation is population-relative.</strong> It pays exactly as
        well as the prey allows, and prey adapts, dies, or leaves. Every
        successful predator is eroding the conditions that made the model work.
        That is why all predator doctrine expires faster than farming doctrine
        — the farming pages describe arithmetic, this page describes other
        players, and other players learn.
      </p>
      <p>Read the stamp at the top of this page with that in mind.</p>
    </StrategyPage>
  );
}
