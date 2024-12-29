export function FloorPlanStep({ stayData, setStayData }) {
    // Add safety check for capacity
    const capacity = stayData?.capacity || {
        guests: 1,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1
    }

    const updateFloorPlan = (field, value) => {
        setStayData({
            ...stayData,
            capacity: {
                ...capacity,
                [field]: Math.max(1, value)
            }
        })
    }

    return (
        <div className="step-content floor-plan-step">
            <div className="floor-plan-options">
                <div className="option-item">
                    <div className="option-details">
                        <h3>Guests</h3>
                        <p>Max number of guests</p>
                    </div>
                    <div className="counter">
                        <button
                            onClick={() => updateFloorPlan('guests', capacity.guests - 1)}
                            disabled={capacity.guests <= 1}
                        >-</button>
                        <span>{capacity.guests}</span>
                        <button
                            onClick={() => updateFloorPlan('guests', capacity.guests + 1)}
                        >+</button>
                    </div>
                </div>
                {/* ... rest of your component */}
            </div>
        </div>
    )
}