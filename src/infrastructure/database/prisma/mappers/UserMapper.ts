import { User as PrismaUser } from "@prisma/client";
import { User } from "../../../../domain/entities/User";

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User(
      raw.UserID,
      raw.Name,
      raw.Surname,
      raw.Email,
      raw.Password,
      raw.Phone,
      raw.Username,
      raw.Verified,
      raw.RoleID,
      raw.Created_At,
      raw.Update_At,
    );
  }

  static toPersistence(user: User) {
    return {
      Name: user.name,
      Surname: user.surname,
      Email: user.email,
      Password: user.password,
      Phone: user.phone,
      Username: user.username,
      Verified: user.verified,
      RoleID: user.roleId,
      Update_At: user.updatedAt ?? new Date(),
    };
  }
}
