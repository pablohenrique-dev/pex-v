import type { MerchandiseStatus } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import {
  merchandiseStatusLabels,
  merchandiseStatusStyles,
} from "../constants/merchandise-status";

type MerchandiseStatusBadgeProps = {
  status: MerchandiseStatus;
};

export function MerchandiseStatusBadge({
  status,
}: MerchandiseStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium",
        merchandiseStatusStyles[status],
      )}
    >
      {merchandiseStatusLabels[status]}
    </span>
  );
}
