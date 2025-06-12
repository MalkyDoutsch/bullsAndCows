import { Router, Request, Response } from 'express';
import { PlayerService } from './player.service';
import { validatePlayer } from '../middleware/validatePlayer';

const router = Router();
const service = new PlayerService();
router.get("/", (req, res) => {
    res.send("player route working");
  });


// router.post('/add', validatePlayer, async (req: Request, res: Response) => {
//   try {
//     const newPlayer = await service.createPlayer(req.body);
//     res.status(201).json(newPlayer);
//   } catch (err: any) {
//     res.status(400).json({ message: err.message });
//   }
// });
router.post('/add', validatePlayer, async (req: Request, res: Response) => {
  try {
    const newPlayer = await service.createPlayer(req.body);
    res.status(201).json(newPlayer);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/update/:playerid', async (req: Request, res: Response) => {
  try {
    const updated = await service.updatePlayer(req.params.playerid, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/delete/:playerid', async (req: Request, res: Response) => {
  try {
    const deleted = await service.deletePlayer(req.params.playerid);
    res.json(deleted);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});


router.get('/recent/:playerid', async (req: Request, res: Response) => {
  try {
    const results = await service.getLastResults(req.params.playerid);
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/leaderboard', async (_req: Request, res: Response) => {
  try {
    const topWins = await service.getTop10FastestWins();
    res.json(topWins);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/IntroducingPlayer/:playerid', async (req: Request, res: Response) => {
  try {
    const fullPlayer = await service.getPlayerWithGames(req.params.playerid);
    res.json(fullPlayer);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

export default router;