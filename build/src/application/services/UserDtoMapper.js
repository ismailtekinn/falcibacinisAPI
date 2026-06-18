"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDtoMapper = void 0;
class UserDtoMapper {
    static toResponse(user) {
        var _a, _b;
        if (user.id === null) {
            throw new Error("Cannot map user without id to response DTO");
        }
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            username: user.username,
            verified: user.verified,
            roleId: user.roleId,
            createdAt: (_a = user.createdAt) !== null && _a !== void 0 ? _a : new Date(),
            updatedAt: (_b = user.updatedAt) !== null && _b !== void 0 ? _b : new Date(),
        };
    }
    static toCreateResponse(user) {
        var _a;
        if (user.id === null) {
            throw new Error("Cannot map user without id to create response DTO");
        }
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            username: user.username,
            verified: user.verified,
            roleId: user.roleId,
            createdAt: (_a = user.createdAt) !== null && _a !== void 0 ? _a : new Date(),
        };
    }
}
exports.UserDtoMapper = UserDtoMapper;
