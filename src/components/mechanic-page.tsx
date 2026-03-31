import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MechanicPageProps {
  title: string;
  subtitle?: string;
  overview: React.ReactNode;
  details: React.ReactNode;
}

export function MechanicPage({
  title,
  subtitle,
  overview,
  details,
}: MechanicPageProps) {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
        )}
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8 h-auto gap-3 bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="h-auto rounded-md border-2 border-muted-foreground/30 bg-muted px-5 py-2.5 text-sm data-active:border-[#ffffff] data-active:border-[4px] data-active:bg-accent data-active:text-foreground data-active:shadow-[0_0_8px_rgba(255,255,255,0.25)]"
            style={{ fontFamily: "var(--font-pixel), monospace" }}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="h-auto rounded-md border-2 border-muted-foreground/30 bg-muted px-5 py-2.5 text-sm data-active:border-[#ffffff] data-active:border-[4px] data-active:bg-accent data-active:text-foreground data-active:shadow-[0_0_8px_rgba(255,255,255,0.25)]"
            style={{ fontFamily: "var(--font-pixel), monospace" }}
          >
            Details &amp; Formulas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {overview}
          </div>
        </TabsContent>
        <TabsContent value="details">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {details}
          </div>
        </TabsContent>
      </Tabs>
    </article>
  );
}

interface InfoBoxProps {
  children: React.ReactNode;
  variant?: "info" | "warning" | "tip";
}

export function InfoBox({ children, variant = "info" }: InfoBoxProps) {
  const styles = {
    info: "border-blue-500/30 bg-blue-500/5 text-blue-200",
    warning: "border-amber-500/30 bg-amber-500/5 text-amber-200",
    tip: "border-green-500/30 bg-green-500/5 text-green-200",
  };
  const labels = { info: "Info", warning: "Warning", tip: "Tip" };

  return (
    <div className={`my-4 rounded-lg border p-4 ${styles[variant]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-70">
        {labels[variant]}
      </p>
      <div className="text-sm">{children}</div>
    </div>
  );
}

/**
 * FormulaBlock — displays equations with optional variable definitions.
 *
 * variant="definition" (default) — game mechanic formula. Blue left border,
 *   prominent label. Use for the canonical equation that defines how a system works.
 *
 * variant="example" — worked example with concrete numbers. Amber left border,
 *   "Example" prefix. Use to show a formula applied with real values.
 */
export function FormulaBlock({
  children,
  label,
  vars,
  variant = "definition",
}: {
  children: React.ReactNode;
  label?: string;
  vars?: Record<string, string>;
  variant?: "definition" | "example";
}) {
  const isExample = variant === "example";

  return (
    <div
      className={`my-5 rounded-lg border overflow-hidden border-l-[3px] ${
        isExample
          ? "border-border border-l-amber-500/60 bg-amber-500/[0.03]"
          : "border-border border-l-blue-500/60 bg-muted/50"
      }`}
    >
      <div className="p-4 font-mono text-sm">
        {label && (
          <p
            className={`text-xs font-semibold mb-2 flex items-center gap-1.5 ${
              isExample ? "text-amber-400/80" : "text-blue-400/80"
            }`}
          >
            {isExample ? "Example" : "Formula"}
            <span className="text-muted-foreground font-normal">&mdash; {label}</span>
          </p>
        )}
        {!label && isExample && (
          <p className="text-xs font-semibold mb-2 text-amber-400/80">Example</p>
        )}
        {!label && !isExample && null}
        <div className="whitespace-pre-wrap">{children}</div>
      </div>
      {vars && Object.keys(vars).length > 0 && (
        <div className={`border-t px-4 py-3 ${
          isExample ? "border-amber-500/10 bg-amber-500/[0.02]" : "border-border bg-muted/30"
        }`}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Where
          </p>
          <div className="grid gap-1">
            {Object.entries(vars).map(([name, desc]) => (
              <div key={name} className="flex gap-2 text-xs">
                <span className="font-mono font-medium text-foreground/80 shrink-0">{name}</span>
                <span className="text-muted-foreground">= {desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function StatTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
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
                <td key={j} className="px-4 py-2">
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
