"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const User_1 = require("../../../../domain/entities/User");
class UserMapper {
    static toDomain(raw) {
        return new User_1.User(raw.UserID, raw.Name, raw.Surname, raw.Email, raw.Password, raw.Phone, raw.Username, raw.Verified, raw.RoleID, raw.Created_At, raw.Update_At);
    }
    static toPersistence(user) {
        var _a;
        return {
            Name: user.name,
            Surname: user.surname,
            Email: user.email,
            Password: user.password,
            Phone: user.phone,
            Username: user.username,
            Verified: user.verified,
            RoleID: user.roleId,
            Update_At: (_a = user.updatedAt) !== null && _a !== void 0 ? _a : new Date(),
        };
    }
}
exports.UserMapper = UserMapper;
