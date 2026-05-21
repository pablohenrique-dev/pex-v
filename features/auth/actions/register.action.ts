"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createAuthToken } from "@/lib/auth";
import { registerSchema } from "../schemas/register.schema";

type RegisterActionState = {
  success: boolean;
  message?: string;
};

export async function registerAction(
  data: unknown,
): Promise<RegisterActionState> {
  const parsedData = registerSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Dados inválidos.",
    };
  }

  const { name, email, password } = parsedData.data;

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    return {
      success: false,
      message: "Já existe uma conta cadastrada com este e-mail.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = createAuthToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
}
