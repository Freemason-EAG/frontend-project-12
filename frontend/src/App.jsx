import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MainPage from './pages/MainPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import filter from 'leo-profanity'
import createI18n from './i18n.js'
import Loader from './components/Loader.jsx'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  environment: 'testenv',
  captureUncaught: true, // ловит обычные ошибки типа throw new Error
  captureUnhandledRejections: true, // ловит ошибки в промисах
}

const App = () => {
  const [isI18nLoaded, setIsI18nLoaded] = useState(false)

  useEffect(() => {
    createI18n()

    filter.loadDictionary('ru')
    const ruLang = filter.list()

    filter.loadDictionary('en')
    const enLang = filter.list()

    const RuEnlangsFilter = [...ruLang, ...enLang]

    filter.addDictionary('en-ru', RuEnlangsFilter)
    filter.loadDictionary('en-ru')

    setIsI18nLoaded(true)
  }, [])

  if (!isI18nLoaded) {
    return (
      <RollbarProvider config={rollbarConfig}>
        <div className="h-100 bg-light">
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <Loader />
          </div>
        </div>
      </RollbarProvider>
    )
  }

  return (

    <RollbarProvider config={rollbarConfig}>
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
    </RollbarProvider>
  )
}

export default App

//   accessToken: 'fb3c362e3ca746779291cd949398405b'
