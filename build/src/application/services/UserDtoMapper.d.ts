import { User } from "../../domain/entities/User";
import { UserResponseDto } from "../dto/user/UserResponseDto";
import { CreateUserResponseDto } from "../dto/user/CreateUserResponseDto";
export declare class UserDtoMapper {
    static toResponse(user: User): UserResponseDto;
    static toCreateResponse(user: User): CreateUserResponseDto;
}
