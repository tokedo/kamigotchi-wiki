"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

import allQuests from "@/data/quests.json";
import { itemImagePath } from "@/lib/images";
import { Input } from "@/components/ui/input";
import { Search, X, ChevronRight, Target, Gift, Lock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface QuestRequirement {
  description: string;
  type: string | null;
  index: number | null;
  value: number | null;
}

interface QuestObjective {
  description: string;
  deltaType: string;
  type: string;
  index: number;
  value: number;
}

interface QuestReward {
  description: string;
  type: string | null;
  index: number | null;
  value: number | null;
  itemName: string | null;
}

interface Quest {
  key: string;
  index: number;
  status: string;
  title: string;
  daily: boolean;
  type: string;
  giver: string;
  introDialogue: string;
  resolutionDialogue: string;
  requirements: QuestRequirement[];
  objectives: QuestObjective[];
  rewards: QuestReward[];
}

type QuestCategory = "ALL" | "MSQ" | "MIN" | "SQ";

/* ------------------------------------------------------------------ */
/*  Data helpers                                                       */
/* ------------------------------------------------------------------ */

const quests = (allQuests as Quest[]).filter(
  (q) => q.status !== "Test" && !q.key.startsWith("test")
);

const questByIndex = new Map<number, Quest>();
quests.forEach((q) => questByIndex.set(q.index, q));

const questByKey = new Map<string, Quest>();
quests.forEach((q) => questByKey.set(q.key, q));

function getCategory(key: string): "MSQ" | "MIN" | "SQ" {
  if (key.startsWith("MSQ")) return "MSQ";
  if (key.startsWith("MIN")) return "MIN";
  return "SQ";
}

/** Extract all quest dependencies from a requirement list. */
function getQuestDeps(requirements: QuestRequirement[]): Quest[] {
  const seen = new Set<number>();
  const result: Quest[] = [];

  for (const req of requirements) {
    if (req.type === "QUEST" && req.index !== null) {
      const q = questByIndex.get(req.index);
      if (q && !seen.has(q.index)) {
        seen.add(q.index);
        result.push(q);
      }
      continue;
    }
    const parts = req.description.split(",");
    for (const part of parts) {
      const match = part.trim().match(/^Complete\s+(MSQ\d+|MIN\d+|SQ\d+)$/i);
      if (match) {
        const q = questByKey.get(match[1].toUpperCase());
        if (q && !seen.has(q.index)) {
          seen.add(q.index);
          result.push(q);
        }
      }
    }
  }
  return result;
}

/** Split a composite requirement into individual lines with resolved quests. */
function parseRequirementParts(
  req: QuestRequirement
): Array<{ text: string; quest: Quest | null }> {
  if (req.type === "QUEST" && req.index !== null) {
    const q = questByIndex.get(req.index) ?? null;
    return [{ text: q ? q.title : req.description, quest: q }];
  }
  const parts = req.description.split(",").map((s) => s.trim());
  return parts.map((part) => {
    const match = part.match(/^Complete\s+(MSQ\d+|MIN\d+|SQ\d+)$/i);
    if (match) {
      const q = questByKey.get(match[1].toUpperCase()) ?? null;
      return { text: q ? q.title : part, quest: q };
    }
    return { text: part, quest: null };
  });
}

const CATEGORY_COLORS: Record<
  "MSQ" | "MIN" | "SQ",
  { bg: string; border: string; text: string; accent: string; glow: string }
> = {
  MSQ: {
    bg: "rgba(59, 130, 246, 0.15)",
    border: "rgba(59, 130, 246, 0.5)",
    text: "#93c5fd",
    accent: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.2)",
  },
  MIN: {
    bg: "rgba(34, 197, 94, 0.15)",
    border: "rgba(34, 197, 94, 0.5)",
    text: "#86efac",
    accent: "#22c55e",
    glow: "rgba(34, 197, 94, 0.2)",
  },
  SQ: {
    bg: "rgba(245, 158, 11, 0.15)",
    border: "rgba(245, 158, 11, 0.5)",
    text: "#fcd34d",
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.2)",
  },
};

