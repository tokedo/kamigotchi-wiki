import { ExternalLink } from "lucide-react";

interface Resource {
  name: string;
  url: string;
  description: string;
  author?: { name: string; url?: string };
}

const official: Resource[] = [
  {
    name: "Kamigotchi World",
    url: "https://app.kamigotchi.io",
    description: "The game itself — jump in and play.",
  },
  {
    name: "Official Docs",
    url: "https://docs.kamigotchi.io",
    description:
      "Official Kami documentation, great for new players.",
  },
];

const community: Resource[] = [
  {
    name: "KamiBots",
    url: "https://kamibots.xyz",
    description:
      "Automation for your Kamis — play Kamigotchi as a strategy idle game.",
    author: { name: "Whisperseers", url: "https://x.com/Whisperseers" },
  },
  {
    name: "KamiStats",
    url: "https://kamistats.com",
    description: "On-chain analytics for Kamigotchi world.",
    author: { name: "Canzi", url: "https://x.com/0xCanzi" },
  },
  {
    name: "Kami Catalog",
    url: "https://kami.h80h.xyz",
    description: "Browse and explore all Kamis.",
    author: { name: "Chih", url: "https://x.com/3chih21" },
  },
  {
    name: "Kami Dashboard",
    url: "https://dashboard.kamigotchi-stitch.com",
    description: "Kami performance tracker.",
    author: { name: "Stitch" },
  },
];

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="rounded-lg border-2 border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-foreground hover:underline"
            style={{ fontFamily: "var(--font-pixel), monospace" }}
          >
            {resource.name}
          </a>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {resource.description}
          </p>
          {resource.author && (
            <p className="mt-2 text-xs text-muted-foreground/70">
              by{" "}
              {resource.author.url ? (
                <a
                  href={resource.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  {resource.author.name}
                </a>
              ) : (
                <span>{resource.author.name}</span>
              )}
            </p>
          )}
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground/50 hover:text-foreground/50"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
        </a>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="mt-2 text-muted-foreground">
          Official and community-built tools for Kamigotchi players.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4">Official</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {official.map((r) => (
            <ResourceCard key={r.url} resource={r} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-4">Community</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {community.map((r) => (
            <ResourceCard key={r.url} resource={r} />
          ))}
        </div>
      </section>
    </article>
  );
}
