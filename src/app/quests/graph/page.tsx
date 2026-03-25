import { QuestGraph } from "@/components/quest-graph";

export const metadata = {
  title: "Quest Dependency Graph — Kamigotchi Wiki",
  description:
    "Interactive quest dependency graph for Kamigotchi. Explore main story, Mina's quests, and side quests with prerequisites, objectives, and rewards.",
};

export default function QuestGraphPage() {
  return (
    <div className="-mx-6 -my-12 lg:-mx-8 flex flex-col h-screen lg:h-screen">
      {/* Header */}
      <div className="px-6 lg:px-8 pt-6 pb-4 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Quest Dependency Graph
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Explore quest chains, prerequisites, and rewards. Click any quest to
          see its details.
        </p>
      </div>

      {/* Graph container */}
      <div className="flex-1 relative min-h-[600px]">
        <QuestGraph />
      </div>
    </div>
  );
}
