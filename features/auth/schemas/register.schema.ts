// src/features/auth/schemas/register.schema.ts

import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "O nome é obrigatório.")
      .min(3, "O nome deve ter pelo menos 3 caracteres."),

    email: z
      .string()
      .min(1, "O e-mail é obrigatório.")
      .email("Informe um e-mail válido."),

    password: z
      .string()
      .min(1, "A senha é obrigatória.")
      .min(6, "A senha deve ter pelo menos 6 caracteres."),

    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem.",
  });

export type RegisterInput = z.infer<typeof registerSchema>;
