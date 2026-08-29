import React, { useState } from "react";
import { useParams, useLocation } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";

function StudentEnrollement() {
  const { userId, studentId } = useParams();
  const location = useLocation();
  const data = location?.state?.studentData;

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const StudentEnrollement = async (formData) => {
    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/enrollment/${userId}/${studentId}/get-student-enrollement`,
        formData,
        {
          withCredentials: true,
        }
      );

      setMessage(
        response.data?.message || "Student enrolled successfully."
      );

      setMessageType("success");

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to enroll student. Please try again."
      );

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-6 lg:px-10 relative overflow-hidden">

      {/* ================= BACKGROUND DECORATIONS ================= */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-150px] left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>


      <div className="relative max-w-4xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-indigo-950/40">

          {/* Decorative Circles */}

          <div className="absolute -right-12 -top-16 w-64 h-64 bg-white/10 rounded-full"></div>

          <div className="absolute right-32 -bottom-24 w-48 h-48 bg-white/10 rounded-full"></div>


          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">

            {/* Icon */}

            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl shadow-lg shrink-0">
              🎓
            </div>


            {/* Heading */}

            <div>

              <p className="text-indigo-100 text-xs sm:text-sm font-semibold tracking-widest">
                ADMINISTRATION PORTAL
              </p>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1">
                Student Enrollment
              </h1>

              <p className="text-indigo-100 mt-2 text-sm sm:text-base">
                Enroll the student into their academic program
              </p>

            </div>

          </div>

        </div>


        {/* ================= SUCCESS / ERROR MESSAGE ================= */}

        {message && (
          <div
            className={`mb-6 p-4 rounded-2xl border shadow-lg ${
              messageType === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >

            <div className="flex items-start gap-3">

              <div className="text-2xl">
                {messageType === "success" ? "✓" : "⚠"}
              </div>

              <div>

                <p className="font-semibold">
                  {messageType === "success"
                    ? "Enrollment Successful"
                    : "Enrollment Failed"}
                </p>

                <p className="text-sm mt-1 opacity-80">
                  {message}
                </p>

              </div>

            </div>

          </div>
        )}


        {/* ================= STUDENT INFO ================= */}

        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl">

          <div className="flex items-center gap-4">

            {/* Avatar */}

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-lg">
              {data?.fullName?.charAt(0)?.toUpperCase() || "S"}
            </div>


            <div className="flex-1">

              <p className="text-xs text-slate-500 uppercase tracking-wider">
                Enrolling Student
              </p>

              <h2 className="text-xl font-bold text-slate-100 mt-1">
                {data?.fullName || "Student"}
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Enter the academic information below
              </p>

            </div>


            <div className="hidden sm:block">

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">

                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>

                Enrollment

              </span>

            </div>

          </div>

        </div>


        {/* ================= FORM CARD ================= */}

        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">

          {/* Form Heading */}

          <div className="flex items-center gap-3 mb-8">

            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
              📝
            </div>

            <div>

              <h2 className="text-xl sm:text-2xl font-bold">
                Academic Information
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Provide the student's enrollment details
              </p>

            </div>

          </div>


          <form
            onSubmit={handleSubmit(StudentEnrollement)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {/* ================= DEPARTMENT ================= */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                🏛️ Department
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
                } text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20`}
              />

              {errors.department && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.department.message}
                </p>
              )}

            </div>


            {/* ================= CLASS ================= */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                🏫 Class Name
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
                } text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20`}
              />

              {errors.classname && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.classname.message}
                </p>
              )}

            </div>


            {/* ================= SECTION ================= */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                📑 Section
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
                } text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
              />

              {errors.section && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.section.message}
                </p>
              )}

            </div>


            {/* ================= SEMESTER ================= */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                🎯 Semester Number
              </label>

              <input
                type="number"
                placeholder="e.g. 5"
                {...register("semesterNo", {
                  required: "Semester is required",
                })}
                className={`w-full bg-slate-950 border ${
                  errors.semesterNo
                    ? "border-red-500"
                    : "border-slate-700"
                } text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`}
              />

              {errors.semesterNo && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.semesterNo.message}
                </p>
              )}

            </div>


            {/* ================= SUBJECTS ================= */}

            <div className="md:col-span-2">

              <label className="block text-sm font-medium text-slate-300 mb-2">
                📚 Subjects
              </label>

              <input
                placeholder="e.g. OOP, Mathematics, ICT"
                {...register("subjects", {
                  required: "Subject is required",
                })}
                className={`w-full bg-slate-950 border ${
                  errors.subjects
                    ? "border-red-500"
                    : "border-slate-700"
                } text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20`}
              />

              <p className="text-xs text-slate-500 mt-2">
                Separate multiple subjects using commas.
              </p>

              {errors.subjects && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.subjects.message}
                </p>
              )}

            </div>


            {/* ================= PREVIEW ================= */}

            <div className="md:col-span-2">

              <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4">

                <div className="flex gap-3">

                  <div className="text-xl">
                    💡
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-indigo-300">
                      Enrollment Information
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Make sure the department, class, section, semester
                      and subjects are correct before enrolling the student.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* ================= SUBMIT BUTTON ================= */}

            <div className="md:col-span-2 pt-2">

              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg transition-all duration-300 ${
                  loading
                    ? "bg-slate-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 hover:-translate-y-0.5 active:scale-[0.98]"
                }`}
              >

                {loading
                  ? "Enrolling Student..."
                  : "🎓 Enroll Student"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default StudentEnrollement;