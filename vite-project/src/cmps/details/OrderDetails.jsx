import { utilService } from "../../services/util.service"

export function OrderDetails({ checkIn, checkOut, stay }) {

    const SERVICE_FEE = 11.2
    const  totalStay = utilService.totalDays(checkIn, checkOut)
    const totalPriceBefore = stay.price * totalStay
    const serviceFee = Math.round(SERVICE_FEE * totalStay)
    const totalPriceAfter = totalPriceBefore + serviceFee

    return(
        <>
        <p className="no-charge-msg fs14" style={{ textAlign: 'center',padding:'0',marginTop:'16px' }}>You won't be charged yet</p>
        <div className="prices grid">
            <p>${(stay.price).toLocaleString()} x {totalStay} nights</p>
            <p>${totalPriceBefore.toLocaleString()}</p> //! here format
            <p>Service fee</p>
            <p>${(Math.round(SERVICE_FEE * totalStay)).toLocaleString()}</p>
        </div>
        <div className="prices grid" style={{border:'none'}}>
            <p style={{textDecoration:'none'}}>Total</p>
            <p>${totalPriceAfter.toLocaleString()}</p>
        </div>
    </>
    )
}