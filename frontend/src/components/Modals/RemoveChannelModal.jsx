import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { fetchRemoveChannel, setCurrentChannel } from '../../store/slices/channelsSlice'
import { selectors } from '../../store/slices/channelsSlice'
import { toast } from 'react-toastify'

const RemoveChannelModal = ({ show, onClose, channelId }) => {
  const { t } = useTranslation()

  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const channels = useSelector(selectors.selectAll)
  const defaultChannel = channels.find(channel => channel.name === 'general')

  const dispatch = useDispatch()

  const [error, setError] = useState(null)

  const handleDelete = async () => {
    try {
      await dispatch(fetchRemoveChannel(channelId)).unwrap()
      toast.success(t('toasts.removeChannelSuccess'))

      if (currentChannelId === channelId) dispatch(setCurrentChannel(defaultChannel.id))
      onClose()
    }
    catch (error) {
      console.log('Remove channel error:', error)
      setError(t('modals.removeChannel.error'))
      // toast.error(t('toasts.removeChannelError'))
    }
  }

  if (!show) return

  return (

    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalBody">
          <p>{t('modals.removeChannel.warning')}</p>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <Button onClick={onClose} variant="secondary" className="me-2">{t('modals.removeChannel.canselButton')}</Button>
          <Button onClick={() => handleDelete(channelId)} variant="danger" className="me-2">{t('modals.removeChannel.deleteButton')}</Button>
        </div>
      </Modal.Body>
      {error && <div className="alert alert-danger">{error}</div>}
    </Modal>
  )
}

export default RemoveChannelModal
