import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";

function ResultMarks() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const { userId } = useParams();

    const [studentData, setStudentData] = useState([]);

    // Loading states
    const [isSearching, setIsSearching] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Success state
    const [successMessage, setSuccessMessage] = useState("");

    // Error states
    const [searchError, setSearchError] = useState("");
    const [submitError, setSubmitError] = useState("");

    // ================= ERROR HANDLER =================

    const getErrorMessage = (error, fallbackMessage) => {
        if (!axios.isAxiosError(error)) {
            return fallbackMessage;
        }

        const status = error.response?.status;
        const serverMessage = error.response?.data?.message;

        if (serverMessage) {
            return serverMessage;
        }

        if (error.request && !error.response) {
            return "Unable to connect to the server. Please check your connection.";
        }

        switch (status) {
            case 400:
                return "Invalid information. Please check your input.";

            case 401:
                return "Your session has expired. Please login again.";

            case 403:
                return "You are not authorized to perform this action.";

            case 404:
                return "The requested data could not be found.";

            case 409:
                return "Result marks for this student already exist.";

            case 422:
                return "Some information is invalid. Please check your entries.";

            case 429:
                return "Too many requests. Please wait and try again.";

            case 500:
                return "Something went wrong on the server. Please try again later.";

            default:
                return fallbackMessage;
        }
    };

    // ================= SEARCH STUDENTS =================

    const ResultData = async (data) => {
        setIsSearching(true);
        setSearchError("");
        setSubmitError("");
        setSuccessMessage("");
        setStudentData([]);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/result/${userId}/result-remarks`,
                data,
                {
                    withCredentials: true,
                }
            );

            const students = response.data?.data;

            if (!Array.isArray(students)) {
                throw new Error("Invalid student data received.");
            }

            setStudentData(students);

            if (students.length === 0) {
                setSearchError(
                    "No students found for the selected class information."
                );
            }
        } catch (error) {
            console.error("ERROR IN FETCHING STUDENTS:", error);

            setSearchError(
                getErrorMessage(
                    error,
                    "Unable to find students. Please try again."
                )
            );
        } finally {
            setIsSearching(false);
        }
    };

    // ================= ENTER RESULT MARKS =================

    const EnterResultData = async (data) => {
        setIsSubmitting(true);
        setSubmitError("");
        setSuccessMessage("");

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/result/${userId}/Enterd-result`,
                data,
                {
                    withCredentials: true,
                }
            );

            console.log("Result Response:", response.data);

            setSuccessMessage(
                "Student results have been saved successfully."
            );

            reset();
        } catch (error) {
            console.error("ERROR IN ENTERING RESULT MARKS:", error);

            setSubmitError(
                getErrorMessage(
                    error,
                    "Unable to save student results. Please try again."
                )
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // ================= AUTO HIDE SUCCESS =================

    useEffect(() => {
        if (!successMessage) return;

        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage]);

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden px-4 py-8 sm:px-6 lg:px-10">

            {/* Background */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-[-150px] left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto space-y-8">

                {/* ================= HEADER ================= */}

                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-indigo-900/30">

                    <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-white/10" />

                    <div className="absolute right-32 -bottom-20 w-44 h-44 rounded-full bg-white/10" />

                    <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                        <div className="flex items-center gap-4">

                            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-lg">
                                📊
                            </div>

                            <div>
                                <p className="text-indigo-100 text-sm font-medium tracking-wider">
                                    TEACHER PORTAL
                                </p>

                                <h1 className="text-2xl sm:text-3xl font-bold">
                                    Student Results
                                </h1>

                                <p className="text-indigo-100 mt-1 text-sm sm:text-base">
                                    Search students and manage their academic marks.
                                </p>
                            </div>

                        </div>

                        <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl">
                            <span className="w-2 h-2 bg-green-400 rounded-full" />

                            <span className="text-sm text-indigo-100">
                                Results Management
                            </span>
                        </div>

                    </div>
                </div>

                {/* ================= SUCCESS MESSAGE ================= */}

                {successMessage && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">

                        <span className="text-lg">
                            ✅
                        </span>

                        <div>
                            <p className="text-emerald-400 text-sm font-medium">
                                Results Saved
                            </p>

                            <p className="text-emerald-400/80 text-xs mt-1">
                                {successMessage}
                            </p>
                        </div>

                    </div>
                )}

                {/* ================= SEARCH SECTION ================= */}

                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">

                    <div className="px-6 sm:px-8 py-6 border-b border-slate-800">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
                                🔎
                            </div>

                            <div>
                                <h2 className="text-xl font-bold">
                                    Find Students
                                </h2>

                                <p className="text-slate-400 text-sm">
                                    Enter class information to find students.
                                </p>
                            </div>

                        </div>

                    </div>

                    <form
                        onSubmit={handleSubmit(ResultData)}
                        className="p-6 sm:p-8"
                    >

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

                            {[
                                {
                                    name: "subjectName",
                                    placeholder: "Subject Name",
                                    icon: "📚",
                                },
                                {
                                    name: "classname",
                                    placeholder: "Class Name",
                                    icon: "🎓",
                                },
                                {
                                    name: "section",
                                    placeholder: "Section",
                                    icon: "🏷️",
                                },
                                {
                                    name: "department",
                                    placeholder: "Department",
                                    icon: "🏛️",
                                },
                                {
                                    name: "semesterNo",
                                    placeholder: "Semester No",
                                    icon: "🔢",
                                },
                            ].map((field) => (
                                <div key={field.name}>

                                    <div className="relative">

                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                            {field.icon}
                                        </span>

                                        <input
                                            type="text"
                                            disabled={isSearching || isSubmitting}
                                            placeholder={field.placeholder}
                                            {...register(field.name, {
                                                required: `${field.placeholder} is required`,
                                            })}
                                            className="w-full pl-10 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        />

                                    </div>

                                    {errors[field.name] && (
                                        <p className="text-red-400 text-xs mt-1.5">
                                            {errors[field.name].message}
                                        </p>
                                    )}

                                </div>
                            ))}

                        </div>

                        {/* Search Error */}

                        {searchError && (
                            <div className="flex items-start gap-3 p-4 mt-6 rounded-xl bg-red-500/10 border border-red-500/20">

                                <span className="text-lg">
                                    ⚠️
                                </span>

                                <div>
                                    <p className="text-red-400 text-sm font-medium">
                                        Unable to Find Students
                                    </p>

                                    <p className="text-red-400/80 text-xs mt-1">
                                        {searchError}
                                    </p>
                                </div>

                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSearching || isSubmitting}
                            className="mt-6 w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold shadow-lg shadow-indigo-900/20 transition-all duration-300"
                        >
                            {isSearching ? (
                                <span className="flex items-center justify-center gap-3">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Searching...
                                </span>
                            ) : (
                                "🔍 Search Students"
                            )}
                        </button>

                    </form>

                </div>

                {/* ================= STUDENT RESULTS ================= */}

                {studentData.length > 0 && (

                    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">

                        {/* Header */}

                        <div className="px-6 sm:px-8 py-6 border-b border-slate-800">

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                                        📝
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold">
                                            Enter Student Marks
                                        </h2>

                                        <p className="text-slate-400 text-sm">
                                            Add midterm, assignment and final marks.
                                        </p>
                                    </div>

                                </div>

                                <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl">

                                    <span className="text-indigo-400 font-bold">
                                        {studentData.length}
                                    </span>

                                    <span className="text-slate-400 text-sm ml-1">
                                        Students
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Result Form */}

                        <form onSubmit={handleSubmit(EnterResultData)}>

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[850px]">

                                    <thead>

                                        <tr className="bg-slate-800/70 border-b border-slate-700">

                                            <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                                Student
                                            </th>

                                            <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                                Midterm
                                            </th>

                                            <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                                Assignment
                                            </th>

                                            <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                                Final Term
                                            </th>

                                            <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {studentData.map((student, idx) => (

                                            <tr
                                                key={student._id}
                                                className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                                            >

                                                {/* Student */}

                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg">
                                                            {student.fullName
                                                                ?.charAt(0)
                                                                ?.toUpperCase()}
                                                        </div>

                                                        <div>

                                                            <p className="font-semibold text-white">
                                                                {student.fullName}
                                                            </p>

                                                            <p className="text-xs text-slate-500">
                                                                Student
                                                            </p>

                                                        </div>

                                                    </div>

                                                    <input
                                                        type="hidden"
                                                        {...register(`results.${idx}.student`)}
                                                        value={student._id}
                                                    />

                                                </td>

                                                {/* Midterm */}

                                                <td className="px-6 py-5 text-center">

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        disabled={isSubmitting}
                                                        {...register(
                                                            `results.${idx}.midMarks`,
                                                            {
                                                                required: "Midterm marks are required",
                                                            }
                                                        )}
                                                        placeholder="0"
                                                        className="w-24 px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-center outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition disabled:opacity-50"
                                                    />

                                                    {errors.results?.[idx]?.midMarks && (
                                                        <p className="text-red-400 text-xs mt-1">
                                                            Required
                                                        </p>
                                                    )}

                                                </td>

                                                {/* Assignment */}

                                                <td className="px-6 py-5 text-center">

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        disabled={isSubmitting}
                                                        {...register(
                                                            `results.${idx}.assignmentMarks`,
                                                            {
                                                                required: "Assignment marks are required",
                                                            }
                                                        )}
                                                        placeholder="0"
                                                        className="w-24 px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-center outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition disabled:opacity-50"
                                                    />

                                                    {errors.results?.[idx]?.assignmentMarks && (
                                                        <p className="text-red-400 text-xs mt-1">
                                                            Required
                                                        </p>
                                                    )}

                                                </td>

                                                {/* Final */}

                                                <td className="px-6 py-5 text-center">

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        disabled={isSubmitting}
                                                        {...register(
                                                            `results.${idx}.finalMarks`,
                                                            {
                                                                required: "Final marks are required",
                                                            }
                                                        )}
                                                        placeholder="0"
                                                        className="w-24 px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-center outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition disabled:opacity-50"
                                                    />

                                                    {errors.results?.[idx]?.finalMarks && (
                                                        <p className="text-red-400 text-xs mt-1">
                                                            Required
                                                        </p>
                                                    )}

                                                </td>

                                                {/* Edit */}

                                                <td className="px-6 py-5 text-center">

                                                    <Link
                                                        to={`/${userId}/${student._id}/update-attendance`}
                                                        state={{ student }}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/20 hover:text-blue-300 transition"
                                                    >
                                                        ✏️ Edit
                                                    </Link>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                            {/* Submit Error */}

                            {submitError && (
                                <div className="mx-6 sm:mx-8 mt-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">

                                    <span className="text-lg">
                                        ⚠️
                                    </span>

                                    <div>
                                        <p className="text-red-400 text-sm font-medium">
                                            Unable to Save Results
                                        </p>

                                        <p className="text-red-400/80 text-xs mt-1">
                                            {submitError}
                                        </p>
                                    </div>

                                </div>
                            )}

                            {/* Footer */}

                            <div className="px-6 sm:px-8 py-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">

                                <p className="text-sm text-slate-500">
                                    Make sure all marks are entered before saving.
                                </p>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-green-900/20 transition-all duration-300"
                                >

                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-3">

                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                                            Saving Results...

                                        </span>
                                    ) : (
                                        "✅ Save Results"
                                    )}

                                </button>

                            </div>

                        </form>

                    </div>
                )}

                {/* ================= EMPTY STATE ================= */}

                {studentData.length === 0 && !searchError && (

                    <div className="bg-slate-900/60 border border-slate-800 border-dashed rounded-3xl py-14 px-6 text-center">

                        <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-4xl mb-5">
                            📊
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                            No Students Selected
                        </h3>

                        <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
                            Use the search form above to find students and enter
                            their academic results.
                        </p>

                    </div>
                )}

            </div>
        </div>
    );
}

export default ResultMarks;