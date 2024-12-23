import { utilService } from "../../services/util.service"
import { BtnSquare } from "../buttons ui/btn-square"

export function ChatOrderDetails({ currOrder }) {

    const checkInDate = utilService.formattedDate(currOrder.startDate)
    const checkOutDate = utilService.formattedDate(currOrder.startDate)


    const { stay, guests, } = currOrder

    return (
        <>
            <section className="order-chat__details">
                <div className="order-summary__card">
                    <div className="order-card__header">
                        <img src={'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436394/kscsvxyn0uro9tjhefeb.jpg'} alt={'bara'} className="order-card-header__img" />
                        {/* <img src={stay.imgUrls[0]} alt={stay.name} className="order-card-header-img" /> */}
                    </div>
                    <div className="order-card-body">
                        <div className="order-card-header__text">
                            <h3 className="order-card-header__title">{'beach north'}</h3>
                            <p className="order-card-header__subtitle">Hosted by {'Shuka'}</p>
                            {/* <h3 className="order-card-header-title">{stay.name}</h3>
                        <p className="order-card-header-subtitle">Hosted by {stay.host.fullname}</p> */}
                        </div>
                        <div className="order-card-body__row" >
                            <div className="order-card-body__col">
                                <p className="order-card__check">Check-in:</p>
                                <p className="order-card__checkInDate">{checkInDate}</p>
                            </div>
                            <div className="order-card-body__col">
                                <p className="order-card__check">Check-out:</p>
                                <p className="order-card__checkInDate">{checkOutDate}</p>
                            </div>
                        </div>
                        <div className="order-card-body__row">
                            <p className="order-card__check">Guests:</p>
                            <p className="order-card__checkInDate">
                                {guests.adults} adults
                                {guests.children > 0 &&
                                    <span className="order-card__checkInDate">,{guests.children} children</span>
                                }
                                {guests.infants > 0 &&
                                    <span className="order-card__checkInDate">,{guests.infants} infants</span>
                                }
                                {guests.pets > 0 &&
                                    <span className="order-card__checkInDate">,{guests.pets} pets
                                    </span>
                                }
                            </p>
                        </div>
                        <div className="order-card-body__row price-row">
                            <p className="order-card__check">Total price:</p>
                            <p className="order-card__checkInDate total-price">${currOrder.totalPrice.toLocaleString()}</p> //! here any kind of money
                        </div>
                    </div>
                </div>
                <div className="order-summary__actions">
                    <BtnSquare>
                        Edit Order
                    </BtnSquare>
                </div>
            </section>
        </>

    )
}

