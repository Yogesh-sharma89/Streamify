import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route.ts';
import { errorHandler } from './middleware/errroHandler.ts';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.ts';
import chatRouter from './routes/chat.route.ts';
import path from "path";
import "dotenv/config";


const app = express();

//basic express middelware

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:[process.env.APP_URL!],
    credentials:true,
    methods:['POST',"GET",'PUT','PATCH','DELETE']
}))
app.use(cookieParser());

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/chat',chatRouter)

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get('/{*any}',(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

app.use(errorHandler);

export default app;

