import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

function Assignment() {

    const { teacherId } = useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const uploadDocuments = async (data) => {

        try {

            setLoading(true);
            setSuccess("");
            setError("");

            const formData = new FormData();

            // IMPORTANT:
            // These names must match backend req.files
            formData.append(
                "addAssigment",
                data.addAssigment[0]
            );

            formData.append(
                "courseOutline",
                data.courseOutline[0]
            );


            const response = await axios.post(
                `http://localhost:4000/api/v1/teacher/${teacherId}/upload`,
                formData,
                {
                    withCredentials: true,

                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );


            setSuccess(
                response.data.message ||
                "Documents uploaded successfully"
            );

            reset();

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Something went wrong while uploading documents"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-6 lg:px-10 relative overflow-hidden">

            {/* Background */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

            <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-[-150px] left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>


            <div className="relative max-w-4xl mx-auto">


                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-indigo-950/40">

                    <div className="absolute -right-12 -top-16 w-64 h-64 bg-white/10 rounded-full"></div>

                    <div className="absolute right-32 -bottom-20 w-44 h-44 bg-white/10 rounded-full"></div>


                    <div className="relative flex items-center gap-5">

                        <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-lg">
                            📚
                        </div>

                        <div>

                            <p className="text-indigo-100 text-sm font-medium tracking-wider">
                                TEACHER PORTAL
                            </p>

                            <h1 className="text-2xl sm:text-3xl font-bold">
                                Assignments
                            </h1>

                            <p className="text-indigo-100 text-sm mt-1">
                                Upload assignments and course outlines
                            </p>

                        </div>

                    </div>

                </div>


                {/* Success Message */}
                {success && (

                    <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl p-4">

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xl">
                                ✓
                            </div>

                            <div>

                                <p className="font-semibold">
                                    Upload Successful
                                </p>

                                <p className="text-sm text-emerald-400/70">
                                    {success}
                                </p>

                            </div>

                        </div>

                    </div>

                )}


                {/* Error Message */}
                {error && (

                    <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-4">

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-xl">
                                ⚠
                            </div>

                            <div>

                                <p className="font-semibold">
                                    Upload Failed
                                </p>

                                <p className="text-sm text-red-400/70">
                                    {error}
                                </p>

                            </div>

                        </div>

                    </div>

                )}


                {/* Upload Form */}
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

                    <div className="p-6 sm:p-8 border-b border-slate-800">

                        <h2 className="text-xl font-bold">
                            Upload Documents
                        </h2>

                        <p className="text-slate-400 text-sm mt-1">
                            Select the required documents below
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit(uploadDocuments)}
                        className="p-6 sm:p-8 space-y-6"
                    >


                        {/* Assignment */}
                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-3">
                                Assignment
                            </label>


                            <label
                                htmlFor="assignment"
                                className="group flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 rounded-2xl cursor-pointer bg-slate-800/40 hover:bg-indigo-500/5 hover:border-indigo-500/50 transition-all"
                            >

                                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition">
                                    📝
                                </div>

                                <p className="text-slate-200 font-medium">
                                    Upload Assignment
                                </p>

                                <p className="text-slate-500 text-sm mt-1">
                                    PDF, DOC, DOCX
                                </p>

                                <input
                                    id="assignment"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    {...register("addAssigment", {
                                        required: "Assignment file is required"
                                    })}
                                />

                            </label>


                            {errors.addAssigment && (

                                <p className="text-red-400 text-sm mt-2">
                                    {errors.addAssigment.message}
                                </p>

                            )}

                        </div>


                        {/* Course Outline */}
                        <div>

                            <label className="block text-sm font-semibold text-slate-300 mb-3">
                                Course Outline
                            </label>


                            <label
                                htmlFor="courseOutline"
                                className="group flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 rounded-2xl cursor-pointer bg-slate-800/40 hover:bg-purple-500/5 hover:border-purple-500/50 transition-all"
                            >

                                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition">
                                    📋
                                </div>

                                <p className="text-slate-200 font-medium">
                                    Upload Course Outline
                                </p>

                                <p className="text-slate-500 text-sm mt-1">
                                    PDF, DOC, DOCX
                                </p>

                                <input
                                    id="courseOutline"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    {...register("courseOutline", {
                                        required: "Course outline is required"
                                    })}
                                />

                            </label>


                            {errors.courseOutline && (

                                <p className="text-red-400 text-sm mt-2">
                                    {errors.courseOutline.message}
                                </p>

                            )}

                        </div>


                        {/* Info */}
                        <div className="flex gap-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">

                            <div className="text-xl">
                                ℹ️
                            </div>

                            <div>

                                <p className="text-sm font-medium text-blue-300">
                                    Upload Information
                                </p>

                                <p className="text-xs text-slate-500 mt-1">
                                    Both Assignment and Course Outline are required.
                                    Your files will be securely uploaded and stored.
                                </p>

                            </div>

                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3.5 rounded-2xl font-bold text-white shadow-lg transition-all ${
                                loading
                                    ? "bg-slate-700 cursor-not-allowed"
                                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5"
                            }`}
                        >

                            {loading
                                ? "Uploading Documents..."
                                : "📤 Upload Documents"
                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Assignment;