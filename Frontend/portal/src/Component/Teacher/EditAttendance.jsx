import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router";
import axios from "axios";

function EditAttendance() {
  const location = useLocation();
  const student = location.state?.student;
  const { teacherId, studentId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const EditAttendance = async (data) => {
    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setIsLoading(true);

      const response = await axios.patch(
        `http://localhost:4000/api/v1/attendance/${teacherId}/${studentId}/edit-attendance`,
        data,
        {
          withCredentials: true,
        }
      );

      setSuccessMessage(
        response?.data?.message || "Attendance updated successfully."
      );
    } catch (error) {
      const statusCode = error?.response?.status;

      let message = "Unable to update attendance. Please try again.";

      if (statusCode === 400) {
        message =
          error?.response?.data?.message ||
          "Invalid attendance information. Please check your selection.";
      } else if (statusCode === 401) {
        message = "Your session has expired. Please login again.";
      } else if (statusCode === 403) {
        message =
          error?.response?.data?.message ||
          "You are not authorized to update this attendance.";
      } else if (statusCode === 404) {
        message =
          error?.response?.data?.message ||
          "Student or attendance record was not found.";
      } else if (statusCode >= 500) {
        message = "Server error. Please try again later.";
      } else if (!error?.response) {
        message =
          "Unable to connect to the server. Please check your internet connection.";
      } else {
        message =
          error?.response?.data?.message ||
          "Something went wrong while updating attendance.";
      }

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    if (!errorMessage) return;

    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  // Student data missing
  if (!student) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-800 border border-red-500/20 rounded-2xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl">
            ⚠️
          </div>

          <h2 className="text-xl font-bold text-white">
            Student Information Unavailable
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            We couldn't find the student information required to edit
            attendance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-bold text-purple-300 mb-6 flex items-center gap-2">
          <span>📝</span>

          Edit Attendance for

          <span className="ml-2 text-white">
            {student?.fullName || "Student"}
          </span>
        </h2>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-4 rounded-xl shadow-lg">
            <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center text-lg">
              ✓
            </div>

            <div>
              <p className="font-semibold">Attendance Updated</p>

              <p className="text-sm text-green-400/80">
                {successMessage}
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl shadow-lg">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-red-500/10 flex items-center justify-center text-lg">
              !
            </div>

            <div>
              <p className="font-semibold">
                Unable to Update Attendance
              </p>

              <p className="text-sm text-red-400/80 mt-1">
                {errorMessage}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(EditAttendance)}>

          {/* Attendance Table */}
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full text-sm text-left">

              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="px-6 py-3 font-semibold">
                    Full Name
                  </th>

                  <th className="px-6 py-3 font-semibold">
                    Class
                  </th>

                  <th className="px-6 py-3 font-semibold">
                    Department
                  </th>

                  <th className="px-6 py-3 font-semibold">
                    Semester
                  </th>

                  <th className="px-6 py-3 font-semibold text-center">
                    Present
                  </th>

                  <th className="px-6 py-3 font-semibold text-center">
                    Absent
                  </th>

                  <th className="px-6 py-3 font-semibold text-center">
                    Leave
                  </th>
                </tr>
              </thead>

              <tbody className="bg-gray-800 divide-y divide-gray-700">

                <tr>

                  <td className="px-6 py-4 font-medium">
                    {student?.fullName || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {student?.studentProfile?.[0]?.classname || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {student?.studentProfile?.[0]?.department || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {student?.studentProfile?.[0]?.semesterNo || "N/A"}
                  </td>

                  {/* Status */}
                  {["present", "absent", "leave"].map((status) => (
                    <td
                      className="px-4 py-4 text-center"
                      key={status}
                    >
                      <input
                        type="radio"
                        value={status}
                        {...register("status", {
                          required: "Please select attendance status.",
                        })}
                        disabled={isLoading}
                        className={`w-5 h-5 transition-transform hover:scale-110 ${
                          status === "present"
                            ? "accent-green-500"
                            : status === "absent"
                            ? "accent-red-500"
                            : "accent-yellow-500"
                        }`}
                      />
                    </td>
                  ))}

                </tr>

              </tbody>

            </table>
          </div>

          {/* Validation Error */}
          {errors.status && (
            <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
              <span>⚠️</span>
              <span>{errors.status.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">

            <button
              type="submit"
              disabled={isLoading}
              className={`font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${
                isLoading
                  ? "bg-purple-900/60 text-purple-300 cursor-not-allowed"
                  : "bg-purple-700 hover:bg-purple-800 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-purple-300 border-t-transparent rounded-full animate-spin"></span>

                  Updating...
                </>
              ) : (
                <>
                  <span>✓</span>
                  Update Attendance
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditAttendance;