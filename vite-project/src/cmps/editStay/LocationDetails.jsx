import React from 'react';

export function LocationDetails({ stayData, onChange }) {
    const handleInputChange = (e) => {
        onChange({ loc: { ...stayData.loc, [e.target.name]: e.target.value } })
    }

    return (
        <div>
            <h2>Edit Location Details</h2>
            <input
                type="text"
                name="city"
                value={stayData.loc.city}
                onChange={handleInputChange}
                placeholder="City"
            />
            <input
                type="text"
                name="address"
                value={stayData.loc.address}
                onChange={handleInputChange}
                placeholder="Address"
            />
        </div>
    )
}

