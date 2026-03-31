import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

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
                "Your hit points. When Health reaches zero, your Kami dies. Higher Health means surviving more hits and more time to react.",
              ],
              [
                "Power",
                "Drives your harvest rate (Fertility) and determines how much loot you get from combat. The workhorse stat for Obols.",
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
                "How many pieces of equipment your Kami can wear at once. Every Kami starts with 1 slot.",
              ],
            ]}
          />

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
            four skill trees grant bonuses as long as you have them learned.{" "}
            <strong>Equipment</strong> provides bonuses while it's worn, and
            unequipping it removes the bonus immediately. Finally,{" "}
            <strong>temporary effects</strong> from food, combat, or timed
            consumables give short-lived buffs that expire when certain game
            events happen (like finishing a harvest or dying).
          </p>

          <h2>Shift vs Boost: Which Is Better?</h2>
          <p>
            This is one of the most important strategic questions in Kamigotchi.
            Shifts are flat additions — predictable and always valuable. Boosts
            are percentage multipliers — they scale with your total base + shift,
            so they become more powerful the higher your underlying stats are.
          </p>
          <p>
            Early on, when your stats are low, shifts give you more bang for your
            buck. A +10 shift on a base of 50 is a 20% increase. But later, when
            your base + shift is already 100, a +50% boost gives you +50 — far
            more than most single shifts. The takeaway: stack shifts early,
            prioritize boosts once your foundation is solid.
          </p>

          <h2>The Bonus System in a Nutshell</h2>
          <p>
            Behind the scenes, every modifier on your Kami — whether from a
            skill, a piece of equipment, a food buff, or a combat effect — is
            tracked as a <strong>bonus</strong>. Each bonus has a type (like
            "Health Shift" or "Power Boost") and a value. When the game
            calculates your effective stats, it sums up all bonuses of each type
            and folds them into the formula.
          </p>
          <p>
            Some bonuses are <strong>permanent</strong> — they stick around as
            long as their source exists (an equipped weapon, a learned skill).
            Others are <strong>temporary</strong> — they disappear when a
            specific event happens, like finishing a harvest or dying.
          </p>

          <h2>Equipment Slots</h2>
          <p>
            Every Kami has a single equipment slot. Each piece of equipment takes
            up one slot, so choose your gear wisely — equipment bonuses are some
            of the strongest in the game.
          </p>

          <h2>Strategic Considerations</h2>

          <h3>Harmony vs Health</h3>
          <p>
            Both keep you alive, but in different ways. Health is a raw buffer —
            more HP means more hits before death. Harmony, on the other hand,
            makes you harder to liquidate in the first place, reduces strain
            damage, and speeds up healing. A high-Harmony Kami can sustain
            through prolonged danger; a high-Health Kami survives sudden bursts.
            Most experienced players lean toward Harmony for PvP survivability
            and Health for PvE endurance, but the best builds balance both.
          </p>

          <h3>Violence vs Power</h3>
          <p>
            Violence is your kill stat — it determines whether you can liquidate
            other Kamis and gives a harvesting bonus through Intensity. Power
            drives your base harvest rate and your spoils from combat. Aggressive
            players stack Violence for the liquidation edge; farming-focused
            players invest in Power for consistent Obol income. Hybrid builds
            exist, but pure specialization tends to be more efficient.
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
              "shift": "sum of all flat modifiers (consumables, skills, equipment)",
              "boost": "sum of all percentage modifiers in per-mille (500 = +50%, 1000 = +100%)",
            }}
          >
            {`Effective = (base + shift) x (1000 + boost) / 1000

If the result is negative, it is set to 0.`}
          </FormulaBlock>

          <p>
            Here, <strong>base</strong> is the permanent value your Kami was born
            with, determined entirely by traits. <strong>Shift</strong> is the
            sum of all flat modifiers from consumables, skills, equipment
            bonuses, and temporary effects. <strong>Boost</strong> is the sum of
            all percentage modifiers, expressed in per-mille (thousandths): a
            boost of 0 means no change (1.0x), 500 means +50% (1.5x), 1000
            means double (2.0x), and -500 means half (0.5x).
          </p>

          <h3>Worked Example: Building Up Health</h3>
          <p>
            Suppose your Kami has a base Health of 50 (from traits), you've used
            a consumable that permanently added +10 to your Health shift, and you
            have equipment granting a +50% Health boost (boost value of 500).
          </p>
          <FormulaBlock
            variant="example"
            vars={{
              "50": "base Health from traits",
              "10": "flat shift from a consumable",
              "500": "boost value representing +50%",
            }}
          >
            {`Effective Health = (50 + 10) x (1000 + 500) / 1000
                 = 60 x 1500 / 1000
                 = 90`}
          </FormulaBlock>
          <p>
            Notice how the boost multiplies the <em>combined</em> base + shift,
            not just the base. That +10 shift effectively became +15 after the
            50% boost was applied. This is why stacking shifts before boosts is
            so valuable — each flat point gets amplified.
          </p>

          <h3>More Scenarios</h3>
          <StatTable
            headers={["Scenario", "Base", "Shift", "Boost", "Effective"]}
            rows={[
              ["Fresh Kami, no modifiers", 50, 0, 0, 50],
              ["After a +10 shift from a skill", 50, 10, 0, 60],
              ["With a +50% boost only", 50, 0, 500, 75],
              ["Shift + boost combined", 50, 10, 500, 90],
              ["Under a -50% debuff", 50, 0, -500, 25],
              ["Debuff on a shifted stat", 50, 10, -500, 30],
            ]}
          />

          <InfoBox variant="tip">
            The last row illustrates an important point: even under a harsh -50%
            debuff, that +10 shift still saves you 5 effective points compared to
            having no shift at all (25 vs 30). Shifts are never wasted.
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
                "Equipment granting +20% Power Boost (value: 200)",
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
              "Shift bonuses": "flat modifiers from skills, equipment, and temporary effects",
              "innate boost": "the Kami's built-in percentage modifier (usually 0)",
              "Boost bonuses": "percentage modifiers from skills, equipment, and temporary effects",
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
            together. If you have a skill giving +5 Health Shift and a piece of
            equipment giving +3 Health Shift, your total Health Shift bonus is
            +8. Permanent bonuses (from skills, equipment) can stack by
            increasing in level — applying the same bonus again from the same
            source makes it stronger rather than creating a duplicate. The final
            value of a bonus is its per-level value multiplied by its level.
          </p>

          <h2>Bonus Duration: Permanent, Temporary, and Timed</h2>

          <h3>Permanent Bonuses</h3>
          <p>
            These last as long as their source exists. A bonus from a skill stays
            until you respec that skill. A bonus from equipment stays until you
            unequip it. They stack via level — applying the same permanent bonus
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
                "Unequip",
                "You remove the equipment from that gear slot",
                "Equipment stat bonuses (active while worn)",
              ],
              [
                "Timer",
                "A real-time countdown reaches zero",
                "Timed consumable buffs",
              ],
            ]}
          />

          <InfoBox variant="info">
            The Cleaning Fluid item clears <em>all</em> temporary bonuses from
            your Kami — Harvest Stop, Death, Kill/Killed, Liquidation, and Timed
            effects are all wiped. However, it does{" "}
            <strong>not</strong> remove permanent bonuses or equipment bonuses.
            Useful for purging debuffs, but be aware it also strips your
            temporary buffs.
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
                "Scales your kill threshold when attacking — higher values make it easier to liquidate targets",
              ],
              [
                "Defense Threshold Ratio",
                "Scales your kill threshold when defending — higher values make you harder to liquidate",
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
                "Provides bonuses through the bonus system while equipped. Equipment itself can also be upgraded to increase its bonus values.",
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
