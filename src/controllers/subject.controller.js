import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subject } from "../model/subject.model.js";
import { User } from "../model/user.model.js";



const subjectRegister = asyncHandler(async (req, res) => {

    const { userId } = req.params
    const { subjectName, subjectCode, taughtBy, classname, section, semsterNo, department } = req.body


    const userRequest = await User.findById(userId)

    if (!userRequest) {
        throw new ApiError(400, "User Id is not found")
    }

    if (userRequest.role !== "admin") {
        throw new ApiError(400, "You're not admin, you have no access")
    }

    if (!subjectName || !subjectCode || !taughtBy || !classname || !section || !semsterNo || !department) {
        throw new ApiError(400, "This Fields are required")
    }

    const subjectCreate = await Subject.create({
        subjectName: subjectName,
        subjectCode: subjectCode,
        classname:classname,
        section:section,
        semsterNo:semsterNo,
        department:department,
        taughtBy: taughtBy,
        createdBy: userRequest._id
    })

    if (!subjectCreate) {
        throw new ApiError(500, "Subject is not create due to some issue")
    }

    return res.status(200).json(new ApiResponse(200, subjectCreate, "Subject create SucessFully"))

})



export {
    subjectRegister
}