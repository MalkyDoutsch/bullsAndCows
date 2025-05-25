import { Types, Schema, Document } from 'mongoose';

export interface IAttempt {
  guess: number[];
  bulls: number;
  pgias: number;
  createdAt: Date;
}

export interface IGame extends Document{
  _id: Types.ObjectId;
  playerId: String;
  secretCode: number[];
  attempts: IAttempt[];
  status: 'in-progress' | 'won' | 'lost' | 'ended';
  maxAttempts: number;
  winner: boolean;  
  createdAt: Date;
}

const attemptsSchema = new Schema<IAttempt>(
    {
      guess:  { type: [Number], required: true },
      bulls:  { type: Number, required: true },
      pgias:  { type: Number, required: true },
      createdAt: { type: Date, required: true },
    },
    //  { _id: false } 
);
  
const gameSchema = new Schema<IGame>({
    playerId:    { type: String, required: true, ref: 'Player' },
    secretCode:  { type: [Number], required: true },
    attempts:    { type: [attemptsSchema], default: [] },
    status:      { type: String, enum: ['in-progress', 'won', 'lost', 'ended'], required: true, default:'in-progress' },
    maxAttempts: { type: Number, required: true, min: 1 },
    winner:      { type: Boolean, required: true },
    createdAt:   { type: Date, required: true, default: Date.now }
 },
 {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_doc, ret) => {
      delete ret._id;
      return ret;
    }
  }
 }  
);

// {
//     _id: ObjectId,
//     playerId: ObjectId,
//     secretCode: number[],         // למשל: [4, 2, 8, 1]
//     attempts: [
//       {
//         guess: number[],          // למשל: [4, 3, 2, 9]
//         bulls: number,
//         pgias: number,
//         createdAt: Date
//       }
//     ],
//     status: 'in-progress' | 'won' | 'lost' | 'ended',
//     maxAttempts: number,
//     winner: boolean,              // האם הצליח לנחש
//     createdAt: Date
//   }
  