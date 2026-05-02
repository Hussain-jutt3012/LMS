import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function MarksAttendance() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { userId } = useParams();
  const [studentData, setStudentData] = useState([]);
  const [markedAttendance, setMarkedAttendance] = useState(false);

  const attendanceData = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/attendance/${userId}/attendance-mark`,
        data,
        { withCredentials: true }
      );
      setStudentData(response.data.data.studentList);
    } catch (error) {
      console.error("ERROR IN ATTENDANCE MARK", error);
    }
  };

  const MarkAttendance = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/attendance/${userId}/mark-Attendance`,
        data,
        { withCredentials: true }
      );
      console.log("Attendance Response", response.data);
      setMarkedAttendance(true);
    } catch (error) {
      console.error("ERROR IN MARK THE ATTENDANCE", error);
    }
  };

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (markedAttendance) {
      const timer = setTimeout(() => {
        setMarkedAttendance(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [markedAttendance]);

  if (markedAttendance) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-4xl font-bold text-green-600 bg-green-100 px-10 py-6 rounded-xl shadow-lg transition-opacity duration-1000 opacity-100 animate-fade">
          ✅ Attendance Marked Successfully
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-white to-purple-200 dark:from-gray-900 dark:to-gray-950 p-6">
      {/* Search Form */}
      <form onSubmit={handleSubmit(attendanceData)} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 text-center mb-6">🎯 Search Students</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: 'subjectName', placeholder: 'Subject Name' },
            { name: 'classname', placeholder: 'Class Name' },
            { name: 'section', placeholder: 'Section' },
            { name: 'department', placeholder: 'Department' },
            { name: 'semsterNo', placeholder: 'Semester No', type: 'number' }
          ].map((field, i) => (
            <div key={i}>
              <input
                type={field.type || 'text'}
                {...register(field.name, { required: `${field.placeholder} is required` })}
                placeholder={field.placeholder}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 transition"
              />
              {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]?.message}</p>}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 mx-auto block shadow-md"
        >
          🔍 Search
        </button>
      </form>

      {/* Attendance Table */}
      {studentData.length > 0 && (
        <form onSubmit={handleSubmit(MarkAttendance)} className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-7xl mx-auto space-y-8">
          <h3 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 text-center">📝 Mark Attendance</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300 border rounded-xl overflow-hidden">
              <thead className="bg-purple-700 text-white sticky top-0">
                <tr>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Semester</th>
                  <th className="py-3 px-4 text-center">Present</th>
                  <th className="py-3 px-4 text-center">Absent</th>
                  <th className="py-3 px-4 text-center">Leave</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((stdData, index) => (
                  <tr key={stdData._id} className={`border-b dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                    <td className="py-3 px-4 font-medium">{stdData.fullName}</td>
                    <td className="py-3 px-4">{stdData.studentProfile?.[0]?.classname || 'N/A'}</td>
                    <td className="py-3 px-4">{stdData.studentProfile?.[0]?.department || 'N/A'}</td>
                    <td className="py-3 px-4">{stdData.studentProfile?.[0]?.semesterNo || 'N/A'}</td>

                    {['present', 'absent', 'leave'].map((status) => (
                      <td key={status} className="py-3 px-4 text-center">
                        <input
                          type="radio"
                          value={status}
                          {...register(`students.${index}.status`, { required: true })}
                          className={`w-5 h-5 transition-transform hover:scale-110 accent-${status === 'present' ? 'green' : status === 'absent' ? 'red' : 'yellow'}-600`}
                        />
                      </td>
                    ))}

                    <td className="py-3 px-4 text-center">
                      <Link
                        to={`/${userId}/${stdData._id}/edit-attendance`}
                        state={{ student: stdData }}   // ⬅️ Pass the data via state
                        className="text-blue-600 hover:underline font-medium"
                      >
                        ✏️ Edit
                      </Link>
                    </td>

                    {/* Hidden Inputs */}
                    <input type="hidden" value={stdData._id} {...register(`students.${index}.users`)} />
                    <input type="hidden" value={stdData.fullName} {...register(`students.${index}.name`)} />
                    <input type="hidden" value={stdData.studentProfile?.[0]?.department} {...register(`students.${index}.department`)} />
                    <input type="hidden" value={stdData.studentProfile?.[0]?.section} {...register(`students.${index}.section`)} />
                    <input type="hidden" value={stdData.studentProfile?.[0]?.classname} {...register(`students.${index}.classname`)} />
                    <input type="hidden" value={stdData.studentProfile?.[0]?.semesterNo} {...register(`students.${index}.semesterNo`)} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <input
              type="text"
              {...register("SubjectName", { required: "Subject Name is required" })}
              placeholder="Enter Subject Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.SubjectName && <p className="text-red-500 text-sm mt-1">{errors.SubjectName.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white py-3 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg"
          >
            ✅ Submit Attendance
          </button>
        </form>
      )}
    </div>
  );
}

export default MarksAttendance;
