import axios from "axios";
import React, { useEffect, useState } from "react";

function GetAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const getAttendanceData = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/attendance/get-attendance-data`,
        {
          withCredentials: true,
        }
      );

      const summary = response?.data?.data?.summary;

      if (!Array.isArray(summary)) {
        throw new Error("Invalid attendance data received");
      }

      setAttendanceData(summary);
    } catch (error) {
      let message = "Unable to load attendance records. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with an error
          message =
            error.response?.data?.message ||
            "Unable to load attendance records.";
        } else if (error.request) {
          // Request sent but no response received
          message =
            "Unable to connect to the server. Please check your connection.";
        } else {
          // Something went wrong while creating request
          message = "Something went wrong. Please try again.";
        }
      }

      setErrorMsg(message);
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAttendanceData();
  }, []);

  // ================= LOADING STATE =================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl animate-pulse">
            📊
          </div>

          <h2 className="text-white text-lg font-semibold">
            Loading Attendance
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            Fetching your attendance records...
          </p>
        </div>
      </div>
    );
  }

  // ================= ERROR STATE =================

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Decorations */}

        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

        <div className="relative w-full max-w-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
            {/* Error Icon */}

            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl mb-5">
              ⚠️
            </div>

            {/* Heading */}

            <h2 className="text-xl font-bold text-white">
              Unable to Load Attendance
            </h2>

            {/* Error Message */}

            <p className="text-slate-400 text-sm mt-3 leading-6">
              {errorMsg}
            </p>

            {/* Retry Button */}

            <button
              type="button"
              onClick={getAttendanceData}
              className="mt-6 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-950/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= EMPTY STATE =================

  if (attendanceData.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Decorations */}

        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

        <div className="relative w-full max-w-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl mb-5">
              📊
            </div>

            <h2 className="text-xl font-bold text-white">
              No Attendance Records
            </h2>

            <p className="text-slate-500 text-sm mt-3 leading-6">
              No attendance records are available for your account at the
              moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ================= CALCULATIONS =================

  const totalPresent = attendanceData.reduce(
    (total, item) => total + (Number(item.present) || 0),
    0
  );

  const totalAbsent = attendanceData.reduce(
    (total, item) => total + (Number(item.absent) || 0),
    0
  );

  const totalLeave = attendanceData.reduce(
    (total, item) => total + (Number(item.leave) || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden px-4 py-8 sm:px-6 lg:px-10">
      {/* ================= BACKGROUND DECORATIONS ================= */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}

        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-indigo-900/30">
          <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-white/10"></div>

          <div className="absolute right-24 -bottom-20 w-44 h-44 rounded-full bg-white/10"></div>

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-lg">
                📊
              </div>

              <div>
                <p className="text-indigo-100 text-sm font-medium tracking-wider">
                  STUDENT PORTAL
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold">
                  Attendance Report
                </h1>

                <p className="text-indigo-100 text-sm sm:text-base mt-1">
                  Track your attendance across all subjects.
                </p>
              </div>
            </div>

            {/* Total Subjects */}

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl">
              <div className="text-2xl">📚</div>

              <div>
                <p className="text-indigo-100 text-xs">Total Subjects</p>

                <p className="text-xl font-bold">{attendanceData.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {/* Present */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total Present</p>

                <h2 className="text-2xl font-bold text-green-400 mt-1">
                  {totalPresent}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xl">
                ✅
              </div>
            </div>
          </div>

          {/* Absent */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total Absent</p>

                <h2 className="text-2xl font-bold text-red-400 mt-1">
                  {totalAbsent}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl">
                ❌
              </div>
            </div>
          </div>

          {/* Leave */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total Leave</p>

                <h2 className="text-2xl font-bold text-yellow-400 mt-1">
                  {totalLeave}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-xl">
                🟡
              </div>
            </div>
          </div>
        </div>

        {/* ================= ATTENDANCE TABLE ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Table Header */}

          <div className="px-6 sm:px-8 py-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
                📋
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Subject-wise Attendance
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Detailed attendance record for each subject.
                </p>
              </div>
            </div>
          </div>

          {/* Responsive Table */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-slate-800/70 border-b border-slate-700">
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Code
                  </th>

                  <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Classes
                  </th>

                  <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Present
                  </th>

                  <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Absent
                  </th>

                  <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Leave
                  </th>

                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold min-w-[220px]">
                    Attendance
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendanceData.map((item, index) => (
                  <tr
                    key={item?.subjectDetails?._id || index}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition duration-200"
                  >
                    {/* Subject */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold shadow-lg">
                          {item?.subjectDetails?.subjectName
                            ?.charAt(0)
                            ?.toUpperCase() || "S"}
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {item?.subjectDetails?.subjectName || "N/A"}
                          </p>

                          <p className="text-xs text-slate-500">
                            Academic Subject
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Code */}

                    <td className="px-6 py-5">
                      <span className="inline-flex px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-indigo-300 text-sm font-medium">
                        {item?.subjectDetails?.subjectCode || "N/A"}
                      </span>
                    </td>

                    {/* Total Classes */}

                    <td className="px-6 py-5 text-center">
                      <span className="text-slate-300 font-semibold">
                        {item?.totalClasses ?? 0}
                      </span>
                    </td>

                    {/* Present */}

                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex min-w-[42px] justify-center px-2 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 font-semibold">
                        {item?.present ?? 0}
                      </span>
                    </td>

                    {/* Absent */}

                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex min-w-[42px] justify-center px-2 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-semibold">
                        {item?.absent ?? 0}
                      </span>
                    </td>

                    {/* Leave */}

                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex min-w-[42px] justify-center px-2 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-semibold">
                        {item?.leave ?? 0}
                      </span>
                    </td>

                    {/* Percentage */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-800 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${Math.min(
                                Math.max(
                                  Number(item?.attendancePercentage) || 0,
                                  0
                                ),
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>

                        <span className="text-sm font-bold text-indigo-300 min-w-[48px] text-right">
                          {Number(item?.attendancePercentage) || 0}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}

          <div className="px-6 sm:px-8 py-5 border-t border-slate-800 bg-slate-900/70">
            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                Present
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                Absent
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                Leave
              </div>

              <div className="ml-auto">
                Attendance records: {attendanceData.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetAttendance;