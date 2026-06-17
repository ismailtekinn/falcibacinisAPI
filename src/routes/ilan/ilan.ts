import express, { Request, Response } from "express";
import { IlanManager } from "../../bussiness/service/ilanManager";
import { IIlanService } from "../../bussiness/interface/ıilanService";
import { CreateIlanDto } from "../../dtos/ilan/createIlanDto";

const router: express.Router = express.Router();
const ilanService: IIlanService = new IlanManager();

router.post(
  "/createIlan",
  async (req: Request, res: Response): Promise<void> => {
    const model = req.body as CreateIlanDto;
    const result = await ilanService.createIlan(model);
    res.send(result);
  },
);

router.get("/ilanList", async (req: Request, res: Response): Promise<void> => {
  const result = await ilanService.ilanlar();
  res.send(result);
});
router.get(
  "/ilanOzellik/:ilanId",
  async (req: Request, res: Response): Promise<void> => {
    const ilanId = parseInt(req.params.ilanId);
    if (isNaN(ilanId)) {
      res.status(400).send({ message: "Geçersiz ilan ID" });
      return;
    }
    const result = await ilanService.ilanOzellik(ilanId);
    res.send(result);
  },
);
export default router;
