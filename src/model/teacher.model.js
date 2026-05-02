import mongoose, { Schema } from "mongoose";


const teacherSchema = new Schema(
    {
        addAssigment: {
            type: String,
            required: false,
        },

        courseOutline:{
            type: String,
            required: false,
        },

        owner:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required:true
        }
   
    },

    {
        timestamps:true
    }
)

export const Teacher = mongoose.model("Teacher", teacherSchema)