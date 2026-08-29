
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "../src/app.js";
import connectDB from "../src/db/index.js";

dotenv.config();

// Admin user ID
const ADMIN_ID = "6a7dfcc5fea091f76edbab88";

// Teacher user ID
const TEACHER_ID = "6a7e070bfda96e55cf0f3a7b";

// Admin login se mila hua accessToken yahan paste karo
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTdkZmNjNWZlYTA5MWY3NmVkYmFiODgiLCJ1c2VybmFtZSI6Imh1c3NhaW5hZG1pbjEyMyIsImZ1bGxOYW1lIjoiSHVzc2FpbkFsaSIsImVtYWlsIjoiaHVzc2FpbmFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4Nzc0MTUyMCwiZXhwIjoxNzg3ODI3OTIwfQ.og3_Y56108g68J6hhT5-_LHnw49-In0oBgo_Gblh2mI";

beforeAll(async () => {
    await connectDB();
},15000);

describe("Subject API", () => {

    test("Admin should create subject successfully", async () => {

        const response = await request(app)
            .post(`/api/v1/subjects/${ADMIN_ID}/subject-create`)
            .set("Authorization", `Bearer ${ADMIN_TOKEN}`)
            .send({
                subjectName: "path test subject",
                subjectCode: "PTST101",
                taughtBy: TEACHER_ID,
                classname: "BSCS",
                section: "A",
                semsterNo: "5",
                department: "Computer Science"
            });
        console.log("STATUS:", response.statusCode);
        console.log("BODY:", response.body);
        console.log("TEXT:", response.text);
        console.log("HEADERS:", response.headers);
        console.log("Status:", response.statusCode);
        console.log("Response:", response.body);

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty("data");

        expect(response.body).toHaveProperty("message");
    });

});

afterAll(async () => {
    await mongoose.connection.close();
},15000);

