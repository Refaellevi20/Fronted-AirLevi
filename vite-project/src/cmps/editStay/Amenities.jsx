import React from 'react';

export function Amenities({ stayData, onChange }) {
    function handleCheckboxChange(ev) {
        const { value, checked } = ev.target
        const updatedAmenities = checked
            ? [...stayData.amenities, value]
            : stayData.amenities.filter((amenity) => amenity !== value)
        onChange({ amenities: updatedAmenities })
    }

    const allAmenities = ['Wifi', 'Pool', 'Air Conditioning']

    return (
        <div>
            <h2>Select Amenities</h2>
            {allAmenities.map((amenity) => (
                <div key={amenity}>
                    <input
                        type="checkbox"
                        value={amenity}
                        checked={stayData.amenities.includes(amenity)}
                        onChange={handleCheckboxChange}
                    />
                    <label>{amenity}</label>
                </div>
            ))}
        </div>
    )
}

export default Amenities