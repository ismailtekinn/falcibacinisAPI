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
exports.AuthController = void 0;
const httpStatus_1 = require("../../shared/constants/httpStatus");
const asyncHandler_1 = require("../../shared/utils/asyncHandler");
class AuthController {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
        this.login = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const result = yield this.loginUseCase.execute({
                phone: body.phone,
                password: body.password,
            });
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                data: result,
            });
        }));
    }
}
exports.AuthController = AuthController;
