import { Request, Response, NextFunction } from "express";
import { ITokenService } from "../../application/interfaces/ITokenService";
import { UnauthorizedError } from "../../shared/exceptions/UnauthorizedError";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
    roleId: number;
  };
}

export const createAuthMiddleware =
  (tokenService: ITokenService) =>
  (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      next(new UnauthorizedError("Access token is required"));
      return;
    }

    const token = authHeader.slice(7);
    const payload = tokenService.verify(token);

    if (!payload) {
      next(new UnauthorizedError("Invalid or expired token"));
      return;
    }

    req.user = payload;
    next();
  };
