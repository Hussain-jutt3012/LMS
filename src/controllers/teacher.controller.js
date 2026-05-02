import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../model/teacher.model.js";
import { UpLoadOnCloudinary } from "../utils/Cloudinary.js";
import { User } from "../model/user.model.js";

const fileUpload = asyncHandler(async (req, res) => {
    const { teacherId } = req.params;

    const userRequest = await User.findById(teacherId);
    if (!userRequest) {
        throw new ApiError(404, "Teacher Id not found");
    }

    if (userRequest.role !== "teacher") {
        throw new ApiError(403, "Access denied: User is not a teacher");
    }

    const assginmentLocalPath = req.files?.addAssigment?.[0]?.path;
    const courseOutlinePath = req.files?.courseOutline?.[0]?.path;

    if (!assginmentLocalPath || !courseOutlinePath) {
        throw new ApiError(400, "Required files not uploaded");
    }

   
    const assignmentUpload = await UpLoadOnCloudinary(assginmentLocalPath);
    const courseOutlineUpload = await UpLoadOnCloudinary(courseOutlinePath);

    if (!assignmentUpload?.secure_url || !courseOutlineUpload?.secure_url) {
        throw new ApiError(500, "Cloudinary upload failed");
    }

    console.log("Assignment Upload:", assignmentUpload.secure_url);
    console.log("Course Outline Upload:", courseOutlineUpload.secure_url);

    const finalUpload = await Teacher.create({
        addAssigment: assignmentUpload.secure_url,
        courseOutline: courseOutlineUpload.secure_url,
        owner: userRequest._id,
    });

    if (!finalUpload) {
        throw new ApiError(500, "Failed to save document to database");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                finalUpload,
            },
            "Document uploaded successfully"
        )
    );
});

export { fileUpload };