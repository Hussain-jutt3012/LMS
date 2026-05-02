import React from "react"
import { useParams, useLocation } from "react-router"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"


function BlockStudent() {
    const { userId, studentid } = useParams()
    console.log("StudentId", studentid)
    const location = useLocation()
    const { handleSubmit } = useForm()
    const [block, setBlock] = useState(false)
    const [blocks, setBlocks] = useState(false)

    const studentdata = location?.state?.student

    const EditStudent = async (data) => {
        try {
            const response = await axios.post(
                `http://localhost:4000/api/v1/users/${userId}/${studentid}/portal-block`,
                data,
                {
                    withCredentials: true,
                }
            )
            const { isBlock } = response.data?.data || {}

            if (isBlock === true) {
                setBlocks(false)
            } else {
                setBlocks(true)
            }

            setBlock(true)

            console.log(response, "response")
        } catch (error) {
            console.log("ERROR IS USER BLOCKING", error)
        }
    }

    useEffect(() => {
        if (block) {
            const timer = setTimeout(() => {
                setBlock(false)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [block])

    if (block) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
                <div className="text-4xl font-bold text-green-600 bg-green-100 px-10 py-6 rounded-xl shadow-lg transition-opacity duration-1000 opacity-100 animate-fade">
                     Student Status update Successfully
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Student Information
                </h2>

                <form onSubmit={handleSubmit(EditStudent)}>
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="py-2 px-4 border">Full Name</th>
                                <th className="py-2 px-4 border">Department</th>
                                <th className="py-2 px-4 border">Class</th>
                                <th className="py-2 px-4 border">Section</th>
                                <th className="py-2 px-4 border">Semester</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center">
                                <td className="py-2 px-4 border">{studentdata?.fullName}</td>
                                <td className="py-2 px-4 border">
                                    {studentdata?.studentProfile?.[0]?.department}
                                </td>
                                <td className="py-2 px-4 border">
                                    {studentdata?.studentProfile?.[0]?.classname}
                                </td>
                                <td className="py-2 px-4 border">
                                    {studentdata?.studentProfile?.[0]?.section}
                                </td>
                                <td className="py-2 px-4 border">
                                    {studentdata?.studentProfile?.[0]?.semesterNo}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex justify-center gap-6 mt-6">

                        {
                            blocks ? (
                                <button
                                    type="submit"
                                    name="action"
                                    value="block"
                                    className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
                                >
                                    Block
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    name="action"
                                    value="unblock"
                                    className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
                                >
                                    Unblock
                                </button>
                            )
                        }

                    </div>
                </form>
            </div>
        </div>
    )
}

export default BlockStudent