const CATEGORY_LABELS: Record<QuestCategory, string> = {
  ALL: "All Quests",
  MSQ: "Main Story",
  MIN: "Mina's Quests",
  SQ: "Side Quests",
};

/* ------------------------------------------------------------------ */
/*  Graph layout                                                       */
/* ------------------------------------------------------------------ */

const TILE_W = 80;
const TILE_H = 64;
const H_GAP = 80;
const V_GAP = 24;
const COL_PITCH = TILE_W + H_GAP;
const ROW_PITCH = TILE_H + V_GAP;
const GRAPH_PAD = 20;

interface GraphEdge {
  from: number;
  to: number;
}

interface GraphLayout {
  positions: Map<number, { x: number; y: number }>;
  edges: GraphEdge[];
  totalW: number;
  totalH: number;
}

function computeGraphLayout(questList: Quest[]): GraphLayout {
  if (questList.length === 0) {
    return { positions: new Map(), edges: [], totalW: 100, totalH: 100 };
  }

  const indexSet = new Set(questList.map((q) => q.index));
  const depthOf = new Map<number, number>();

  function getDepth(q: Quest): number {
    if (depthOf.has(q.index)) return depthOf.get(q.index)!;
    const deps = getQuestDeps(q.requirements).filter((d) =>
      indexSet.has(d.index)
    );
    const depth =
      deps.length === 0 ? 0 : Math.max(...deps.map(getDepth)) + 1;
    depthOf.set(q.index, depth);
    return depth;
  }

  questList.forEach((q) => getDepth(q));

  // Group by depth
  const columns = new Map<number, Quest[]>();
  questList.forEach((q) => {
    const d = depthOf.get(q.index) ?? 0;
    if (!columns.has(d)) columns.set(d, []);
    columns.get(d)!.push(q);
  });

  // Sort within columns by category then index
  const catOrder: Record<string, number> = { MSQ: 0, MIN: 1, SQ: 2 };
  columns.forEach((col) => {
    col.sort((a, b) => {
      const ca = catOrder[getCategory(a.key)] ?? 2;
      const cb = catOrder[getCategory(b.key)] ?? 2;
      if (ca !== cb) return ca - cb;
      return a.index - b.index;
    });
  });

  // Compute positions
  const positions = new Map<number, { x: number; y: number }>();
  const maxDepth = Math.max(...depthOf.values());

  for (let d = 0; d <= maxDepth; d++) {
    const col = columns.get(d) ?? [];
    col.forEach((q, i) => {
      positions.set(q.index, {
        x: GRAPH_PAD + d * COL_PITCH,
        y: GRAPH_PAD + i * ROW_PITCH,
      });
    });
  }

  // Compute edges
  const edges: GraphEdge[] = [];
  questList.forEach((q) => {
    const deps = getQuestDeps(q.requirements).filter((d) =>
      indexSet.has(d.index)
    );
    deps.forEach((dep) => {
      edges.push({ from: dep.index, to: q.index });
    });
  });

  // Total size
  const maxRowCount = Math.max(
    ...[...columns.values()].map((c) => c.length)
  );
  const totalW = GRAPH_PAD * 2 + maxDepth * COL_PITCH + TILE_W;
  const totalH = GRAPH_PAD * 2 + (maxRowCount - 1) * ROW_PITCH + TILE_H;

  return { positions, edges, totalW, totalH };
}

/* ------------------------------------------------------------------ */
/*  Quest tile                                                         */
/* ------------------------------------------------------------------ */

