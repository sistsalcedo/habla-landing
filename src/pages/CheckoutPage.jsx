import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard } from 'lucide-react'
import { useCurrency } from '../contexts/CurrencyContext'
import { useAuth } from '../contexts/AuthContext'
import { PLANS, getPlanPrice } from '../lib/pricing'

const API_CHECKOUT = '/api/mercadopago-checkout'

export default function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const planId = searchParams.get('plan') || 'starter'
  const period = searchParams.get('period') || 'monthly'
  const { formatPrice, currency } = useCurrency()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const plan = PLANS[planId]
  const priceUSD = getPlanPrice(planId, period)

  useEffect(() => {
    setError('')
  }, [planId, period])

  if (!plan) {
    return (
      <div className="px-6 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">Plan no encontrado</h1>
        <Link to="/#precios" className="text-accent hover:underline">
          Ver planes
        </Link>
      </div>
    )
  }

  const p = period === 'annual' ? plan.annual : plan.monthly
  if (p.price === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">Plan Hobby es gratuito</h1>
        <p className="mb-6 text-text-muted">Regístrate para empezar con 75 minutos incluidos.</p>
        <Link to="/registro" className="rounded-lg bg-accent px-6 py-3 font-semibold text-black no-underline">
          Crear cuenta gratis
        </Link>
      </div>
    )
  }

  const handlePagar = async () => {
    setLoading(true)
    setError('')
    try {
      const amountUSD = priceUSD
      const res = await fetch(API_CHECKOUT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planId,
          period,
          amount_usd: amountUSD,
          currency_displayed: currency,
          email: user?.email || '',
          user_id: user?.id || '',
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Error al crear el link de pago')
      }
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No se recibió URL de pago')
      }
    } catch (err) {
      setError(err.message || 'Error al procesar el pago')
      setLoading(false)
    }
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-bg-card p-8"
        >
          <h1 className="mb-2 text-2xl font-bold text-white">Checkout — {plan.name}</h1>
          <p className="mb-6 text-text-muted">{p.desc}</p>

          <div className="mb-6 flex items-baseline justify-between rounded-lg bg-border/50 p-4">
            <span className="text-text-muted">Precio mostrado ({currency})</span>
            <span className="text-2xl font-bold text-white">{formatPrice(p.price)}</span>
          </div>

          <p className="mb-6 text-sm text-text-muted">
            Cobraremos en USD. Si elegiste otra moneda (p. ej. BOB), tu banco mostrará el equivalente en tu estado de cuenta.
            <br />
            <strong className="text-white">Monto a cobrar: ${priceUSD.toFixed(2)} USD</strong>
          </p>

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handlePagar}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-4 font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            <CreditCard className="h-5 w-5" />
            {loading ? 'Procesando...' : 'Pagar con Mercado Pago'}
          </button>
        </motion.div>

        <p className="mt-6 text-center text-sm text-text-muted">
          <Link to="/#precios" className="text-accent hover:underline">
            ← Volver a precios
          </Link>
        </p>
      </div>
    </div>
  )
}
