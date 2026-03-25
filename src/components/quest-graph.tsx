"use client";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useState, useMemo, useCallback } from "react";
import { X, ChevronRight, MessageSquare, Target, Gift, Lock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import allQuests from "@/data/quests.json";

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
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const quests = (allQuests as Quest[]).filter(
  (q) => q.status !== "Test" && !q.key.startsWith("test")
);

const questByIndex = new Map<number, Quest>();
quests.forEach((q) => questByIndex.set(q.index, q));

function getCategory(key: string): "MSQ" | "MIN" | "SQ" {
  if (key.startsWith("MSQ")) return "MSQ";
  if (key.startsWith("MIN")) return "MIN";
  return "SQ";
}

const CATEGORY_COLORS: Record<
  "MSQ" | "MIN" | "SQ",
  { bg: string; border: string; text: string; accent: string; glow: string }
> = {
  MSQ: {
    bg: "rgba(59, 130, 246, 0.12)",
    border: "rgba(59, 130, 246, 0.5)",
    text: "#93c5fd",
    accent: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  MIN: {
    bg: "rgba(34, 197, 94, 0.12)",
    border: "rgba(34, 197, 94, 0.5)",
    text: "#86efac",
    accent: "#22c55e",
    glow: "rgba(34, 197, 94, 0.15)",
  },
  SQ: {
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.5)",
    text: "#fcd34d",
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.15)",
  },
};

const CATEGORY_LABELS: Record<QuestCategory, string> = {
  ALL: "All Quests",
  MSQ: "Main Story",
  MIN: "Mina's Quests",
  SQ: "Side Quests",
};

/* ------------------------------------------------------------------ */
/*  Layout calculation                                                 */
/* ------------------------------------------------------------------ */

const NODE_WIDTH = 200;
const NODE_HEIGHT = 52;
const H_GAP = 60;
const V_GAP = 30;

/**
 * Builds a left-to-right layout using topological sorting.
 * Quests with no prerequisites start at column 0; each subsequent
 * quest is placed at max(parent columns) + 1.
 */
function buildLayout(filteredQuests: Quest[]): {
  nodes: Node[];
  edges: Edge[];
} {
  const indexSet = new Set(filteredQuests.map((q) => q.index));

  // Build adjacency: parent index -> child quest indices
  const childrenOf = new Map<number, number[]>();
  const parentOf = new Map<number, number[]>();
  filteredQuests.forEach((q) => {
    parentOf.set(q.index, []);
  });
  filteredQuests.forEach((q) => {
    q.requirements
      .filter((r) => r.type === "QUEST" && r.index !== null && indexSet.has(r.index))
      .forEach((r) => {
        const parentIdx = r.index!;
        if (!childrenOf.has(parentIdx)) childrenOf.set(parentIdx, []);
        childrenOf.get(parentIdx)!.push(q.index);
        parentOf.get(q.index)?.push(parentIdx);
      });
  });

  // Compute column = longest path from a root
  const colOf = new Map<number, number>();
  function getCol(idx: number): number {
    if (colOf.has(idx)) return colOf.get(idx)!;
    const parents = parentOf.get(idx) || [];
    const col = parents.length === 0 ? 0 : Math.max(...parents.map(getCol)) + 1;
    colOf.set(idx, col);
    return col;
  }
  filteredQuests.forEach((q) => getCol(q.index));

  // Group quests by category then by column
  const categoryOrder: Array<"MSQ" | "MIN" | "SQ"> = ["MSQ", "MIN", "SQ"];
  const rowGroups: Map<string, Map<number, Quest[]>> = new Map();
  categoryOrder.forEach((cat) => rowGroups.set(cat, new Map()));

  filteredQuests.forEach((q) => {
    const cat = getCategory(q.key);
    const col = colOf.get(q.index) || 0;
    const catMap = rowGroups.get(cat)!;
    if (!catMap.has(col)) catMap.set(col, []);
    catMap.get(col)!.push(q);
  });

  // Layout each category as its own horizontal band
  const nodes: Node[] = [];
  let yOffset = 0;

  categoryOrder.forEach((cat) => {
    const catMap = rowGroups.get(cat)!;
    if (catMap.size === 0) return;

    const cols = Array.from(catMap.keys()).sort((a, b) => a - b);
    let maxRowsInBand = 0;

    cols.forEach((col) => {
      const questsInCol = catMap.get(col)!;
      questsInCol.sort((a, b) => a.index - b.index);
      maxRowsInBand = Math.max(maxRowsInBand, questsInCol.length);

      questsInCol.forEach((q, rowIdx) => {
        const colors = CATEGORY_COLORS[cat];
        nodes.push({
          id: String(q.index),
          position: {
            x: col * (NODE_WIDTH + H_GAP),
            y: yOffset + rowIdx * (NODE_HEIGHT + V_GAP),
          },
          data: {
            quest: q,
            category: cat,
            colors,
          },
          type: "questNode",
        });
      });
    });

    yOffset += maxRowsInBand * (NODE_HEIGHT + V_GAP) + 60;
  });

  // Edges
  const edges: Edge[] = [];
  filteredQuests.forEach((q) => {
    q.requirements
      .filter((r) => r.type === "QUEST" && r.index !== null && indexSet.has(r.index))
      .forEach((r) => {
        const sourceIdx = r.index!;
        const sourceCat = getCategory(
          questByIndex.get(sourceIdx)?.key || ""
        );
        const colors = CATEGORY_COLORS[sourceCat];
        edges.push({
          id: `e-${sourceIdx}-${q.index}`,
          source: String(sourceIdx),
          target: String(q.index),
          style: { stroke: colors.accent, strokeWidth: 1.5 },
          animated: false,
        });
      });
  });

  return { nodes, edges };
}

