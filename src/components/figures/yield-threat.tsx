import { ArrowHead, FIG, Figure, S, T } from "./figure";

/**
 * Choosing Ground → Node Choice Is One Computation.
 *
 * Yield against threat, with the page's own doctrine in the quadrants: the
 * best farming ground and the worst kill zone overlap, and for anyone not
 * building to hold contested ground the answer is quiet, affinity-matched
 * ground at par yield.
 */
export function YieldThreatFigure() {
  const a = "fig-yt-arrow";

  return (
    <Figure
      id="fig-yield-threat"
      minWidth={560}
      viewBox="0 0 700 364"
      label="Diagram: a two-by-two of yield against threat. Quiet ground at par yield is the default answer; contested high-yield ground is war ground that has to be defended; rich quiet ground rarely stays quiet because yield attracts farmers and farmers attract predators; contested par-yield ground is the worst of both."
      caption="Danger is a property of the population, not of the ground — and it concentrates: the single busiest kill node accounts for roughly a quarter of all kills in the world."
    >
      <defs>
        <ArrowHead id={a} color={FIG.muted} />
      </defs>

      {/* Frame */}
      <rect
        x={90}
        y={40}
        width={570}
        height={260}
        fill="none"
        stroke={FIG.line}
        strokeWidth={S.thin}
      />
      <line x1={375} y1={40} x2={375} y2={300} stroke={FIG.hairline} strokeWidth={S.hair} />
      <line x1={90} y1={170} x2={660} y2={170} stroke={FIG.hairline} strokeWidth={S.hair} />

      {/* Quadrant tints */}
      <rect x={90} y={40} width={285} height={130} fill={FIG.amberSoft} />
      <rect x={375} y={40} width={285} height={130} fill={FIG.redSoft} />
      <rect x={90} y={170} width={285} height={130} fill={FIG.greenSoft} />

      {/* Axes */}
      <text
        transform="rotate(-90 34 170)"
        x={34}
        y={170}
        textAnchor="middle"
        fontSize={T.body}
        fontWeight={600}
        fill={FIG.ink}
      >
        yield
      </text>
      <text x={80} y={58} textAnchor="end" fontSize={T.note} fill={FIG.muted}>
        high
      </text>
      <text x={80} y={294} textAnchor="end" fontSize={T.note} fill={FIG.muted}>
        par
      </text>
      <text
        x={375}
        y={340}
        textAnchor="middle"
        fontSize={T.body}
        fontWeight={600}
        fill={FIG.ink}
      >
        threat
      </text>
      <text x={232} y={318} textAnchor="middle" fontSize={T.note} fill={FIG.muted}>
        quiet
      </text>
      <text x={518} y={318} textAnchor="middle" fontSize={T.note} fill={FIG.muted}>
        contested
      </text>

      {/* Rich and quiet */}
      <text x={104} y={70} fontSize={T.title} fontWeight={600} fill={FIG.amber}>
        Rarely quiet for long
      </text>
      <text x={104} y={90} fontSize={T.note} fill={FIG.muted}>
        yield attracts farmers and farmers
      </text>
      <text x={104} y={105} fontSize={T.note} fill={FIG.muted}>
        attract predators — the two overlap.
      </text>

      {/* War ground */}
      <text x={389} y={70} fontSize={T.title} fontWeight={600} fill={FIG.red}>
        War ground
      </text>
      <text x={389} y={90} fontSize={T.note} fill={FIG.muted}>
        a rich node you have to defend, with a
      </text>
      <text x={389} y={105} fontSize={T.note} fill={FIG.muted}>
        food bill or a bodyguard squad attached;
      </text>
      <text x={389} y={120} fontSize={T.note} fill={FIG.muted}>
        sit length becomes a safety parameter.
      </text>

      {/* The default answer */}
      <text x={104} y={200} fontSize={T.title} fontWeight={600} fill={FIG.green}>
        The default answer
      </text>
      <text x={104} y={220} fontSize={T.note} fill={FIG.muted}>
        quiet, affinity-matched ground at par
      </text>
      <text x={104} y={235} fontSize={T.note} fill={FIG.muted}>
        yield — it beats a rich node you have
      </text>
      <text x={104} y={250} fontSize={T.note} fill={FIG.muted}>
        to defend, and it beats it for free.
      </text>

      {/* Contested and poor */}
      <text x={389} y={200} fontSize={T.title} fontWeight={600} fill={FIG.muted}>
        The worst score
      </text>
      <text x={389} y={220} fontSize={T.note} fill={FIG.muted}>
        threat without the yield that would
      </text>
      <text x={389} y={235} fontSize={T.note} fill={FIG.muted}>
        pay for holding it.
      </text>

      {/* Yield pulls a node rightward */}
      <path
        d="M 300 150 H 452"
        fill="none"
        stroke={FIG.muted}
        strokeWidth={S.hair}
        strokeDasharray="5 4"
        markerEnd={`url(#${a})`}
      />
      <text x={376} y={142} textAnchor="middle" fontSize={T.small} fill={FIG.muted}>
        yield draws predators
      </text>
    </Figure>
  );
}
