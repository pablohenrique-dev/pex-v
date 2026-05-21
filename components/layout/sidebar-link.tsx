"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  collapsed?: boolean;
  onClick?: () => void;
};

export function SidebarLink({
  href,
  label,
  icon: Icon,
  collapsed = false,
  onClick,
}: SidebarLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex h-10 items-center gap-3 rounded-md border px-3 text-sm font-medium transition",
        isActive
          ? "border-primary bg-primary/10 text-primary"
          : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-0",
      )}
    >
      <Icon className="size-4 shrink-0" />

      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
