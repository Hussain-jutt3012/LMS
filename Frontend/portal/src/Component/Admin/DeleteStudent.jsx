import React, { useState } from "react"
import axios from "axios"
import { useLocation, useParams } from "react-router"
import { useForm } from "react-hook-form"

function DeleteStudent() {
  const location = useLocation()
  const { handleSubmit, register } = useForm()
  const dldStudent = location?.state?.studentdelete
  const { userId, studentId } = useParams()
  const [show, setShow] = useState(false)

  const DeleteStudent = async (data) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/users/${userId}/${studentId}/delete-student`,
        {
          data,
          withCredentials: true,
        }
      )
      console.log(response.data.data)
    } catch (error) {
      console.log("ERROR IN USER DELETION", error)
    }
  }

  const UpdateStudent = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/users/${userId}/${studentId}/update-account`,
        data,
        {
          withCredentials: true,
        }
      )
      console.log(response.data.data)
    } catch (error) {
      console.log("ERROR In User Update", error)
    }
  }

  const clicked = () => setShow(!show)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6">
        {/* Student Details */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Student Details
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {dldStudent?.fullName || "N/A"}
          </p>
          <p>
            <span className="font-medium">Department:</span>{" "}
            {dldStudent?.studentProfile?.[0]?.department || "N/A"}
          </p>
          <p>
            <span className="font-medium">Class:</span>{" "}
            {dldStudent?.studentProfile?.[0]?.classname || "N/A"}
          </p>
          <p>
            <span className="font-medium">Semester:</span>{" "}
            {dldStudent?.studentProfile?.[0]?.semesterNo || "N/A"}
          </p>
        </div>

        {/* Delete Form */}
        <form onSubmit={handleSubmit(DeleteStudent)} className="mt-6">
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Delete Student
          </button>
        </form>

        {/* Update Button */}
        <button
          onClick={clicked}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          {show ? "Cancel Update" : "Update Student"}
        </button>

        {/* Update Form */}
        {show && (
          <form
            onSubmit={handleSubmit(UpdateStudent)}
            className="mt-6 space-y-4"
          >
            <input
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: "Username is required" })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Enter Full Name"
              {...register("fullName", { required: "FullName is required" })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default DeleteStudent
