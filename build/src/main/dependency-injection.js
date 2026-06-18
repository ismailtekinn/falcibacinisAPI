"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = exports.Container = void 0;
const client_1 = __importDefault(require("../infrastructure/database/prisma/client"));
const PrismaUserRepository_1 = require("../infrastructure/database/repositories/PrismaUserRepository");
const PrismaRoleRepository_1 = require("../infrastructure/database/repositories/PrismaRoleRepository");
const PrismaUnitOfWork_1 = require("../infrastructure/database/unit-of-work/PrismaUnitOfWork");
const BcryptHasher_1 = require("../infrastructure/services/BcryptHasher");
const JwtTokenService_1 = require("../infrastructure/services/JwtTokenService");
const CreateUserUseCase_1 = require("../application/use-cases/user/CreateUserUseCase");
const UpdateUserUseCase_1 = require("../application/use-cases/user/UpdateUserUseCase");
const DeleteUserUseCase_1 = require("../application/use-cases/user/DeleteUserUseCase");
const GetUserByIdUseCase_1 = require("../application/use-cases/user/GetUserByIdUseCase");
const LoginUseCase_1 = require("../application/use-cases/auth/LoginUseCase");
const UserController_1 = require("../presentation/controllers/UserController");
const AuthController_1 = require("../presentation/controllers/AuthController");
class Container {
    constructor() {
        this.prisma = client_1.default;
        this.userRepository = new PrismaUserRepository_1.PrismaUserRepository(this.prisma);
        this.roleRepository = new PrismaRoleRepository_1.PrismaRoleRepository(this.prisma);
        this.unitOfWork = new PrismaUnitOfWork_1.PrismaUnitOfWork();
        this.hasher = new BcryptHasher_1.BcryptHasher();
        this.tokenService = new JwtTokenService_1.JwtTokenService();
        this.createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(this.userRepository, this.unitOfWork, this.hasher);
        this.updateUserUseCase = new UpdateUserUseCase_1.UpdateUserUseCase(this.userRepository);
        this.deleteUserUseCase = new DeleteUserUseCase_1.DeleteUserUseCase(this.userRepository);
        this.getUserByIdUseCase = new GetUserByIdUseCase_1.GetUserByIdUseCase(this.userRepository);
        this.loginUseCase = new LoginUseCase_1.LoginUseCase(this.userRepository, this.hasher, this.tokenService);
        this.userController = new UserController_1.UserController(this.createUserUseCase, this.updateUserUseCase, this.deleteUserUseCase, this.getUserByIdUseCase);
        this.authController = new AuthController_1.AuthController(this.loginUseCase);
    }
    static getInstance() {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }
}
exports.Container = Container;
exports.container = Container.getInstance();
