import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UpdateUserRequestDto } from "../../dto/user/UpdateUserRequestDto";
import { UserResponseDto } from "../../dto/user/UserResponseDto";
export declare class UpdateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(dto: UpdateUserRequestDto): Promise<UserResponseDto>;
}
