// src/lib/auth.ts

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não foi definido no arquivo .env");
}

type AuthTokenPayload = {
  userId: string;
  email: string;
  role: string;
};

export function createAuthToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, JWT_SECRET!, {
    expiresIn: "7d",
  });
}
