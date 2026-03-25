import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function StatsPage() {
  return (
    <MechanicPage
      title="Stat System"
      subtitle="The six stats that define your Kami's capabilities"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>The Six Stats</h2>
      <p>
        Every Kami has six core stats that govern everything from how hard it
        hits to how fast it heals. Understanding your stats is key to building an
        effective Kami.
      </p>

      <StatTable
        headers={["Stat", "What It Does"]}
        rows={[
          [
            "Health",
            "Your Kami's hit points. When Health reaches 0, your Kami dies. Health regenerates over time while resting.",
          ],
          [
            "Power",
            "Determines harvesting output. Higher Power means you collect more resources per hour.",
          ],
          [
            "Violence",
            "Offensive combat stat. Higher Violence makes your Kami a stronger attacker when killing other Kamis.",
          ],
          [
            "Harmony",
            "Defensive and recovery stat. Affects healing rate, defense thresholds, and harvesting bonuses.",
          ],
          [
            "Slots",
            "Equipment capacity. Determines how many items your Kami can equip at once. Depletes as you equip gear.",
          ],
          [
            "Stamina",
            "Account-level movement resource. Spent when moving between rooms. Regenerates over time.",
          ],
        ]}
      />

      <h2>How Stats Work</h2>
      <p>
        Each stat has four internal components that combine into a final effective
        value:
      </p>
      <ul>
        <li>
          <strong>Base</strong> — Your permanent foundation. Set at creation from
          hardcoded values plus trait bonuses. The base never changes from bonuses.
        </li>
        <li>
          <strong>Shift</strong> — A flat additive modifier. Skills, equipment,
          and items can raise or lower this. Think of it as a permanent +/- to
          your stat.
        </li>
        <li>
          <strong>Boost</strong> — A percentage multiplier. A boost of +500 means
          +50% to your total. Boosts multiply your base+shift, making them
          increasingly powerful as your base grows.
        </li>
        <li>
          <strong>Sync</strong> — The current value for &quot;depletable&quot;
          stats (Health, Slots, Stamina). This is what goes down when you take
          damage or equip items, and what goes up when you heal.
        </li>
      </ul>

      <InfoBox variant="tip">
        The effective (total) value of a stat is calculated as:
        <br />
        <strong>Total = (1000 + boost) x (base + shift) / 1000</strong>
        <br />
        For example, a Kami with base 50, shift +10, and boost +500 (50%) would
        have: (1000 + 500) x (50 + 10) / 1000 = <strong>90</strong>.
      </InfoBox>

      <h2>Depletable Stats</h2>
      <p>
        Three stats have a &quot;current value&quot; (sync) that can go up and
        down:
      </p>
      <ul>
        <li>
          <strong>Health</strong> — Drains when taking damage, refills when
          healing. Starts at maximum.
        </li>
        <li>
          <strong>Slots</strong> — Used up when equipping items. Freed when
          unequipping. Starts at maximum.
        </li>
        <li>
          <strong>Stamina</strong> — Spent on movement. Regenerates over time.
        </li>
      </ul>
      <p>
        The other three stats (Power, Violence, Harmony) are always at their
        full calculated value — they don&apos;t deplete.
      </p>

      <h2>Where Stats Come From</h2>
      <p>
        Your Kami&apos;s stats start from creation (base values + trait bonuses)
        and then get modified over time by:
      </p>
      <ul>
        <li>
          <strong>Skills</strong> — Investing skill points adds permanent stat
          shifts
        </li>
        <li>
          <strong>Equipment</strong> — Equipped items can add shifts and boosts
        </li>
        <li>
          <strong>Consumables</strong> — Potions and food can add to shift
          (permanent) or sync (healing)
        </li>
        <li>
          <strong>Temporary effects</strong> — Combat and harvest buffs that
          expire
        </li>
      </ul>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>The Stat Struct</h2>
      <p>
        Every stat is stored as a 4-field struct packed into a single 256-bit
        value on-chain:
      </p>
      <StatTable
        headers={["Field", "Type", "Description"]}
        rows={[
          ["base", "int32", "Permanent base value — set at creation, never modified by bonuses"],
          ["shift", "int32", "Fixed additive modifier (+/-)"],
          ["boost", "int32", "Percentage multiplier (per-mille: 1000 = +100%)"],
          ["sync", "int32", "Current depletable value (for Health, Slots, Stamina)"],
        ]}
      />

      <h2>Stat Indices</h2>
      <StatTable
        headers={["Stat", "Index", "ECS Component", "Depletable?"]}
        rows={[
          ["Health", "1", "HealthComponent", "Yes — sync tracks current HP"],
          ["Harmony", "2", "HarmonyComponent", "No"],
          ["Power", "3", "PowerComponent", "No"],
          ["Slots", "4", "SlotsComponent", "Yes — sync tracks available slots"],
          ["Stamina", "5", "StaminaComponent", "Yes — sync tracks current stamina"],
          ["Violence", "6", "ViolenceComponent", "No"],
        ]}
      />

      <h2>Total (Effective) Stat Formula</h2>
      <FormulaBlock label="Effective Stat Value">
        {"Total = ((1000 + boost) × (base + shift)) / 1000\n\nIf Total < 0, then Total = 0\n\nThe boost is in per-mille (1/1000):\n  boost =  500 → +50%\n  boost = 1000 → +100% (double)\n  boost = -500 → -50%"}
      </FormulaBlock>

      <h2>Sync (Depletable Value) Update</h2>
      <FormulaBlock label="Sync Clamping">
        {"sync = clamp(current_sync + delta, 0, max)\nwhere max = Total (with bonuses applied)"}
      </FormulaBlock>

      <h2>Bonus System Integration</h2>
      <p>
        When computing a stat&apos;s effective value, the system queries two
        bonus types from the Bonus system:
      </p>
      <StatTable
        headers={["Bonus Key Pattern", "Modifies", "Example"]}
        rows={[
          ["STAT_{TYPE}_SHIFT", "shift field", "STAT_HEALTH_SHIFT"],
          ["STAT_{TYPE}_BOOST", "boost field", "STAT_POWER_BOOST"],
        ]}
      />
      <FormulaBlock label="Effective Stat with Bonuses">
        {"effectiveStat.base  = baseStat.base           (never modified by bonus)\neffectiveStat.shift = baseStat.shift + shiftBonus\neffectiveStat.boost = baseStat.boost + boostBonus\neffectiveStat.sync  = baseStat.sync              (carried through)"}
      </FormulaBlock>

      <h2>Stat Modification</h2>
      <p>
        When a delta is applied (e.g., from a consumable item), the
        modification rules are:
      </p>
      <FormulaBlock label="modify(delta, targetID)">
        {"result.base  = baseStat.base               (base is NEVER changed by modify)\nresult.shift = baseStat.shift + delta.shift\nresult.boost = baseStat.boost + delta.boost\nresult.sync  = baseStat.sync  + delta.sync\n\nIf delta.sync > 0, sync is clamped to the new total (with bonuses)."}
      </FormulaBlock>

      <h2>How Different Sources Use Stats</h2>
      <StatTable
        headers={["Source", "What It Modifies", "Notes"]}
        rows={[
          [
            "Traits (at creation)",
            "base",
            "Trait stat deltas are added to the Kami's base on creation. Depletable stats (Health, Slots) have sync set to match base.",
          ],
          [
            "Consumable Items",
            "shift and/or sync",
            "An item's base field updates the target's shift (permanent buff). Its sync field updates the target's sync (e.g., healing).",
          ],
          [
            "Equipment",
            "shift and boost",
            "Equipment has its own stat struct. Shift and boost start at 0 and can be upgraded.",
          ],
          [
            "Skills",
            "shift (via bonuses)",
            "Skills apply STAT_{TYPE}_SHIFT bonuses that add to the shift component.",
          ],
        ]}
      />

      <h2>On-Chain Encoding</h2>
      <FormulaBlock label="Stat Packing (uint256)">
        {"uint256 = (uint32(base) << 192) | (uint32(shift) << 128) | (uint32(boost) << 64) | uint32(sync)\n\nEach field occupies 64 bits (int32 cast to uint32 for packing)."}
      </FormulaBlock>
    </>
  );
}
