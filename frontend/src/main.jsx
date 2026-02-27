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
const ruLang = filter.list()

filter.loadDictionary('en')
const enLang = filter.list()

const RuEnlangsFilter = [...ruLang, ...enLang]

filter.addDictionary('en-ru', RuEnlangsFilter)
filter.loadDictionary('en-ru')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
