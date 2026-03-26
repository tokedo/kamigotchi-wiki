"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import roomsData from "@/data/rooms.json";
import roomImageMap from "@/data/room-images.json";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, X, MapPin, DoorOpen, Pickaxe, Layers } from "lucide-react";

const roomImages = roomImageMap as Record<string, string>;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DroptableItem {
  name: string;
  indices: number[];
  tiers: number[];
  items: string[];
}

interface Node {
  name: string;
  affinity: string;
  levelLimit: number;
  yieldIndex: number;
  yieldName: string;
  scavCost: number;
  droptableName: string;
  droptable: DroptableItem;
}

interface Room {
  index: number;
  name: string;
  status: string;
  x: number;
  y: number;
  z: number;
  exits: number[];
  description: string;
  node: Node | null;
}

const rooms = roomsData as Room[];

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const Z_PLANES: { value: string; label: string; z: number }[] = [
  { value: "1", label: "Overworld", z: 1 },
  { value: "2", label: "Interiors", z: 2 },
  { value: "3", label: "Underground", z: 3 },
  { value: "4", label: "Castle", z: 4 },
];

/** Map of room index -> Room for fast lookup */
const roomByIndex = new Map<number, Room>();
rooms.forEach((r) => roomByIndex.set(r.index, r));

/* ------------------------------------------------------------------ */
/*  Affinity styling                                                   */
/* ------------------------------------------------------------------ */

function affinityDotClass(affinity: string): string {
  const lower = affinity.toLowerCase();
  if (lower.includes(",")) {
    // compound — pick first two
    const parts = lower.split(",").map((s) => s.trim());
    const colorA = singleAffinityColor(parts[0]);
    const colorB = singleAffinityColor(parts[1]);
    // Return a gradient-style using two-color ring
    return `bg-gradient-to-br ${colorA.from} ${colorB.to}`;
  }
  return singleAffinityBg(lower);
}

function singleAffinityBg(aff: string): string {
  switch (aff) {
    case "normal":
      return "bg-zinc-400";
    case "eerie":
      return "bg-purple-500";
    case "insect":
      return "bg-green-500";
    case "scrap":
      return "bg-orange-500";
    default:
      return "bg-zinc-500";
  }
}

function singleAffinityColor(aff: string): { from: string; to: string } {
  switch (aff) {
    case "normal":
      return { from: "from-zinc-400", to: "to-zinc-400" };
    case "eerie":
      return { from: "from-purple-500", to: "to-purple-500" };
    case "insect":
      return { from: "from-green-500", to: "to-green-500" };
    case "scrap":
      return { from: "from-orange-500", to: "to-orange-500" };
    default:
      return { from: "from-zinc-500", to: "to-zinc-500" };
  }
}

function affinityBadgeClass(affinity: string): string {
  const lower = affinity.toLowerCase().trim();
  switch (lower) {
    case "normal":
      return "border-zinc-500/40 bg-zinc-500/15 text-zinc-300";
    case "eerie":
      return "border-purple-500/40 bg-purple-500/15 text-purple-300";
    case "insect":
      return "border-green-500/40 bg-green-500/15 text-green-300";
    case "scrap":
      return "border-orange-500/40 bg-orange-500/15 text-orange-300";
    default:
      return "border-zinc-500/40 bg-zinc-500/15 text-zinc-300";
  }
}

/** Tile border color based on affinity */
function tileBorderClass(room: Room): string {
  if (!room.node) return "border-border";
  const lower = room.node.affinity.toLowerCase();
  if (lower.includes(",")) return "border-amber-500/40";
  switch (lower) {
    case "normal":
      return "border-zinc-500/30";
    case "eerie":
      return "border-purple-500/30";
    case "insect":
      return "border-green-500/30";
    case "scrap":
      return "border-orange-500/30";
    default:
      return "border-border";
  }
}

/* ------------------------------------------------------------------ */
/*  Adjacency helpers                                                  */
/* ------------------------------------------------------------------ */

