import mongoose from "mongoose";
import envs from "./envs.config.js";
import { logger } from "../utils/logger.js";

export const connectMongoDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(envs.MONGO_URL);
        logger.info("MongoDB connected");
        
    } catch (error) {
        throw error;
    }
}
