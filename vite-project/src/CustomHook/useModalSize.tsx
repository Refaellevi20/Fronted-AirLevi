import React, { useState, useEffect } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { HiXMark } from 'react-icons/hi2'

interface ModalSizeProps {
    closeModal: () => void
}

export function ModalSize({ closeModal }: ModalSizeProps) {
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth < 745)

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 745)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <span className="close-button" onClick={closeModal}>
            {isSmallScreen ? <MdKeyboardArrowLeft /> : <HiXMark />}
        </span>
    )
}
