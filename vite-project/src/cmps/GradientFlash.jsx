import { useState, useEffect } from 'react'

export function GradientFlash() {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const handleClick = () => {
            setIsActive(true)
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    return <div className={`gradient-flash ${isActive ? 'active' : ''}`} />
}