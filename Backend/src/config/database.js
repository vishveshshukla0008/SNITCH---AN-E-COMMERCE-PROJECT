import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
    throw new Error("Mongo URI is not defined !");
}
export async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected Successfully !`);
    } catch (error) {
        console.log("Error in database connection !", error);
        process.exit(1);
    }
}