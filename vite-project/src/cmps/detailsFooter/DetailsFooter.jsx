import React, { useState } from 'react';
import { TbWorld } from 'react-icons/tb'
import { ImFacebook2 } from "react-icons/im";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { HiXMark } from "react-icons/hi2";

export function AppFooterDetails() {
    const { t, i18n } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language)

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
//! a difrenet main layout on 945px and less 
//! for all the footer here 
//~ hover of a circel on the x and more unknow yet so in helpers create
    return (
        <footer>
            <section className="footer-details__container">
                <section className="section-wrapper main-layout">
                    <div className="item-footer first-item">
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
                <section className='details-footer__container'>
                    <div className="footer-bottom flex top-border__footer">
                        <div className=' footer-details__txt'>
                            <div className="flex-start flex fs14 flex-txt__center">
                                <p>© 2024 AirLevi, Inc.</p>
                            </div>
                            <div className="flex  fs14">
                                <p> · Terms · Sitemap · Privacy · Your Privacy Choices</p>
                            </div>
                        </div>
                        <div className=' right-aligned__details'>
                            <div className=" flex modal-footer__language">
                                <TbWorld style={{cursor:'pointer'}} onClick={() => setIsModalOpen(true)} />
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
                                            <h3 onClick={() => setIsModalOpen(false)} ><HiXMark style={{cursor:'pointer'}}/></h3>
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
                            <div>
                                <a href="https://www.facebook.com/airbnb" target="_blank" rel="noopener noreferrer">
                                    <ImFacebook2 style={{ fontSize: '18px' }} />
                                </a>
                            </div>
                            <div>
                                <a href="https://twitter.com/airbnb" target="_blank" rel="noopener noreferrer">
                                    <FaTwitterSquare style={{ fontSize: '19px' }} />
                                </a>
                            </div>
                            <div>
                                <a href="https://www.instagram.com/airbnb/" target="_blank" rel="noopener noreferrer">
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
