import { PrismaClient } from "@prisma/client";
import { IRoleRepository } from "../../../domain/repositories/IRoleRepository";
import { Role } from "../../../domain/entities/Role";
import { RoleMapper } from "../prisma/mappers/RoleMapper";
import { PrismaTransactionClient } from "../prisma/client";

type PrismaClientLike = PrismaClient | PrismaTransactionClient;

export class PrismaRoleRepository implements IRoleRepository {
  constructor(private readonly client: PrismaClientLike) {}

  async findById(id: number): Promise<Role | null> {
    const role = await this.client.role.findUnique({
      where: { RoleID: id },
    });
    return role ? RoleMapper.toDomain(role) : null;
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.client.role.findUnique({
      where: { Name: name },
    });
    return role ? RoleMapper.toDomain(role) : null;
  }
}
