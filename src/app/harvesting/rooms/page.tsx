"use client";

import { useState, useMemo } from "react";
import rooms from "@/data/rooms.json";

interface DroptableData {
  name: string;
  indices: number[];
  tiers: number[];
  items: string[];
}

interface NodeData {
  name: string;
  affinity: string;
  levelLimit: number;
  yieldIndex: number;
  yieldName: string;
  scavCost: number;
  droptableName: string;
  droptable: DroptableData;
}

interface RoomData {
  index: number;
  name: string;
  status: string;
  x: number;
  y: number;
  z: number;
  exits: number[];
  description: string;
  node: NodeData | null;
}

const AFFINITY_COLORS: Record<string, string> = {
  Normal: "bg-zinc-700 text-zinc-200",
  Eerie: "bg-purple-900/60 text-purple-200",
  Scrap: "bg-amber-900/60 text-amber-200",
  Insect: "bg-green-900/60 text-green-200",
};

function getAffinityBadgeClass(affinity: string): string {
  for (const [key, cls] of Object.entries(AFFINITY_COLORS)) {
    if (affinity.includes(key)) return cls;
  }
  return "bg-zinc-700 text-zinc-200";
}

type SortKey = "name" | "affinity" | "levelLimit" | "scavCost";
type SortDir = "asc" | "desc";

export default function HarvestingRoomsPage() {
  const [affinityFilter, setAffinityFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [search, setSearch] = useState("");

  const harvestRooms = useMemo(() => {
    return (rooms as RoomData[]).filter((r) => r.node !== null);
  }, []);

  const affinities = useMemo(() => {
    const set = new Set<string>();
    harvestRooms.forEach((r) => {
      if (r.node) set.add(r.node.affinity);
    });
    return ["All", ...Array.from(set).sort()];
  }, [harvestRooms]);

  const filtered = useMemo(() => {
    let result = harvestRooms;

    if (affinityFilter !== "All") {
      result = result.filter((r) => r.node?.affinity === affinityFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.node?.name.toLowerCase().includes(q) ||
          r.node?.droptable.items.some((item) =>
            item.toLowerCase().includes(q)
          )
      );
    }

    result = [...result].sort((a, b) => {
      const nodeA = a.node!;
      const nodeB = b.node!;
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "affinity":
          cmp = nodeA.affinity.localeCompare(nodeB.affinity);
          break;
        case "levelLimit":
          cmp = nodeA.levelLimit - nodeB.levelLimit;
          break;
        case "scavCost":
          cmp = nodeA.scavCost - nodeB.scavCost;
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [harvestRooms, affinityFilter, search, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " \u2191" : " \u2193";
  }

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Harvesting Rooms</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          All {harvestRooms.length} harvest nodes with their affinity, level
          limits, scavenge costs, and droptable items
        </p>
      </header>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search rooms or items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring sm:w-64"
        />
        <div className="flex flex-wrap gap-2">
          {affinities.map((aff) => (
            <button
              key={aff}
              onClick={() => setAffinityFilter(aff)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                affinityFilter === aff
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {aff}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        Showing {filtered.length} of {harvestRooms.length} nodes
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th
                className="px-4 py-3 text-left font-medium cursor-pointer hover:text-foreground"
                onClick={() => toggleSort("name")}
              >
                Room{sortIndicator("name")}
              </th>
              <th
                className="px-4 py-3 text-left font-medium cursor-pointer hover:text-foreground"
                onClick={() => toggleSort("affinity")}
              >
                Affinity{sortIndicator("affinity")}
              </th>
              <th
                className="px-4 py-3 text-left font-medium cursor-pointer hover:text-foreground"
                onClick={() => toggleSort("levelLimit")}
              >
                Level Limit{sortIndicator("levelLimit")}
              </th>
              <th
                className="px-4 py-3 text-left font-medium cursor-pointer hover:text-foreground"
                onClick={() => toggleSort("scavCost")}
              >
                Scav Cost{sortIndicator("scavCost")}
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Droptable Items
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((room) => {
              const node = room.node!;
              return (
                <tr
                  key={room.index}
                  className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{room.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Room {room.index} &middot; z={room.z}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getAffinityBadgeClass(
                        node.affinity
                      )}`}
                    >
                      {node.affinity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {node.levelLimit > 0 ? (
                      <span className="text-amber-400">
                        Lv {node.levelLimit} max
                      </span>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono">{node.scavCost}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {node.droptable.items.map((item) => (
                        <span
                          key={item}
                          className="inline-block rounded bg-muted px-1.5 py-0.5 text-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 text-center text-muted-foreground">
          No harvest nodes match your filters.
        </div>
      )}
    </article>
  );
}
