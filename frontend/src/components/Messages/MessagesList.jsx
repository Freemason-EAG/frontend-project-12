import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef } from "react"
import { addMessage, selectors as messagesSelectors } from "../../store/slices/messagesSlice.js"
import socket from "../../utils/socket.js"

const MessagesList = () => {
    const messages = useSelector(messagesSelectors.selectAll)
    const { status, error } = useSelector(state => state.messages)
    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const currentChannelMessages = messages.filter(message => message.channelId === currentChannelId)

    const dispatch = useDispatch()

    const messagesRef = useRef(null)

    useEffect(() => {
        socket.on('newMessage', (message) => {
          dispatch(addMessage(message))
        })
        return () => {
            socket.off('newMessage')
        }
    }, [dispatch])

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [currentChannelMessages.length])


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
        <div 
        ref={messagesRef}
        id="messagesList" 
        className="chat-messages overflow-auto px-5">
                {renderMessagesList()}
        </div>
    )
}

export default MessagesList


