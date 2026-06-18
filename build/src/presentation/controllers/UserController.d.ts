import { CreateUserUseCase } from "../../application/use-cases/user/CreateUserUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/user/DeleteUserUseCase";
import { GetUserByIdUseCase } from "../../application/use-cases/user/GetUserByIdUseCase";
export declare class UserController {
    private readonly createUserUseCase;
    private readonly updateUserUseCase;
    private readonly deleteUserUseCase;
    private readonly getUserByIdUseCase;
    constructor(createUserUseCase: CreateUserUseCase, updateUserUseCase: UpdateUserUseCase, deleteUserUseCase: DeleteUserUseCase, getUserByIdUseCase: GetUserByIdUseCase);
    create: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    getById: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    update: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    delete: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
}
