import React, { useEffect, useState } from "react";
import axios from "axios";

function GetStudentEnrolled() {
    const [enrolledData, setEnrolledData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const getEnrolledData = async () => {
        setLoading(true);
        setErrorMsg("");

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/enrollement/get-enrolled-data`,
                {
                    withCredentials: true,
                }
            );

            const enrollmentData = response?.data?.message;

            if (!Array.isArray(enrollmentData)) {
                throw new Error("Invalid enrollment data received");
            }

            setEnrolledData(enrollmentData);
        } catch (error) {
            let message =
                "Unable to load enrollment information. Please try again.";

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    message =
                        error.response?.data?.message ||
                        "Unable to load enrollment information.";
                } else if (error.request) {
                    message =
                        "Unable to connect to the server. Please check your internet connection.";
                } else {
                    message = "Something went wrong. Please try again.";
                }
            }

            setErrorMsg(message);
            setEnrolledData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEnrolledData();
    }, []);

    // =====================================================
    // LOADING STATE
    // =====================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

                {/* Background */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

                <div className="relative text-center">

                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl animate-pulse">
                        🎓
                    </div>

                    <h2 className="text-white text-lg font-semibold">
                        Loading Enrollment
                    </h2>

                    <p className="text-slate-500 text-sm mt-2">
                        Fetching your enrollment information...
                    </p>

                </div>
            </div>
        );
    }

    // =====================================================
    // ERROR STATE
    // =====================================================

    if (errorMsg) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

                {/* Background */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />

                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

                <div className="relative w-full max-w-md">

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">

                        {/* Error Icon */}
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl mb-5">
                            ⚠️
                        </div>

                        <h2 className="text-xl font-bold text-white">
                            Unable to Load Enrollment
                        </h2>

                        <p className="text-slate-400 text-sm mt-3 leading-6">
                            {errorMsg}
                        </p>

                        {/* Retry */}
                        <button
                            type="button"
                            onClick={getEnrolledData}
                            className="mt-6 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-950/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                            🔄 Try Again
                        </button>

                    </div>

                </div>
            </div>
        );
    }

    // =====================================================
    // EMPTY STATE
    // =====================================================

    if (enrolledData.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

                {/* Background */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

                <div className="relative w-full max-w-md">

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl mb-5">
                            📚
                        </div>

                        <h2 className="text-xl font-bold text-white">
                            No Enrollment Data
                        </h2>

                        <p className="text-slate-500 text-sm mt-3 leading-6">
                            You currently don't have any enrolled courses or
                            enrollment information available.
                        </p>

                    </div>

                </div>
            </div>
        );
    }

    // =====================================================
    // SUCCESS STATE
    // =====================================================

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden px-4 py-8 sm:px-6 lg:px-10">

            {/* ================= BACKGROUND ================= */}

            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

            <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

            <div className="absolute bottom-[-150px] left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />


            <div className="relative max-w-7xl mx-auto">

                {/* ================= HEADER ================= */}

                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-indigo-950/40">

                    {/* Decorative circles */}

                    <div className="absolute -right-16 -top-20 w-64 h-64 bg-white/10 rounded-full" />

                    <div className="absolute right-28 -bottom-24 w-48 h-48 bg-white/10 rounded-full" />


                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        {/* Header Content */}

                        <div className="flex items-center gap-4">

                            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl shadow-lg">
                                🎓
                            </div>


                            <div>

                                <p className="text-indigo-100 text-xs sm:text-sm font-semibold tracking-[0.2em]">
                                    ACADEMIC PORTAL
                                </p>

                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1">
                                    Enrollment Details
                                </h1>

                                <p className="text-indigo-100 mt-2 text-sm sm:text-base">
                                    View your enrolled classes and subjects
                                </p>

                            </div>

                        </div>


                        {/* Enrollment Counter */}

                        <div className="w-full md:w-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-7 py-4 text-center">

                            <p className="text-indigo-100 text-xs uppercase tracking-widest">
                                Total Enrollments
                            </p>

                            <p className="text-3xl font-bold mt-1">
                                {enrolledData.length}
                            </p>

                        </div>

                    </div>
                </div>


                {/* ================= SECTION TITLE ================= */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                    <div>

                        <h2 className="text-xl sm:text-2xl font-bold">
                            📚 My Enrolled Courses
                        </h2>

                        <p className="text-slate-400 text-sm mt-1">
                            Your current academic enrollment information
                        </p>

                    </div>


                    <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-400 w-fit">
                        Academic Overview
                    </div>

                </div>


                {/* ================= ENROLLMENT CARDS ================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {enrolledData.map((data, index) => (

                        <div
                            key={data?._id || index}
                            className="group relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-indigo-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-950/30 transition-all duration-300"
                        >

                            {/* Card Glow */}

                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />


                            <div className="relative">

                                {/* Card Header */}

                                <div className="flex items-center justify-between mb-6">

                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-900/30">
                                        📖
                                    </div>

                                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                                        ✓ ENROLLED
                                    </span>

                                </div>


                                {/* ================= INFO ================= */}

                                <div className="space-y-4">

                                    {/* Department */}

                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center">
                                            🏛️
                                        </div>

                                        <div className="min-w-0">

                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider">
                                                Department
                                            </p>

                                            <p className="text-slate-200 font-semibold truncate">
                                                {data?.department || "N/A"}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Class */}

                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">
                                            🏫
                                        </div>

                                        <div className="min-w-0">

                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider">
                                                Class
                                            </p>

                                            <p className="text-slate-200 font-semibold truncate">
                                                {data?.className || "N/A"}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Semester */}

                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">
                                            🎯
                                        </div>

                                        <div>

                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider">
                                                Semester
                                            </p>

                                            <p className="text-slate-200 font-semibold">
                                                {data?.semesterNo ?? "N/A"}
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Divider */}

                                <div className="border-t border-slate-800 my-6" />


                                {/* ================= SUBJECTS ================= */}

                                <div>

                                    <div className="flex items-center justify-between mb-3">

                                        <h3 className="text-sm font-semibold text-slate-300">
                                            📚 Enrolled Subjects
                                        </h3>

                                        <span className="text-xs text-slate-500">
                                            {Array.isArray(data?.subjects)
                                                ? `${data.subjects.length} Subjects`
                                                : data?.subjects
                                                    ? "1 Subject"
                                                    : "0 Subjects"}
                                        </span>

                                    </div>


                                    {Array.isArray(data?.subjects) &&
                                    data.subjects.length > 0 ? (

                                        <div className="flex flex-wrap gap-2">

                                            {data.subjects.map((sub, i) => (

                                                <span
                                                    key={i}
                                                    className="px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium hover:bg-indigo-500/20 hover:border-indigo-400/40 transition"
                                                >
                                                    {sub}
                                                </span>

                                            ))}

                                        </div>

                                    ) : data?.subjects ? (

                                        <span className="inline-block px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
                                            {data.subjects}
                                        </span>

                                    ) : (

                                        <p className="text-slate-500 text-sm">
                                            No subjects enrolled
                                        </p>

                                    )}

                                </div>


                                {/* ================= FOOTER ================= */}

                                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">

                                    <span className="text-xs text-slate-500">
                                        Enrollment #{index + 1}
                                    </span>

                                    <span className="text-indigo-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                                        Active →
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default GetStudentEnrolled;