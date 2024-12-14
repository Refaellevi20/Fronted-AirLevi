import { useParams } from "react-router-dom"
import { utilService } from "../../services/util.service"
import { SearchBtn } from "./SearchBtn"


export function SearchPreview({ handlePreviewClick, staySearchParams }) {
    const { location, checkIn, checkOut, guests } = staySearchParams
    const { stayId } = useParams()
    // console.log("setIsSearchActive in SearchPreview:", typeof setIsSearchActive)
    const locationContent = location || 'Anywhere'
    const dateContent = (checkIn && checkOut) ?
        `${utilService.ShortFormattedDate(+checkIn)} - ${utilService.ShortFormattedDate(+checkOut)}`
        : 'Any week'
    const guestsContent = guests.adults ?
        `${guests.adults + guests.children} guests`
        : 'Add guests'

    return (
        <div className="search-preview" >
            {!!stayId && <>
                <button className="start-your-search" onClick={() => handlePreviewClick('location')}>Start your search</button>
            </>}
            {!stayId && <>
                <button className="search-anywhere" onClick={() => handlePreviewClick('location')}>{locationContent}</button>
                <span className="splitter"></span>
                <button className="search-any-week" onClick={() => handlePreviewClick('checkIn')}>{dateContent}</button>
                <span className="splitter"></span>
                <button className="search-add-guests" onClick={() => handlePreviewClick('guests')}>{guestsContent}</button>
            </>}
            <SearchBtn/>
        </div>
    )
}

// setIsSearchActive={setIsSearchActive} 