import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router";
import { useForm } from "react-hook-form";

function DeleteStudent() {
    const location = useLocation();
    const { handleSubmit, register } = useForm();

    const dldStudent = location?.state?.studentdelete;
    const { userId, studentId } = useParams();

    const [show, setShow] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // ================= STATES =================

    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

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

    // ================= DELETE STUDENT =================

    const DeleteStudent = async (data) => {
        try {
            setDeleteLoading(true);

            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}/${studentId}/delete-student`,
                {
                    data,
                    withCredentials: true,
                }
            );

            setShowDeleteConfirm(false);

            showNotification(
                "success",
                response.data?.message || "Student deleted successfully."
            );

        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Unable to delete student. Please try again.";

            showNotification("error", errorMessage);

        } finally {
            setDeleteLoading(false);
        }
    };

    // ================= UPDATE STUDENT =================

    const UpdateStudent = async (data) => {
        try {
            setLoading(true);

            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}/${studentId}/update-account`,
                data,
                {
                    withCredentials: true,
                }
            );

            showNotification(
                "success",
                response.data?.message || "Student account updated successfully."
            );

        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Unable to update student account. Please try again.";

            showNotification("error", errorMessage);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-6 lg:px-10 relative overflow-hidden">

            {/* ================= BACKGROUND ================= */}

            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

            <div className="absolute bottom-[-150px] left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />


            {/* ================= NOTIFICATION ================= */}

            {notification.message && (
                <div className="fixed top-6 right-6 z-[200] w-[calc(100%-3rem)] max-w-md">

                    <div
                        className={`relative overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl p-4 ${
                            notification.type === "success"
                                ? "bg-emerald-950/90 border-emerald-500/30"
                                : "bg-red-950/90 border-red-500/30"
                        }`}
                    >

                        <div className="flex items-start gap-3">

                            {/* Icon */}

                            <div
                                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                                    notification.type === "success"
                                        ? "bg-emerald-500/15 text-emerald-400"
                                        : "bg-red-500/15 text-red-400"
                                }`}
                            >
                                {notification.type === "success"
                                    ? "✓"
                                    : "⚠"}
                            </div>


                            {/* Message */}

                            <div className="flex-1">

                                <p
                                    className={`font-bold ${
                                        notification.type === "success"
                                            ? "text-emerald-300"
                                            : "text-red-300"
                                    }`}
                                >
                                    {notification.type === "success"
                                        ? "Success"
                                        : "Action Failed"}
                                </p>

                                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
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
                                className="text-slate-500 hover:text-white transition text-lg"
                            >
                                ✕
                            </button>

                        </div>


                        {/* Progress */}

                        <div
                            className={`absolute bottom-0 left-0 h-0.5 w-full ${
                                notification.type === "success"
                                    ? "bg-emerald-500"
                                    : "bg-red-500"
                            }`}
                        />

                    </div>

                </div>
            )}


            {/* ================= MAIN ================= */}

            <div className="relative max-w-4xl mx-auto">

                {/* ================= HEADER ================= */}

                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-indigo-950/40">

                    <div className="absolute -right-16 -top-20 w-64 h-64 bg-white/10 rounded-full" />

                    <div className="absolute right-32 -bottom-24 w-48 h-48 bg-white/10 rounded-full" />

                    <div className="relative flex items-center gap-5">

                        <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl shadow-lg">
                            👨‍🎓
                        </div>

                        <div>

                            <p className="text-indigo-100 text-sm font-medium tracking-wider">
                                ADMINISTRATION
                            </p>

                            <h1 className="text-2xl sm:text-3xl font-bold">
                                Student Management
                            </h1>

                            <p className="text-indigo-100 text-sm mt-1">
                                View, update or remove student account
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= STUDENT CARD ================= */}

                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

                    {/* Card Header */}

                    <div className="p-6 sm:p-8 border-b border-slate-800">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                            <div className="flex items-center gap-4">

                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-lg">
                                    {dldStudent?.fullName
                                        ?.charAt(0)
                                        ?.toUpperCase() || "S"}
                                </div>

                                <div>

                                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                                        Student
                                    </p>

                                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                                        {dldStudent?.fullName || "N/A"}
                                    </h2>

                                    <span className="inline-flex mt-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                                        ● Active Student
                                    </span>

                                </div>

                            </div>

                            <div className="text-left sm:text-right">

                                <p className="text-xs text-slate-500">
                                    Student ID
                                </p>

                                <p className="text-sm text-slate-300 font-mono mt-1">
                                    {studentId}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ================= STUDENT INFORMATION ================= */}

                    <div className="p-6 sm:p-8">

                        <h3 className="text-lg font-semibold text-white mb-5">
                            📋 Student Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 hover:border-indigo-500/40 transition">

                                <p className="text-xs text-slate-500 uppercase tracking-wide">
                                    Department
                                </p>

                                <p className="text-slate-200 font-semibold mt-1">
                                    {dldStudent?.studentProfile?.[0]?.department || "N/A"}
                                </p>

                            </div>


                            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 hover:border-purple-500/40 transition">

                                <p className="text-xs text-slate-500 uppercase tracking-wide">
                                    Class
                                </p>

                                <p className="text-slate-200 font-semibold mt-1">
                                    {dldStudent?.studentProfile?.[0]?.classname || "N/A"}
                                </p>

                            </div>


                            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 hover:border-blue-500/40 transition">

                                <p className="text-xs text-slate-500 uppercase tracking-wide">
                                    Section
                                </p>

                                <p className="text-slate-200 font-semibold mt-1">
                                    {dldStudent?.studentProfile?.[0]?.section || "N/A"}
                                </p>

                            </div>


                            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 hover:border-cyan-500/40 transition">

                                <p className="text-xs text-slate-500 uppercase tracking-wide">
                                    Semester
                                </p>

                                <p className="text-slate-200 font-semibold mt-1">
                                    Semester{" "}
                                    {dldStudent?.studentProfile?.[0]?.semesterNo || "N/A"}
                                </p>

                            </div>

                        </div>


                        {/* ================= ACTIONS ================= */}

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Delete */}

                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(true)}
                                disabled={deleteLoading}
                                className="group flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:border-red-500 text-red-400 hover:text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                🗑️
                                <span>Delete Student</span>
                            </button>


                            {/* Update */}

                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                disabled={loading}
                                className="group flex items-center justify-center gap-3 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-600 hover:border-indigo-600 text-indigo-400 hover:text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ✏️

                                <span>
                                    {show ? "Cancel Update" : "Update Student"}
                                </span>

                            </button>

                        </div>


                        {/* ================= UPDATE FORM ================= */}

                        {show && (

                            <div className="mt-8 pt-8 border-t border-slate-800">

                                <div className="mb-6">

                                    <h3 className="text-xl font-bold text-white">
                                        ✏️ Update Student
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Update the student's account information.
                                    </p>

                                </div>


                                <form
                                    onSubmit={handleSubmit(UpdateStudent)}
                                    className="space-y-5"
                                >

                                    {/* Username */}

                                    <div>

                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Username
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Enter username"
                                            {...register("username", {
                                                required: "Username is required",
                                            })}
                                            className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                                        />

                                    </div>


                                    {/* Full Name */}

                                    <div>

                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Enter full name"
                                            {...register("fullName", {
                                                required: "Full name is required",
                                            })}
                                            className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                                        />

                                    </div>


                                    {/* Save */}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-950/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading
                                            ? "⏳ Updating..."
                                            : "💾 Save Changes"}
                                    </button>

                                </form>

                            </div>

                        )}

                    </div>

                </div>

            </div>


            {/* ================= DELETE CONFIRM MODAL ================= */}

            {showDeleteConfirm && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

                    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-7">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl">
                            ⚠️
                        </div>

                        <h2 className="text-xl font-bold text-white text-center mt-5">
                            Delete Student?
                        </h2>

                        <p className="text-slate-400 text-center text-sm mt-2">
                            Are you sure you want to delete{" "}
                            <span className="text-white font-semibold">
                                {dldStudent?.fullName}
                            </span>
                            ? This action cannot be undone.
                        </p>


                        <form
                            onSubmit={handleSubmit(DeleteStudent)}
                            className="mt-7 grid grid-cols-2 gap-3"
                        >

                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={deleteLoading}
                                className="py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition disabled:opacity-50"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={deleteLoading}
                                className="py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition disabled:bg-red-900 disabled:cursor-not-allowed"
                            >
                                {deleteLoading
                                    ? "Deleting..."
                                    : "Yes, Delete"}
                            </button>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default DeleteStudent;