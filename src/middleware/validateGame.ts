import { Request, Response, NextFunction } from 'express';

export const validateStartGame = (req: Request, res: Response, next: NextFunction) => {
  const { playerId, password } = req.body;

  if (!playerId || typeof playerId !== 'string') {
    res.status(400).json({ message: 'Missing or invalid playerId' });
  }

  if (!password || typeof password !== 'string' || password.length < 4) {
    res.status(400).json({ message: 'Missing or invalid password' });
  }

  next();
};

export const validateGuess = (req: Request, res: Response, next: NextFunction) => {
  const { guess } = req.body;

  if (!Array.isArray(guess) || guess.length !== 4) {
    res.status(400).json({ message: 'Guess must be an array of 4 numbers' });
  }

  const isValidNumbers = guess.every((n : number) => typeof n === 'number' && n >= 0 && n <= 9);
  const hasNoDuplicates = new Set(guess).size === guess.length;

  if (!isValidNumbers || !hasNoDuplicates) {
    res.status(400).json({ message: 'Guess must contain 4 unique numbers between 1 and 9' });
  }

  next();
};