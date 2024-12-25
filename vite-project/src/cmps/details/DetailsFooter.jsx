import React, { useEffect, useState } from 'react';
import { TbWorld } from 'react-icons/tb'
import { ImFacebook2 } from "react-icons/im";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { HiXMark } from "react-icons/hi2";
import currencySymbolMap from 'currency-symbol-map';
import LanguageModal from '../LanguageModal';
import CurrencyModal from '../CurrencyModal';
import { useDispatch, useSelector } from 'react-redux';
import { FaGithub } from "react-icons/fa";


export function AppFooterDetails() {
    const { t, i18n } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language)
    const [isModalOpenMoney, setIsModalOpenMoney] = useState(false)
    const dispatch = useDispatch()
    const currency = useSelector(state => state.stayModule.currency)

    useEffect(() => { 
        if (isModalOpen) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'auto'
        }
    
        return () => {
          document.body.style.overflow = 'auto'
        }
      }, [isModalOpen])

    useEffect(() => { 
        if (isModalOpenMoney) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'auto'
        }
    
        return () => {
          document.body.style.overflow = 'auto'
        }
      }, [isModalOpenMoney])

    function changeLanguage(lang) {
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

    return (
        <footer className='main-layout-footer__details'>
            <section className='footer-details__container'>
                <section className="section-wrapper secondary-layout section-wrapper__details">
                    <div className="item-footer first-item ff-c__book">
                        <h2 className='ff-c__book'>{t('Support')}</h2>
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

                    <div className="item-footer ff-c__book">
                        <div className='on-media-border__footer '>
                            <h2 className='ff-c__book'>{t('Hosting')}</h2>
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
                    </div>

                    <div className="item-footer ff-c__book">
                        <div className='on-media-border__footer'>
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
                    </div>
                </section>
                <section className='details-footer__container secondary-layout'>
                    <div className="footer-bottom flex top-border__footer top-border-footer__details">
                        <div className='footer-details__txt'>
                            <div className="flex-start flex fs14 flex-txt__center">
                                <p className='ff-c__book'>© 2024 AirLevi, Inc.</p>
                            </div>
                            <div className="flex  fs14">
                                <p className='ff-c__book'> · Terms · Sitemap · Privacy · Your Privacy Choices</p>
                            </div>
                        </div>
                        <div className='right-aligned__details'>
                            <div className='flex modal-footer__language'>
                                <TbWorld style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(true)} />
                                <h1
                                    style={{ padding: '0 10px' }}
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
                                <LanguageModal
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    selectedLanguage={selectedLanguage}
                                    onLanguageChange={changeLanguage}
                                />
                            </div>
                            <p style={{alignItems: 'center'}}
                             className="fs14 pointer underline"
                                onClick={() => setIsModalOpenMoney(true)}>
                                {currency} ({currencySymbolMap(currency) || 'Not available'})
                            </p>
                            <CurrencyModal
                                isOpen={isModalOpenMoney}
                                onClose={() => setIsModalOpenMoney(false)}
                            />
                            <div>
                                <a href="https://www.facebook.com/airbnb" target="_blank" rel="noopener noreferrer">
                                    <ImFacebook2 style={{ fontSize: '18px' }} />
                                </a>
                            </div>
                            <div>
                                <a href="https://github.com/Refaellevi20" target="_blank" rel="noopener noreferrer">
                                <FaGithub style={{ fontSize: '19px' }} />
                                </a>
                            </div>
                            <div>
                                <a href="https://www.instagram.com/raf.levi9/?igsh=MThjY2twMWhuNzB5MQ%3D%3D#" target="_blank" rel="noopener noreferrer">
                                    <FaInstagramSquare style={{ fontSize: '19px', }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </footer>
    )
}
