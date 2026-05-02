import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function ResultMarks() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [studentData, setStudentData] = useState([]);
    const { userId } = useParams();

    // Search for students
    const ResultData = async (data) => {
        try {
            const response = await axios.post(
                `http://localhost:4000/api/v1/result/${userId}/result-remarks`,
                data,
                { withCredentials: true }
            );
            setStudentData(response.data.data);
        } catch (error) {
            console.log("ERROR IN THE USER FETCH", error);
        }
    };

    // Enter marks for students
    const EnterResultData = async (data) => {
        try {
            console.log("Submitting Marks:", data);
            const response = await axios.post(
                `http://localhost:4000/api/v1/result/${userId}/Enterd-result`,
                data,
                { withCredentials: true }
            );
            console.log(response.data.data);
            reset(); // clear form after submission
        } catch (error) {
            console.log("ERROR IN THE ENTER THE RESULT MARKS", error);
        }
    };

    return (
        <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
            {/* Mark Results */}
            <h2 className="text-2xl font-bold mb-4">Mark Results</h2>
            <form onSubmit={handleSubmit(ResultData)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[
                        { name: "subjectName", placeholder: "Subject Name" },
                        { name: "classname", placeholder: "Class Name" },
                        { name: "section", placeholder: "Section" },
                        { name: "department", placeholder: "Department" },
                        { name: "semesterNo", placeholder: "Semester No" },
                    ].map((field, i) => (
                        <div key={i} className="flex flex-col">
                            <input
                                type="text"
                                placeholder={field.placeholder}
                                {...register(field.name, { required: `${field.placeholder} is required` })}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors[field.name] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors[field.name]?.message}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                    Search
                </button>
            </form>

            {/* Enter Marks */}
            {studentData.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Enter Marks</h2>
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <form onSubmit={handleSubmit(EnterResultData)}>
                            <table className="w-full text-left">
                                <thead className="bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Student</th>
                                        <th className="px-6 py-3 font-semibold">Midterm</th>
                                        <th className="px-6 py-3 font-semibold">Assignment</th>
                                        <th className="px-6 py-3 font-semibold">Final Term</th>
                                        <th className="px-6 py-3 font-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData.map((student, idx) => (
                                        <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50">
                                            <td className="px-6 py-3 flex items-center gap-3 text-black">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <svg
                                                        className="w-5 h-5 text-gray-500"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                                                    </svg>
                                                </div>
                                                {student.fullName}

                                                {/* Hidden field for studentId */}
                                                <input
                                                    type="hidden"
                                                    {...register(`results.${idx}.student`)}
                                                    value={student._id}
                                                />
                                            </td>

                                            <td className="px-6 py-3">
                                                <input
                                                    type="number"
                                                    className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    {...register(`results.${idx}.midMarks`, { required: true })}
                                                />
                                            </td>

                                            <td className="px-6 py-3">
                                                <input
                                                    type="number"
                                                    className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    {...register(`results.${idx}.assignmentMarks`, { required: true })}
                                                />
                                            </td>

                                            <td className="px-6 py-3">
                                                <input
                                                    type="number"
                                                    className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    {...register(`results.${idx}.finalMarks`, { required: true })}
                                                />
                                            </td>

                                            <td className="px-6 py-3">
                                                <Link
                                                    to={`/${userId}/${student._id}/update-attendance`}
                                                    className="text-blue-500 hover:underline"
                                                    state={{student}}
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-end p-4">
                                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResultMarks;
