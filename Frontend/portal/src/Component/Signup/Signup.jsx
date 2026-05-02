import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

function Signup() {
    const { userId } = useParams()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const role = watch("role")
    const [errorMsg, setErrorMsg] = useState("")

    const SingUpData = async (data) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/v1/users/${userId}/register-user`, data , {
                withCredentials: true
            })
            console.log(response.data.data)
           
            setErrorMsg("")
            alert("User created successfully!")
        } catch (error) {
            console.log("ERROR IN USER Signup", error)
            setErrorMsg(error?.response?.data?.message || "Signup failed")
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
            <div className="bg-gray-800 shadow-2xl rounded-2xl px-10 py-12 w-full max-w-2xl text-white">
                <h2 className="text-4xl font-bold text-center text-indigo-400 mb-8">Create New User</h2>

                {errorMsg && (
                    <div className="bg-red-500 text-white text-center py-2 rounded mb-4 text-sm">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit(SingUpData)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="col-span-full">
                        <input
                            type="text"
                            placeholder="Full Name"
                            {...register("fullName", { required: "Full name is required" })}
                            className="input-field"
                        />
                        {errors.fullName && <p className="error">{errors.fullName.message}</p>}
                    </div>

                    <div>
                        <input placeholder="Username" {...register("username", { required: "Username is required" })} className="input-field" />
                        {errors.username && <p className="error">{errors.username.message}</p>}
                    </div>

                    <div>
                        <input type="email" placeholder="Email" {...register("email", { required: "Email is required" })} className="input-field" />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div>
                        <input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} className="input-field" />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>

                    <div>
                        <select {...register("role", { required: "Role is required" })} className="input-field">
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                        {errors.role && <p className="error">{errors.role.message}</p>}
                    </div>

                    {/* STUDENT FIELDS */}
                    {role === "student" && (
                        <>
                            <div>
                                <input placeholder="Class Name" {...register("classname", { required: true })} className="input-field" />
                                {errors.classname && <p className="error">Class name is required</p>}
                            </div>
                            <div>
                                <input placeholder="Section" {...register("section", { required: true })} className="input-field" />
                                {errors.section && <p className="error">Section is required</p>}
                            </div>
                            <div>
                                <input placeholder="Batch Year" {...register("batchYear", { required: true })} className="input-field" />
                                {errors.batchYear && <p className="error">Batch Year is required</p>}
                            </div>
                            <div>
                                <input placeholder="Semester No" {...register("semesterNo", { required: true })} className="input-field" />
                                {errors.semesterNo && <p className="error">Semester No is required</p>}
                            </div>
                            <div className="col-span-full">
                                <input placeholder="Department" {...register("department", { required: true })} className="input-field" />
                                {errors.department && <p className="error">Department is required</p>}
                            </div>
                        </>
                    )}

                    {/* TEACHER FIELDS */}
                    {role === "teacher" && (
                        <>
                            <div>
                                <input placeholder="Teaching Subject" {...register("teachingSubject", { required: true })} className="input-field" />
                                {errors.teachingSubject && <p className="error">Teaching subject is required</p>}
                            </div>
                            <div>
                                <input placeholder="Teacher Department" {...register("teacherDepartment", { required: true })} className="input-field" />
                                {errors.teacherDepartment && <p className="error">Department is required</p>}
                            </div>
                            <div>
                                <input placeholder="Class Assigned" {...register("classAssigned", { required: true })} className="input-field" />
                                {errors.classAssigned && <p className="error">Class is required</p>}
                            </div>
                            <div>
                                <input placeholder="Section Assigned" {...register("sectionAssigned", { required: true })} className="input-field" />
                                {errors.sectionAssigned && <p className="error">Section is required</p>}
                            </div>
                            <div className="col-span-full">
                                <input placeholder="Semester No Assigned" {...register("semsterNoAssigned", { required: true })} className="input-field" />
                                {errors.semsterNoAssigned && <p className="error">Semester No is required</p>}
                            </div>
                        </>
                    )}

                    <div className="col-span-full">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md text-white font-semibold transition duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup