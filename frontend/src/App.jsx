import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { ToastContainer } from 'react-toastify'
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

    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
      <ToastContainer />
    </Provider>

  )
}

export default App

//   accessToken: 'fb3c362e3ca746779291cd949398405b'
