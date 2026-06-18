import { IUnitOfWork, IUnitOfWorkRepositories } from "../../../application/interfaces/IUnitOfWork";
export declare class PrismaUnitOfWork implements IUnitOfWork {
    execute<T>(work: (repositories: IUnitOfWorkRepositories) => Promise<T>): Promise<T>;
}
