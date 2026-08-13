import { ArrowHead, Box, FIG, Figure, S, T } from "./figure";

/**
 * Harvesting → Two Engines of Income.
 *
 * Restates only what that section and the strain/starve-cutoff sections of
 * the same page already say: two rates add, a boost multiplies them, the
 * accrued pile is capped by what current HP can pay for in strain, and
 * collecting spends that HP.
 */
export function HarvestEnginesFigure() {
  const a = "fig-he-arrow";
  const aAmber = "fig-he-arrow-amber";
  const aMuted = "fig-he-arrow-muted";

  return (
    <Figure
      id="fig-harvest-engines"
      minWidth={640}
      viewBox="0 0 760 344"
      label="Diagram: Fertility and Intensity add together, are multiplied by the bounty boost, and fill an accrued bounty that is capped by a Max Musu ceiling set by current HP; collecting spends HP as strain."
      caption="Two engines add, one boost multiplies, and the pile they fill is capped by what the Kami's health can pay for in strain."
    >
      <defs>
        <ArrowHead id={a} color={FIG.line} />
        <ArrowHead id={aAmber} color={FIG.amber} />
        <ArrowHead id={aMuted} color={FIG.hairline} />
      </defs>

      {/* The two engines */}
      <Box
        x={16}
        y={40}
        w={232}
        h={86}
        accent={FIG.blue}
        fill={FIG.blueSoft}
        title="Fertility"
        titleColor={FIG.blue}
        lines={["Power × affinity match", "steady — the same every second"]}
      />
      <Box
        x={16}
        y={156}
        w={232}
        h={104}
        accent={FIG.violet}
        fill={FIG.violetSoft}
        title="Intensity"
        titleColor={FIG.violet}
        lines={[
          "Violence + minutes on the node",
          "ramps while the sit is untouched",
          "intensity skills scale it 5× or more",
        ]}
      />

      {/* Both feed the same junction */}
      <path
        d="M 248 83 H 300 V 137"
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${a})`}
      />
      <path
        d="M 248 208 H 300 V 179"
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${a})`}
      />
      <circle
        cx={300}
        cy={158}
        r={17}
        fill={FIG.surface}
        stroke={FIG.line}
        strokeWidth={S.thin}
      />
      <text
        x={300}
        y={164}
        textAnchor="middle"
        fontSize={17}
        fontWeight={600}
        fill={FIG.ink}
      >
        +
      </text>

      {/* Bounty boost */}
      <path
        d="M 317 158 H 338"
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${a})`}
      />
      <rect
        x={344}
        y={132}
        width={158}
        height={52}
        rx={26}
        fill={FIG.amberSoft}
        stroke={FIG.amber}
        strokeWidth={S.thin}
      />
      <text
        x={423}
        y={154}
        textAnchor="middle"
        fontSize={T.title}
        fontWeight={600}
        fill={FIG.amber}
      >
        × Bounty Boost
      </text>
      <text
        x={423}
        y={171}
        textAnchor="middle"
        fontSize={T.note}
        fill={FIG.muted}
      >
        food adds +25%
      </text>
      <path
        d="M 502 158 H 528"
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${a})`}
      />

      {/* The tank: accrued bounty under its HP-derived ceiling */}
      <text x={536} y={40} fontSize={T.body} fontWeight={600} fill={FIG.ink}>
        Max Musu ceiling
      </text>
      <text x={536} y={56} fontSize={T.note} fill={FIG.muted}>
        set by current HP and Harmony
      </text>
      <line
        x1={526}
        y1={70}
        x2={718}
        y2={70}
        stroke={FIG.ink}
        strokeWidth={S.thin}
        strokeDasharray="5 4"
      />
      <rect
        x={536}
        y={70}
        width={172}
        height={150}
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
      />
      <rect x={536} y={152} width={172} height={68} fill={FIG.greenSoft} />
      <line
        x1={536}
        y1={152}
        x2={708}
        y2={152}
        stroke={FIG.green}
        strokeWidth={S.thin}
      />
      <text
        x={622}
        y={106}
        textAnchor="middle"
        fontSize={T.note}
        fill={FIG.muted}
      >
        headroom — and at the
      </text>
      <text
        x={622}
        y={121}
        textAnchor="middle"
        fontSize={T.note}
        fill={FIG.amber}
      >
        ceiling, earning stops
      </text>
      <text
        x={622}
        y={186}
        textAnchor="middle"
        fontSize={T.body}
        fontWeight={600}
        fill={FIG.green}
      >
        accrued bounty
      </text>
      {/* Strain: collecting spends HP */}
      <path
        d="M 566 220 V 262"
        fill="none"
        stroke={FIG.amber}
        strokeWidth={S.thin}
        markerEnd={`url(#${aAmber})`}
      />
      <text x={558} y={246} textAnchor="end" fontSize={T.note} fill={FIG.amber}>
        strain
      </text>
      <rect
        x={536}
        y={268}
        width={172}
        height={26}
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
      />
      <rect x={536} y={268} width={104} height={26} fill={FIG.amberSoft} />
      <text
        x={588}
        y={285}
        textAnchor="middle"
        fontSize={T.body}
        fontWeight={600}
        fill={FIG.ink}
      >
        HP
      </text>

      {/* ...and HP is what sets the ceiling */}
      <path
        d="M 712 281 H 730 V 70 H 722"
        fill="none"
        stroke={FIG.hairline}
        strokeWidth={S.hair}
        strokeDasharray="4 4"
        markerEnd={`url(#${aMuted})`}
      />
      <text
        transform="rotate(-90 748 176)"
        x={748}
        y={176}
        textAnchor="middle"
        fontSize={T.small}
        fill={FIG.muted}
      >
        HP sets the ceiling
      </text>

      {/* Footnotes */}
      <text x={16} y={290} fontSize={T.body} fill={FIG.muted}>
        Every Musu earned costs HP through strain — Harmony
      </text>
      <text x={16} y={307} fontSize={T.body} fill={FIG.muted}>
        softens the rate. Falling HP lowers the ceiling with it.
      </text>
      <text x={16} y={330} fontSize={T.small} fill={FIG.muted}>
        Feeding the Kami resets the intensity ramp; collecting does not.
      </text>
    </Figure>
  );
}
