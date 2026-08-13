import type { Metadata } from "next";
import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export const metadata: Metadata = {
  title: "Stats & Bonuses",
};

export default function StatsFormulasPage() {
  return (
    <MechanicPage
      title="Stats & Bonuses"
      subtitle="How your Kami's numbers actually work — from birth traits to endgame stacking."
      overview={
        <>
          <h2>Your Kami's Five Stats</h2>
          <p>
            Every Kami in the game is defined by five stats. These aren't just
            numbers on a screen — they determine how you harvest, how you fight,
            how long you survive, and how much gear you can carry. Understanding
            them is the first step toward building a Kami that fits your
            playstyle.
          </p>

          <StatTable
            headers={["Stat", "What It Does"]}
            rows={[
              [
                "Health",
                "Your hit points, and the fuel a harvest burns. Hitting zero does not kill your Kami — it strands it, unable to collect or stop, and open to liquidation. Higher Health means longer harvests and more time to react.",
              ],
              [
                "Power",
                "Drives your harvest rate (Fertility) and determines how much Musu you loot from combat (Spoils).",
              ],
              [
                "Violence",
                "Your offensive edge. Higher Violence makes it easier to liquidate other Kamis and gives you an Intensity bonus while harvesting.",
              ],
              [
                "Harmony",
                "Your defensive backbone. Harmony protects you from being liquidated, reduces strain damage, and speeds up healing.",
              ],
              [
                "Slots",
                "A trait-derived stat (e.g. Octahedron body +2, Cube body +1). Regardless of Slots, every Kami can wear exactly one equipment item — see Equipment below.",
              ],
            ]}
          />

          <h2>The Numbers You Are Actually Working With</h2>
          <p>
            Before diving into formulas, calibrate your intuition. A Kami&apos;s
            base stats are fixed at mint: it starts from a hardcoded floor and
            each of its five traits adds whatever that trait carries. Nothing
            afterwards changes the base — skills and gear stack on top of it.
            The floor and the ceiling below are what the trait catalogue allows;
            the middle column is what an average roll comes to.
          </p>
          <StatTable
            headers={[
              "Stat",
              "Floor (no trait contributes any)",
              "Average roll",
              "Best possible roll",
            ]}
            rows={[
              ["Health", "50", "~89", "360"],
              ["Power", "10", "~15", "44"],
              ["Violence", "10", "~14", "42"],
              ["Harmony", "10", "~14", "38"],
            ]}
          />
          <p>
            Two things follow. First, the top of the range is far away from the
            middle — a stat of 20+ on an ordinary roll is already good, and the
            record-holding traits (a Wings hand alone carries 90 Health) are
            what separate a great Kami from a good one. Second, the ceilings are
            still <em>small numbers</em>. If a guide or calculator assumes stats
            like &ldquo;Harmony 100,&rdquo; it is not describing this game.
          </p>
          <p>
            Skills then do the rest. Work it through for a defensive build:
            take an average Health roll of about 90 and max two of the
            +10-per-level Health skills (+100 across ten skill points), and you
            have 190 effective Health. Harmony climbs more slowly because its
            skills are worth one to five points each rather than ten: the same
            average roll of 14 plus the Guardian tree&apos;s Defensiveness (+5)
            and Anxiety (+3) lands at 22.
          </p>
          <p>
            At the theoretical ceiling — a best-case trait roll with every
            relevant skill — effective Health reaches{" "}
            <strong>460</strong> (the 360 base roll plus +100 from the two
            maxed Health skills) and Harmony reaches <strong>56</strong> (38
            base, +13 from the Guardian Harmony line, +5 from Index Funds).
            Those are build ceilings, not what you should expect to meet.
          </p>

          <h2>How Stats Are Built Up</h2>
          <p>
            Your Kami's final stat values aren't just one number — they're
            assembled from layers of modifiers stacking on top of each other.
            Think of it like this: your Kami is born with a set of{" "}
            <strong>base</strong> stats determined by its traits. Then, as you
            play, various sources add flat bonuses (called{" "}
            <strong>shifts</strong>) and percentage multipliers (called{" "}
            <strong>boosts</strong>) on top of that foundation.
          </p>
          <p>
            The game first adds up all your flat bonuses, then applies the
            percentage multiplier to the combined total. So if you have a base of
            50, a +10 shift from a skill, and a +50% boost from equipment, the
            game calculates (50 + 10) multiplied by 1.5, giving you an effective
            stat of 90 — not 85.
          </p>

          <h3>Where Do Modifiers Come From?</h3>
          <p>
            Modifiers flow in from all corners of the game. Your{" "}
            <strong>traits</strong> establish your base stats at birth — different
            trait combinations give different starting spreads, and you can't
            change these afterward. <strong>Consumable items</strong> like
            potions and tonics can permanently raise your shifts or instantly
            restore depleted stats like Health. <strong>Skills</strong> from the
            four skill trees grant bonuses as long as you have them learned —
            they are the channel that does the heavy lifting on a built Kami.
            Finally,{" "}
            <strong>temporary effects</strong> from food, combat, or timed
            consumables give short-lived buffs that expire when certain game
            events happen (like finishing a harvest or dying).
          </p>

          <h2>The Bonus System in a Nutshell</h2>
          <p>
            Behind the scenes, every modifier on your Kami — whether from a
            skill, a food buff, or a combat effect — is
            tracked as a <strong>bonus</strong>. Each bonus has a type (like
            "Health Shift" or "Power Boost") and a value. When the game
            calculates your effective stats, it sums up all bonuses of each type
            and folds them into the formula.
          </p>
          <p>
            Some bonuses are <strong>permanent</strong> — they stick around as
            long as their source exists, a learned skill being the clearest
            case. Others are <strong>temporary</strong> — they disappear when a
            specific event happens, like finishing a harvest or dying.
          </p>

          <h2>Equipment: One Pet Per Kami</h2>
          <p>
            All current Kami equipment goes into a single <strong>pet
            slot</strong> — every Kami can wear exactly one pet at a time. Pets
            come from the sacrifice pipeline: sacrificing a Kami at the Temple
            of the Wheel draws a pet item from the sacrifice droptables, which
            is the only source of them (see{" "}
            <a href="/formulas/liquidations">Liquidations &rarr; Sacrifice</a>{" "}
            for the tables and odds). They arrive in themed sets of three
            tiers, so collecting them is a game in itself. Plan your Kami&apos;s
            numbers from its trait roll and its skill picks — those are the two
            channels you can count on when you work out a build. (The
            &ldquo;Slots&rdquo; stat some traits grant does not add extra
            equipment capacity.)
          </p>

          <h2>Strategic Considerations</h2>

          <h3>Harmony vs Health</h3>
          <p>
            Both keep you alive, but they multiply rather than compete. Think
            of harvesting as slowly burning your Kami&apos;s HP for
            Musu: <strong>Harmony</strong> lowers the price (less HP lost per
            Musu harvested, faster HP regeneration while resting, and a higher
            bar for predators trying to liquidate you),
            while <strong>Health</strong> is the size of the fuel tank (how
            much total Musu one harvest cycle can produce before your Kami
            needs to rest or be fed). A high-Harmony, high-Health Kami can sit
            on a node for many hours unattended — which is exactly what the
            popular tanky &ldquo;intensity&rdquo; builds do. If either stat is
            low, your Kami spends a low percentage of its life harvesting and
            a high percentage resting or dead.
          </p>

          <h3>Violence vs Power</h3>
          <p>
            Both are &ldquo;income&rdquo; stats, through different
            engines. <strong>Power</strong> drives the steady, constant part
            of your harvest rate (Fertility) — it pays from the first minute
            and is the core stat for fast active
            harvesters. <strong>Violence</strong> is the kill stat for
            predators, but it also seeds the <em>Intensity</em> part of the
            harvest rate, which ramps up the longer a single harvest runs —
            so it pays on Kamis durable enough to stay parked for hours.
            Predator hopefuls want 20+ base Violence; dedicated harvesters
            want high Power with enough Harmony to keep strain affordable.
          </p>
        </>
      }
      details={
        <>
          <h2>The Effective Stat Formula</h2>
          <p>
            Every stat on your Kami — Health, Power, Violence, Harmony, and
            Slots — goes through the same calculation to arrive at an effective
            value. The game takes your base value (from traits), adds all flat
            shift modifiers, then scales the result by the boost multiplier.
          </p>

          <FormulaBlock
            label="Effective Stat"
            vars={{
              "Effective": "your Kami's final usable stat value after all modifiers",
              "base": "permanent value from traits, set at birth and never changes",
              "shift": "sum of all flat modifiers (consumables, skills, temporary effects)",
              "boost": "sum of all percentage modifiers in per-mille (500 = +50%, 1000 = +100%)",
            }}
          >
            {`Effective = (base + shift) x (1000 + boost) / 1000

If the result is negative, it is set to 0.`}
          </FormulaBlock>

          <p>
            Here, <strong>base</strong> is the permanent value your Kami was born
            with, determined entirely by traits. <strong>Shift</strong> is the
            sum of all flat modifiers from consumables, skills, and temporary
            effects. <strong>Boost</strong> is the sum of
            all percentage modifiers, expressed in per-mille (thousandths): a
            boost of 0 means no change (1.0x), 500 means +50% (1.5x), 1000
            means double (2.0x), and -500 means half (0.5x).
          </p>

          <h3>Worked Example: A Real Tank Build</h3>
          <p>
            Here is how an actual defensive (&ldquo;Guardian&rdquo;) build
            assembles its Health. A Kami is born with 90 base Health — a solid
            roll. Its owner maxes two +10-Health-per-level skills (Toughness in
            the Guardian tree and Cardio in Enlightened: +50 each):
          </p>
          <FormulaBlock
            variant="example"
            vars={{
              "90": "base Health from traits",
              "100": "total shift: +50 + +50 from the two maxed Health skills",
              "0": "boost — no percentage Health modifiers in this build",
            }}
          >
            {`Effective Health = (90 + 100) x (1000 + 0) / 1000
                 = 190`}
          </FormulaBlock>
          <p>
            190 effective HP from a 90-HP Kami — the skill lines alone more
            than double the trait roll, and every point of it arrives through
            the shift channel. Run the same arithmetic on the best trait roll
            the catalogue allows (360 base Health) and the same two skills put
            the ceiling at 460.
          </p>
          <p>
            In current content, core stats (Health, Power, Violence, Harmony)
            are modified almost exclusively through the <strong>shift</strong>{" "}
            channel. The <strong>boost</strong> (percentage) channel exists in
            the engine for stats too, but today&apos;s percentage effects live
            in the harvest and combat systems instead — fertility, bounty,
            threshold, and metabolism bonuses. So in practice: stats add,
            harvest bonuses multiply.
          </p>

          <h3>How the Formula Behaves</h3>
          <StatTable
            headers={["Scenario", "Base", "Shift", "Boost", "Effective"]}
            rows={[
              ["Fresh Kami, no modifiers", 90, 0, 0, 90],
              ["One +10 Health skill level", 90, 10, 0, 100],
              ["Both Health skills maxed", 90, 100, 0, 190],
              ["(Illustrative) +50% boost on top", 90, 100, 500, 285],
              ["(Illustrative) -50% debuff instead", 90, 100, -500, 95],
            ]}
          />

          <InfoBox variant="tip">
            The boost rows show why the ordering matters: a percentage boost
            multiplies the <em>combined</em> base + shift, so every flat point
            you stack gets amplified by any boost applied later. If the result
            ever goes negative, it clamps to 0.
          </InfoBox>

          <h2>Depletable Stats: Health and Slots</h2>
          <p>
            Health and Slots are <strong>depletable</strong> — they have a
            current value that can decrease and be restored. Health drops when
            your Kami takes damage; Slots decrease as you equip items. The game
            tracks this current value separately (often called "sync" in the
            underlying system) and always clamps it between 0 and your current
            effective maximum.
          </p>
          <FormulaBlock
            label="Current Value Update"
            vars={{
              "new current": "the stat's value after the update",
              "old current": "the stat's value before the update",
              "change": "amount added or subtracted (positive = heal/restore, negative = damage/use)",
              "effective maximum": "the stat's cap from the Effective Stat formula above",
            }}
          >
            {`new current = clamp(old current + change, 0, effective maximum)`}
          </FormulaBlock>
          <p>
            For example, if your effective max Health is 90 and your current
            Health is 60, drinking a potion that restores 50 HP brings you to
            90 — not 110. You can never exceed your effective maximum. If a boost
            expires and your effective maximum drops below your current value,
            your current value will be capped the next time it's updated.
          </p>

          <h2>How Bonuses Layer Into Stats</h2>
          <p>
            When the game calculates your effective stats, it gathers all active
            bonuses on your Kami and sorts them by type. Each stat has two
            possible bonus channels:
          </p>

          <StatTable
            headers={["Bonus Channel", "What It Does", "Example"]}
            rows={[
              [
                "Stat Shift",
                "Adds flat points to the stat's shift value before the boost multiplier is applied",
                "A skill granting +5 Health Shift",
              ],
              [
                "Stat Boost",
                "Adds to the percentage multiplier applied after base + shift are combined",
                "A source granting +20% Power Boost (value: 200)",
              ],
            ]}
          />

          <p>
            The effective stat is then assembled as follows: take the Kami's
            innate base (from traits — this never changes), add the innate shift
            plus all Shift bonuses, add the innate boost plus all Boost bonuses,
            then run the formula.
          </p>

          <FormulaBlock
            label="Full Calculation With Bonuses"
            vars={{
              "innate shift": "the Kami's built-in flat modifier (usually 0 unless altered by consumables)",
              "Shift bonuses": "flat modifiers from skills, consumables, and temporary effects",
              "innate boost": "the Kami's built-in percentage modifier (usually 0)",
              "Boost bonuses": "percentage modifiers from skills, consumables, and temporary effects",
              "base": "permanent value from traits, set at birth",
              "Effective": "final usable stat value after all modifiers",
            }}
          >
            {`total shift = innate shift + sum of all Shift bonuses
total boost = innate boost + sum of all Boost bonuses

Effective = (base + total shift) x (1000 + total boost) / 1000`}
          </FormulaBlock>

          <h3>Bonus Stacking</h3>
          <p>
            Multiple bonuses of the same type from different sources all add
            together. If you have one skill giving +5 Health Shift and another
            giving +3 Health Shift, your total Health Shift bonus is
            +8. Permanent bonuses such as skills can stack by
            increasing in level — applying the same bonus again from the same
            source makes it stronger rather than creating a duplicate. The final
            value of a bonus is its per-level value multiplied by its level.
          </p>

          <h2>Bonus Duration: Permanent, Temporary, and Timed</h2>

          <h3>Permanent Bonuses</h3>
          <p>
            These last as long as their source exists. A bonus from a skill stays
            until you respec that skill. They stack via level — applying the same permanent bonus
            again increments the level rather than creating a separate instance,
            making it progressively stronger.
          </p>

          <h3>Temporary Bonuses</h3>
          <p>
            These are tied to a specific game event and vanish when that event
            occurs. They do <strong>not</strong> stack — if you apply the same
            temporary bonus twice, it replaces the first rather than doubling up.
            This means chugging two of the same food buff is wasteful.
          </p>

          <h2>When Do Temporary Bonuses Expire?</h2>
          <p>
            Each temporary bonus is tagged with an expiration trigger. Here's
            what clears what:
          </p>

          <StatTable
            headers={["Trigger", "Bonus Clears When...", "Typical Source"]}
            rows={[
              [
                "Harvest Action",
                "You collect, feed, or stop a harvest",
                "Food buffs that last for one harvest cycle",
              ],
              [
                "Harvest Stop",
                "You stop harvesting or get liquidated mid-harvest",
                "Buffs that persist through multiple collects but end when you leave the node",
              ],
              [
                "Death",
                "Your Kami dies",
                "Death-triggered effects and curses",
              ],
              [
                "Kill or Killed",
                "You kill another Kami, or another Kami kills you",
                "One-round combat buffs",
              ],
              [
                "Liquidation",
                "You successfully liquidate another Kami",
                "Post-kill temporary effects",
              ],
              [
                "Cooldown Set",
                "Your Kami's cooldown is (re)set — harvest start, collect, stop, or a liquidation",
                "Cooldown-modifying buffs like Energy Drink, consumed on their next action",
              ],
              [
                "Unequip",
                "You remove the item from that gear slot",
                "Effects scoped to a worn item",
              ],
              [
                "Timer",
                "A real-time countdown reaches zero",
                "Timed consumable buffs",
              ],
            ]}
          />

          <InfoBox variant="info">
            The Cleaning Fluid item clears temporary bonuses from your Kami —
            Harvest Stop, Cooldown Set, Death, Kill/Killed, Liquidation, and
            Timed effects are all wiped. It does <strong>not</strong> remove
            permanent bonuses such as your skills. Useful for purging debuffs
            (like a Curse Tablet applied by another player), but be aware it
            also strips your own temporary buffs.
          </InfoBox>

          <h2>All Bonus Types at a Glance</h2>
          <p>
            Beyond stat modifiers, the bonus system powers a range of combat and
            utility effects. Here's the full list of bonus types you'll
            encounter:
          </p>

          <h3>Stat Bonuses</h3>
          <StatTable
            headers={["Bonus", "Effect"]}
            rows={[
              ["Health Shift", "Flat increase to Health"],
              ["Health Boost", "Percentage increase to Health"],
              ["Power Shift", "Flat increase to Power (harvest rate)"],
              ["Power Boost", "Percentage increase to Power"],
              ["Violence Shift", "Flat increase to Violence (kill power)"],
              ["Violence Boost", "Percentage increase to Violence"],
              ["Harmony Shift", "Flat increase to Harmony (defense, healing)"],
              ["Harmony Boost", "Percentage increase to Harmony"],
            ]}
          />

          <h3>Combat Bonuses</h3>
          <StatTable
            headers={["Bonus", "Effect"]}
            rows={[
              [
                "Attack Threshold Ratio",
                "Scales your kill threshold when attacking — but only on advantaged and NORMAL-vs-NORMAL affinity matchups. On neutral and disadvantaged ones it does nothing.",
              ],
              [
                "Defense Threshold Ratio",
                "Scales the attacker's kill threshold down when defending — under the same matchup condition, so it only protects you against attackers who already have the type advantage.",
              ],
              [
                "Attack Threshold Shift",
                "Flat adjustment to kill threshold as attacker",
              ],
              [
                "Defense Threshold Shift",
                "Flat adjustment to kill threshold as defender",
              ],
              [
                "Spoils Ratio",
                "Changes what percentage of loot you steal when you kill another Kami",
              ],
              [
                "Salvage Ratio",
                "Changes what percentage of your loot you keep when you die",
              ],
              [
                "Recoil Boost",
                "Modifies the HP damage you take as recoil after making a kill",
              ],
            ]}
          />

          <h3>Utility Bonuses</h3>
          <StatTable
            headers={["Bonus", "Effect"]}
            rows={[
              [
                "Cooldown Shift",
                "Modifies standard action cooldowns — negative values make actions faster",
              ],
            ]}
          />

          <h2>Equipment Capacity</h2>
          <p>
            Every Kami has exactly one equipment slot. Choose your equipped item
            carefully — you can only wear one piece of gear at a time.
          </p>

          <h2>How Different Sources Apply Stats</h2>
          <p>
            Not everything interacts with your stats the same way. Here's how
            the major sources work:
          </p>

          <StatTable
            headers={["Source", "How It Affects Your Kami"]}
            rows={[
              [
                "Traits",
                "Set your base stats at birth. These never change afterward. Depletable stats (Health, Slots) start with their current value equal to the base.",
              ],
              [
                "Consumable Items",
                "Can permanently raise your shift (e.g., stat tonics) or instantly restore your current Health or Slots (e.g., healing potions).",
              ],
              [
                "Equipment",
                "Wearable pet items that occupy the single pet slot. Obtained from the sacrifice droptables; each Kami wears one at a time.",
              ],
              [
                "Skills",
                "Grant permanent bonuses that persist as long as the skill is learned. Respeccing the skill removes the bonus.",
              ],
            ]}
          />
        </>
      }
    />
  );
}
