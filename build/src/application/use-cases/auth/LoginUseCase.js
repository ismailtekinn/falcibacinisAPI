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
exports.LoginUseCase = void 0;
const UserDtoMapper_1 = require("../../services/UserDtoMapper");
const NotFoundError_1 = require("../../../shared/exceptions/NotFoundError");
const UnauthorizedError_1 = require("../../../shared/exceptions/UnauthorizedError");
class LoginUseCase {
    constructor(userRepository, hasher, tokenService) {
        this.userRepository = userRepository;
        this.hasher = hasher;
        this.tokenService = tokenService;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByPhone(dto.phone);
            if (!user) {
                throw new NotFoundError_1.NotFoundError("Kullanıcı bulunamadı.");
            }
            if (!user.verified) {
                throw new UnauthorizedError_1.UnauthorizedError("Hesabınız henüz aktif değil. Yönetici onayı bekleniyor.");
            }
            const isPasswordValid = yield this.hasher.compare(dto.password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedError_1.UnauthorizedError("Geçersiz kimlik bilgileri.");
            }
            if (user.id === null) {
                throw new UnauthorizedError_1.UnauthorizedError("Geçersiz kullanıcı.");
            }
            const token = this.tokenService.generate({
                userId: user.id,
                email: user.email,
                roleId: user.roleId,
            });
            return {
                token,
                user: UserDtoMapper_1.UserDtoMapper.toResponse(user),
            };
        });
    }
}
exports.LoginUseCase = LoginUseCase;
