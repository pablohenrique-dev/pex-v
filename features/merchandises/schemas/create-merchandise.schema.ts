import { z } from "zod";

export const MAX_MERCHANDISE_IMAGE_SIZE = 1024 * 1024; // 1MB

export const ACCEPTED_MERCHANDISE_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const createMerchandiseSchema = z
  .object({
    code: z
      .string()
      .min(1, "O código é obrigatório.")
      .max(100, "O código deve ter no máximo 100 caracteres."),

    description: z
      .string()
      .min(1, "A descrição é obrigatória.")
      .max(255, "A descrição deve ter no máximo 255 caracteres."),

    recipientName: z
      .string()
      .max(150, "O nome do destinatário deve ter no máximo 150 caracteres.")
      .optional()
      .or(z.literal("")),

    recipientPhone: z
      .string()
      .max(30, "O telefone deve ter no máximo 30 caracteres.")
      .optional()
      .or(z.literal("")),

    deliveryAddress: z
      .string()
      .max(255, "O endereço deve ter no máximo 255 caracteres.")
      .optional()
      .or(z.literal("")),

    deliveryRegion: z
      .string()
      .max(120, "A região deve ter no máximo 120 caracteres.")
      .optional()
      .or(z.literal("")),

    status: z.enum([
      "RECEIVED",
      "SEPARATED",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "NOT_DELIVERED",
      "RETURNED",
      "WITH_ISSUE",
    ]),

    condition: z.enum([
      "NORMAL",
      "DAMAGED_PACKAGE",
      "VIOLATED_PACKAGE",
      "DAMAGED_PRODUCT",
      "INCOMPLETE_PRODUCT",
      "OTHER",
    ]),

    notes: z
      .string()
      .max(1000, "As observações devem ter no máximo 1000 caracteres.")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const hasProblem = data.condition !== "NORMAL";
    const needsReason =
      data.status === "NOT_DELIVERED" || data.status === "WITH_ISSUE";

    if ((hasProblem || needsReason) && !data.notes?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["notes"],
        message:
          "Informe uma observação quando houver problema, ocorrência ou entrega não realizada.",
      });
    }
  });

export type CreateMerchandiseInput = z.infer<typeof createMerchandiseSchema>;
