"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import itemsData from "@/data/items.json";
import recipesData from "@/data/recipes.json";
import { itemImagePath } from "@/lib/images";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

type Item = (typeof itemsData)[number];
type Recipe = (typeof recipesData)[number];

/* ------------------------------------------------------------------ */
/*  Rarity → border color (game-style tile borders)                    */
/* ------------------------------------------------------------------ */

const RARITY_BORDER: Record<string, string> = {
  Common: "#6b6b6b",
  Uncommon: "#6b6b6b",
  Rare: "#8b4513",
  Epic: "#d946a8",
  Legendary: "#d4c088",
};

const RARITY_BG: Record<string, string> = {
  Common: "#a8a8a8",
  Uncommon: "#a8a8a8",
  Rare: "#a8a8a8",
  Epic: "#a8a8a8",
  Legendary: "#b8b0a0",
};

const RARITY_GLOW: Record<string, string> = {
  Epic: "0 0 6px rgba(217, 70, 168, 0.4)",
  Legendary: "0 0 8px rgba(212, 192, 136, 0.5)",
};

const ALL_TYPES = [
  ...new Set(itemsData.map((i) => i.type).filter(Boolean)),
].sort();
const ALL_RARITIES = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

/* ------------------------------------------------------------------ */
/*  Recipe lookup                                                      */
/* ------------------------------------------------------------------ */

const recipeMap: Record<number, { as: string; recipe: Recipe }[]> = {};
for (const r of recipesData) {
  const add = (idx: number, role: string) => {
    if (!recipeMap[idx]) recipeMap[idx] = [];
    recipeMap[idx].push({ as: role, recipe: r });
  };
  add(r.output.index, "output");
  for (const inp of r.inputs) add(inp.index, "input");
  if (r.tool) add(r.tool.index, "tool");
}

/* ------------------------------------------------------------------ */
/*  Inventory tile                                                     */
/* ------------------------------------------------------------------ */

