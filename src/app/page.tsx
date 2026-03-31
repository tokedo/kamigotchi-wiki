import Link from "next/link";
import { Calculator, Package, Globe } from "lucide-react";

export default function Home() {
  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Kamigotchi Wiki
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Deep mechanics, exact formulas, and interactive databases —
          complementing the{" "}
          <a
            href="https://docs.kamigotchi.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            official docs
          </a>{" "}
          with a complete game reference.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-3">
        <Link
          href="/formulas"
          className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-accent/50"
        >
          <div className="flex items-center gap-3 mb-3">
            <Calculator className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <h2 className="text-lg font-semibold">Game Formulas</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Every formula in the game — stats, harvesting, combat, leveling,
            economy — with exact constants and worked examples.
          </p>
        </Link>

        <Link
          href="/items"
          className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-accent/50"
        >
          <div className="flex items-center gap-3 mb-3">
            <Package className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <h2 className="text-lg font-semibold">Item Database</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Complete catalog of all 177 items with images, effects, recipes,
            and drop sources. Searchable and filterable.
          </p>
        </Link>

        <Link
          href="/map"
          className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-accent/50"
        >
          <div className="flex items-center gap-3 mb-3">
            <Globe className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <h2 className="text-lg font-semibold">World Map</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Interactive map of all 70 rooms across 4 layers. Nodes, exits,
            affinities, scavenge droptables, and room art.
          </p>
        </Link>
      </div>
    </div>
  );
}
