import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/AuthController";
export declare const createApiRoutes: (userController: UserController, authController: AuthController) => Router;
