import type { MerchandiseCondition } from "@/lib/generated/prisma/client";

export const merchandiseConditionLabels: Record<MerchandiseCondition, string> =
  {
    NORMAL: "Normal",
    DAMAGED_PACKAGE: "Embalagem danificada",
    VIOLATED_PACKAGE: "Embalagem violada",
    DAMAGED_PRODUCT: "Produto danificado",
    INCOMPLETE_PRODUCT: "Produto incompleto",
    OTHER: "Outro",
  };

export const merchandiseConditionStyles: Record<MerchandiseCondition, string> =
  {
    NORMAL: "border-emerald-200 bg-emerald-50 text-emerald-700",
    DAMAGED_PACKAGE: "border-orange-200 bg-orange-50 text-orange-700",
    VIOLATED_PACKAGE: "border-red-200 bg-red-50 text-red-700",
    DAMAGED_PRODUCT: "border-red-200 bg-red-50 text-red-700",
    INCOMPLETE_PRODUCT: "border-amber-200 bg-amber-50 text-amber-700",
    OTHER: "border-zinc-200 bg-zinc-50 text-zinc-700",
  };

export const merchandiseConditionOptions = Object.entries(
  merchandiseConditionLabels,
).map(([value, label]) => ({
  value: value as MerchandiseCondition,
  label,
}));
