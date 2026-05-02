import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router";

function SubjectRegister() {
    const { userId } = useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const subjectRegister = async (data) => {
        try {
            setLoading(true);
            setErrorMsg("");
            setSuccessMsg("");

            // Convert comma separated values into arrays
            const formattedData = {
                subjectName: data.subjectName
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),

                subjectCode: data.subjectCode
                    .split(",")
                    .map((item) => item.trim().toUpperCase())
                    .filter(Boolean),

                taughtBy: data.taughtBy,

                classname: data.classname
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),

                section: data.section
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),

                semsterNo: data.semsterNo
                    .split(",")
                    .map((item) => Number(item.trim()))
                    .filter((item) => !isNaN(item)),

                department: data.department
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
            };


            const response = await axios.post(
                `http://localhost:4000/api/v1/subjects/${userId}/subject-create`,
                formattedData,
                {
                    withCredentials: true,
                }
            );

            setSuccessMsg("Subject created successfully!");

            reset();
        } catch (error) {
            setErrorMsg(
                error?.response?.data?.message ||
                    "Subject registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10 relative overflow-hidden">

            {/* Background Decorations */}

            <div className="absolute top-[-150px] left-[-150px] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

            <div className="absolute top-1/2 right-[-150px] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-[-150px] left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

            {/* Main Container */}

            <div className="relative w-full max-w-4xl">

                <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

                    {/* Header */}

                    <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8">

                        <div className="flex items-center gap-4">

                            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-lg">
                                📚
                            </div>

                            <div>
                                <p className="text-purple-100 text-sm uppercase tracking-wider font-medium">
                                    Admin Portal
                                </p>

                                <h1 className="text-3xl font-bold text-white">
                                    Register New Subject
                                </h1>

                                <p className="text-purple-100 mt-1">
                                    Create and assign new subjects
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Success Message */}

                    {successMsg && (
                        <div className="mx-8 mt-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-4 rounded-xl text-center font-medium">
                            ✅ {successMsg}
                        </div>
                    )}

                    {/* Error Message */}

                    {errorMsg && (
                        <div className="mx-8 mt-6 bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl text-center font-medium">
                            ❌ {errorMsg}
                        </div>
                    )}

                    {/* Form */}

                    <form
                        onSubmit={handleSubmit(subjectRegister)}
                        className="p-8 space-y-8"
                    >

                        {/* Subject Information */}

                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                📋 Subject Information
                            </h2>

                            <p className="text-slate-400 text-sm mt-1">
                                You can enter multiple subjects separated by commas.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Subject Name */}

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Subject Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="OOP, Database, Web Engineering"
                                    {...register("subjectName", {
                                        required: "Subject name is required",
                                    })}
                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                                />

                                <p className="text-slate-500 text-xs mt-1">
                                    Example: OOP, Database, Web Engineering
                                </p>

                                {errors.subjectName && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.subjectName.message}
                                    </p>
                                )}
                            </div>

                            {/* Subject Code */}

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Subject Code
                                </label>

                                <input
                                    type="text"
                                    placeholder="CS-201, CS-202, CS-203"
                                    {...register("subjectCode", {
                                        required: "Subject code is required",
                                    })}
                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                                />

                                <p className="text-slate-500 text-xs mt-1">
                                    Example: CS-201, CS-202, CS-203
                                </p>

                                {errors.subjectCode && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.subjectCode.message}
                                    </p>
                                )}
                            </div>

                            {/* Teacher */}

                            <div className="md:col-span-2">

                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Teacher ID
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter teacher ID"
                                    {...register("taughtBy", {
                                        required: "Teacher is required",
                                    })}
                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                                />

                                {errors.taughtBy && (
                                    <p className="text-red-400 text-xs mt-1.5">
                                        {errors.taughtBy.message}
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* Academic Information */}

                        <div className="pt-4 border-t border-slate-800">

                            <h2 className="text-lg font-semibold text-white">
                                🎓 Academic Assignment
                            </h2>

                            <p className="text-slate-400 text-sm mt-1">
                                Enter multiple values separated by commas.
                            </p>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Class */}

                            <div>

                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Class Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="BSCS, BSSE"
                                    {...register("classname", {
                                        required: "Class name is required",
                                    })}
                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                                />

                                <p className="text-slate-500 text-xs mt-1">
                                    Example: BSCS, BSSE
                                </p>

                                {errors.classname && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.classname.message}
                                    </p>
                                )}

                            </div>

                            {/* Section */}

                            <div>

                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Section
                                </label>

                                <input
                                    type="text"
                                    placeholder="A, B"
                                    {...register("section", {
                                        required: "Section is required",
                                    })}
                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                                />

                                <p className="text-slate-500 text-xs mt-1">
                                    Example: A, B
                                </p>

                                {errors.section && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.section.message}
                                    </p>
                                )}

                            </div>

                            {/* Semester */}

                            <div>

                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Semester No
                                </label>

                                <input
                                    type="text"
                                    placeholder="3, 4"
                                    {...register("semsterNo", {
                                        required: "Semester number is required",
                                    })}
                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                                />

                                <p className="text-slate-500 text-xs mt-1">
                                    Example: 3, 4
                                </p>

                                {errors.semsterNo && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.semsterNo.message}
                                    </p>
                                )}

                            </div>

                            {/* Department */}

                            <div>

                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Department
                                </label>

                                <input
                                    type="text"
                                    placeholder="Computer Science, Software Engineering"
                                    {...register("department", {
                                        required: "Department is required",
                                    })}
                                    className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                                />

                                <p className="text-slate-500 text-xs mt-1">
                                    Example: Computer Science, Software Engineering
                                </p>

                                {errors.department && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.department.message}
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* Preview Information */}

                        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">

                            <div className="flex items-start gap-3">

                                <div className="text-xl">
                                    💡
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-white">
                                        Multiple Values
                                    </h3>

                                    <p className="text-xs text-slate-400 mt-1">
                                        Use commas to add multiple values.
                                        For example:
                                        <span className="text-indigo-400">
                                            {" OOP, Database, Web Engineering"}
                                        </span>
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Submit Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-950/30 transition-all duration-300"
                        >
                            {loading
                                ? "⏳ Creating Subject..."
                                : "📚 Create Subject"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default SubjectRegister;