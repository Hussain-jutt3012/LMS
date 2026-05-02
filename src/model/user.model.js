import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        password: {
            type: String,
            required: [true, 'Password is required']
        },


        refreshToken: {
            type: String
        },

        role: {
            type: String,
            enum: ['admin', 'teacher', 'student'],
            required: true
        },


        studentProfile: [{
            classname: { type: String, trim: true, required: true, },
            section: { type: String, trim: true, required: true },
            batchYear: { type: Number, required: true },
            semesterNo: { type: Number, min: 1, max: 8, required: true },
            department: { type: String, required: true },
        }],

        teacherProfile: [{
            teachingSubject: {
                type: String,
                required: true
            },
        }],

        teacherDepartment: {
            type: [String],
            required: true
        },

        classAssigned: {
            type: [String],
            required: true
        },

        sectionAssigned: {
            type: [String],
            required: true
        },

        semsterNoAssigned: {
            type: [String],
            required: true
        },

        isBlock: {
            type: Boolean,
            default: false
        }

    },

    {
        timestamps: true
    }
 
)


userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next();

})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            fullName: this.fullName,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}

export const User = mongoose.model("User", userSchema)