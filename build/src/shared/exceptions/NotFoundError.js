"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const AppError_1 = require("./AppError");
const httpStatus_1 = require("../constants/httpStatus");
class NotFoundError extends AppError_1.AppError {
    constructor(message = "Resource not found") {
        super(message, httpStatus_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundError = NotFoundError;
