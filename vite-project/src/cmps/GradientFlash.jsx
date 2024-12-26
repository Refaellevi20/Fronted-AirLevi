import { useState, useEffect } from 'react'

export function GradientFlash() {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const handleClick = () => {
            setIsActive(true)
            // setTimeout(() => setIsActive(false),1000)
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    return <div className={`gradient-flash ${isActive ? 'active' : ''}`} />
}