import mongoose, { Types, Schema, Document } from 'mongoose';

export interface IPlayer{
    playerId: string;
    name: string;
    password: string;
    mail: string;
    totalGames: number;
    wins: number;
}
export const playerSchema = new Schema<IPlayer>(
    {
    playerId: { type: String, required: true},
    name: { type: String, required: true },
    password: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    // secretCode: { 
    //     type: [Number],
    //     default: () => {
    //         const numbers = Array.from({length: 9}, (_, i) => i + 1);
    //         const secretCode: number[] = [];
    //         for (let i = 0; i < 4; i++) {
    //             const randomIndex = Math.floor(Math.random() * numbers.length);
    //             secretCode.push(numbers.splice(randomIndex, 1)[0]);
    //         }
    //         return secretCode;
    //     }
    // },
    totalGames: { type: Number, default: 0 },
    wins: { type: Number, default: 0 }
// }, {
//     toJSON: {
//         transform: function(doc, ret) {
//             ret.id = ret._id;
//             delete ret._id;
//             delete ret.__v;
//             delete ret.password; 
//         }
//     }
    }
);

export const Player = mongoose.model('Player', playerSchema);