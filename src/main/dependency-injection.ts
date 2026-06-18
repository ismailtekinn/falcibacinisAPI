import prisma from "../infrastructure/database/prisma/client";
import { PrismaUserRepository } from "../infrastructure/database/repositories/PrismaUserRepository";
import { PrismaRoleRepository } from "../infrastructure/database/repositories/PrismaRoleRepository";
import { PrismaUnitOfWork } from "../infrastructure/database/unit-of-work/PrismaUnitOfWork";
import { BcryptHasher } from "../infrastructure/services/BcryptHasher";
import { JwtTokenService } from "../infrastructure/services/JwtTokenService";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IRoleRepository } from "../domain/repositories/IRoleRepository";
import { IUnitOfWork } from "../application/interfaces/IUnitOfWork";
import { IHasher } from "../application/interfaces/IHasher";
import { ITokenService } from "../application/interfaces/ITokenService";
import { CreateUserUseCase } from "../application/use-cases/user/CreateUserUseCase";
import { UpdateUserUseCase } from "../application/use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../application/use-cases/user/DeleteUserUseCase";
import { GetUserByIdUseCase } from "../application/use-cases/user/GetUserByIdUseCase";
import { LoginUseCase } from "../application/use-cases/auth/LoginUseCase";
import { UserController } from "../presentation/controllers/UserController";
import { AuthController } from "../presentation/controllers/AuthController";

export class Container {
  private static instance: Container;

  public readonly prisma = prisma;
  public readonly userRepository: IUserRepository;
  public readonly roleRepository: IRoleRepository;
  public readonly unitOfWork: IUnitOfWork;
  public readonly hasher: IHasher;
  public readonly tokenService: ITokenService;

  public readonly createUserUseCase: CreateUserUseCase;
  public readonly updateUserUseCase: UpdateUserUseCase;
  public readonly deleteUserUseCase: DeleteUserUseCase;
  public readonly getUserByIdUseCase: GetUserByIdUseCase;
  public readonly loginUseCase: LoginUseCase;

  public readonly userController: UserController;
  public readonly authController: AuthController;

  private constructor() {
    this.userRepository = new PrismaUserRepository(this.prisma);
    this.roleRepository = new PrismaRoleRepository(this.prisma);
    this.unitOfWork = new PrismaUnitOfWork();
    this.hasher = new BcryptHasher();
    this.tokenService = new JwtTokenService();

    this.createUserUseCase = new CreateUserUseCase(
      this.userRepository,
      this.unitOfWork,
      this.hasher,
    );
    this.updateUserUseCase = new UpdateUserUseCase(this.userRepository);
    this.deleteUserUseCase = new DeleteUserUseCase(this.userRepository);
    this.getUserByIdUseCase = new GetUserByIdUseCase(this.userRepository);
    this.loginUseCase = new LoginUseCase(
      this.userRepository,
      this.hasher,
      this.tokenService,
    );

    this.userController = new UserController(
      this.createUserUseCase,
      this.updateUserUseCase,
      this.deleteUserUseCase,
      this.getUserByIdUseCase,
    );
    this.authController = new AuthController(this.loginUseCase);
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }
}

export const container = Container.getInstance();
