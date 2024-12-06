import { IoIosArrowDown } from "react-icons/io"
import { TbWorld } from "react-icons/tb"
import React, { useState } from 'react'
import Modal from "./footerHomeModal"
import { useTranslation } from "react-i18next"
import { HiXMark } from "react-icons/hi2";
// import { IoMdClose } from "react-icons/io"

export function AppFooterHome() {
    const [isModalOpenSupport, setIsModalOpenSupport] = useState(false)
    const { t, i18n } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language)

    function changeLanguage(lang) {
        // console.log("Language selected:", lang)
        i18n.changeLanguage(lang)
        setIsModalOpen(false)
    }

    function handleOverlayClick(ev) {
        if (ev.target.classList.contains('modal-overlay')) {
            setIsModalOpen(false)
        }
    }

    function handleChangeLanguage(language) {
        setSelectedLanguage(language)
        changeLanguage(language)
    }

    const openModalSupport = () => setIsModalOpenSupport(true)
    const closeModalSupport = () => setIsModalOpenSupport(false)

    return (
        <footer>
            <section className="fix home-footer__container">
                <div className="flex top-border__footer">
                    <div className="footer-p">
                        <div className="flex-start flex">
                            <p>© 2024 AirLevi, Inc. · Terms · Sitemap ·</p>
                        </div>
                        <div className="flex media1">
                            <p>Privacy · Your Privacy Choices</p>
                        </div>
                    </div>
                    <div className="right-aligned__details">
                        <div className=" flex modal-footer__language">
                            <TbWorld onClick={() => setIsModalOpen(true)} />
                            <h1
                                className="pointer underline"
                                onClick={() => setIsModalOpen(true)}
                            >
                                {
                                    i18n.language === 'en'
                                        ? 'English (US)'
                                        : i18n.language === 'he'
                                            ? 'עברית'
                                            : i18n.language === 'es'
                                                ? 'Español (MX)'
                                                : i18n.language === 'fr'
                                                    ? 'Français (FR)'
                                                    : i18n.language === 'de'
                                                        ? 'Deutsch (DE)'
                                                        : i18n.language === 'it'
                                                            ? 'Italiano (IT)'
                                                            : i18n.language === 'zh'
                                                                ? '中文 (CN)'
                                                                : i18n.language.toUpperCase()
                                }                            </h1>
                            {isModalOpen && (
                                <div className="modal-overlay" onClick={handleOverlayClick}>
                                    <div className="modal">
                                        <h3 onClick={() => setIsModalOpen(false)} ><HiXMark /></h3>
                                        <h2 style={{ textAlign: 'start' }} className='txt-language' >Choose a language and region</h2>
                                        <div className='footer-language__container'>
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
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <h1 className="pointer underline">$ USD</h1>
                        <div className="flex">
                            <h1 className="pointer underline" onClick={openModalSupport} >Support & resources </h1>
                            <IoIosArrowDown style={{ fontSize: '0.875em', marginLeft: '0.2em', cursor: 'pointer' }} />
                            <Modal isOpen={isModalOpenSupport} onClose={closeModalSupport}>
                                <div style={{ position: 'relative', background: '#fff', padding: '0 20px', borderRadius: '10px' }}>
                                    <div style={{ padding: '10px' }}>
                                        {/* <IoMdClose style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }} onClick={closeModal} /> */}
                                    </div>
                                    <section className="section-wrapper">
                                        <div className="item-footer">
                                            <h2>{t('Support')}</h2>
                                            <ul>
                                                <li>{t('HelpCenter')}</li>
                                                <li>{t('GetHelpWithSafetyIssue')}</li>
                                                <li>{t('AirCover')}</li>
                                                <li>{t('AntiDiscrimination')}</li>
                                                <li>{t('DisabilitySupport')}</li>
                                                <li>{t('CancellationOptions')}</li>
                                                <li>{t('ReportNeighborhoodConcern')}</li>
                                            </ul>
                                        </div>

                                        <div className="item-footer">
                                            <h2>{t('Hosting')}</h2>
                                            <ul>
                                                <li>{t('AirbnbYourHome')}</li>
                                                <li>{t('AirCoverForHosts')}</li>
                                                <li>{t('HostingResources')}</li>
                                                <li>{t('CommunityForum')}</li>
                                                <li>{t('HostingResponsibly')}</li>
                                                <li>{t('AirbnbFriendlyApartments')}</li>
                                                <li>{t('JoinFreeHostingClass')}</li>
                                                <li>{t('FindCoHost')}</li>
                                                <li>{t('ReferHost')}</li>
                                            </ul>
                                        </div>

                                        <div className="item-footer">
                                            <h2>{t('Airbnb')}</h2>
                                            <ul>
                                                <li>{t('Newsroom')}</li>
                                                <li>{t('NewFeatures')}</li>
                                                <li>{t('Careers')}</li>
                                                <li>{t('Investors')}</li>
                                                <li>{t('GiftCards')}</li>
                                                <li>{t('AirbnbOrgEmergencyStays')}</li>
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}

