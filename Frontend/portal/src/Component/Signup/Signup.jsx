import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

function Signup() {
    const { userId } = useParams();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const role = watch("role");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const SingUpData = async (data) => {
        setMessage("");
        setMessageType("");
        setIsLoading(true);

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}/register-user`,
                data,
                {
                    withCredentials: true,
                }
            );

            // Success Message
            setMessage("User account has been created successfully.");
            setMessageType("success");

            // Reset form after successful registration
            reset();

        } catch (error) {
            let errorMessage = "Unable to create user account. Please try again.";

            if (error?.response) {
                errorMessage =
                    error.response?.data?.message ||
                    "Something went wrong while creating the user.";
            } else if (error?.request) {
                errorMessage =
                    "Unable to connect to the server. Please check your connection.";
            }

            setMessage(errorMessage);
            setMessageType("error");

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-10 flex items-center justify-center relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-indigo-600/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-3xl"></div>

            {/* Main Card */}
            <div className="relative w-full max-w-4xl">

                <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/70 shadow-2xl rounded-3xl overflow-hidden">

                    {/* Header */}
                    <div className="px-8 sm:px-10 py-8 border-b border-slate-700/70 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-transparent">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">

                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM5 20a7 7 0 0114 0"
                                    />
                                </svg>

                            </div>

                            <div>

                                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                    Create New User
                                </h2>

                                <p className="text-slate-400 text-sm mt-1">
                                    Add a new student or teacher to your system
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Form */}
                    <div className="p-8 sm:p-10">

                        {/* ================= MESSAGE ================= */}

                        {message && (
                            <div
                                className={`mb-7 flex items-start gap-3 px-4 py-3 rounded-xl border ${
                                    messageType === "success"
                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                        : "bg-red-500/10 border-red-500/30 text-red-400"
                                }`}
                            >

                                {/* Icon */}
                                {messageType === "success" ? (
                                    <svg
                                        className="w-5 h-5 shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-5 h-5 shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                )}

                                <div className="flex-1">

                                    <p className="text-sm font-medium">
                                        {messageType === "success"
                                            ? "Success"
                                            : "Unable to create account"}
                                    </p>

                                    <p className="text-sm mt-0.5 opacity-90">
                                        {message}
                                    </p>

                                </div>

                                {/* Close Button */}
                                <button
                                    type="button"
                                    onClick={() => setMessage("")}
                                    className="text-current opacity-60 hover:opacity-100 transition"
                                >
                                    ✕
                                </button>

                            </div>
                        )}


                        <form
                            onSubmit={handleSubmit(SingUpData)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
                        >

                            {/* Full Name */}
                            <div className="md:col-span-2">

                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    {...register("fullName", {
                                        required: "Full name is required",
                                    })}
                                    className={`w-full bg-slate-800/70 border ${
                                        errors.fullName
                                            ? "border-red-500"
                                            : "border-slate-700"
                                    } text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20`}
                                />

                                {errors.fullName && (
                                    <p className="text-red-400 text-xs mt-1.5">
                                        {errors.fullName.message}
                                    </p>
                                )}

                            </div>


                            {/* Username */}
                            <div>

                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Username
                                </label>

                                <input
                                    placeholder="Enter username"
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                    className={`w-full bg-slate-800/70 border ${
                                        errors.username
                                            ? "border-red-500"
                                            : "border-slate-700"
                                    } text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20`}
                                />

                                {errors.username && (
                                    <p className="text-red-400 text-xs mt-1.5">
                                        {errors.username.message}
                                    </p>
                                )}

                            </div>


                            {/* Email */}
                            <div>

                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="example@email.com"
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                    className={`w-full bg-slate-800/70 border ${
                                        errors.email
                                            ? "border-red-500"
                                            : "border-slate-700"
                                    } text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20`}
                                />

                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-1.5">
                                        {errors.email.message}
                                    </p>
                                )}

                            </div>


                            {/* Password */}
                            <div>

                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                    })}
                                    className={`w-full bg-slate-800/70 border ${
                                        errors.password
                                            ? "border-red-500"
                                            : "border-slate-700"
                                    } text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20`}
                                />

                                {errors.password && (
                                    <p className="text-red-400 text-xs mt-1.5">
                                        {errors.password.message}
                                    </p>
                                )}

                            </div>


                            {/* Role */}
                            <div>

                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    User Role
                                </label>

                                <select
                                    {...register("role", {
                                        required: "Role is required",
                                    })}
                                    className={`w-full bg-slate-800/70 border ${
                                        errors.role
                                            ? "border-red-500"
                                            : "border-slate-700"
                                    } text-white rounded-xl px-4 py-3.5 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer`}
                                >

                                    <option value="">
                                        Select Role
                                    </option>

                                    <option value="student">
                                        Student
                                    </option>

                                    <option value="teacher">
                                        Teacher
                                    </option>

                                </select>

                                {errors.role && (
                                    <p className="text-red-400 text-xs mt-1.5">
                                        {errors.role.message}
                                    </p>
                                )}

                            </div>


                            {/* ================= STUDENT ================= */}

                            {role === "student" && (
                                <>

                                    <div className="md:col-span-2 mt-4">

                                        <div className="flex items-center gap-3">

                                            <div className="h-px bg-slate-700 flex-1"></div>

                                            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wider">
                                                Student Information
                                            </span>

                                            <div className="h-px bg-slate-700 flex-1"></div>

                                        </div>

                                    </div>


                                    {/* Class */}
                                    <div>

                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Class Name
                                        </label>

                                        <input
                                            placeholder="e.g. BSCS"
                                            {...register("classname", {
                                                required:
                                                    "Class name is required",
                                            })}
                                            className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                        />

                                        {errors.classname && (
                                            <p className="text-red-400 text-xs mt-1.5">
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
                                            placeholder="e.g. A"
                                            {...register("section", {
                                                required:
                                                    "Section is required",
                                            })}
                                            className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                        />

                                        {errors.section && (
                                            <p className="text-red-400 text-xs mt-1.5">
                                                {errors.section.message}
                                            </p>
                                        )}

                                    </div>


                                    {/* Batch */}
                                    <div>

                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Batch Year
                                        </label>

                                        <input
                                            placeholder="e.g. 2026"
                                            {...register("batchYear", {
                                                required:
                                                    "Batch year is required",
                                            })}
                                            className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                        />

                                        {errors.batchYear && (
                                            <p className="text-red-400 text-xs mt-1.5">
                                                {errors.batchYear.message}
                                            </p>
                                        )}

                                    </div>


                                    {/* Semester */}
                                    <div>

                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Semester No
                                        </label>

                                        <input
                                            type="number"
                                            placeholder="e.g. 4"
                                            {...register("semesterNo", {
                                                required:
                                                    "Semester number is required",
                                            })}
                                            className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                        />

                                        {errors.semesterNo && (
                                            <p className="text-red-400 text-xs mt-1.5">
                                                {errors.semesterNo.message}
                                            </p>
                                        )}

                                    </div>


                                    {/* Department */}
                                    <div className="md:col-span-2">

                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Department
                                        </label>

                                        <input
                                            placeholder="e.g. Computer Science"
                                            {...register("department", {
                                                required:
                                                    "Department is required",
                                            })}
                                            className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                        />

                                        {errors.department && (
                                            <p className="text-red-400 text-xs mt-1.5">
                                                {errors.department.message}
                                            </p>
                                        )}

                                    </div>

                                </>
                            )}


                            {/* ================= TEACHER ================= */}

                            {role === "teacher" && (
                                <>

                                    <div className="md:col-span-2 mt-4">

                                        <div className="flex items-center gap-3">

                                            <div className="h-px bg-slate-700 flex-1"></div>

                                            <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
                                                Teacher Information
                                            </span>

                                            <div className="h-px bg-slate-700 flex-1"></div>

                                        </div>

                                    </div>


                                    {/* Teaching Subject */}
                                    <div>

                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Teaching Subject
                                        </label>

                                        <input
                                            placeholder="e.g. JavaScript"
                                            {...register("teachingSubject", {
                                                required:
                                                    "Teaching subject is required",
                                            })}
                                            className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                        />

                                        {errors.teachingSubject && (
                                            <p className="text-red-400 text-xs mt-1.5">
                                                {errors.teachingSubject.message}
                                            </p>
                                        )}

                                    </div>


                                    {/* Department */}
                                    <div>

                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Teacher Department
                                        </label>

                                        <input
                                            placeholder="e.g. Computer Science"
                                            {...register("teacherDepartment", {
                                                required:
                                                    "Department is required",
                                            })}
                                            className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                        />

                                        {errors.teacherDepartment && (
                                            <p className="text-red-400 text-xs mt-1.5">
                                                {errors.teacherDepartment.message}
                                            </p>
                                        )}

                                    </div>


                                    {/* Class */}
                                    <div>

                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Class Assigned
                                        </label>

                                        <input
                                            placeholder="e.g. BSCS"
                                            {...register("classAssigned", {
                                                required:
                                                    "Class is required",
                                            })}
                                            className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                        />

                                        {errors.classAssigned && (
                                            <p className="text-red-400 text-xs mt-1.5">
                                                {errors.classAssigned.message}
                                            </p>
                                        )}

                                    </div>


                                    {/* Section */}
                                    <div>

                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Section Assigned
                                        </label>

                                        <input
                                            placeholder="e.g. A"
                                            {...register("sectionAssigned", {
                                                required:
                                                    "Section is required",
                                            })}
                                            className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                        />

                                        {errors.sectionAssigned && (
                                            <p className="text-red-400 text-xs mt-1.5">
                                                {errors.sectionAssigned.message}
                                            </p>
                                        )}

                                    </div>


                                    {/* Semester */}
                                    <div className="md:col-span-2">

                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Semester No Assigned
                                        </label>

                                        <input
                                            type="number"
                                            placeholder="e.g. 4"
                                            {...register("semsterNoAssigned", {
                                                required:
                                                    "Semester number is required",
                                            })}
                                            className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                        />

                                        {errors.semsterNoAssigned && (
                                            <p className="text-red-400 text-xs mt-1.5">
                                                {errors.semsterNoAssigned.message}
                                            </p>
                                        )}

                                    </div>

                                </>
                            )}


                            {/* Submit */}
                            <div className="md:col-span-2 pt-5">

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-3.5 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 ${
                                        isLoading
                                            ? "bg-slate-700 cursor-not-allowed"
                                            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5"
                                    }`}
                                >

                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">

                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>

                                            Creating Account...

                                        </span>
                                    ) : (
                                        "Create User"
                                    )}

                                </button>

                                <p className="text-center text-slate-500 text-xs mt-4">
                                    Make sure all information is correct before
                                    creating the account.
                                </p>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;