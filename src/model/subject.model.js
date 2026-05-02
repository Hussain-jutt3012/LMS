import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
  {
    subjectName: {
      type: [String],
      required: true,
      unique: true,  
      trim: true
    },

    subjectCode: {
      type: [String],
      required: true,
      unique: true,   
      trim: true,
      uppercase: true
    },

    classname: {
      type: [String],  
      required: true,
      trim: true
    },

    section: {
      type: [String],  
      required: true,
      trim: true
    },

    semsterNo: {
      type: [Number],  
      required: true
    },

    department: {
      type: [String],  
      required: true
    },

    taughtBy: {
      type: String,  
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
