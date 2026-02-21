import mongoose from "mongoose";

if(!process.env.MONGODB_URL){
    throw new Error("Missing database key")
}

const ConnectToDb = async()=>{
    try{

        await mongoose.connect(process.env.MONGODB_URL!)

        console.log('Database is connected successfully ✅')

    }catch(err){
        console.log('Failed to connect with db ',err);
        process.exit(1);
    }
}

export default ConnectToDb;