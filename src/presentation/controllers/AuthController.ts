import { Request, Response } from "express";
import { LoginUseCase } from "../../application/use-cases/auth/LoginUseCase";
import { HttpStatus } from "../../shared/constants/httpStatus";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { LoginInput } from "../validators/auth/login.validator";

export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  login = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as LoginInput;
    const result = await this.loginUseCase.execute({
      phone: body.phone,
      password: body.password,
    });

    res.status(HttpStatus.OK).json({
      success: true,
      data: result,
    });
  });
}