/* ------------------------------------------------------------------ */
/*  Custom node                                                        */
/* ------------------------------------------------------------------ */

function QuestNode({ data, selected }: NodeProps) {
  const quest = data.quest as Quest;
  const colors = data.colors as (typeof CATEGORY_COLORS)["MSQ"];

  return (
    <div
      className="rounded-lg px-3 py-2 transition-all cursor-pointer"
      style={{
        width: NODE_WIDTH,
        minHeight: NODE_HEIGHT,
        backgroundColor: selected ? colors.glow : colors.bg,
        border: `1.5px solid ${selected ? colors.accent : colors.border}`,
        boxShadow: selected ? `0 0 16px ${colors.glow}` : "none",
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-0 !h-0" />
      <div
        className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
        style={{ color: colors.accent }}
      >
        {quest.key}
      </div>
      <div
        className="text-xs font-medium leading-snug truncate"
        style={{ color: colors.text }}
        title={quest.title}
      >
        {quest.title}
      </div>
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-0 !h-0" />
    </div>
  );
}

const nodeTypes = { questNode: QuestNode };

/* ------------------------------------------------------------------ */
/*  Detail panel                                                       */
/* ------------------------------------------------------------------ */

function DetailPanel({
  quest,
  onClose,
}: {
  quest: Quest;
  onClose: () => void;
}) {
  const cat = getCategory(quest.key);
  const colors = CATEGORY_COLORS[cat];

  const dialogueLines = quest.introDialogue
    ? quest.introDialogue.split("\n").filter((l) => l.trim())
    : [];

  return (
    <div className="absolute right-0 top-0 bottom-0 z-20 w-[380px] max-w-full border-l border-border bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: colors.border }}
      >
        <div className="flex-1 min-w-0">
          <div
            className="text-xs font-bold uppercase tracking-wider mb-1"
            style={{ color: colors.accent }}
          >
            {quest.key}
          </div>
          <h3 className="text-base font-semibold text-foreground leading-tight truncate">
            {quest.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="ml-3 shrink-0 p-1.5 rounded-md hover:bg-accent transition-colors"
          aria-label="Close panel"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Body */}
      <ScrollArea className="flex-1 overflow-auto">
        <div className="px-5 py-4 space-y-5">
          {/* Meta row */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span
              className="inline-flex items-center rounded-md px-2 py-0.5 font-medium"
              style={{
                backgroundColor: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            >
              {cat === "MSQ"
                ? "Main Story"
                : cat === "MIN"
                ? "Mina's Quest"
                : "Side Quest"}
            </span>
            {quest.giver && (
              <span className="inline-flex items-center rounded-md px-2 py-0.5 font-medium bg-secondary text-secondary-foreground">
                Given by: {quest.giver}
              </span>
            )}
            {quest.daily && (
              <span className="inline-flex items-center rounded-md px-2 py-0.5 font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Daily
              </span>
            )}
            <span className="inline-flex items-center rounded-md px-2 py-0.5 font-medium bg-secondary text-muted-foreground">
              {quest.status}
            </span>
          </div>

          {/* Introduction */}
          {dialogueLines.length > 0 && (
            <section>
              <SectionHeader icon={MessageSquare} label="Introduction" />
              <div className="space-y-1.5 mt-2">
                {dialogueLines.map((line, i) => {
                  const match = line.match(/^([A-Z]+):\s*[""\u201c]?(.*?)[""\u201d]?\s*$/);
                  const speaker = match?.[1];
                  const text = match?.[2] || line;
                  return (
                    <div key={i} className="text-xs text-muted-foreground leading-relaxed">
                      {speaker && (
                        <span className="font-semibold text-foreground mr-1">
                          {speaker}:
                        </span>
                      )}
                      <span>&ldquo;{text}&rdquo;</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Requirements */}
          {quest.requirements.length > 0 && (
            <section>
              <SectionHeader icon={Lock} label="Requirements" />
              <ul className="mt-2 space-y-1">
                {quest.requirements.map((req, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <ChevronRight className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground/60" />
                    <span>{req.description}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Objectives */}
          {quest.objectives.length > 0 && (
            <section>
              <SectionHeader icon={Target} label="Objectives" />
              <ul className="mt-2 space-y-1">
                {quest.objectives.map((obj, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <ChevronRight className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground/60" />
                    <span>{obj.description}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Rewards */}
          {quest.rewards.length > 0 && (
            <section>
              <SectionHeader icon={Gift} label="Rewards" />
              <ul className="mt-2 space-y-1.5">
                {quest.rewards.map((rw, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs"
                  >
                    <Gift className="h-3 w-3 mt-0.5 shrink-0 text-amber-400/70" />
                    <span className="text-foreground/90">
                      {rw.description}
                      {rw.itemName && (
                        <span className="ml-1 text-muted-foreground">
                          ({rw.itemName})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Resolution dialogue */}
          {quest.resolutionDialogue && (
            <section>
              <SectionHeader icon={MessageSquare} label="Completion Dialogue" />
              <div className="space-y-1.5 mt-2">
                {quest.resolutionDialogue
                  .split("\n")
                  .filter((l) => l.trim())
                  .map((line, i) => {
                    const match = line.match(
                      /^([A-Z]+):\s*[""\u201c]?(.*?)[""\u201d]?\s*$/
                    );
                    const speaker = match?.[1];
                    const text = match?.[2] || line;
                    return (
                      <div
                        key={i}
                        className="text-xs text-muted-foreground/80 leading-relaxed"
                      >
                        {speaker && (
                          <span className="font-semibold text-muted-foreground mr-1">
                            {speaker}:
                          </span>
                        )}
                        <span>&ldquo;{text}&rdquo;</span>
                      </div>
                    );
                  })}
              </div>
            </section>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground/80">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component (inner, wrapped by provider)                        */
/* ------------------------------------------------------------------ */

function QuestGraphInner() {
  const [activeCategory, setActiveCategory] = useState<QuestCategory>("ALL");
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const { fitView } = useReactFlow();

  const filteredQuests = useMemo(() => {
    if (activeCategory === "ALL") return quests;
    return quests.filter((q) => getCategory(q.key) === activeCategory);
  }, [activeCategory]);

  const { nodes, edges } = useMemo(
    () => buildLayout(filteredQuests),
    [filteredQuests]
  );

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const quest = node.data.quest as Quest;
      setSelectedQuest(quest);
    },
    []
  );

  const handlePaneClick = useCallback(() => {
    setSelectedQuest(null);
  }, []);

  const handleCategoryChange = useCallback(
    (cat: QuestCategory) => {
      setActiveCategory(cat);
      setSelectedQuest(null);
      // Allow layout to render, then fit view
      setTimeout(() => fitView({ padding: 0.15, duration: 300 }), 50);
    },
    [fitView]
  );

  const categoryStats = useMemo(() => {
    const msq = quests.filter((q) => getCategory(q.key) === "MSQ").length;
    const min = quests.filter((q) => getCategory(q.key) === "MIN").length;
    const sq = quests.filter((q) => getCategory(q.key) === "SQ").length;
    return { ALL: msq + min + sq, MSQ: msq, MIN: min, SQ: sq };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Filter bar */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
        {(["ALL", "MSQ", "MIN", "SQ"] as QuestCategory[]).map((cat) => {
          const isActive = activeCategory === cat;
          const catColor =
            cat === "ALL"
              ? { accent: "#a1a1aa", bg: "rgba(161,161,170,0.1)", border: "rgba(161,161,170,0.3)" }
              : CATEGORY_COLORS[cat];
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                backgroundColor: isActive ? catColor.bg : "rgba(0,0,0,0.3)",
                border: `1.5px solid ${isActive ? catColor.accent : "rgba(255,255,255,0.08)"}`,
                color: isActive ? catColor.accent : "rgba(255,255,255,0.45)",
                backdropFilter: "blur(8px)",
              }}
            >
              {CATEGORY_LABELS[cat]}
              <span
                className="rounded-full px-1.5 py-0 text-[10px] font-bold"
                style={{
                  backgroundColor: isActive
                    ? `${catColor.accent}22`
                    : "rgba(255,255,255,0.05)",
                  color: isActive ? catColor.accent : "rgba(255,255,255,0.3)",
                }}
              >
                {categoryStats[cat]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex gap-4 rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm px-3 py-2">
        {(["MSQ", "MIN", "SQ"] as const).map((cat) => (
          <div key={cat} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div
              className="h-2.5 w-2.5 rounded-sm"
              style={{
                backgroundColor: CATEGORY_COLORS[cat].accent,
              }}
            />
            <span>{cat === "MSQ" ? "Main Story" : cat === "MIN" ? "Mina" : "Side"}</span>
          </div>
        ))}
      </div>

      {/* React Flow canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        colorMode="dark"
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.15}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: false,
        }}
      >
        <Background gap={20} size={1} color="rgba(255,255,255,0.03)" />
        <Controls
          showInteractive={false}
          className="!bg-background/80 !border-border/50 !backdrop-blur-sm !rounded-lg [&>button]:!bg-transparent [&>button]:!border-border/30 [&>button]:!text-muted-foreground [&>button:hover]:!bg-accent"
        />
        <MiniMap
          nodeColor={(node) => {
            const colors = node.data?.colors as
              | (typeof CATEGORY_COLORS)["MSQ"]
              | undefined;
            return colors?.accent || "#666";
          }}
          maskColor="rgba(0, 0, 0, 0.7)"
          className="!bg-background/80 !border-border/50 !rounded-lg"
          pannable
          zoomable
        />
      </ReactFlow>

      {/* Detail panel */}
      {selectedQuest && (
        <DetailPanel
          quest={selectedQuest}
          onClose={() => setSelectedQuest(null)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported wrapper (with ReactFlowProvider)                          */
/* ------------------------------------------------------------------ */

export function QuestGraph() {
  return (
    <ReactFlowProvider>
      <QuestGraphInner />
    </ReactFlowProvider>
  );
}
