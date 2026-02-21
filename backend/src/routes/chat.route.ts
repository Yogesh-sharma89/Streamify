import express from 'express';
import { protectRoutes } from '../middleware/auth.ts';
import { getStreamToken } from '../controller/chat.controller.ts';

const chatRouter = express.Router();

chatRouter.use(protectRoutes);

chatRouter.get('/token',getStreamToken)

export default chatRouter;