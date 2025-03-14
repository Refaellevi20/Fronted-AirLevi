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
  DKK: 6.5,
  THB: 33,
  MYR: 4.2,
  PHP: 51,
  IDR: 14400,
  VND: 23000,
  PLN: 3.8,
  CZK: 22,
  HUF: 300,
  TRY: 9,
  AED: 3.67,
  SAR: 3.75,
  ILS: 3.3,
  EGP: 15.7,
  NGN: 410,
  GHS: 10,
  KES: 145,
  TZS: 2300,
  UGX: 3700,
  PKR: 277,
  BDT: 108,
  LKR: 320,
  MAD: 10,
  CLP: 870,
  COP: 4150,
  PEN: 3.9,
  ARS: 120,
  UAH: 37,
  KZT: 450,
  QAR: 3.64,
  BHD: 0.38
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
  DKK: 'kr',
  THB: '฿',
  MYR: 'RM',
  PHP: '₱',
  IDR: 'Rp',
  VND: '₫',
  PLN: 'zł',
  CZK: 'Kč',
  HUF: 'Ft',
  TRY: '₺',
  AED: 'د.إ',
  SAR: '﷼',
  ILS: '₪',
  EGP: 'E£',
  NGN: '₦',
  GHS: 'GH₵',
  KES: 'KSh',
  TZS: 'TSh',
  UGX: 'USh',
  PKR: '₨',
  BDT: '৳',
  LKR: 'Rs',
  MAD: 'MAD',
  CLP: 'CLP$',
  COP: 'COL$',
  PEN: 'S/',
  ARS: '$',
  UAH: '₴',
  KZT: '₸',
  QAR: 'ر.ق',
  BHD: '.د.ب'
}
  
export function convertCurrency(amount = 0, currencyCode = 'USD') {
  const rate = conversionRates[currencyCode] || 1
  const symbol = currencySymbolMap[currencyCode] || '$'

  const validAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0
  const convertedAmount = validAmount * rate

  const formattedAmount = convertedAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return {
    convertedAmount: formattedAmount,
    currencySymbol: symbol,
  }
}