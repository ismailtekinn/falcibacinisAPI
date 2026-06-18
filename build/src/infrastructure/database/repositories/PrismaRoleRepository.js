"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRoleRepository = void 0;
const RoleMapper_1 = require("../prisma/mappers/RoleMapper");
class PrismaRoleRepository {
    constructor(client) {
        this.client = client;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.client.role.findUnique({
                where: { RoleID: id },
            });
            return role ? RoleMapper_1.RoleMapper.toDomain(role) : null;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.client.role.findUnique({
                where: { Name: name },
            });
            return role ? RoleMapper_1.RoleMapper.toDomain(role) : null;
        });
    }
}
exports.PrismaRoleRepository = PrismaRoleRepository;
