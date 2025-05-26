import { Game, IGame, IAttempt } from './game.model';
import { Player, IPlayer } from '../players/player.model';
import { Types } from 'mongoose';
import { bulls, pgias } from './game.logic';

export default class game_service {

  async createNewGame(playerId: Types.ObjectId, password: string) {
    const existingPlayer = await Player.findOne({ where: { playerId: playerId } });

    if (!existingPlayer) {
      return new Error("The id or the password is not correct.");
    }ש

    const newGame = new Game({
      _id: new Types.ObjectId(),
      playerId: playerId,
      secretCode: this.codeCreation(),
      attempts: [],
      status: 'in-progress',
      maxAttempts: 10,
      winner: false,
      createdAt: Date.now
    });

    await newGame.save();
    return newGame;
  }

  codeCreation(length: number = 4): number[] {
    const code: number[] = [];
    while (code.length < length) {
      const num = Math.floor(Math.random() * 9) + 1; // יוצר מספרים בין 1 ל-9
      if (!code.includes(num)) {
        code.push(num);
      }
    }
    return code;
  }

  guessing(gameId: Types.ObjectId, guess: Number[]) {
    const bulls = bulls(guess,);
    const pgias = pgias();
  }






}