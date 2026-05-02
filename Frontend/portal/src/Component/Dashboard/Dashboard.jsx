import React from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

function Dashboard() {

  const rolecontrol = useSelector((state) => state.auth.user?.role)
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Admin Dashboard */}
      {rolecontrol === "admin" && (

        <div className="flex-1 p-10">
          <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
            <h1 className="text-3xl font-bold text-purple-700">Welcome back, Admin!</h1>
            <p className="text-gray-600 mt-2">Manage users and updates efficiently.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create Student or Teacher */}
            <Link
              to={`/${user._id}/signup`}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300"
            >
              <div className="text-4xl mb-3">➕👨‍🏫</div>
              <div className="text-xl font-semibold text-gray-800">Create Student or Teacher</div>
            </Link>

            {/* Delete Student */}
            <Link to={`/${user._id}/find-student`}>
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-3">🗑️👨‍🎓</div>
                <div className="text-xl font-semibold text-gray-800">Delete Student</div>
              </div>
            </Link>

            <Link
              to={`/${user._id}/block-portal`}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300"
            >
              <div className="text-4xl mb-3">➕👨‍🏫</div>
              <div className="text-xl font-semibold text-gray-800">Block and Unblock Student</div>
            </Link>

            {/* Update Student Profile */}
            <Link to={`/${user._id}/get-studentData`}>
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-3">✏️👨‍🎓</div>
                <div className="text-xl font-semibold text-gray-800">Get Enrolled the Student</div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Student Dashboard */}
      {rolecontrol === "student" && (
        <div className="flex-1 p-10 bg-gray-100">
          <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
            <h1 className="text-3xl font-bold text-indigo-700">Welcome, Student!</h1>
            <p className="text-gray-600 mt-2">Here’s your academic overview.</p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Attendance */}
            <Link to={`/get-attendance-data`}>
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-2">✅</div>
                <h2 className="text-xl font-semibold text-gray-800">View Attendance</h2>
                <p className="text-gray-500 text-sm">Track your class attendance records</p>

              </div>
            </Link>



            {/* Total Marks */}

            <Link to={`/get-result`}>
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-2">📊</div>
                <h2 className="text-xl font-semibold text-gray-800">Total Marks</h2>
                <p className="text-gray-500 text-sm">See your overall academic performance</p>
              </div>
            </Link>

            {/* Assignments */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-2">📝</div>
              <h2 className="text-xl font-semibold text-gray-800">Assignments</h2>
              <p className="text-gray-500 text-sm">View and submit assignment tasks</p>
            </div>

            {/* Enrolled Courses */}
            <Link to={`/get-enrolled-data`}>
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-2">📚</div>
              <h2 className="text-xl font-semibold text-gray-800">Enrolled Courses</h2>
              <p className="text-gray-500 text-sm">View your current enrolled subjects</p>
            </div>
            </Link>
          </div>
        </div>
      )
      }
      {
        rolecontrol === "teacher" && (
          <div className="flex-1 p-10 bg-gray-100">
            {/* Welcome Message */}
            <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
              <h1 className="text-3xl font-bold text-blue-700">Welcome, Teacher!</h1>
              <p className="text-gray-600 mt-2">Manage your students' records efficiently.</p>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Mark Attendance */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-2">✅</div>
                <Link to={`/${user._id}/attendance-mark`}>
                  <h2 className="text-xl font-semibold text-gray-800">Mark Attendance</h2>
                  <p className="text-gray-500 text-sm">Record student attendance daily</p>
                </Link>
              </div>

              {/* Add Mid-Term Marks */}
              <Link to={`/${user._id}/result-remarks`}>
                <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
                  <div className="text-4xl mb-2">🧪</div>
                  <h2 className="text-xl font-semibold text-gray-800">Add Mid-Term Marks</h2>
                  <p className="text-gray-500 text-sm">Submit mid-term exam results</p>
                </div>
              </Link>

              {/* Add Total Marks */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-2">📊</div>
                <h2 className="text-xl font-semibold text-gray-800">Add Total Marks</h2>
                <p className="text-gray-500 text-sm">Enter final total marks for students</p>
              </div>

              {/* Add Assignment Marks */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-2">📝</div>
                <h2 className="text-xl font-semibold text-gray-800">Add Assignment Marks</h2>
                <p className="text-gray-500 text-sm">Grade and record assignment scores</p>
              </div>

              {/* Add Quiz Marks */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-2">❓</div>
                <h2 className="text-xl font-semibold text-gray-800">Add Quiz Marks</h2>
                <p className="text-gray-500 text-sm">Enter quiz marks quickly</p>
              </div>

              {/* Edit Attendance */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-2">✏️✅</div>
                <Link to={`/${user._id}/edit-attendance`}>
                  <h2 className="text-xl font-semibold text-gray-800">Edit Attendance</h2>
                  <p className="text-gray-500 text-sm">Update or correct attendance records</p>
                </Link>
              </div>

              {/* Edit Marks */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-2">✏️📊</div>
                <h2 className="text-xl font-semibold text-gray-800">Edit Marks</h2>
                <p className="text-gray-500 text-sm">Modify student marks if needed</p>
              </div>

            </div>
          </div>

        )
      }
    </div >
  )
}

export default Dashboard
