import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({ 
    name: 'auth',
    initialState: { 
        email: '',
        pwd:'',
        token: null 
    },
    reducers: {
        setCredentials: (state, action) => {
            const { email,pwd, accessToken,role } = action.payload
            state.token = accessToken
            state.email = email
            state.pwd = pwd
            state.role = role
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials,logOut } = authSlice.actions

export default authSlice.reducer

export const selectToken = (state) => state.auth.token
export const selectRole = (state) => state.auth.role
export const selectPwd = (state) => state.auth.pwd
export const selectEmail = (state) => state.auth.email