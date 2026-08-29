import request from "supertest";
import { app } from "../src/app.js";
import dotenv from "dotenv";
import connectDB from "../src/db/index.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Assignment API", () => {

    const teacherId = "6a7e070bfda96e55cf0f3a7b";

    const teacherToken = process.env.TEST_TEACHER_TOKEN;

    const assignmentPath = path.join(
        __dirname,
        "file",
        "assginment.jpg"
    );

    const courseOutlinePath = path.join(
        __dirname,
        "file",
        "course-outline.webp"
    );

    beforeAll(async () => {

        expect(teacherToken).toBeDefined();

        console.log(
            "Assignment File:",
            assignmentPath
        );

        console.log(
            "Course Outline File:",
            courseOutlinePath
        );

        console.log(
            "Assignment Exists:",
            fs.existsSync(assignmentPath)
        );

        console.log(
            "Course Outline Exists:",
            fs.existsSync(courseOutlinePath)
        );

        expect(fs.existsSync(assignmentPath)).toBe(true);

        expect(fs.existsSync(courseOutlinePath)).toBe(true);

        await connectDB();

    }, 30000);


    test(
        "Teacher should upload assignment and course outline successfully",
        async () => {

            const response = await request(app)
                .post(
                    `/api/v1/upload/${teacherId}/document`
                )
                .set(
                    "Authorization",
                    `Bearer ${teacherToken}`
                )
                .attach(
                    "addAssigment",
                    assignmentPath
                )
                .attach(
                    "courseOutline",
                    courseOutlinePath
                );

            console.log(
                "STATUS:",
                response.statusCode
            );

            console.log(
                "BODY:",
                response.body
            );

            console.log(
                "TEXT:",
                response.text
            );

            expect(response.statusCode).toBe(201);

            expect(response.body).toHaveProperty(
                "data"
            );

            expect(response.body.success).toBe(true);

            expect(response.body.message).toBe(
                "Document uploaded successfully"
            );

        },
        30000
    );


    afterAll(async () => {

        await mongoose.connection.close();

    }, 30000);

});