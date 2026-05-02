import mongoose from "mongoose";
import { DB_name } from "../constant.js";


const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOODB_URI}/${DB_name}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGOODB connection Failed", error)
    }
}

export default connectDB