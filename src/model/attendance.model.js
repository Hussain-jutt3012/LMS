import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    subjectName: {
      type: String,
    },

    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    students: [
      {
        users: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        name: {
          type: String
        },
        classname: {
          type: String
        },
        semesterNo: {
          type: String
        },
        section: {
          type: String
        },

        department: {
          type: String
        },
        subjectName: {
          type: String
        },
        status: {
          type: String,
          enum: ["present", "absent", "leave"],
          required: true
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
