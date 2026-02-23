import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import routes from '../../utils/routes'

const { signupPath } = routes

export const fetchCreateNewUser = createAsyncThunk(
    'auth/fetchCreateNewuser',
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await axios.post(signupPath(), newUser)
            return response.data
        }
        catch (error) {
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data.message,
            })
        }
    }
)

const initialState = {
    user: null,
    token: null,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload.username
            state.token = action.payload.token
        },
        removeUser: (state) => {
            state.user = null
            state.token = null 
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCreateNewUser.pending, (state) => {
            state.user = null
            state.token = null
            state.error = null
        })
        builder.addCase(fetchCreateNewUser.fulfilled, (state, action) => {
            state.user = action.payload.username
            state.token = action.payload.token
            state.error = null
        })
        builder.addCase(fetchCreateNewUser.rejected, (state, action) => {
            state.user = null
            state.token = null
            state.error = action.error.message
        })
    }
})

export const { addUser, removeUser } = authSlice.actions
export default authSlice.reducer