import { Router, Request, Response } from 'express';
import { PlayerService } from './player.service';
import { Types } from 'mongoose';

const router = Router();
const service = new PlayerService();
router.get("/", (req, res) => {
    res.send("Games route working");
  });

// 1. GET /api/players/:playerid/recent – תוצאות אחרונות לשחקן
router.get('/:playerid/recent', async (req: Request, res: Response) => {
  try {
    const results = await service.getLastResults(req.params.playerid);
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// 2. GET /api/players/leaderboard – 10 הניצחונות המהירים ביותר
router.get('/leaderboard', async (_req: Request, res: Response) => {
  try {
    const topWins = await service.getTop10FastestWins();
    res.json(topWins);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// 3. POST /api/players/add – הוספת שחקן
router.post('/add', async (req: Request, res: Response) => {
  try {
    const newPlayer = await service.createPlayer(req.body);
    res.status(201).json(newPlayer);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// 4. PUT /api/players/:playerid – עריכת שחקן
router.put('/:playerid', async (req: Request, res: Response) => {
  try {
    const updated = await service.updatePlayer(req.params.playerid, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// 5. DELETE /api/players/:playerid – מחיקת שחקן
router.delete('/:playerid', async (req: Request, res: Response) => {
  try {
    const deleted = await service.deletePlayer(req.params.playerid);
    res.json(deleted);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

// 6. GET /api/players/:playerid – הצגת שחקן כולל המשחקים
router.get('/:playerid', async (req: Request, res: Response) => {
  try {
    const fullPlayer = await service.getPlayerWithGames(req.params.playerid);
    res.json(fullPlayer);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

export default router;