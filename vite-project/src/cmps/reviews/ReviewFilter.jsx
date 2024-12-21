import React, { useState, useEffect, useCallback } from 'react';
import { CiSearch } from "react-icons/ci";
import { utilService } from '../../services/util.service';

function ReviewFilter({ reviews, setFilteredReviews }) {
    const [searchTerm, setSearchTerm] = useState('')

    //^ Debounced filtered reviews 
    const debouncedFilter = useCallback(
        utilService.debounce((term) => {
            setFilteredReviews(
                reviews.filter((review) =>
                    review.txt.toLowerCase().includes(term.toLowerCase())
                )
            )
        }, 300),
        [reviews, setFilteredReviews]
    )

    useEffect(() => {
        debouncedFilter(searchTerm)
    }, [searchTerm, debouncedFilter])

    return (
    <div style={{ position: 'relative', marginBottom: '10px' }}>
    <CiSearch
        style={{
            position: 'absolute', 
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '20px',
            color: 'black',
        }}
    />
    <input
        type="text"
        placeholder="Search reviews"
        value={searchTerm}
        onChange={(ev) => setSearchTerm(ev.target.value)}
        style={{
            // position:'fixed', //! position fixed
            // width: '70%',
            width: '100%',
            padding: '10px 10px 10px 35px', 
            borderRadius: '2em',
            border: '1px solid #ddd',
        }}
    />
</div>
)
}
export default ReviewFilter
