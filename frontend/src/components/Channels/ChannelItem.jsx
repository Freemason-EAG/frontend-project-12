import ChannelDropdown from "./ChannelDropdown"
import Button from 'react-bootstrap/Button'
import filter from 'leo-profanity'

const ChannelItem = ({ channel, isActive, onSelect, onRename, onDelete }) => {

    return (
        <li className="nav-item w-100">
            <div className="d-flex align-items-center">
                <Button 
                    variant={isActive ? 'secondary' : 'light'}
                    className="w-100 rounded-0 text-start text-truncate" // text-truncate для сокращения длинного названия
                    onClick={onSelect}
                >
                    <span className="me-1" aria-hidden='true'>#</span>
                    {filter.clean(channel.name)} 
                </Button>
                {channel.removable && (
                    <ChannelDropdown
                        channelId={channel.id}
                        channelName={channel.name}
                        onRename={onRename}
                        onDelete={onDelete}
                        isActive={isActive}
                        />
                )}
            </div>
        </li>
    )
}

export default ChannelItem



// import ChannelDropdown from "./ChannelDropdown"
// import Button from 'react-bootstrap/Button'

// const ChannelItem = ({ channel, isActive, onSelect, onRename, onDelete }) => {

//     return (
//         <li className="nav-item w-100">
//             <div className="d-flex align-items-center">
//                 <Button 
//                     variant={isActive ? 'secondary' : 'light'}
//                     className="w-100 rounded-0 text-start text-truncate" // text-truncate для сокращения длинного названия
//                     onClick={onSelect}
//                 >
//                     <span className="me-1" aria-hidden='true'>#</span>
//                     {channel.name} 
//                 </Button>
//                 {channel.removable && (
//                     <ChannelDropdown
//                         channelId={channel.id}
//                         channelName={channel.name}
//                         onRename={onRename}
//                         onDelete={onDelete}
//                         isActive={isActive}
//                         />
//                 )}
//             </div>
//         </li>
//     )
// }

// export default ChannelItem