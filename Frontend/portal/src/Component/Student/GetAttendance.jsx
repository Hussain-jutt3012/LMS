import axios from "axios";
import React, { useEffect, useState } from "react";

function GetAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);

  const getAttendanceData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/attendance/get-attendance-data",
        { withCredentials: true }
      );
      console.log("📌 API Response:", response.data);
      setAttendanceData(response.data.data.summary); 
    } catch (error) {
      console.error("❌ ERROR IN GET ATTENDANCE DATA", error);
    }
  };

  useEffect(() => {
    getAttendanceData();
  }, []);

  if (!attendanceData.length) return <p className="text-center mt-6">Loading attendance data...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        📊 Student Attendance Report
      </h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Total Classes</th>
              <th className="px-4 py-3">Present</th>
              <th className="px-4 py-3">Absent</th>
              <th className="px-4 py-3">Leave</th>
              <th className="px-4 py-3">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">{item.subjectDetails?.subjectName}</td>
                <td className="px-4 py-3">{item.subjectDetails?.subjectCode}</td>
                <td className="px-4 py-3">{item.totalClasses}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">
                  {item.present}
                </td>
                <td className="px-4 py-3 text-red-600 font-semibold">
                  {item.absent}
                </td>
                <td className="px-4 py-3 text-yellow-600 font-semibold">
                  {item.leave}
                </td>
                <td className="px-4 py-3">
                  <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-green-500 h-5 text-center text-white text-xs font-bold flex items-center justify-center"
                      style={{ width: `${item.attendancePercentage}%` }}
                    >
                      {item.attendancePercentage}%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetAttendance;
