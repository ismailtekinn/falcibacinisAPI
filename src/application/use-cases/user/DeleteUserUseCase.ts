import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { NotFoundError } from "../../../shared/exceptions/NotFoundError";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError("Kullanıcı bulunamadı.");
    }

    await this.userRepository.delete(id);
  }
}
