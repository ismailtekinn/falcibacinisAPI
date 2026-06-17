import express, { Request, Response } from "express";
import { IlIlceMahalleManager } from "../../bussiness/service/ililcemahalleManager";
import { IIlilceMahalleService } from "../../bussiness/interface/iililcemahalleService";

const router: express.Router = express.Router();
const ililcemahalleService: IIlilceMahalleService = new IlIlceMahalleManager();

router.get("/ilList", async (req: Request, res: Response): Promise<void> => {
  const result = await ililcemahalleService.getIl_List();
  res.send(result);
});
router.get(
  "/ilceList/:ilId",
  async (req: Request, res: Response): Promise<void> => {
    const ilId = parseInt(req.params.ilId);
    if (isNaN(ilId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await ililcemahalleService.getIlce_List(ilId);
    res.send(result);
  },
);
router.get(
  "/mahalleList/:ilceId",
  async (req: Request, res: Response): Promise<void> => {
    const ilceId = parseInt(req.params.ilceId);
    if (isNaN(ilceId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await ililcemahalleService.getMahalle_List(ilceId);
    res.send(result);
  },
);

export default router;
