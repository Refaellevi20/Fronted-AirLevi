import React from 'react';

export function HostDetails({ stayData, onChange }) {
    const handleInputChange = (ev) => {
        onChange({ host: { ...stayData.host, [ev.target.name]: ev.target.value } })
    }

    return (
        <div>
            <h2>Edit Host Details</h2>
            <input
                type="text"
                name="fullname"
                value={stayData.host.fullname}
                onChange={handleInputChange}
                placeholder="Host Full Name"
            />
            <input
                type="text"
                name="imgUrl"
                value={stayData.host.imgUrl}
                onChange={handleInputChange}
                placeholder="Host Image URL"
            />
        </div>
    )
}

