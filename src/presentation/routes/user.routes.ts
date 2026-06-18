import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validate } from "../validators/validate";
import { createUserSchema } from "../validators/user/createUser.validator";
import { updateUserSchema } from "../validators/user/updateUser.validator";

export const createUserRoutes = (userController: UserController): Router => {
  const router = Router();

  router.post("/", validate(createUserSchema), userController.create);
  router.get("/:id", userController.getById);
  router.put("/:id", validate(updateUserSchema), userController.update);
  router.delete("/:id", userController.delete);

  return router;
};
