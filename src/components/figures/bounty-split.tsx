import { ArrowHead, Box, FIG, Figure, S, T } from "./figure";

/**
 * Liquidations → Spoils Example.
 *
 * The page's own worked example, drawn to scale: a 1,500 Musu bounty splits
 * into 240 salvage (Power 16 → 16%), 819 spoils (45% + Power 20 → 65% of the
 * 1,260 that remains) and 441 destroyed.
 */
export function BountySplitFigure() {
  const a = "fig-bs-arrow";

  const x0 = 16;
  const total = 688;
  const w = (musu: number) => Math.round((musu / 1500) * total);
  const salvageW = w(240); // 110
  const spoilsW = w(819); // 376
  const destroyedW = total - salvageW - spoilsW;
  const spoilsX = x0 + salvageW;
  const destroyedX = spoilsX + spoilsW;

  return (
    <Figure
      id="fig-bounty-split"
      minWidth={620}
      viewBox="0 0 720 306"
      label="Diagram: a 1,500 Musu bounty at the moment of a kill splits into 240 Musu salvaged to the victim, 819 Musu of spoils added to the killer's own harvest bounty, and 441 Musu destroyed."
      caption="The page's worked example drawn to scale. Neither side gets the whole pile, and the killer's share is not banked — it lands in their own uncollected bounty."
    >
      <defs>
        <ArrowHead id={a} color={FIG.line} />
      </defs>

      <text x={16} y={28} fontSize={T.body} fill={FIG.muted}>
        A 1,500 Musu bounty at the moment of the kill
      </text>

      {/* The split, to scale */}
      <rect
        x={x0}
        y={44}
        width={salvageW}
        height={56}
        fill={FIG.greenSoft}
        stroke={FIG.green}
        strokeWidth={S.thin}
      />
      <rect
        x={spoilsX}
        y={44}
        width={spoilsW}
        height={56}
        fill={FIG.violetSoft}
        stroke={FIG.violet}
        strokeWidth={S.thin}
      />
      <rect
        x={destroyedX}
        y={44}
        width={destroyedW}
        height={56}
        fill={FIG.surface}
        stroke={FIG.line}
        strokeWidth={S.thin}
        strokeDasharray="5 4"
      />

      <text
        x={x0 + salvageW / 2}
        y={70}
        textAnchor="middle"
        fontSize={T.title}
        fontWeight={600}
        fill={FIG.green}
      >
        240
      </text>
      <text
        x={x0 + salvageW / 2}
        y={87}
        textAnchor="middle"
        fontSize={T.small}
        fill={FIG.muted}
      >
        salvage, 16%
      </text>

      <text
        x={spoilsX + spoilsW / 2}
        y={70}
        textAnchor="middle"
        fontSize={T.title}
        fontWeight={600}
        fill={FIG.violet}
      >
        819
      </text>
      <text
        x={spoilsX + spoilsW / 2}
        y={87}
        textAnchor="middle"
        fontSize={T.small}
        fill={FIG.muted}
      >
        spoils, 65% of the 1,260 left after salvage
      </text>

      <text
        x={destroyedX + destroyedW / 2}
        y={70}
        textAnchor="middle"
        fontSize={T.title}
        fontWeight={600}
        fill={FIG.muted}
      >
        441
      </text>
      <text
        x={destroyedX + destroyedW / 2}
        y={87}
        textAnchor="middle"
        fontSize={T.small}
        fill={FIG.muted}
      >
        destroyed
      </text>

      {/* Where each share lands */}
      <path
        d={`M ${x0 + salvageW / 2} 100 V 142`}
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${a})`}
      />
      <path
        d={`M ${spoilsX + spoilsW / 2} 100 V 142`}
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${a})`}
      />
      <path
        d={`M ${destroyedX + destroyedW / 2} 100 V 142`}
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
        markerEnd={`url(#${a})`}
      />

      <Box
        x={16}
        y={148}
        w={158}
        h={70}
        accent={FIG.green}
        fill={FIG.greenSoft}
        title="to the victim"
        titleColor={FIG.green}
        lines={["banked as Musu, plus", "240 XP to the dead Kami"]}
      />
      <Box
        x={192}
        y={148}
        w={244}
        h={70}
        accent={FIG.violet}
        fill={FIG.violetSoft}
        title="to the killer's harvest bounty"
        titleColor={FIG.violet}
        lines={["not banked yet — collecting it", "costs the killer strain"]}
      />
      <Box
        x={454}
        y={148}
        w={250}
        h={70}
        title="burned"
        lines={["out of the economy for good"]}
      />

      <text x={192} y={244} fontSize={T.body} fill={FIG.amber}>
        The killer also takes 1 Obol — and pays recoil HP on the way out.
      </text>
      <text x={16} y={272} fontSize={T.body} fontWeight={600} fill={FIG.ink}>
        bounty = salvage + spoils + destroyed
      </text>
      <text x={16} y={294} fontSize={T.small} fill={FIG.muted}>
        Salvage is 1% of the bounty per point of the victim&apos;s Power (16
        here). Spoils are 45% plus 1% per point of the killer&apos;s Power (20
        here).
      </text>
    </Figure>
  );
}
