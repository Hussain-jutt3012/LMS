import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";

function BlockStudent() {
    const { userId, studentid } = useParams();
    const location = useLocation();
    const { handleSubmit } = useForm();

    const studentdata = location?.state?.student;

    const [isBlocked, setIsBlocked] = useState(
        studentdata?.isBlock ?? false
    );

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        type: "",
        message: "",
    });

    // ================= NOTIFICATION =================
    const showNotification = (type, message) => {
        setNotification({
            type,
            message,
        });
    };

    // ================= AUTO HIDE NOTIFICATION =================
    useEffect(() => {
        if (!notification.message) return;

        const timer = setTimeout(() => {
            setNotification({
                type: "",
                message: "",
            });
        }, 4000);

        return () => clearTimeout(timer);
    }, [notification]);

    // ================= BLOCK / UNBLOCK =================
    const EditStudent = async () => {
        try {
            setLoading(true);

            setNotification({
                type: "",
                message: "",
            });

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/${userId}/${studentid}/portal-block`,
                {},
                {
                    withCredentials: true,
                }
            );

            const updatedBlockStatus =
                response.data?.data?.isBlock;

            setIsBlocked(updatedBlockStatus);

            // Success notification
            if (updatedBlockStatus) {
                showNotification(
                    "success",
                    "Student portal has been blocked successfully."
                );
            } else {
                showNotification(
                    "success",
                    "Student portal has been unblocked successfully."
                );
            }

        } catch (error) {

            // ================= ERROR HANDLING =================

            const backendMessage =
                error?.response?.data?.message;

            const statusCode =
                error?.response?.status;

            let errorMessage =
                "Something went wrong while updating student status.";

            if (backendMessage) {
                errorMessage = backendMessage;
            } else if (statusCode === 401) {
                errorMessage =
                    "You are not authorized to perform this action.";
            } else if (statusCode === 403) {
                errorMessage =
                    "You do not have permission to update this student.";
            } else if (statusCode === 404) {
                errorMessage =
                    "Student was not found.";
            } else if (!error?.response) {
                errorMessage =
                    "Unable to connect with the server. Please try again.";
            }

            showNotification("error", errorMessage);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-6 lg:px-10 relative overflow-hidden">

            {/* ================= BACKGROUND ================= */}

            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

            <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-[-150px] left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>


            <div className="relative max-w-4xl mx-auto">

                {/* ================= NOTIFICATION ================= */}

                {notification.message && (
                    <div
                        className={`mb-6 rounded-2xl border p-4 shadow-2xl backdrop-blur-md transition-all duration-300 ${
                            notification.type === "success"
                                ? "bg-emerald-500/10 border-emerald-500/30"
                                : "bg-red-500/10 border-red-500/30"
                        }`}
                    >

                        <div className="flex items-start gap-4">

                            {/* Icon */}

                            <div
                                className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-xl ${
                                    notification.type === "success"
                                        ? "bg-emerald-500/20 text-emerald-400"
                                        : "bg-red-500/20 text-red-400"
                                }`}
                            >
                                {notification.type === "success"
                                    ? "✓"
                                    : "!"
                                }
                            </div>


                            {/* Message */}

                            <div className="flex-1">

                                <p
                                    className={`font-bold ${
                                        notification.type === "success"
                                            ? "text-emerald-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {notification.type === "success"
                                        ? "Success"
                                        : "Action Failed"
                                    }
                                </p>

                                <p className="text-sm text-slate-300 mt-1">
                                    {notification.message}
                                </p>

                            </div>


                            {/* Close */}

                            <button
                                type="button"
                                onClick={() =>
                                    setNotification({
                                        type: "",
                                        message: "",
                                    })
                                }
                                className="text-slate-500 hover:text-white text-xl transition"
                            >
                                ×
                            </button>

                        </div>

                    </div>
                )}


                {/* ================= HEADER ================= */}

                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-indigo-950/40">

                    <div className="absolute -right-12 -top-16 w-64 h-64 bg-white/10 rounded-full"></div>

                    <div className="absolute right-32 -bottom-20 w-44 h-44 bg-white/10 rounded-full"></div>


                    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                        {/* Title */}

                        <div className="flex items-center gap-4">

                            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-lg">
                                👨‍🎓
                            </div>

                            <div>

                                <p className="text-indigo-100 text-sm font-medium tracking-wider">
                                    STUDENT MANAGEMENT
                                </p>

                                <h1 className="text-2xl sm:text-3xl font-bold">
                                    Student Portal Access
                                </h1>

                                <p className="text-indigo-100 text-sm mt-1">
                                    Manage student's portal access status
                                </p>

                            </div>

                        </div>


                        {/* Status */}

                        <div
                            className={`px-5 py-3 rounded-2xl border text-center ${
                                isBlocked
                                    ? "bg-red-500/10 border-red-400/30"
                                    : "bg-emerald-500/10 border-emerald-400/30"
                            }`}
                        >

                            <p className="text-xs text-white/60 uppercase tracking-wider">
                                Portal Status
                            </p>

                            <p
                                className={`font-bold mt-1 ${
                                    isBlocked
                                        ? "text-red-300"
                                        : "text-emerald-300"
                                }`}
                            >
                                {isBlocked
                                    ? "BLOCKED"
                                    : "ACTIVE"
                                }
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= STUDENT CARD ================= */}

                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

                    {/* Card Header */}

                    <div className="p-6 sm:p-8 border-b border-slate-800">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
                                🎓
                            </div>

                            <div>

                                <p className="text-slate-500 text-xs uppercase tracking-wider">
                                    Student
                                </p>

                                <h2 className="text-xl sm:text-2xl font-bold text-white">
                                    {studentdata?.fullName ||
                                        "Unknown Student"}
                                </h2>

                            </div>

                        </div>

                    </div>


                    {/* ================= STUDENT INFORMATION ================= */}

                    <div className="p-6 sm:p-8">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Department */}

                            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">

                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                    Department
                                </p>

                                <p className="text-white font-semibold">
                                    {studentdata?.studentProfile?.[0]
                                        ?.department || "N/A"}
                                </p>

                            </div>


                            {/* Class */}

                            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">

                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                    Class
                                </p>

                                <p className="text-white font-semibold">
                                    {studentdata?.studentProfile?.[0]
                                        ?.classname || "N/A"}
                                </p>

                            </div>


                            {/* Section */}

                            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">

                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                    Section
                                </p>

                                <p className="text-white font-semibold">
                                    {studentdata?.studentProfile?.[0]
                                        ?.section || "N/A"}
                                </p>

                            </div>


                            {/* Semester */}

                            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">

                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                    Semester
                                </p>

                                <p className="text-white font-semibold">
                                    {studentdata?.studentProfile?.[0]
                                        ?.semesterNo || "N/A"}
                                </p>

                            </div>

                        </div>


                        {/* ================= ACCESS STATUS ================= */}

                        <div className="mt-8 p-5 rounded-2xl bg-slate-800/40 border border-slate-700">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                                <div>

                                    <h3 className="font-bold text-white">
                                        Portal Access
                                    </h3>

                                    <p className="text-sm text-slate-400 mt-1">
                                        {isBlocked
                                            ? "This student cannot access the portal."
                                            : "This student currently has access to the portal."
                                        }
                                    </p>

                                </div>


                                <div
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                                        isBlocked
                                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    }`}
                                >

                                    <span
                                        className={`w-2.5 h-2.5 rounded-full ${
                                            isBlocked
                                                ? "bg-red-400"
                                                : "bg-emerald-400"
                                        }`}
                                    ></span>

                                    {isBlocked
                                        ? "Blocked"
                                        : "Active"
                                    }

                                </div>

                            </div>

                        </div>


                        {/* ================= ACTION BUTTON ================= */}

                        <form
                            onSubmit={handleSubmit(EditStudent)}
                            className="mt-6"
                        >

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3.5 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 ${
                                    loading
                                        ? "bg-slate-700 cursor-not-allowed"
                                        : isBlocked
                                        ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 hover:-translate-y-0.5 shadow-emerald-900/30"
                                        : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 hover:-translate-y-0.5 shadow-red-900/30"
                                }`}
                            >

                                {loading
                                    ? "⏳ Updating Student..."
                                    : isBlocked
                                    ? "🔓 Unblock Student"
                                    : "🔒 Block Student"
                                }

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BlockStudent;