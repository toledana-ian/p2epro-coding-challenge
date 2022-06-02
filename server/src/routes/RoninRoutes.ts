import {Request, Response, Router} from 'express';
import {convertRonToSlp, getRonBalance} from "../controllers/RoninController";

const router = Router();

router.get('/ronin/ron_balance', async (req: Request, res: Response) => {
    res.json(await getRonBalance());
});

router.get('/ronin/swap_ron_to_slp', async (req: Request, res: Response) => {
    res.json(await convertRonToSlp(1));
});

export default router;