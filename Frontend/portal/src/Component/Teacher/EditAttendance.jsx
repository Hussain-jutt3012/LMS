import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router';
import axios from 'axios';

function EditAttendance() {
  const location = useLocation();
  const student = location.state?.student;
  const { teacherId, studentId } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isEditAttedance, setEditAttendance] = useState(false)

  console.log(teacherId, "teahcerID")
  console.log(studentId, "studentID")

  const EditAttendance = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/attendance/${teacherId}/${studentId}/edit-attendance`,
        data,
        { withCredentials: true }
      );
      setEditAttendance(true)
      console.log("Updated Attendance:", response.data.data);
    } catch (error) {
      console.error("ERROR IN UPDATE THE ATTENDANCE", error.message);
    }
  };

  if (!student) {
    return <p className="text-center text-white mt-10">No student data passed.</p>;
  }

  useEffect(() => {
    if (isEditAttedance) {
      const timer = setTimeout(() => {
        setEditAttendance(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isEditAttedance]);

  if (isEditAttedance) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-4xl font-bold text-green-600 bg-green-100 px-10 py-6 rounded-xl shadow-lg transition-opacity duration-1000 opacity-100 animate-fade">
          ✅ Attendance Update Successfully
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-300 mb-6 flex items-center gap-2">
          <span>📝</span> Edit Attendance for <span className="ml-2 text-white">{student.fullName}</span>
        </h2>

        <form onSubmit={handleSubmit(EditAttendance)}>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="px-6 py-3 font-semibold">Full Name</th>
                  <th className="px-6 py-3 font-semibold">Class</th>
                  <th className="px-6 py-3 font-semibold">Department</th>
                  <th className="px-6 py-3 font-semibold">Semester</th>
                  <th className="px-6 py-3 font-semibold text-center">Present</th>
                  <th className="px-6 py-3 font-semibold text-center">Absent</th>
                  <th className="px-6 py-3 font-semibold text-center">Leave</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 font-medium">{student.fullName}</td>
                  <td className="px-6 py-4">{student.studentProfile[0]?.classname}</td>
                  <td className="px-6 py-4">{student.studentProfile[0]?.department}</td>
                  <td className="px-6 py-4">{student.studentProfile[0]?.semesterNo}</td>
                  {['present', 'absent', 'leave'].map((status, index) => (
                    <td className="px-4 py-4 text-center" key={status}>
                      <input
                        type="radio"
                        value={status}
                        key={index}
                        {...register(`status`, { required: true })}
                        className={`w-5 h-5 transition-transform hover:scale-110 accent-${status === 'present'
                            ? 'green'
                            : status === 'absent'
                              ? 'red'
                              : 'yellow'
                          }-500`}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2"
            >
              ✅ Update Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAttendance;
