

import React from 'react';

export function ReviewStep({ stayData, onSubmit }) {
    return (
        <div>
            <h2>Review Your Changes</h2>
            <pre>{JSON.stringify(stayData, null, 2)}</pre>
            <button onClick={onSubmit}>Confirm Changes</button>
        </div>
    )
}

export default ReviewStep;