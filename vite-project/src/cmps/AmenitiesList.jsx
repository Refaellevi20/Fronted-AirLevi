import { Loader } from "./Loader"
import { StayAmenity } from "./StayAmenity"

export function AmenitiesList({amenitiesToDisplay}) {

    if(!amenitiesToDisplay || !Array.isArray(amenitiesToDisplay))return <div><Loader /></div>
    return (
        <ul className="amenities-container flex">
            {amenitiesToDisplay.map((amenity, index) => (
                <li key={index}>
                    <StayAmenity amenity={amenity}/>
                    <span className="amenity-name">{amenity}</span>
                </li>
            ))}
        </ul>
    )
}