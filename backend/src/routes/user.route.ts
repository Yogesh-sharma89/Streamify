import express from 'express';
import { protectRoutes } from '../middleware/auth.ts';
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendRequest, getRecommendedUsers, sendFriendRequest } from '../controller/user.controller.ts';

const userRouter = express.Router();

userRouter.use(protectRoutes);

userRouter.get('/',getRecommendedUsers);

userRouter.get('/friends',getMyFriends);

userRouter.post('/friend-request/:id',sendFriendRequest);

userRouter.post('/friend-request/:id/accept',acceptFriendRequest);

userRouter.get('/friend-requests',getFriendRequests)


userRouter.get("/outgoing-friend-request",getOutgoingFriendRequest)

export default userRouter;