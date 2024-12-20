import React, { useState, useEffect } from 'react';

function ReviewFilter({ reviews, setFilteredReviews }) {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setFilteredReviews(
            reviews.filter((review) =>
                review.txt.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    }, [searchTerm, reviews, setFilteredReviews])

    return (
        <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
            }}
        />
    )
}

export default ReviewFilter
