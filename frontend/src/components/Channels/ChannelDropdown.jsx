import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import { useTranslation } from 'react-i18next'

const ChannelDropdown = ({channelId, channelName, onRename, onDelete, isActive}) =>  {

const { t } = useTranslation()

  return (
    <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle 
            split 
            variant={isActive ? 'secondary' : 'light'} 
            className='w-100 rounded-0'
        />
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => onRename(channelId, channelName)}>{t('channels.dropdownRename')}</Dropdown.Item>
            <Dropdown.Item onClick={() => onDelete(channelId)}>{t('channels.dropdownDelete')}</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default ChannelDropdown
