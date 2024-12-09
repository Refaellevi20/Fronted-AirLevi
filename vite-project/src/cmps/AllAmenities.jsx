import { AmenitiesList } from "./AmenitiesList"

export function AllAmenities({ amenities }) {
    console.log('amenities', amenities)
    return (
        <section className="all-amenities">
            <div className="amenities-header">
            <h3>What this place offers</h3>
            </div>
            <div className="amenities-container">
            <AmenitiesList amenitiesToDisplay={amenities} />
            </div>
        </section>
    )

}