import { AppError } from "./AppError";
import { HttpStatus } from "../constants/httpStatus";

export class ValidationError extends AppError {
  public readonly details: Record<string, string[]>;

  constructor(message: string, details: Record<string, string[]> = {}) {
    super(message, HttpStatus.BAD_REQUEST);
    this.details = details;
  }
}
