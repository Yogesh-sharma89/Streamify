import AsyncHandler from "express-async-handler";
import { generateStreamToken } from "../config/stream.ts";

export const getStreamToken = AsyncHandler(async(req,res)=>{

    const userId = req.user._id;

    const token = await generateStreamToken(userId.toString());

    res.status(200).json(
        {
            message:'Token got successfully',
            success:true,
            token
        }
    )
})