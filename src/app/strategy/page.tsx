import type { Metadata } from "next";
import Link from "next/link";
import { StrategyPage, DoctrineTable, MathLives } from "@/components/strategy-page";

export const metadata: Metadata = {
  title: "How the Game Is Really Played",
};

export default function StrategyIndexPage() {
  return (
    <StrategyPage
      title="How the Game Is Really Played"
      subtitle="The rules pages tell you what the game permits. This section tells you what players actually do with it."
    >
      <h2>The Efficiency Mindset</h2>
      <p>
        The players who last do not optimize for the biggest number on the
        harvest screen. They optimize <strong>net income per unit of
        upkeep</strong>: what a fleet of Kamis earns in a day against what it
        costs to run for that day. The cost side is real and it is four lines
        — food, deaths, taxes, and the blockchain transaction fees (gas) on
        every action.
      </p>
      <p>
        That last line is the one newcomers miss. Kamigotchi is on-chain, so
        every start, every collect, every feed, every stop is a transaction
        that costs gas. An operating rhythm is therefore not a matter of taste
        — <strong>a rhythm IS a cost structure</strong>. Two players with
        identical Kamis on identical nodes can have completely different
        margins purely because one of them touches the game ten times a day
        and the other touches it once.
      </p>
      <p>
        Scale and efficiency are different games. A big fleet buys total
        output; it does not buy efficiency. A small, well-run operation can be
        far more efficient per unit of cost than a giant one, and the small
        operator gets to choose quiet ground the large one cannot fit onto.
        Decide which game you are playing before you buy your fifth Kami.
      </p>
      <p>
        One structural mercy: earning and leveling are the same act. Every
        point of post-tax harvest output is also a point of experience, so a
        Kami that is productive is leveling itself with no separate grind.
        Levels never come off — they are a one-way ratchet baked into the
        Kami, which is why a well-farmed Kami is worth more than a fresh one
        with the same traits.
      </p>

      <MathLives>
        Harvest output, strain and tax:{" "}
        <Link href="/formulas/harvesting">Harvesting</Link>. Experience per
        point of output and the level curve:{" "}
        <Link href="/formulas/leveling">Leveling &amp; XP</Link>.
      </MathLives>

      <h2>The Archetypes at a Glance</h2>
      <p>
        Four shapes cover most of what you will meet in the world. They are
        distinguished less by stats than by <em>operating cycle</em> — how
        often the owner touches the Kami, and what the Kami is doing between
        touches.
      </p>

      <DoctrineTable
        headers={["Archetype", "What it looks like", "What it lives on"]}
        rows={[
          [
            <strong key="t">The tank / intensity farmer</strong>,
            "High Health and Harmony, intensity skills, one very long uninterrupted sit at a time.",
            "Very few transactions per day. Gas-cheap, quiet, and strong on ground that is safe or well defended.",
          ],
          [
            <strong key="a">The always-on / fertility farmer</strong>,
            "High Power, affinity-matched to its node, fed at intervals so it never stops.",
            "Higher gross per Kami, many more transactions, and a food bill that decides whether any of it was worth it.",
          ],
          [
            <strong key="b">The bodyguard</strong>,
            "Violence-built Kamis parked on the same node as a farm, killing raiders who come for it.",
            "Nothing, directly — it is overhead bought to protect someone else's income.",
          ],
          [
            <strong key="p">The predator</strong>,
            "A specialized violence build that harvests mostly as a means of standing where the kills are.",
            "Other players' uncollected bounty, plus the Obol and experience that every kill pays.",
          ],
        ]}
      />

      <p>
        Stat template and operating cycle are independent choices. A
        harvester-statted Kami can be run on tank cycles, and a tanky one can
        be fed on a schedule. Pick each on purpose rather than letting the
        trait roll decide for you —{" "}
        <Link href="/strategy/farming">Farming well</Link> works through both
        cycles in detail.
      </p>

      <h2>The Map Has a Social Geography</h2>
      <p>
        No node is mechanically more dangerous than another. The rules are the
        same everywhere: you can only be liquidated by someone harvesting the
        same node as you. What differs is <em>who else is standing there</em>.
      </p>
      <p>
        So the map splits into quiet ground and contested ground, and the
        split is a fact about the population rather than about the nodes. A
        handful of high-yield nodes are persistently fought over; most of the
        map is calm. Learning which is which is the single most valuable piece
        of local knowledge in the game, and it is the subject of{" "}
        <Link href="/strategy/ground">Choosing ground and counting costs</Link>.
      </p>

      <h2>Where to Go Next</h2>
      <ul>
        <li>
          <Link href="/strategy/farming">Farming well</Link> — the strain tank,
          and the two ways to run a farm.
        </li>
        <li>
          <Link href="/strategy/defense">
            Staying alive on contested ground
          </Link>{" "}
          — the threat model, and the three defenses that actually hold.
        </li>
        <li>
          <Link href="/strategy/predation">The predator&apos;s economy</Link> —
          what a kill really pays, and which predator models work.
        </li>
        <li>
          <Link href="/strategy/ground">Choosing ground and counting costs</Link>{" "}
          — node choice, the second currency, and the cost lines.
        </li>
      </ul>

      <h2>What the Stamp Means</h2>
      <p>
        Every page in this section carries the same line under its title:{" "}
        <em>Landscape and doctrine as of August 2026.</em>
      </p>
      <p>
        The <Link href="/formulas">Mechanics</Link> pages are timeless. A
        formula is a formula; it holds until the game itself changes, and
        those pages are written with no dates for that reason. This section is
        different. It describes a living population — where players cluster,
        what they have learned to do to each other, which builds are worth
        countering. That decays. Predator doctrine decays fastest of all,
        because it is defined against prey that adapts, dies, or leaves.
      </p>
      <p>
        Read the stamp as a freshness date. If it is far behind, treat the
        shape of the arguments as durable and the specific numbers as
        historical.
      </p>
    </StrategyPage>
  );
}
