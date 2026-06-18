"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../../shared/exceptions/AppError");
const ValidationError_1 = require("../../shared/exceptions/ValidationError");
const httpStatus_1 = require("../../shared/constants/httpStatus");
const errorHandler = (error, _req, res, _next) => {
    if (error instanceof ValidationError_1.ValidationError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            details: error.details,
        });
        return;
    }
    if (error instanceof AppError_1.AppError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
        return;
    }
    console.error("Unhandled error:", error);
    res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error",
    });
};
exports.errorHandler = errorHandler;
