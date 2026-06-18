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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUnitOfWork = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const PrismaUserRepository_1 = require("../repositories/PrismaUserRepository");
const PrismaRoleRepository_1 = require("../repositories/PrismaRoleRepository");
class PrismaUnitOfWork {
    execute(work) {
        return __awaiter(this, void 0, void 0, function* () {
            return client_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const repositories = {
                    users: new PrismaUserRepository_1.PrismaUserRepository(tx),
                    roles: new PrismaRoleRepository_1.PrismaRoleRepository(tx),
                };
                return work(repositories);
            }));
        });
    }
}
exports.PrismaUnitOfWork = PrismaUnitOfWork;
