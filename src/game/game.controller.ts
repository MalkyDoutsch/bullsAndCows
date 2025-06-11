import { Router, Request, Response } from 'express';
import game_service from './game.service';
import { Types } from 'mongoose';

const router = Router();
const service = new game_service();
router.get("/", (req, res) => {
    res.send("Games route working");
  });

router.post('/start', async (req: Request, res: Response)  => {
    const { playerId, password } = req.body;
    try {
        const game = await service.createNewGame(playerId, password);
        if (!game) {
            res.status(404).send('Game not found');
        }
        res.status(201).json(game);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/:gameId/guess', async (req: Request, res: Response) => {
    const { gameId } = req.params;
    const { guess } = req.body;
    const objectId = new Types.ObjectId(gameId);
    
    try {
        const result = await service.guessing(objectId, guess);
        if (!result) {
            res.status(404).send('Game not found or invalid guess');
        }
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:gameId', async (req: Request, res: Response) => {
    const { gameId } = req.params;
    try {
        const game = await service.getGameStatus(gameId);
        if (!game) {
            res.status(404).send('Game not found');
        }
        res.status(200).json(game);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:gameId/end', async (req: Request, res: Response) => {
    const { gameId } = req.params;
    try {
        const result = await service.endGame(gameId);
        if (!result) {
            res.status(404).send('Game not found');
        }
        res.status(200).json({ message: 'Game ended successfully', result });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;