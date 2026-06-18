import { User } from "../../domain/entities/User";
import { UserResponseDto } from "../dto/user/UserResponseDto";
import { CreateUserResponseDto } from "../dto/user/CreateUserResponseDto";

export class UserDtoMapper {
  static toResponse(user: User): UserResponseDto {
    if (user.id === null) {
      throw new Error("Cannot map user without id to response DTO");
    }

    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      username: user.username,
      verified: user.verified,
      roleId: user.roleId,
      createdAt: user.createdAt ?? new Date(),
      updatedAt: user.updatedAt ?? new Date(),
    };
  }

  static toCreateResponse(user: User): CreateUserResponseDto {
    if (user.id === null) {
      throw new Error("Cannot map user without id to create response DTO");
    }

    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      username: user.username,
      verified: user.verified,
      roleId: user.roleId,
      createdAt: user.createdAt ?? new Date(),
    };
  }
}
