import { Request, Response, NextFunction } from "express";
import { ITokenService } from "../../application/interfaces/ITokenService";
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        email: string;
        roleId: number;
    };
}
export declare const createAuthMiddleware: (tokenService: ITokenService) => (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
