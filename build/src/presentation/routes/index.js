"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiRoutes = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user.routes");
const auth_routes_1 = require("./auth.routes");
const createApiRoutes = (userController, authController) => {
    const router = (0, express_1.Router)();
    router.use("/users", (0, user_routes_1.createUserRoutes)(userController));
    router.use("/auth", (0, auth_routes_1.createAuthRoutes)(authController));
    return router;
};
exports.createApiRoutes = createApiRoutes;
