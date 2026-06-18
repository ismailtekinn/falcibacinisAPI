import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IHasher } from "../../interfaces/IHasher";
import { ITokenService } from "../../interfaces/ITokenService";
import { LoginRequestDto } from "../../dto/auth/LoginRequestDto";
import { LoginResponseDto } from "../../dto/auth/LoginResponseDto";
import { UserDtoMapper } from "../../services/UserDtoMapper";
import { NotFoundError } from "../../../shared/exceptions/NotFoundError";
import { UnauthorizedError } from "../../../shared/exceptions/UnauthorizedError";

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasher: IHasher,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByPhone(dto.phone);
    if (!user) {
      throw new NotFoundError("Kullanıcı bulunamadı.");
    }

    if (!user.verified) {
      throw new UnauthorizedError(
        "Hesabınız henüz aktif değil. Yönetici onayı bekleniyor.",
      );
    }

    const isPasswordValid = await this.hasher.compare(
      dto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError("Geçersiz kimlik bilgileri.");
    }

    if (user.id === null) {
      throw new UnauthorizedError("Geçersiz kullanıcı.");
    }

    const token = this.tokenService.generate({
      userId: user.id,
      email: user.email,
      roleId: user.roleId,
    });

    return {
      token,
      user: UserDtoMapper.toResponse(user),
    };
  }
}
