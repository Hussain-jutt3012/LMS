import React, { use } from 'react'
import { Link } from 'react-router' // Correct import
import { useSelector } from 'react-redux'

function Header() {
    const roleControl = useSelector((state) => state.auth.user?.role)
    const authstatus = useSelector((state) => state.auth.status)
    return (

        <header className="bg-slate-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-white tracking-wide hover:text-indigo-400 transition duration-300">
                            Student Portal
                        </Link>
                    </div>

                    {/* Add more nav links here if needed */}
                    <nav className="hidden md:flex space-x-6">
                        {
                            !authstatus && (
                                <Link to="/login" className="text-gray-300 hover:text-indigo-400 transition duration-200">
                                    Login
                                </Link>
                            )
                        }
                        {
                            authstatus && (
                                 <Link to="/login" className="text-gray-300 hover:text-indigo-400 transition duration-200">
                                    Logout
                                </Link>
                            )
                        }
                        <div>
                            {
                                roleControl === "admin" && (
                                    <Link to="/dash" className="text-gray-300 hover:text-red-400 transition duration-200">
                                        Admin Dashboard
                                    </Link>
                                )
                            }
                        </div>
                        <div>
                            {
                                roleControl === "student" && (
                                    <Link to="/dash" className="text-gray-300 hover:text-red-400 transition duration-200">
                                        StudentDashboard
                                    </Link>
                                )
                            }
                        </div>

                        <div>
                            {
                                roleControl === "teacher" && (
                                    <Link to="/dash" className="text-gray-300 hover:text-red-400 transition duration-200">
                                        TeacherDashBoard
                                    </Link>
                                )
                            }
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
