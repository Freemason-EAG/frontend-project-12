import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectors as channelsSelectors } from '../../store/slices/channelsSlice'
import { selectors as messagesSelectors } from '../../store/slices/messagesSlice'

const ChannelHeader = () => {

    const { t } = useTranslation()

    const currenChannelId = useSelector(state => state.channels.currentChannelId)
    const channels = useSelector(channelsSelectors.selectAll)
    const currentChannelName = channels.find(channel => channel.id === currenChannelId)?.name
    const allMessages = useSelector(messagesSelectors.selectAll)
    const currentChannelMessages = allMessages.filter(message => message.channelId === currenChannelId).length

    return (
        <div className='bg-light mb-4 p-3 shadow-sm small'>
            <p className='m-0'><b>{currentChannelName}</b></p>
            <span className='text-muted'>{t('messages.messages', {count: currentChannelMessages})}</span>
        </div>
    )
}  

export default ChannelHeader