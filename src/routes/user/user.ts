import express, { Request, Response } from "express";
import { IlIlceMahalleManager } from "../../bussiness/service/ililcemahalleManager";
import { IIlilceMahalleService } from "../../bussiness/interface/iililcemahalleService";
import { IUserService } from "../../bussiness/interface/ıuserService";
import { UserManager } from "../../bussiness/service/userManager";

const router: express.Router = express.Router();
const iuserService: IUserService = new UserManager();

router.get(
  "/userList/:userId",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await iuserService.userDetay(userId);
    res.send(result);
  },
);

export default router;
