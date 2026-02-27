import { useSelector, useDispatch } from 'react-redux'
import { selectors as channelsSelectors } from '../../store/slices/channelsSlice'
import { setCurrentChannel } from '../../store/slices/channelsSlice'
import ChannelItem from './ChannelItem'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import RenameChannelModal from '../Modals/RenameChannelModal'
import RemoveChannelModal from '../Modals/RemoveChannelModal'
import { toast } from 'react-toastify'

const ChannelsList = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const channels = useSelector(channelsSelectors.selectAll)
  const { status, error, currentChannelId } = useSelector(state => state.channels)

  const [renameModal, setRenameModal] = useState({ isOpen: false, id: null, name: '' })
  const [removeModal, setRemoveModal] = useState({ isOpen: false, id: null })

  const handleRename = (id, name) => {
    setRenameModal({ isOpen: true, id, name })
  }

  const handleDelete = (id) => {
    setRemoveModal({ isOpen: true, id })
  }

  useEffect(() => {
    if (status === 'failed') toast.error(t('toasts.loadingError'))
  }, [status, t])

  const renderChannelsList = () => {
    if (status === 'loading') return <li className="text-muted">{t('channels.loading')}</li>
    if (status === 'failed') return (
      <li className="text-muted">
        {t('channels.loadingError')}
        :
        {' '}
        {error.message}
      </li>
    )
    if (channels.length === 0) return <li className="text-muted">{t('channels.empty')}</li>

    return channels.map(channel => (
      <ChannelItem
        channel={channel}
        key={channel.id}
        isActive={channel.id === currentChannelId}
        onSelect={() => dispatch(setCurrentChannel(channel.id))}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    ))
  }

  return (
    <>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {renderChannelsList()}
      </ul>

      <RenameChannelModal
        show={renameModal.isOpen}
        onClose={() => setRenameModal({ isOpen: false, id: null, name: '' })}
        channelId={renameModal.id}
      />

      <RemoveChannelModal
        show={removeModal.isOpen}
        onClose={() => setRemoveModal({ isOpen: false, id: null })}
        channelId={removeModal.id}
      />
    </>
  )
}

export default ChannelsList
