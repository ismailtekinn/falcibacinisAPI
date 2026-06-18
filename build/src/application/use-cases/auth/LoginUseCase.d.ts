import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IHasher } from "../../interfaces/IHasher";
import { ITokenService } from "../../interfaces/ITokenService";
import { LoginRequestDto } from "../../dto/auth/LoginRequestDto";
import { LoginResponseDto } from "../../dto/auth/LoginResponseDto";
export declare class LoginUseCase {
    private readonly userRepository;
    private readonly hasher;
    private readonly tokenService;
    constructor(userRepository: IUserRepository, hasher: IHasher, tokenService: ITokenService);
    execute(dto: LoginRequestDto): Promise<LoginResponseDto>;
}
