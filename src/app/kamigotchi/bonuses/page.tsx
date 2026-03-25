import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function BonusesPage() {
  return (
    <MechanicPage
      title="Bonus System"
      subtitle="How stat modifiers, buffs, and debuffs stack and expire"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>What Are Bonuses?</h2>
      <p>
        Bonuses are modifiers that change your Kami&apos;s stats or gameplay
        abilities. They come from skills, equipment, consumable items, and
        temporary combat effects. Some bonuses are permanent, while others expire
        after a specific action or time limit.
      </p>

      <h2>Permanent vs Temporary</h2>
      <ul>
        <li>
          <strong>Permanent bonuses</strong> come from skills and equipped items.
          They last as long as their source remains active. If you respec your
          skills or unequip an item, the bonus goes away.
        </li>
        <li>
          <strong>Temporary bonuses</strong> come from consumables, food, and
          combat effects. They expire when a triggering event occurs — for
          example, food buffs end when you collect your harvest.
        </li>
        <li>
          <strong>Timed bonuses</strong> are a special type of temporary bonus
          that last for a set duration (e.g., 30 minutes) regardless of actions.
        </li>
      </ul>

      <h2>How Stacking Works</h2>
      <p>
        Understanding how bonuses stack is important for min-maxing:
      </p>
      <ul>
        <li>
          <strong>Shift bonuses</strong> (flat modifiers) are <strong>additive</strong>.
          Multiple shift bonuses simply add together. A +5 and a +3 shift give +8 total.
        </li>
        <li>
          <strong>Boost bonuses</strong> (percentage modifiers)
          are <strong>multiplicative</strong> with the base+shift total. A boost
          of +500 (50%) applied to a base+shift of 60 gives 60 x 1.5 = 90.
          Multiple boosts add to the boost value first, then multiply.
        </li>
      </ul>

      <InfoBox variant="tip">
        Permanent bonuses stack by <strong>level</strong> — upgrading the same
        skill multiple times increases its bonus level, multiplying the effect.
        Temporary bonuses do <strong>not</strong> stack — their level is always 1.
      </InfoBox>

      <h2>When Temporary Bonuses Expire</h2>
      <StatTable
        headers={["Trigger", "What Clears", "Typical Source"]}
        rows={[
          ["Collect/Feed/Stop harvest", "Harvest-action bonuses", "Food buffs"],
          ["Stop harvesting", "Harvest-duration bonuses", "Long-term harvest effects"],
          ["Kami dies", "Death-triggered bonuses", "Defensive effects"],
          ["Kill or get killed", "Combat-round bonuses", "Combat consumables"],
          ["Liquidate another Kami", "Post-kill bonuses", "Liquidation effects"],
          ["Unequip item", "Equipment bonuses", "Equipped gear"],
          ["Timer expires", "Timed bonuses", "Timed consumable buffs"],
        ]}
      />

      <h2>Bonus Values Can Be Negative</h2>
      <p>
        Bonuses are signed values — they can be negative, acting as
        debuffs. Some items or effects may reduce your stats temporarily. For
        example, a combat recoil effect might apply a negative health shift.
      </p>

      <InfoBox variant="info">
        The <strong>Cleaning Fluid</strong> item removes all active temporary
        bonuses from your Kami (harvest, death, kill, liquidation, and timed
        bonuses). Permanent bonuses and equipment bonuses are not affected.
      </InfoBox>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Bonus Value Calculation</h2>
      <FormulaBlock label="Total Bonus of a Type on a Holder">
        {"totalBonus = sum( registryValue[i] × level[i] )\n           for all instances of that type on the holder\n\nValues are signed — bonuses can be negative (debuffs)."}
      </FormulaBlock>

      <h2>Registry-Instance Pattern</h2>
      <p>
        The bonus system uses a two-tier architecture:
      </p>
      <StatTable
        headers={["Layer", "What It Stores", "Identified By"]}
        rows={[
          [
            "Registry (definition)",
            "Bonus type, value, end type, duration",
            "keccak256(\"bonus.registry\", anchorID, type)",
          ],
          [
            "Instance (application)",
            "Source reference, holder, level, expiry",
            "keccak256(\"bonus.instance\", regID, holderID, duration)",
          ],
        ]}
      />

      <h2>Registry Entity Shape</h2>
      <StatTable
        headers={["Component", "Description"]}
        rows={[
          ["EntityType", "\"BONUS\""],
          ["IsRegistry", "Marks as registry entry"],
          ["IDAnchor", "Parent registry ID (e.g., skill or equipment reference)"],
          ["IdSource", "Literal source entity ID (for display)"],
          ["Type", "Bonus type string (e.g., \"STAT_HEALTH_SHIFT\")"],
          ["Value", "Bonus value (uint256, interpreted as signed int256)"],
          ["Subtype", "(temporary only) End anchor type"],
          ["Time", "(temporary only) Duration in seconds"],
        ]}
      />

      <h2>Instance Entity Shape</h2>
      <StatTable
        headers={["Component", "Description"]}
        rows={[
          ["IdSource", "Points to the registry entry"],
          ["IDAnchor", "Permanent: parent entity. Temporary: end anchor hash"],
          ["IDType", "Hash for querying all bonuses of a type on this holder"],
          ["Level", "Multiplier — permanent bonuses stack via level increments"],
          ["Time", "(timed only) Expiration timestamp"],
        ]}
      />

      <h2>Permanent vs Temporary Behavior</h2>
      <StatTable
        headers={["Property", "Permanent", "Temporary", "Timed"]}
        rows={[
          ["Anchor", "Specific entity (skill, equipment)", "End type hash", "End type hash"],
          ["Stacking", "Level increments on repeat assignment", "No stacking (level always 1)", "Each gets unique ID"],
          ["Removal", "When source removed (unequip, respec)", "On triggering event", "After duration expires"],
        ]}
      />

      <h2>End Types (Temporary Bonus Lifecycle)</h2>
      <StatTable
        headers={["End Type", "Cleared When", "Example"]}
        rows={[
          ["UPON_HARVEST_ACTION", "Collect, feed, or stop harvest", "Food buffs"],
          ["UPON_HARVEST_STOP", "Stop harvest or get liquidated", "Harvest-duration bonuses"],
          ["UPON_DEATH", "Kami dies", "Death-triggered effects"],
          ["UPON_KILL_OR_KILLED", "Kill or get killed", "Combat-round effects"],
          ["UPON_LIQUIDATION", "Liquidate another Kami", "Post-kill effects"],
          ["ON_UNEQUIP_{SLOT}", "Unequip from slot", "Equipment stat bonuses"],
          ["TIMED", "Duration expires", "Timed consumable buffs"],
        ]}
      />

      <h2>All Known Bonus Types</h2>
      <StatTable
        headers={["Bonus Type", "System", "Effect"]}
        rows={[
          ["STAT_{TYPE}_SHIFT", "Stats", "Adds to stat shift component (flat modifier)"],
          ["STAT_{TYPE}_BOOST", "Stats", "Adds to stat boost component (percentage multiplier)"],
          ["ATK_THRESHOLD_RATIO", "Kill", "Modifies kill threshold efficacy (attacker)"],
          ["DEF_THRESHOLD_RATIO", "Kill", "Modifies kill threshold efficacy (defender)"],
          ["ATK_THRESHOLD_SHIFT", "Kill", "Flat shift to kill threshold (attacker)"],
          ["DEF_THRESHOLD_SHIFT", "Kill", "Flat shift to kill threshold (defender)"],
          ["ATK_SPOILS_RATIO", "Kill", "Modifies spoils percentage (attacker)"],
          ["DEF_SALVAGE_RATIO", "Kill", "Modifies salvage percentage (defender)"],
          ["ATK_RECOIL_BOOST", "Kill", "Modifies recoil damage (attacker)"],
          ["EQUIP_CAPACITY_SHIFT", "Equipment", "Increases equipment slot capacity"],
          ["STND_COOLDOWN_SHIFT", "Cooldown", "Modifies standard cooldown duration"],
        ]}
      />

      <InfoBox variant="info">
        <strong>STAT_&#123;TYPE&#125;</strong> expands to the six stat names:
        HEALTH, POWER, VIOLENCE, HARMONY, SLOTS, STAMINA. So
        there are 12 stat bonus types total (6 shift + 6 boost).
      </InfoBox>

      <h2>Clear All</h2>
      <p>
        The <code>clearAll()</code> function removes all temporary bonuses from a
        holder: UPON_HARVEST_STOP, UPON_DEATH, UPON_KILL_OR_KILLED,
        UPON_LIQUIDATION, and TIMED. Permanent bonuses and ON_UNEQUIP bonuses
        are not affected. This is used by the Cleaning Fluid item.
      </p>

      <h2>Query Patterns</h2>
      <ul>
        <li>
          <strong>By parent</strong> — all instances sharing an anchor (e.g., all
          bonuses from one skill)
        </li>
        <li>
          <strong>By type</strong> — all instances of a specific bonus type on a
          holder (e.g., all STAT_HEALTH_SHIFT bonuses on a Kami)
        </li>
      </ul>
    </>
  );
}
