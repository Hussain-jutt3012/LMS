import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import { Enrollment } from "../model/enrollment.model.js";
import mongoose from "mongoose";

const UserFind = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { department, classname, section, semesterNo } = req.body;

    const userRequest = await User.findById(userId);

    if (!userRequest) {
        throw new ApiError(404, "User ID is not found");
    }
    if (userRequest.role !== "admin") {
        throw new ApiError(400, "Unauthorized Request");
    }

    const FindStudentData = await User.find({
        role: "student",
        "studentProfile.department": department,
        "studentProfile.classname": classname,
        "studentProfile.section": section,
        "studentProfile.semesterNo": semesterNo,
    });

    if (!FindStudentData.length) {
        throw new ApiError(400, "Student Data is not found");
    }

    return res.json(
        new ApiResponse(200, "Student Data Fetched Successfully", FindStudentData)
    );
});

const getEnrollment = asyncHandler(async (req, res) => {

    const { userId, studentId } = req.params;
    const { department, classname, subjects, section, semesterNo } =
        req.body;

    let subjectss = subjects

    if (typeof subjects === "string") {
        subjectss = subjects.split(" ").filter(Boolean)
    }

    if (!department || !classname || !subjects || !section || !semesterNo) {
        throw new ApiError(400, "All Fields is required")
    }

    const userRequest = await User.findById(userId);
    if (!userRequest) {
        throw new ApiError(404, "User is not found");
    }
    if (userRequest.role !== "admin") {
        throw new ApiError(400, "Unauthorized Request");
    }

    const student = await User.findById(studentId);
    if (!student) {
        throw new ApiError(400, "Student is not found");
    } else if (student) {
        throw new ApiError(400, `student is already enrolled ${student._id}`)
    }

    const createEnrollment = await Enrollment.create({
        department,
        className: classname,
        section,
        semesterNo,
        subjects: subjectss,
        enrolledBy: userRequest._id,
        studentId: student._id,
    });

    console.log("response", createEnrollment)

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Student Enrolled Successfully", createEnrollment)
        );
});

const getStudentEnrolledData = asyncHandler(async (req, res) => {

    const studentId = req.user._id; 

    const userRequest = await User.findById(studentId);

    if (!userRequest) {
        throw new ApiError(400, "StudentId is not found");
    }

    const findData = await Enrollment.find({ studentId: new mongoose.Types.ObjectId(studentId) });

    if (!findData || findData.length === 0) {
        throw new ApiError(404, "Student enrollment data is not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Student enrollment found successfully", findData)
        );
});

export { UserFind, getEnrollment, getStudentEnrolledData };