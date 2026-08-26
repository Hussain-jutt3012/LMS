import mongoose from "mongoose";
import { DB_name } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGOODB_URI}/${DB_name}`
        );
        console.log("MongoDB connected successfully");
        return connectionInstance;
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw new Error("MongoDB connection failed");
    }
};

export default connectDB;