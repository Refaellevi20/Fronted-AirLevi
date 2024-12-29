import { useState } from 'react'
import { IoBed } from 'react-icons/io5'
import { FaCouch } from 'react-icons/fa'

export function BedroomStep({ stayData, setStayData }) {
    const [bedrooms, setBedrooms] = useState({
        bedrooms: stayData.bedrooms || 1,
        beds: stayData.beds || 1,
        commonSpaces: stayData.commonSpaces || 0
    })

    const handleChange = (type, change) => {
        const newValue = Math.max(0, bedrooms[type] + change)
        setBedrooms(prev => ({
            ...prev,
            [type]: newValue
        }))
        setStayData({
            ...stayData,
            [type]: newValue
        })
    }

    return (
        <div className="bedroom-step">
            <div className="bedroom-container">
                <h2>How many bedrooms can guests use?</h2>
                <p>Include all spaces where guests can sleep</p>

                <div className="bedroom-types">
                    <div className="bedroom-type">
                        <div className="type-header">
                            <div className="type-icon">
                                <IoBed />
                            </div>
                            <div>
                                <h3>Bedrooms</h3>
                                <p>Private rooms with beds</p>
                            </div>
                        </div>
                        <div className="counter">
                            <button
                                onClick={() => handleChange('bedrooms', -1)}
                                disabled={bedrooms.bedrooms === 0}
                            >
                                -
                            </button>
                            <span>{bedrooms.bedrooms}</span>
                            <button onClick={() => handleChange('bedrooms', 1)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="bedroom-type">
                        <div className="type-header">
                            <div className="type-icon">
                                <IoBed />
                            </div>
                            <div>
                                <h3>Beds</h3>
                                <p>Total number of beds</p>
                            </div>
                        </div>
                        <div className="counter">
                            <button
                                onClick={() => handleChange('beds', -1)}
                                disabled={bedrooms.beds === 0}
                            >
                                -
                            </button>
                            <span>{bedrooms.beds}</span>
                            <button onClick={() => handleChange('beds', 1)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="bedroom-type">
                        <div className="type-header">
                            <div className="type-icon">
                                <FaCouch />
                            </div>
                            <div>
                                <h3>Common spaces</h3>
                                <p>Living rooms, dining rooms, etc.</p>
                            </div>
                        </div>
                        <div className="counter">
                            <button
                                onClick={() => handleChange('commonSpaces', -1)}
                                disabled={bedrooms.commonSpaces === 0}
                            >
                                -
                            </button>
                            <span>{bedrooms.commonSpaces}</span>
                            <button onClick={() => handleChange('commonSpaces', 1)}>
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}