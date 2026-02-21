import type { HydratedDocument } from "mongoose";
import type { userType } from "../models/user.model.ts";
import jwt from 'jsonwebtoken';
import "dotenv/config";

export type userDoc = HydratedDocument<userType>

const generateJwtToken = (user:userDoc)=>{

     const payload = {
      id:user._id,
      email:user.email
    }

    const token =  jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:'4d'});

    return token;

}

export default generateJwtToken;