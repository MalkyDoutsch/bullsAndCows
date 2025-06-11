import { Player, IPlayer } from './player.model';
import { Game } from '../game/game.model'; 
import mongoose from 'mongoose';

export class PlayerService {

  async createPlayer(playerData: IPlayer) {
    const existing = await Player.findOne({ mail: playerData.mail });
    if (existing) throw new Error("Email already in use");

    const player = new Player(playerData);
    await player.save();
    return player;
  }

  async getPlayerWithGames(playerId: string) {
    const player = await Player.findOne({ playerId });
    if (!player) throw new Error("Player not found");

    const games = await Game.find({ playerId });
    return { player, games };
  }


  async updatePlayer(playerId: string, updatedData: Partial<IPlayer>) {
    const player = await Player.findOneAndUpdate({ playerId }, updatedData, { new: true });
    if (!player) throw new Error("Player not found");
    return player;
  }

  async deletePlayer(playerId: string) {
    const result = await Player.findOneAndDelete({ playerId });
    if (!result) throw new Error("Player not found");
    return result;
  }

  //5 תוצאות אחרונות
  async getLastResults(playerId: string, limit = 5) {
    const games = await Game.find({ playerId })
      .sort({ createdAt: -1 })
      .limit(limit);
    return games;
  }

  // עשרת הניצחונות המהירים ביותר (נניח לפי מספר ניסיונות)
  async getTop10FastestWins() {
    const games = await Game.find({ winner: true })
      .sort({ attempts: 1 }) // הכי מעט ניסיונות
      .limit(10);
    return games;
  }
}
