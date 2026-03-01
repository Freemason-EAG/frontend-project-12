import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import socket from '../utils/socket.js'
import NavBar from '../components/NavBar.jsx'
import ChannelsBox from '../components/Channels/ChannelsBox.jsx'
import MessagesBox from '../components/Messages/MessagesBox.jsx'
import { fetchGetChannels } from '../store/slices/channelsSlice.js'
import { fetchGetMessages } from '../store/slices/messagesSlice.js'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import Loader from '../components/Loader'

const MainPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channelsStatus = useSelector(state => state.channels.status)
  const messageStatus = useSelector(state => state.messages.status)
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (token) {
      Promise.all ([
        dispatch(fetchGetChannels()).unwrap(),
        dispatch(fetchGetMessages()).unwrap(),
      ])
        .catch ((error) => {
          toast.error(t('toasts.error'), error)
        })

      socket.connect() // подключаем сокет

      socket.on('connect', () => {
        console.log('Socket connected') // слушаем подключение
      })
      socket.on('connect_error', (error) => {
        console.log('Socket error:', error) // слушаем ошибки
      })
    }
    return () => { // при размонтировании, если соединение есть - отключаемся
      socket.off('connect') // убираем слушатели
      socket.off('connect_error')
      if (socket.connected) socket.disconnect()
    }
  }, [dispatch, token, t])

  if (!token) return <Navigate to="/login" replace />

  if (channelsStatus === 'loading'
    || channelsStatus === 'idle'
    || messageStatus === 'loading'
    || messageStatus === 'idle'
  ) {
    return (
      <div className="h-100 bg-light">
        <NavBar />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <Loader />
        </div>
      </div>
    )
  }

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <NavBar />
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
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

// события socket:

// connect подключение к серверу
// disconnect отключение от сервера
// connect_error ошибка при подключении
// reconnect успешное переподключение

// метод on - это подписка на события
// метод emit - отправка события
