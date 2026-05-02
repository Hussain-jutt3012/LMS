import { Router } from "express";
import {attendanceMark, editAttendance, getAttendanceData, markAttendance} from "../controllers/atttendance.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


router.route("/:userId/attendance-mark").post( verifyJWT, attendanceMark)
router.route("/:userId/mark-Attendance").post( verifyJWT, markAttendance)
router.route("/:teacherId/:studentId/edit-attendance").patch(verifyJWT, editAttendance)
router.route("/get-attendance-data").get(verifyJWT, getAttendanceData)


export default router;