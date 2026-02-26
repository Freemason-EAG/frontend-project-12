import { 
    createSlice, 
    createEntityAdapter, 
    createAsyncThunk, 
} from "@reduxjs/toolkit"
import axios from 'axios'
import routes from '../../utils/routes.js'

const {channelsPath, channelPath } = routes

export const fetchGetChannels = createAsyncThunk(
    'channels/fetchGetChannels',
    async (_, { getState }) => {
        const token = getState().auth.token
        const response = await axios.get(channelsPath(), {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        return response.data
    }
)

export const fetchAddChannel = createAsyncThunk(
    'channels/fetchAddChannel',
    async (name, { getState }) => {
        const token = getState().auth.token
        const response = await axios.post(channelsPath(), { name }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    }
)

export const fetchEditChannel = createAsyncThunk(
    'channels/fetchEditChannel',
    async ({ id, name }, { getState }) => {
        const token = getState().auth.token
        const response = await axios.patch(channelPath(id), { name }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    }
)

export const fetchRemoveChannel = createAsyncThunk(
    'channels/fetchRemoveChannel',
    async (id, { getState }) => {
        const token = getState().auth.token
        const response = await axios.delete(channelPath(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    }
)

const channelsAdapter = createEntityAdapter()
const initialState = channelsAdapter.getInitialState({
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
    currentChannelId: null,
})

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: channelsAdapter.addOne,
        addChannels: channelsAdapter.addMany,
        removeChannel: channelsAdapter.removeOne,
        updateChannel: channelsAdapter.updateOne,
        setCurrentChannel: (state, action) => {
            state.currentChannelId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetChannels.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchGetChannels.fulfilled, (state, action) => {
            channelsAdapter.setAll(state, action.payload)
            state.status = 'succeeded'
            state.error = null
            const defaultChannel = action.payload.find(channel => channel.name === 'general')
            if (defaultChannel) state.currentChannelId = defaultChannel.id
        })
        builder.addCase(fetchGetChannels.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })

        builder.addCase(fetchAddChannel.pending, (state) => {
            // state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchAddChannel.fulfilled, (state, action) => {
            channelsAdapter.addOne(state, action.payload)
            // state.status = 'succeeded'
            // state.error = null
        })
        builder.addCase(fetchAddChannel.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })

        builder.addCase(fetchEditChannel.pending, (state) => {
            // state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchEditChannel.fulfilled, (state, action) => {
            channelsAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload,
            })
            // state.status = 'succeeded'
            // state.error = null
        })
        builder.addCase(fetchEditChannel.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })

        builder.addCase(fetchRemoveChannel.pending, (state) => {
            // state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchRemoveChannel.fulfilled, (state, action) => {
            channelsAdapter.removeOne(state, action.payload.id)
            // state.status = 'succeeded'
            // state.error = null
        })
        builder.addCase(fetchRemoveChannel.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    } 
})

export const selectors = channelsAdapter.getSelectors(state => state.channels)
export const { addChannel, addChannels, removeChannel, updateChannel, setCurrentChannel } = channelsSlice.actions
export default channelsSlice.reducer