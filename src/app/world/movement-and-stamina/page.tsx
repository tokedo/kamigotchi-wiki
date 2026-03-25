import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

function Overview() {
  return (
    <>
      <h2>How Movement Works</h2>
      <p>
        Your account moves through the world one room at a time. Each move costs{" "}
        <strong>5 stamina</strong> and rewards you with{" "}
        <strong>5 account XP</strong>. You can only move to rooms that are
        directly next to you (up, down, left, right &mdash; no diagonals) or
        connected by a special exit like a door or portal.
      </p>

      <h3>Stamina at a Glance</h3>
      <StatTable
        headers={["Stat", "Value"]}
        rows={[
          ["Maximum stamina", "100"],
          ["Cost per move", "5 stamina"],
          ["Recovery rate", "1 point every 60 seconds"],
          ["Full recharge time", "100 minutes (1h 40m)"],
          ["XP per move", "5 account XP"],
        ]}
      />

      <p>
        With 100 stamina and 5 per move, you get <strong>20 moves</strong> on a
        full bar before needing to wait. Recovery happens passively in the
        background at 1 point per minute, so you regain a move every 5 minutes.
      </p>

      <InfoBox variant="tip">
        Stamina only matters for <em>movement</em>. Harvesting, crafting, and
        other actions do not cost stamina.
      </InfoBox>

      <h3>Movement Rules</h3>
      <ul>
        <li>
          <strong>Cardinal directions only</strong> &mdash; you can move north,
          south, east, or west on the tile grid. No diagonal movement.
        </li>
        <li>
          <strong>Same layer</strong> &mdash; adjacent movement only works on
          the same z-plane (layer). To change layers, use a special exit.
        </li>
        <li>
          <strong>Special exits</strong> &mdash; some rooms have portals, doors,
          or tunnels that let you jump to a non-adjacent room.
        </li>
        <li>
          <strong>Gates</strong> &mdash; some rooms require conditions to enter
          (quest completion, items, level, etc.).
        </li>
      </ul>

      <h3>Account XP</h3>
      <p>
        Every time you move, your <em>account</em> gains 5 XP. This is separate
        from Kami XP &mdash; account XP is earned by your account as a whole,
        not by any individual Kami. Currently there is no account level-up
        system; only Kamis level up.
      </p>

      <h3>Owner and Operator</h3>
      <p>
        Your account uses a two-address system. The <strong>owner</strong> is
        the wallet that created the account. The <strong>operator</strong> is a
        separate address that handles day-to-day gameplay actions. This lets you
        use session keys or delegated wallets without exposing your main wallet.
      </p>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Stamina Configuration</h2>
      <StatTable
        headers={["Parameter", "Config Key", "Value"]}
        rows={[
          ["Total stamina (base)", "ACCOUNT_STAMINA[0]", "100"],
          ["Recovery period", "ACCOUNT_STAMINA[1]", "60 seconds per point"],
          ["Movement cost", "ACCOUNT_STAMINA[2]", "5 stamina"],
          ["XP per move", "ACCOUNT_STAMINA[3]", "5 XP"],
        ]}
      />

      <InfoBox>
        In local/test environments, the recovery period is set to 1 second
        instead of 60 for faster testing. All values on this page are production
        values.
      </InfoBox>

      <h2>Recovery Formula</h2>
      <p>
        Stamina recovers passively over time. Recovery is calculated on-demand
        whenever the account is synced (typically when you perform an action):
      </p>

      <FormulaBlock label="Stamina Recovery">
        {`timePassed = now - lastActionTimestamp
recovery = floor(timePassed / recoveryPeriod)
currentStamina = min(sync + recovery, totalStamina)`}
      </FormulaBlock>

      <p>
        Recovery rounds <strong>down</strong>. If 90 seconds have passed, you
        recover 1 point (not 1.5). The fractional remainder is effectively
        lost &mdash; the <code>lastActionTimestamp</code> updates on sync.
      </p>

      <h2>Depletion</h2>
      <FormulaBlock label="Stamina Cost">
        {`newStamina = currentStamina - movementCost`}
      </FormulaBlock>
      <p>
        If the cost exceeds your current stamina, the move is rejected with an
        &ldquo;insufficient stamina&rdquo; error.
      </p>

      <h2>Movement System Flow</h2>
      <p>
        When you execute a move to a destination room, the following steps
        happen in order:
      </p>
      <StatTable
        headers={["Step", "Description"]}
        rows={[
          ["1. Reachability", "Destination must be adjacent or a special exit from your current room"],
          ["2. Accessibility", "Gate conditions on the destination room must be met"],
          ["3. Sync", "Recover stamina based on elapsed time since last action"],
          ["4. Move", "Deduct 5 stamina, update your room, grant 5 account XP"],
          ["5. Log", "Increment your MOVE counter and emit a move event"],
        ]}
      />

      <h2>Account Registration</h2>
      <p>When a new account is created, the following happens:</p>
      <StatTable
        headers={["Field", "Initial Value"]}
        rows={[
          ["Starting room", "Room 1 (Misty Riverside)"],
          ["Stamina", "Full (100)"],
          ["Name", "Must be 1-16 characters, globally unique"],
          ["Operator", "Set at registration, changeable by owner"],
        ]}
      />

      <InfoBox variant="warning">
        If the world is in private mode, your owner address must be whitelisted
        before you can register.
      </InfoBox>

      <h2>Account XP Sources</h2>
      <StatTable
        headers={["Source", "XP Amount"]}
        rows={[
          ["Movement", "5 XP per room move"],
          ["Crafting", "Defined per recipe (XP x amount crafted)"],
        ]}
      />
      <p>
        Account XP is stored on the account entity, not on any Kami. There is
        currently no account-level leveling &mdash; only Kamis have a leveling
        system.
      </p>

      <h2>Owner / Operator Model</h2>
      <StatTable
        headers={["Role", "Purpose"]}
        rows={[
          ["Owner", "The wallet that created the account. Used for high-security actions. Account ID is derived from this address."],
          ["Operator", "A separate address for day-to-day gameplay. Can be changed by the owner. Enables session keys and delegated wallets."],
        ]}
      />
    </>
  );
}

export default function MovementAndStaminaPage() {
  return (
    <MechanicPage
      title="Movement & Stamina"
      subtitle="100 max stamina, 5 per move, 1 point per minute recovery"
      overview={<Overview />}
      details={<Details />}
    />
  );
}
