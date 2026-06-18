"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthMiddleware = void 0;
const UnauthorizedError_1 = require("../../shared/exceptions/UnauthorizedError");
const createAuthMiddleware = (tokenService) => (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
        next(new UnauthorizedError_1.UnauthorizedError("Access token is required"));
        return;
    }
    const token = authHeader.slice(7);
    const payload = tokenService.verify(token);
    if (!payload) {
        next(new UnauthorizedError_1.UnauthorizedError("Invalid or expired token"));
        return;
    }
    req.user = payload;
    next();
};
exports.createAuthMiddleware = createAuthMiddleware;
