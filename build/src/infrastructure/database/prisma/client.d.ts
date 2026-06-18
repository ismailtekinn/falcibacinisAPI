import { Prisma, PrismaClient } from "@prisma/client";
declare global {
    var prismaGlobal: PrismaClient | undefined;
}
declare const prisma: PrismaClient<Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export default prisma;
export type PrismaTransactionClient = Prisma.TransactionClient;
