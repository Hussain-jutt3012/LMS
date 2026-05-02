import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    credentials:true,
    methods:["GET", "POST", "DELETE", "PUT", "PATCH"],
    origin: [
    "http://localhost:5173",
  ],
}))


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// import Routes


import userRouter from './routes/user.routes.js'
import subjectRouter from './routes/subject.routes.js'
import attendanceRouter from './routes/attendance.routes.js'
import resultRouter from './routes/result.routes.js'
import uploadRouter from './routes/teacher.routes.js'
import EnrollementRouter from './routes/enrollement.routes.js'


app.use("/api/v1/users", userRouter)
app.use("/api/v1/subjectcreate", subjectRouter)
app.use('/api/v1/attendance', attendanceRouter)
app.use('/api/v1/result', resultRouter)
app.use('/api/v1/upload', uploadRouter)
app.use('/api/v1/enrollement', EnrollementRouter)

export { app }