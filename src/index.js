import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 6000;

connectDB()
    .then(() => {
        app.listen(PORT);
    })
    .catch(() => {
        process.exit(1);
    });

process.on("unhandledRejection", () => {
    process.exit(1);
});

process.on("uncaughtException", () => {
    process.exit(1);
});