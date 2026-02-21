import { StreamChat } from "stream-chat";
import "dotenv/config";

interface userDataType{
    id:string,
    name:string,
    image:string
}

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream credentials are missing")
}

const streamClient =  StreamChat.getInstance(apiKey!,apiSecret);

export const upsertStreamUser = async(userData:userDataType)=>{
    try{

        await streamClient.upsertUsers([userData]);

        return userData;

    }catch(err){
       console.error('Error in upsert stream user',err);
    }
}


export const generateStreamToken = async(userId:string)=>{

    try{

        return streamClient.createToken(userId);

    }catch(err){

        console.log("Error in generating stream token",err);

    }
}