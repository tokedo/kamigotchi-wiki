"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import roomsData from "@/data/rooms.json";
import roomImageMap from "@/data/room-images.json";
import { Input } from "@/components/ui/input";
import { Search, X, MapPin, DoorOpen } from "lucide-react";

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
/*  Zone configuration — matches the game client                       */
/* ------------------------------------------------------------------ */

interface ZoneConfig {
  label: string;
  cols: number;
  rows: number;
  offsetX: number;
  offsetY: number;
  bg: string;
}

const ZONES: Record<number, ZoneConfig> = {
  1: { label: "Overworld", cols: 9, rows: 13, offsetX: 0, offsetY: 1, bg: "/img/map/z1.webp" },
  2: { label: "Interiors", cols: 9, rows: 13, offsetX: 0, offsetY: 1, bg: "/img/map/z2.png" },
  3: { label: "Underground", cols: 10, rows: 13, offsetX: 0, offsetY: -1, bg: "/img/map/z3.png" },
  4: { label: "Castle", cols: 5, rows: 5, offsetX: 0, offsetY: -1, bg: "/img/map/z4.png" },
};

const ZONE_ORDER = [1, 3, 4, 2]; // show main zones first

/** Map of room index -> Room for fast lookup */
const roomByIndex = new Map<number, Room>();
rooms.forEach((r) => roomByIndex.set(r.index, r));

/* ------------------------------------------------------------------ */
/*  Affinity helpers                                                   */
/* ------------------------------------------------------------------ */

