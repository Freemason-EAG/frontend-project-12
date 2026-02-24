import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider, ErrorBoundary } from '@rollbar/react'

const rollbarConfig = {
  accessToken: 'fb3c362e3ca746779291cd949398405b',
  environment: 'testenv',
  captureUncaught: true, // ловит обычные ошибки типа throw new Error
  captureUnhandledRejections: true, // ловит ошибки в промисах 
}

const App = () => {
  return (
    <>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer 
            position='top-right'
            autoClose={5000}
            hideProgressBar={false} // Показывать полоску прогресса
            newestOnTop={false} // Новые тосты снизу
            closeOnClick={false} // Не закрываются по клику
            rtl={false} // Направление текста (справа налево)
            pauseOnFocusLoss //Останавливать таймер при потере фокуса
            draggable // Можно перетаскивать мышкой
            pauseOnHover // Останавливать таймер при наведении
            theme='light'
            transition={Bounce} // Анимация появления 
          />
        </ErrorBoundary>
     </Provider>
    </>
  )
}

export default App

//   accessToken: 'fb3c362e3ca746779291cd949398405b'
