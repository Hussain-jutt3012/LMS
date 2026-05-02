import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";

function EditMarks() {
    const location = useLocation();
    const student = location.state?.student;

    const { teacherId, studentId } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const EditResultMarks = async (data) => {
        setErrorMessage("");
        setSuccessMessage("");

        try {
            setIsLoading(true);

            const response = await axios.patch(
                `http://localhost:4000/api/v1/result/${teacherId}/${studentId}/update-resultMarks`,
                data,
                {
                    withCredentials: true,
                }
            );

            setSuccessMessage(
                response?.data?.message ||
                "Student marks updated successfully."
            );
        } catch (error) {
            const statusCode = error?.response?.status;

            let message =
                "Unable to update marks. Please try again.";

            if (statusCode === 400) {
                message =
                    error?.response?.data?.message ||
                    "Invalid marks information. Please check the entered values.";
            } else if (statusCode === 401) {
                message =
                    "Your session has expired. Please login again.";
            } else if (statusCode === 403) {
                message =
                    error?.response?.data?.message ||
                    "You are not authorized to update these marks.";
            } else if (statusCode === 404) {
                message =
                    error?.response?.data?.message ||
                    "Student or result record was not found.";
            } else if (statusCode >= 500) {
                message =
                    "Server error occurred. Please try again later.";
            } else if (!error?.response) {
                message =
                    "Unable to connect to the server. Please check your internet connection.";
            } else {
                message =
                    error?.response?.data?.message ||
                    "Something went wrong while updating the marks.";
            }

            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    // Success message auto-hide
    useEffect(() => {
        if (!successMessage) return;

        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 4000);

        return () => clearTimeout(timer);
    }, [successMessage]);

    // Error message auto-hide
    useEffect(() => {
        if (!errorMessage) return;

        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 5000);

        return () => clearTimeout(timer);
    }, [errorMessage]);

    // Student data unavailable
    if (!student) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-slate-900 border border-red-500/20 rounded-2xl p-8 text-center shadow-xl">

                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl">
                        ⚠️
                    </div>

                    <h2 className="text-xl font-bold text-white">
                        Student Information Unavailable
                    </h2>

                    <p className="text-slate-400 text-sm mt-2">
                        We couldn't find the student information required
                        to update the marks.
                    </p>

                </div>
            </div>
        );
    }

    // Required route params unavailable
    if (!teacherId || !studentId) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-slate-900 border border-red-500/20 rounded-2xl p-8 text-center shadow-xl">

                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl">
                        ⚠️
                    </div>

                    <h2 className="text-xl font-bold text-white">
                        Invalid Request
                    </h2>

                    <p className="text-slate-400 text-sm mt-2">
                        Required student or teacher information is missing.
                        Please return and try again.
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden px-4 py-8 sm:px-6">

            {/* Background Decorations */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-2xl mx-auto">

                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 mb-6 shadow-2xl shadow-indigo-900/30">

                    <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-white/10"></div>

                    <div className="absolute right-24 -bottom-20 w-44 h-44 rounded-full bg-white/10"></div>

                    <div className="relative">

                        <div className="flex items-center gap-4">

                            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-lg">
                                ✏️
                            </div>

                            <div>

                                <p className="text-indigo-100 text-sm font-medium tracking-wider">
                                    TEACHER PORTAL
                                </p>

                                <h1 className="text-2xl sm:text-3xl font-bold">
                                    Edit Student Marks
                                </h1>

                                <p className="text-indigo-100 text-sm mt-1">
                                    Update academic performance records
                                </p>

                            </div>

                        </div>

                    </div>
                </div>

                {/* SUCCESS MESSAGE */}
                {successMessage && (
                    <div className="mb-6 flex items-start gap-3 bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-4 rounded-xl shadow-lg">

                        <div className="w-9 h-9 shrink-0 rounded-lg bg-green-500/10 flex items-center justify-center text-lg">
                            ✓
                        </div>

                        <div>
                            <p className="font-semibold">
                                Marks Updated Successfully
                            </p>

                            <p className="text-sm text-green-400/80 mt-1">
                                {successMessage}
                            </p>
                        </div>

                    </div>
                )}

                {/* ERROR MESSAGE */}
                {errorMessage && (
                    <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl shadow-lg">

                        <div className="w-9 h-9 shrink-0 rounded-lg bg-red-500/10 flex items-center justify-center text-lg">
                            !
                        </div>

                        <div>
                            <p className="font-semibold">
                                Unable to Update Marks
                            </p>

                            <p className="text-sm text-red-400/80 mt-1">
                                {errorMessage}
                            </p>
                        </div>

                    </div>
                )}

                {/* Student Information */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl">

                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold shadow-lg">
                            {student?.fullName?.charAt(0)?.toUpperCase() || "S"}
                        </div>

                        <div className="flex-1">

                            <p className="text-xs uppercase tracking-wider text-slate-500">
                                Student
                            </p>

                            <h2 className="text-lg font-semibold text-white">
                                {student?.fullName || "Student"}
                            </h2>

                            <p className="text-sm text-slate-500">
                                Update the marks below
                            </p>

                        </div>

                        <div className="hidden sm:flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-2 rounded-xl">

                            <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>

                            <span className="text-xs text-indigo-300">
                                Academic Record
                            </span>

                        </div>

                    </div>

                </div>

                {/* Edit Form */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">

                    <div className="px-6 sm:px-8 py-6 border-b border-slate-800">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                                📊
                            </div>

                            <div>

                                <h2 className="text-lg font-bold">
                                    Marks Details
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Enter the updated marks
                                </p>

                            </div>

                        </div>

                    </div>

                    <form
                        onSubmit={handleSubmit(EditResultMarks)}
                        className="p-6 sm:p-8 space-y-6"
                    >

                        {/* Mid Marks */}
                        <div>

                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                <span>🧪</span>
                                Midterm Marks
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                disabled={isLoading}
                                {...register("midMarks", {
                                    required: "Midterm marks are required",
                                    min: {
                                        value: 0,
                                        message: "Marks cannot be negative",
                                    },
                                })}
                                placeholder="Enter midterm marks"
                                className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            />

                            {errors.midMarks && (
                                <p className="text-red-400 text-xs mt-1.5">
                                    {errors.midMarks.message}
                                </p>
                            )}

                        </div>

                        {/* Final Marks */}
                        <div>

                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                <span>🎯</span>
                                Final Marks
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                disabled={isLoading}
                                {...register("finalMarks", {
                                    required: "Final marks are required",
                                    min: {
                                        value: 0,
                                        message: "Marks cannot be negative",
                                    },
                                })}
                                placeholder="Enter final marks"
                                className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            />

                            {errors.finalMarks && (
                                <p className="text-red-400 text-xs mt-1.5">
                                    {errors.finalMarks.message}
                                </p>
                            )}

                        </div>

                        {/* Assignment Marks */}
                        <div>

                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                <span>📝</span>
                                Assignment Marks
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                disabled={isLoading}
                                {...register("assignmentMarks", {
                                    required: "Assignment marks are required",
                                    min: {
                                        value: 0,
                                        message: "Marks cannot be negative",
                                    },
                                })}
                                placeholder="Enter assignment marks"
                                className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            />

                            {errors.assignmentMarks && (
                                <p className="text-red-400 text-xs mt-1.5">
                                    {errors.assignmentMarks.message}
                                </p>
                            )}

                        </div>

                        {/* Info */}
                        <div className="flex items-start gap-3 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">

                            <span className="text-lg">
                                💡
                            </span>

                            <p className="text-xs sm:text-sm text-slate-400">
                                Make sure the marks are correct before saving.
                                Updated marks will replace the student's existing
                                academic record.
                            </p>

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full text-white py-3.5 px-4 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                                isLoading
                                    ? "bg-slate-700 cursor-not-allowed opacity-70"
                                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5 shadow-indigo-900/20"
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                                    Updating Marks...
                                </>
                            ) : (
                                <>
                                    💾 Save Updated Marks
                                </>
                            )}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditMarks;