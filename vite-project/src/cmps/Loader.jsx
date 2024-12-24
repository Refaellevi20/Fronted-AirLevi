import React from 'react'
import loader from '/img/airbnb_logo_icon.png'

export function Loader() {
    return (
        <div className="loader-wrapper">
            <div className="loader-container">
                <img src={loader} className="thloader" alt="Loading..." />
                <div className="loader-shadow"></div>
                <div className="loader-text">Loading amazing places...</div>
            </div>
        </div>
    )
} 
