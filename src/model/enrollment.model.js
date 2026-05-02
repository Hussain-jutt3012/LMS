import mongoose, {Schema} from "mongoose";

const enrollment = new mongoose.Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        className: {
            type: String,
            required: true,
        },
        subjects: [
            {
                type: String,
                required: true,
            },
        ],
        semesterNo: {
            type: String,
            required: true
        },
      
        enrolledBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        enrolledAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const Enrollment = mongoose.model("Enrollment", enrollment);
