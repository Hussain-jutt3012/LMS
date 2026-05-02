import React from "react";
import { useParams, useLocation } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";

function StudentEnrollement() {
  const { userId, studentId } = useParams();
  const location = useLocation();
  const data = location?.state?.studentData;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const StudentEnrollement = async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/enrollement/${userId}/${studentId}/get-student-enrollement`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("EnrollementData", response.data.data);
    } catch (error) {
      console.log("ERROR IN STUDENT ENROLLEMENT", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Student Enrollment
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enrolling: <span className="font-semibold">{data?.fullName}</span>
        </p>

        <form
          onSubmit={handleSubmit(StudentEnrollement)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              placeholder="e.g. Computer Science"
              {...register("department", { required: "Department is required" })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}
          </div>

          {/* Classname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Classname
            </label>
            <input
              placeholder="e.g. BSCS"
              {...register("classname", { required: "Classname is required" })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.classname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.classname.message}
              </p>
            )}
          </div>

          {/* Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section
            </label>
            <input
              placeholder="e.g. A"
              {...register("section", { required: "Section is required" })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.section && (
              <p className="text-red-500 text-sm mt-1">
                {errors.section.message}
              </p>
            )}
          </div>

          {/* Semester No */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semester No
            </label>
            <input
              type="number"
              placeholder="e.g. 5"
              {...register("semesterNo", { required: "Semester is required" })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.semesterNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.semesterNo.message}
              </p>
            )}
          </div>

          {/* Subjects */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subjects
            </label>
            <input
              placeholder="Enter subjects separated by spaces or commas"
              {...register("subjects", { required: "Subject is required" })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.subjects && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subjects.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Get Enrolled
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentEnrollement;
