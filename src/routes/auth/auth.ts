import express, { Request, Response } from "express";
import { registerSchema } from "../../validations/auth/registerValidator";
import { requestValidator } from "../../middleware/requestValidator";
import { IUserService } from "../../bussiness/interface/ıuserService";
import { UserManager } from "../../bussiness/service/userManager";
import { RegisterUserDto } from "../../dtos/user/registerResponseDto";
import { LoginDto } from "../../dtos/user/loginDto";
import {
  authenticateToken,
  AuthRequest,
} from "../../middleware/authenticateToken";
import { authorizeAdmin } from "../../middleware/authorizeAdmin";

const router: express.Router = express.Router();
const userService: IUserService = new UserManager();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const model = req.body as LoginDto;
  const result = await userService.login(model);
  res.send(result);
});
router.post(
  "/register",
  requestValidator(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    const request = req.body as RegisterUserDto;
    console.log("request body console yazdıırlıyor ", request);
    const result = await userService.register(request);
    res.send(result);
  },
);

export default router;
