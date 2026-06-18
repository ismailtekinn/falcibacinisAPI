import { Role as PrismaRole } from "@prisma/client";
import { Role } from "../../../../domain/entities/Role";
export declare class RoleMapper {
    static toDomain(raw: PrismaRole): Role;
}
