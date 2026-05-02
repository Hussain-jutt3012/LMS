import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";




dotenv.config({
    path: './.env'
})


connectDB()
.then(()=> {
    app.listen(process.env.PORT || 6000, () => {
        console.log(`Server is runing at ${process.env.PORT}`)
    })
})
.catch((error)=> {
    console.log("MONGOODB Connection Failed !!!", error)
})