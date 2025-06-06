import React from 'react'
import Box from '@mui/material/Box'

export function StarRating({ value = 0 }) {
    const renderStar = (index) => {
        const starSize = 9
        const fullStar = (
            <svg width={starSize} height={starSize} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path fill="#22222" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z" />
            </svg>
        )
        const emptyStar = (
            <svg width={starSize} height={starSize} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path fill="#22222" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z" />
            </svg>
        )

        if (index <= Math.floor(value)) {
            return fullStar
        } else if (index - 1 < value) {
            const percentage = ((value % 1) * 100).toFixed(0)
            return (
                <span style={{ position: 'relative', display: 'inline-block', width: starSize, height: starSize }}>
                    {emptyStar}
                    <span style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: `${percentage}%`,
                        height: '100%',
                        overflow: 'hidden',
                    }}>
                        {fullStar}
                    </span>
                </span>
            )
        } else {
            return emptyStar
        }
    }

    const starCount = 5

    return (
        <Box sx={{ display: 'flex', '& > svg': {} }}>
            {[...Array(starCount)].map((_, index) => (
                <span key={index}>{renderStar(index + 1)}</span>
            ))}
        </Box>
    )
}
