"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRoutes = void 0;
const express_1 = require("express");
const validate_1 = require("../validators/validate");
const login_validator_1 = require("../validators/auth/login.validator");
const createAuthRoutes = (authController) => {
    const router = (0, express_1.Router)();
    router.post("/login", (0, validate_1.validate)(login_validator_1.loginSchema), authController.login);
    return router;
};
exports.createAuthRoutes = createAuthRoutes;
