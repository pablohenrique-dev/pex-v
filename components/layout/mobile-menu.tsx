"use client";

import { useState } from "react";
import {
  Boxes,
  LayoutDashboard,
  LogOut,
  Menu,
  PackagePlus,
  Settings,
  X,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarLink } from "./sidebar-link";
import { logoutAction } from "@/features/auth/actions/logout.action";
import { navItems } from "./app-sidebar";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:hidden">
      <div>
        <p className="text-sm font-semibold text-foreground">Mercadorias</p>
        <p className="text-xs text-muted-foreground">Controle de entregas</p>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="flex w-full max-w-xs flex-col border-r border-border bg-card p-0"
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <SheetTitle className="text-base font-semibold">Menu</SheetTitle>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground"
              aria-label="Fechar menu"
            >
              <X className="size-4" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-2 px-4 py-5">
            {navItems.map((item) => (
              <SidebarLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                onClick={() => setOpen(false)}
              />
            ))}
          </nav>

          <div className="border-t border-border p-4">
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <LogOut className="size-4" />
                Sair
              </button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
