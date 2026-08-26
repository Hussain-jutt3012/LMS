import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 6000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        process.exit(1);
    }
};

process.on("uncaughtException", (error) => {
    process.exit(1);
});

process.on("unhandledRejection", (error) => {
    process.exit(1);
});

startServer();