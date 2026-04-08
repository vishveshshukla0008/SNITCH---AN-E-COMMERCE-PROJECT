import "dotenv/config";
import { app } from "./src/app.js";
import { connectDb } from "./src/config/database.js";

const PORT = process.env.PORT;

async function startServer() {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Application is running on port no. : ${PORT}`)
        })
    } catch (err) {
        console.log("Error in starting server !", err)
    }
}


startServer();