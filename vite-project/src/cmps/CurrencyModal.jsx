import React, { useState } from 'react';
import currencySymbolMap from 'currency-symbol-map'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrency } from '../store/stay/stay.action'
import { HiXMark } from "react-icons/hi2";

function CurrencyModal({ isOpen, onClose }) {
    const dispatch = useDispatch()
    const currency = useSelector(state => state.stayModule.currency)
    const [selectedCurrency, setSelectedCurrency] = useState(currency)

    const currencyCodes = [
        'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'MXN',
        'BRL', 'ZAR', 'RUB', 'KRW', 'SGD', 'HKD', 'NZD', 'NOK', 'SEK', 'DKK'
    ]

    const supportedCurrencies = currencyCodes.map(code => ({
        code,
        name: code,
        symbol: currencySymbolMap(code) || 'Not available'
    }))

    const handleCurrencySelection = (newCurrency) => {
        dispatch(setCurrency(newCurrency))
        // console.log('Toggling currency from', currency, 'to', newCurrency)
        setSelectedCurrency(newCurrency)
        onClose()
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
                    <h4 onClick={onClose} className="">
                        <HiXMark style={{ cursor: 'pointer' }} />
                    </h4>
                    <h2>Choose Currency</h2>
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
                                    {currency.code === 'USD'
                                        ? `United States dollar`
                                        : currency.code === 'EUR'
                                            ? `Euro`
                                            : currency.code === 'GBP'
                                                ? `British Pound`
                                                : currency.code === 'JPY'
                                                    ? `Japanese Yen`
                                                    : currency.code === 'AUD'
                                                        ? `Australian Dollar`
                                                        : currency.code === 'CAD'
                                                            ? `Canadian Dollar`
                                                            : currency.code === 'CHF'
                                                                ? `Swiss Franc`
                                                                : currency.code === 'CNY'
                                                                    ? `Chinese Yuan`
                                                                    : currency.code === 'INR'
                                                                        ? `Indian Rupee`
                                                                        : currency.code === 'MXN'
                                                                            ? `Mexican Peso`
                                                                            : currency.code === 'BRL'
                                                                                ? `Brazilian Real`
                                                                                : currency.code === 'ZAR'
                                                                                    ? `South African Rand`
                                                                                    : currency.code === 'RUB'
                                                                                        ? `Russian Ruble`
                                                                                        : currency.code === 'KRW'
                                                                                            ? `South Korean Won`
                                                                                            : currency.code === 'SGD'
                                                                                                ? `Singapore Dollar`
                                                                                                : currency.code === 'HKD'
                                                                                                    ? `Hong Kong Dollar`
                                                                                                    : currency.code === 'NZD'
                                                                                                        ? `New Zealand Dollar`
                                                                                                        : currency.code === 'NOK'
                                                                                                            ? `Norwegian Krone`
                                                                                                            : currency.code === 'SEK'
                                                                                                                ? `Swedish Krona`
                                                                                                                : currency.code === 'DKK'
                                                                                                                    ? `Danish Krone`                                                                                    : `${currency.name}`
                                    }
                                    <div className="currency-symbol">
                                        {currency.symbol}
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
