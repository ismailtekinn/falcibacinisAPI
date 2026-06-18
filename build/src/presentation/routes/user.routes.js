"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRoutes = void 0;
const express_1 = require("express");
const validate_1 = require("../validators/validate");
const createUser_validator_1 = require("../validators/user/createUser.validator");
const updateUser_validator_1 = require("../validators/user/updateUser.validator");
const createUserRoutes = (userController) => {
    const router = (0, express_1.Router)();
    router.post("/", (0, validate_1.validate)(createUser_validator_1.createUserSchema), userController.create);
    router.get("/:id", userController.getById);
    router.put("/:id", (0, validate_1.validate)(updateUser_validator_1.updateUserSchema), userController.update);
    router.delete("/:id", userController.delete);
    return router;
};
exports.createUserRoutes = createUserRoutes;
