import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { jest } from "@jest/globals";

import { app } from "../src/app.js";
import connectDB from "../src/db/index.js";

dotenv.config();

jest.setTimeout(10000);

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("User Login API", () => {

    test("should login user successfully", async () => {

        const response = await request(app)
            .post("/api/v1/users/login")
            .send({
                email: "hussainanwar@gmail.com",
                password: "hussain1234",
            });

        console.log("STATUS:", response.statusCode);
        console.log(
            "BODY:",
            JSON.stringify(response.body, null, 2)
        );
        console.log("TEXT:", response.text);

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("message");
    });

});