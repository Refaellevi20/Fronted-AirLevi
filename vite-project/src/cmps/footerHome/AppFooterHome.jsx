import { IoIosArrowDown } from "react-icons/io"
import { TbWorld } from "react-icons/tb"
import React, { useState } from 'react'
import Modal from "./footerHomeModal"
// import { IoMdClose } from "react-icons/io"

export function AppFooterHome() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

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
                    <div className="right-aligned">
                        <div className="flex">
                            <TbWorld style={{ marginLeft: '-100px' }} />
                            <h1 className="pointer underline">English (US)</h1>
                        </div>
                        <h1 className="pointer underline">$ USD</h1>
                        <div className="flex">
                            <h1 className="pointer underline" onClick={openModal} >Support & resources </h1>
                            <IoIosArrowDown style={{ fontSize: '0.875em', marginLeft: '0.2em',cursor:'pointer' }} />
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <div style={{ position: 'relative', background: '#fff', padding: '0 20px', borderRadius: '10px' }}>
                                    <div style={{ padding: '10px' }}>
                                        {/* <IoMdClose style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }} onClick={closeModal} /> */}
                                    </div>
                                    <section className="section-wrapper">
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
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}