function InventoryTile({
  item,
  isSelected,
  onSelect,
}: {
  item: Item;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);
  const border = RARITY_BORDER[item.rarity] ?? "#6b6b6b";
  const bg = RARITY_BG[item.rarity] ?? "#a8a8a8";
  const glow = RARITY_GLOW[item.rarity];
  const isLegendary = item.rarity === "Legendary";

  return (
    <button
      onClick={onSelect}
      className="relative aspect-square cursor-pointer transition-transform hover:scale-105 active:scale-95"
      style={{
        border: isSelected
          ? "3px solid rgba(100, 200, 255, 0.9)"
          : isLegendary
            ? `3px solid ${border}`
            : `2px solid ${border}`,
        borderRadius: 4,
        backgroundColor: isSelected ? "rgba(100, 200, 255, 0.15)" : bg,
        boxShadow: isSelected
          ? "0 0 10px rgba(100, 200, 255, 0.5), inset 0 1px 2px rgba(0,0,0,0.2)"
          : glow
            ? `${glow}, inset 0 1px 2px rgba(0,0,0,0.15)`
            : "inset 0 1px 2px rgba(0,0,0,0.15)",
      }}
      title={item.name}
    >
      {/* Item icon */}
      <div className="absolute inset-1 flex items-center justify-center">
        {!imgErr ? (
          <Image
            src={itemImagePath(item.name)}
            alt={item.name}
            width={64}
            height={64}
            className="object-contain w-full h-full"
            style={{ imageRendering: "pixelated" }}
            onError={() => setImgErr(true)}
            unoptimized
          />
        ) : (
          <span className="text-[10px] text-white/30 text-center leading-tight px-1">
            {item.name}
          </span>
        )}
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Item detail panel (game-style)                                     */
/* ------------------------------------------------------------------ */

function ItemDetail({
  item,
  onClose,
}: {
  item: Item;
  onClose: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);
  const recipes = recipeMap[item.index] || [];
  const border = RARITY_BORDER[item.rarity] ?? "rgba(150,150,150,0.4)";

  return (
    <div
      className="rounded-lg overflow-hidden shadow-2xl"
      style={{
        border: `2px solid ${border}`,
        backgroundColor: "#1a1a2e",
      }}
    >
      {/* Header: icon + name + type */}
      <div className="flex gap-3 p-3">
        {/* Item icon */}
        <div
          className="w-16 h-16 shrink-0 rounded-md flex items-center justify-center overflow-hidden"
          style={{
            border: `2px solid ${border}`,
            backgroundColor: "rgba(120, 120, 120, 0.15)",
          }}
        >
          {!imgErr ? (
            <Image
              src={itemImagePath(item.name)}
              alt={item.name}
              width={56}
              height={56}
              className="object-contain"
              style={{ imageRendering: "pixelated" }}
              onError={() => setImgErr(true)}
              unoptimized
            />
          ) : (
            <span className="text-xs text-white/30">?</span>
          )}
        </div>

        {/* Name + type */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3 className="text-base font-bold text-white leading-tight">
              {item.name}
            </h3>
            <button
              onClick={onClose}
              className="p-0.5 rounded text-white/40 hover:text-white transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {item.type && (
              <span className="text-xs text-white/50">
                Type: <span className="text-white/70 uppercase">{item.type}</span>
              </span>
            )}
          </div>
          {item.rarity && (
            <span className="text-[11px] text-white/40">
              {item.rarity}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-3 pb-2">
        <p className="text-xs text-white/50 leading-relaxed italic">
          {item.description}
        </p>
      </div>

      <div className="border-t border-white/8 mx-3" />

      {/* Requirements & Effects row (game-style boxes) */}
      <div className="p-3 flex gap-2">
        <div className="flex-1 rounded-md bg-white/5 px-2.5 py-2 text-center">
          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">
            Requirements
          </p>
          <p className="text-xs text-white/70">
            {item.requirements || "None"}
          </p>
        </div>
        <div className="flex-1 rounded-md bg-white/5 px-2.5 py-2 text-center">
          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">
            Target
          </p>
          <p className="text-xs text-white/70">
            {item.forTarget || "None"}
          </p>
        </div>
      </div>

      {/* Effects */}
      {item.effects.length > 0 && (
        <div className="px-3 pb-3">
          <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">
            Effects
          </span>
          <div className="mt-1 space-y-1">
            {item.effects.map((e, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs rounded-md bg-white/5 px-2 py-1.5"
              >
                <span className="text-white/40 text-[10px] uppercase shrink-0">
                  {e.type}
                </span>
                <span className="text-white/70 flex-1 min-w-0">
                  {e.name}
                </span>
                {e.value !== 0 && (
                  <span
                    className={`font-mono shrink-0 ${e.value > 0 ? "text-green-400/80" : "text-red-400/80"}`}
                  >
                    {e.value > 0 ? "+" : ""}
                    {e.value}
                  </span>
                )}
                {e.terminator && (
                  <span className="text-white/30 text-[10px] shrink-0">
                    until {e.terminator}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flags */}
      {item.flags.length > 0 && (
        <div className="px-3 pb-3">
          <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">
            Flags
          </span>
          <div className="flex flex-wrap gap-1 mt-1">
            {item.flags.map((f) => (
              <span
                key={f}
                className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/50"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recipes */}
      {recipes.length > 0 && (
        <div className="px-3 pb-3">
          <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">
            Recipes
          </span>
          <div className="mt-1 space-y-1">
            {recipes.map(({ as: role, recipe }, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs rounded-md bg-white/5 px-2 py-1.5"
              >
                <span
                  className={`text-[10px] uppercase shrink-0 mt-0.5 ${
                    role === "output"
                      ? "text-green-400/70"
                      : role === "tool"
                        ? "text-amber-400/70"
                        : "text-blue-400/70"
                  }`}
                >
                  {role === "output"
                    ? "Crafted"
                    : role === "tool"
                      ? "Tool"
                      : "Input"}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-white/70">{recipe.name}</span>
                  {role === "output" && (
                    <p className="text-white/30 text-[10px] mt-0.5">
                      {recipe.inputs
                        .map((inp) => `${inp.amount}× ${inp.name}`)
                        .join(", ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function ItemDatabase() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [rarityFilter, setRarityFilter] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return itemsData.filter((item) => {
      if (
        q &&
        !item.name.toLowerCase().includes(q) &&
        !item.description.toLowerCase().includes(q)
      )
        return false;
      if (typeFilter && item.type !== typeFilter) return false;
      if (rarityFilter && item.rarity !== rarityFilter) return false;
      return true;
    });
  }, [search, typeFilter, rarityFilter]);

  const handleSelect = useCallback((item: Item) => {
    setSelectedItem((prev) =>
      prev?.index === item.index ? null : item
    );
  }, []);

  return (
    <article>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Item Database</h1>
        <p className="mt-2 text-muted-foreground">
          All {itemsData.length} items — click any item to see effects,
          recipes, and requirements.
        </p>
      </header>

      {/* Search */}
      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 pr-8 h-9"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-accent text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-2 flex flex-wrap gap-1.5">
        <button
          onClick={() => setTypeFilter(null)}
          className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
            !typeFilter
              ? "bg-foreground text-background border-foreground"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All Types
        </button>
        {ALL_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(typeFilter === t ? null : t)}
            className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
              typeFilter === t
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        <button
          onClick={() => setRarityFilter(null)}
          className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
            !rarityFilter
              ? "bg-foreground text-background border-foreground"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All Rarities
        </button>
        {ALL_RARITIES.map((r) => (
          <button
            key={r}
            onClick={() =>
              setRarityFilter(rarityFilter === r ? null : r)
            }
            className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
              rarityFilter === r
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground mb-4">
        {filtered.length} of {itemsData.length} items
      </p>

      {/* Main layout: inventory panel + detail panel */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Inventory panel — game-style container */}
        <div
          className="shrink-0 rounded-lg border-2 p-3"
          style={{
            backgroundColor: "#e8e4de",
            borderColor: "#c8c4be",
            width: "fit-content",
          }}
        >
          <div
            className="grid gap-1.5"
            style={{
              gridTemplateColumns: "repeat(6, 72px)",
            }}
          >
            {filtered.map((item) => (
              <InventoryTile
                key={item.index}
                item={item}
                isSelected={selectedItem?.index === item.index}
                onSelect={() => handleSelect(item)}
              />
            ))}
          </div>
        </div>

        {/* Item detail panel */}
        {selectedItem && (
          <div className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-4">
            <ItemDetail
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          </div>
        )}
      </div>
    </article>
  );
}
