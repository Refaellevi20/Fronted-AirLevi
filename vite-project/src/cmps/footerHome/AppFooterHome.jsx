import { IoIosArrowDown } from "react-icons/io"
import { TbWorld } from "react-icons/tb"
import React, { useState } from 'react'
import Modal from "./footerHomeModal"
import currencySymbolMap from 'currency-symbol-map';
import { useTranslation } from "react-i18next"
import { HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux"
import CurrencyModal from "../CurrencyModal";
import LanguageModal from "../LanguageModal";
// import { IoMdClose } from "react-icons/io"

export function AppFooterHome() {
    const [isModalOpenSupport, setIsModalOpenSupport] = useState(false)
    const { t, i18n } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language)
    const [isModalOpenMoney, setIsModalOpenMoney] = useState(false)
    const dispatch = useDispatch()
    const currency = useSelector(state => state.stayModule.currency)

    function changeLanguage(lang) {
        // console.log("Language selected:", lang)
        i18n.changeLanguage(lang)
        setIsModalOpen(false)
    }  //! modal layout 40px 40px 12px and mobile
    //! wish list edit style 



    // function handleChangeLanguage(language) {
    //     setSelectedLanguage(language)
    //     changeLanguage(language)
    // }


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
                                style={{ padding: '0 10px' }}
                                className="pointer underline fs14"
                                onClick={() => setIsModalOpen(true)}
                            >
                                {i18n.language === 'en' ? 'English (US)' : i18n.language === 'he' ? 'עברית' : i18n.language === 'es' ? 'Español (MX)' : i18n.language === 'fr' ? 'Français (FR)' : i18n.language === 'de' ? 'Deutsch (DE)' : i18n.language === 'it' ? 'Italiano (IT)' : i18n.language === 'zh' ? '中文 (CN)' : i18n.language.toUpperCase()}
                            </h1>
                        </div>
                        <LanguageModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            selectedLanguage={selectedLanguage}
                            onLanguageChange={changeLanguage}
                        />
                        <div>
                            <p className="fs14 pointer underline"
                                onClick={() => setIsModalOpenMoney(true)}>
                                {currency} ({currencySymbolMap(currency) || 'Not available'})
                            </p>
                            <CurrencyModal
                                isOpen={isModalOpenMoney}
                                onClose={() => setIsModalOpenMoney(false)}
                            />
                        </div>
                        <div className="flex">
                            <h1 className="pointer underline" onClick={openModalSupport} >Support & resources </h1>
                            <IoIosArrowDown style={{ fontSize: '0.875em', marginLeft: '0.2em', cursor: 'pointer' }} />
                            <Modal isOpen={isModalOpenSupport} onClose={closeModalSupport}>
                                <div style={{ position: 'relative', background: '#fff', padding: '0 20px', borderRadius: '10px' }}>
                                    <div style={{ padding: '10px' }}>
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

