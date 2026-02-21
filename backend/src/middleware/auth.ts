import type { NextFunction,Request,Response } from "express";
import  type { JwtPayload } from "jsonwebtoken";
import type { ObjectId } from "mongoose";
import AppError from "../utils/appError.ts";
import jwt from 'jsonwebtoken';
import "dotenv/config";
import User, { type userType } from "../models/user.model.ts";
import type { userDoc } from "../utils/generateToken.ts";

interface myPayload extends JwtPayload{
  id:ObjectId,
  email:string
}



export const protectRoutes = async(req:Request,res:Response,next:NextFunction)=>{

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        throw new AppError("Unauthorized - No token provided",401);
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET!) as myPayload;

    if(!decoded){
        throw new AppError("Unauthorized - Invalid token",401);
    }

    //get user if user doesn't exists it measn user not registred or login so throw Error

    const user = await User.findOne({email:decoded.email}).select("-password");

    if(!user){
        throw new AppError("Email doesn't exists. Please signup to continue",401);
    }

    req.user = user;

    next();

}