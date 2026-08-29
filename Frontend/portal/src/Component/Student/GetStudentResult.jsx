import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

function GetStudentResult() {
  const [resultData, setResultData] = useState([]);
  const [totalResult, setTotalResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const getResultData = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/result/get-result`,
        {
          withCredentials: true,
        }
      );

      const data = response?.data;

      if (!data) {
        throw new Error("INVALID_RESPONSE");
      }

      const results = Array.isArray(data?.findData)
        ? data.findData
        : [];

      const totals = Array.isArray(data?.totalResultMarks)
        ? data.totalResultMarks
        : [];

      setResultData(results);
      setTotalResult(totals);
    } catch (error) {
      let message =
        "Unable to load your academic results. Please try again.";

      if (error?.response) {
        const status = error.response.status;

        switch (status) {
          case 400:
            message =
              error?.response?.data?.message ||
              "Invalid request. Please try again.";

            break;

          case 401:
            message =
              "Your session has expired. Please log in again.";

            break;

          case 403:
            message =
              "You are not authorized to view these results.";

            break;

          case 404:
            message =
              "No academic result record was found.";

            break;

          case 500:
            message =
              "Something went wrong on the server. Please try again later.";

            break;

          default:
            message =
              error?.response?.data?.message ||
              "Unable to load your academic results.";
        }
      } else if (error?.request) {
        message =
          "Unable to connect to the server. Please check your internet connection and try again.";
      } else if (error?.message === "INVALID_RESPONSE") {
        message =
          "The server returned an invalid response. Please try again later.";
      }

      setResultData([]);
      setTotalResult([]);
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getResultData();
  }, [getResultData]);

  /* ================= LOADING STATE ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center">

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl animate-pulse">
            📊
          </div>

          <h2 className="text-white text-lg font-semibold">
            Loading Results
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            Fetching your academic performance...
          </p>

        </div>
      </div>
    );
  }

  /* ================= ERROR STATE ================= */

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

        {/* Background Decorations */}

        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

        <div className="relative w-full max-w-md">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-4xl mb-6">
              ⚠️
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Unable to Load Results
            </h2>

            <p className="text-slate-400 text-sm leading-6 mt-3">
              {errorMsg}
            </p>

            <button
              type="button"
              onClick={getResultData}
              className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              🔄 Try Again
            </button>

          </div>

        </div>
      </div>
    );
  }

  /* ================= EMPTY STATE ================= */

  if (!resultData.length) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

        <div className="relative w-full max-w-md">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-4xl mb-6">
              📚
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white">
              No Results Available
            </h2>

            <p className="text-slate-500 text-sm leading-6 mt-3">
              Your academic results are not available at the moment.
              Please check again later.
            </p>

            <button
              type="button"
              onClick={getResultData}
              className="mt-6 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
            >
              🔄 Refresh Results
            </button>

          </div>

        </div>
      </div>
    );
  }

  const totalMarksObtained =
    totalResult?.[0]?.totalObtaniedMarks ?? "-";

  const overallPercentage =
    Number(totalResult?.[0]?.totalPercentage);

  const safePercentage = Number.isFinite(overallPercentage)
    ? Math.min(Math.max(overallPercentage, 0), 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden px-4 py-8 sm:px-6 lg:px-10">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-7 sm:p-9 mb-8 shadow-2xl shadow-indigo-900/30">

          <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-white/10" />

          <div className="absolute right-24 -bottom-20 w-44 h-44 rounded-full bg-white/10" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-lg">
                🎓
              </div>

              <div>

                <p className="text-indigo-100 text-sm font-medium tracking-wider">
                  STUDENT PORTAL
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold">
                  Academic Results
                </h1>

                <p className="text-indigo-100 text-sm sm:text-base mt-1">
                  View your subject-wise marks and overall performance.
                </p>

              </div>

            </div>

            {/* Subject Count */}

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl">

              <div className="text-2xl">
                📚
              </div>

              <div>

                <p className="text-indigo-100 text-xs">
                  Subjects
                </p>

                <p className="text-xl font-bold">
                  {resultData.length}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          {/* Total Subjects */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Total Subjects
                </p>

                <h2 className="text-2xl font-bold text-indigo-400 mt-1">
                  {resultData.length}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
                📚
              </div>

            </div>

          </div>


          {/* Total Marks */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Marks Obtained
                </p>

                <h2 className="text-2xl font-bold text-purple-400 mt-1">
                  {totalMarksObtained}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                🏆
              </div>

            </div>

          </div>


          {/* Percentage */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Overall Percentage
                </p>

                <h2 className="text-2xl font-bold text-green-400 mt-1">
                  {Number.isFinite(overallPercentage)
                    ? `${overallPercentage}%`
                    : "-"}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xl">
                📈
              </div>

            </div>

          </div>

        </div>


        {/* ================= RESULTS TABLE ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

          {/* Table Header */}

          <div className="px-6 sm:px-8 py-6 border-b border-slate-800">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
                📋
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Subject-wise Results
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Detailed marks for each subject.
                </p>

              </div>

            </div>

          </div>


          {/* Table */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[750px]">

              <thead>

                <tr className="bg-slate-800/70 border-b border-slate-700">

                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Assignment
                  </th>

                  <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Midterm
                  </th>

                  <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Final Term
                  </th>

                </tr>

              </thead>


              <tbody>

                {resultData.map((data, index) => (

                  <tr
                    key={data?._id || index}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition duration-200"
                  >

                    {/* Subject */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold shadow-lg">
                          {data?.subjectName
                            ?.charAt(0)
                            ?.toUpperCase() || "S"}
                        </div>

                        <div>

                          <p className="font-semibold text-white">
                            {data?.subjectName || "Unknown Subject"}
                          </p>

                          <p className="text-xs text-slate-500">
                            Academic Subject
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Assignment */}

                    <td className="px-6 py-5 text-center">

                      <span className="inline-flex min-w-[55px] justify-center px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold">
                        {data?.results?.[0]?.assignmentMarks ?? "-"}
                      </span>

                    </td>


                    {/* Midterm */}

                    <td className="px-6 py-5 text-center">

                      <span className="inline-flex min-w-[55px] justify-center px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold">
                        {data?.results?.[0]?.midMarks ?? "-"}
                      </span>

                    </td>


                    {/* Final */}

                    <td className="px-6 py-5 text-center">

                      <span className="inline-flex min-w-[55px] justify-center px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-semibold">
                        {data?.results?.[0]?.finalMarks ?? "-"}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* ================= OVERALL PERFORMANCE ================= */}

        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

          <div className="px-6 sm:px-8 py-6 border-b border-slate-800">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xl">
                🏆
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Overall Performance
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Your overall academic achievement.
                </p>

              </div>

            </div>

          </div>


          {totalResult.length > 0 ? (

            totalResult.map((totalData, index) => {

              const percentage = Number(
                totalData?.totalPercentage
              );

              const safeTotalPercentage =
                Number.isFinite(percentage)
                  ? Math.min(Math.max(percentage, 0), 100)
                  : 0;

              return (
                <div
                  key={totalData?._id || index}
                  className="p-6 sm:p-8"
                >

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Obtained Marks */}

                    <div className="relative overflow-hidden bg-slate-800/70 border border-slate-700 rounded-2xl p-6">

                      <div className="absolute -right-8 -top-8 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />

                      <div className="relative">

                        <div className="flex items-center gap-3 mb-3">

                          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            🏆
                          </div>

                          <p className="text-slate-400 text-sm">
                            Total Marks Obtained
                          </p>

                        </div>

                        <p className="text-3xl font-bold text-purple-400">
                          {totalData?.totalObtaniedMarks ?? "-"}
                        </p>

                      </div>

                    </div>


                    {/* Percentage */}

                    <div className="relative overflow-hidden bg-slate-800/70 border border-slate-700 rounded-2xl p-6">

                      <div className="absolute -right-8 -top-8 w-24 h-24 bg-green-500/10 rounded-full blur-xl" />

                      <div className="relative">

                        <div className="flex items-center gap-3 mb-3">

                          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                            📈
                          </div>

                          <p className="text-slate-400 text-sm">
                            Overall Percentage
                          </p>

                        </div>

                        <p className="text-3xl font-bold text-green-400">
                          {Number.isFinite(percentage)
                            ? `${percentage}%`
                            : "-"}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* Progress */}

                  <div className="mt-6">

                    <div className="flex justify-between mb-2">

                      <span className="text-sm text-slate-400">
                        Overall Performance
                      </span>

                      <span className="text-sm font-semibold text-green-400">
                        {Number.isFinite(percentage)
                          ? `${percentage}%`
                          : "-"}
                      </span>

                    </div>

                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-green-500 rounded-full transition-all duration-700"
                        style={{
                          width: `${safeTotalPercentage}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>
              );
            })

          ) : (

            <div className="p-8 text-center">

              <p className="text-slate-500 text-sm">
                Overall performance data is currently unavailable.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default GetStudentResult;