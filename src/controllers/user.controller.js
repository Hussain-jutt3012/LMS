import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../model/user.model.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken = async (userId) => {
    try {

        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const {
        fullName,
        username,
        email,
        password,
        role,
        classname,
        section,
        batchYear,
        semesterNo,
        department,
        teachingSubject,
        teacherDepartment,
        classAssigned,
        sectionAssigned,
        semsterNoAssigned,
    } = req.body;

    // check admin
    const userRequest = await User.findById(userId);
    if (!userRequest) {
        throw new ApiError(404, "UserId is not found");
    }

    if (userRequest.role !== "admin") {
        throw new ApiError(400, "You're not admin so you cannot create Student or Teacher");
    }

    // required fields
    if (!fullName || !username || !email || !password || !role) {
        throw new ApiError(400, "This fields are required");
    }

    // student checks
    if (role === "student") {
        if (!classname || !section || !batchYear || !semesterNo || !department) {
            throw new ApiError(400, "This Fields are required and only for Students");
        }
    }

    // teacher checks

    if (role === "teacher") {
        if (!teachingSubject || !teacherDepartment || !classAssigned || !sectionAssigned || !semsterNoAssigned) {
            throw new ApiError(400, "All fields Are required for teachers");
        }
    }

    let techdepart = teacherDepartment
    let teachclass = classAssigned
    let techsection = sectionAssigned
    let techsemster = semsterNoAssigned

    console.log(typeof techdepart, "tech")
    console.log(typeof teachclass, "tech")
    console.log(typeof techsection, "tech")
    console.log(typeof techsemster, "tech")

    if (typeof teacherDepartment === "string") {
        techdepart = teacherDepartment.split(" ")
    }

    if (typeof classAssigned === "string") {
        teachclass = classAssigned.split(" ")
    }

    if (typeof sectionAssigned === "string") {
        techsection = sectionAssigned.split(" ")
    }

    if (typeof semsterNoAssigned === "string") {
        techsemster = semsterNoAssigned.split(" ")
    }



    // check existing user
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(400, "User already exists");
    }

    // create user
    const user = await User.create({
        fullName,
        username,
        email,
        password,
        role,

        studentProfile: role === "student" ? {
            classname,
            section,
            batchYear,
            semesterNo,
            department
        } : undefined,



        teacherProfile: role === "teacher"
            ? [{
                teachingSubject
            }]
            : undefined,

        teacherDepartment: role === "teacher" ? techdepart : undefined,
        classAssigned: role === "teacher" ? teachclass : undefined,
        sectionAssigned: role === "teacher" ? techsection : undefined,
        semsterNoAssigned: role === "teacher" ? techsemster : undefined
    });

    // fetch without password
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Error in User Creation");
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User Created Successfully"));
});


const UserLogin = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body

    if (username && email === "") {
        throw new ApiError(400, "This Field is required")
    }

    const user = await User.findOne({
        $or: [{ username, email }]
    })

    if (!user) {
        throw new ApiError(404, "User is not found")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    console.log("password validation:", isPasswordCorrect)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "password is incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


    if (!loggedInUser) {
        throw new ApiError(404, "user is not Logged in")
    }

    if (loggedInUser.isBlock === true) {
        throw new ApiError(400, "You're portal access is Block contact to the admin")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
})

const UserLogout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,

        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(200, new ApiResponse("User Logout SuccessFully"))
})


const ChangeCurrentPassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "User is not found")
    }

    const passwordCorrect = await user.ispasswordCorrect(oldPassword)

    if (!passwordCorrect) {
        throw new ApiError(400, "Password is incorrect")
    }

    user.password = newPassword
    await user.save()

    return res.status(200).json(200, new ApiResponse("Password Change SucessFully"))

})

const refreshToken = asyncHandler(async (req, res) => {

    const inCommingrefreshToken = await req.cookies?.refreshToken || req.body.refreshToken

    if (!inCommingrefreshToken) {
        throw new ApiError(404, "Incoming refresh Token is not found")
    }

    try {
        const decodedToken = jwt.verify(inCommingrefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(404, "user is not found")
        }

        if (inCommingrefreshToken !== user.refreshToken) {
            throw new ApiError(400, "Invalid refresh Token")
        }

        const { accessToken, newrefreshToken } = await generateAccessAndRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookies("accessToken", accessToken, options)
            .cookies("refreshToken", newrefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newrefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Invalid Refresh Token")
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select("-password")

    if (!user) {
        throw new ApiError(404, "Get Current User is not found")
    }

    return res.status(200).json(new ApiResponse(200, "GetCurrent User Fetched SucessFully"))
})

const UpdateAccountDetails = asyncHandler(async (req, res) => {
    const { username, fullName } = req.body
    const { userId, studentId } = req.params

    if (!username || !fullName) {
        throw new ApiError(400, "Username and fullname are required")
    }

    const userRequest = await User.findById(userId)
    const student = await User.findById(studentId)

    if (!userRequest || userRequest.role !== "admin") {
        throw new ApiError(403, "You have no access")
    }

    if (!student) {
        throw new ApiError(404, "Student is not found")
    }

    const user = await User.findByIdAndUpdate(
        studentId,
        {
            $set: {
                username,
                fullname: fullName
            }
        },
        { new: true }
    )

    if (!user) {
        throw new ApiError(400, "Error in updating account details")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Account details updated successfully", user))
})


const fetchallStudent = asyncHandler(async (req, res) => {

    const { userId } = req.params

    const { department, section, classname, semesterNo } = req.body

    const userRequest = await User.findById(userId)

    if (userRequest.role !== "admin") {
        throw new ApiError(400, "unauthorized Request")
    }

    if (!department || !section || !classname || !semesterNo) {
        throw new ApiError(400, "All Fields Must be Filled")
    }

    const StudentList = await User.find({
        role: "student",
        studentProfile: {
            $elemMatch: {
                department,
                section,
                classname,
                semesterNo
            }
        }
    })


    return res.status(200).json(new ApiResponse(200, StudentList, "Student Find SuccessFully"))

})

const blockStudent = asyncHandler(async (req, res) => {

    const { studentid, userId }  = req.params

    const userRequest = await User.findById(studentid)

    const adminId = await User.findById(userId)

    if (adminId.role !== "admin") {
        throw new ApiError(400, "Unauthorized Requrest")
    }

    if (!userRequest) {
        throw new ApiError(404, "Student is not found")
    }
    if (userRequest) {
        userRequest.isBlock = !userRequest.isBlock
        await userRequest.save()
    } else {
        throw new ApiError(400, "Error in user blocking")
    }

    return res.status(200).json(new ApiResponse(200, userRequest, "Student block status updated successfully"))
})


const deleteStudent = asyncHandler(async (req, res) => {

    const { studentId, userId } = req.params

    const userRequest = await User.findById(userId)

    if (userRequest.role !== "admin") {
        throw new ApiError("you have no access")
    }

    const stdId = User.findById(studentId)

    if (!stdId) {
        throw new ApiError("Student Id is not found")
    }

    const deletestudent = await User.findByIdAndDelete(studentId)

    if (!deletestudent) {
        throw new ApiError("Student is not delete")
    }


    return res.status(200).json((new ApiResponse(200, "Student is Delete SucessFully")))

})

export {
    registerUser,
    UserLogin,
    UserLogout,
    ChangeCurrentPassword,
    getCurrentUser,
    UpdateAccountDetails,
    refreshToken,
    fetchallStudent,
    blockStudent,
    deleteStudent
};