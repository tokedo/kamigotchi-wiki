"use client";

import { useState, useMemo } from "react";
import items from "@/data/items.json";
import recipes from "@/data/recipes.json";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Effect {
  name: string;
  type: string;
  descriptor: string;
  index: number;
  value: number;
  terminator: string | null;
  droptable: string | null;
}

interface Item {
  index: number;
  name: string;
  type: string;
  rarity: string;
  forTarget: string | null;
  flags: string[];
  effects: Effect[];
  requirements: string | null;
  status: string;
  description: string;
}

interface RecipeRef {
  index: number;
  name: string;
  amount: number;
}

interface Recipe {
  index: number;
  name: string;
  status: string;
  type: string;
  output: RecipeRef;
  inputs: RecipeRef[];
  staminaCost: number;
  xpOutput: number;
  tool: { index: number; name: string };
  minLevel: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ITEMS_PER_PAGE = 25;

const ALL_TYPES = [
  "All",
  "Consumable",
  "Equipment",
  "ERC20",
  "Food",
  "Key Item",
  "Lootbox",
  "Material",
  "Misc",
  "NFT",
  "Potion",
  "Revive",
  "Tool",
] as const;

const ALL_RARITIES = [
  "All",
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary",
] as const;

/* ------------------------------------------------------------------ */
/*  Rarity styling                                                     */
/* ------------------------------------------------------------------ */

function rarityClasses(rarity: string): string {
  switch (rarity) {
    case "Common":
      return "bg-zinc-600/40 text-zinc-200 border-zinc-500/40";
    case "Uncommon":
      return "bg-green-600/20 text-green-300 border-green-500/30";
    case "Rare":
      return "bg-blue-600/20 text-blue-300 border-blue-500/30";
    case "Epic":
      return "bg-purple-600/20 text-purple-300 border-purple-500/30";
    case "Legendary":
      return "bg-amber-600/20 text-amber-300 border-amber-500/30";
    default:
      return "bg-zinc-600/40 text-zinc-200 border-zinc-500/40";
  }
}

function typeClasses(type: string): string {
  switch (type) {
    case "Food":
      return "bg-orange-600/20 text-orange-300 border-orange-500/30";
    case "Potion":
      return "bg-fuchsia-600/20 text-fuchsia-300 border-fuchsia-500/30";
    case "Equipment":
      return "bg-sky-600/20 text-sky-300 border-sky-500/30";
    case "Material":
      return "bg-stone-600/20 text-stone-300 border-stone-500/30";
    case "Consumable":
      return "bg-teal-600/20 text-teal-300 border-teal-500/30";
    case "Tool":
      return "bg-yellow-600/20 text-yellow-300 border-yellow-500/30";
    case "Key Item":
      return "bg-rose-600/20 text-rose-300 border-rose-500/30";
    case "Lootbox":
      return "bg-indigo-600/20 text-indigo-300 border-indigo-500/30";
    case "Revive":
      return "bg-emerald-600/20 text-emerald-300 border-emerald-500/30";
    case "NFT":
      return "bg-violet-600/20 text-violet-300 border-violet-500/30";
    case "ERC20":
      return "bg-cyan-600/20 text-cyan-300 border-cyan-500/30";
    default:
      return "bg-zinc-600/20 text-zinc-300 border-zinc-500/30";
  }
}

/* ------------------------------------------------------------------ */
/*  Human-readable helpers                                             */
/* ------------------------------------------------------------------ */

function formatTarget(target: string | null): string {
  if (!target) return "None";
  switch (target) {
    case "Kami":
      return "Kami";
    case "Account":
      return "Account";
    case "Enemy_Kami":
      return "Enemy Kami";
    case "Kami_Pet_Slot":
      return "Kami (Pet Slot)";
    case "Passport_slot":
      return "Passport Slot";
    default:
      return target.replace(/_/g, " ");
  }
}

function formatFlag(flag: string): string {
  switch (flag) {
    case "NOT_TRADABLE":
      return "Not Tradable";
    case "BYPASS_BONUS_RESET":
      return "Bypass Bonus Reset";
    default:
      return flag.replace(/_/g, " ");
  }
}

function formatEffectType(type: string): string {
  switch (type) {
    case "STAT":
      return "Stat";
    case "STATE":
      return "State";
    case "BONUS":
      return "Bonus";
    case "COOLDOWN":
      return "Cooldown";
    case "ITEM":
      return "Item";
    case "ITEM_DROPTABLE":
      return "Drop Table";
    case "VIP":
      return "VIP";
    case "XP":
      return "XP";
    default:
      return type;
  }
}

function formatRequirement(req: string | null): string {
  if (!req) return "";
  return req.replace(/_/g, " ");
}

/* ------------------------------------------------------------------ */
/*  Recipe lookup — build once                                         */
/* ------------------------------------------------------------------ */

type RecipeRelation = {
  recipe: Recipe;
  role: "input" | "output" | "tool";
};

function buildRecipeLookup(allRecipes: Recipe[]): Map<number, RecipeRelation[]> {
  const map = new Map<number, RecipeRelation[]>();

  function add(itemIndex: number, relation: RecipeRelation) {
    const list = map.get(itemIndex) ?? [];
    list.push(relation);
    map.set(itemIndex, list);
  }

  for (const recipe of allRecipes) {
    add(recipe.output.index, { recipe, role: "output" });
    for (const input of recipe.inputs) {
      add(input.index, { recipe, role: "input" });
    }
    if (recipe.tool) {
      add(recipe.tool.index, { recipe, role: "tool" });
    }
  }

  return map;
}

/* ------------------------------------------------------------------ */
/*  Expanded detail panel                                              */
/* ------------------------------------------------------------------ */

function ItemDetail({
  item,
  recipeRelations,
}: {
  item: Item;
  recipeRelations: RecipeRelation[];
}) {
  const inputRecipes = recipeRelations.filter((r) => r.role === "input");
  const outputRecipes = recipeRelations.filter((r) => r.role === "output");
  const toolRecipes = recipeRelations.filter((r) => r.role === "tool");

  return (
    <div className="grid gap-6 p-5 sm:grid-cols-2">
      {/* Left column */}
      <div className="space-y-4">
        {/* Description */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            Description
          </h4>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {item.description || "No description available."}
          </p>
        </div>

        {/* Target */}
        {item.forTarget && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
              Use Target
            </h4>
            <p className="text-sm">{formatTarget(item.forTarget)}</p>
          </div>
        )}

        {/* Requirements */}
        {item.requirements && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
              Requirements
            </h4>
            <Badge
              variant="outline"
              className="text-amber-300 border-amber-500/30"
            >
              {formatRequirement(item.requirements)}
            </Badge>
          </div>
        )}

        {/* Flags */}
        {item.flags.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
              Flags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.flags.map((flag) => (
                <Badge
                  key={flag}
                  variant="outline"
                  className="text-rose-300 border-rose-500/30"
                >
                  {formatFlag(flag)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Status */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            Status
          </h4>
          <Badge
            variant="outline"
            className={
              item.status === "In Game"
                ? "text-green-300 border-green-500/30"
                : "text-yellow-300 border-yellow-500/30"
            }
          >
            {item.status}
          </Badge>
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-4">
        {/* Effects */}
        {item.effects.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Effects
            </h4>
            <div className="space-y-1.5">
              {item.effects.map((effect, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-1.5 text-sm"
                >
                  <Badge
                    variant="secondary"
                    className="text-xs shrink-0"
                  >
                    {formatEffectType(effect.type)}
                  </Badge>
                  <span className="font-medium text-foreground/90">
                    {effect.name}
                  </span>
                  {effect.value !== 0 && (
                    <span className="text-muted-foreground">
                      ({effect.value > 0 ? "+" : ""}
                      {effect.value})
                    </span>
                  )}
                  {effect.terminator && (
                    <span className="text-xs text-muted-foreground">
                      until {effect.terminator}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recipe relations */}
        {recipeRelations.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Used in Recipes
            </h4>
            <div className="space-y-1.5">
              {/* As output (crafted from) */}
              {outputRecipes.map((rel) => (
                <div
                  key={`out-${rel.recipe.index}`}
                  className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className="text-emerald-300 border-emerald-500/30 text-xs"
                    >
                      Crafted by
                    </Badge>
                    <span className="font-medium">{rel.recipe.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Inputs:{" "}
                    {rel.recipe.inputs
                      .map((inp) => `${inp.name} x${inp.amount}`)
                      .join(", ")}
                    {" | "}Tool: {rel.recipe.tool.name}
                    {" | "}Stamina: {rel.recipe.staminaCost}
                    {" | "}XP: {rel.recipe.xpOutput}
                    {" | "}Min Level: {rel.recipe.minLevel}
                  </p>
                </div>
              ))}

              {/* As input (used to craft) */}
              {inputRecipes.map((rel) => (
                <div
                  key={`in-${rel.recipe.index}`}
                  className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className="text-blue-300 border-blue-500/30 text-xs"
                    >
                      Ingredient for
                    </Badge>
                    <span className="font-medium">{rel.recipe.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Output: {rel.recipe.output.name} x{rel.recipe.output.amount}
                    {" | "}Tool: {rel.recipe.tool.name}
                    {" | "}Stamina: {rel.recipe.staminaCost}
                    {" | "}XP: {rel.recipe.xpOutput}
                  </p>
                </div>
              ))}

              {/* As tool */}
              {toolRecipes.map((rel) => (
                <div
                  key={`tool-${rel.recipe.index}`}
                  className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className="text-yellow-300 border-yellow-500/30 text-xs"
                    >
                      Tool for
                    </Badge>
                    <span className="font-medium">{rel.recipe.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Output: {rel.recipe.output.name} x{rel.recipe.output.amount}
                    {" | "}Stamina: {rel.recipe.staminaCost}
                    {" | "}XP: {rel.recipe.xpOutput}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder for scavenge drops — to be connected later */}
        {item.effects.length === 0 && recipeRelations.length === 0 && (
          <div className="text-sm text-muted-foreground italic">
            No effects or recipe associations for this item.
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ItemDatabasePage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [rarityFilter, setRarityFilter] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const recipeLookup = useMemo(
    () => buildRecipeLookup(recipes as Recipe[]),
    []
  );

  const typedItems = items as Item[];

  /* Filter logic */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return typedItems.filter((item) => {
      if (q && !item.name.toLowerCase().includes(q)) return false;
      if (typeFilter !== "All" && item.type !== typeFilter) return false;
      if (rarityFilter !== "All" && item.rarity !== rarityFilter) return false;
      return true;
    });
  }, [search, typeFilter, rarityFilter, typedItems]);

  /* Pagination */
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  /* Reset page when filters change */
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    setExpandedIndex(null);
  };
  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    setPage(1);
    setExpandedIndex(null);
  };
  const handleRarityFilter = (rarity: string) => {
    setRarityFilter(rarity);
    setPage(1);
    setExpandedIndex(null);
  };

  return (
    <article>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Item Database</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          All {typedItems.length} items &mdash; search, filter, and explore
        </p>
      </header>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Search items by name..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-md h-10 text-sm"
        />
      </div>

      {/* Type filter */}
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          Type
        </p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => handleTypeFilter(t)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                typeFilter === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted/30 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Rarity filter */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          Rarity
        </p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_RARITIES.map((r) => (
            <button
              key={r}
              onClick={() => handleRarityFilter(r)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                rarityFilter === r
                  ? r === "All"
                    ? "border-primary bg-primary text-primary-foreground"
                    : `border-transparent ${rarityClasses(r)}`
                  : "border-border bg-muted/30 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {filtered.length}
          </span>{" "}
          of {typedItems.length} items
          {filtered.length > ITEMS_PER_PAGE && (
            <span>
              {" "}
              &middot; Page {safePage} of {totalPages}
            </span>
          )}
        </p>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[280px]">Name</TableHead>
              <TableHead className="w-[110px]">Type</TableHead>
              <TableHead className="w-[110px]">Rarity</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No items match your filters.
                </TableCell>
              </TableRow>
            )}
            {pageItems.map((item) => {
              const isExpanded = expandedIndex === item.index;
              return (
                <ItemRow
                  key={item.index}
                  item={item}
                  isExpanded={isExpanded}
                  onToggle={() =>
                    setExpandedIndex(isExpanded ? null : item.index)
                  }
                  recipeRelations={recipeLookup.get(item.index) ?? []}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1">
          <button
            onClick={() => setPage(1)}
            disabled={safePage === 1}
            className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            First
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {paginationRange(safePage, totalPages).map((p, i) =>
            p === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="px-1.5 text-xs text-muted-foreground"
              >
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p as number)}
                className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  safePage === p
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={safePage === totalPages}
            className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Item row (with expandable detail)                                  */
/* ------------------------------------------------------------------ */

function ItemRow({
  item,
  isExpanded,
  onToggle,
  recipeRelations,
}: {
  item: Item;
  isExpanded: boolean;
  onToggle: () => void;
  recipeRelations: RecipeRelation[];
}) {
  return (
    <>
      <TableRow
        onClick={onToggle}
        className={`cursor-pointer ${
          isExpanded ? "bg-muted/40 hover:bg-muted/40" : ""
        }`}
      >
        <TableCell>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                item.rarity === "Common"
                  ? "bg-zinc-400"
                  : item.rarity === "Uncommon"
                  ? "bg-green-400"
                  : item.rarity === "Rare"
                  ? "bg-blue-400"
                  : item.rarity === "Epic"
                  ? "bg-purple-400"
                  : "bg-amber-400"
              }`}
            />
            <span className="font-medium">{item.name}</span>
            {item.effects.length > 0 && (
              <span className="text-xs text-muted-foreground" title="Has effects">
                *
              </span>
            )}
          </div>
        </TableCell>
        <TableCell>
          <Badge
            variant="outline"
            className={`text-xs ${typeClasses(item.type)}`}
          >
            {item.type}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge
            variant="outline"
            className={`text-xs ${rarityClasses(item.rarity)}`}
          >
            {item.rarity}
          </Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <span className="text-sm text-muted-foreground line-clamp-1">
            {item.description || "\u2014"}
          </span>
        </TableCell>
      </TableRow>

      {/* Expanded detail row */}
      {isExpanded && (
        <TableRow className="bg-muted/20 hover:bg-muted/20">
          <TableCell colSpan={4} className="p-0">
            <ItemDetail item={item} recipeRelations={recipeRelations} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Pagination range helper                                            */
/* ------------------------------------------------------------------ */

function paginationRange(
  current: number,
  total: number
): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  // Always show first page
  pages.push(1);

  if (current > 3) {
    pages.push("...");
  }

  // Pages around current
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  // Always show last page
  if (total > 1) {
    pages.push(total);
  }

  return pages;
}
