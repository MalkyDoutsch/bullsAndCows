import { Request, Response, NextFunction } from 'express';


export const validatePlayer = (req: Request, res: Response, next: NextFunction) => {
    const { playerId, name, password, mail } = req.body;

    if (!playerId || typeof playerId !== 'string' || playerId.length <= 8) {
        res.status(400).json({ message: 'Missing or invalid playerId' });
    }

    if (!name || typeof name !== 'string') {
        res.status(400).json({ message: 'Missing or invalid name' });
    }

    if (!password || typeof password !== 'string' || password.length < 4) {
        res.status(400).json({ message: 'Missing or invalid password (min 4 chars)' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!mail || !emailRegex.test(mail)) {
        res.status(400).json({ message: 'Missing or invalid email' });
    }

    next();
};