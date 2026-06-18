"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.env = {
    nodeEnv: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "development",
    port: Number((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3000),
    databaseUrl: (_c = process.env.DATABASE_URL) !== null && _c !== void 0 ? _c : "",
};
