import React, { useState } from 'react';
import { TbWorld } from 'react-icons/tb'
import { ImFacebook2 } from "react-icons/im";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export function AppFooterDetails() {
    const { t, i18n } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)

    function changeLanguage(lang) {
        i18n.changeLanguage(lang)
        setIsModalOpen(false)
    }
    return (
        <footer>
            <section className="footer-details__container">
                <h1>{t('welcome')}</h1>
                <p>{t('about')}</p>
                <section className="section-wrapper">
                    {/* Support Section */}
                    <div className="item-footer">
                        <h2>Support</h2>
                        <ul>
                            <li>Help Center</li>
                            <li>Get help with a safety issue</li>
                            <li>AirCover</li>
                            <li>Anti-discrimination</li>
                            <li>Disability support</li>
                            <li>Cancellation options</li>
                            <li>Report neighborhood concern</li>
                        </ul>
                    </div>

                    {/* Hosting Section */}
                    <div className="item-footer">
                        <h2>Hosting</h2>
                        <ul>
                            <li>Airbnb Your Home</li>
                            <li>AirCover for Hosts</li>
                            <li>Hosting Resources</li>
                            <li>Community Forum</li>
                            <li>Hosting Responsibly</li>
                            <li>Airbnb-Friendly Apartments</li>
                            <li>Join a Free Hosting Class</li>
                            <li>Find a Co-Host</li>
                            <li>Refer a Host</li>
                        </ul>
                    </div>

                    {/* Airbnb Section */}
                    <div className="item-footer">
                        <h2>Airbnb</h2>
                        <ul>
                            <li>Newsroom</li>
                            <li>New features</li>
                            <li>Careers</li>
                            <li>Investors</li>
                            <li>Gift cards</li>
                            <li>Airbnb.org emergency stays</li>
                        </ul>
                    </div>
                </section>

                {/* Footer Bottom Section */}
                <div className="footer-bottom flex">
                    <div className="flex-start">
                        <p>© 2024 AirLevi, Inc. · Terms · Sitemap ·</p>
                    </div>
                    <div className="flex media1">
                        <p>Privacy · Your Privacy Choices</p>
                    </div>
                    <div className="right-aligned flex modal-footer__language">
                        <TbWorld onClick={() => setIsModalOpen(true)} />
                        <h1
                            className="pointer underline"
                            onClick={() => setIsModalOpen(true)}
                        >
                            {i18n.language === 'en' ? 'English (US)' : i18n.language.toUpperCase()}
                        </h1>
                        {isModalOpen && (
                            <div className="modal-overlay">
                                <div className="modal">
                                    <div>
                                        <button onClick={() => changeLanguage('en')}>English</button>
                                        <button onClick={() => changeLanguage('es')}>Español</button>
                                        <button onClick={() => changeLanguage('fr')}>Français</button>
                                        <button onClick={() => changeLanguage('he')}>עברית</button>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="close-modal">Close</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <a href="https://www.facebook.com/airbnb" target="_blank" rel="noopener noreferrer">
                            <ImFacebook2 style={{ fontSize: '24px' }} />
                        </a>
                    </div>
                    <div>
                        <a href="https://twitter.com/airbnb" target="_blank" rel="noopener noreferrer">
                            <FaTwitterSquare style={{ fontSize: '24px' }} />
                        </a>
                    </div>
                    <div>
                        <a href="https://www.instagram.com/airbnb/" target="_blank" rel="noopener noreferrer">
                            <FaInstagramSquare style={{ fontSize: '24px', }} />
                        </a>
                    </div>
                </div>
            </section>
        </footer>
    )
}
