import "dotenv/config";
import { defineConfig } from "prisma/config";

if (!process.env.DIRECT_URL) {
  throw new Error("DIRECT_URL não foi definida no arquivo .env");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DIRECT_URL,
  },
});
