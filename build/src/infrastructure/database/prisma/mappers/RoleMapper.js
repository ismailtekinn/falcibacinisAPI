"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMapper = void 0;
const Role_1 = require("../../../../domain/entities/Role");
class RoleMapper {
    static toDomain(raw) {
        return new Role_1.Role(raw.RoleID, raw.Name);
    }
}
exports.RoleMapper = RoleMapper;
