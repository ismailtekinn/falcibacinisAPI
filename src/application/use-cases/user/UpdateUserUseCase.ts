import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UpdateUserRequestDto } from "../../dto/user/UpdateUserRequestDto";
import { UserResponseDto } from "../../dto/user/UserResponseDto";
import { UserDtoMapper } from "../../services/UserDtoMapper";
import { NotFoundError } from "../../../shared/exceptions/NotFoundError";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: UpdateUserRequestDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(dto.id);
    if (!user) {
      throw new NotFoundError("Kullanıcı bulunamadı.");
    }

    user.updateProfile({
      name: dto.name,
      surname: dto.surname,
      phone: dto.phone,
      username: dto.username,
    });

    const updatedUser = await this.userRepository.update(user);
    return UserDtoMapper.toResponse(updatedUser);
  }
}
