import { ArrowHead, FIG, Figure, S, T } from "./figure";

/**
 * Liquidations → What Decides the Kill Threshold?
 *
 * The page makes the contrast in words twice ("combat uses a
 * rock-paper-scissors triangle, unlike harvesting's match-the-node rule";
 * "a single check — attacker's hand vs victim's body — unlike harvesting,
 * which checks body and hand separately against the node"). The figure draws
 * exactly that contrast and carries only the combat multipliers the page
 * tabulates.
 */
export function AffinitySystemsFigure() {
  const aLine = "fig-af-arrow";
  const aRed = "fig-af-arrow-red";

  const node = (cx: number, cy: number, label: string) => (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={30}
        fill={FIG.blueSoft}
        stroke={FIG.blue}
        strokeWidth={S.thin}
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize={T.note}
        fontWeight={600}
        fill={FIG.ink}
      >
        {label}
      </text>
    </g>
  );

  return (
    <Figure
      id="fig-affinity-systems"
      minWidth={620}
      viewBox="0 0 720 318"
      label="Diagram: harvesting checks a Kami's body and hand affinities against the node's affinity, while combat makes one check — the attacker's hand against the victim's body — on a rock-paper-scissors triangle where EERIE beats SCRAP, SCRAP beats INSECT and INSECT beats EERIE."
      caption="Two systems, two different rules. Harvesting checks body and hand separately against the node it is standing on; combat makes one check, on a triangle, and the direction matters."
    >
      <defs>
        <ArrowHead id={aLine} color={FIG.line} />
        <ArrowHead id={aRed} color={FIG.red} />
      </defs>

      <line
        x1={360}
        y1={22}
        x2={360}
        y2={296}
        stroke={FIG.hairline}
        strokeWidth={S.hair}
      />

      {/* ── Harvesting: match the node ── */}
      <text x={20} y={32} fontSize={T.title} fontWeight={600} fill={FIG.ink}>
        Harvesting — match the node
      </text>
      <text x={20} y={50} fontSize={T.note} fill={FIG.muted}>
        two checks, against the ground you stand on
      </text>

      <circle
        cx={180}
        cy={100}
        r={36}
        fill={FIG.blueSoft}
        stroke={FIG.blue}
        strokeWidth={S.thin}
      />
      <text
        x={180}
        y={97}
        textAnchor="middle"
        fontSize={T.body}
        fontWeight={600}
        fill={FIG.ink}
      >
        the node
      </text>
      <text
        x={180}
        y={112}
        textAnchor="middle"
        fontSize={T.small}
        fill={FIG.muted}
      >
        affinity
      </text>

      <path
        d="M 130 208 L 154 140"
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${aLine})`}
      />
      <path
        d="M 230 208 L 206 140"
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${aLine})`}
      />
      <text x={116} y={168} textAnchor="end" fontSize={T.body} fill={FIG.ink}>
        body
      </text>
      <text x={244} y={168} fontSize={T.body} fill={FIG.ink}>
        hand
      </text>

      <rect
        x={108}
        y={212}
        width={144}
        height={38}
        rx={19}
        fill={FIG.surface}
        stroke={FIG.line}
        strokeWidth={S.thin}
      />
      <text
        x={180}
        y={236}
        textAnchor="middle"
        fontSize={T.body}
        fontWeight={600}
        fill={FIG.ink}
      >
        your Kami
      </text>
      <text
        x={180}
        y={280}
        textAnchor="middle"
        fontSize={T.note}
        fill={FIG.muted}
      >
        match → bonus · clash → penalty
      </text>

      {/* ── Combat: the triangle ── */}
      <text x={382} y={32} fontSize={T.title} fontWeight={600} fill={FIG.ink}>
        Combat — the triangle
      </text>
      <text x={382} y={50} fontSize={T.note} fill={FIG.muted}>
        one check: your hand against their body
      </text>

      {node(540, 96, "EERIE")}
      {node(632, 214, "SCRAP")}
      {node(448, 214, "INSECT")}

      <path
        d="M 562 118 L 612 182"
        fill="none"
        stroke={FIG.red}
        strokeWidth={S.thin}
        markerEnd={`url(#${aRed})`}
      />
      <path
        d="M 600 226 L 486 226"
        fill="none"
        stroke={FIG.red}
        strokeWidth={S.thin}
        markerEnd={`url(#${aRed})`}
      />
      <path
        d="M 468 182 L 518 118"
        fill="none"
        stroke={FIG.red}
        strokeWidth={S.thin}
        markerEnd={`url(#${aRed})`}
      />
      <text
        x={540}
        y={264}
        textAnchor="middle"
        fontSize={T.note}
        fill={FIG.muted}
      >
        each arrow: this hand beats that body
      </text>
      <text
        x={540}
        y={284}
        textAnchor="middle"
        fontSize={T.body}
        fill={FIG.ink}
      >
        advantage <tspan fill={FIG.red}>1.5×</tspan> · disadvantage{" "}
        <tspan fill={FIG.muted}>0.5×</tspan>
      </text>
      <text
        x={540}
        y={302}
        textAnchor="middle"
        fontSize={T.small}
        fill={FIG.muted}
      >
        NORMAL hands vs NORMAL body 1.2×, anything else 1.0×
      </text>
    </Figure>
  );
}
