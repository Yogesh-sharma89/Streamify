import "dotenv/config";
import app from "./src/app.ts";
import ConnectToDb from "./src/config/database.ts";
import redisClient from "./src/config/redis.ts";

const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.json({ message: 'Home route is working Properly' })
})

const StartConnection = async()=>{
    try{

        await ConnectToDb();

        await redisClient.connect();

        console.log('Redis Db connected successfully 🎉')

        app.listen(port, () => {
            console.log(`Server is up and running on port ${port}  ✅`)
        })

    }catch(err){
        console.log('Error in start-connection functiion ',err);
    }
}

StartConnection();

process.on("unhandledRejection",(err)=>{
    console.error("UNHANDLED REJECTION 💥", err);
    process.exit(1);
})

process.on('uncaughtException',(err)=>{
    console.error("UNCAUGHT EXCEPTION 💥", err);
    process.exit(1);
})


