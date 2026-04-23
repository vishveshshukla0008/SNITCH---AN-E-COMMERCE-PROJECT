import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");
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