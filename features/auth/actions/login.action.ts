"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createAuthToken } from "@/lib/auth";
import { loginSchema } from "../schemas/login.schema";

type LoginActionState = {
  success: boolean;
  message?: string;
};

export async function loginAction(data: unknown): Promise<LoginActionState> {
  const parsedData = loginSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Dados inválidos.",
    };
  }

  const { email, password } = parsedData.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "E-mail ou senha inválidos.",
    };
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return {
      success: false,
      message: "E-mail ou senha inválidos.",
    };
  }

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
