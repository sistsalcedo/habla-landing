import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useCurrency, CURRENCY_OPTIONS } from '../contexts/CurrencyContext'

export default function CurrencyToggle({ variant = 'default' }) {
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const compact = variant === 'compact'

  const current = CURRENCY_OPTIONS.find((o) => o.code === currency) || CURRENCY_OPTIONS[0]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 rounded-lg border border-border bg-bg/50 text-white transition-colors hover:border-border/80 hover:bg-border/30 ${
          compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
        }`}
        aria-label="Cambiar moneda"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={compact ? 'text-xs' : ''}>{current.code}</span>
        <ChevronDown className={`text-text-muted transition-transform ${open ? 'rotate-180' : ''} ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 max-h-[280px] min-w-[180px] overflow-auto rounded-lg border border-border bg-bg py-1 shadow-xl"
        >
          {CURRENCY_OPTIONS.map((opt) => (
            <li key={opt.code} role="option" aria-selected={currency === opt.code}>
              <button
                type="button"
                onClick={() => {
                  setCurrency(opt.code)
                  setOpen(false)
                }}
                className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-border/50 ${
                  currency === opt.code ? 'bg-accent/20 text-accent' : 'text-white'
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
