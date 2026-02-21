import type { NextFunction,Request,Response } from "express";
import type AppError from "../utils/appError";

export const errorHandler = async(err:AppError , req:Request, res:Response , next:NextFunction)=>{

    console.log(`Error : ${err}`)

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';

    let status = statusCode<=400 && statusCode <500 ? 'fail':"Server error";

    if (statusCode === 500) {
        console.error("🔥 Unexpected Error:", err);
    }

   

    res.status(statusCode).json(
        {
            success:false,
            message,
            status
        }
    )

}