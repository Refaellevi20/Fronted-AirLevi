import React, { useEffect, useRef, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { AiFillHome } from "react-icons/ai";
export function StayMap({ stay }) {
    const { lat, lng } = stay.loc
    const [coordinates, setCoordinates] = useState({ lat, lng })
    const mapRef = useRef(null)
    const [zoom] = useState(6)

    const Popper = () => (
        <div className="map-popper">
            <AiFillHome />
            <div className="popper-wedge"></div>
        </div>
    )

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    useEffect(() => {
        if (mapRef.current) {
            console.log("Map container is ready", mapRef.current);
        }
    }, [])
//! here border radius
    return (
        <div style={{ height: '480px', width: '100%', borderRadius: '16px' }} ref={mapRef}>
            <GoogleMapReact
                onClick={handleClick}
                yesIWantToUseGoogleMapApiInternals
                bootstrapURLKeys={{ key: "AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs" }}
                defaultCenter={coordinates}
                zoom={zoom}
            >
                <Popper lat={lat} lng={lng} onClick={() => { }} />
            </GoogleMapReact>
        </div>
    )
}


