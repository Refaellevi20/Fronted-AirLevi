import { useState, useRef, useEffect } from 'react'
import { 
    FaWhatsapp, 
    FaTwitter, 
    FaLinkedin, 
    FaEnvelope, 
    FaCopy, 
    FaInstagram 
} from 'react-icons/fa'
import { FiShare2 } from 'react-icons/fi'
import { SiGmail, SiMicrosoftoutlook } from 'react-icons/si'
import { IoMdClose } from 'react-icons/io'
import { showSuccessMsg } from '../services/event-bus.service'

export function ShareModal({ stay }) {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef()
    const shareUrl = window.location.href
    const title = `Check out this amazing stay: ${stay.name}`
    const description = `${stay.summary} in ${stay.loc.city}, ${stay.loc.country}`

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    // Close on ESC key
    useEffect(() => {
        function handleEscKey(event) {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey)
        }
        return () => {
            document.removeEventListener('keydown', handleEscKey)
        }
    }, [isOpen])

    const shareOptions = [
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp className="whatsapp-icon" />,
            action: () => {
                window.open(`https://wa.me/?text=${encodeURIComponent(title + '\n' + shareUrl)}`)
                setIsOpen(false)
            }
        },
        {
            name: 'Gmail',
            icon: <SiGmail className="gmail-icon" />,
            action: () => {
                window.open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`)
                setIsOpen(false)
            }
        },
        {
            name: 'Outlook',
            icon: <SiMicrosoftoutlook className="outlook-icon" />,
            action: () => {
                window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`)
                setIsOpen(false)
            }
        },
        {
            name: 'Twitter',
            icon: <FaTwitter className="twitter-icon" />,
            action: () => {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`)
                setIsOpen(false)
            }
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin className="linkedin-icon" />,
            action: () => {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)
                setIsOpen(false)
            }
        },
        {
            name: 'Instagram',
            icon: <FaInstagram className="instagram-icon" />,
            action: () => {
                showSuccessMsg('Story sharing is available in native apps only')
                setIsOpen(false)
            }
        },
        {
            name: 'Email',
            icon: <FaEnvelope className="email-icon" />,
            action: () => {
                window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + shareUrl)}`)
                setIsOpen(false)
            }
        },
        {
            name: 'Copy Link',
            icon: <FaCopy className="copy-icon" />,
            action: () => {
                navigator.clipboard.writeText(shareUrl)
                showSuccessMsg('Link copied to clipboard!')
                setIsOpen(false)
            }
        }
    ]

    return (
        <div className="share-modal">
            <button 
                className="share-button"
                onClick={() => setIsOpen(true)}
                aria-label="Share"
            >
                <FiShare2 /> Share
            </button>

            {isOpen && (
                <div className="share-modal-overlay">
                    <div className="share-options-container" ref={modalRef}>
                        <div className="share-header">
                            <h3>Share this place</h3>
                            <button 
                                className="close-button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close share modal"
                            >
                                <IoMdClose />
                            </button>
                        </div>

                        <div className="share-options">
                            {shareOptions.map((option) => (
                                <button
                                    key={option.name}
                                    className="share-option"
                                    onClick={option.action}
                                    aria-label={`Share on ${option.name}`}
                                >
                                    <span className="share-icon">{option.icon}</span>
                                    <span className="share-name">{option.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}