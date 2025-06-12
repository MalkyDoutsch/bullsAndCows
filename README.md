# Bulls and Cows Game – TypeScript + MongoDB

This is a RESTful API server for a **Bulls and Cows** game, built with **Node.js**, **Express**, **TypeScript**, and connected to **MongoDB** using **Mongoose**.

## 📌 Features

- Register a new player
- Edit/delete player details
- Start a new game
- Guess a secret number
- End a game
- Get player's recent results
- Leaderboard: Top 10 fastest wins
- See full player profile with games

---

## 🧠 Game Rules (Bulls and Cows)

The system generates a 4-digit secret number with digits from 1 to 9 and **no duplicate digits**.  
The player guesses 4 digits:

- ✅ **Bull**: correct digit in the correct place  
- ✅ **Cow**: correct digit in the wrong place

---

## 🧪 Technologies

- Node.js
- TypeScript
- Express
- MongoDB (via Mongoose)
- Postman for API testing

---



## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/bulls-and-cows-ts.git
cd bulls-and-cows-ts
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the server
```bash
npx ts-node src/app.ts
```



