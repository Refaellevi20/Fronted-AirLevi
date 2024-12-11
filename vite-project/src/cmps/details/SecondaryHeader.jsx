import { useNavigate, useSearchParams } from "react-router-dom";
import { utilService } from "../../services/util.service";

export function SecondaryHeader({ stay,reserveBtnVisible,setOpenTab,imgGridVisible }) {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const orderParams = {
        checkIn: searchParams.get('checkIn')
            ? new Date(+searchParams.get('checkIn'))
            : '',
        checkOut: searchParams.get('checkOut')
            ? new Date(+searchParams.get('checkOut'))
            : '',
        guests: {
            adults: +searchParams.get('adults') || 1,
            children: +searchParams.get('children') || 0,
            infants: +searchParams.get('infants') || 0,
            pets: +searchParams.get('pets') || 0,
        },
    }

    function onClickReserve() {
        const paramsToSet = utilService.objectToSearchParams({
            checkIn: orderParams.checkIn.getTime(),
            checkOut: orderParams.checkOut.getTime(),
            adults: orderParams.guests.adults,
            children: orderParams.guests.children,
            infants: orderParams.guests.infants,
            pets: orderParams.guests.pets,
        })
        navigate(`/book/stay/${stay._id}?${paramsToSet}`)
    }

    return (
        <div className='secondary-header-container'  style={{ display: imgGridVisible ? 'none' : 'block' }}>
            <div className={'secondary-header secondary-layout'} >
                <div className='anchor-links'>
                    <a className='anchor-link' href='#stay-top' >Photos</a>
                    <a className='anchor-link' href='#amenities' >Amenities</a>
                    <a className='anchor-link' href='#location' >Location</a>
                    <a className='anchor-link' href='#reviews' >reviews</a>
                </div>
                <div className='book-it-details' style={{ display: reserveBtnVisible ? 'none' : 'flex' }}>
                    <header className='order-form-header'>
                        <h4><span className="price">${(Math.round(stay.price)).toLocaleString()}</span> night</h4>
                        <div className='order-rating-review flex'>
                            {/* <RatingReview reviews={stay.reviews} /> */}
                            <span>•</span>
                            <div
                                className='stay-rating'>
                                {stay.reviews.length} reviews
                            </div>
                        </div>
                    </header>

                </div>
            </div>
        </div>
    )
}