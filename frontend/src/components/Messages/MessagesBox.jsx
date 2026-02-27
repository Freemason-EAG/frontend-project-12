import ChannelHeader from './ChannelHeader.jsx'
import MessagesList from './MessagesList.jsx'
import MessageForm from './MessageForm.jsx'

const MessagesBox = () => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChannelHeader />
        <MessagesList />
        <MessageForm />
      </div>
    </div>
  )
}

export default MessagesBox
