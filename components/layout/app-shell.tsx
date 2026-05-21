"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { AppSidebar } from "./app-sidebar";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />

      <div
        className={cn(
          "min-h-screen min-w-0 transition-[padding] duration-300",
          collapsed ? "lg:pl-[88px]" : "lg:pl-[260px]",
        )}
      >
        <MobileMenu />

        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
