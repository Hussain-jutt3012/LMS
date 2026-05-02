import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";

function MarksAttendance() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userId } = useParams();

  const [studentData, setStudentData] = useState([]);

  // Loading states
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success state
  const [markedAttendance, setMarkedAttendance] = useState(false);

  // Error states
  const [searchError, setSearchError] = useState("");
  const [attendanceError, setAttendanceError] = useState("");

  // ================= API ERROR HANDLER =================

  const getErrorMessage = (error, defaultMessage) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message;

      if (serverMessage) {
        return serverMessage;
      }

      switch (status) {
        case 400:
          return "Invalid attendance information. Please check your input.";

        case 401:
          return "Your session has expired. Please login again.";

        case 403:
          return "You are not authorized to perform this action.";

        case 404:
          return "The requested attendance data could not be found.";

        case 409:
          return "Attendance for this class has already been marked.";

        case 422:
          return "Some information is invalid. Please check your entries.";

        case 429:
          return "Too many requests. Please wait a moment and try again.";

        case 500:
          return "Something went wrong on the server. Please try again later.";

        default:
          if (error.request && !error.response) {
            return "Unable to connect to the server. Please check your internet connection.";
          }

          return defaultMessage;
      }
    }

    return defaultMessage;
  };

  // ================= FIND STUDENTS =================

  const attendanceData = async (data) => {
    setIsSearching(true);
    setSearchError("");
    setStudentData([]);

    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/attendance/${userId}/attendance-mark`,
        data,
        {
          withCredentials: true,
        }
      );

      const students = response.data?.data?.studentList;

      if (!Array.isArray(students)) {
        throw new Error("Invalid student data received from server.");
      }

      setStudentData(students);

      if (students.length === 0) {
        setSearchError(
          "No students found for the selected class information."
        );
      }
    } catch (error) {
      console.error("Attendance search failed:", error);

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

  // ================= MARK ATTENDANCE =================

  const MarkAttendance = async (data) => {
    setIsSubmitting(true);
    setAttendanceError("");

    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/attendance/${userId}/mark-Attendance`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log("Attendance Response:", response.data);

      setMarkedAttendance(true);
    } catch (error) {
      console.error("Attendance submission failed:", error);

      setAttendanceError(
        getErrorMessage(
          error,
          "Unable to mark attendance. Please try again."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= SUCCESS MESSAGE =================

  useEffect(() => {
    if (markedAttendance) {
      const timer = setTimeout(() => {
        setMarkedAttendance(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [markedAttendance]);

  // ================= SUCCESS SCREEN =================

  if (markedAttendance) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

        <div className="absolute top-[-150px] left-[-150px] w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-[-150px] right-[-150px] w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

        <div className="relative bg-slate-900 border border-emerald-500/30 rounded-3xl p-10 sm:p-14 text-center shadow-2xl shadow-emerald-900/20 max-w-lg w-full">

          <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-4xl mb-6">
            ✅
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Attendance Marked Successfully
          </h1>

          <p className="text-slate-400 mt-3">
            Student attendance has been successfully recorded.
          </p>

          <div className="mt-6 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-full"></div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-6 lg:px-10 relative overflow-hidden">

      {/* Background Effects */}

      <div className="absolute top-[-200px] left-[-200px] w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-3xl"></div>

      <div className="absolute top-1/2 right-[-200px] w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* ================= SEARCH SECTION ================= */}

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-7 sm:p-8 relative overflow-hidden">

            <div className="absolute right-[-50px] top-[-80px] w-64 h-64 bg-white/10 rounded-full"></div>

            <div className="relative flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl">
                📋
              </div>

              <div>

                <p className="text-purple-100 text-sm font-medium uppercase tracking-wider">
                  Teacher Portal
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold">
                  Attendance Management
                </h1>

                <p className="text-purple-100 text-sm mt-1">
                  Search students and mark their daily attendance
                </p>

              </div>

            </div>
          </div>

          {/* Search Form */}

          <form
            onSubmit={handleSubmit(attendanceData)}
            className="p-6 sm:p-8 space-y-7"
          >

            <div>
              <h2 className="text-lg font-semibold text-white">
                🔍 Find Students
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Enter the class information to find enrolled students.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {[
                {
                  name: "subjectName",
                  placeholder: "Subject Name",
                },
                {
                  name: "classname",
                  placeholder: "Class Name",
                },
                {
                  name: "section",
                  placeholder: "Section",
                },
                {
                  name: "department",
                  placeholder: "Department",
                },
                {
                  name: "semsterNo",
                  placeholder: "Semester No",
                  type: "number",
                },
              ].map((field) => (
                <div key={field.name}>

                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {field.placeholder}
                  </label>

                  <input
                    type={field.type || "text"}
                    disabled={isSearching || isSubmitting}
                    {...register(field.name, {
                      required: `${field.placeholder} is required`,
                    })}
                    placeholder={`Enter ${field.placeholder.toLowerCase()}`}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 hover:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  />

                  {errors[field.name] && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors[field.name]?.message}
                    </p>
                  )}

                </div>
              ))}

            </div>

            {/* Search Error */}

            {searchError && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">

                <span className="text-lg">
                  ⚠️
                </span>

                <div>
                  <p className="text-red-400 text-sm font-medium">
                    Unable to find students
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
              className="w-full sm:w-auto sm:min-w-[180px] mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-7 rounded-xl shadow-lg shadow-purple-900/20 transition-all duration-300"
            >

              {isSearching ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Searching...
                </>
              ) : (
                <>
                  🔍 Search Students
                </>
              )}

            </button>

          </form>

        </div>

        {/* ================= ATTENDANCE TABLE ================= */}

        {studentData.length > 0 && (

          <form
            onSubmit={handleSubmit(MarkAttendance)}
            className="mt-8 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
          >

            {/* Table Header */}

            <div className="p-6 sm:p-8 border-b border-slate-800">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                      📝
                    </div>

                    <div>

                      <h2 className="text-xl font-bold text-white">
                        Mark Attendance
                      </h2>

                      <p className="text-slate-400 text-sm">
                        Select attendance status for each student
                      </p>

                    </div>

                  </div>

                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-2 text-sm text-purple-300">
                  👥 {studentData.length} Students
                </div>

              </div>

            </div>

            {/* Table */}

            <div className="p-4 sm:p-6">

              <div className="overflow-x-auto rounded-2xl border border-slate-800">

                <table className="w-full text-sm">

                  <thead className="bg-slate-800/80 text-slate-300">

                    <tr>

                      <th className="py-4 px-5 text-left whitespace-nowrap">
                        Student
                      </th>

                      <th className="py-4 px-5 text-left whitespace-nowrap">
                        Class
                      </th>

                      <th className="py-4 px-5 text-left whitespace-nowrap">
                        Department
                      </th>

                      <th className="py-4 px-5 text-left whitespace-nowrap">
                        Semester
                      </th>

                      <th className="py-4 px-5 text-center">
                        Present
                      </th>

                      <th className="py-4 px-5 text-center">
                        Absent
                      </th>

                      <th className="py-4 px-5 text-center">
                        Leave
                      </th>

                      <th className="py-4 px-5 text-center">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {studentData.map((stdData, index) => (

                      <tr
                        key={stdData._id}
                        className="border-t border-slate-800 hover:bg-slate-800/40 transition-colors"
                      >

                        {/* Student */}

                        <td className="py-4 px-5">

                          <div className="flex items-center gap-3 min-w-[180px]">

                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold">

                              {stdData.fullName
                                ?.charAt(0)
                                ?.toUpperCase()}

                            </div>

                            <div>

                              <p className="font-semibold text-white">
                                {stdData.fullName}
                              </p>

                              <p className="text-xs text-slate-500">
                                Student
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Class */}

                        <td className="py-4 px-5 text-slate-300 whitespace-nowrap">
                          {stdData.studentProfile?.[0]?.classname || "N/A"}
                        </td>

                        {/* Department */}

                        <td className="py-4 px-5 text-slate-300 whitespace-nowrap">
                          {stdData.studentProfile?.[0]?.department || "N/A"}
                        </td>

                        {/* Semester */}

                        <td className="py-4 px-5 text-slate-300 whitespace-nowrap">
                          {stdData.studentProfile?.[0]?.semesterNo || "N/A"}
                        </td>

                        {/* Present */}

                        <td className="py-4 px-5 text-center">

                          <label className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 cursor-pointer transition">

                            <input
                              type="radio"
                              value="present"
                              {...register(
                                `students.${index}.status`,
                                {
                                  required:
                                    "Attendance status is required",
                                }
                              )}
                              className="w-5 h-5 accent-emerald-500 cursor-pointer"
                            />

                          </label>

                        </td>

                        {/* Absent */}

                        <td className="py-4 px-5 text-center">

                          <label className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 cursor-pointer transition">

                            <input
                              type="radio"
                              value="absent"
                              {...register(
                                `students.${index}.status`,
                                {
                                  required:
                                    "Attendance status is required",
                                }
                              )}
                              className="w-5 h-5 accent-red-500 cursor-pointer"
                            />

                          </label>

                        </td>

                        {/* Leave */}

                        <td className="py-4 px-5 text-center">

                          <label className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 cursor-pointer transition">

                            <input
                              type="radio"
                              value="leave"
                              {...register(
                                `students.${index}.status`,
                                {
                                  required:
                                    "Attendance status is required",
                                }
                              )}
                              className="w-5 h-5 accent-yellow-500 cursor-pointer"
                            />

                          </label>

                        </td>

                        {/* Edit */}

                        <td className="py-4 px-5 text-center">

                          <Link
                            to={`/${userId}/${stdData._id}/edit-attendance`}
                            state={{ student: stdData }}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition text-sm font-medium"
                          >
                            ✏️ Edit
                          </Link>

                        </td>

                        {/* Hidden Inputs */}

                        <input
                          type="hidden"
                          value={stdData._id}
                          {...register(`students.${index}.users`)}
                        />

                        <input
                          type="hidden"
                          value={stdData.fullName}
                          {...register(`students.${index}.name`)}
                        />

                        <input
                          type="hidden"
                          value={
                            stdData.studentProfile?.[0]?.department
                          }
                          {...register(
                            `students.${index}.department`
                          )}
                        />

                        <input
                          type="hidden"
                          value={
                            stdData.studentProfile?.[0]?.section
                          }
                          {...register(
                            `students.${index}.section`
                          )}
                        />

                        <input
                          type="hidden"
                          value={
                            stdData.studentProfile?.[0]?.classname
                          }
                          {...register(
                            `students.${index}.classname`
                          )}
                        />

                        <input
                          type="hidden"
                          value={
                            stdData.studentProfile?.[0]?.semesterNo
                          }
                          {...register(
                            `students.${index}.semesterNo`
                          )}
                        />

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            {/* Submit Section */}

            <div className="p-6 sm:p-8 border-t border-slate-800">

              {/* Subject */}

              <div className="mb-6">

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  disabled={isSubmitting}
                  {...register("subjectName", {
                    required: "Subject Name is required",
                  })}
                  placeholder="Enter Subject Name"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                />

                {errors.subjectName && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.subjectName.message}
                  </p>
                )}

              </div>

              {/* Attendance Error */}

              {attendanceError && (
                <div className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20">

                  <span className="text-lg">
                    ⚠️
                  </span>

                  <div>

                    <p className="text-red-400 text-sm font-medium">
                      Attendance could not be submitted
                    </p>

                    <p className="text-red-400/80 text-xs mt-1">
                      {attendanceError}
                    </p>

                  </div>

                </div>
              )}

              {/* Validation Error */}

              {Object.keys(errors).length > 0 && (
                <div className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-amber-500/10 border border-amber-500/20">

                  <span className="text-lg">
                    ⚠️
                  </span>

                  <p className="text-amber-400 text-sm">
                    Please select an attendance status for every
                    student before submitting.
                  </p>

                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-base shadow-lg shadow-emerald-900/20 transition-all duration-300"
              >

                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">

                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>

                    Submitting Attendance...

                  </span>
                ) : (
                  "✅ Submit Attendance"
                )}

              </button>

            </div>

          </form>
        )}

      </div>

    </div>
  );
}

export default MarksAttendance;