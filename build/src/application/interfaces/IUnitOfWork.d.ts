import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IRoleRepository } from "../../domain/repositories/IRoleRepository";
export interface IUnitOfWorkRepositories {
    users: IUserRepository;
    roles: IRoleRepository;
}
export interface IUnitOfWork {
    execute<T>(work: (repositories: IUnitOfWorkRepositories) => Promise<T>): Promise<T>;
}
