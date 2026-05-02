import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import { useForm } from "react-hook-form";

function GetStudent() {
  const [allStudent, setAllStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const { handleSubmit, register } = useForm();
  const { userId } = useParams();

  const fetchStudentData = async (data) => {
    try {
      setLoading(true);
      setNotification(null);

      const response = await axios.post(
        `http://localhost:4000/api/v1/users/${userId}/block-portal`,
        data,
        {
          withCredentials: true,
        }
      );

      setAllStudent(response.data.data || []);

      setNotification({
        type: "success",
        title: "Search Completed",
        message:
          response.data?.message ||
          `${response.data.data?.length || 0} student(s) found successfully.`,
      });
    } catch (error) {
      setAllStudent([]);

      setNotification({
        type: "error",
        title: "Search Failed",
        message:
          error.response?.data?.message ||
          "Unable to find students. Please check the academic information and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto hide notification
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-6 lg:px-10 relative overflow-hidden">

      {/* ================= BACKGROUND DECORATIONS ================= */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-150px] left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>


      <div className="relative max-w-7xl mx-auto">

        {/* ================= NOTIFICATION ================= */}
        {notification && (
          <div
            className={`mb-6 rounded-2xl border p-4 shadow-xl backdrop-blur-md ${
              notification.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-red-500/10 border-red-500/30"
            }`}
          >
            <div className="flex items-start gap-4">

              <div
                className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-xl ${
                  notification.type === "success"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {notification.type === "success" ? "✓" : "⚠"}
              </div>

              <div className="flex-1">
                <h3
                  className={`font-bold ${
                    notification.type === "success"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {notification.title}
                </h3>

                <p className="text-sm text-slate-300 mt-1">
                  {notification.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setNotification(null)}
                className="text-slate-500 hover:text-white transition text-lg"
              >
                ✕
              </button>

            </div>
          </div>
        )}


        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-indigo-950/40">

          <div className="absolute -right-12 -top-16 w-64 h-64 rounded-full bg-white/10"></div>

          <div className="absolute right-32 -bottom-24 w-48 h-48 rounded-full bg-white/10"></div>

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl shadow-lg">
                🎓
              </div>

              <div>
                <p className="text-indigo-100 text-xs sm:text-sm font-semibold tracking-widest">
                  ADMINISTRATION PORTAL
                </p>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1">
                  Find Students
                </h1>

                <p className="text-indigo-100 mt-2 text-sm sm:text-base">
                  Search students by their academic information
                </p>
              </div>

            </div>


            {/* Student Count */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center min-w-[120px]">

              <p className="text-indigo-100 text-xs uppercase tracking-wider">
                Students Found
              </p>

              <p className="text-3xl font-bold mt-1">
                {allStudent.length}
              </p>

            </div>

          </div>
        </div>


        {/* ================= SEARCH SECTION ================= */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-8">

          <div className="flex items-center gap-3 mb-7">

            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
              🔎
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Search Students
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Enter academic details to find students
              </p>
            </div>

          </div>


          <form
            onSubmit={handleSubmit(fetchStudentData)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                🏛️ Department
              </label>

              <input
                placeholder="e.g. Computer Science"
                {...register("department", {
                  required: "Department is required",
                })}
                className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-600"
              />
            </div>


            {/* Class */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                🏫 Class
              </label>

              <input
                placeholder="e.g. BSCS"
                {...register("classname", {
                  required: "Classname is required",
                })}
                className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 hover:border-slate-600"
              />
            </div>


            {/* Section */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                📑 Section
              </label>

              <input
                placeholder="e.g. A"
                {...register("section", {
                  required: "Section is required",
                })}
                className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
              />
            </div>


            {/* Semester */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                🎯 Semester
              </label>

              <input
                placeholder="e.g. 5"
                {...register("semesterNo", {
                  required: "Semester is required",
                })}
                className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 hover:border-slate-600"
              />
            </div>


            {/* Search Button */}
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end">

              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                  loading
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-950/40 hover:-translate-y-0.5 active:scale-95"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Searching...
                  </span>
                ) : (
                  "🔍 Search Students"
                )}
              </button>

            </div>

          </form>

        </div>


        {/* ================= STUDENT RESULTS ================= */}
        {allStudent.length > 0 ? (

          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl shadow-xl overflow-hidden">

            <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  👨‍🎓 Student Results
                </h3>

                <p className="text-slate-400 text-sm mt-1">
                  Students matching your search criteria
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold">
                {allStudent.length} Student
                {allStudent.length !== 1 ? "s" : ""}
              </div>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead className="bg-slate-950/70">

                  <tr className="text-left">

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                      Student
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                      Department
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                      Class
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                      Section
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                      Semester
                    </th>

                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {allStudent.map((data, index) => (

                    <tr
                      key={data._id}
                      className="border-t border-slate-800 hover:bg-indigo-500/5 transition-colors duration-200"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg">
                            {data?.fullName?.charAt(0)?.toUpperCase() || "S"}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-100">
                              {data?.fullName || "N/A"}
                            </p>

                            <p className="text-xs text-slate-500">
                              Student #{index + 1}
                            </p>

                          </div>

                        </div>

                      </td>


                      <td className="px-6 py-5">

                        <span className="inline-flex px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
                          {data.studentProfile?.[0]?.department || "N/A"}
                        </span>

                      </td>


                      <td className="px-6 py-5 text-slate-300">
                        {data.studentProfile?.[0]?.classname || "N/A"}
                      </td>


                      <td className="px-6 py-5">

                        <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">
                          {data.studentProfile?.[0]?.section || "N/A"}
                        </span>

                      </td>


                      <td className="px-6 py-5">

                        <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
                          Semester{" "}
                          {data.studentProfile?.[0]?.semesterNo || "N/A"}
                        </span>

                      </td>


                      <td className="px-6 py-5">

                        <Link
                          to={`/${userId}/${data._id}/get-enrolled-student`}
                          state={{ studentData: data }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-950/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          🎓 Get Enrolled
                        </Link>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        ) : (

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-12 text-center shadow-xl">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-4xl mb-5">
              👨‍🎓
            </div>

            <h2 className="text-xl font-bold text-slate-200">
              No Students Found
            </h2>

            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              Search using department, class, section and semester to find
              students.
            </p>

          </div>

        )}

      </div>
    </div>
  );
}

export default GetStudent;