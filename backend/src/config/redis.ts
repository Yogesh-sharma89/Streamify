import { createClient } from 'redis';
import "dotenv/config";

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD as string,
    socket: {
        host: 'redis-18435.crce263.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18435
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

export default redisClient;


