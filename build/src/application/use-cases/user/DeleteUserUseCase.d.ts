import { IUserRepository } from "../../../domain/repositories/IUserRepository";
export declare class DeleteUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(id: number): Promise<void>;
}
