import { Router } from "express";
import {subjectRegister} from "../controllers/subject.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"


const router = Router();


router.route("/:userId/subject-create").post(verifyJWT, subjectRegister);


export default router;