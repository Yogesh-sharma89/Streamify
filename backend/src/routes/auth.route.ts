import express from 'express';
import { getUserLocation, Login, Logout, OnBoarding, resendOtp, sendOtp, Signup } from '../controller/auth.controller.ts';
import { protectRoutes } from '../middleware/auth.ts';


const authRouter = express.Router();

authRouter.post('/send-otp',sendOtp)

authRouter.post('/resend-otp',resendOtp)

authRouter.post('/signup',Signup);
authRouter.post('/login',Login);

authRouter.post('/logout',Logout);

authRouter.post("/onboarding",protectRoutes,OnBoarding)

authRouter.get('/me',protectRoutes,(req,res)=>{

    return res.status(200).json({
        message:'User fetch successfully',
        success:true,
        user:req.user
    })
})

authRouter.post('/get-user-location',protectRoutes,getUserLocation);

export default authRouter;


