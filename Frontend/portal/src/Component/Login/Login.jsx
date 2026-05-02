import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Login as authLogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function Login() {

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        type: "",
        message: "",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // =====================================
    // Notification Function
    // =====================================

    const showNotification = (type, message) => {

        setNotification({
            show: true,
            type,
            message,
        });

    };


    // =====================================
    // Login Function
    // =====================================

    const authData = async (data) => {

        try {

            setLoading(true);

            // Clear previous notification
            setNotification({
                show: false,
                type: "",
                message: "",
            });


            const response = await axios.post(
                "http://localhost:4000/api/v1/users/login",
                data,
                {
                    withCredentials: true,
                }
            );


            const {
                accessToken,
                refreshToken,
                user,
            } = response.data.data;


            // Redux Login
            dispatch(
                authLogin({
                    accessToken,
                    refreshToken,
                    user,
                })
            );


            // Success Notification
            showNotification(
                "success",
                "User logged in successfully! Welcome back."
            );


            // Redirect after notification
            setTimeout(() => {
                navigate(`/dash/${user._id}`);
            }, 1500);


        } catch (error) {

            const errorMessage =
                error?.response?.data?.message ||
                "Login failed. Please check your credentials and try again.";


            // Error Notification
            showNotification(
                "error",
                errorMessage
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">


            {/* ===================================== */}
            {/* Background Decorations */}
            {/* ===================================== */}

            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>


            {/* ===================================== */}
            {/* Notification */}
            {/* ===================================== */}

            {notification.show && (

                <div className="fixed top-6 right-6 z-[100]">

                    <div
                        className={`
                            min-w-[320px]
                            max-w-md
                            rounded-2xl
                            border
                            shadow-2xl
                            backdrop-blur-xl
                            px-5
                            py-4
                            animate-[slideIn_.3s_ease-out]
                            ${
                                notification.type === "success"
                                    ? "bg-emerald-950/95 border-emerald-500/30"
                                    : "bg-red-950/95 border-red-500/30"
                            }
                        `}
                    >

                        <div className="flex items-start gap-3">


                            {/* Notification Icon */}

                            <div
                                className={`
                                    w-10
                                    h-10
                                    rounded-xl
                                    flex
                                    items-center
                                    justify-center
                                    text-xl
                                    ${
                                        notification.type === "success"
                                            ? "bg-emerald-500/20 text-emerald-400"
                                            : "bg-red-500/20 text-red-400"
                                    }
                                `}
                            >

                                {notification.type === "success"
                                    ? "✓"
                                    : "!"}

                            </div>


                            {/* Notification Content */}

                            <div className="flex-1">

                                <h3 className="text-white font-semibold">

                                    {notification.type === "success"
                                        ? "Login Successful"
                                        : "Login Failed"}

                                </h3>

                                <p className="text-sm text-slate-300 mt-1 leading-relaxed">

                                    {notification.message}

                                </p>

                            </div>


                            {/* Close */}

                            <button
                                type="button"
                                onClick={() =>
                                    setNotification({
                                        show: false,
                                        type: "",
                                        message: "",
                                    })
                                }
                                className="text-slate-500 hover:text-white transition"
                            >
                                ✕
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* ===================================== */}
            {/* Login Card */}
            {/* ===================================== */}

            <div className="relative w-full max-w-md">


                <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl overflow-hidden">


                    {/* ===================================== */}
                    {/* Header */}
                    {/* ===================================== */}

                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-8 py-8 text-center">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-3xl shadow-lg mb-4">

                            🎓

                        </div>

                        <h2 className="text-3xl font-bold text-white">

                            Welcome Back

                        </h2>

                        <p className="text-indigo-100 text-sm mt-2">

                            Sign in to your University Portal

                        </p>

                    </div>


                    {/* ===================================== */}
                    {/* Form */}
                    {/* ===================================== */}

                    <form
                        onSubmit={handleSubmit(authData)}
                        className="p-8 space-y-6"
                    >


                        {/* Username */}

                        <div>

                            <label className="block text-sm font-medium text-slate-300 mb-2">

                                Username

                            </label>

                            <input
                                type="text"
                                placeholder="Enter your username"
                                {...register("username", {
                                    required: "Username is required",
                                })}
                                className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
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

                                Email

                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
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
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                            />

                            {errors.password && (

                                <p className="text-red-400 text-xs mt-1.5">

                                    {errors.password.message}

                                </p>

                            )}

                        </div>


                        {/* Login Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full
                                py-3.5
                                rounded-xl
                                text-white
                                font-semibold
                                shadow-lg
                                transition-all
                                duration-300
                                ${
                                    loading
                                        ? "bg-slate-700 cursor-not-allowed"
                                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5 shadow-indigo-900/30"
                                }
                            `}
                        >

                            {loading ? (

                                <span className="flex items-center justify-center gap-2">

                                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>

                                    Signing in...

                                </span>

                            ) : (

                                <span>
                                    🔐 Login
                                </span>

                            )}

                        </button>


                    </form>


                    {/* Footer */}

                    <div className="px-8 pb-7 text-center">

                        <p className="text-xs text-slate-500">

                            Secure University Management Portal

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;