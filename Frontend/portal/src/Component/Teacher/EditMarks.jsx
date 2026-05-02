import React from 'react';
import { useLocation, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function EditMarks() {
    const location = useLocation();
    const student = location.state?.student;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { teacherId, studentId } = useParams();

    const EditResultMarks = async (data) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/api/v1/result/${teacherId}/${studentId}/update-resultMarks`,
                data,
                { withCredentials: true }
            );
            console.log(response.data.data);
        } catch (error) {
            console.log("ERROR IN UPDATE THE MARKS", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Edit Marks
                </h1>
                <p className="text-gray-600 mb-6">
                    Updating marks for <span className="font-semibold">{student?.fullName}</span>
                </p>

                <form onSubmit={handleSubmit(EditResultMarks)} className="space-y-5">
                    {/* Mid Marks */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Midterm Marks</label>
                        <input
                            type="number"
                            {...register("midMarks", { required: "Midterm marks are required" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.midMarks && (
                            <p className="text-sm text-red-500 mt-1">{errors.midMarks.message}</p>
                        )}
                    </div>

                    {/* Final Marks */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Final Marks</label>
                        <input
                            type="number"
                            {...register("finalMarks", { required: "Final marks are required" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.finalMarks && (
                            <p className="text-sm text-red-500 mt-1">{errors.finalMarks.message}</p>
                        )}
                    </div>

                    {/* Assignment Marks */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Assignment Marks</label>
                        <input
                            type="number"
                            {...register("assignmentMarks", { required: "Assignment marks are required" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.assignmentMarks && (
                            <p className="text-sm text-red-500 mt-1">{errors.assignmentMarks.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 font-medium"
                    >
                        Save Marks
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditMarks;
