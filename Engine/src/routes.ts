import express from 'express';
import { EngineController } from './controller';

const router = express.Router();
const engineController = new EngineController();

// GET 
router.post('/makeMove', engineController.makeMove);

export default router;
