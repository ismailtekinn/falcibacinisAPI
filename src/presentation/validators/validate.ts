import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ValidationError } from "../../shared/exceptions/ValidationError";

type RequestSource = "body" | "params" | "query";

export const validate =
  <T>(schema: ZodSchema<T>, source: RequestSource = "body"): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[source]);
      req[source] = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.flatten().fieldErrors as Record<string, string[]>;
        next(new ValidationError("Validation failed", details));
        return;
      }
      next(error);
    }
  };
