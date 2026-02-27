import { useState } from 'react'
import AddChannelModal from '../Modals/AddChannelModal'
import { useTranslation } from 'react-i18next'

const ChannelsHeader = () => {
  const { t } = useTranslation()

  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.header')}</b>
        <button onClick={handleShowModal} type="button" className="p-0 text-primary btn btn-group-vertical">
          +
        </button>
      </div>
      <AddChannelModal show={showModal} onClose={handleCloseModal} />
    </>
  )
}

export default ChannelsHeader
