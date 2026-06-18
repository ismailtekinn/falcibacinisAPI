import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/user/CreateUserUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/user/DeleteUserUseCase";
import { GetUserByIdUseCase } from "../../application/use-cases/user/GetUserByIdUseCase";
import { HttpStatus } from "../../shared/constants/httpStatus";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { CreateUserInput } from "../validators/user/createUser.validator";
import { UpdateUserInput } from "../validators/user/updateUser.validator";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as CreateUserInput;
    const result = await this.createUserUseCase.execute({
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: body.password,
      phone: body.phone,
      username: body.username,
      roleId: body.roleId,
    });

    res.status(HttpStatus.CREATED).json({
      success: true,
      data: result,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await this.getUserByIdUseCase.execute(id);

    res.status(HttpStatus.OK).json({
      success: true,
      data: result,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const body = req.body as UpdateUserInput;

    const result = await this.updateUserUseCase.execute({
      id,
      name: body.name,
      surname: body.surname,
      phone: body.phone,
      username: body.username,
    });

    res.status(HttpStatus.OK).json({
      success: true,
      data: result,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.deleteUserUseCase.execute(id);

    res.status(HttpStatus.NO_CONTENT).send();
  });
}
