/**
 * Playing Well section furniture.
 *
 * Mechanics pages describe rules, which do not move. The strategy pages
 * describe the world players have built on top of those rules, which does
 * move — so every page in this section carries one visible stamp line
 * directly under its title, and the section is refreshed as a whole.
 */

export const STRATEGY_STAMP = "Landscape and doctrine as of August 2026.";

export function StrategyStamp() {
  return (
    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-amber-400/80">
      {STRATEGY_STAMP}
    </p>
  );
}

interface StrategyPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function StrategyPage({ title, subtitle, children }: StrategyPageProps) {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <StrategyStamp />
        {subtitle && (
          <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>
        )}
      </header>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
    </article>
  );
}

/**
 * A short callout pointing at the mechanics page that owns the math behind
 * whatever was just described. Strategy pages teach the why; the mechanics
 * pages carry the formulas.
 */
export function MathLives({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-lg border border-border border-l-[3px] border-l-blue-500/60 bg-muted/50 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-400/80 mb-1.5">
        The math lives here
      </p>
      <div className="text-sm text-muted-foreground [&_a]:text-foreground [&_a]:underline">
        {children}
      </div>
    </div>
  );
}

export function DoctrineTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
