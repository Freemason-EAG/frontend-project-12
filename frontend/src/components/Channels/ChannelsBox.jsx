import ChannelsHeader from './ChannelsHeader.jsx'
import ChannelsList from './ChannelsList.jsx'

const ChannelsBox = () => {
  return (
    <div className="h-100 d-flex flex-column">
      <ChannelsHeader />
      <ChannelsList />
    </div>
  )
}

export default ChannelsBox
