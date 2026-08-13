import Link from "next/link";
import {
  Calculator,
  Compass,
  Globe,
  Link2,
  Package,
  ScrollText,
  Swords,
} from "lucide-react";

const cards = [
  {
    href: "/start",
    icon: Compass,
    title: "Start Here",
    description:
      "New to Kamigotchi? Getting a Kami, your first harvest, staying alive, and what to aim at in your first days.",
  },
  {
    href: "/strategy",
    icon: Swords,
    title: "Playing Well",
    description:
      "How the game is really played: farming doctrine, defence, the predator's economy, and choosing ground.",
  },
  {
    href: "/formulas",
    icon: Calculator,
    title: "Mechanics",
    description:
      "Every formula in the game — stats, harvesting, combat, leveling, economy — with exact constants and worked examples.",
  },
  {
    href: "/items",
    icon: Package,
    title: "Item Database",
    description:
      "The complete item catalog with images, effects, recipes, and drop sources. Searchable and filterable.",
  },
  {
    href: "/quests",
    icon: ScrollText,
    title: "Quest Database",
    description:
      "Every quest as an interactive dependency graph. Click any quest for objectives, rewards, and prerequisites.",
  },
  {
    href: "/map",
    icon: Globe,
    title: "World Map",
    description:
      "Interactive map of the world across four layers. Nodes, exits, affinities, scavenge droptables, and room art.",
  },
  {
    href: "/resources",
    icon: Link2,
    title: "Resources",
    description:
      "Official and community-built tools, dashboards, and guides for Kamigotchi players.",
  },
];

export default function Home() {
  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Kamigotchi Wiki
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A player&apos;s guide in three parts: how to start, how the game is
          really played, and the exact mechanics underneath — complementing the{" "}
          <a
            href="https://docs.asphodel.io/kamigotchi"
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
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-accent/50"
          >
            <div className="flex items-center gap-3 mb-3">
              <card.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <h2 className="text-lg font-semibold">{card.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
