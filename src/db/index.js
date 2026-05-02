import mongoose from "mongoose";
import { DB_name } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGOODB_URI}/${DB_name}`
        );
        return connectionInstance;
    } catch (error) {
        throw new Error("MongoDB connection failed");
    }
};

export default connectDB;