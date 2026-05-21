import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

type AuthTokenPayload = {
  userId: string;
  email: string;
  role: string;
};

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as AuthTokenPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}
