"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronLeft,
  ClipboardList,
  IndianRupee,
  LayoutGrid,
  Package,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/src/lib/utils";
import { mockUser } from "@/src/lib/mock-data";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Orders", href: "/orders", icon: ClipboardList },
  { label: "Recipes", href: "/recipes", icon: BookOpen },
  { label: "Inventory", href: "/inventory", icon: Package },
  { label: "Finances", href: "/finances", icon: IndianRupee },
];

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapsed: () => void;
  onCloseMobile: () => void;
};

export function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapsed,
  onCloseMobile,
}: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[transform,width] duration-200 ease-in-out",
          "md:static md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "w-20" : "w-64",
        )}
        aria-label="Primary navigation"
      >
        <BrandHeader
          collapsed={collapsed}
          onToggleCollapsed={onToggleCollapsed}
          onCloseMobile={onCloseMobile}
        />

        <NavList collapsed={collapsed} onNavigate={onCloseMobile} />

        <UserFooter collapsed={collapsed} />
      </aside>
    </>
  );
}

function BrandHeader({
  collapsed,
  onToggleCollapsed,
  onCloseMobile,
}: {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onCloseMobile: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 px-4 py-5">
      <div className={cn("flex items-center gap-2", collapsed && "justify-center w-full")}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-chart-4/30 text-sm font-display font-bold text-sidebar-foreground">
          B
        </span>
        {!collapsed && (
          <span className="font-display text-lg">Baker-Os</span>
        )}
      </div>

      <button
        type="button"
        onClick={onToggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "hidden md:inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          collapsed && "hidden",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onCloseMobile}
        aria-label="Close sidebar"
        className="inline-flex md:hidden h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function NavList({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-3 py-2">
      <ul className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-chart-4/80 text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center px-2",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function UserFooter({ collapsed }: { collapsed: boolean }) {
  const initials = mockUser.businessName
    ? mockUser.businessName
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : mockUser.name.slice(0, 1).toUpperCase();

  return (
    <div className="border-t border-sidebar-border p-3">
      <div
        className={cn(
          "flex items-center gap-3 rounded-md p-2",
          collapsed && "justify-center",
        )}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
          {initials}
        </span>
        {!collapsed && (
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">
              {mockUser.businessName ?? mockUser.name}
            </span>
            <span className="truncate text-[10px] uppercase tracking-wide text-muted-foreground">
              Free Plan
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
