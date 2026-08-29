import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "../src/app.js";
import connectDB from "../src/db/index.js";
import { jest } from "@jest/globals";

dotenv.config();

jest.setTimeout(15000);

let studentToken;

beforeAll(async () => {
    await connectDB();

    // Teacher Login
    const loginResponse = await request(app)
        .post("/api/v1/users/login")
        .send({
            email: "talhamaqsood@gmail.com",
            password: "talha1234"
        });

    console.log("LOGIN STATUS:", loginResponse.statusCode);
    console.log("LOGIN BODY:", loginResponse.body);

    expect(loginResponse.statusCode).toBe(200);

    studentToken = loginResponse.body.data.accessToken;

    expect(studentToken).toBeDefined();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Result API", () => {

    test("Student should get result marks successfully", async () => {

    const response = await request(app)
        .get("/api/v1/result/get-result")
        .set("Authorization", `Bearer ${studentToken}`);

    console.log("STATUS:", response.statusCode);
    console.log("BODY:", response.body);
    console.log("TEXT:", response.text);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.success).toBe(true);
});
});