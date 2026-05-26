import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type MerchandiseTablePaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  search?: string;
};

function createDashboardUrl({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (search?.trim()) {
    params.set("q", search.trim());
  }

  return `/dashboard?${params.toString()}`;
}

export function MerchandiseTablePagination({
  currentPage,
  totalPages,
  totalItems,
  search,
}: MerchandiseTablePaginationProps) {
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {totalItems === 0
          ? "Nenhuma mercadoria encontrada."
          : `Página ${currentPage} de ${totalPages} • ${totalItems} mercadoria(s)`}
      </p>

      <div className="flex items-center gap-2">
        <Link
          href={createDashboardUrl({
            page: currentPage - 1,
            search,
          })}
          aria-disabled={!hasPreviousPage}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground transition hover:bg-muted",
            !hasPreviousPage && "pointer-events-none opacity-50 hover:bg-card",
          )}
        >
          <ChevronLeft className="size-4" />
        </Link>

        <span className="flex h-10 min-w-10 items-center justify-center rounded-md border border-border bg-card px-3 text-sm font-medium text-foreground">
          {currentPage}
        </span>

        <Link
          href={createDashboardUrl({
            page: currentPage + 1,
            search,
          })}
          aria-disabled={!hasNextPage}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground transition hover:bg-muted",
            !hasNextPage && "pointer-events-none opacity-50 hover:bg-card",
          )}
        >
          <ChevronRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