function getAffinityIcon(affinity: string): string {
  const lower = affinity.toLowerCase().split(",")[0].trim();
  return `/img/icons/affinities/${lower}.png`;
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

function affinityDotClass(affinity: string): string {
  const lower = affinity.toLowerCase();
  if (lower.includes(",")) {
    const parts = lower.split(",").map((s) => s.trim());
    const a = singleColor(parts[0]);
    const b = singleColor(parts[1]);
    return `bg-gradient-to-br ${a.from} ${b.to}`;
  }
  return singleBg(lower);
}

function singleBg(aff: string): string {
  switch (aff) {
    case "normal": return "bg-zinc-400";
    case "eerie": return "bg-purple-500";
    case "insect": return "bg-green-500";
    case "scrap": return "bg-orange-500";
    default: return "bg-zinc-500";
  }
}

function singleColor(aff: string): { from: string; to: string } {
  switch (aff) {
    case "normal": return { from: "from-zinc-400", to: "to-zinc-400" };
    case "eerie": return { from: "from-purple-500", to: "to-purple-500" };
    case "insect": return { from: "from-green-500", to: "to-green-500" };
    case "scrap": return { from: "from-orange-500", to: "to-orange-500" };
    default: return { from: "from-zinc-500", to: "to-zinc-500" };
  }
}

/* ------------------------------------------------------------------ */
/*  Game-style Grid                                                    */
/* ------------------------------------------------------------------ */

function GameGrid({
  zone,
  planeRooms,
  selectedRoom,
  onSelect,
  highlightedIndices,
}: {
  zone: number;
  planeRooms: Room[];
  selectedRoom: Room | null;
  onSelect: (room: Room) => void;
  highlightedIndices: Set<number>;
}) {
  const config = ZONES[zone];
  const [hoveredRoom, setHoveredRoom] = useState<Room | null>(null);

  const roomGrid = useMemo(() => {
    if (!config) return [];
    const grid: (Room | null)[][] = Array.from({ length: config.rows }, () =>
      Array(config.cols).fill(null)
    );
    planeRooms.forEach((room) => {
      const col = room.x - config.offsetX;
      const row = room.y - config.offsetY;
      if (row >= 0 && row < config.rows && col >= 0 && col < config.cols) {
        grid[row][col] = room;
      }
    });
    return grid;
  }, [planeRooms, config]);

  if (!config) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No map data for this zone.
      </p>
    );
  }

  if (planeRooms.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No rooms on this layer.
      </p>
    );
  }

  const hasHighlight = highlightedIndices.size > 0;

  return (
    <div
      className="relative select-none w-full"
    >
      {/* Terrain background — in flow so it sizes the container */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={config.bg}
        alt=""
        className="w-full h-auto block"
        style={{ imageRendering: "pixelated" }}
        draggable={false}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 flex flex-col">
        {roomGrid.map((row, rowIdx) => (
          <div key={rowIdx} className="flex flex-1">
            {row.map((room, colIdx) => {
              const cellKey = `${rowIdx}-${colIdx}`;
              if (!room) {
                return (
                  <div
                    key={cellKey}
                    className="flex-1"
                    style={{
                      borderRight: "1px solid rgba(0, 0, 0, 0.25)",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
                    }}
                  />
                );
              }

              const isSelected = selectedRoom?.index === room.index;
              const isHovered = hoveredRoom?.index === room.index;
              const isHighlighted = highlightedIndices.has(room.index);
              const dimmed = hasHighlight && !isHighlighted && !isSelected;

              return (
                <button
                  key={cellKey}
                  className="flex-1 relative cursor-pointer transition-opacity"
                  style={{
                    backgroundColor: isSelected
                      ? "rgba(51, 187, 51, 0.5)"
                      : isHovered
                        ? "rgba(255, 255, 255, 0.25)"
                        : "transparent",
                    borderRight: "1px solid rgba(0, 0, 0, 0.25)",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
                    opacity: dimmed ? 0.3 : 1,
                  }}
                  onClick={() => onSelect(room)}
                  onMouseEnter={() => setHoveredRoom(room)}
                  onMouseLeave={() => setHoveredRoom(null)}
                >
                  {/* Affinity icon */}
                  {room.node && (
                    <img
                      src={getAffinityIcon(room.node.affinity)}
                      alt=""
                      className="absolute inset-0 m-auto"
                      style={{
                        width: "55%",
                        height: "55%",
                        imageRendering: "pixelated",
                        opacity: isSelected ? 1 : 0.85,
                        filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.6))",
                      }}
                      draggable={false}
                    />
                  )}

                  {/* Cross-plane exit indicator */}
                  {room.exits.some((e) => {
                    const t = roomByIndex.get(e);
                    return t && t.z !== room.z;
                  }) && (
                    <div
                      className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-purple-400"
                      style={{ boxShadow: "0 0 4px rgba(168, 85, 247, 0.8)" }}
                    />
                  )}

                  {/* Hover tooltip */}
                  {isHovered && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap"
                      style={{ bottom: "calc(100% + 6px)" }}
                    >
                      <div className="bg-black/90 text-white text-xs px-2.5 py-1.5 rounded-md shadow-lg border border-white/10">
                        <span className="font-medium">{room.name}</span>
                        {room.node && (
                          <span className="text-white/50 ml-1.5 text-[10px]">
                            {room.node.affinity}
                          </span>
                        )}
                      </div>
                      {/* Tooltip arrow */}
                      <div className="w-0 h-0 mx-auto border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/90" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Selected room highlight border */}
      {selectedRoom && (
        <div className="absolute inset-0 pointer-events-none rounded-sm ring-2 ring-green-500/30" />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail panel                                                       */
/* ------------------------------------------------------------------ */

/** Convert item name to image filename (e.g. "Scrap Metal" -> "scrap_metal") */
function itemToFilename(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/(^_|_$)/g, "");
}

/** Compute drop percentages from tier weights. weight = 2^(tier-1) */
function computeDropRates(tiers: number[]): number[] {
  const weights = tiers.map((t) => (t > 0 ? Math.pow(2, t - 1) : 0));
  const total = weights.reduce((a, b) => a + b, 0);
  if (total === 0) return tiers.map(() => 0);
  return weights.map((w) => (w / total) * 100);
}

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

  const adjacentRooms = rooms.filter(
    (r) =>
      r.index !== room.index &&
      r.z === room.z &&
      ((Math.abs(r.x - room.x) === 1 && r.y === room.y) ||
        (Math.abs(r.y - room.y) === 1 && r.x === room.x))
  );

  const affinityParts =
    room.node?.affinity.split(",").map((s) => s.trim()) ?? [];
  const roomImg = roomImages[String(room.index)];
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rounded-lg border-2 border-white/10 bg-[#1a1a2e] overflow-hidden shadow-2xl">
      {/* Top row: room art + title + type/drops (game-style layout) */}
      <div className="flex gap-3 p-3">
        {/* Room art thumbnail — square, pixelated */}
        {roomImg && !imgError ? (
          <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden border-2 border-white/15 bg-muted/30">
            <Image
              src={`/img/rooms/${roomImg}`}
              alt={room.name}
              fill
              className="object-cover"
              style={{ imageRendering: "pixelated" }}
              onError={() => setImgError(true)}
              unoptimized
            />
          </div>
        ) : (
          <div className="w-24 h-24 shrink-0 rounded-md border-2 border-white/15 bg-muted/30 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-muted-foreground/30" />
          </div>
        )}

        {/* Title + type + drops */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3 className="text-base font-bold text-white leading-tight">
              {room.name}
            </h3>
            <button
              onClick={onClose}
              className="p-0.5 rounded text-white/40 hover:text-white transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Type row with affinity icons */}
          {room.node && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-xs text-white/40">Type:</span>
              {affinityParts.map((aff) => (
                <img
                  key={aff}
                  src={getAffinityIcon(aff)}
                  alt={aff}
                  title={aff}
                  className="w-5 h-5"
                  style={{ imageRendering: "pixelated" }}
                />
              ))}
            </div>
          )}

          {/* Drops row with icons (compact) */}
          {room.node?.droptable?.items && room.node.droptable.items.length > 0 && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs text-white/40">Drops:</span>
              <img
                src="/img/items/musu.png"
                alt="Musu"
                title="Musu (yield)"
                className="w-5 h-5"
                style={{ imageRendering: "pixelated" }}
              />
              <span className="text-white/20">|</span>
              {room.node.droptable.items.map((item, i) => (
                <img
                  key={i}
                  src={`/img/items/${itemToFilename(item)}.png`}
                  alt={item}
                  title={item}
                  className="w-5 h-5"
                  style={{ imageRendering: "pixelated" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-3 pb-2">
        <p className="text-xs text-white/50 leading-relaxed">
          {room.description}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-white/8 mx-3" />

      {/* Bottom section: node stats + exits */}
      <div className="p-3 space-y-2.5">
        {/* Harvest node stats */}
        {room.node && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <span>
              <span className="text-white/40">Yield </span>
              <span className="text-white/80 font-medium">{room.node.yieldName}</span>
            </span>
            <span>
              <span className="text-white/40">Scav </span>
              <span className="text-white/80 font-medium">{room.node.scavCost} pts</span>
            </span>
            {room.node.levelLimit > 0 && (
              <span>
                <span className="text-white/40">Lvl </span>
                <span className="text-white/80 font-medium">{room.node.levelLimit}+</span>
              </span>
            )}
          </div>
        )}

        {/* Scavenge drop rates */}
        {room.node?.droptable?.items && room.node.droptable.items.length > 0 && (
          <div>
            <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">
              Scavenge Drops
            </span>
            <div className="mt-1 space-y-0.5">
              {(() => {
                const rates = computeDropRates(room.node!.droptable.tiers);
                return room.node!.droptable.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <img
                      src={`/img/items/${itemToFilename(item)}.png`}
                      alt=""
                      className="w-5 h-5 shrink-0"
                      style={{ imageRendering: "pixelated" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-white/70 flex-1 min-w-0 truncate">
                      {item}
                    </span>
                    <span className={`shrink-0 font-mono tabular-nums ${
                      rates[i] >= 50
                        ? "text-white/60"
                        : rates[i] >= 10
                          ? "text-amber-400/70"
                          : "text-red-400/70"
                    }`}>
                      {rates[i] < 1
                        ? rates[i].toFixed(1)
                        : Math.round(rates[i])}%
                    </span>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* Exits */}
        {(adjacentRooms.length > 0 || exitRooms.length > 0) && (
          <div>
            <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">
              Exits
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {adjacentRooms.map((r) => (
                <span
                  key={r.index}
                  className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded bg-white/5 text-white/60"
                >
                  {r.node && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${affinityDotClass(r.node.affinity)}`}
                    />
                  )}
                  {r.name}
                </span>
              ))}
              {exitRooms.map((r) => {
                const isCrossPlane = r.z !== room.z;
                return (
                  <span
                    key={`exit-${r.index}`}
                    className={`inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded
                      ${isCrossPlane ? "bg-purple-500/10 text-purple-300/80" : "bg-white/5 text-white/60"}`}
                  >
                    {r.name}
                    {isCrossPlane && (
                      <span className="text-[9px] opacity-50">
                        ({ZONES[r.z]?.label})
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
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
  const [activeZone, setActiveZone] = useState(1);

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

  const planeRooms = useMemo(
    () => rooms.filter((r) => r.z === activeZone),
    [activeZone]
  );

  const planeCounts = useMemo(() => {
    const c: Record<number, number> = {};
    rooms.forEach((r) => {
      c[r.z] = (c[r.z] || 0) + 1;
    });
    return c;
  }, []);

  return (
    <div className="space-y-5">
      {/* Controls row: search + zone tabs */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms or items..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="pl-9 pr-8 h-9"
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
        </div>

        {/* Zone tabs — styled like game UI */}
        <div className="flex gap-1 rounded-lg bg-muted/50 p-1">
          {ZONE_ORDER.map((z) => {
            const zone = ZONES[z];
            if (!zone) return null;
            const isActive = activeZone === z;
            return (
              <button
                key={z}
                onClick={() => {
                  setActiveZone(z);
                  setSelectedRoom(null);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all
                  ${isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
              >
                {zone.label}
                <span className="ml-1 text-[10px] opacity-50">
                  {planeCounts[z] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search results count */}
      {searchLower && (
        <p className="text-xs text-muted-foreground">
          {matchingIndices.size} room{matchingIndices.size !== 1 ? "s" : ""}{" "}
          found
        </p>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="font-medium text-foreground/60">Node type:</span>
        {["Normal", "Eerie", "Insect", "Scrap"].map((aff) => (
          <span key={aff} className="inline-flex items-center gap-1.5">
            <img
              src={`/img/icons/affinities/${aff.toLowerCase()}.png`}
              alt=""
              className="w-4 h-4"
              style={{ imageRendering: "pixelated" }}
            />
            {aff}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full bg-purple-400"
            style={{ boxShadow: "0 0 4px rgba(168, 85, 247, 0.8)" }}
          />
          Cross-plane exit
        </span>
      </div>

      {/* Main layout: map + detail panel side by side */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Map — width matches the inventory panel (6×72 grid + gaps + padding) */}
        <div className="w-full max-w-[490px] shrink-0">
          <GameGrid
            zone={activeZone}
            planeRooms={planeRooms}
            selectedRoom={selectedRoom}
            onSelect={handleSelect}
            highlightedIndices={
              searchLower ? matchingIndices : new Set<number>()
            }
          />
        </div>

        {/* Detail panel — overlay on mobile, side panel on desktop */}
        {selectedRoom && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={handleClose}
            />
            <div
              className="max-lg:fixed max-lg:inset-0 max-lg:z-50 max-lg:pt-[10vh] max-lg:pb-[5vh] max-lg:px-4 max-lg:overflow-y-auto lg:flex-1 lg:min-w-72 lg:max-w-96 lg:sticky lg:top-4"
              onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
            >
              <DetailPanel room={selectedRoom} onClose={handleClose} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
