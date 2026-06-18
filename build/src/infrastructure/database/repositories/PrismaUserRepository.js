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
exports.PrismaUserRepository = void 0;
const UserMapper_1 = require("../prisma/mappers/UserMapper");
const ConflictError_1 = require("../../../shared/exceptions/ConflictError");
class PrismaUserRepository {
    constructor(client) {
        this.client = client;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.client.user.findUnique({
                where: { UserID: id },
            });
            return user ? UserMapper_1.UserMapper.toDomain(user) : null;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.client.user.findUnique({
                where: { Email: email },
            });
            return user ? UserMapper_1.UserMapper.toDomain(user) : null;
        });
    }
    findByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.client.user.findFirst({
                where: { Phone: phone },
            });
            return user ? UserMapper_1.UserMapper.toDomain(user) : null;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const created = yield this.client.user.create({
                    data: UserMapper_1.UserMapper.toPersistence(user),
                });
                return UserMapper_1.UserMapper.toDomain(created);
            }
            catch (error) {
                if (this.isUniqueConstraintError(error, "Email")) {
                    throw new ConflictError_1.ConflictError("Bu e-posta adresiyle zaten bir kullanıcı kaydı bulunmaktadır.");
                }
                throw error;
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.id === null) {
                throw new Error("Cannot update user without id");
            }
            const updated = yield this.client.user.update({
                where: { UserID: user.id },
                data: UserMapper_1.UserMapper.toPersistence(user),
            });
            return UserMapper_1.UserMapper.toDomain(updated);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.user.delete({
                where: { UserID: id },
            });
        });
    }
    isUniqueConstraintError(error, field) {
        return (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2002" &&
            "meta" in error &&
            typeof error.meta === "object" &&
            error.meta !== null &&
            "target" in error.meta &&
            Array.isArray(error.meta.target) &&
            error.meta.target.includes(field));
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
