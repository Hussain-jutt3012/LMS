
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { jest } from "@jest/globals";

import { app } from "../src/app.js";
import connectDB from "../src/db/index.js";

dotenv.config();

jest.setTimeout(15000);

// Teacher
const TEACHER_ID = "6a7e070bfda96e55cf0f3a7b";

// Student
const STUDENT_ID = "6a7e13f70b712cb6dd3543eb";

// Postman se teacher login ka accessToken yahan paste karo
const TEACHER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTdlMDcwYmZkYTk2ZTU1Y2YwZjNhN2IiLCJ1c2VybmFtZSI6Imh1c3NhaW4xMjM0IiwiZnVsbE5hbWUiOiJIdXNzYWluIEFud2FyIiwiZW1haWwiOiJodXNzYWluYW53YXJAZ21haWwuY29tIiwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE3ODc3NDMxNjIsImV4cCI6MTc4NzgyOTU2Mn0.qtoYJ61okN9tgShU2ElFUHEq3MNkxE7297T7a_ZnY1Q";

beforeAll(async () => {
    await connectDB();
});

describe("Attendance API", () => {

    const STUDENT_ID = "6a7e13f70b712cb6dd3543eb";

    // Postman se student login karke accessToken yahan paste karo
    const STUDENT_TOKEN = "PASTE_STUDENT_ACCESS_TOKEN_HERE";


    test("Student should get attendance data successfully", async () => {

        // 1. Student login
        const loginResponse = await request(app)
            .post("/api/v1/users/login")
            .send({
                email: "talhamaqsood@gmail.com",
                password: "talha1234",
            });

        console.log("LOGIN STATUS:", loginResponse.statusCode);
        console.log("LOGIN BODY:", loginResponse.body);

        expect(loginResponse.statusCode).toBe(200);

        const accessToken = loginResponse.body.data.accessToken;

        expect(accessToken).toBeDefined();

        // 2. Get attendance
        const response = await request(app)
            .get("/api/v1/attendance/get-attendance-data")
            .set("Authorization", `Bearer ${accessToken}`);

        console.log("STATUS:", response.statusCode);
        console.log("BODY:", response.body);
        console.log("TEXT:", response.text);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

