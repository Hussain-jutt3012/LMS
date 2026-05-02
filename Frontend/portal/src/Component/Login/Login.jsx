import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import { Login as authLogin } from "../../store/authSlice"
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router'


function Login() {

    const [loading, setLoading] = useState(false)
    

    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const authData = async (data) => {
        try {
            setLoading(true)
            const response = await axios.post("http://localhost:4000/api/v1/users/login", data, {
                withCredentials: true
            })
            console.log(response, "response")

            const { accessToken, refreshToken, user } = response.data.data
            dispatch(authLogin({ accessToken, refreshToken, user}))

            navigate(`/dash/${user._id}`)

        } catch (error) {
            console.log("ERROR IN USER LOGIN", error)
        } finally {
            setLoading(false)
        }
    }

    return loading ? (
        <p className='text-4xl text-center font-bold mt-40 text-indigo-400'>Loading...</p>
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="bg-gray-800 shadow-2xl rounded-xl px-10 py-12 w-full max-w-md text-white">
                <h2 className="text-3xl font-extrabold text-center text-indigo-400 mb-8">Welcome Back</h2>

                <form onSubmit={handleSubmit(authData)} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                        <input
                            type="text"
                            {...register("username", { required: "Username is required" })}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-all duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
            
          
        </div>
    )
}

export default Login
