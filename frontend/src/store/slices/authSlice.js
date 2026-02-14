import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        removeUser: (state) => {
            state.user = null
            state.token = null 
        },
    },
})

export const { addUser, removeUser } = authSlice.actions
export default authSlice.reducer