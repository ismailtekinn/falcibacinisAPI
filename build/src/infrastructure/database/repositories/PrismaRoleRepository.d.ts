import { PrismaClient } from "@prisma/client";
import { IRoleRepository } from "../../../domain/repositories/IRoleRepository";
import { Role } from "../../../domain/entities/Role";
import { PrismaTransactionClient } from "../prisma/client";
type PrismaClientLike = PrismaClient | PrismaTransactionClient;
export declare class PrismaRoleRepository implements IRoleRepository {
    private readonly client;
    constructor(client: PrismaClientLike);
    findById(id: number): Promise<Role | null>;
    findByName(name: string): Promise<Role | null>;
}
export {};
