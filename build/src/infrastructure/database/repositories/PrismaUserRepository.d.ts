import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { PrismaTransactionClient } from "../prisma/client";
type PrismaClientLike = PrismaClient | PrismaTransactionClient;
export declare class PrismaUserRepository implements IUserRepository {
    private readonly client;
    constructor(client: PrismaClientLike);
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phone: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: number): Promise<void>;
    private isUniqueConstraintError;
}
export {};
