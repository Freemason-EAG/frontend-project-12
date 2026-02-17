import { 
    createSlice, 
    createEntityAdapter, 
    createAsyncThunk, 
} from "@reduxjs/toolkit"
import axios from 'axios'
import routes from '../../utils/routes.js'

const { messagesPath, messagePath } = routes

export const fetchGetMessages = createAsyncThunk(
    'messages/fetchGetMessages',
    async (_, { getState}) => {
        const token = getState().auth.token
        const response = await axios.get(messagesPath(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    }
)

export const fetchAddMessage = createAsyncThunk(
    'messages/fetchAddMessage',
    async (newMessage, { getState }) => {
        const token = getState().auth.token
        const response = await axios.post(messagesPath(), newMessage, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    }
)

export const fetchEditMessage = createAsyncThunk(
    'messages/fetchEditMessage',
    async ({id, body }, { getState }) => {
        const token = getState().auth.token
        const response = await axios.patch(messagePath(id), { body }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    }
)

export const fetchRemoveMessage = createAsyncThunk(
    'messages/fetchRemoveMessage',
    async (id, { getState }) => {
        const token = getState().auth.token
        const response = await axios.delete(messagePath(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    }
)

const messagesAdapter = createEntityAdapter()
const initialState = messagesAdapter.getInitialState({
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
})

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: messagesAdapter.addOne,
        addMessages: messagesAdapter.addMany,
        removeMessage: messagesAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetMessages.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchGetMessages.fulfilled, (state, action) => {
            messagesAdapter.setAll(state, action.payload)
            state.status = 'succeeded'
            state.error = null
        })
        builder.addCase(fetchGetMessages.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })

        builder.addCase(fetchAddMessage.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchAddMessage.fulfilled, (state, action) => {
            messagesAdapter.addOne(state, action.payload)
            state.status = 'succeeded'
            state.error = null
        })
        builder.addCase(fetchAddMessage.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })

        builder.addCase(fetchEditMessage.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchEditMessage.fulfilled, (state, action) => {
            messagesAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload,   
            })
            state.status = 'succeeded'
            state.error = null
        })
        builder.addCase(fetchEditMessage.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })

        builder.addCase(fetchRemoveMessage.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchRemoveMessage.fulfilled, (state, action) => {
            messagesAdapter.removeOne(state, action.payload.id)
            state.status = 'succeeded'
            state.error = null
        })
        builder.addCase(fetchRemoveMessage.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const selectors = messagesAdapter.getSelectors(state => state.messages)
export const { addMessage, addMessages, removeMessage } = messagesSlice.actions
export default messagesSlice.reducer