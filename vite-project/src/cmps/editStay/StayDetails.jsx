import React from 'react';

export function StayDetails({ stayData, onChange }) {
    const handleInputChange = (e) => {
        onChange({ [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h2>Edit Stay Details</h2>
            <input
                type="text"
                name="name"
                value={stayData.name}
                onChange={handleInputChange}
                placeholder="Stay Name"
            />
            <textarea
                name="description"
                value={stayData.description}
                onChange={handleInputChange}
                placeholder="Description"
            />
        </div>
    )
}

export default StayDetails;