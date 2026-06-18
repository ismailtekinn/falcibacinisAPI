"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const AppError_1 = require("./AppError");
const httpStatus_1 = require("../constants/httpStatus");
class ConflictError extends AppError_1.AppError {
    constructor(message = "Resource already exists") {
        super(message, httpStatus_1.HttpStatus.CONFLICT);
    }
}
exports.ConflictError = ConflictError;
