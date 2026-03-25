import {
  MechanicPage,
  InfoBox,
  StatTable,
} from "@/components/mechanic-page";

function Overview() {
  return (
    <>
      <h2>Welcome to the World of Kamigotchi</h2>
      <p>
        The game world is made up of <strong>70 rooms</strong> spread across four
        layers (called <strong>z-planes</strong>). Think of each layer as a
        different floor of the world: the surface, building interiors,
        underground caves, and a mysterious castle area.
      </p>

      <p>
        You move your account from room to room on a tile grid. Movement is
        cardinal only (up, down, left, right) &mdash; no diagonals. Each move
        costs <strong>5 stamina</strong> and earns you{" "}
        <strong>5 account XP</strong>.
      </p>

      <h3>The Four Layers</h3>
      <StatTable
        headers={["Layer", "Name", "Examples"]}
        rows={[
          ["z = 1", "Overworld", "Misty Riverside, Torii Gate, Scrapyard, Forest paths"],
          ["z = 2", "Interiors", "Convenience Store, Burning Room, Plane Interior"],
          ["z = 3", "Underground", "Temple Cave, Cave Crossroads, Fungus Garden, Sacrarium"],
          ["z = 4", "Castle", "Treasure Hoard, special areas"],
        ]}
      />

      <p>
        Rooms on the <em>same</em> layer that are next to each other are always
        connected. To travel between layers, you need a{" "}
        <strong>special exit</strong> &mdash; like a door, staircase, or portal
        that links two rooms that aren&apos;t physically adjacent.
      </p>

      <h3>Harvest Nodes</h3>
      <p>
        Many rooms contain a <strong>harvest node</strong> &mdash; a resource
        spot where your Kami can farm Musu. Each node has an{" "}
        <strong>affinity type</strong> (Normal, Eerie, Scrap, or Insect) that
        determines how effectively different Kamis can harvest there. Some nodes
        have compound affinities like Eerie + Scrap.
      </p>

      <InfoBox variant="tip">
        Match your Kami&apos;s body and hand affinities to the node&apos;s
        affinity for up to <strong>2x harvest output</strong>. A mismatch
        drops you to 0.65x. See the{" "}
        <a href="/harvesting">Harvesting page</a> for the full efficacy formula.
      </InfoBox>

      <h3>Key Locations</h3>
      <StatTable
        headers={["Room", "What's There"]}
        rows={[
          ["Misty Riverside (Room 1)", "Starting room for all new accounts"],
          ["Temple by the Waterfall (Room 11)", "Where you name your first Kami"],
          ["Marketplace (Room 66)", "The Trade Room — delivery fee is waived here"],
          ["Treasure Hoard (Room 88)", "Special end-game area in the Castle layer"],
        ]}
      />

      <h3>Gates</h3>
      <p>
        Some rooms have <strong>gates</strong> &mdash; requirements you must meet
        before entering. A gate might require a certain quest completed, a
        minimum level, or a specific item. Gates can apply to everyone entering
        the room, or only when coming from a specific direction.
      </p>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Room Data Structure</h2>
      <p>
        Each room is identified by a unique index and has a 3D coordinate
        (x, y, z) that determines its position on the world grid.
      </p>

      <StatTable
        headers={["Field", "Description"]}
        rows={[
          ["Index", "Unique room number (uint32)"],
          ["Location (x, y, z)", "Grid position. z determines the layer."],
          ["Name", "Display name shown in-game"],
          ["Description", "Flavor text for the room"],
          ["Exits", "Optional list of special exit room indices"],
          ["Gates", "Optional conditional access requirements"],
        ]}
      />

      <h2>Adjacency Rules</h2>
      <p>
        Two rooms are adjacent if they share the same z-plane and differ by
        exactly 1 in either x or y (but not both):
      </p>
      <StatTable
        headers={["Condition", "Rule"]}
        rows={[
          ["Same layer", "Both rooms must have the same z value"],
          ["Cardinal only", "Differ by exactly 1 in x OR y (not both, so no diagonals)"],
          ["Special exits", "Rooms can also define non-adjacent exits (portals, doors, tunnels)"],
        ]}
      />

      <h2>Z-Plane Distribution</h2>
      <StatTable
        headers={["Z-Plane", "Type", "Description"]}
        rows={[
          ["z = 1", "Overworld", "Forests, scrapyard, paths, main exploration area"],
          ["z = 2", "Interiors", "Convenience Store, Burning Room, Plane Interior"],
          ["z = 3", "Underground", "Cave network beneath the waterfall temple"],
          ["z = 4", "Castle / Special", "Treasure Hoard and other special areas"],
        ]}
      />

      <InfoBox>
        Rooms on different z-planes are <strong>never</strong> adjacent. They can
        only be connected via special exits. This means you need to find the
        right doorway or portal to change layers.
      </InfoBox>

      <h2>Gate System</h2>
      <p>
        Gates are conditional requirements stored on destination rooms. There
        are two types:
      </p>
      <StatTable
        headers={["Gate Type", "Behavior"]}
        rows={[
          ["Generic", "Applies to all incoming movement regardless of origin"],
          ["Source-specific", "Only applies when entering from a specific room"],
        ]}
      />
      <p>
        When you try to move, the game combines all applicable generic gates and
        any source-specific gate for your current room, then checks whether your
        account meets all conditions.
      </p>

      <h2>Room Sharing</h2>
      <p>
        Many game systems require two entities to be in the same room. For
        example, you must be in an NPC&apos;s room to use their shop, and a
        liquidation attacker must be in the same room as the harvest node
        they&apos;re targeting.
      </p>

      <h2>Harvest Nodes</h2>
      <p>
        Each node belongs to exactly one room and is the primary type
        &ldquo;HARVEST&rdquo;. Nodes can have:
      </p>
      <StatTable
        headers={["Property", "Description"]}
        rows={[
          ["Affinity", "NORMAL, EERIE, SCRAP, INSECT, or compound (e.g. EERIE + SCRAP)"],
          ["Level Limit", "Maximum Kami level allowed (0 = no limit)"],
          ["Yield Item", "The item produced (usually MUSU)"],
          ["Scavenge Cost", "Points needed per scavenge tier (100 to 500)"],
          ["Droptable", "Items available from scavenge rewards"],
          ["Bonuses", "Temporary buffs applied while harvesting at this node"],
          ["Requirements", "Conditions to start harvesting (e.g. level cap)"],
        ]}
      />

      <h2>Affinity Distribution</h2>
      <StatTable
        headers={["Affinity", "Approximate Count", "Example Nodes"]}
        rows={[
          ["Normal", "~20", "Tunnel of Trees, Torii Gate, Road To Labs"],
          ["Eerie", "~15", "Misty Riverside, Labs Entrance, Blooming Tree"],
          ["Insect", "~12", "Forest: Insect Node, Cave Crossroads, Centipedes"],
          ["Scrap", "~11", "Scrap Confluence, Scrapyard Entrance, Deeper Into Scrap"],
          ["Compound", "~5", "Techno Temple (Eerie+Scrap), Hatch to Nowhere (Insect+Scrap)"],
        ]}
      />
    </>
  );
}

export default function WorldPage() {
  return (
    <MechanicPage
      title="The World"
      subtitle="70 rooms across 4 layers, connected by tile-based movement and special exits"
      overview={<Overview />}
      details={<Details />}
    />
  );
}
