import axios from "axios";
import React, { useState, useEffect } from "react";

function GetStudentResult() {
  const [resultData, setResultData] = useState([]);
  const [totalResult, setTotalResult] = useState([]);

  const getResultData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/result/get-result`,
        {
          withCredentials: true,
        }
      );
      console.log("API Response", response.data.data);
      setResultData(response.data.findData);
      setTotalResult(response.data.totalResultMarks);
    } catch (error) {
      console.log("ERROR In Get the Student Result", error);
    }
  };

  useEffect(() => {
    getResultData();
  }, []);

  if (!resultData.length) return <p className="text-center mt-10 text-gray-500">Loading student result...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Student Results
      </h1>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Subject Name</th>
              <th className="py-3 px-4 text-center">Assignment Marks</th>
              <th className="py-3 px-4 text-center">Mid Marks</th>
              <th className="py-3 px-4 text-center">Final Marks</th>
            </tr>
          </thead>
          <tbody>
            {resultData.map((data, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{data.subjectName}</td>
                <td className="py-3 px-4 text-center">
                  {data.results?.[0]?.assignmentMarks ?? "-"}
                </td>
                <td className="py-3 px-4 text-center">
                  {data.results?.[0]?.midMarks ?? "-"}
                </td>
                <td className="py-3 px-4 text-center">
                  {data.results?.[0]?.finalMarks ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overall Result */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Overall Performance
        </h2>
        {totalResult.map((totalData, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b py-2 text-gray-700"
          >
            <span>Total Marks Obtained:</span>
            <span className="font-semibold text-blue-600">
              {totalData?.totalObtaniedMarks}
            </span>
            <span>Percentage:</span>
            <span className="font-semibold text-green-600">
              {totalData?.totalPercentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetStudentResult;