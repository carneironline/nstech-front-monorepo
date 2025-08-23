import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'

type Props = {
  children: ReactNode
  i18nInstance?: typeof i18n
}

export function I18nProvider({ children, i18nInstance }: Props) {
  if (!i18nInstance) {
    throw new Error('⚠️ i18nInstance não foi fornecido ao I18nProvider.')
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
