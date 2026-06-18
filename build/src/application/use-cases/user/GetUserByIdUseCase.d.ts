import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserResponseDto } from "../../dto/user/UserResponseDto";
export declare class GetUserByIdUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: number): Promise<UserResponseDto>;
}
