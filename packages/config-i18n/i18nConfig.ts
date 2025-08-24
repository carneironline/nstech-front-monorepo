import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export function initI18n(resources: any, defaultLng = 'pt') {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: defaultLng,
      lng: defaultLng,
      interpolation: {
        escapeValue: false, // React already escapes
      },
    })

  return i18n
}
