"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var client_1 = require("../src/infrastructure/database/prisma/client");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(client_1).default; } });
