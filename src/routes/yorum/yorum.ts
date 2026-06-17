import express, { Request, Response } from "express";
import { IYorumService } from "../../bussiness/interface/iyorumService";
import { CreateYorumDto } from "../../dtos/comments/comments";
import { IlanYorumManager } from "../../bussiness/service/ilanYorumManager";

const router: express.Router = express.Router();
const iyorumService: IYorumService = new IlanYorumManager();

router.post(
  "/createYorum",
  async (req: Request, res: Response): Promise<void> => {
    const request = req.body as CreateYorumDto;
    console.log("request body console yazdıırlıyor ", request);
    const result = await iyorumService.createYorum(request);
    res.send(result);
  },
);

router.get(
  "/yorumList/:ilanId",
  async (req: Request, res: Response): Promise<void> => {
    const ilanId = parseInt(req.params.ilanId);
    if (isNaN(ilanId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await iyorumService.getYorumList(ilanId);
    res.send(result);
  },
);

export default router;
