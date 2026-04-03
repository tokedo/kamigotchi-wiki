import type { Metadata } from "next";
import { WorldMap } from "@/components/world-map";

export const metadata: Metadata = {
  title: "World Map",
};

export default function MapPage() {
  return (
    <article>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">World Map</h1>
        <p className="mt-2 text-muted-foreground">
          All 70 rooms across 4 layers — Overworld, Interiors, Underground, and
          Castle. Click any room for details on nodes, exits, affinities, and
          scavenge droptables.
        </p>
      </header>
      <div className="-mx-6 lg:-mx-8">
        <WorldMap />
      </div>
    </article>
  );
}
