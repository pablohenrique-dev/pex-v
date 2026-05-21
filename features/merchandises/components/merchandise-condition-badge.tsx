import type { MerchandiseCondition } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import {
  merchandiseConditionLabels,
  merchandiseConditionStyles,
} from "../constants/merchandise-condition";

type MerchandiseConditionBadgeProps = {
  condition: MerchandiseCondition;
};

export function MerchandiseConditionBadge({
  condition,
}: MerchandiseConditionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium",
        merchandiseConditionStyles[condition],
      )}
    >
      {merchandiseConditionLabels[condition]}
    </span>
  );
}
