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
exports.UpdateUserUseCase = void 0;
const UserDtoMapper_1 = require("../../services/UserDtoMapper");
const NotFoundError_1 = require("../../../shared/exceptions/NotFoundError");
class UpdateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(dto.id);
            if (!user) {
                throw new NotFoundError_1.NotFoundError("Kullanıcı bulunamadı.");
            }
            user.updateProfile({
                name: dto.name,
                surname: dto.surname,
                phone: dto.phone,
                username: dto.username,
            });
            const updatedUser = yield this.userRepository.update(user);
            return UserDtoMapper_1.UserDtoMapper.toResponse(updatedUser);
        });
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;
