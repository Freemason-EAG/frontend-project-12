import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru.js'

const createI18n = () => {
  const instance = i18n.createInstance()

  instance.use(initReactI18next).init({
    resources: { ru },
    lng: 'ru',
    fallbackLng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  })
  return instance
}

export default createI18n
