import { useState } from 'react'
import { FaUser, FaChild, FaBaby, FaPaw } from 'react-icons/fa'

export function GuestStep({ stayData, setStayData }) {
    const [guests, setGuests] = useState({
        capacity: stayData?.capacity || 0,
        children: stayData?.children || 1,
        infants: stayData?.infants || 0,
        pets: stayData?.pets || 0
    })

    const handleChange = (type, change) => {
        const newValue = Math.max(0, guests[type] + change)
        setGuests(prev => ({
            ...prev,
            [type]: newValue
        }))
        setStayData({
            ...stayData,
            [type]: newValue
        })
    }


    //* the Number is for to promise it is a number becouse
    //*  in js sometimes state can be a string (e.g., "1" instead of 1),
    //*  so Number says u promies u will be a number or nan but in nan i say 0 so that is how i fixed it

    return (
        <div className="guest-step">
            <div className="guest-container">
                <h2>How many guests can your place accommodate?</h2>
                <p>Check that you have enough beds to accommodate all your guests comfortably.</p>

                <div className="guest-types">
                    <div className="guest-type">
                        <div className="type-header">
                            <div className="type-icon">
                                <FaUser />
                            </div>
                            <div>
                                <h3>Guests</h3>
                                <p>Ages 13 or above</p>
                            </div>
                        </div>
                        <div className="counter">
                            <button
                                onClick={() => handleChange('capacity', -1)}
                                disabled={guests.capacity === 1}
                            >
                                -
                            </button>
                            <span>{Number(guests.capacity) || 0}</span>
                            <button onClick={() => handleChange('capacity', 1)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="guest-type">
                        <div className="type-header">
                            <div className="type-icon">
                                <FaChild />
                            </div>
                            <div>
                                <h3>Children</h3>
                                <p>Ages 2-12</p>
                            </div>
                        </div>
                        <div className="counter">
                            <button
                                onClick={() => handleChange('children', -1)}
                                disabled={guests.children === 0}
                            >
                                -
                            </button>
                            <span>{guests.children}</span>
                            <button onClick={() => handleChange('children', 1)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="guest-type">
                        <div className="type-header">
                            <div className="type-icon">
                                <FaBaby />
                            </div>
                            <div>
                                <h3>Infants</h3>
                                <p>Under 2</p>
                            </div>
                        </div>
                        <div className="counter">
                            <button
                                onClick={() => handleChange('infants', -1)}
                                disabled={guests.infants === 0}
                            >
                                -
                            </button>
                            <span>{guests.infants}</span>
                            <button onClick={() => handleChange('infants', 1)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="guest-type">
                        <div className="type-header">
                            <div className="type-icon">
                                <FaPaw />
                            </div>
                            <div>
                                <h3>Pets</h3>
                                <p>Service animals always allowed</p>
                            </div>
                        </div>
                        <div className="counter">
                            <button
                                onClick={() => handleChange('pets', -1)}
                                disabled={guests.pets === 0}
                            >
                                -
                            </button>
                            <span>{guests.pets}</span>
                            <button onClick={() => handleChange('pets', 1)}>
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}