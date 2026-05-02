import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Result } from "../model/result.model.js";
import { User } from "../model/user.model.js";
import { Subject } from "../model/subject.model.js";
import { mongoose } from "mongoose";


const resultRemarks = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { subjectName, classname, section, department, semesterNo, } = req.body;

    if (!subjectName || !classname || !section || !department || !semesterNo) {
        throw new ApiError(400, "All Fields are required");
    }

    const userRequest = await User.findById(userId);

    if (!userRequest) {
        throw new ApiError(404, "User Id is not found");
    }

    if (userRequest.role !== "teacher") {
        throw new ApiError(400, "You're not a teacher");
    }

    const teachingSubject = userRequest.teacherProfile?.[0]?.teachingSubject;

    if (subjectName !== teachingSubject) {
        throw new ApiError(404, "Subject is not assigned to this teacher");
    }

    // Authorization checks
    if (!userRequest.teacherDepartment.includes(department)) {
        return res.status(403).json({ error: "Unauthorized department access" });
    }
    if (!userRequest.classAssigned.includes(classname)) {
        return res.status(403).json({ error: "Unauthorized classAssigned access" });
    }
    if (!userRequest.sectionAssigned.includes(section)) {
        return res.status(403).json({ error: "Unauthorized section access" });
    }
    if (!userRequest.semsterNoAssigned.includes(semesterNo)) {
        return res.status(403).json({ error: "Unauthorized semsterNo access" });
    }

    // Check subject assignment
    const subjectFind = await Subject.findOne({
        subjectName,
        classname,
        section,
        department,
    });

    console.log(subjectFind, "Finding")

    if (!subjectFind) {
        throw new ApiError(400, "This subject is not assigned to you");
    }

    // Find students matching criteria
    const StudentFind = await User.find({
        role: "student",
        studentProfile: {
            $elemMatch: {
                department,
                classname,
                section,
                semesterNo,
            },
        },
    });

    if (!StudentFind || StudentFind.length === 0) {
        throw new ApiError(400, "Student is not found");
    }

    return res.status(201).json(
        new ApiResponse(201, StudentFind, "Marks added successfully")
    );
});

const resultMarked = asyncHandler(async (req, res) => {

    const { userId } = req.params
    const { subjectName, classname, section, department, semesterNo, results, } = req.body;

    const userRequest = await User.findById(userId)

    if (!userRequest) {
        throw new ApiError(404, "User is not found")
    }

    if (userRequest.role !== "teacher") {
        throw new ApiError(400, "You have no access")
    }

    for (const students of results) {
        const findStudent = await Result.findOne({ "results.student": new mongoose.Types.ObjectId(students.student), subjectName: subjectName })
        console.log(findStudent, "Result Finded Student")
        if (findStudent) {
            throw new ApiError(400, `Result is already Enterd ${findStudent.student} for this Student and Subject`)
        }
    }

    const EnterResult = await Result.create({
        subjectName: subjectName,
        classname: classname,
        section: section,
        department: department,
        semesterNo: semesterNo,
        results: results.map(s => ({
            student: s.student,
            midMarks: s.midMarks,
            assignmentMarks: s.assignmentMarks,
            finalMarks: s.finalMarks
        })),
        teacher: userRequest._id
    })

    if (!EnterResult) {
        throw new ApiError(400, "Error In Enterd the Result")
    }

    return res.status(200).json(new ApiResponse(201, EnterResult, "Result Enterd SucessFully"))

})


const editResultMarks = asyncHandler(async (req, res) => {

    const { teacherId } = req.params
    const { studentId } = req.params

    const { assignmentMarks, midMarks, finalMarks } = req.body;

    // check teacherId is exist
    const userRequest = await User.findById(teacherId)

    // check student is exist
    const student = await User.findById(studentId)

    if (!userRequest) {
        throw new ApiError(400, "Teacher Id is not found")
    }

    if (!student) {
        throw new ApiError(400, "Student Id is not found")
    }

    // check user have teacher role
    if (userRequest.role !== "teacher") {
        throw new ApiError(400, "you have no access")
    }


    const updateMarks = await Result.findOneAndUpdate(
        {
            "results.student": studentId
        },

        {
            $set: {
                "results.$.assignmentMarks": assignmentMarks,
                "results.$.midMarks": midMarks,
                "results.$.finalMarks": finalMarks
            }
        },

        {
            new: true
        }

    )

    if (!updateMarks) {
        throw new ApiError(400, "Marks is not update")
    }

    return res.status(201).json(
        new ApiResponse(201, updateMarks, "Marks updated successfully")
    );

})


const getResultMarks = asyncHandler(async (req, res) => {

    const studentId = req.user._id

    const userRequest = await User.findById(studentId)

    if (!userRequest) {
        throw new ApiError(400, "Student Id is not found")
    }

    if (userRequest.role !== "student") {
        throw new ApiError(400, "You have no access")
    }

    const findData = await Result.find({
        "results.student": new mongoose.Types.ObjectId(req.user._id),
    });


    if (!findData || findData.length === 0) {
        throw new ApiError(400, "Student is not found")
    }

    const totalResultMarks = await Result.aggregate([
        { $unwind: "$results" },

        {
            $match: {
                "results.student": new mongoose.Types.ObjectId(studentId),
            },
        },

        {
            $group: {
                _id: {
                    student: "$results.student",
                    semesterNo: "$semesterNo",
                },
                totalObtaniedMarks: {
                    $sum: {
                        $add: [
                            "$results.midMarks",
                            "$results.assignmentMarks",
                            "$results.finalMarks",
                        ],
                    },
                },
            },
        },

        {
            $addFields: {
                totalPercentage: {
                    $cond: [
                        { $gt: ["$totalObtaniedMarks", 0] },
                        { $multiply: [{ $divide: ["$totalObtaniedMarks", 200] }, 100] },
                        0,
                    ],
                },
            },
        },

        {
            $project: {
                _id: 0,
                student: "$_id.student",
                semesterNo: "$_id.semesterNo",
                totalObtaniedMarks: 1,
                totalPercentage: 1,
            },
        },
    ]);


    return res.status(200).json((new ApiResponse(200), { findData, totalResultMarks }))
})

export { resultRemarks, editResultMarks, getResultMarks, resultMarked };