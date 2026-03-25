import Link from "next/link";
import { navigation } from "@/lib/navigation";

export default function Home() {
  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Kamigotchi Wiki
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          The complete community guide to Kamigotchi — a pure on-chain MMORPG on
          Yominet. Deep mechanics, exact formulas, interactive databases, and
          everything the official docs don&apos;t tell you.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {navigation.slice(0, -1).map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.title}
              href={section.items[0].href}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-accent/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </div>
              <ul className="space-y-1">
                {section.items.slice(0, 4).map((item) => (
                  <li
                    key={item.href}
                    className="text-sm text-muted-foreground"
                  >
                    {item.title}
                  </li>
                ))}
                {section.items.length > 4 && (
                  <li className="text-sm text-muted-foreground/60">
                    + {section.items.length - 4} more
                  </li>
                )}
              </ul>
            </Link>
          );
        })}
      </div>

      <section className="mt-12 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-2">What makes this wiki different?</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Exact formulas</strong> — every
            mechanic documented with precise constants and calculations
          </li>
          <li>
            <strong className="text-foreground">Interactive World Map</strong>{" "}
            — all 70 rooms with nodes, exits, scavenge droptables
          </li>
          <li>
            <strong className="text-foreground">Quest Dependency Graph</strong>{" "}
            — 155 quests visualized with prerequisites and rewards
          </li>
          <li>
            <strong className="text-foreground">Full Item Database</strong> —
            177 items, searchable and filterable with effects and sources
          </li>
          <li>
            <strong className="text-foreground">Complete Skill Catalog</strong>{" "}
            — all 71 skills across 4 trees with exact values per rank
          </li>
        </ul>
      </section>
    </div>
  );
}
