import { utilService } from "../../services/util.service"

export function OrderDetails({ checkIn, checkOut, stay }) {

    const SERVICE_FEE = 11.2
    const  totalStay = utilService.totalDays(checkIn, checkOut)
    const totalPriceBefore = stay.price * totalStay
    const serviceFee = Math.round(SERVICE_FEE * totalStay)
    const totalPriceAfter = totalPriceBefore + serviceFee

    return(
        <>
        <p className="no-charge-msg" style={{ textAlign: 'center' }}>You won't be charged yet</p>
        <div className="prices grid">
            <p>${(stay.price).toLocaleString()} x {totalStay} nights</p>
            <p>${totalPriceBefore.toLocaleString()}</p>
            <p>Service fee</p>
            <p>${(Math.round(SERVICE_FEE * totalStay)).toLocaleString()}</p>
        </div>
        <div className="total flex justify-between">
            <p>Total</p>
            <p>${totalPriceAfter.toLocaleString()}</p>
        </div>
    </>
    )
}