import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'

const ChannelDropdown = ({channelId, channelName, onRename, onDelete, isActive}) =>  {
  return (
    <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle 
            split 
            variant={isActive ? 'secondary' : 'light'} 
            className='w-100 rounded-0'
        />
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => onRename(channelId, channelName)}>Rename</Dropdown.Item>
            <Dropdown.Item onClick={() => onDelete(channelId)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default ChannelDropdown
