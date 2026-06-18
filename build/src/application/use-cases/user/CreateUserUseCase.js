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
exports.CreateUserUseCase = void 0;
const User_1 = require("../../../domain/entities/User");
const UserDtoMapper_1 = require("../../services/UserDtoMapper");
const ConflictError_1 = require("../../../shared/exceptions/ConflictError");
const NotFoundError_1 = require("../../../shared/exceptions/NotFoundError");
const defaultRole_1 = require("../../../shared/constants/defaultRole");
class CreateUserUseCase {
    constructor(userRepository, unitOfWork, hasher) {
        this.userRepository = userRepository;
        this.unitOfWork = unitOfWork;
        this.hasher = hasher;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const existingUser = yield this.userRepository.findByEmail(dto.email);
            if (existingUser) {
                throw new ConflictError_1.ConflictError("Bu e-posta adresiyle zaten bir kullanıcı kaydı bulunmaktadır.");
            }
            const hashedPassword = yield this.hasher.hash(dto.password);
            const roleId = (_a = dto.roleId) !== null && _a !== void 0 ? _a : defaultRole_1.DEFAULT_ROLE_ID;
            const user = User_1.User.create({
                name: dto.name,
                surname: dto.surname,
                email: dto.email,
                password: hashedPassword,
                phone: dto.phone,
                username: dto.username,
                roleId,
            });
            const createdUser = yield this.unitOfWork.execute((repositories) => __awaiter(this, void 0, void 0, function* () {
                const role = yield repositories.roles.findById(roleId);
                if (!role) {
                    throw new NotFoundError_1.NotFoundError(`Role with id ${roleId} not found`);
                }
                return repositories.users.create(user);
            }));
            return UserDtoMapper_1.UserDtoMapper.toCreateResponse(createdUser);
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
