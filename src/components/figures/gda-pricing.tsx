import { FIG, Figure, S, T } from "./figure";

/**
 * Economy → GDA Pricing.
 *
 * Price against time for one listing: decay between purchases, a jump on
 * every purchase, the target price it is aimed at, and the hard floor at
 * 12.5% of target that the page derives from the 3-period clamp. Shape
 * only — the axes carry no numbers the page does not state.
 */
export function GdaPricingFigure() {
  // Price 0 sits on the axis at y = 250; the target price at y = 120.
  // The floor is one eighth of target: 250 − 130/8 ≈ 234.
  const yTarget = 120;
  const yFloor = 234;
  const yZero = 250;

  const purchases = [116, 154, 192, 230, 262, 600, 632, 666];

  const curve = [
    "M 80 120",
    "Q 98 134 116 146",
    "L 116 112",
    "Q 134 126 154 138",
    "L 154 100",
    "Q 172 112 192 124",
    "L 192 86",
    "Q 210 98 230 110",
    "L 230 74",
    "Q 246 84 262 94",
    "L 262 68",
    "C 310 140 356 200 400 224",
    "Q 436 236 470 234",
    "L 600 234",
    "L 600 192",
    "Q 614 202 632 208",
    "L 632 150",
    "Q 648 160 666 168",
    "L 666 118",
    "Q 678 126 690 132",
  ].join(" ");

  return (
    <Figure
      id="fig-gda-pricing"
      minWidth={600}
      viewBox="0 0 720 316"
      label="Diagram: a listing's price over time under gradual Dutch auction pricing. The price decays whenever nobody is buying and jumps upward on every purchase, climbing above the target price during a rush and sliding down to a hard floor at 12.5% of target while the listing sits untouched."
      caption="The whole mechanism in one line: purchases push the price up, time pulls it down, the target is where the two balance, and the slide stops at one eighth of target."
    >
      {/* Axes */}
      <line x1={80} y1={36} x2={80} y2={yZero} stroke={FIG.line} strokeWidth={S.thin} />
      <line x1={80} y1={yZero} x2={694} y2={yZero} stroke={FIG.line} strokeWidth={S.thin} />
      <text
        transform="rotate(-90 30 143)"
        x={30}
        y={143}
        textAnchor="middle"
        fontSize={T.note}
        fill={FIG.muted}
      >
        price per unit
      </text>
      <text x={694} y={268} textAnchor="end" fontSize={T.note} fill={FIG.muted}>
        time →
      </text>

      {/* The two anchors */}
      <line
        x1={80}
        y1={yTarget}
        x2={694}
        y2={yTarget}
        stroke={FIG.blue}
        strokeWidth={S.thin}
        strokeDasharray="6 5"
      />
      <text x={620} y={112} textAnchor="end" fontSize={T.note} fill={FIG.blue}>
        target price
      </text>
      <line
        x1={80}
        y1={yFloor}
        x2={694}
        y2={yFloor}
        stroke={FIG.amber}
        strokeWidth={S.thin}
        strokeDasharray="6 5"
      />
      <text x={86} y={212} fontSize={T.note} fill={FIG.amber}>
        floor: 12.5% of target
      </text>
      <text x={86} y={226} fontSize={T.small} fill={FIG.muted}>
        the slide is clamped at 3 periods behind schedule
      </text>

      {/* The price itself */}
      <path d={curve} fill="none" stroke={FIG.violet} strokeWidth={S.bold} />

      {/* Purchase ticks */}
      {purchases.map((x) => (
        <path
          key={x}
          d={`M ${x - 4} 258 L ${x + 4} 258 L ${x} 250 z`}
          fill={FIG.violet}
        />
      ))}

      {/* Annotations */}
      <text x={100} y={46} fontSize={T.note} fill={FIG.ink}>
        buying faster than expected — every purchase resets the price upward
      </text>
      <text x={472} y={206} fontSize={T.note} fill={FIG.ink}>
        no buyers: the slide
      </text>
      <text x={472} y={220} fontSize={T.note} fill={FIG.ink}>
        stops at the floor
      </text>

      <path
        d={`M ${86} 276 L ${94} 276 L ${90} 268 z`}
        fill={FIG.violet}
      />
      <text x={102} y={278} fontSize={T.small} fill={FIG.muted}>
        each mark is a purchase
      </text>
      <text x={300} y={278} fontSize={T.small} fill={FIG.muted}>
        Buying against a dormant listing also settles its backlog.
      </text>
    </Figure>
  );
}
