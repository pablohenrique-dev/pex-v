"use client";

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  PackagePlus,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SidebarLink } from "./sidebar-link";
import { logoutAction } from "@/features/auth/actions/logout.action";

export const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/mercadorias/nova",
    label: "Nova mercadoria",
    icon: PackagePlus,
  },
  {
    href: "/configuracoes",
    label: "Configurações",
    icon: Settings,
  },
];

type AppSidebarProps = {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
};

export function AppSidebar({
  collapsed,
  onCollapsedChange,
}: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 hidden h-screen shrink-0 border-r border-border bg-card transition-all duration-300 lg:flex lg:flex-col",
        collapsed ? "w-[88px]" : "w-[260px]",
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold text-foreground">Mercadorias</p>
            <p className="text-xs text-muted-foreground">
              Controle de entregas
            </p>
          </div>
        )}

        {collapsed && (
          <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            M
          </div>
        )}

        <button
          type="button"
          onClick={() => onCollapsedChange(!collapsed)}
          className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label="Expandir ou recolher sidebar"
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </button>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 py-4">
        {navItems.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className="shrink-0 border-t border-border p-3">
        <form action={logoutAction}>
          <button
            type="submit"
            className={cn(
              "flex h-10 w-full items-center gap-3 rounded-md border border-transparent px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
              collapsed && "justify-center px-0",
            )}
          >
            <LogOut className="size-4 shrink-0" />
            {!collapsed && <span>Sair</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}