function QuestTile({
  quest,
  isSelected,
  isDimmed,
  isHighlighted,
  onSelect,
}: {
  quest: Quest;
  isSelected: boolean;
  isDimmed: boolean;
  isHighlighted: boolean;
  onSelect: () => void;
}) {
  const cat = getCategory(quest.key);
  const colors = CATEGORY_COLORS[cat];

  return (
    <button
      onClick={onSelect}
      data-quest-index={quest.index}
      className="relative w-full h-full cursor-pointer transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center p-1 overflow-hidden"
      style={{
        border: isSelected
          ? `3px solid ${colors.accent}`
          : isHighlighted
            ? `2px solid ${colors.accent}`
            : `2px solid ${colors.border}`,
        borderRadius: 4,
        backgroundColor: isSelected ? colors.glow : colors.bg,
        boxShadow: isSelected
          ? `0 0 12px ${colors.glow}, inset 0 1px 2px rgba(0,0,0,0.15)`
          : isHighlighted
            ? `0 0 8px ${colors.glow}`
            : "inset 0 1px 2px rgba(0,0,0,0.15)",
        opacity: isDimmed ? 0.15 : 1,
      }}
      title={`${quest.key}: ${quest.title}`}
    >
      <span
        className="text-[9px] font-bold uppercase tracking-wider leading-none"
        style={{ color: colors.accent }}
      >
        {quest.key}
      </span>
      <span
        className="text-[7px] leading-tight text-center mt-0.5 line-clamp-2"
        style={{ color: colors.text }}
      >
        {quest.title}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Game-style quest detail panel                                      */
/* ------------------------------------------------------------------ */

function QuestDetail({
  quest,
  onClose,
  onSelectQuest,
}: {
  quest: Quest;
  onClose: () => void;
  onSelectQuest: (quest: Quest) => void;
}) {
  const cat = getCategory(quest.key);
  const colors = CATEGORY_COLORS[cat];

  const giverIcon =
    quest.giver === "MINA"
      ? "/img/icons/mina_default.png"
      : quest.giver === "MENU"
        ? "/img/icons/quests.png"
        : quest.giver === "ROB"
          ? "/img/icons/world.png"
          : null;

  return (
    <div
      className="rounded-xl overflow-hidden max-w-full"
      style={{
        border: "3px solid #7a8a6a",
        backgroundColor: "#e8ecd8",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "2px solid #bcc8a8" }}
      >
        <h3
          className="text-lg font-bold text-gray-800 leading-tight italic"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {quest.title}
        </h3>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          {giverIcon && (
            <div
              className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
              style={{
                border: "2px solid #7a8a6a",
                backgroundColor: "#d4dcc4",
              }}
            >
              <Image
                src={giverIcon}
                alt={quest.giver}
                width={24}
                height={24}
                className="object-contain"
                style={{ imageRendering: "pixelated" }}
                unoptimized
              />
            </div>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-black/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      <ScrollArea className="max-h-[70vh]">
        <div className="px-4 py-3 space-y-4">
          {/* Meta badges */}
          <div className="flex flex-wrap gap-1.5">
            <span
              className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold"
              style={{
                backgroundColor: colors.bg,
                color: colors.accent,
                border: `1.5px solid ${colors.border}`,
              }}
            >
              {cat === "MSQ"
                ? "Main Story"
                : cat === "MIN"
                  ? "Mina's Quest"
                  : "Side Quest"}
            </span>
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium bg-gray-800/10 text-gray-600">
              {quest.key}
            </span>
            {quest.giver && (
              <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium bg-gray-800/10 text-gray-600">
                Given by: {quest.giver}
              </span>
            )}
          </div>

          {/* Objectives */}
          {quest.objectives.length > 0 && (
            <section>
              <div className="flex items-center gap-1.5 mb-2">
                <Target className="h-3.5 w-3.5 text-gray-700" />
                <span
                  className="text-sm font-bold text-gray-700 italic"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Objectives
                </span>
              </div>
              <div
                className="rounded-lg p-3 space-y-1.5"
                style={{
                  border: "2px solid #a0aa90",
                  backgroundColor: "#f4f7ec",
                }}
              >
                {quest.objectives.map((obj, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-700"
                  >
                    <ChevronRight className="h-3 w-3 mt-0.5 shrink-0 text-gray-500" />
                    <span>{obj.description}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Rewards */}
          {quest.rewards.length > 0 && (
            <section>
              <div className="flex items-center gap-1.5 mb-2">
                <Gift className="h-3.5 w-3.5 text-gray-700" />
                <span
                  className="text-sm font-bold text-gray-700 italic"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Rewards
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quest.rewards.map((rw, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
                    style={{
                      border: "2px solid #a0aa90",
                      backgroundColor: "#f4f7ec",
                    }}
                  >
                    {rw.itemName && (
                      <div className="w-7 h-7 shrink-0 flex items-center justify-center">
                        <Image
                          src={itemImagePath(rw.itemName)}
                          alt={rw.itemName}
                          width={28}
                          height={28}
                          className="object-contain"
                          style={{ imageRendering: "pixelated" }}
                          unoptimized
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                    )}
                    <span className="text-xs font-medium text-gray-700">
                      {rw.description}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Requirements */}
          {quest.requirements.length > 0 &&
            (() => {
              const allParts = quest.requirements.flatMap((req) =>
                parseRequirementParts(req)
              );
              return (
                <section>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Lock className="h-3.5 w-3.5 text-gray-700" />
                    <span
                      className="text-sm font-bold text-gray-700 italic"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Requirements
                    </span>
                  </div>
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{
                      border: "2px solid #a0aa90",
                      backgroundColor: "#f4f7ec",
                    }}
                  >
                    {allParts.map((part, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs px-3 py-2"
                        style={{
                          borderBottom:
                            i < allParts.length - 1
                              ? "1px solid #c8d4b8"
                              : "none",
                        }}
                      >
                        {part.quest ? (
                          <button
                            onClick={() => onSelectQuest(part.quest!)}
                            className="flex items-center gap-2 text-left hover:underline w-full"
                            style={{ color: "#4a6a2a" }}
                          >
                            <ChevronRight className="h-3 w-3 shrink-0" />
                            <span className="font-medium">{part.text}</span>
                            <span className="text-gray-400 ml-auto text-[10px] shrink-0">
                              {part.quest.key}
                            </span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 text-gray-700">
                            <ChevronRight className="h-3 w-3 shrink-0 text-gray-500" />
                            <span>{part.text}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })()}
        </div>
      </ScrollArea>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function QuestDatabase() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<QuestCategory>("ALL");
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);

  const filteredQuests = useMemo(() => {
    if (activeCategory === "ALL") return quests;
    return quests.filter((q) => getCategory(q.key) === activeCategory);
  }, [activeCategory]);

  const layout = useMemo(
    () => computeGraphLayout(filteredQuests),
    [filteredQuests]
  );

  const connectedIndices = useMemo(() => {
    if (!selectedQuest) return new Set<number>();
    const set = new Set<number>();
    layout.edges.forEach((e) => {
      if (e.from === selectedQuest.index) set.add(e.to);
      if (e.to === selectedQuest.index) set.add(e.from);
    });
    return set;
  }, [selectedQuest, layout.edges]);

  const searchLower = search.toLowerCase().trim();
  const matchingIndices = useMemo(() => {
    if (!searchLower) return null;
    const set = new Set<number>();
    filteredQuests.forEach((q) => {
      if (
        q.title.toLowerCase().includes(searchLower) ||
        q.key.toLowerCase().includes(searchLower)
      ) {
        set.add(q.index);
      }
    });
    return set;
  }, [filteredQuests, searchLower]);

  const handleSelect = useCallback((quest: Quest) => {
    setSelectedQuest((prev) =>
      prev?.index === quest.index ? null : quest
    );
  }, []);

  const navigateToQuest = useCallback(
    (quest: Quest) => {
      const questCat = getCategory(quest.key);
      if (activeCategory !== "ALL" && activeCategory !== questCat) {
        setActiveCategory("ALL");
      }
      setSelectedQuest(quest);
    },
    [activeCategory]
  );

  // Scroll the selected quest into view in the graph container
  useEffect(() => {
    if (!selectedQuest || !graphContainerRef.current) return;
    const pos = layout.positions.get(selectedQuest.index);
    if (!pos) return;
    const container = graphContainerRef.current;
    container.scrollTo({
      left: pos.x - container.clientWidth / 2 + TILE_W / 2,
      top: pos.y - container.clientHeight / 2 + TILE_H / 2,
      behavior: "smooth",
    });
  }, [selectedQuest, layout.positions]);

  const handleCategoryChange = useCallback((cat: QuestCategory) => {
    setActiveCategory(cat);
    setSelectedQuest(null);
  }, []);

  const categoryStats = useMemo(() => {
    const msq = quests.filter((q) => getCategory(q.key) === "MSQ").length;
    const min = quests.filter((q) => getCategory(q.key) === "MIN").length;
    const sq = quests.filter((q) => getCategory(q.key) === "SQ").length;
    return { ALL: msq + min + sq, MSQ: msq, MIN: min, SQ: sq };
  }, []);

  return (
    <article>
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Quest Database</h1>
        <p className="mt-2 text-muted-foreground">
          All {quests.length} quests — click any quest for objectives, rewards,
          and requirements.
        </p>
      </header>

      {/* Search */}
      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search quests..."
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

      {/* Category tabs */}
      <div className="mb-4 flex gap-1 rounded-lg bg-muted/50 p-1 w-fit">
        {(["ALL", "MSQ", "MIN", "SQ"] as QuestCategory[]).map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all
                ${
                  isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
            >
              {CATEGORY_LABELS[cat]}
              <span className="ml-1 text-[10px] opacity-50">
                {categoryStats[cat]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground mb-4">
        {searchLower
          ? `${matchingIndices?.size ?? 0} quest${(matchingIndices?.size ?? 0) !== 1 ? "s" : ""} found`
          : `${filteredQuests.length} quests`}
      </p>

      {/* Main layout: graph + detail panel */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Quest graph container */}
        <div
          ref={graphContainerRef}
          className="w-full lg:flex-1 min-w-0 overflow-x-auto overflow-y-auto rounded-lg border-2"
          style={{
            backgroundColor: "#1a1a2e",
            borderColor: "#2a2a3e",
            maxHeight: "70vh",
          }}
        >
          {filteredQuests.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500">
              No quests found.
            </div>
          ) : (
            <div
              style={{
                position: "relative",
                width: layout.totalW,
                height: layout.totalH,
                minHeight: 300,
              }}
            >
              {/* SVG connection lines */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: layout.totalW,
                  height: layout.totalH,
                  pointerEvents: "none",
                }}
              >
                {layout.edges.map(({ from, to }, i) => {
                  const fp = layout.positions.get(from);
                  const tp = layout.positions.get(to);
                  if (!fp || !tp) return null;

                  const x1 = fp.x + TILE_W;
                  const y1 = fp.y + TILE_H / 2;
                  const x2 = tp.x;
                  const y2 = tp.y + TILE_H / 2;
                  const dx = x2 - x1;
                  const cx1 = x1 + dx * 0.4;
                  const cx2 = x2 - dx * 0.4;

                  const isActive =
                    selectedQuest != null &&
                    (from === selectedQuest.index ||
                      to === selectedQuest.index);

                  return (
                    <path
                      key={i}
                      d={`M${x1},${y1} C${cx1},${y1} ${cx2},${y2} ${x2},${y2}`}
                      fill="none"
                      stroke={isActive ? "#c8c4be" : "#3a3a50"}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      opacity={isActive ? 0.9 : 0.5}
                    />
                  );
                })}
              </svg>

              {/* Quest nodes */}
              {filteredQuests.map((quest) => {
                const pos = layout.positions.get(quest.index);
                if (!pos) return null;
                return (
                  <div
                    key={quest.index}
                    style={{
                      position: "absolute",
                      left: pos.x,
                      top: pos.y,
                      width: TILE_W,
                      height: TILE_H,
                    }}
                  >
                    <QuestTile
                      quest={quest}
                      isSelected={selectedQuest?.index === quest.index}
                      isDimmed={
                        matchingIndices !== null &&
                        matchingIndices.size > 0 &&
                        !matchingIndices.has(quest.index)
                      }
                      isHighlighted={connectedIndices.has(quest.index)}
                      onSelect={() => handleSelect(quest)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quest detail panel — overlay on mobile, side panel on desktop */}
        {selectedQuest && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setSelectedQuest(null)}
            />
            <div
              className="max-lg:fixed max-lg:inset-0 max-lg:z-50 max-lg:pt-[10vh] max-lg:pb-[5vh] max-lg:px-4 max-lg:overflow-y-auto w-auto lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-4"
              onClick={(e) => { if (e.target === e.currentTarget) setSelectedQuest(null); }}
            >
              <QuestDetail
                quest={selectedQuest}
                onClose={() => setSelectedQuest(null)}
                onSelectQuest={navigateToQuest}
              />
            </div>
          </>
        )}
      </div>
    </article>
  );
}
