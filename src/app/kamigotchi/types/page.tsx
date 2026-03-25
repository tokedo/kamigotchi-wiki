import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";

export default function AffinityTypesPage() {
  return (
    <MechanicPage
      title="Affinity Types"
      subtitle="How your Kami's elemental affinities affect combat and harvesting"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>The Four Affinities</h2>
      <p>
        Every Kami has two elemental affinities derived from its traits. These
        affinities follow a <strong>rock-paper-scissors</strong> system that
        affects both combat and harvesting. There are four affinity types:
      </p>
      <StatTable
        headers={["Affinity", "Strong Against", "Weak Against"]}
        rows={[
          ["Eerie", "Scrap", "Insect"],
          ["Scrap", "Insect", "Eerie"],
          ["Insect", "Eerie", "Scrap"],
          ["Normal", "None", "None"],
        ]}
      />
      <p>
        <strong>Normal</strong> is neutral against all other types. When two
        Normal-type Kamis face each other, a special interaction occurs.
      </p>

      <h2>Body and Hand Affinity</h2>
      <p>
        Your Kami gets its affinities from two of its five traits:
      </p>
      <ul>
        <li>
          <strong>Body trait</strong> determines your <strong>body affinity</strong> — this has the
          bigger impact on effectiveness
        </li>
        <li>
          <strong>Hand trait</strong> determines your <strong>hand affinity</strong> — a smaller but
          still meaningful bonus
        </li>
      </ul>

      <InfoBox variant="tip">
        Body affinity has roughly twice the impact of hand affinity. When
        choosing which nodes to harvest, pay more attention to matching your
        body affinity.
      </InfoBox>

      <h2>Pure vs Mixed Breed</h2>
      <p>
        If your Kami&apos;s body and hand affinity are the <strong>same type</strong>,
        your Kami is classified as <strong>Pure breed</strong>. If they differ,
        it&apos;s a <strong>Mixed breed</strong>. This classification appears in
        your Kami&apos;s NFT metadata.
      </p>
      <ul>
        <li>
          <strong>Pure</strong> — Both affinities match (e.g., Eerie body + Eerie
          hand). You get maximum bonuses against one type but take full penalties
          against another.
        </li>
        <li>
          <strong>Mixed</strong> — Affinities differ (e.g., Scrap body + Insect
          hand). More versatile, covering two type advantages at partial
          strength.
        </li>
      </ul>

      <h2>How Affinity Affects Harvesting</h2>
      <p>
        Every harvest node in the world has its own affinity. When your Kami
        harvests at a node:
      </p>
      <ul>
        <li>
          <strong>Matching affinity</strong> (body or hand matches node) — you get
          a <strong>bonus</strong> to harvest yield
        </li>
        <li>
          <strong>Different non-Normal affinities</strong> — you get a{" "}
          <strong>penalty</strong> to harvest yield
        </li>
        <li>
          <strong>Either is Normal or empty</strong> — neutral, no bonus or penalty
        </li>
      </ul>

      <h2>How Affinity Affects Combat</h2>
      <p>
        When your Kami attacks another Kami, your affinity is compared to the
        defender&apos;s:
      </p>
      <ul>
        <li>
          <strong>Strong matchup</strong> — Your damage is boosted
        </li>
        <li>
          <strong>Weak matchup</strong> — Your damage is reduced
        </li>
        <li>
          <strong>Neutral</strong> — No affinity modifier
        </li>
      </ul>

      <InfoBox variant="info">
        Compound nodes (nodes with an affinity type) provide a meaningful
        advantage to matching Kamis. Planning your harvest routes around your
        Kami&apos;s affinities can significantly increase resource income.
      </InfoBox>
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Effectiveness Levels</h2>
      <p>
        The affinity system defines four effectiveness levels:
      </p>
      <StatTable
        headers={["Level", "When It Applies"]}
        rows={[
          ["Strong", "Attacker has type advantage (e.g., Eerie vs Scrap)"],
          ["Neutral", "No type advantage or disadvantage"],
          ["Weak", "Attacker has type disadvantage (e.g., Eerie vs Insect)"],
          ["Special", "Normal vs Normal interaction"],
        ]}
      />

      <h2>Harvest Effectiveness Config</h2>
      <p>
        Affinities apply separate shifts for body and hand. Body affinity has a
        stronger effect than hand affinity:
      </p>
      <StatTable
        headers={["Affinity Source", "Config Key", "Strong", "Weak"]}
        rows={[
          ["Body", "KAMI_HARV_EFFICACY_BODY", "+650", "-250"],
          ["Hand", "KAMI_HARV_EFFICACY_HAND", "+350", "-100"],
        ]}
      />
      <FormulaBlock label="Total Harvest Efficacy">
        {"Efficacy = baseBoost + bodyShift + handShift\n\nbodyShift:\n  Same affinity as node → +650\n  Different non-Normal   → -250\n  Normal or empty        →    0\n\nhandShift:\n  Same affinity as node → +350\n  Different non-Normal   → -100\n  Normal or empty        →    0"}
      </FormulaBlock>

      <InfoBox variant="tip">
        A Pure-breed Kami harvesting at a matching node gets
        +650 (body) +350 (hand) = <strong>+1000</strong> total efficacy bonus
        (per-mille). That is effectively double yield. A mismatched Pure-breed
        gets -250 -100 = <strong>-350</strong>.
      </InfoBox>

      <h2>Combat Effectiveness Lookup</h2>
      <FormulaBlock label="Attack Effectiveness Matrix">
        {"Attacker → Defender:\n  EERIE  → SCRAP   = Strong\n  EERIE  → INSECT  = Weak\n  SCRAP  → INSECT  = Strong\n  SCRAP  → EERIE   = Weak\n  INSECT → EERIE   = Strong\n  INSECT → SCRAP   = Weak\n  NORMAL → NORMAL  = Special\n  All other combos  = Neutral"}
      </FormulaBlock>

      <h2>Harvest Effectiveness Lookup</h2>
      <FormulaBlock label="Kami Affinity vs Node Affinity">
        {"Same affinity         → Strong (bonus yield)\nDifferent non-Normal  → Weak (penalty)\nEither is Normal/empty → Neutral"}
      </FormulaBlock>

      <h2>Affinity Config Format</h2>
      <p>
        Each affinity config is an array: <code>[precision, base, up, down, special]</code>
      </p>
      <StatTable
        headers={["Config Key", "Values", "Meaning"]}
        rows={[
          [
            "KAMI_HARV_EFFICACY_BODY",
            "[3, 0, 650, 250, 0]",
            "Precision 3 (per-mille), base 0, strong +650, weak -250, special 0",
          ],
          [
            "KAMI_HARV_EFFICACY_HAND",
            "[3, 0, 350, 100, 0]",
            "Precision 3 (per-mille), base 0, strong +350, weak -100, special 0",
          ],
        ]}
      />

      <InfoBox variant="info">
        The &quot;down&quot; value is stored as a positive number in config but
        is <strong>negated</strong> in code when applied. So
        a &quot;down&quot; of 250 becomes -250 shift.
      </InfoBox>

      <FormulaBlock label="Final Shift Calculation">
        {"shift = configShift[effectiveness] + bonusShift[effectiveness]\n\nThe bonus shift comes from skills or temporary effects\nthat modify affinity effectiveness."}
      </FormulaBlock>
    </>
  );
}
