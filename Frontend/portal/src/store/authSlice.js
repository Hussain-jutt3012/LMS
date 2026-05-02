import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    status: false,
}



export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers:{
        Login:(state, action) => {

            const {user, accessToken, refreshToken,} = action.payload

            state.user = user,
            state.accessToken = accessToken,
            state.refreshToken = refreshToken,
            state.status = true
            

        },

        Logout:(state) => {

            state.user = false,
            state.accessToken = false,
            state.refreshToken = false,
            state.status = false

        }
        
    }
})

export const {Login, Logout} = authSlice.actions

export default authSlice.reducer