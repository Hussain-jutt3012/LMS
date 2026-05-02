import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Attendance } from "../model/attendance.model.js";
import { User } from "../model/user.model.js";
import { Subject } from "../model/subject.model.js";
import mongoose from "mongoose";

const attendanceMark = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { subjectName, classname, section, department, semesterNo } = req.body;

    if (!subjectName || !classname || !section || !department || !semesterNo) {
        throw new ApiError(400, "All fields are required to mark attendance");
    }

    // Find user
    const userRequest = await User.findById(userId);
    if (!userRequest || userRequest.role !== "teacher") {
        throw new ApiError(403, "Unauthorized user");
    }

    const teachingSubject = userRequest.teacherProfile?.[0]?.teachingSubject;
    const teacherDepartment = userRequest.teacherDepartment;

    if (subjectName !== teachingSubject ||
        !teacherDepartment.includes(department) ||
        !userRequest.classAssigned.includes(classname) ||
        !userRequest.sectionAssigned.includes(section) ||
        !userRequest.semesterNoAssigned.includes(semesterNo)) {
        throw new ApiError(403, "Unauthorized access to subject or class");
    }

    // Check if subject exists
    const subject = await Subject.findOne({
        semesterNo,
        department,
        subjectName,
        classname,
        section,
    });

    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    // Find all students in that class/section/semester
    const studentList = await User.find({
        role: "student",
        studentProfile: {
            $elemMatch: {
                department,
                classname,
                section,
                semesterNo: semesterNo,
            }
        }
    });

    if (!studentList || studentList.length === 0) {
        throw new ApiError(400, "No students found in this class/section");
    }

    return res.status(200).json(new ApiResponse(
        200,
        { studentList },
        "Students retrieved successfully"
    ));
});

const markAttendance = asyncHandler(async (req, res) => {
    const { students, subjectName, name, department, section, classname, semesterNo, status } = req.body;
    const { userId } = req.params;

    // Validate required fields
    if (!students || !Array.isArray(students) || students.length === 0) {
        throw new ApiError(400, "Students array is required and must not be empty");
    }

    if (!subjectName || !classname || !section || !department || !semesterNo) {
        throw new ApiError(400, "All attendance fields are required");
    }

    // Validate user is a teacher
    const userRequest = await User.findById(userId);
    if (!userRequest) {
        throw new ApiError(404, "User not found");
    }

    if (userRequest.role !== "teacher") {
        throw new ApiError(403, "Unauthorized: Only teachers can mark attendance");
    }

    const todayStr = new Date().toISOString().split("T")[0];

    // Check if attendance already marked for today
    const existing = await Attendance.findOne({
        subjectName,
        classname,
        section,
        department,
        $expr: {
            $eq: [
                { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                todayStr,
            ]
        }
    });

    if (existing) {
        throw new ApiError(409, "Attendance already marked for today. Please use the edit option to update");
    }

    // Validate subject exists
    const authSubject = await Subject.findOne({ subjectName });

    if (!authSubject) {
        throw new ApiError(404, "Subject not found");
    }

    // Create Attendance Data
    const attendance = await Attendance.create({
        name,
        department,
        section,
        classname,
        semesterNo,
        status,
        students: students,
        subjectName,
        teacher: userRequest._id,
        subject: authSubject._id
    });

    return res.status(201).json(new ApiResponse(
        201,
        { attendance },
        "Attendance marked successfully"
    ));
});

const editAttendance = asyncHandler(async (req, res) => {
    const { teacherId, studentId } = req.params;
    const { status } = req.body;

    // Validate required fields
    if (!status) {
        throw new ApiError(400, "Status field is required");
    }

    if (!["present", "absent", "leave"].includes(status)) {
        throw new ApiError(400, "Invalid status. Must be 'present', 'absent', or 'leave'");
    }

    // Validate teacher exists and is authorized
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "teacher") {
        throw new ApiError(403, "Teacher not found or unauthorized");
    }

    // Validate student ID format
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        throw new ApiError(400, "Invalid student ID format");
    }

    const todayStr = new Date().toISOString().split("T")[0];

    // Update today's attendance for this student
    const editAttendance = await Attendance.findOneAndUpdate(
        {
            teacher: new mongoose.Types.ObjectId(teacherId),
            "students.users": new mongoose.Types.ObjectId(studentId),
            $expr: {
                $eq: [
                    { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    todayStr
                ]
            }
        },
        {
            $set: {
                'students.$.status': status
            }
        },
        {
            new: true
        }
    );

    if (!editAttendance) {
        throw new ApiError(404, "Attendance record not found for this student today");
    }

    return res.status(200).json(new ApiResponse(200, { editAttendance }, "Attendance updated successfully"));
});

const getAttendanceData = asyncHandler(async (req, res) => {
    const studentId = req.user._id;

    // Validate user is a student
    const userRequest = await User.findById(studentId);
    if (!userRequest || userRequest.role !== "student") {
        throw new ApiError(403, "Student not found or unauthorized");
    }

    // Aggregate attendance summary
    const summary = await Attendance.aggregate([
        { $unwind: "$students" },

        {
            $match: {
                "students.users": new mongoose.Types.ObjectId(studentId)
            }
        },

        {
            $group: {
                _id: { users: "$students.users", subject: "$subject" },
                totalClasses: { $sum: 1 },
                present: {
                    $sum: { $cond: [{ $eq: ["$students.status", "present"] }, 1, 0] }
                },
                absent: {
                    $sum: { $cond: [{ $eq: ["$students.status", "absent"] }, 1, 0] }
                },
                leave: {
                    $sum: { $cond: [{ $eq: ["$students.status", "leave"] }, 1, 0] }
                }
            }
        },
        {
            $project: {
                totalClasses: 1,
                studentId: "$_id.users",
                subjectId: "$_id.subject",
                present: 1,
                absent: 1,
                leave: 1,
                attendancePercentage: {
                    $cond: [
                        { $gt: ["$totalClasses", 0] },
                        { $multiply: [{ $divide: ["$present", "$totalClasses"] }, 100] },
                        0
                    ]
                }
            }
        },

        {
            $lookup: {
                from: "subjects",
                localField: "subjectId",
                foreignField: "_id",
                as: "subjectDetails"
            }
        },
        { $unwind: { path: "$subjectDetails", preserveNullAndEmptyArrays: true } },
    ]);

    if (!summary || summary.length === 0) {
        return res.status(200).json(
            new ApiResponse(200, { summary: [] }, "No attendance records found for this student")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, { summary }, "Attendance data fetched successfully")
    );
});

export {
    attendanceMark,
    editAttendance,
    getAttendanceData,
    markAttendance
};