/** Check if two rooms are cardinally adjacent on the same z-plane */
function isAdjacent(a: Room, b: Room): boolean {
  if (a.z !== b.z) return false;
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

/* ------------------------------------------------------------------ */
/*  Grid plane component                                               */
/* ------------------------------------------------------------------ */

function GridPlane({
  planeRooms,
  selectedRoom,
  onSelect,
  highlightedIndices,
}: {
  planeRooms: Room[];
  selectedRoom: Room | null;
  onSelect: (room: Room) => void;
  highlightedIndices: Set<number>;
}) {
  // Compute grid bounds
  if (planeRooms.length === 0) {
    return <p className="text-sm text-muted-foreground py-8 text-center">No rooms on this layer.</p>;
  }
  const minX = Math.min(...planeRooms.map((r) => r.x));
  const maxX = Math.max(...planeRooms.map((r) => r.x));
  const minY = Math.min(...planeRooms.map((r) => r.y));
  const maxY = Math.max(...planeRooms.map((r) => r.y));

  // Build lookup by (x,y)
  const lookup = new Map<string, Room>();
  planeRooms.forEach((r) => lookup.set(`${r.x},${r.y}`, r));

  // Build grid rows (y ascending = top to bottom visually)
  const rows: (Room | null)[][] = [];
  for (let y = minY; y <= maxY; y++) {
    const row: (Room | null)[] = [];
    for (let x = minX; x <= maxX; x++) {
      row.push(lookup.get(`${x},${y}`) ?? null);
    }
    rows.push(row);
  }

  // Compute adjacency connections for SVG lines
  const connections: { x1: number; y1: number; x2: number; y2: number; isExit: boolean }[] = [];
  const seen = new Set<string>();
  const cellSize = 80;
  const gap = 8;

  planeRooms.forEach((room) => {
    // Cardinal adjacencies
    planeRooms.forEach((other) => {
      if (room.index >= other.index) return;
      const key = `${room.index}-${other.index}`;
      if (seen.has(key)) return;
      if (isAdjacent(room, other)) {
        seen.add(key);
        const cx1 = (room.x - minX) * (cellSize + gap) + cellSize / 2;
        const cy1 = (room.y - minY) * (cellSize + gap) + cellSize / 2;
        const cx2 = (other.x - minX) * (cellSize + gap) + cellSize / 2;
        const cy2 = (other.y - minY) * (cellSize + gap) + cellSize / 2;
        connections.push({ x1: cx1, y1: cy1, x2: cx2, y2: cy2, isExit: false });
      }
    });

    // Special exits within the same z-plane
    room.exits.forEach((exitIdx) => {
      const target = roomByIndex.get(exitIdx);
      if (!target || target.z !== room.z) return;
      const key =
        room.index < target.index
          ? `${room.index}-${target.index}`
          : `${target.index}-${room.index}`;
      if (seen.has(key)) return;
      seen.add(key);
      const cx1 = (room.x - minX) * (cellSize + gap) + cellSize / 2;
      const cy1 = (room.y - minY) * (cellSize + gap) + cellSize / 2;
      const cx2 = (target.x - minX) * (cellSize + gap) + cellSize / 2;
      const cy2 = (target.y - minY) * (cellSize + gap) + cellSize / 2;
      connections.push({ x1: cx1, y1: cy1, x2: cx2, y2: cy2, isExit: true });
    });
  });

  const gridWidth = (maxX - minX + 1) * (cellSize + gap) - gap;
  const gridHeight = (maxY - minY + 1) * (cellSize + gap) - gap;

  return (
    <div className="overflow-x-auto pb-4">
      <div
        className="relative mx-auto"
        style={{ width: gridWidth, height: gridHeight, minWidth: gridWidth }}
      >
        {/* SVG connection lines */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={gridWidth}
          height={gridHeight}
        >
          {connections.map((c, i) => (
            <line
              key={i}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke={c.isExit ? "rgba(139, 92, 246, 0.35)" : "rgba(255,255,255,0.08)"}
              strokeWidth={c.isExit ? 2 : 1.5}
              strokeDasharray={c.isExit ? "6 4" : "none"}
            />
          ))}
        </svg>

        {/* Tiles */}
        {rows.map((row, rowIdx) =>
          row.map((room, colIdx) => {
            if (!room) {
              return (
                <div
                  key={`empty-${rowIdx}-${colIdx}`}
                  className="absolute"
                  style={{
                    left: colIdx * (cellSize + gap),
                    top: rowIdx * (cellSize + gap),
                    width: cellSize,
                    height: cellSize,
                  }}
                />
              );
            }

            const isSelected = selectedRoom?.index === room.index;
            const isHighlighted = highlightedIndices.has(room.index);
            const hasNode = room.node !== null;
            const hasSpecialExit = room.exits.some((e) => {
              const t = roomByIndex.get(e);
              return t && t.z !== room.z;
            });

            const tileImg = roomImages[String(room.index)];

            return (
              <button
                key={room.index}
                onClick={() => onSelect(room)}
                className={`
                  absolute flex flex-col items-center justify-center rounded-lg border overflow-hidden
                  transition-all duration-150 cursor-pointer group
                  ${tileBorderClass(room)}
                  ${
                    isSelected
                      ? "ring-2 ring-ring scale-105 z-10 shadow-lg shadow-ring/20"
                      : isHighlighted
                        ? "ring-1 ring-ring/50"
                        : "hover:scale-102"
                  }
                  ${!isHighlighted && !isSelected && highlightedIndices.size > 0 ? "opacity-40" : ""}
                `}
                style={{
                  left: colIdx * (cellSize + gap),
                  top: rowIdx * (cellSize + gap),
                  width: cellSize,
                  height: cellSize,
                }}
                title={room.name}
              >
                {/* Room background image */}
                {tileImg && (
                  <Image
                    src={`/img/rooms/${tileImg}`}
                    alt=""
                    fill
                    className={`object-cover ${isSelected ? "opacity-40" : "opacity-20 group-hover:opacity-30"} transition-opacity`}
                    unoptimized
                    sizes="80px"
                  />
                )}
                {!tileImg && (
                  <div className={`absolute inset-0 ${isSelected ? "bg-accent" : isHighlighted ? "bg-accent/60" : "bg-card/80 group-hover:bg-accent/50"}`} />
                )}
                {/* Affinity dot */}
                {hasNode && (
                  <span
                    className={`w-2.5 h-2.5 rounded-full mb-1 shrink-0 relative z-10 ${affinityDotClass(room.node!.affinity)}`}
                  />
                )}
                {/* Room name */}
                <span
                  className={`text-[10px] leading-tight text-center px-1 font-medium relative z-10 drop-shadow-sm
                    ${isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}
                  `}
                >
                  {room.name}
                </span>
                {/* Cross-plane exit indicator */}
                {hasSpecialExit && (
                  <DoorOpen className="w-3 h-3 text-purple-400/60 mt-0.5 shrink-0 relative z-10" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail panel                                                       */
/* ------------------------------------------------------------------ */

function DetailPanel({
  room,
  onClose,
}: {
  room: Room;
  onClose: () => void;
}) {
  const exitRooms = room.exits
    .map((idx) => roomByIndex.get(idx))
    .filter((r): r is Room => r !== undefined);

  // Find adjacent rooms (same z-plane, cardinal neighbors)
  const adjacentRooms = rooms.filter(
    (r) => r.index !== room.index && isAdjacent(room, r)
  );

  const affinityParts = room.node?.affinity.split(",").map((s) => s.trim()) ?? [];
  const roomImg = roomImages[String(room.index)];
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Room image */}
      {roomImg && !imgError && (
        <div className="relative w-full aspect-[16/9] bg-muted/30">
          <Image
            src={`/img/rooms/${roomImg}`}
            alt={room.name}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>
      )}

      <div className="p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight truncate">
            {room.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Room {room.index} &middot; ({room.x}, {room.y}, {room.z})
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label="Close detail panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {room.description}
      </p>

      {/* Connected Rooms */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          Adjacent Rooms
        </h4>
        {adjacentRooms.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {adjacentRooms.map((r) => (
              <span
                key={r.index}
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-muted/50 text-foreground/80"
              >
                {r.node && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${affinityDotClass(r.node.affinity)}`}
                  />
                )}
                {r.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground/60">No adjacent rooms on this plane</p>
        )}
      </div>

      {/* Special Exits */}
      {exitRooms.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5">
            <DoorOpen className="h-3.5 w-3.5" />
            Special Exits
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {exitRooms.map((r) => {
              const planeName = Z_PLANES.find((p) => p.z === r.z)?.label ?? `Z=${r.z}`;
              const isCrossPlane = r.z !== room.z;
              return (
                <span
                  key={r.index}
                  className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md
                    ${isCrossPlane ? "bg-purple-500/10 text-purple-300 border border-purple-500/20" : "bg-muted/50 text-foreground/80"}`}
                >
                  {r.name}
                  {isCrossPlane && (
                    <span className="text-[10px] opacity-60">({planeName})</span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Harvest Node */}
      {room.node && (
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
            <Pickaxe className="h-3.5 w-3.5" />
            Harvest Node
          </h4>

          {/* Affinity badges */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Affinity:</span>
            <div className="flex gap-1.5">
              {affinityParts.map((aff) => (
                <Badge
                  key={aff}
                  variant="outline"
                  className={`text-[10px] ${affinityBadgeClass(aff)}`}
                >
                  {aff}
                </Badge>
              ))}
            </div>
          </div>

          {/* Node stats */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {room.node.levelLimit > 0 && (
              <>
                <span className="text-muted-foreground">Level Limit</span>
                <span className="font-medium">{room.node.levelLimit}</span>
              </>
            )}
            <span className="text-muted-foreground">Yield</span>
            <span className="font-medium">{room.node.yieldName}</span>
            <span className="text-muted-foreground">Scav Cost</span>
            <span className="font-medium">{room.node.scavCost} pts</span>
          </div>

          {/* Droptable */}
          {room.node.droptable && room.node.droptable.items.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">
                Scavenge Drops ({room.node.droptable.name})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {room.node.droptable.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-md bg-card border border-border text-foreground/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main WorldMap component                                            */
/* ------------------------------------------------------------------ */

export function WorldMap() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("1");

  const handleSelect = useCallback((room: Room) => {
    setSelectedRoom((prev) => (prev?.index === room.index ? null : room));
  }, []);

  const handleClose = useCallback(() => {
    setSelectedRoom(null);
  }, []);

  // Filter rooms by search
  const searchLower = search.toLowerCase().trim();
  const matchingIndices = useMemo(() => {
    if (!searchLower) return new Set<number>();
    return new Set(
      rooms
        .filter(
          (r) =>
            r.name.toLowerCase().includes(searchLower) ||
            (r.node && r.node.affinity.toLowerCase().includes(searchLower)) ||
            (r.node &&
              r.node.droptable &&
              r.node.droptable.items.some((item) =>
                item.toLowerCase().includes(searchLower)
              ))
        )
        .map((r) => r.index)
    );
  }, [searchLower]);

  // Per-plane rooms
  const planeRooms = useMemo(
    () => rooms.filter((r) => r.z === Number(activeTab)),
    [activeTab]
  );

  // Count per plane
  const planeCounts = useMemo(() => {
    const c: Record<number, number> = {};
    rooms.forEach((r) => {
      c[r.z] = (c[r.z] || 0) + 1;
    });
    return c;
  }, []);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search rooms, affinities, or items..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="pl-9 pr-8"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-accent text-muted-foreground"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {searchLower && (
          <p className="text-xs text-muted-foreground mt-1.5 ml-1">
            {matchingIndices.size} room{matchingIndices.size !== 1 ? "s" : ""} found
          </p>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="font-medium text-foreground/60">Node affinity:</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" /> Normal
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Eerie
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Insect
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Scrap
        </span>
        <span className="inline-flex items-center gap-1.5">
          <DoorOpen className="w-3 h-3 text-purple-400/60" /> Cross-plane exit
        </span>
      </div>

      {/* Main layout: grid + detail panel */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Grid area */}
        <div className="flex-1 min-w-0">
          <Tabs
            defaultValue="1"
            value={activeTab}
            onValueChange={(val: string | number | null) => {
              if (val !== null) {
                setActiveTab(String(val));
                setSelectedRoom(null);
              }
            }}
            className="w-full"
          >
            <TabsList className="mb-4">
              {Z_PLANES.map((plane) => (
                <TabsTrigger key={plane.value} value={plane.value}>
                  <Layers className="h-3.5 w-3.5 mr-1 opacity-60" />
                  {plane.label}
                  <span className="ml-1 text-[10px] opacity-50">
                    ({planeCounts[plane.z] ?? 0})
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Z_PLANES.map((plane) => (
              <TabsContent key={plane.value} value={plane.value}>
                <ScrollArea className="w-full">
                  <GridPlane
                    planeRooms={
                      plane.z === Number(activeTab) ? planeRooms : []
                    }
                    selectedRoom={selectedRoom}
                    onSelect={handleSelect}
                    highlightedIndices={
                      searchLower ? matchingIndices : new Set<number>()
                    }
                  />
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Detail panel */}
        {selectedRoom && (
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <DetailPanel room={selectedRoom} onClose={handleClose} />
          </div>
        )}
      </div>
    </div>
  );
}
