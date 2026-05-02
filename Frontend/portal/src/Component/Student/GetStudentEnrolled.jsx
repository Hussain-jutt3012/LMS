import React, { useState, useEffect } from "react";
import axios from "axios";

function GetStudentEnrolled() {
    const [enrolledData, setEnrolledData] = useState([]);

    const getEnrolledData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/v1/enrollement/get-enrolled-data",
                { withCredentials: true }
            );
            setEnrolledData(response.data.message);
            console.log("GetEnrolledResponse", response);
        } catch (error) {
            console.log("ERROR IN GET ENROLLED DATA", error);
        }
    };

    useEffect(() => {
        getEnrolledData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🎓 Student Enrollment Details
            </h1>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full text-left border-collapse bg-white">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="p-4">#</th>
                            <th className="p-4">Department</th>
                            <th className="p-4">Class Name</th>
                            <th className="p-4">Semester No</th>
                            <th className="p-4">Subjects</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledData.length > 0 ? (
                            enrolledData.map((data, index) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-100 transition"
                                >
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{data?.department}</td>
                                    <td className="p-4">{data?.className}</td>
                                    <td className="p-4">{data?.semesterNo}</td>
                                    <td className="p-4">
                                        {Array.isArray(data?.subjects) ? (
                                            <div className="flex flex-wrap gap-2">
                                                {data.subjects.map((sub, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                                                    >
                                                        {sub}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            data?.subjects
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center p-6 text-gray-600 italic"
                                >
                                    No enrollment data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetStudentEnrolled;
