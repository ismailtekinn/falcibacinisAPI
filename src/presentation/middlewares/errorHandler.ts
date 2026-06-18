import { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/exceptions/AppError";
import { ValidationError } from "../../shared/exceptions/ValidationError";
import { HttpStatus } from "../../shared/constants/httpStatus";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ValidationError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details,
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  console.error("Unhandled error:", error);

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error",
  });
};
