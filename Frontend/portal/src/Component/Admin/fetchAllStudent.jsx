import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import { useForm } from "react-hook-form";

function FetchAllStudent() {
  const [allStudent, setAllStudent] = useState([]);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  const { handleSubmit, register, formState: { errors } } = useForm();

  const { userId } = useParams();

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

  // ================= FETCH STUDENTS =================

  const fetchStudentData = async (data) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:4000/api/v1/users/${userId}/block-portal`,
        data,
        {
          withCredentials: true,
        }
      );

      const students = response.data?.data || [];

      setAllStudent(students);

      // Agar students mil gaye
      if (students.length > 0) {
        showNotification(
          "success",
          `${students.length} student${students.length > 1 ? "s" : ""} found successfully.`
        );
      } else {
        showNotification(
          "info",
          "No students were found matching the provided information."
        );
      }

    } catch (error) {
      setAllStudent([]);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to fetch students. Please try again.";

      showNotification("error", errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-6 lg:px-10 relative overflow-hidden">

      {/* ================= NOTIFICATION ================= */}

      {notification.message && (
        <div className="fixed top-6 right-6 z-[200] w-[calc(100%-3rem)] max-w-md">

          <div
            className={`relative overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl p-4 ${
              notification.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/30"
                : notification.type === "info"
                  ? "bg-indigo-950/90 border-indigo-500/30"
                  : "bg-red-950/90 border-red-500/30"
            }`}
          >

            <div className="flex items-start gap-3">

              {/* Icon */}

              <div
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                  notification.type === "success"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : notification.type === "info"
                      ? "bg-indigo-500/15 text-indigo-400"
                      : "bg-red-500/15 text-red-400"
                }`}
              >
                {notification.type === "success"
                  ? "✓"
                  : notification.type === "info"
                    ? "🔍"
                    : "⚠"}
              </div>

              {/* Message */}

              <div className="flex-1">

                <p
                  className={`font-bold ${
                    notification.type === "success"
                      ? "text-emerald-300"
                      : notification.type === "info"
                        ? "text-indigo-300"
                        : "text-red-300"
                  }`}
                >
                  {notification.type === "success"
                    ? "Search Successful"
                    : notification.type === "info"
                      ? "No Students Found"
                      : "Search Failed"}
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

            {/* Progress Bar */}

            <div
              className={`absolute bottom-0 left-0 h-0.5 w-full ${
                notification.type === "success"
                  ? "bg-emerald-500"
                  : notification.type === "info"
                    ? "bg-indigo-500"
                    : "bg-red-500"
              }`}
            />

          </div>

        </div>
      )}


      {/* ================= BACKGROUND ================= */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="absolute bottom-[-150px] left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />


      <div className="relative max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-indigo-950/40">

          <div className="absolute -right-12 -top-16 w-64 h-64 bg-white/10 rounded-full" />

          <div className="absolute right-32 -bottom-20 w-48 h-48 bg-white/10 rounded-full" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl shadow-lg">
                👨‍🎓
              </div>

              <div>

                <p className="text-indigo-100 text-xs sm:text-sm font-semibold tracking-widest">
                  ADMINISTRATION
                </p>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  Student Portal
                </h1>

                <p className="text-indigo-100 mt-1 text-sm sm:text-base">
                  Search and manage student accounts
                </p>

              </div>

            </div>

            {/* Student Count */}

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center min-w-[120px]">

              <p className="text-indigo-100 text-xs uppercase tracking-wider">
                Students
              </p>

              <p className="text-3xl font-bold mt-1">
                {allStudent.length}
              </p>

            </div>

          </div>
        </div>


        {/* ================= SEARCH SECTION ================= */}

        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-8">

          <div className="flex items-center gap-4 mb-7">

            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl">
              🔍
            </div>

            <div>

              <h2 className="text-xl sm:text-2xl font-bold">
                Find Students
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Search students by their academic information
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
                Department
              </label>

              <input
                placeholder="e.g. Computer Science"
                {...register("department", {
                  required: "Department is required",
                })}
                className={`w-full bg-slate-950 border ${
                  errors.department
                    ? "border-red-500"
                    : "border-slate-700"
                } text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition`}
              />

              {errors.department && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.department.message}
                </p>
              )}

            </div>


            {/* Class */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Class Name
              </label>

              <input
                placeholder="e.g. BSCS"
                {...register("classname", {
                  required: "Classname is required",
                })}
                className={`w-full bg-slate-950 border ${
                  errors.classname
                    ? "border-red-500"
                    : "border-slate-700"
                } text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition`}
              />

              {errors.classname && (
                <p className="text-red-400 text-xs mt-2">
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
                  required: "Section is required",
                })}
                className={`w-full bg-slate-950 border ${
                  errors.section
                    ? "border-red-500"
                    : "border-slate-700"
                } text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition`}
              />

              {errors.section && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.section.message}
                </p>
              )}

            </div>


            {/* Semester */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Semester
              </label>

              <input
                placeholder="e.g. 5"
                {...register("semesterNo", {
                  required: "Semester is required",
                })}
                className={`w-full bg-slate-950 border ${
                  errors.semesterNo
                    ? "border-red-500"
                    : "border-slate-700"
                } text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition`}
              />

              {errors.semesterNo && (
                <p className="text-red-400 text-xs mt-2">
                  {errors.semesterNo.message}
                </p>
              )}

            </div>


            {/* Search Button */}

            <div className="sm:col-span-2 lg:col-span-4 flex justify-end">

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold shadow-lg shadow-indigo-950/40 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin mr-2">
                      ⟳
                    </span>
                    Searching...
                  </>
                ) : (
                  <>
                    🔎 Search Students
                  </>
                )}
              </button>

            </div>

          </form>

        </div>


        {/* ================= STUDENT RESULTS ================= */}

        {allStudent.length > 0 && (

          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl shadow-xl overflow-hidden">

            <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <h2 className="text-xl sm:text-2xl font-bold">
                  🎓 Student Results
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Students matching your search criteria
                </p>

              </div>

              <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold">
                {allStudent.length} Found
              </div>

            </div>


            {/* Responsive Table */}

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead>

                  <tr className="bg-slate-950/70 border-b border-slate-800">

                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Student
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Department
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Class
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Section
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Semester
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {allStudent.map((data, index) => (

                    <tr
                      key={data._id}
                      className="border-b border-slate-800/70 hover:bg-indigo-500/5 transition-all duration-200"
                    >

                      {/* Student */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg">
                            {data?.fullName?.charAt(0)?.toUpperCase() || "S"}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-200">
                              {data?.fullName || "N/A"}
                            </p>

                            <p className="text-xs text-slate-500">
                              Student #{index + 1}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* Department */}

                      <td className="px-6 py-5">

                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
                          {data.studentProfile?.[0]?.department || "N/A"}
                        </span>

                      </td>


                      {/* Class */}

                      <td className="px-6 py-5 text-slate-300">
                        {data.studentProfile?.[0]?.classname || "N/A"}
                      </td>


                      {/* Section */}

                      <td className="px-6 py-5">

                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-semibold">
                          {data.studentProfile?.[0]?.section || "-"}
                        </span>

                      </td>


                      {/* Semester */}

                      <td className="px-6 py-5">

                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
                          Semester{" "}
                          {data.studentProfile?.[0]?.semesterNo || "-"}
                        </span>

                      </td>


                      {/* Action */}

                      <td className="px-6 py-5 text-center">

                        <Link
                          to={`/${userId}/${data._id}/portal-block`}
                          state={{ student: data }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-200 font-medium text-sm"
                        >
                          View
                          <span>
                            →
                          </span>
                        </Link>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}


        {/* ================= EMPTY STATE ================= */}

        {allStudent.length === 0 && !loading && (

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-12 text-center shadow-xl">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-4xl mb-5">
              👨‍🎓
            </div>

            <h2 className="text-xl font-bold text-slate-200">
              Search for Students
            </h2>

            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              Enter department, class, section and semester information
              above to find students.
            </p>

          </div>

        )}

      </div>
    </div>
  );
}

export default FetchAllStudent;