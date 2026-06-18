"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const httpStatus_1 = require("../../shared/constants/httpStatus");
const asyncHandler_1 = require("../../shared/utils/asyncHandler");
class UserController {
    constructor(createUserUseCase, updateUserUseCase, deleteUserUseCase, getUserByIdUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
        this.create = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const result = yield this.createUserUseCase.execute({
                name: body.name,
                surname: body.surname,
                email: body.email,
                password: body.password,
                phone: body.phone,
                username: body.username,
                roleId: body.roleId,
            });
            res.status(httpStatus_1.HttpStatus.CREATED).json({
                success: true,
                data: result,
            });
        }));
        this.getById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const result = yield this.getUserByIdUseCase.execute(id);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                data: result,
            });
        }));
        this.update = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const body = req.body;
            const result = yield this.updateUserUseCase.execute({
                id,
                name: body.name,
                surname: body.surname,
                phone: body.phone,
                username: body.username,
            });
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                data: result,
            });
        }));
        this.delete = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.deleteUserUseCase.execute(id);
            res.status(httpStatus_1.HttpStatus.NO_CONTENT).send();
        }));
    }
}
exports.UserController = UserController;
