import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRemoveChannel, setCurrentChannel } from '../../store/slices/channelsSlice'
import { selectors } from '../../store/slices/channelsSlice'

const RemoveChannelModal = ({ show, onClose, channelId }) => {

    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const channels = useSelector(selectors.selectAll)
    const defaultChannel = channels.find(channel => channel.name === 'general')

    const dispatch = useDispatch()

    const handleDelete = async () => {
        try {
            await dispatch(fetchRemoveChannel(channelId))
            
            if (currentChannelId === channelId) dispatch(setCurrentChannel(defaultChannel.id))
            onClose()
        }
        catch (error) {
            console.log('Remove channel error:', error)
        }
    }

    if (!show) return

    return (

        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove channel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='modalBody'>
                    <p>Are you sure you want to permanently delete the channel?</p>
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <Button onClick={onClose} variant='secondary' className="me-2">Cansel</Button>
                    <Button onClick={() => handleDelete(channelId)} variant='danger' className="me-2">Delete</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default RemoveChannelModal