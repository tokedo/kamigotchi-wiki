"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation, type NavSection, type NavLink, type NavEntry } from "@/lib/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

function SidebarSection({ section }: { section: NavSection }) {
  const pathname = usePathname();
  const isActive = section.items.some((item) => pathname === item.href);
  const [open, setOpen] = useState(true);
  const Icon = section.icon;

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md hover:bg-accent transition-colors",
          isActive && "text-foreground",
          !isActive && "text-muted-foreground"
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">{section.title}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform",
            !open && "-rotate-90"
          )}
        />
      </button>
      {open && (
        <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border pl-3">
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-2 py-1.5 text-sm rounded-md transition-colors",
                pathname === item.href
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarLink({ entry }: { entry: NavLink }) {
  const pathname = usePathname();
  const isActive = pathname === entry.href;
  const Icon = entry.icon;

  return (
    <Link
      href={entry.href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md hover:bg-accent transition-colors",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {entry.title}
    </Link>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-background border border-border lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 border-r border-border bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0 lg:z-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <span className="text-lg font-bold tracking-tight">Kamigotchi Wiki</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-md hover:bg-accent lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ScrollArea className="h-[calc(100vh-65px)] px-3 py-3">
          <nav className="space-y-1" onClick={() => setMobileOpen(false)}>
            {navigation.map((entry) =>
              entry.kind === "section" ? (
                <SidebarSection key={entry.title} section={entry} />
              ) : (
                <SidebarLink key={entry.title} entry={entry} />
              )
            )}
          </nav>
          <div className="mt-6 px-3 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Community-built resource.{" "}
              <a
                href="https://docs.kamigotchi.io"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Official Docs
              </a>
            </p>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
