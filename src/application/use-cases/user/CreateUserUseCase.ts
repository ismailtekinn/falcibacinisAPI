import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork";
import { IHasher } from "../../interfaces/IHasher";
import { CreateUserRequestDto } from "../../dto/user/CreateUserRequestDto";
import { CreateUserResponseDto } from "../../dto/user/CreateUserResponseDto";
import { UserDtoMapper } from "../../services/UserDtoMapper";
import { ConflictError } from "../../../shared/exceptions/ConflictError";
import { NotFoundError } from "../../../shared/exceptions/NotFoundError";
import { DEFAULT_ROLE_ID } from "../../../shared/constants/defaultRole";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly unitOfWork: IUnitOfWork,
    private readonly hasher: IHasher,
  ) {}

  async execute(dto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictError(
        "Bu e-posta adresiyle zaten bir kullanıcı kaydı bulunmaktadır.",
      );
    }

    const hashedPassword = await this.hasher.hash(dto.password);
    const roleId = dto.roleId ?? DEFAULT_ROLE_ID;

    const user = User.create({
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      password: hashedPassword,
      phone: dto.phone,
      username: dto.username,
      roleId,
    });

    const createdUser = await this.unitOfWork.execute(async (repositories) => {
      const role = await repositories.roles.findById(roleId);
      if (!role) {
        throw new NotFoundError(`Role with id ${roleId} not found`);
      }

      return repositories.users.create(user);
    });

    return UserDtoMapper.toCreateResponse(createdUser);
  }
}
