import { createContext, useContext, useState, useCallback, useMemo } from 'react'

// Tipos de cambio aproximados vs USD (actualizar según sea necesario)
export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', label: 'USD — Estados Unidos', rate: 1 },
  MXN: { code: 'MXN', symbol: '$', label: 'MXN — México', rate: 17.5 },
  PEN: { code: 'PEN', symbol: 'S/', label: 'PEN — Perú', rate: 3.75 },
  COP: { code: 'COP', symbol: '$', label: 'COP — Colombia', rate: 4000 },
  CLP: { code: 'CLP', symbol: '$', label: 'CLP — Chile', rate: 950 },
  ARS: { code: 'ARS', symbol: '$', label: 'ARS — Argentina', rate: 1100 },
  EUR: { code: 'EUR', symbol: '€', label: 'EUR — España', rate: 0.92 },
  BOB: { code: 'BOB', symbol: 'Bs', label: 'BOB — Bolivia', rate: 6.9 },
}

export const CURRENCY_OPTIONS = Object.entries(CURRENCIES).map(([code, c]) => ({
  code,
  label: c.label,
}))

const CURRENCY_KEY = 'habla_currency'
const CurrencyContext = createContext(null)

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    try {
      const stored = localStorage.getItem(CURRENCY_KEY) || 'USD'
      return CURRENCIES[stored] ? stored : 'USD'
    } catch {
      return 'USD'
    }
  })

  const setCurrency = useCallback((value) => {
    setCurrencyState(value)
    try {
      localStorage.setItem(CURRENCY_KEY, value)
    } catch {}
  }, [])

  const formatPrice = useCallback(
    (value) => {
      const c = CURRENCIES[currency]
      if (!c) return `$${value}`
      if (currency === 'USD') {
        const opts = { minimumFractionDigits: value % 1 !== 0 ? 2 : 0, maximumFractionDigits: 2 }
        return `${c.symbol}${typeof value === 'number' ? value.toLocaleString('es-MX', opts) : value}`
      }
      const converted = typeof value === 'number' ? Math.round(value * c.rate) : value
      const formatted = typeof converted === 'number' ? converted.toLocaleString('es-MX') : converted
      return `${c.symbol}${formatted} ${c.code}`
    },
    [currency]
  )

  const formatPricePerMin = useCallback(
    (value) => {
      const c = CURRENCIES[currency]
      if (!c) return `$${value.toFixed(2)}/min`
      if (currency === 'USD') {
        return `${c.symbol}${value.toFixed(2)}/min`
      }
      const converted = Math.round(value * c.rate)
      return `${c.symbol}${converted.toLocaleString('es-MX')} ${c.code}/min`
    },
    [currency]
  )

  const convert = useCallback(
    (value) => {
      const c = CURRENCIES[currency]
      if (!c || currency === 'USD') return value
      return Math.round(value * c.rate)
    },
    [currency]
  )

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      formatPrice,
      formatPricePerMin,
      convert,
      isLocal: currency !== 'USD',
      currentCurrency: CURRENCIES[currency],
    }),
    [currency, formatPrice, formatPricePerMin, convert]
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
