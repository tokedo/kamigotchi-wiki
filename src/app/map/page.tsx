import type { Metadata } from "next";
import Link from "next/link";
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
        <p className="mt-2 text-sm text-muted-foreground">
          Landmarks worth knowing: Room 1 (Misty Riverside) is where every
          account starts, Room 11 (Temple by the Waterfall) is the only place a
          Kami can be named, Room 66 (Marketplace) waives trade delivery fees,
          and the fountain in Room 31 (Scrapyard Exit) opens the{" "}
          <Link
            href="/formulas/item-pools"
            className="underline hover:text-foreground"
          >
            item pools
          </Link>
          .
        </p>
      </header>
      <div className="-mx-6 lg:-mx-8">
        <WorldMap />
      </div>
    </article>
  );
}
