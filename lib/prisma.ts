// ./lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import { env } from '@/env.mjs'

declare global {
  // Prevent multiple instances of Prisma Client in development (hot reloads)
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma ?? new PrismaClient()

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export const db = prisma
