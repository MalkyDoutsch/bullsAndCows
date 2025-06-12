import { Router, Request, Response } from 'express';
import game_service from './game.service';
import { Types } from 'mongoose';
import { IGame } from './game.model';
import { validateStartGame, validateGuess } from '../middleware/validateGame';

const router = Router();
const service = new game_service();
router.get("/", (req, res) => {
    res.send("Games router working");
  });

router.post('/start', validateStartGame, async (req: Request, res: Response)  => {
    const { playerId, password } = req.body;
    try {
        const game = await service.createNewGame(playerId, password);
        if (!game) {
            res.status(404).send('Game not found');
        }
        console.log("Game created:", game);
        console.log((game as IGame).secretCode);
        res.status(201).json(game);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/guess/:gameId' ,validateGuess, async (req: Request, res: Response) => {
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


router.get('/getGameStatus/:gameId', async (req: Request, res: Response) => {
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

router.post('/end/:gameId', async (req: Request, res: Response) => {
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