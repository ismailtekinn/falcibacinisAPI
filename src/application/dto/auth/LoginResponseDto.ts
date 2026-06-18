import { UserResponseDto } from "../user/UserResponseDto";

export interface LoginResponseDto {
  token: string;
  user: UserResponseDto;
}
