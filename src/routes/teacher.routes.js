import { Router } from "express";
import { fileUpload } from "../controllers/teacher.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"


const router = Router();


router.route("/:teacherId/document").post(verifyJWT,
    upload.fields([
        {
            name: "addAssigment",
            maxCount:1
        },

        {
            name: "courseOutline",
            maxCount:1
        } 

    ]),

    fileUpload
)


export default router;