import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router"

function AuthLayout({authentication = true, children}) {
    const [Loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    useEffect(() => {
        if(authentication && authStatus !== authentication){
           navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            useNavigate("/")
            setLoader(false)
        }
    }, [authStatus, navigate, authentication])
    return Loader ? (<div>Loading</div>) : ({children})
}

export default AuthLayout
