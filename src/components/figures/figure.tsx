/**
 * Figure furniture.
 *
 * Every diagram on the wiki is hand-written inline SVG rendered through
 * <Figure>, so the whole set shares one frame, one palette and one set of
 * type sizes. Colours come from the --fig-* custom properties in
 * globals.css, which are defined for both themes — nothing in a figure
 * hard-codes a colour value.
 *
 * A figure may only restate what its page already says. No diagram
 * introduces a fact or a number the surrounding text does not carry.
 */

/** Palette. Structural greys derive from --foreground; accents are per-theme. */
export const FIG = {
  ink: "var(--fig-ink)",
  muted: "var(--fig-muted)",
  line: "var(--fig-line)",
  hairline: "var(--fig-hairline)",
  surface: "var(--fig-surface)",
  blue: "var(--fig-blue)",
  violet: "var(--fig-violet)",
  green: "var(--fig-green)",
  amber: "var(--fig-amber)",
  red: "var(--fig-red)",
  blueSoft: "var(--fig-blue-soft)",
  violetSoft: "var(--fig-violet-soft)",
  greenSoft: "var(--fig-green-soft)",
  amberSoft: "var(--fig-amber-soft)",
  redSoft: "var(--fig-red-soft)",
} as const;

/** Type scale, in viewBox units. Every figure uses a 720-ish wide viewBox,
 *  so these sizes stay consistent across the set. */
export const T = {
  title: 13.5,
  body: 11.5,
  note: 10.5,
  small: 10,
} as const;

/** Stroke weights. */
export const S = {
  hair: 1,
  thin: 1.4,
  bold: 2,
} as const;

interface FigureProps {
  /** Unique across the page — used to build the <title> element's id. */
  id: string;
  /** Accessible name for the whole diagram. */
  label: string;
  caption: React.ReactNode;
  viewBox: string;
  /** Below this width the frame scrolls sideways rather than shrinking the
   *  labels into illegibility. */
  minWidth?: number;
  children: React.ReactNode;
}

export function Figure({
  id,
  label,
  caption,
  viewBox,
  minWidth = 560,
  children,
}: FigureProps) {
  const titleId = `${id}-title`;
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-lg border border-border bg-muted/30 px-4 py-5">
        <svg
          role="img"
          aria-labelledby={titleId}
          aria-label={label}
          viewBox={viewBox}
          className="block h-auto w-full"
          style={{ minWidth, fontFamily: "var(--font-sans), sans-serif" }}
        >
          <title id={titleId}>{label}</title>
          {children}
        </svg>
      </div>
      <figcaption className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

/** One arrowhead marker. Markers do not inherit colour, so each colour a
 *  figure arrows in needs its own marker with a page-unique id. */
export function ArrowHead({ id, color }: { id: string; color: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M 0 1 L 9 5 L 0 9 z" fill={color} />
    </marker>
  );
}

interface BoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  title?: string;
  titleColor?: string;
  lines?: string[];
  accent?: string;
  fill?: string;
  /** First text baseline, measured from the top of the box. */
  titleDy?: number;
}

/** A rounded panel with a centred title and centred body lines. */
export function Box({
  x,
  y,
  w,
  h,
  title,
  titleColor = FIG.ink,
  lines = [],
  accent = FIG.line,
  fill = FIG.surface,
  titleDy = 24,
}: BoxProps) {
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={fill}
        stroke={accent}
        strokeWidth={S.thin}
      />
      {title && (
        <text
          x={cx}
          y={y + titleDy}
          textAnchor="middle"
          fontSize={T.title}
          fontWeight={600}
          fill={titleColor}
        >
          {title}
        </text>
      )}
      {lines.map((line, i) => (
        <text
          key={i}
          x={cx}
          y={y + titleDy + 20 + i * 15}
          textAnchor="middle"
          fontSize={T.body}
          fill={FIG.muted}
        >
          {line}
        </text>
      ))}
    </g>
  );
}
