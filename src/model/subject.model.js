import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
  {
    subjectName: {
      type: String,
      required: true,
      unique: true,   // ✅ each subject must have unique name
      trim: true
    },

    subjectCode: {
      type: String,
      required: true,
      unique: true,   // ✅ subject codes must be unique
      trim: true,
      uppercase: true
    },

    classname: {
      type: [String],   // ✅ array of class names
      required: true,
      trim: true
    },

    section: {
      type: [String],   // ✅ array of sections
      required: true,
      trim: true
    },

    semsterNo: {
      type: [Number],   // ✅ array of semester numbers
      required: true
    },

    department: {
      type: [String],   // ✅ array of departments
      required: true
      // ❌ removed unique:true
    },

    taughtBy: {
      type: String,   // ✅ changed to array to allow multiple teachers
      required: true,
      trim: true
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // admin
      required: true
    }
  },
  { timestamps: true }
);

export const Subject = mongoose.model("Subject", subjectSchema);
