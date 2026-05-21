// features/merchandises/constants/merchandise-status.ts

import type { MerchandiseStatus } from "@/lib/generated/prisma/client";

export const merchandiseStatusLabels: Record<MerchandiseStatus, string> = {
  RECEIVED: "Recebida",
  SEPARATED: "Separada",
  OUT_FOR_DELIVERY: "Em rota",
  DELIVERED: "Entregue",
  NOT_DELIVERED: "Não entregue",
  RETURNED: "Devolvida",
  WITH_ISSUE: "Com ocorrência",
};

export const merchandiseStatusStyles: Record<MerchandiseStatus, string> = {
  RECEIVED: "border-blue-200 bg-blue-50 text-blue-700",
  SEPARATED: "border-violet-200 bg-violet-50 text-violet-700",
  OUT_FOR_DELIVERY: "border-amber-200 bg-amber-50 text-amber-700",
  DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  NOT_DELIVERED: "border-red-200 bg-red-50 text-red-700",
  RETURNED: "border-zinc-200 bg-zinc-50 text-zinc-700",
  WITH_ISSUE: "border-orange-200 bg-orange-50 text-orange-700",
};

export const merchandiseStatusOptions = Object.entries(
  merchandiseStatusLabels,
).map(([value, label]) => ({
  value: value as MerchandiseStatus,
  label,
}));
