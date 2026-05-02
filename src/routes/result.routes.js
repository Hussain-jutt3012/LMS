import { Router } from "express";
import {editResultMarks, getResultMarks, resultRemarks, resultMarked} from "../controllers/result.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


router.route("/:userId/result-remarks").post(verifyJWT, resultRemarks)
router.route("/:userId/Enterd-result").post(verifyJWT, resultMarked)
router.route("/:teacherId/:studentId/update-resultMarks").patch(verifyJWT, editResultMarks)
router.route("/get-result").get(verifyJWT, getResultMarks)


export default router;