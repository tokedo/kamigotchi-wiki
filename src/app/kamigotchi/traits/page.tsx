"use client";

import { useState, useMemo } from "react";
import {
  MechanicPage,
  InfoBox,
  FormulaBlock,
  StatTable,
} from "@/components/mechanic-page";
import traitsData from "@/data/traits.json";

interface Trait {
  index: number;
  name: string;
  category: string;
  affinity: string;
  rarity: string;
  tier: number;
  health: number;
  power: number;
  violence: number;
  harmony: number;
  slots: number;
  hex: string | null;
  bps: number;
}

const traits = traitsData as Trait[];

const categories = ["All", ...Array.from(new Set(traits.map((t) => t.category)))];
const rarities = ["All", ...Array.from(new Set(traits.map((t) => t.rarity)))];
const affinities = ["All", ...Array.from(new Set(traits.map((t) => t.affinity).filter(Boolean)))];

export default function TraitsPage() {
  return (
    <MechanicPage
      title="Traits"
      subtitle="135 unique traits across 5 categories that define your Kami"
      overview={<Overview />}
      details={<Details />}
    />
  );
}

function Overview() {
  return (
    <>
      <h2>What Are Traits?</h2>
      <p>
        Every Kami is born with exactly <strong>5 traits</strong>, one from each
        category. Traits are permanent — they never change after creation.
        Together, they determine your Kami&apos;s appearance, base stats, and
        affinities.
      </p>

      <h2>The 5 Categories</h2>
      <StatTable
        headers={["Category", "Count", "Determines"]}
        rows={[
          ["Face", "35 variants", "Appearance + stat modifiers"],
          ["Hand", "26 variants", "Appearance + stat modifiers + hand affinity"],
          ["Body", "29 variants", "Appearance + stat modifiers + body affinity"],
          ["Background", "27 variants", "Appearance + stat modifiers"],
          ["Color", "13 variants", "Color scheme + stat modifiers"],
        ]}
      />
      <p>
        That&apos;s <strong>135 total traits</strong> across all categories,
        creating millions of possible combinations.
      </p>

      <h2>How Traits Affect Stats</h2>
      <p>
        Each trait can modify up to five stats: Health, Power, Violence, Harmony,
        and Slots. These modifiers are added to your Kami&apos;s base stats at
        creation. Some traits give big bonuses to one stat, while others spread
        smaller bonuses across multiple stats.
      </p>

      <InfoBox variant="tip">
        When evaluating a Kami, add up all the trait stat deltas across its 5
        traits. A Kami with +40 Health from its body trait and +4 Violence from
        its hand trait will have very different gameplay than one with balanced
        stats.
      </InfoBox>

      <h2>Rarity</h2>
      <p>
        Traits come in different rarities. Rarer traits generally have stronger
        stat bonuses but are less likely to appear when a new Kami is created:
      </p>
      <ul>
        <li><strong>Common</strong> — Most frequently rolled, modest stat bonuses</li>
        <li><strong>Uncommon</strong> — Less frequent, slightly better stats</li>
        <li><strong>Rare</strong> — Notably less common, good stat bonuses</li>
        <li><strong>Epic</strong> — Quite scarce, strong stat bonuses</li>
        <li><strong>Legendary</strong> — Extremely rare, powerful stat bonuses</li>
      </ul>

      <h2>Affinity Traits</h2>
      <p>
        Body and Hand traits each carry an <strong>affinity type</strong> (Eerie,
        Scrap, Insect, or Normal). These affinities affect your harvesting
        efficiency and combat effectiveness. See the{" "}
        <a href="/kamigotchi/types" className="text-primary underline">
          Affinity Types
        </a>{" "}
        page for details.
      </p>

      <h2>Browse All Traits</h2>
      <p>
        Use the interactive table below to explore all 135 traits. Filter by
        category, rarity, or affinity, and sort by any column to find the traits
        that matter most to you.
      </p>
      <TraitBrowser />
    </>
  );
}

function Details() {
  return (
    <>
      <h2>Trait Rolling Mechanics</h2>
      <p>
        When a Kami is created, each of its 5 trait slots is filled via
        <strong> weighted random selection</strong> from the trait registry.
      </p>
      <FormulaBlock label="Weight Formula">
        {"weight = rarity > 0 ? 2^(rarity - 1) : 0\n\nRarity value → Weight:\n  1  → 1    (Legendary)\n  2  → 2\n  3  → 4\n  4  → 8\n  5  → 16\n  6  → 32   (Epic)\n  7  → 64\n  8  → 128\n  9  → 256  (Common)\n  10 → 512\n\nHigher weight = more likely to be selected.\nRarity 0 = zero weight (cannot appear)."}
      </FormulaBlock>

      <FormulaBlock label="Randomness Seed">
        {"seed = keccak256(blockhash(block.number - 1), kamiEntityID)\n\nFor each trait slot i in [FACE, HAND, BODY, BACKGROUND, COLOR]:\n  traitSeed = keccak256(seed, i)\n  trait[i] = weightedRandomSelect(registeredTraits[type], traitSeed)"}
      </FormulaBlock>

      <h2>Trait Properties (Registry)</h2>
      <StatTable
        headers={["Field", "Type", "Description"]}
        rows={[
          ["name", "string", "Display name"],
          ["health", "int32", "Stat delta applied to base health"],
          ["power", "int32", "Stat delta applied to base power"],
          ["violence", "int32", "Stat delta applied to base violence"],
          ["harmony", "int32", "Stat delta applied to base harmony"],
          ["slots", "int32", "Stat delta applied to base slots"],
          ["rarity", "uint256", "Weight for random selection (higher = more common)"],
          ["affinity", "string", "Affinity tag (Body and Hand traits only)"],
        ]}
      />

      <h2>Stat Computation at Creation</h2>
      <FormulaBlock label="Initial Stat Calculation">
        {"Base stats: Health=50, Power=10, Violence=10, Harmony=10, Slots=0\n\nFinal stat = base + sum(traitDelta[i] for each of 5 traits)\n\nHealth.sync = Health.base (starts full)\nSlots.sync  = Slots.base  (starts full)"}
      </FormulaBlock>

      <h2>Full Trait Database</h2>
      <TraitBrowser />
    </>
  );
}

