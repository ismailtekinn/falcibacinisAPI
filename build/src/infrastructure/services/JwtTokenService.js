"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
class JwtTokenService {
    constructor() {
        this.secretKey = config_1.default.get("jwtPrivateKey");
    }
    generate(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn: "1h" });
    }
    verify(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secretKey);
            if (typeof decoded === "string") {
                return null;
            }
            return decoded;
        }
        catch (_a) {
            return null;
        }
    }
}
exports.JwtTokenService = JwtTokenService;
