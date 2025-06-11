import { Game, IGame, IAttempt } from './game.model';
import { Player, IPlayer } from '../players/player.model';
import { Types } from 'mongoose';
import { bulls, pgias, CodeCreation, checkWin } from './game.logic';

export default class game_service {

  // const createCode = CodeCreation();

  async createNewGame(playerId: Types.ObjectId, password: string) {
    const existingPlayer = await Player.findOne({ where: { playerId: playerId } });

    if (!existingPlayer) {
      return new Error("The id or the password is not correct.");
    };

    const newGame = new Game({
      _id: new Types.ObjectId(),
      playerId: playerId,
      secretCode: CodeCreation(),
      attempts: [],
      status: 'in-progress',
      maxAttempts: 10,
      winner: false,
      createdAt: Date.now()
    });

    await newGame.save();
    return newGame;
  }

  async guessing(gameId: Types.ObjectId, guess:number[]) {
    const game = await Game.findById(gameId);
    if (!game) throw new Error('Game not found');

    const _bulls = bulls(guess, game.secretCode);
    const _pgias = pgias(guess, game.secretCode);

    const attempt = {
      guess,
      bulls: _bulls,
      pgias: _pgias,
      createdAt: new Date()
    };

    game.attempts.push(attempt);

    if (checkWin(guess, game.secretCode)) {
      game.status = 'won';
      game.winner = true;
    } else if (game.attempts.length >= game.maxAttempts) {
      game.status = 'lost';
      game.winner = false;
    }
    await game.save();
    return {
      guess,
      bulls: _bulls,
      pgias: _pgias,
      status: game.status,
      remainingAttempts: (game.maxAttempts ?? 10) - game.attempts.length
    };
  }

  async getGameStatus(gameId: string) {
    try {
      if (!Types.ObjectId.isValid(gameId)) {
        throw new Error('Invalid game ID format');
      }
  
      const game = await Game.findById(gameId);
      if (!game) {
          throw new Error('Game not found');
      }
  
      return {
          remainingAttempts: (game.maxAttempts ?? 10) - game.attempts.length,
          attempts: game.attempts,
          status: game.status,
      };
    } catch (error) {
      console.error('Error in getGameStatus:', error);
      throw error;
    }
  }
  
  async endGame(gameId: string) {
    try {
      if (!Types.ObjectId.isValid(gameId)) {
        throw new Error('Invalid game ID format');
      }
  
      return await Game.findByIdAndUpdate(gameId, { status: 'ended' }, { new: true });
    } catch (error) {
      console.error('Error in endGame:', error);
      throw error;
    }
  }

}