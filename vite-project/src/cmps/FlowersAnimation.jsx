import { useEffect, useState } from 'react'

export function FlowersAnimation() {
    const [flowers, setFlowers] = useState([])
    const FLOWER_EMOJIS = ['🌸', '🌺', '🌹', '🌷', '🌼', '💐', '🌻', '🪷']

    useEffect(() => {
        const initialFlowers = Array.from({ length: 20 }, createFlower)
        setFlowers(initialFlowers)

        const interval = setInterval(() => {
            setFlowers(prev => [...prev, createFlower()])
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    function createFlower() {
        return {
            id: Math.random(),
            emoji: FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)],
            left: -50,
            top: Math.random() * window.innerHeight,
            size: Math.random() * 20 + 20,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5
        }
    }

    return (
        <div className="flowers-container">
            {flowers.map(flower => (
                <div
                    key={flower.id}
                    className="floating-flower"
                    style={{
                        left: flower.left + 'px',
                        top: flower.top + 'px',
                        fontSize: flower.size + 'px',
                        animationDuration: flower.duration + 's',
                        animationDelay: flower.delay + 's'
                    }}
                >
                    {flower.emoji}
                </div>
            ))}
        </div>
    )
}