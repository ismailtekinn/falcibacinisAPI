"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    surname: zod_1.z.string().min(1).optional(),
    phone: zod_1.z.string().min(1).optional(),
    username: zod_1.z.string().nullable().optional(),
});
