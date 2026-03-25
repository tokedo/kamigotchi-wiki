import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function OnyxPage() {
  return (
    <MechanicPage
      title="Onyx & Token Portal"
      subtitle="Bridge ERC-20 tokens in and out of the game — with import/export taxes and a withdrawal delay"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>What Is the Token Portal?</h2>
      <p>
        The Token Portal is the bridge between Kamigotchi&apos;s in-game items
        and real ERC-20 tokens on the blockchain. It lets you:
      </p>
      <ul>
        <li>
          <strong>Deposit (Import)</strong> — send ERC-20 tokens into the game,
          converting them into in-game items
        </li>
        <li>
          <strong>Withdraw (Export)</strong> — convert in-game items back into
          ERC-20 tokens and send them to your wallet
        </li>
      </ul>

      <h2>Onyx Shards</h2>
      <p>
        The primary token-backed item is <strong>Onyx Shards</strong> — the
        premium currency. Onyx has a real ERC-20 token on-chain, and you can
        freely move it between the game and your wallet through the portal.
      </p>
      <p>
        Onyx is used to buy certain items from NPC merchants (like Wooden
        Sticks and Stones from Mina) and plays a role in various game systems.
      </p>

      <h2>Taxes</h2>
      <p>
        Both importing and exporting tokens through the portal incurs a tax:
      </p>
      <StatTable
        headers={["Direction", "Tax"]}
        rows={[
          ["Import (deposit)", "1 flat + 1% of the amount"],
          ["Export (withdrawal)", "1 flat + 1% of the amount"],
        ]}
      />
      <p>
        For example, if you deposit 100 Onyx, you pay 1 + 1 = 2 Onyx in tax
        and receive 98 Onyx in your game inventory.
      </p>

      <h2>Withdrawal Delay</h2>
      <p>
        When you withdraw tokens from the game, there is a{" "}
        <strong>1-day waiting period</strong> before you can claim them. This is
        a security measure. During this time, your items are already removed
        from your in-game inventory, but the ERC-20 tokens are not yet in your
        wallet.
      </p>
      <InfoBox variant="warning">
        Your items are removed immediately when you start a withdrawal, even
        though you cannot claim the tokens for 1 day. If you cancel during the
        waiting period, you get your items back but{" "}
        <strong>the tax is not refunded</strong>.
      </InfoBox>

      <h2>3-Step Withdrawal</h2>
      <ol>
        <li>
          <strong>Initiate</strong> — request the withdrawal. Items are removed
          from your inventory and tax is deducted.
        </li>
        <li>
          <strong>Wait</strong> — a 1-day delay must pass before you can claim.
        </li>
        <li>
          <strong>Claim</strong> — after the delay, claim your ERC-20 tokens to
          your wallet. Or <strong>cancel</strong> to get your items back (no tax
          refund).
        </li>
      </ol>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Tax Formula</h2>
      <FormulaBlock label="Portal Tax (Import & Export)">
        {"taxAmount = (itemAmount x taxRate) / 10000 + flatTax\n\nCurrent config:\n  flatTax  = 1\n  taxRate  = 100 (basis points = 1%)\n\nExample: 200 Onyx deposit\n  tax = (200 x 100) / 10000 + 1 = 2 + 1 = 3\n  received = 200 - 3 = 197 Onyx in-game"}
      </FormulaBlock>

      <h2>Deposit Flow (Technical)</h2>
      <ol>
        <li>Look up the token address and scale for the item</li>
        <li>Calculate import tax</li>
        <li>Transfer ERC-20 tokens from your wallet to the game&apos;s token custody contract</li>
        <li>Increase your inventory by (itemAmount - taxAmount)</li>
        <li>Send tax amount to the reserve account</li>
      </ol>

      <h2>Withdrawal Flow (Technical)</h2>
      <h3>Step 1: Initiate</h3>
      <ol>
        <li>Calculate export tax</li>
        <li>Calculate token amount after tax and scaling</li>
        <li>Calculate delay end time: current time + 86,400 seconds (1 day)</li>
        <li>Create a Receipt entity (pending withdrawal)</li>
        <li>Immediately remove items from your inventory</li>
        <li>Send tax to reserve account</li>
      </ol>

      <h3>Step 2: Claim</h3>
      <ol>
        <li>Verify you own the receipt</li>
        <li>Verify the receipt is not paused or disabled</li>
        <li>Verify the delay has elapsed</li>
        <li>Transfer ERC-20 tokens from the custody contract to your wallet</li>
        <li>Remove the receipt entity</li>
      </ol>

      <h3>Cancel (Optional)</h3>
      <ol>
        <li>Verify you own the receipt and it is not paused</li>
        <li>Return items to your inventory (no tax refund)</li>
        <li>Remove the receipt entity</li>
      </ol>

      <h2>Registered Tokens</h2>
      <StatTable
        headers={["Token", "Item Index", "Scale", "Status"]}
        rows={[
          ["Onyx Shards (ONYX)", "100", "2 (multiply by 10^2)", "In Game"],
          ["ETH", "103", "5 (multiply by 10^5)", "Test"],
        ]}
      />

      <h2>Token Scale</h2>
      <p>
        Each portal item has a scale that converts between game item units and
        ERC-20 token units:
      </p>
      <FormulaBlock label="Token Scale Conversion">
        {"Deposit:    tokenUnits = itemUnits x 10^scale\nWithdrawal: gameUnits  = tokenUnits / 10^scale\n\nScale range: 0 to 18"}
      </FormulaBlock>

      <h2>Configuration</h2>
      <StatTable
        headers={["Config Key", "Value", "Description"]}
        rows={[
          ["PORTAL_TOKEN_EXPORT_DELAY", "86,400 seconds (1 day)", "Timelock before withdrawal can be claimed"],
          ["PORTAL_ITEM_EXPORT_TAX", "[1, 100]", "Export tax: 1 flat + 100 basis points (1%)"],
          ["PORTAL_ITEM_IMPORT_TAX", "[1, 100]", "Import tax: 1 flat + 100 basis points (1%)"],
        ]}
      />

      <h2>Admin Controls</h2>
      <p>
        Admins have emergency controls over pending withdrawals:
      </p>
      <StatTable
        headers={["Action", "Description"]}
        rows={[
          ["Pause", "Disable a pending withdrawal (prevents claim)"],
          ["Unpause", "Re-enable a paused withdrawal"],
          ["Admin Cancel", "Force-cancel a withdrawal, returning items to the player"],
        ]}
      />
      <InfoBox variant="info">
        These admin controls exist as a security measure. Under normal
        circumstances, your withdrawals will proceed automatically after the
        1-day delay.
      </InfoBox>
    </>
  );
}
