import {
  IUnitOfWork,
  IUnitOfWorkRepositories,
} from "../../../application/interfaces/IUnitOfWork";
import prisma from "../prisma/client";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { PrismaRoleRepository } from "../repositories/PrismaRoleRepository";

export class PrismaUnitOfWork implements IUnitOfWork {
  async execute<T>(
    work: (repositories: IUnitOfWorkRepositories) => Promise<T>,
  ): Promise<T> {
    return prisma.$transaction(async (tx) => {
      const repositories: IUnitOfWorkRepositories = {
        users: new PrismaUserRepository(tx),
        roles: new PrismaRoleRepository(tx),
      };

      return work(repositories);
    });
  }
}
