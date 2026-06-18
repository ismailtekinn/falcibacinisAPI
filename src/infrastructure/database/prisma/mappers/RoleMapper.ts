import { Role as PrismaRole } from "@prisma/client";
import { Role } from "../../../../domain/entities/Role";

export class RoleMapper {
  static toDomain(raw: PrismaRole): Role {
    return new Role(raw.RoleID, raw.Name);
  }
}