function TraitBrowser() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [rarityFilter, setRarityFilter] = useState("All");
  const [affinityFilter, setAffinityFilter] = useState("All");
  const [sortKey, setSortKey] = useState<keyof Trait>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filteredTraits = useMemo(() => {
    let result = traits;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(q));
    }
    if (categoryFilter !== "All") {
      result = result.filter((t) => t.category === categoryFilter);
    }
    if (rarityFilter !== "All") {
      result = result.filter((t) => t.rarity === rarityFilter);
    }
    if (affinityFilter !== "All") {
      result = result.filter((t) => t.affinity === affinityFilter);
    }

    result = [...result].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc"
        ? (av as number) - (bv as number)
        : (bv as number) - (av as number);
    });

    return result;
  }, [search, categoryFilter, rarityFilter, affinityFilter, sortKey, sortDir]);

  const toggleSort = (key: keyof Trait) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortIndicator = (key: keyof Trait) => {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " \u25B2" : " \u25BC";
  };

  return (
    <div className="not-prose my-6">
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search traits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All Categories" : c}
            </option>
          ))}
        </select>
        <select
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
          className="rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {rarities.map((r) => (
            <option key={r} value={r}>
              {r === "All" ? "All Rarities" : r}
            </option>
          ))}
        </select>
        <select
          value={affinityFilter}
          onChange={(e) => setAffinityFilter(e.target.value)}
          className="rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {affinities.map((a) => (
            <option key={a} value={a}>
              {a === "All" ? "All Affinities" : a}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-2 text-sm text-muted-foreground">
        Showing {filteredTraits.length} of {traits.length} traits
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {(
                [
                  ["name", "Name"],
                  ["category", "Category"],
                  ["affinity", "Affinity"],
                  ["rarity", "Rarity"],
                  ["health", "HP"],
                  ["power", "PWR"],
                  ["violence", "VIO"],
                  ["harmony", "HAR"],
                  ["slots", "SLT"],
                ] as [keyof Trait, string][]
              ).map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key)}
                  className="cursor-pointer select-none px-3 py-2 text-left font-medium hover:bg-muted/80"
                >
                  {label}
                  {sortIndicator(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTraits.map((t) => (
              <tr
                key={`${t.category}-${t.index}`}
                className="border-b border-border last:border-0 hover:bg-muted/30"
              >
                <td className="px-3 py-1.5 font-medium">{t.name}</td>
                <td className="px-3 py-1.5">{t.category}</td>
                <td className="px-3 py-1.5">{t.affinity || "—"}</td>
                <td className="px-3 py-1.5">
                  <span
                    className={
                      t.rarity === "Legendary"
                        ? "text-amber-400 font-semibold"
                        : t.rarity === "Epic"
                          ? "text-purple-400 font-semibold"
                          : t.rarity === "Rare"
                            ? "text-blue-400"
                            : t.rarity === "Uncommon"
                              ? "text-green-400"
                              : "text-muted-foreground"
                    }
                  >
                    {t.rarity}
                  </span>
                </td>
                <td className="px-3 py-1.5 tabular-nums">
                  {t.health !== 0 ? (
                    <span className={t.health > 0 ? "text-green-400" : "text-red-400"}>
                      {t.health > 0 ? `+${t.health}` : t.health}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-1.5 tabular-nums">
                  {t.power !== 0 ? (
                    <span className={t.power > 0 ? "text-green-400" : "text-red-400"}>
                      {t.power > 0 ? `+${t.power}` : t.power}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-1.5 tabular-nums">
                  {t.violence !== 0 ? (
                    <span className={t.violence > 0 ? "text-green-400" : "text-red-400"}>
                      {t.violence > 0 ? `+${t.violence}` : t.violence}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-1.5 tabular-nums">
                  {t.harmony !== 0 ? (
                    <span className={t.harmony > 0 ? "text-green-400" : "text-red-400"}>
                      {t.harmony > 0 ? `+${t.harmony}` : t.harmony}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-1.5 tabular-nums">
                  {t.slots !== 0 ? (
                    <span className={t.slots > 0 ? "text-green-400" : "text-red-400"}>
                      {t.slots > 0 ? `+${t.slots}` : t.slots}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
