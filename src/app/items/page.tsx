import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function ItemsPage() {
  return (
    <MechanicPage
      title="Items"
      subtitle="177 items across multiple categories — food, materials, equipment, potions, and more"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>What Are Items?</h2>
      <p>
        Items are everything your Kami and your account can hold, use, trade,
        and craft. From the Musu currency you harvest to the healing snacks you
        feed your Kami, items are the backbone of Kamigotchi&apos;s economy.
      </p>
      <p>
        All items are <strong>fungible</strong> — meaning each Wooden Stick is
        identical to every other Wooden Stick. Your inventory simply tracks how
        many of each item you own.
      </p>

      <h2>Item Categories</h2>
      <p>
        Items fall into several categories based on how they behave:
      </p>
      <ul>
        <li>
          <strong>Base items</strong> — simple holdable items like Musu
          (currency), crafting materials, and collectibles
        </li>
        <li>
          <strong>Food &amp; Consumables</strong> — items you use on your Kami
          for healing, stat buffs, or special effects
        </li>
        <li>
          <strong>Equipment</strong> — gear you equip to your Kami for permanent
          stat bonuses while worn
        </li>
        <li>
          <strong>Lootboxes</strong> — items that open into random rewards
        </li>
        <li>
          <strong>Potions</strong> — craftable consumables with powerful effects
        </li>
        <li>
          <strong>Spell Cards</strong> — items you cast on enemy Kamis
        </li>
      </ul>

      <h2>How To Use Items</h2>
      <p>
        Items can be used in four different ways:
      </p>
      <StatTable
        headers={["Action", "What It Does", "Notes"]}
        rows={[
          [
            "Use on your Kami",
            "Apply the item to one of your Kamis for healing, buffs, or effects",
            "Your Kami must be in the same room as you",
          ],
          [
            "Cast on enemy Kami",
            "Apply the item to another player's Kami (debuffs, damage, etc.)",
            "Costs 10 stamina. Target must be in the same room",
          ],
          [
            "Burn",
            "Permanently destroy the item. Used for quest turn-ins",
            "Some items are marked unburnable",
          ],
          [
            "Transfer",
            "Send items to another player's account",
            "Costs 15 Musu per item type transferred",
          ],
        ]}
      />

      <InfoBox variant="info">
        When you <strong>cast</strong> a spell card on an enemy Kami, it costs
        10 stamina. Both you and the target must be in the same room.
      </InfoBox>

      <h2>Item Flags</h2>
      <p>
        Some items have special flags that restrict what you can do with them:
      </p>
      <ul>
        <li>
          <strong>Soulbound</strong> — cannot be traded or transferred (tied to
          your account)
        </li>
        <li>
          <strong>Untradable</strong> — cannot be transferred between players
        </li>
        <li>
          <strong>Unburnable</strong> — cannot be burned or destroyed
        </li>
      </ul>

      <h2>Key Items</h2>
      <StatTable
        headers={["Item", "What It Is"]}
        rows={[
          ["Musu", "The primary currency. Earned by harvesting. Used to buy items, pay fees, and trade."],
          ["Gacha Ticket", "Spend to mint a new Kami through the Gacha system"],
          ["Reroll Token", "Exchange an existing Kami for a new random one"],
          ["Onyx Shards", "Premium currency. Bridgeable to/from the ERC-20 token"],
          ["Obols", "Special collectible items"],
        ]}
      />

      <h2>Token-Backed Items</h2>
      <p>
        Some items like <strong>Onyx Shards</strong> are linked to real ERC-20
        tokens on the blockchain. You can import tokens into the game (turning
        them into items) and export items back out (turning them into tokens)
        through the Token Portal. See the{" "}
        <a href="/marketplace/onyx">Onyx &amp; Token Portal</a> page for
        details.
      </p>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Item Registry Constants</h2>
      <StatTable
        headers={["Constant", "Item Index", "Description"]}
        rows={[
          ["MUSU_INDEX", "1", "Musu — primary currency (harvested resource)"],
          ["GACHA_TICKET_INDEX", "10", "Gacha mint ticket"],
          ["REROLL_TICKET_INDEX", "11", "Gacha reroll ticket"],
          ["ONYX_INDEX", "100", "Onyx Shards — premium currency"],
          ["OBOL_INDEX", "1015", "Obols"],
        ]}
      />

      <h2>Usage System Details</h2>

      <h3>Use on Own Kami</h3>
      <p>The full flow when using an item on your own Kami:</p>
      <ol>
        <li>Verify Kami is owned by you and in the same room</li>
        <li>Verify Kami cooldown has expired</li>
        <li>Verify item is for Kami targets and is enabled</li>
        <li>Check item usage requirements against the Kami</li>
        <li>Reset harvest-action bonuses (unless item has BYPASS_BONUS_RESET flag)</li>
        <li>Sync Kami state (apply pending health regen, etc.)</li>
        <li>Deduct 1 item from inventory</li>
        <li>Apply item allocations (stat changes, effects, etc.)</li>
        <li>Reset Kami intensity</li>
      </ol>

      <h3>Cast on Enemy Kami</h3>
      <ol>
        <li>Verify target is a Kami in the same room as you</li>
        <li>Verify item is for enemy Kami targets and is enabled</li>
        <li>Check item usage requirements against the target</li>
        <li>Sync your account and deplete <strong>10 stamina</strong></li>
        <li>Sync target Kami state</li>
        <li>Deduct 1 item from inventory</li>
        <li>Apply item effects to the target</li>
      </ol>

      <h3>Use on Account</h3>
      <p>
        Account-targeted items can be used in <strong>batches</strong> (unlike
        Kami-targeted items which are always 1 at a time). The effects are
        multiplied by the amount used.
      </p>

      <h3>Burning</h3>
      <p>
        Burning supports batch operations — you can burn multiple item types
        and amounts in a single transaction. Items with the{" "}
        <code>ITEM_UNBURNABLE</code> flag cannot be burned. Burning permanently
        removes items with no effects applied.
      </p>

      <h2>Transfer Fee</h2>
      <FormulaBlock label="Transfer Cost">
        {"Fee = 15 Musu per item type transferred\n\nExample: Transferring 50 Wooden Sticks and 30 Stones costs 30 Musu\n(2 item types x 15 Musu each)"}
      </FormulaBlock>
      <p>
        The fee is charged per distinct item type, not per unit. Transferring
        1,000 of a single item type costs the same 15 Musu as transferring 1.
      </p>

      <h2>Item Effect Types</h2>
      <p>When a consumable item is applied to a target, it can trigger:</p>
      <StatTable
        headers={["Effect", "Description"]}
        rows={[
          ["Stat effects", "Apply stat deltas (healing, buffing). Registry base -> target's permanent shift; registry sync -> target's sync."],
          ["XP effects", "Grant experience points to the target"],
          ["Move effects", "Teleport the target to a specific room"],
          ["Allocation effects", "Distribute items or resources per the item's rules"],
        ]}
      />

      <h2>Item Flags Reference</h2>
      <StatTable
        headers={["Flag", "Effect"]}
        rows={[
          ["ITEM_UNBURNABLE", "Cannot be burned"],
          ["NOT_TRADABLE", "Cannot be transferred between players"],
          ["BYPASS_BONUS_RESET", "Using this item does not reset harvest bonuses"],
        ]}
      />

      <h2>ERC-20 Backed Items</h2>
      <p>
        Items linked to ERC-20 tokens have special handling:
      </p>
      <ul>
        <li>Cannot be directly increased via normal inventory operations — must go through the Token Portal</li>
        <li>Can be transferred between accounts</li>
        <li>Cannot be removed from the registry while a token address is set</li>
        <li>Have a scale factor that converts between game units and token units</li>
      </ul>

      <h2>Inventory Details</h2>
      <p>
        Your inventory is a simple balance-per-item system. When your balance
        for an item reaches 0, the inventory entry is removed entirely to save
        storage. Inventory entries are created lazily — they only exist when you
        have a positive balance.
      </p>
    </>
  );
}
