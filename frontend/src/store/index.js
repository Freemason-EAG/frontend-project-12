import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice.js'
import channelsReducer from './slices/channelsSlice.js'

export default configureStore({
    reducer: {
        auth: authReducer,
        channels: channelsReducer,

    },
})