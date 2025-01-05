import React, { useState } from 'react';
import currencySymbolMap from 'currency-symbol-map'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrency } from '../store/stay/stay.action'
import { HiXMark } from "react-icons/hi2";
import { ModalSize } from '../CustomHook/useModalSize';

function CurrencyModal({ isOpen, onClose }) {
    const dispatch = useDispatch()
    const currency = useSelector(state => state.stayModule.currency)
    const [selectedCurrency, setSelectedCurrency] = useState(currency)

    const currencyCodes = [
        'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'MXN',
        'BRL', 'ZAR', 'RUB', 'KRW', 'SGD', 'HKD', 'NZD', 'NOK', 'SEK', 'DKK',
        'THB', 'MYR', 'PHP', 'IDR', 'VND', 'PLN', 'CZK', 'HUF', 'TRY', 'AED',
        'SAR', 'ILS', 'EGP', 'NGN', 'GHS', 'KES', 'TZS', 'UGX', 'PKR', 'BDT',
        'LKR', 'MAD', 'CLP', 'COP', 'PEN', 'ARS', 'UAH', 'KZT', 'QAR', 'BHD'
    ]

    const supportedCurrencies = currencyCodes.map(code => ({
        code,
        name: code,
        symbol: currencySymbolMap(code) || 'Not available'
    }))

    const handleCurrencySelection = (newCurrency) => {
        dispatch(setCurrency(newCurrency))
        // console.log('Toggling currency from', currency, 'to', newCurrency) //^ for testing
        setSelectedCurrency(newCurrency)
        onClose()
    }

    const currencyDetails = {
        USD: { name: 'United States Dollar', symbol: '$' },
        EUR: { name: 'Euro', symbol: '€' },
        GBP: { name: 'British Pound', symbol: '£' },
        JPY: { name: 'Japanese Yen', symbol: '¥' },
        AUD: { name: 'Australian Dollar', symbol: 'A$' },
        CAD: { name: 'Canadian Dollar', symbol: 'C$' },
        CHF: { name: 'Swiss Franc', symbol: 'CHF' },
        CNY: { name: 'Chinese Yuan', symbol: '¥' },
        INR: { name: 'Indian Rupee', symbol: '₹' },
        MXN: { name: 'Mexican Peso', symbol: '$' },
        BRL: { name: 'Brazilian Real', symbol: 'R$' },
        ZAR: { name: 'South African Rand', symbol: 'R' },
        RUB: { name: 'Russian Ruble', symbol: '₽' },
        KRW: { name: 'South Korean Won', symbol: '₩' },
        SGD: { name: 'Singapore Dollar', symbol: 'S$' },
        HKD: { name: 'Hong Kong Dollar', symbol: 'HK$' },
        NZD: { name: 'New Zealand Dollar', symbol: 'NZ$' },
        NOK: { name: 'Norwegian Krone', symbol: 'kr' },
        SEK: { name: 'Swedish Krona', symbol: 'kr' },
        DKK: { name: 'Danish Krone', symbol: 'kr' },
        THB: { name: 'Thai Baht', symbol: '฿' },
        MYR: { name: 'Malaysian Ringgit', symbol: 'RM' },
        PHP: { name: 'Philippine Peso', symbol: '₱' },
        IDR: { name: 'Indonesian Rupiah', symbol: 'Rp' },
        VND: { name: 'Vietnamese Dong', symbol: '₫' },
        PLN: { name: 'Polish Zloty', symbol: 'zł' },
        CZK: { name: 'Czech Koruna', symbol: 'Kč' },
        HUF: { name: 'Hungarian Forint', symbol: 'Ft' },
        TRY: { name: 'Turkish Lira', symbol: '₺' },
        AED: { name: 'UAE Dirham', symbol: 'د.إ' },
        SAR: { name: 'Saudi Riyal', symbol: '﷼' },
        ILS: { name: 'Israeli Shekel', symbol: '₪' },
        EGP: { name: 'Egyptian Pound', symbol: '£' },
        NGN: { name: 'Nigerian Naira', symbol: '₦' },
        GHS: { name: 'Ghanaian Cedi', symbol: '₵' },
        KES: { name: 'Kenyan Shilling', symbol: 'KSh' },
        TZS: { name: 'Tanzanian Shilling', symbol: 'TSh' },
        UGX: { name: 'Ugandan Shilling', symbol: 'USh' },
        PKR: { name: 'Pakistani Rupee', symbol: '₨' },
        BDT: { name: 'Bangladeshi Taka', symbol: '৳' },
        LKR: { name: 'Sri Lankan Rupee', symbol: 'Rs' },
        MAD: { name: 'Moroccan Dirham', symbol: 'MAD' },
        CLP: { name: 'Chilean Peso', symbol: '$' },
        COP: { name: 'Colombian Peso', symbol: '$' },
        PEN: { name: 'Peruvian Sol', symbol: 'S/' },
        ARS: { name: 'Argentine Peso', symbol: '$' },
        UAH: { name: 'Ukrainian Hryvnia', symbol: '₴' },
        KZT: { name: 'Kazakhstani Tenge', symbol: '₸' },
        QAR: { name: 'Qatari Riyal', symbol: 'ر.ق' },
        BHD: { name: 'Bahraini Dinar', symbol: 'BD' },
    }

    if (!isOpen) return null

    return (
        <div className='currency-modal-container'>
            <div
                className="modal-overlay"
                onClick={(ev) =>
                    ev.target.classList.contains('modal-overlay') && onClose()
                }
            >
                <div className="modal">
                    <ModalSize closeModal={onClose} className="border-buttom" />
                      <h2 className="border-top">Choose Currency</h2>
                    <section className='grid-buttons'>
                        {supportedCurrencies.map((currency) => (
                            <button
                                key={currency.code}
                                onClick={() => handleCurrencySelection(currency.code)}
                                className={
                                    selectedCurrency === currency.code ? 'selected' : ''
                                }
                            >
                                <div className="currency-name">
                                    {currencyDetails[currency.code]?.name || currency.name || 'Unknown Currency'}
                                    <div className="currency-symbol">
                                        {currencyDetails[currency.code]?.symbol || ''}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default CurrencyModal

//* default using more then once
