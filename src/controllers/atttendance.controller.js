import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Attendance } from "../model/attendance.model.js";
import { User } from "../model/user.model.js";
import { Subject } from "../model/subject.model.js";
import { mongoose } from "mongoose";

const attendanceMark = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { subjectName, classname, section, department, semsterNo, } = req.body;

    if (!subjectName || !classname || !section || !department || !semsterNo) {
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
        !userRequest.semsterNoAssigned.includes(semsterNo)) {
        throw new ApiError(403, "Unauthorized access to subject or class");
    }

    // Check if subject exists
    const subject = await Subject.findOne({
        semsterNo,
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
                semesterNo: semsterNo,
            }
        }
    });

    if (!studentList || studentList.length === 0) {
        throw new ApiError(400, "No students found in this class/section");
    }



    return res.status(201).json(new ApiResponse(
        201,
        { studentList },
        "Student find successfully"
    ));
});

console.log("attendanceData:", attendanceMark)

const markAttendance = asyncHandler(async (req, res) => {
    const { students, subjectName, name, department, section, classname, semesterNo, status, } = req.body;
    const { userId } = req.params;

    const userRequest = await User.findById(userId);
    if (userRequest.role !== "teacher") {
        throw new ApiError("unauthorized person");
    }

    const todayStr = new Date().toISOString().split("T")[0];
    console.log(todayStr)

    const existing = await Attendance.findOne({
        subjectName,
        $expr: {
            $eq: [
                { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                todayStr,
            ]
        }
    });

    if (existing) {
        throw new ApiError(404, "Today the attendance is already Marked If update the status go to the edit option")
    }

    const authSubject = await Subject.findOne({ subjectName })

    if (!authSubject) {
        throw new ApiError(404, "Subject is not found")
    }

    console.log(existing, "ExsitingData")

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
    const { status } = req.body

    // Validate teacher
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "teacher") {
        throw new ApiError(403, "Teacher not found or unauthorized");
    }

    // Fetch attendance records containing this student

    const attendanceRecords = await Attendance.find({
        "students.users": studentId,
    })

    console.log("dataRecord", attendanceRecords)

    if (!attendanceRecords) {
        throw new ApiError(404, "No attendance records found for this student");
    }

    const todayStr = new Date().toISOString().split("T")[0];
    console.log(todayStr)

    const EditAttendance = await Attendance.findOneAndUpdate(
        {
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
    )

    if (!EditAttendance) {
        throw new ApiError(400, "Attendance is not update")
    }

    return res.status(201).json(new ApiResponse(201, { EditAttendance }, "Attendance Update SucessFully"))

})


const getAttendanceData = asyncHandler(async (req, res) => {

    const studentId = req.user._id;

    console.log("StudentId", studentId)

    // Validate teacher
    const userRequest = await User.findById(studentId);
    if (!userRequest || userRequest.role !== "student") {
        throw new ApiError(403, "Student not found or unauthorized");
    }

    console.log(userRequest, "UserId")

    // Aggregate attendance summary
    const summary = await Attendance.aggregate([
        { $unwind: "$students" },

        {
            $match: {
                "students.users": studentId   //  Filter by logged-in student
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
                studentId: "$_id.user",
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

    console.log("summary", summary)

    return res.status(200).json(
        new ApiResponse(200, {

            summary
        }, "Attendance data fetched successfully")
    );
});

export {
    attendanceMark,
    editAttendance,
    getAttendanceData,
    markAttendance
};