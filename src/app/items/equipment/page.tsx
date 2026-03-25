import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function EquipmentPage() {
  return (
    <MechanicPage
      title="Equipment"
      subtitle="Equip gear to your Kami for stat bonuses — manage slots, capacity, and bonuses"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>What Is Equipment?</h2>
      <p>
        Equipment items are special gear you can attach to your Kami to grant
        stat bonuses while worn. Think of it like giving your Kami armor, a pet
        companion, or a badge — each piece goes into a specific{" "}
        <strong>slot</strong> and provides bonuses as long as it stays equipped.
      </p>

      <h2>Slots</h2>
      <p>
        Each piece of equipment fits into a named slot. Only{" "}
        <strong>one item</strong> can occupy a given slot at a time. If you
        equip a new item into an already-filled slot, the old item is
        automatically unequipped first.
      </p>
      <p>
        Equipment slots are defined per-item. For example, a pet-type item goes
        into the &quot;Pet Slot,&quot; while a badge goes into the &quot;Badge
        Slot.&quot;
      </p>

      <h2>Equipment Capacity</h2>
      <p>
        Your Kami starts with a <strong>base capacity of 1</strong> equipment
        slot. This means you can initially fill one slot. Capacity can be
        increased through bonuses that grant additional equipment capacity.
      </p>
      <InfoBox variant="info">
        Swapping an item in an already-occupied slot does{" "}
        <strong>not</strong> consume additional capacity. Capacity is only
        checked when equipping into a <strong>new</strong> slot.
      </InfoBox>

      <h2>Equipping and Unequipping</h2>
      <p>
        To equip or unequip gear, your Kami must be in the{" "}
        <strong>Resting</strong> state. You cannot change equipment while
        harvesting, dead, or in any other state.
      </p>
      <ul>
        <li>
          <strong>Equip</strong> — the item is removed from your inventory and
          placed on the Kami. Stat bonuses are applied immediately.
        </li>
        <li>
          <strong>Unequip</strong> — the item is returned to your inventory and
          all bonuses from that slot are removed.
        </li>
      </ul>

      <h2>Stat Bonuses</h2>
      <p>
        When you equip an item, its stat bonuses are applied to your Kami as
        temporary bonuses. When you unequip, those bonuses are cleared. If you
        swap equipment in the same slot, the old bonuses are removed and new
        ones are applied in a single operation.
      </p>
      <InfoBox variant="tip">
        Equipment bonuses are tied to the slot, not the item. This means
        swapping gear in the same slot cleanly replaces the old bonuses with the
        new ones — no leftover effects.
      </InfoBox>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Capacity Formula</h2>
      <FormulaBlock label="Equipment Capacity">
        {"capacity = DEFAULT_CAPACITY + EQUIP_CAPACITY_SHIFT bonus\n\nDEFAULT_CAPACITY = 1\nMinimum capacity = 0 (cannot go negative)"}
      </FormulaBlock>
      <p>
        The EQUIP_CAPACITY_SHIFT bonus can come from skills, quest rewards, or
        other systems. When adding equipment to a new slot, the system checks
        that the total number of occupied slots is less than the capacity.
      </p>

      <h2>Slot Types</h2>
      <p>
        Slots follow a naming convention that encodes both the target type and
        the slot name:
      </p>
      <StatTable
        headers={["Pattern", "Target", "Example"]}
        rows={[
          ["Kami_Pet_Slot", "Kami", "Pet slot for your Kami"],
          ["Account_Badge_Slot", "Account", "Badge slot for your account"],
        ]}
      />

      <h2>Equip Process (Full Detail)</h2>
      <ol>
        <li>Resolve your account from the operator address</li>
        <li>Verify you own the Kami</li>
        <li>
          Verify the Kami is in <strong>RESTING</strong> state
        </li>
        <li>Verify the item is enabled and has type &quot;EQUIPMENT&quot;</li>
        <li>Read the item&apos;s slot from its &quot;For&quot; component</li>
        <li>
          If the slot is already occupied: unequip the existing item first (no
          capacity check needed for swaps)
        </li>
        <li>
          If it is a new slot: verify equippedCount &lt; capacity
        </li>
        <li>Remove 1 of the item from your inventory</li>
        <li>Create an equipment instance linking the Kami, item, and slot</li>
        <li>Apply the item&apos;s EQUIP bonuses to the Kami</li>
      </ol>

      <h2>Unequip Process (Full Detail)</h2>
      <ol>
        <li>Resolve your account from the operator address</li>
        <li>Verify you own the Kami</li>
        <li>
          Verify the Kami is in <strong>RESTING</strong> state
        </li>
        <li>Look up the equipment instance for the named slot</li>
        <li>
          Clear all bonuses tagged with &quot;ON_UNEQUIP_&#123;SLOT&#125;&quot;
        </li>
        <li>Remove the equipment instance entity</li>
        <li>Return 1 of the item back to your inventory</li>
      </ol>
      <InfoBox variant="info">
        Note that unequip takes a <strong>slot name</strong> (e.g.,
        &quot;Kami_Pet_Slot&quot;), not an item index. The system looks up which
        item is in that slot.
      </InfoBox>

      <h2>Bonus Lifecycle</h2>
      <p>
        Equipment bonuses use the naming convention{" "}
        <code>ON_UNEQUIP_&#123;SLOT&#125;</code> as their end type. This means:
      </p>
      <ul>
        <li>
          <strong>On equip:</strong> bonuses are assigned as temporary bonuses
          to the Kami
        </li>
        <li>
          <strong>On unequip:</strong> all bonuses tagged with that slot&apos;s
          end type are cleared
        </li>
        <li>
          <strong>On swap:</strong> old bonuses are cleared, then new bonuses
          are applied — a clean transition
        </li>
      </ul>

      <h2>Equipment Instance</h2>
      <StatTable
        headers={["Property", "Description"]}
        rows={[
          ["Entity Type", "EQUIPMENT"],
          ["IDOwnsEquipment", "The Kami or account holding this equipment"],
          ["IndexItem", "Which item is equipped"],
          ["For (Slot)", "The slot string this item occupies"],
        ]}
      />
      <p>
        Only one equipment instance exists per holder per slot. The instance ID
        is deterministic based on the holder and slot.
      </p>
    </>
  );
}
