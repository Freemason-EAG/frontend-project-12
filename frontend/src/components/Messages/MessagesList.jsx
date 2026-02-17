import { useSelector } from "react-redux"
import { selectors as messagesSelectors } from "../../store/slices/messagesSlice.js"

const MessagesList = () => {
    const messages = useSelector(messagesSelectors.selectAll)
    const { status, error } = useSelector(state => state.messages)
    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const currentChannelMessages = messages.filter(message => message.channelId === currentChannelId)

    const renderMessagesList = () => {
        if (status === 'loading') return <div className="mt-auto px-5 py-3 text-muted">Loading...</div>
        if (status === 'failed') return <div className="mt-auto px-5 py-3 text-muted">Error: {error.message}</div>
        if (currentChannelMessages.length === 0) return <div className="mt-auto px-5 py-3 text-muted">There are no messages in this channel yet. Be the first to write.</div>
        return currentChannelMessages.map(({id, body, username }) => (
            <div
            key={id}
            className="text-break mb-2"
            >
                <b>{username}:</b>
                {body}
            </div>
        ))
    }

    
    return (
        <div id="messagesList" className="chat-messages overflow-auto px-5">
                {renderMessagesList()}
        </div>
    )
}

export default MessagesList


