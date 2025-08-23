import { useTranslation } from '@nstech/i18n'

export function BtnSwitchLang() {
  const { i18n } = useTranslation()

  function handleLanguageSwitch() {
    i18n.changeLanguage(i18n.language === 'en' ? 'pt-BR' : 'en')
  }

  return (
    <button onClick={handleLanguageSwitch} className='cursor-pointer'>
      Switch to Language
    </button>
  )
}
