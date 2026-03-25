import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function NamingAndSendingPage() {
  return (
    <MechanicPage
      title="Naming & Sending"
      subtitle="Give your Kami a unique name and transfer Kamis to other players"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>Naming Your Kami</h2>
      <p>
        Every Kami starts with a default sequential name like
        &quot;Kamigotchi 42&quot;. You can give your Kami a personal name by
        visiting <strong>Room 11</strong> and spending <strong>1 Holy Dust</strong>.
      </p>

      <h3>First Naming (Free)</h3>
      <ul>
        <li>
          <strong>Cost:</strong> 1 Holy Dust
        </li>
        <li>
          <strong>Location:</strong> Room 11
        </li>
        <li>
          <strong>Limit:</strong> 1-16 characters
        </li>
        <li>
          <strong>Uniqueness:</strong> Names must be globally unique — no two
          Kamis can share the same name
        </li>
      </ul>

      <InfoBox variant="tip">
        Choose wisely! Your Kami&apos;s name will be visible to all other
        players and appears in your NFT metadata. Names are case-sensitive and
        limited to 16 characters.
      </InfoBox>

      <h3>Renaming</h3>
      <p>
        Want to change your Kami&apos;s name after the initial naming? Renaming
        costs <strong>5,000 Onyx Shards</strong> and also requires visiting
        Room 11. The same rules apply: 1-16 characters, globally unique.
      </p>

      <InfoBox variant="warning">
        Renaming is currently <strong>disabled</strong>. The system reverts with
        &quot;Onyx Features are temporarily disabled.&quot; This may be enabled
        in a future update.
      </InfoBox>

      <hr className="my-8" />

      <h2>Sending Kamis</h2>
      <p>
        The <strong>Kami Send</strong> system lets you transfer your in-game
        (staked) Kamis directly to another player without needing to unstake
        first. This bypasses the marketplace entirely.
      </p>

      <h3>How It Works</h3>
      <ul>
        <li>
          Select one or more Kamis to send (supports <strong>batch
          transfers</strong>)
        </li>
        <li>
          Enter the recipient&apos;s address
        </li>
        <li>
          Your Kami is immediately transferred to the recipient&apos;s account
        </li>
        <li>
          A <strong>1-hour cooldown</strong> is applied to the transferred Kami,
          preventing immediate re-listing or other actions
        </li>
      </ul>

      <h3>Requirements</h3>
      <ul>
        <li>
          The Kami must be in <strong>Resting</strong> or <strong>Listed</strong>{" "}
          state
        </li>
        <li>You cannot send a Kami to yourself</li>
        <li>
          If the Kami is currently listed on the marketplace, the listing is
          automatically cancelled before transfer
        </li>
      </ul>

      <InfoBox variant="info">
        Sending is free — there is no Musu, Onyx, or Obol cost. The only
        restriction is the 1-hour cooldown applied to the Kami after transfer.
      </InfoBox>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Naming System Details</h2>

      <h3>First Naming (KamiNameSystem)</h3>
      <StatTable
        headers={["Requirement", "Value"]}
        rows={[
          ["Location", "Room index 11"],
          ["Cost", "1 Holy Dust (item index 11011)"],
          ["Name length", "1-16 characters"],
          ["Uniqueness", "Name must not be taken by any other Kami"],
        ]}
      />

      <p>Process:</p>
      <ol>
        <li>Verify caller owns the Kami</li>
        <li>Verify Kami is in Room 11</li>
        <li>Verify account has at least 1 Holy Dust</li>
        <li>Validate name: not empty, max 16 characters, not already taken</li>
        <li>Consume 1 Holy Dust</li>
        <li>Set the Kami&apos;s name</li>
      </ol>

      <h3>Renaming (KamiOnyxRenameSystem)</h3>
      <StatTable
        headers={["Requirement", "Value"]}
        rows={[
          ["Location", "Room index 11"],
          ["Cost", "5,000 Onyx Shards (item index 100)"],
          ["Name length", "1-16 characters"],
          ["Uniqueness", "Name must not be taken by any other Kami"],
          ["Status", "Currently disabled"],
        ]}
      />

      <p>Process (when enabled):</p>
      <ol>
        <li>Verify caller owns the Kami</li>
        <li>Verify Kami is in Room 11</li>
        <li>Validate name: not empty, max 16 characters, not already taken</li>
        <li>Spend 5,000 Onyx Shards</li>
        <li>Set the new name</li>
      </ol>

      <h3>Name Validation Rules</h3>
      <FormulaBlock label="Validation (both systems)">
        {"bytes(name).length > 0       // not empty\nbytes(name).length <= 16     // max 16 characters\nLibKami.getByName(name) == 0 // globally unique"}
      </FormulaBlock>

      <h3>Nameable Flag</h3>
      <p>
        Each Kami has a <code>NOT_NAMEABLE</code> flag (inverse for gas
        optimization). New Kamis default to nameable (flag = false). After
        first naming, the flag is set to true.
      </p>
      <StatTable
        headers={["Function", "Description"]}
        rows={[
          ["useNameable(id)", "Checks flag and sets to true — consumes the one-time naming opportunity"],
          ["setNameable(id, bool)", "Directly sets whether a Kami can be named"],
        ]}
      />

      <hr className="my-8" />

      <h2>Send System Details</h2>

      <h3>KamiSendSystem.execute(kamiIndices[], toAddress)</h3>
      <ol>
        <li>Verify sender has an account</li>
        <li>Resolve target account from toAddress</li>
        <li>Verify sender is not sending to themselves</li>
        <li>
          For each Kami:
          <ol>
            <li>Verify Kami is owned by sender and in RESTING or LISTED state</li>
            <li>If LISTED, cancel all marketplace listings</li>
            <li>Reassign ownership to target account</li>
            <li>Set state to RESTING</li>
            <li>Apply purchase cooldown (1 hour)</li>
            <li>Log KAMI_SEND and emit event</li>
          </ol>
        </li>
      </ol>

      <h3>Cooldown</h3>
      <FormulaBlock label="Transfer Cooldown">
        {"cooldown = KAMI_MARKET_PURCHASE_COOLDOWN\n         = 3600 seconds (1 hour)\n\nSame cooldown used by marketplace purchases.\nPrevents immediate re-listing or other actions."}
      </FormulaBlock>

      <h2>Tracking</h2>
      <StatTable
        headers={["Data Key", "Description"]}
        rows={[
          ["KAMI_NAME", "Counter incremented per account on naming"],
          ["KAMI_SEND", "Counter incremented per account on send"],
        ]}
      />
    </>
  );
}
