import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Wheat, Skull, TrendingUp, Coins } from "lucide-react";

export const metadata: Metadata = {
  title: "Game Formulas",
};

const sections = [
  {
    title: "Stats & Bonuses",
    href: "/formulas/stats",
    icon: Calculator,
    description:
      "Base stats, equipment bonuses, skill modifiers, and how they combine into effective values.",
  },
  {
    title: "Harvesting",
    href: "/formulas/harvesting",
    icon: Wheat,
    description:
      "Harvest rate formulas, affinity bonuses, node mechanics, yields, and scavenging costs.",
  },
  {
    title: "Liquidations",
    href: "/formulas/liquidations",
    icon: Skull,
    description:
      "Kill thresholds, liquidation mechanics, sacrifice formulas, strain damage, and combat math.",
  },
  {
    title: "Leveling & XP",
    href: "/formulas/leveling",
    icon: TrendingUp,
    description:
      "XP requirements per level, XP sources, level caps, and skill progression curves.",
  },
  {
    title: "Economy",
    href: "/formulas/economy",
    icon: Coins,
    description:
      "NPC shop pricing (GDA), trading fees, crafting costs, and Obol sinks/faucets.",
  },
];

export default function FormulasIndex() {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Game Formulas</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Every formula in Kamigotchi with exact constants and worked examples.
          The math behind stats, harvesting, combat, leveling, and the economy.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20 hover:bg-accent/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <s.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <h2 className="text-base font-semibold">{s.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{s.description}</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
