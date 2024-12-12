import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { convertCurrency } from "../../services/currency"
export function OrderDetails({ checkIn, checkOut, stay }) {

    const SERVICE_FEE = 11.2
    const totalStay = utilService.totalDays(checkIn, checkOut)
    const totalPriceBefore = stay.price * totalStay
    const serviceFee = Math.round(SERVICE_FEE * totalStay)
    const totalPriceAfter = totalPriceBefore + serviceFee

    const currency = useSelector((state) => state.stayModule.currency);
    const { convertedAmount: convertedTotalPrice, currencySymbol } = convertCurrency(totalPriceAfter, currency);

    return (
        <>
            <p className="no-charge-msg fs14" style={{ textAlign: 'center', padding: '0', marginTop: '16px' }}>You won't be charged yet</p>
            <div className="prices grid">
                <p>
                    {currencySymbol}{(stay.price).toLocaleString()} x {totalStay} nights
                </p>
                {/* <p>{currencySymbol}{totalPriceBefore.toLocaleString()}</p> */}
                <p>
                    {currencySymbol} {convertedTotalPrice.toFixed(2)}
                </p>
                <p>Service fee</p>
                <p>
                    {currencySymbol}{(Math.round(SERVICE_FEE * totalStay)).toLocaleString()}
                </p>
            </div>
            <div className="prices grid" style={{ border: 'none' }}>
                <p style={{ textDecoration: 'none' }}>Total</p>
                <p>
                    {currencySymbol}{totalPriceAfter.toLocaleString()}
                </p>
            </div>
        </>
    )
}