import React, { useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router"
import { useForm } from "react-hook-form"


function FetchAllStudent() {
  const [allStudent, setAllStudent] = useState([])
  const { handleSubmit, register } = useForm()
  const { userId } = useParams()

  const fetchStudentData = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/users/${userId}/block-portal`,
        data,
        {
          withCredentials: true,
        }
      )
      setAllStudent(response.data.data)
    } catch (error) {
      console.log("Error in Get the student", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Search Form */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Search Students
        </h2>
        <form
          onSubmit={handleSubmit(fetchStudentData)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            placeholder="Department"
            {...register("department", { required: "Department is required" })}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Classname"
            {...register("classname", { required: "Classname is required" })}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Section"
            {...register("section", { required: "Section is required" })}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Semester No"
            {...register("semesterNo", { required: "Semester is required" })}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Student Table */}
      {allStudent.length > 0 && (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Student Results
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Full Name</th>
                  <th className="px-4 py-2 text-left">Department</th>
                  <th className="px-4 py-2 text-left">Class</th>
                  <th className="px-4 py-2 text-left">Section</th>
                  <th className="px-4 py-2 text-left">Semester</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {allStudent.map((data) => (
                  <tr
                    key={data._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{data?.fullName}</td>
                    <td className="px-4 py-2">
                      {data.studentProfile?.[0]?.department}
                    </td>
                    <td className="px-4 py-2">
                      {data.studentProfile?.[0]?.classname}
                    </td>
                    <td className="px-4 py-2">
                      {data.studentProfile?.[0]?.section}
                    </td>
                    <td className="px-4 py-2">
                      {data.studentProfile?.[0]?.semesterNo}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/${userId}/${data._id}/delte-Student`}
                        state={{ studentdelete: data }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View 
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default FetchAllStudent
