import { User as PrismaUser } from "@prisma/client";
import { User } from "../../../../domain/entities/User";
export declare class UserMapper {
    static toDomain(raw: PrismaUser): User;
    static toPersistence(user: User): {
        Name: string;
        Surname: string;
        Email: string;
        Password: string;
        Phone: string;
        Username: string | null;
        Verified: boolean;
        RoleID: number;
        Update_At: Date;
    };
}
