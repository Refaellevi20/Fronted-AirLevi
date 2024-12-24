import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

export function useLoginModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)

    function LoginModal() {
        if (!isOpen) return null

        return (
            <div className="login-modal-overlay" onClick={(ev) => {
                if (ev.target === ev.currentTarget) closeLoginModal()
            }}>
                <div className="login-modal-container">
                    <button className="close-button" onClick={closeLoginModal}>
                        <IoMdClose />
                    </button>
                    {modalContent}
                </div>
            </div>
        )
    }

    function openLoginModal(content) {
        setModalContent(content)
        setIsOpen(true)
    }

    function closeLoginModal() {
        setIsOpen(false)
        setModalContent(null)
    }

    return { LoginModal, openLoginModal, closeLoginModal }
}