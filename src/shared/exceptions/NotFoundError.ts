import { AppError } from "./AppError";
import { HttpStatus } from "../constants/httpStatus";

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, HttpStatus.NOT_FOUND);
  }
}
