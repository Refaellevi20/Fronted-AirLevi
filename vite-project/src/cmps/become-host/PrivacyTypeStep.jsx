import { useState } from 'react'
import { FaHome, FaUserFriends, FaHouseUser } from 'react-icons/fa'
import { MdMeetingRoom } from 'react-icons/md'

export function PrivacyTypeStep({ stayData, setStayData }) {
    const [selectedType, setSelectedType] = useState(stayData.type || '')

    const privacyTypes = [
        {
            id: 'Entire place',
            title: 'An entire place',
            description: 'Guests have the whole place to themselves',
            icon: <FaHome />,
            details: [
                'Private entrance',
                'Dedicated space',
                'Full amenities'
            ]
        },
        {
            id: 'Private room',
            title: 'A private room',
            description: 'Guests sleep in a private room but some areas may be shared',
            icon: <MdMeetingRoom />,
            details: [
                'Private bedroom',
                'Shared common areas',
                'Interaction with host/others'
            ]
        },
        {
            id: 'Shared room',
            title: 'A shared room',
            description: 'Guests sleep in a room or common area that may be shared',
            icon: <FaUserFriends />,
            details: [
                'Shared sleeping area',
                'Shared common spaces',
                'Regular interaction'
            ]
        }
    ]

    const handleSelect = (typeId) => {
        setSelectedType(typeId)
        setStayData({
            ...stayData,
            type: typeId
        })
    }

    return (
        <div className="privacy-type-step">
            <div className="privacy-container">
                <h2>What type of place will guests have?</h2>
                <p>Choose the description that best fits your place.</p>

                <div className="privacy-options">
                    {privacyTypes.map((type) => (
                        <button
                            key={type.id}
                            className={`privacy-option ${selectedType === type.id ? 'selected' : ''}`}
                            onClick={() => handleSelect(type.id)}
                        >
                            <div className="option-content">
                                <div className="option-icon">
                                    {type.icon}
                                </div>
                                <div className="option-text">
                                    <h3>{type.title}</h3>
                                    <p>{type.description}</p>
                                </div>
                            </div>

                            {selectedType === type.id && (
                                <div className="option-details">
                                    <h4>What guests can expect:</h4>
                                    <ul>
                                        {type.details.map((detail, idx) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}