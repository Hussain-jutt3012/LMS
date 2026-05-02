import { Router } from "express";
import {UserFind, getEnrollment, getStudentEnrolledData} from "../controllers/enrollment.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

router.route("/:userId/get-studentData").get(verifyJWT, UserFind)
router.route("/:userId/:studentId/get-student-enrollement").post(verifyJWT,getEnrollment)
router.route("/get-enrolled-data").get(verifyJWT, getStudentEnrolledData)

export default router