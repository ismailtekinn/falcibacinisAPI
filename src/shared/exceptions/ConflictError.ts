import { AppError } from "./AppError";
import { HttpStatus } from "../constants/httpStatus";

export class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super(message, HttpStatus.CONFLICT);
  }
}
