// src/utils/currency.util.js
const conversionRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110,
    AUD: 1.4,
    CAD: 1.3,
    CHF: 0.92,
    CNY: 6.5,
    INR: 75,
    MXN: 20,
    BRL: 5.5,
    ZAR: 18,
    RUB: 80,
    KRW: 1200,
    SGD: 1.36,
    HKD: 7.8,
    NZD: 1.5,
    NOK: 9,
    SEK: 9.5,
    DKK: 6.5
  }
  
  const currencySymbolMap = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'CHF',
    CNY: '¥',
    INR: '₹',
    MXN: '$',
    BRL: 'R$',
    ZAR: 'R',
    RUB: '₽',
    KRW: '₩',
    SGD: 'S$',
    HKD: 'HK$',
    NZD: 'NZ$',
    NOK: 'kr',
    SEK: 'kr',
    DKK: 'kr'
  }
  
  export const convertCurrency = (amount, currencyCode) => {
    const rate = conversionRates[currencyCode] || 1
    const symbol = currencySymbolMap[currencyCode] || '$'
    return {
      convertedAmount: amount * rate,
      currencySymbol: symbol
    }
  }
  