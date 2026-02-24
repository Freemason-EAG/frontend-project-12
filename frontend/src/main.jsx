import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import store from './store/index.js'
import './i18n.js' // инициализация i18n
import filter from 'leo-profanity'

filter.loadDictionary('ru')
filter.add(['пидорас', 'пидорасы', 'пидар', 'пидор', 'пидарка', 'пидорка', 'пидарки', 'пидарку', 'пидаркам', 'пидарках', 'пидаркам', 'пидарками', 'пидарках'])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
