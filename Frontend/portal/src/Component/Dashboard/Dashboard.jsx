import React from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

function Dashboard() {

  const rolecontrol = useSelector((state) => state.auth.user?.role)
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      {/* ================= ADMIN DASHBOARD ================= */}
      {rolecontrol === "admin" && (

        <div className="relative flex-1 p-5 sm:p-8 lg:p-10">

          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-indigo-900/30">

            <div className="absolute right-[-40px] top-[-50px] w-56 h-56 rounded-full bg-white/10"></div>
            <div className="absolute right-20 bottom-[-80px] w-40 h-40 rounded-full bg-white/10"></div>

            <div className="relative">

              <div className="flex items-center gap-4 mb-4">

                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl">
                  👋
                </div>

                <div>
                  <p className="text-indigo-100 text-sm font-medium">
                    ADMINISTRATOR
                  </p>

                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Welcome back, Admin!
                  </h1>
                </div>

              </div>

              <p className="text-indigo-100 max-w-xl">
                Manage students, teachers, enrollment and user activities
                from your centralized dashboard.
              </p>

            </div>
          </div>


          {/* Section Heading */}
          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-xl font-bold text-white">
                Administration
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Manage your university system
              </p>
            </div>

            <div className="hidden sm:block px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-400">
              Admin Panel
            </div>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Create Student */}
            <Link
              to={`/${user._id}/signup`}
              className="group"
            >
              <div className="relative overflow-hidden bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-indigo-900/20">

                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20"></div>

                <div className="relative">

                  <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                    ➕
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    Create Student or Teacher
                  </h3>

                  <p className="text-sm text-slate-400">
                    Register a new student or teacher account.
                  </p>

                  <div className="mt-5 text-indigo-400 text-sm font-medium">
                    Create Account →
                  </div>

                </div>
              </div>
            </Link>


            {/* Delete Student */}
            <Link
              to={`/${user._id}/find-student`}
              className="group"
            >
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-500/40">

                <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                  🗑️
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  Delete Student
                </h3>

                <p className="text-sm text-slate-400">
                  Find and remove student accounts from the system.
                </p>

                <div className="mt-5 text-red-400 text-sm font-medium">
                  Manage Students →
                </div>

              </div>
            </Link>


            {/* Block */}
            <Link
              to={`/${user._id}/block-portal`}
              className="group"
            >
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/40">

                <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                  🔐
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  Block & Unblock
                </h3>

                <p className="text-sm text-slate-400">
                  Control student account access and restrictions.
                </p>

                <div className="mt-5 text-orange-400 text-sm font-medium">
                  Manage Access →
                </div>

              </div>
            </Link>


            {/* Enrollment */}
            <Link
              to={`/${user._id}/get-studentData`}
              className="group"
            >
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40">

                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                  🎓
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  Enrolled Students
                </h3>

                <p className="text-sm text-slate-400">
                  View and manage enrolled student information.
                </p>

                <div className="mt-5 text-emerald-400 text-sm font-medium">
                  View Students →
                </div>

              </div>
            </Link>

            {/* Enrollment */}
            <Link
              to={`/${user._id}/subject-register`}
              className="group"
            >
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40">

                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                  🎓
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  Teacher Subject Assignment
                </h3>

                <p className="text-sm text-slate-400">
                  View and manage teacher subject assignments.
                </p>

                <div className="mt-5 text-emerald-400 text-sm font-medium">
                  View Subjects →
                </div>

              </div>
            </Link>

          </div>

        </div>
      )}


      {/* ================= STUDENT DASHBOARD ================= */}
      {rolecontrol === "student" && (

        <div className="relative flex-1 p-5 sm:p-8 lg:p-10">

          {/* Welcome */}
          <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-blue-900/30">

            <div className="absolute right-[-50px] top-[-60px] w-64 h-64 bg-white/10 rounded-full"></div>

            <div className="relative">

              <div className="flex items-center gap-4 mb-4">

                <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-white/20">
                  🎓
                </div>

                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    STUDENT PORTAL
                  </p>

                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Welcome, Student!
                  </h1>
                </div>

              </div>

              <p className="text-blue-100">
                Track your attendance, marks, assignments and enrolled courses.
              </p>

            </div>

          </div>


          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Academic Overview
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Access your academic information
            </p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Attendance */}
            <Link
              to={`/get-attendance-data`}
              className="group"
            >
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40">

                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                  ✅
                </div>

                <h2 className="text-lg font-semibold">
                  View Attendance
                </h2>

                <p className="text-slate-400 text-sm mt-2">
                  Track your class attendance records.
                </p>

                <div className="mt-5 text-emerald-400 text-sm font-medium">
                  View Attendance →
                </div>

              </div>
            </Link>


            {/* Results */}
            <Link
              to={`/get-result`}
              className="group"
            >
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">

                <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                  📊
                </div>

                <h2 className="text-lg font-semibold">
                  Total Marks
                </h2>

                <p className="text-slate-400 text-sm mt-2">
                  See your overall academic performance.
                </p>

                <div className="mt-5 text-blue-400 text-sm font-medium">
                  View Results →
                </div>

              </div>
            </Link>


            {/* Assignments */}
            <div className="group bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 cursor-pointer">

              <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                📝
              </div>

              <h2 className="text-lg font-semibold">
                Assignments
              </h2>

              <p className="text-slate-400 text-sm mt-2">
                View and submit assignment tasks.
              </p>

              <div className="mt-5 text-purple-400 text-sm font-medium">
                View Assignments →
              </div>

            </div>


            {/* Courses */}
            <Link
              to={`/get-enrolled-data`}
              className="group"
            >
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/40">

                <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                  📚
                </div>

                <h2 className="text-lg font-semibold">
                  Enrolled Courses
                </h2>

                <p className="text-slate-400 text-sm mt-2">
                  View your current enrolled subjects.
                </p>

                <div className="mt-5 text-orange-400 text-sm font-medium">
                  View Courses →
                </div>

              </div>
            </Link>

          </div>

        </div>
      )}


      {/* ================= TEACHER DASHBOARD ================= */}
      {
        rolecontrol === "teacher" && (

          <div className="relative flex-1 p-5 sm:p-8 lg:p-10">

            {/* Welcome */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-blue-900/30">

              <div className="absolute right-[-50px] top-[-60px] w-64 h-64 bg-white/10 rounded-full"></div>
              <div className="absolute right-32 bottom-[-100px] w-48 h-48 bg-white/10 rounded-full"></div>

              <div className="relative">

                <div className="flex items-center gap-4 mb-4">

                  <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-white/20">
                    👨‍🏫
                  </div>

                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      TEACHER PORTAL
                    </p>

                    <h1 className="text-2xl sm:text-3xl font-bold">
                      Welcome, Teacher!
                    </h1>
                  </div>

                </div>

                <p className="text-blue-100">
                  Manage attendance, marks and student academic records.
                </p>

              </div>

            </div>


            <div className="mb-5">

              <h2 className="text-xl font-bold">
                Teacher Tools
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Manage your classroom activities
              </p>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Mark Attendance */}
              <div className="group bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40">

                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                  ✅
                </div>

                <Link to={`/${user._id}/attendance-mark`}>

                  <h2 className="text-lg font-semibold">
                    Mark Attendance
                  </h2>

                  <p className="text-slate-400 text-sm mt-2">
                    Record student attendance daily.
                  </p>

                  <div className="mt-5 text-emerald-400 text-sm font-medium">
                    Mark Attendance →
                  </div>

                </Link>

              </div>


              {/* Mid Term */}
              <Link
                to={`/${user._id}/result-remarks`}
                className="group"
              >
                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40">

                  <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                    🧪
                  </div>

                  <h2 className="text-lg font-semibold">
                    Add  Marks
                  </h2>

                  <p className="text-slate-400 text-sm mt-2">
                    Submit exam results.
                  </p>

                  <div className="mt-5 text-purple-400 text-sm font-medium">
                    Add Marks →
                  </div>

                </div>
              </Link>


              {/* Assignment */}
              <Link
                to={`/${user._id}/assignment`}
                className="group"
              >
                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40">

                  <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-3xl mb-5">
                    🧪
                  </div>

                  <h2 className="text-lg font-semibold">
                    Upload Assignments
                  </h2>

                  <p className="text-slate-400 text-sm mt-2">
                    Submit assignments for students to complete.
                  </p>

                  <div className="mt-5 text-purple-400 text-sm font-medium">
                    Add Marks →
                  </div>

                </div>
              </Link>



             
            </div>

          </div>

        )
      }

    </div>
  )
}

export default Dashboard