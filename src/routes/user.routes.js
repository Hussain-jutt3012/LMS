import { Router } from "express";
import {
    registerUser,
    UserLogin,
    UserLogout,
    refreshToken,
    ChangeCurrentPassword,
    getCurrentUser,
    UpdateAccountDetails,
    fetchallStudent,
    blockStudent,
    deleteStudent
}
    from "../controllers/user.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/:userId/register-user").post(verifyJWT, registerUser);
router.route("/login").post(UserLogin);

// secured routes
router.route('/logout').post(verifyJWT, UserLogout);
router.route('/refresh-token').post(refreshToken);
router.route('/change-password').post(verifyJWT, ChangeCurrentPassword);
router.route('/current-user').get(verifyJWT, getCurrentUser);
router.route('/:userId/:studentId/update-account').patch(verifyJWT, UpdateAccountDetails)
router.route("/:userId/block-portal").post(verifyJWT, fetchallStudent)
router.route("/:userId/:studentid/portal-block").post(verifyJWT, blockStudent)
router.route("/:userId/:studentId/delete-student").delete(verifyJWT, deleteStudent)

export default router;