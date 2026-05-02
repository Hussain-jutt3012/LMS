import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Logout } from "../../store/authSlice";

function Header() {
    const roleControl = useSelector((state) => state.auth.user?.role);
    const authstatus = useSelector((state) => state.auth.status);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const portalInfo = {
        admin: {
            title: "Admin Portal",
            subtitle: "Administration",
            icon: "🛡️",
        },

        student: {
            title: "Student Portal",
            subtitle: "Academic Portal",
            icon: "🎓",
        },

        teacher: {
            title: "Teacher Portal",
            subtitle: "Faculty Portal",
            icon: "👨‍🏫",
        },
    };

    const currentPortal = portalInfo[roleControl] || {
        title: "University Portal",
        subtitle: "Student Management System",
        icon: "🏫",
    };


    // ==============================
    // SHOW MESSAGE
    // ==============================

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);

        setTimeout(() => {
            setMessage("");
            setMessageType("");
        }, 3500);
    };


    // ==============================
    // LOGOUT FUNCTION
    // ==============================

    const handleLogout = async () => {

        if (loading) return;

        try {

            setLoading(true);

            setMessage("");
            setMessageType("");


            // Backend Logout API

            await axios.post(
                "http://localhost:4000/api/v1/users/logout",
                {},
                {
                    withCredentials: true,
                }
            );


            // Clear Redux State

            dispatch(Logout());


            // Success Message

            showMessage(
                "You have been logged out successfully.",
                "success"
            );


            // Redirect after small delay

            setTimeout(() => {
                navigate("/login");
            }, 1000);


        } catch (error) {

           
            const errorMessage =
                error?.response?.data?.message ||
                "Logout failed. Please try again.";

            dispatch(Logout());


            showMessage(
                errorMessage,
                "error"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);


        } finally {

            setLoading(false);

        }
    };


    return (
        <>
            {/* ================================================= */}
            {/* NOTIFICATION */}
            {/* ================================================= */}

            {message && (
                <div className="fixed top-5 right-5 z-[100]">

                    <div
                        className={`
                            min-w-[320px]
                            max-w-md
                            rounded-2xl
                            border
                            px-5
                            py-4
                            shadow-2xl
                            backdrop-blur-xl
                            animate-[slideIn_.3s_ease-out]
                            ${
                                messageType === "success"
                                    ? "bg-emerald-950/95 border-emerald-500/30 text-emerald-300"
                                    : "bg-red-950/95 border-red-500/30 text-red-300"
                            }
                        `}
                    >

                        <div className="flex items-start gap-3">

                            {/* Icon */}

                            <div
                                className={`
                                    w-9
                                    h-9
                                    rounded-xl
                                    flex
                                    items-center
                                    justify-center
                                    text-lg
                                    ${
                                        messageType === "success"
                                            ? "bg-emerald-500/20"
                                            : "bg-red-500/20"
                                    }
                                `}
                            >

                                {messageType === "success"
                                    ? "✓"
                                    : "!"}

                            </div>


                            {/* Message */}

                            <div className="flex-1">

                                <p className="font-semibold text-white">

                                    {messageType === "success"
                                        ? "Success"
                                        : "Logout Error"}

                                </p>

                                <p className="text-sm mt-1 opacity-90">
                                    {message}
                                </p>

                            </div>


                            {/* Close */}

                            <button
                                type="button"
                                onClick={() => {
                                    setMessage("");
                                    setMessageType("");
                                }}
                                className="text-slate-500 hover:text-white transition"
                            >
                                ✕
                            </button>

                        </div>

                    </div>

                </div>
            )}


            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-xl">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center justify-between h-20">


                        {/* ================================================= */}
                        {/* LOGO */}
                        {/* ================================================= */}

                        <Link
                            to="/"
                            className="flex items-center gap-3 group"
                        >

                            <div className="relative">

                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 flex items-center justify-center text-2xl shadow-lg shadow-indigo-900/40 group-hover:scale-105 transition-transform duration-300">

                                    {currentPortal.icon}

                                </div>


                                {/* Online Dot */}

                                {authstatus && (
                                    <span className="absolute -right-1 -bottom-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full shadow-lg shadow-emerald-500/30"></span>
                                )}

                            </div>


                            {/* Portal Name */}

                            <div className="hidden sm:block">

                                <h1 className="text-xl font-bold text-white tracking-wide group-hover:text-indigo-400 transition">

                                    {currentPortal.title}

                                </h1>

                                <p className="text-xs text-slate-500 font-medium">

                                    {currentPortal.subtitle}

                                </p>

                            </div>

                        </Link>


                        {/* ================================================= */}
                        {/* NAVIGATION */}
                        {/* ================================================= */}

                        <nav className="flex items-center gap-2 sm:gap-4">


                            {/* HOME */}

                            <Link
                                to="/dash/:userId"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition duration-200"
                            >

                                🏠

                                <span>
                                    Home
                                </span>

                            </Link>


                            {/* ================================================= */}
                            {/* NOT LOGGED IN */}
                            {/* ================================================= */}

                            {!authstatus && (

                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-900/30 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5 transition-all duration-300"
                                >

                                    🔐

                                    <span>
                                        Login
                                    </span>

                                </Link>

                            )}


                            {/* ================================================= */}
                            {/* LOGGED IN */}
                            {/* ================================================= */}

                            {authstatus && (

                                <>

                                    {/* Dashboard */}

                                    <Link
                                        to="/dash/:userId"
                                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:border-indigo-500 hover:text-indigo-400 transition duration-200"
                                    >

                                        📊

                                        <span>
                                            Dashboard
                                        </span>

                                    </Link>


                                    {/* Role */}

                                    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">

                                        <span className="text-sm">
                                            {currentPortal.icon}
                                        </span>

                                        <span className="text-sm text-slate-300 capitalize">
                                            {roleControl}
                                        </span>

                                    </div>


                                    {/* ================================================= */}
                                    {/* LOGOUT BUTTON */}
                                    {/* ================================================= */}

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        disabled={loading}
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            px-4
                                            py-2.5
                                            rounded-xl
                                            border
                                            font-medium
                                            transition-all
                                            duration-300
                                            ${
                                                loading
                                                    ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed"
                                                    : "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white hover:-translate-y-0.5 cursor-pointer"
                                            }
                                        `}
                                    >

                                        {loading ? (
                                            <>
                                                {/* Spinner */}

                                                <span className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></span>

                                                <span>
                                                    Logging out...
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                🚪

                                                <span className="hidden sm:inline">
                                                    Logout
                                                </span>
                                            </>
                                        )}

                                    </button>

                                </>

                            )}

                        </nav>

                    </div>

                </div>

            </header>

        </>
    );
}

export default Header;