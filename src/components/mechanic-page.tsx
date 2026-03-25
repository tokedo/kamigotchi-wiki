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
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details & Formulas</TabsTrigger>
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

export function FormulaBlock({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="my-4 rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm">
      {label && (
        <p className="text-xs font-semibold text-muted-foreground mb-2">
          {label}
        </p>
      )}
      <div className="whitespace-pre-wrap">{children}</div>
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
