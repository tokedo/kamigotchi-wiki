import { ArrowHead, FIG, Figure, S, T } from "./figure";

/**
 * Liquidations → Worked Example: Kill Threshold.
 *
 * Draws the page's own worked example: 30 Violence attacker, 20 Harmony /
 * 200 max HP victim, animosity ≈ 26.3%, threshold ≈ 79 HP with the type
 * advantage and ≈ 26 HP with the disadvantage. No other numbers appear.
 */
export function KillThresholdFigure() {
  const aAmber = "fig-kt-arrow-amber";

  // 200 max HP spans y 48 (full) to 298 (zero) — 1.25 units per HP.
  const y = (hp: number) => 298 - hp * 1.25;

  return (
    <Figure
      id="fig-kill-threshold"
      minWidth={600}
      viewBox="0 0 720 344"
      label="Diagram: a victim's 200 HP bar with the kill threshold drawn on it. Strain drains health downward over a sit; with the attacker's type advantage the victim becomes killable below about 79 HP, and with a type disadvantage only below about 26 HP."
      caption="The page's worked example drawn on the victim's health bar. The bar is the same victim and the same attacker in both cases — only the affinity matchup moves the line."
    >
      <defs>
        <ArrowHead id={aAmber} color={FIG.amber} />
      </defs>

      {/* The victim's HP bar */}
      <text
        x={245}
        y={36}
        textAnchor="middle"
        fontSize={T.body}
        fontWeight={600}
        fill={FIG.ink}
      >
        200 HP — full health
      </text>
      <rect
        x={190}
        y={48}
        width={110}
        height={250}
        fill={FIG.surface}
        stroke={FIG.line}
        strokeWidth={S.thin}
      />
      {/* Killable zones: below each line */}
      <rect x={190} y={y(79)} width={110} height={298 - y(79)} fill={FIG.redSoft} />
      <rect x={190} y={y(26)} width={110} height={298 - y(26)} fill={FIG.redSoft} />

      <text
        x={262}
        y={116}
        textAnchor="middle"
        fontSize={T.note}
        fill={FIG.muted}
      >
        out of reach
      </text>
      <text
        x={262}
        y={131}
        textAnchor="middle"
        fontSize={T.note}
        fill={FIG.muted}
      >
        at full health
      </text>

      {/* Strain drags HP down over the sit */}
      <path
        d="M 214 66 V 280"
        fill="none"
        stroke={FIG.amber}
        strokeWidth={S.thin}
        strokeDasharray="5 4"
        markerEnd={`url(#${aAmber})`}
      />
      <text
        transform="rotate(-90 172 173)"
        x={172}
        y={173}
        textAnchor="middle"
        fontSize={T.small}
        fill={FIG.amber}
      >
        strain drags HP down over the sit
      </text>
      <text x={182} y={302} textAnchor="end" fontSize={T.body} fill={FIG.muted}>
        0 HP
      </text>

      {/* The example's inputs */}
      <text x={438} y={62} fontSize={T.body} fill={FIG.ink}>
        Attacker: 30 Violence, EERIE hands
      </text>
      <text x={438} y={80} fontSize={T.body} fill={FIG.ink}>
        Victim: 20 Harmony, SCRAP body, 200 max HP
      </text>
      <text x={438} y={98} fontSize={T.note} fill={FIG.muted}>
        animosity ≈ 26.3% of max HP, no skill bonuses
      </text>

      {/* Threshold with the type advantage */}
      <line
        x1={190}
        y1={y(79)}
        x2={430}
        y2={y(79)}
        stroke={FIG.red}
        strokeWidth={S.bold}
      />
      <text
        x={438}
        y={y(79) - 4}
        fontSize={T.body}
        fontWeight={600}
        fill={FIG.red}
      >
        ≈ 79 HP — type advantage (1.5×)
      </text>
      <text x={438} y={y(79) + 13} fontSize={T.note} fill={FIG.muted}>
        everything below this line is killable
      </text>

      {/* Threshold with the type disadvantage */}
      <line
        x1={190}
        y1={y(26)}
        x2={430}
        y2={y(26)}
        stroke={FIG.red}
        strokeWidth={S.bold}
        strokeDasharray="6 4"
      />
      <text
        x={438}
        y={y(26) - 4}
        fontSize={T.body}
        fontWeight={600}
        fill={FIG.red}
      >
        ≈ 26 HP — type disadvantage (0.5×)
      </text>
      <text x={438} y={y(26) + 13} fontSize={T.note} fill={FIG.muted}>
        nearly starving before it is ever in danger
      </text>

      <text x={16} y={324} fontSize={T.small} fill={FIG.muted}>
        Flat threshold shifts from skills and gear move both lines. A large
        enough defensive shift
      </text>
      <text x={16} y={338} fontSize={T.small} fill={FIG.muted}>
        drops the threshold to zero, and then the kill can never land at all.
      </text>
    </Figure>
  );
}
