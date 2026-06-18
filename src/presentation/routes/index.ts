import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/AuthController";
import { createUserRoutes } from "./user.routes";
import { createAuthRoutes } from "./auth.routes";

export const createApiRoutes = (
  userController: UserController,
  authController: AuthController,
): Router => {
  const router = Router();

  router.use("/users", createUserRoutes(userController));
  router.use("/auth", createAuthRoutes(authController));

  return router;
};
