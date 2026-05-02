import mongoose from "mongoose";
import { DB_name } from "../constant.js";


const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOODB_URI}/${DB_name}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        console.log("Connection State:", mongoose.connection.readyState);
    } catch (error) {
        console.log("MONGOODB connection Failed", error)
    }
}

export default connectDB