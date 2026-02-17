import { useSelector, useDispatch } from "react-redux"
import { selectors as channelsSelectors } from "../../store/slices/channelsSlice"
import { setCurrentChannel } from "../../store/slices/channelsSlice"

const ChannelsList = () => {
    const dispatch = useDispatch()
    const channels = useSelector(channelsSelectors.selectAll)
    const { status, error, currentChannelId } = useSelector(state => state.channels)

    const renderChannelsList = () => {
        if (status === 'loading') return <li className="text-muted">Loading...</li>
        if (status === 'failed') return <li className="text-muted">Error: {error.message}</li>
        if (channels.length === 0) return <li className="text-muted">Сhannels have not been added yet</li>
        return channels.map((channel) => (
                <li
                    key={channel.id}
                    className="nav-item w-100"
                >
                    <button 
                    type='button' 
                    className={`w-100 rounded-0 text-start btn ${
                        channel.id === currentChannelId ? 'btn-secondary' : 'btn-light'
                    }`}
                    onClick={() => dispatch(setCurrentChannel(channel.id))}
                    >
                        <span className="me-1">#</span>
                        {channel.name}
                    </button>
                </li>
            )) 

    }

    return (
        <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
            {renderChannelsList()}
        </ul>
    )
}

export default ChannelsList
