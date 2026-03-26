"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import itemsData from "@/data/items.json";
import recipesData from "@/data/recipes.json";
import { itemImagePath } from "@/lib/images";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Item = (typeof itemsData)[number];
type Recipe = (typeof recipesData)[number];

const RARITY_COLORS: Record<string, string> = {
  Common: "bg-zinc-600 text-zinc-100",
  Uncommon: "bg-green-700 text-green-100",
  Rare: "bg-blue-700 text-blue-100",
  Epic: "bg-purple-700 text-purple-100",
  Legendary: "bg-amber-600 text-amber-100",
};

const TYPE_COLORS: Record<string, string> = {
  Food: "bg-orange-800/60 text-orange-200",
  Material: "bg-stone-700/60 text-stone-200",
  Equipment: "bg-sky-800/60 text-sky-200",
  Potion: "bg-fuchsia-800/60 text-fuchsia-200",
  "Key Item": "bg-yellow-800/60 text-yellow-200",
  Lootbox: "bg-indigo-800/60 text-indigo-200",
  Tool: "bg-teal-800/60 text-teal-200",
  Misc: "bg-gray-700/60 text-gray-200",
  Consumable: "bg-lime-800/60 text-lime-200",
  Revive: "bg-red-800/60 text-red-200",
  NFT: "bg-violet-800/60 text-violet-200",
  ERC20: "bg-emerald-800/60 text-emerald-200",
};

const ALL_TYPES = [...new Set(itemsData.map((i) => i.type).filter(Boolean))].sort();
const ALL_RARITIES = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
const PER_PAGE = 30;

export default function ItemDatabase() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [rarityFilter, setRarityFilter] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const recipeMap = useMemo(() => {
    const map: Record<number, { as: string; recipe: Recipe }[]> = {};
    for (const r of recipesData) {
      const addEntry = (idx: number, role: string) => {
        if (!map[idx]) map[idx] = [];
        map[idx].push({ as: role, recipe: r });
      };
      addEntry(r.output.index, "output");
      for (const inp of r.inputs) addEntry(inp.index, "input");
      if (r.tool) addEntry(r.tool.index, "tool");
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return itemsData.filter((item) => {
      if (q && !item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) return false;
      if (typeFilter && item.type !== typeFilter) return false;
      if (rarityFilter && item.rarity !== rarityFilter) return false;
      return true;
    });
  }, [search, typeFilter, rarityFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageItems = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const resetPage = () => setPage(0);

  return (
    <article>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Item Database</h1>
        <p className="mt-2 text-muted-foreground">
          All {itemsData.length} items — search, filter, and explore effects,
          recipes, and drop sources.
        </p>
      </header>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Search items by name or description..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); resetPage(); setExpandedId(null); }}
          className="max-w-md"
        />
      </div>

      {/* Type filters */}
      <div className="mb-2 flex flex-wrap gap-1.5">
        <button
          onClick={() => { setTypeFilter(null); resetPage(); }}
          className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${!typeFilter ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
        >
          All Types
        </button>
        {ALL_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => { setTypeFilter(typeFilter === t ? null : t); resetPage(); }}
            className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${typeFilter === t ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Rarity filters */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        <button
          onClick={() => { setRarityFilter(null); resetPage(); }}
          className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${!rarityFilter ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
        >
          All Rarities
        </button>
        {ALL_RARITIES.map((r) => (
          <button
            key={r}
            onClick={() => { setRarityFilter(rarityFilter === r ? null : r); resetPage(); }}
            className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${rarityFilter === r ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filtered.length} of {itemsData.length} items
        {totalPages > 1 && ` — page ${page + 1} of ${totalPages}`}
      </p>

      {/* Item grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((item) => (
          <ItemCard
            key={item.index}
            item={item}
            expanded={expandedId === item.index}
            onToggle={() => setExpandedId(expandedId === item.index ? null : item.index)}
            recipes={recipeMap[item.index] || []}
            imgError={imgErrors.has(item.index)}
            onImgError={() => setImgErrors((s) => new Set(s).add(item.index))}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-3 py-1.5 text-sm rounded-md border border-border disabled:opacity-30 hover:bg-accent"
          >
            Prev
          </button>
          <span className="text-sm text-muted-foreground">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="px-3 py-1.5 text-sm rounded-md border border-border disabled:opacity-30 hover:bg-accent"
          >
            Next
          </button>
        </div>
      )}
    </article>
  );
}

function ItemCard({
  item,
  expanded,
  onToggle,
  recipes,
  imgError,
  onImgError,
}: {
  item: Item;
  expanded: boolean;
  onToggle: () => void;
  recipes: { as: string; recipe: Recipe }[];
  imgError: boolean;
  onImgError: () => void;
}) {
  return (
    <div
      className={`rounded-lg border transition-colors cursor-pointer ${expanded ? "border-foreground/30 bg-accent/30" : "border-border bg-card hover:border-foreground/15"}`}
      onClick={onToggle}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 p-3">
        {/* Item image */}
        <div className="w-10 h-10 shrink-0 rounded bg-muted/50 flex items-center justify-center overflow-hidden">
          {!imgError ? (
            <Image
              src={itemImagePath(item.name)}
              alt={item.name}
              width={40}
              height={40}
              className="object-contain"
              onError={onImgError}
              unoptimized
            />
          ) : (
            <span className="text-xs text-muted-foreground">?</span>
          )}
        </div>

        {/* Name + badges */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{item.name}</p>
          <div className="flex gap-1.5 mt-0.5">
            {item.type && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${TYPE_COLORS[item.type] || "bg-gray-700 text-gray-200"}`}>
                {item.type}
              </span>
            )}
            {item.rarity && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${RARITY_COLORS[item.rarity] || "bg-gray-700 text-gray-200"}`}>
                {item.rarity}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-border p-3 text-sm space-y-3" onClick={(e) => e.stopPropagation()}>
          <p className="text-muted-foreground">{item.description}</p>

          {item.forTarget && (
            <div>
              <span className="text-xs text-muted-foreground">Target: </span>
              <Badge variant="outline" className="text-xs">{item.forTarget}</Badge>
            </div>
          )}

          {item.flags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.flags.map((f) => (
                <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
              ))}
            </div>
          )}

          {item.effects.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Effects</p>
              <div className="space-y-1">
                {item.effects.map((e, i) => (
                  <div key={i} className="text-xs flex items-center gap-2 text-muted-foreground">
                    <Badge variant="outline" className="text-[10px] shrink-0">{e.type}</Badge>
                    <span>{e.name}</span>
                    {e.value !== 0 && <span className="font-mono">{e.value > 0 ? "+" : ""}{e.value}</span>}
                    {e.terminator && <span className="text-muted-foreground/60">until {e.terminator}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {recipes.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Recipes</p>
              <div className="space-y-1">
                {recipes.map(({ as: role, recipe }, i) => (
                  <div key={i} className="text-xs text-muted-foreground">
                    <Badge
                      variant="outline"
                      className={`text-[10px] mr-1 ${role === "output" ? "text-green-400 border-green-400/30" : role === "tool" ? "text-amber-400 border-amber-400/30" : "text-blue-400 border-blue-400/30"}`}
                    >
                      {role === "output" ? "Crafted by" : role === "tool" ? "Tool for" : "Used in"}
                    </Badge>
                    {recipe.name}
                    {role === "output" && (
                      <span className="text-muted-foreground/60 ml-1">
                        ({recipe.inputs.map((inp) => `${inp.amount}× ${inp.name}`).join(", ")})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
