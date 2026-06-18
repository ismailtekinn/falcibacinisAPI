"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const AppError_1 = require("./AppError");
const httpStatus_1 = require("../constants/httpStatus");
class UnauthorizedError extends AppError_1.AppError {
    constructor(message = "Unauthorized") {
        super(message, httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedError = UnauthorizedError;
