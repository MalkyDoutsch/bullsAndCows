import express from 'express';
import { myDB } from './db/connection';
import  router from './game/game.controller';
const app = express();
app.use(express.json());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'error in server' });
  });

  app.use('/api/games', router); 


  app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
  
  export default app;