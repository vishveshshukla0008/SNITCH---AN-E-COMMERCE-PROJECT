import { app } from "./src/app.js";
import { connectDb } from "./src/config/database.js";
import { config } from "./src/config/config.js";
import "dotenv/config"
import { connectRedis } from "./src/config/cache.js";

async function startServer() {
    try {
        await connectRedis();
        await connectDb();
        app.listen(config.PORT, () => {
            console.log(`Application is running on port no. : ${config.PORT}`)
        })
    } catch (err) {
        console.log("Error in starting server !", err)
    }
}


startServer();