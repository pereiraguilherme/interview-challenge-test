import express from 'express';
import cors from 'cors';
import { setupRoutes } from './routes/routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const router = setupRoutes();
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 TypeScript backend server running on port ${PORT}`);
});
