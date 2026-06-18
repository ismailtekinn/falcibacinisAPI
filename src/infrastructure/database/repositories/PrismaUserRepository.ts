import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { UserMapper } from "../prisma/mappers/UserMapper";
import { ConflictError } from "../../../shared/exceptions/ConflictError";
import { PrismaTransactionClient } from "../prisma/client";

type PrismaClientLike = PrismaClient | PrismaTransactionClient;

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly client: PrismaClientLike) {}

  async findById(id: number): Promise<User | null> {
    const user = await this.client.user.findUnique({
      where: { UserID: id },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.client.user.findUnique({
      where: { Email: email },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await this.client.user.findFirst({
      where: { Phone: phone },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async create(user: User): Promise<User> {
    try {
      const created = await this.client.user.create({
        data: UserMapper.toPersistence(user),
      });
      return UserMapper.toDomain(created);
    } catch (error: unknown) {
      if (this.isUniqueConstraintError(error, "Email")) {
        throw new ConflictError(
          "Bu e-posta adresiyle zaten bir kullanıcı kaydı bulunmaktadır.",
        );
      }
      throw error;
    }
  }

  async update(user: User): Promise<User> {
    if (user.id === null) {
      throw new Error("Cannot update user without id");
    }

    const updated = await this.client.user.update({
      where: { UserID: user.id },
      data: UserMapper.toPersistence(user),
    });
    return UserMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.client.user.delete({
      where: { UserID: id },
    });
  }

  private isUniqueConstraintError(error: unknown, field: string): boolean {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002" &&
      "meta" in error &&
      typeof error.meta === "object" &&
      error.meta !== null &&
      "target" in error.meta &&
      Array.isArray(error.meta.target) &&
      error.meta.target.includes(field)
    );
  }
}
