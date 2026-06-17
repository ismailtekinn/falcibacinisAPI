import express, { Request, Response } from "express";
import { IOzellikService } from "../../bussiness/interface/iozellikService";
import { OzellikManager } from "../../bussiness/service/ozellikManager";

const router: express.Router = express.Router();
const ozellikService: IOzellikService = new OzellikManager();

router.get("/ozellikList", async (req: Request, res: Response): Promise<void> => {
  const result = await ozellikService.getOzellik()
  res.send(result);
});


export default router;
