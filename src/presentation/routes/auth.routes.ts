import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validate } from "../validators/validate";
import { loginSchema } from "../validators/auth/login.validator";

export const createAuthRoutes = (authController: AuthController): Router => {
  const router = Router();

  router.post("/login", validate(loginSchema), authController.login);

  return router;
};
