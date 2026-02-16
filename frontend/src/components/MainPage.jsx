import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import NavBar from './NavBar'
import ChannelsBox from './Channels/ChannelsBox.jsx'
import MessagesBox from './Messages/MessagesBox.jsx'
import { fetchGetChannels } from '../store/slices/channelsSlice.js'


const MainPage = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    
    useEffect(() => {   
        if(token) dispatch(fetchGetChannels())   
    }, [dispatch, token])

    if (!token) return <Navigate to={'/login'} replace />
    
    return (
        <div className='h-100 bg-light'>
            <div className='h-100'>
                <div className='h-100' id='chat'>
                    <div className='d-flex flex-column h-100'>
                        <NavBar />
                        <div className='container h-100 my-4 overflow-hidden rounded shadow'>
                            <div className='row h-100 bg-white flex-md-row'>
                               <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
                                    <ChannelsBox />
                                </div> 
                                <MessagesBox />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MainPage





// const MainPage = () => {
//     const token = useSelector(state => state.auth.token)
//     if (!token) {
//         return <Navigate to={'/login'} replace />
//     }
//     return (
//         <>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to='/login'>Login Page</Link>
//                     </li>
//                     <li>
//                         <Link to='/404'>Not Found</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </>
//     )
// }

// export default MainPage