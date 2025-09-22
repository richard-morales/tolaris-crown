// src/lib/db.ts
// Singleton Prisma client for Next.js (prevents multiple instances on HMR)
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"], // quiet but helpful
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
