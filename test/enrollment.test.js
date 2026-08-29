import request from "supertest";
import { app } from "../src/app.js";
import dotenv from "dotenv";
import connectDB from "../src/db/index.js";

dotenv.config();

describe("Enrollment API", () => {

    const adminId = "6a7dfcc5fea091f76edbab88";
    const studentId = "6a7e13f70b712cb6dd3543eb";
    const adminToken = process.env.TEST_ADMIN_TOKEN;

    beforeAll(async () => {
        await connectDB();
    },15000);

    test(
        "Admin should enroll student successfully",
        async () => {

            expect(adminToken).toBeDefined();

            const response = await request(app)
                .post(
                    `/api/v1/enrollment/${adminId}/${studentId}/get-student-enrollement`
                )
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                )
                .send({
                    department: "CS",
                    classname: "BSCS",
                    section: "B",
                    semesterNo: 5,
                    subjects: ["OOP", "Math", "ISL"]
                });

            console.log("STATUS:", response.statusCode);
            console.log("BODY:", response.body);
            console.log("TEXT:", response.text);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("data");
            expect(response.body.success).toBe(true);
        },
        15000
    );

    afterAll(async () => {
        await import("mongoose").then(({ default: mongoose }) =>
            mongoose.connection.close()
        );
    },15000);

});