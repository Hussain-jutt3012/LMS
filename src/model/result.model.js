import mongoose, { Schema } from "mongoose";

const resultSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subjectName: {
      type: String,
      required: false,
    },

    classname: {
      type: String,
      required: true,
      trim: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
    },

    semesterNo: {
      type: Number,
      required: true,
    },

    subjectCode:{
      type:String,
      required:false
    },

    results: [
      {
        student: {
          type: Schema.Types.ObjectId,
          ref: "User", 
          required: true,
        },
        name:{
          type: String,
          required:false
        },
        assignmentMarks: {
          type: Number,
          default: 0,
        },

        midMarks: {
          type: Number,
          default: 0,
        },

        finalMarks: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Result = mongoose.model("Result", resultSchema);
