import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    status: false,
    isLoading: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        Login: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;

            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.status = true;
        },

        Logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.status = false;
            state.isLoading = false;
        },

        SetAuthLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const {
    Login,
    Logout,
    SetAuthLoading,
} = authSlice.actions;

export default authSlice.reducer;