import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App