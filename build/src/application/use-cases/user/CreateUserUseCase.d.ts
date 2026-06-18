import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork";
import { IHasher } from "../../interfaces/IHasher";
import { CreateUserRequestDto } from "../../dto/user/CreateUserRequestDto";
import { CreateUserResponseDto } from "../../dto/user/CreateUserResponseDto";
export declare class CreateUserUseCase {
    private readonly userRepository;
    private readonly unitOfWork;
    private readonly hasher;
    constructor(userRepository: IUserRepository, unitOfWork: IUnitOfWork, hasher: IHasher);
    execute(dto: CreateUserRequestDto): Promise<CreateUserResponseDto>;
}
