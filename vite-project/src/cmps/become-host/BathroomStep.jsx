import { useState } from 'react'

export function BathroomStep({ stayData, setStayData }) {
    const [bathrooms, setBathrooms] = useState({
        private: stayData.bathrooms?.private || 1,
        dedicated: stayData.bathrooms?.dedicated || 0,
        shared: stayData.bathrooms?.shared || 0
    })

    const handleChange = (type, change) => {
        const newValue = Math.max(0, bathrooms[type] + change)
        setBathrooms(prev => ({
            ...prev,
            [type]: newValue
        }))
        setStayData({
            ...stayData,
            bathrooms: {
                ...bathrooms,
                [type]: newValue
            }
        })
    }

    return (
        <div className="bathroom-step">
            <div className="bathroom-container">
                <h2>What kind of bathrooms are available to guests?</h2>

                <div className="bathroom-types">
                    <div className="bathroom-type">
                        <div className="type-header">
                            <h3>Private</h3>
                            <p>A bathroom that is not shared</p>
                        </div>
                        <div className="counter">
                            <button
                                onClick={() => handleChange('private', -1)}
                                disabled={bathrooms.private === 0}
                            >
                                -
                            </button>
                            <span>{bathrooms.private}</span>
                            <button onClick={() => handleChange('private', 1)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="bathroom-type">
                        <div className="type-header">
                            <h3>Dedicated</h3>
                            <p>A bathroom that is not shared, but accessed from a common area</p>
                        </div>
                        <div className="counter">
                            <button
                                onClick={() => handleChange('dedicated', -1)}
                                disabled={bathrooms.dedicated === 0}
                            >
                                -
                            </button>
                            <span>{bathrooms.dedicated}</span>
                            <button onClick={() => handleChange('dedicated', 1)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="bathroom-type">
                        <div className="type-header">
                            <h3>Shared</h3>
                            <p>A bathroom that is shared with other guests or residents</p>
                        </div>
                        <div className="counter">
                            <button
                                onClick={() => handleChange('shared', -1)}
                                disabled={bathrooms.shared === 0}
                            >
                                -
                            </button>
                            <span>{bathrooms.shared}</span>
                            <button onClick={() => handleChange('shared', 1)}>
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}