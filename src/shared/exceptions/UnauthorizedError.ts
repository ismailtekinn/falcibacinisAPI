import { AppError } from "./AppError";
import { HttpStatus } from "../constants/httpStatus";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
