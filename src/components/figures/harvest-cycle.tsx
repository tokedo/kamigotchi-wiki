import { ArrowHead, Box, FIG, Figure, S, T } from "./figure";

/**
 * Farming Well → the cycle the whole page describes: one fill per
 * start/stop pair, with the two things that shorten a sit annotated. Every
 * claim here is stated on that page (tank capacity, retroactive intensity,
 * "stop slightly before the ceiling", "using any item zeroes the ramp").
 */
export function HarvestCycleFigure() {
  const a = "fig-hc-arrow";
  const aAmber = "fig-hc-arrow-amber";

  return (
    <Figure
      id="fig-harvest-cycle"
      minWidth={600}
      viewBox="0 0 720 362"
      label="Diagram: the harvest cycle — start, a long untouched sit that fills the tank toward its ceiling, stop and bank, rest to refill health, then start again. Feeding mid-sit resets the intensity ramp and a tank left at the ceiling earns nothing."
      caption="One fill per cycle. Uninterrupted time is what pays, so the two ways to shorten a sit — feeding it, or letting it top out — are the two ways to lose most of the upside."
    >
      <defs>
        <ArrowHead id={a} color={FIG.line} />
        <ArrowHead id={aAmber} color={FIG.amber} />
      </defs>

      {/* Four states, clockwise */}
      <Box
        x={96}
        y={40}
        w={180}
        h={56}
        accent={FIG.blue}
        fill={FIG.blueSoft}
        title="Start"
        titleColor={FIG.blue}
        lines={["the ramp begins at zero"]}
      />
      <Box
        x={444}
        y={40}
        w={180}
        h={72}
        accent={FIG.violet}
        fill={FIG.violetSoft}
        title="Sit, untouched"
        titleColor={FIG.violet}
        lines={["the tank fills, and", "the ramp keeps climbing"]}
      />
      <Box
        x={444}
        y={258}
        w={180}
        h={72}
        accent={FIG.green}
        fill={FIG.greenSoft}
        title="Stop and bank"
        titleColor={FIG.green}
        lines={["the bounty is collected,", "the strain is paid in HP"]}
      />
      <Box
        x={96}
        y={258}
        w={180}
        h={72}
        accent={FIG.line}
        title="Rest"
        lines={["HP refills — and with it", "the size of the next tank"]}
      />

      {/* The ring */}
      <path
        d="M 276 68 H 436"
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${a})`}
      />
      <path
        d="M 534 190 V 250"
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${a})`}
      />
      <path
        d="M 444 294 H 284"
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${a})`}
      />
      <path
        d="M 186 258 V 104"
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${a})`}
      />

      {/* The tank in the middle */}
      <text
        x={360}
        y={98}
        textAnchor="middle"
        fontSize={T.body}
        fontWeight={600}
        fill={FIG.ink}
      >
        the ceiling
      </text>
      <text
        x={360}
        y={114}
        textAnchor="middle"
        fontSize={T.small}
        fill={FIG.amber}
      >
        a tank at the top earns nothing
      </text>
      <line
        x1={310}
        y1={128}
        x2={410}
        y2={128}
        stroke={FIG.ink}
        strokeWidth={S.thin}
        strokeDasharray="5 4"
      />
      <rect
        x={320}
        y={128}
        width={80}
        height={126}
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
      />
      <rect x={320} y={196} width={80} height={58} fill={FIG.greenSoft} />
      <line
        x1={320}
        y1={196}
        x2={400}
        y2={196}
        stroke={FIG.green}
        strokeWidth={S.thin}
      />
      <text
        x={360}
        y={228}
        textAnchor="middle"
        fontSize={T.note}
        fontWeight={600}
        fill={FIG.green}
      >
        bounty
      </text>
      <text
        x={360}
        y={276}
        textAnchor="middle"
        fontSize={T.small}
        fill={FIG.muted}
      >
        set by HP and Harmony
      </text>

      {/* The ramp-killer */}
      <line
        x1={450}
        y1={126}
        x2={450}
        y2={178}
        stroke={FIG.amber}
        strokeWidth={S.bold}
      />
      <text x={460} y={140} fontSize={T.note} fill={FIG.amber}>
        Feed it mid-sit and the
      </text>
      <text x={460} y={155} fontSize={T.note} fill={FIG.amber}>
        ramp drops back to zero —
      </text>
      <text x={460} y={170} fontSize={T.note} fill={FIG.amber}>
        feed between sits, not during.
      </text>

      {/* Why the long sit is the point */}
      <text x={16} y={344} fontSize={T.small} fill={FIG.muted}>
        Intensity is read at settlement and applied to the whole stretch since
        the last one, so an untouched
      </text>
      <text x={16} y={358} fontSize={T.small} fill={FIG.muted}>
        sit is paid at the ramp&apos;s highest value rather than its average.
      </text>
    </Figure>
  );
}
