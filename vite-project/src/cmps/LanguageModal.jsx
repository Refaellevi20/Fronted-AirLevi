// src/components/LanguageModal.js
import React from 'react'
import { HiXMark } from "react-icons/hi2"
import { useTranslation } from "react-i18next"

export default function LanguageModal({ isOpen, onClose, selectedLanguage, onLanguageChange }) {
  const { t, i18n } = useTranslation()

  function handleChangeLanguage(language) {
    onLanguageChange(language)
    onClose()
  }

  return (
    isOpen && (
      <section className='section-language__container'>
        <div className="modal-overlay" onClick={(ev) => ev.target.classList.contains('modal-overlay') && onClose()}>
          <div className="modal">
            <h3 onClick={onClose}><HiXMark style={{ cursor: 'pointer' }} /></h3>
            <h2 style={{ textAlign: 'start' }} className='txt-language border-top'>Choose a language and region</h2>
            <section className='grid-buttons'>
                <button
                  onClick={() => handleChangeLanguage('en')}
                  className={selectedLanguage === 'en' ? 'selected' : ''}
                >
                  English <br />United States
                </button>
                <button
                  onClick={() => handleChangeLanguage('es')}
                  className={selectedLanguage === 'es' ? 'selected' : ''}
                >
                  Español <br /> México
                </button>
                <button
                  onClick={() => handleChangeLanguage('fr')}
                  className={selectedLanguage === 'fr' ? 'selected' : ''}
                >
                  Français  <br /> France
                </button>
                <button
                  onClick={() => handleChangeLanguage('he')}
                  className={selectedLanguage === 'he' ? 'selected' : ''}
                >
                  עברית <br /> ישראל
                </button>
                <button
                  onClick={() => handleChangeLanguage('de')}
                  className={selectedLanguage === 'de' ? 'selected' : ''}
                >
                  German <br /> Deutschland
                </button>
                <button
                  onClick={() => handleChangeLanguage('it')}
                  className={selectedLanguage === 'it' ? 'selected' : ''}
                >
                  Italian <br /> Italia
                </button>
                <button
                  onClick={() => handleChangeLanguage('zh')}
                  className={selectedLanguage === 'zh' ? 'selected' : ''}
                >
                  Chinese <br /> 中国
                </button>
                <button
                  onClick={() => handleChangeLanguage('ar')}
                  className={selectedLanguage === 'ar' ? 'selected' : ''}
                >
                  Arabic <br /> عربي
                </button>
                <button
                  onClick={() => handleChangeLanguage('ja')}
                  className={selectedLanguage === 'ja' ? 'selected' : ''}
                >
                  Japanese <br /> 日本語
                </button>
                <button
                  onClick={() => handleChangeLanguage('ko')}
                  className={selectedLanguage === 'ko' ? 'selected' : ''}
                >
                  Korean <br /> 한국어
                </button>
                <button
                  onClick={() => handleChangeLanguage('pa')}
                  className={selectedLanguage === 'pa' ? 'selected' : ''}
                >
                  Portuguese <br /> Português
                </button>
                <button
                  onClick={() => handleChangeLanguage('ru')}
                  className={selectedLanguage === 'ru' ? 'selected' : ''}
                >
                  Russian <br /> Русский
                </button>
                <button
                  onClick={() => handleChangeLanguage('nl')}
                  className={selectedLanguage === 'nl' ? 'selected' : ''}
                >
                  Dutch <br /> Nederlannl
                </button>
            </section>
          </div>
        </div>
      </section>
    )
  )
}
