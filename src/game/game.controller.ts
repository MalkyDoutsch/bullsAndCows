import { Router, Request, Response } from 'express';
import service from './game.service';
import game_service from './game.service';

const router = Router();
const service = new game_service();

// קבלת משחק קיים
router.post('/start', async (req: Request, res: Response) => {
    const { playerId, password } = req.body;
    try {
        const game = await service.createNewGame(playerId, password);
        if (!game){
            res.status(404).send('game not found');
        }
        res.status(201).json(game);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});