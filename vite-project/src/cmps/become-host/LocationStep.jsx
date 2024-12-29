import { useState, useCallback } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { MdLocationOn, MdSearch } from 'react-icons/md'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete'

export function LocationStep({ stayData, setStayData }) {
    const [map, setMap] = useState(null)
    const [marker, setMarker] = useState(null)

    const {
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    })

    const center = {
        lat: stayData.loc?.lat || 32.0853,
        lng: stayData.loc?.lng || 34.7818
    }

    const onLoad = useCallback(map => {
        setMap(map)
    }, [])

    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    const handleSelect = async (address) => {
        setValue(address, false)
        clearSuggestions()

        try {
            const results = await getGeocode({ address })
            const { lat, lng } = await getLatLng(results[0])
           
            setStayData({
                ...stayData,
                loc: {
                    address,
                    lat,
                    lng,
                    country: getCountryFromResults(results[0]),
                    city: getCityFromResults(results[0])
                }
            })

            if (map) {
                map.panTo({ lat, lng })
                map.setZoom(15)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="location-step">
            <div className="location-container">
                <h2>Where's your place located?</h2>
                <p>Your address will be shared with guests only after they've made a reservation.</p>

                <div className="search-container">
                    <div className="search-input-wrapper">
                        <MdSearch className="search-icon" />
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter your address"
                            className="location-input"
                        />
                        <MdLocationOn className="location-pin" />
                    </div>

                    {status === "OK" && (
                        <div className="suggestions-dropdown">
                            {data.map((suggestion) => {
                                const {
                                    place_id,
                                    structured_formatting: { main_text, secondary_text },
                                } = suggestion

                                return (
                                    <button
                                        key={place_id}
                                        className="suggestion-item"
                                        onClick={() => handleSelect(suggestion.description)}
                                    >
                                        <MdLocationOn className="suggestion-icon" />
                                        <div className="suggestion-text">
                                            <span className="main-text">{main_text}</span>
                                            <span className="secondary-text">{secondary_text}</span>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>

                <div className="map-container">
                    <GoogleMap
                        mapContainerClassName="google-map"
                        center={center}
                        zoom={15}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={{
                            fullscreenControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            zoomControl: true,
                            styles: [
                                {
                                    featureType: "poi",
                                    elementType: "labels",
                                    stylers: [{ visibility: "off" }],
                                },
                            ],
                        }}
                    >
                        {stayData.loc && (
                            <Marker
                                position={{ lat: stayData.loc.lat, lng: stayData.loc.lng }}
                            />
                        )}
                    </GoogleMap>
                </div>
            </div>
        </div>
    )
}