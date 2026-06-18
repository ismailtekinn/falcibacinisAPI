import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserResponseDto } from "../../dto/user/UserResponseDto";
import { UserDtoMapper } from "../../services/UserDtoMapper";
import { NotFoundError } from "../../../shared/exceptions/NotFoundError";

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError("Kullanıcı bulunamadı.");
    }

    return UserDtoMapper.toResponse(user);
  }
}
