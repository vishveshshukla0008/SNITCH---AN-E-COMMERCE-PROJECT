import mongoose from "mongoose";
import { config } from "./config.js";


export async function connectDb() {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log(`Database connected Successfully !`);
    } catch (error) {
        console.log("Error in database connection !", error);
        process.exit(1);
    }
}