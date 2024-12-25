import { useLocation } from 'react-router'
import { utilService } from '../../services/util.service'
import { RatingReview } from '../RatingReview'
import { useDispatch, useSelector } from 'react-redux'
import currencySymbolMap from "currency-symbol-map";

export function PreviewInfo({ info}) {
  const url = useLocation()
  // console.log('PreviewInfo rendered with currency:', currency)
  const dispatch = useDispatch()
  const currency = useSelector(state => state.stayModule.currency)  
  if (!currency) {
    return <p>Currency is not defined.</p>
  }

  const conversionRates = {
    USD: 1,    //^ 1 USD is 1 USD
    EUR: 0.85, //^ 1 USD is 0.85 EUR
    GBP: 0.75, //^ 1 USD is 0.75 GBP
    JPY: 110,  //^ 1 USD is 110 JPY
    AUD: 1.4,  //^ 1 USD is 1.4 AUD
    CAD: 1.3,  //^ 1 USD is 1.3 CAD
    CHF: 0.92, //^ 1 USD is 0.92 CHF
    CNY: 6.5,  //^ 1 USD is 6.5 CNY
    INR: 75,   //^ 1 USD is 75 INR
    MXN: 20,   //^ 1 USD is 20 MXN
    BRL: 5.5,  //^ 1 USD is 5.5 BRL
    ZAR: 18,   //^ 1 USD is 18 ZAR
    RUB: 80,   //^ 1 USD is 80 RUB 
    KRW: 1200, //^ 1 USD is 1200 KRW
    SGD: 1.36, //^ 1 USD is 1.36 SGD
    HKD: 7.8,  //^ 1 USD is 7.8 HKD
    NZD: 1.5,  //^ 1 USD is 1.5 NZD
    NOK: 9,    //^ 1 USD is 9 NOK
    SEK: 9.5,  //^ 1 USD is 9.5 SEK
    DKK: 6.5   //^ 1 USD is 6.5 DKK
  }

  const convertAmount = (amount, currencyCode) => {
    return amount * (conversionRates[currencyCode] || 1)
  }

  const amountInOriginalCurrency = info.price
  const convertedAmount = convertAmount(amountInOriginalCurrency, currency)
  const currencySymbol = currencySymbolMap(currency) || "$"

  return (
    <>
      <p className='flex justify-between'>
        <span className='text-bold ellipsis'>{info.location}</span>{' '}
        <RatingReview reviews={info.reviews} />
      </p>
      <p className='text-grey__info'>{info.type}</p>
      <p className='text-grey__info'>
        {/$/.test(url.pathname)}
        {/stay$/.test(url.pathname) && ' Feb 1 - Feb 20'}
        {/* {/wishlist$/.test(url.pathname) && `${info.capacity} beds`} */}
      </p>
      <p className='text-bold'>
      {currencySymbol} {convertedAmount}
        <span style={{ fontFamily: 'cereal-Book' }}> night</span>
      </p>
    </>
  )
}
