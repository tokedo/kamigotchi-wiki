import { WorldMap } from "@/components/world-map";

export default function WorldMapPage() {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">World Map</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore 70 rooms across 4 planes &mdash; the Overworld, Interiors,
          Underground caverns, and the Castle. Click any tile for room details,
          harvest node info, and connections.
        </p>
      </header>
      <WorldMap />
    </article>
  );
}
