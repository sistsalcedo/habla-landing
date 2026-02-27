import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator } from 'lucide-react'
import { useCurrency } from '../contexts/CurrencyContext'

const PUSH_RATE = 0.04
const FLOW_RATE = 0.05

function estimateCost(minutes, pushPercent = 50) {
  const pushMin = (minutes * pushPercent) / 100
  const flowMin = minutes - pushMin
  const pushCost = pushMin * PUSH_RATE
  const flowCost = flowMin * FLOW_RATE
  return {
    total: pushCost + flowCost,
    pushCost,
    flowCost,
    pushMin: Math.round(pushMin),
    flowMin: Math.round(flowMin),
  }
}

export default function PricingCalculator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [minutes, setMinutes] = useState(500)
  const [pushPercent, setPushPercent] = useState(50)
  const { formatPrice, formatPricePerMin } = useCurrency()

  const { total, pushCost, flowCost, pushMin, flowMin } = estimateCost(minutes, pushPercent)
  const planSuggestion =
    minutes <= 75 ? 'Hobby' : minutes <= 500 ? 'Starter' : minutes <= 2500 ? 'Pro' : 'Enterprise'

  return (
    <section id="calculadora" className="border-y border-border bg-bg-card/30 px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex items-center gap-2">
            <Calculator className="h-6 w-6 text-accent" />
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Calculadora de costos
            </h2>
          </div>
          <p className="mb-8 text-lg text-text-muted">
            Estima tu facturación mensual según los minutos que uses. Precios por minuto: Push {formatPricePerMin(0.04)}, Flow {formatPricePerMin(0.05)}.
          </p>

          <div className="mx-auto max-w-xl rounded-xl border border-border bg-bg p-6">
            <div className="mb-6">
              <label htmlFor="minutes" className="mb-2 block text-sm font-medium text-text-muted">
                Minutos/mes
              </label>
              <input
                id="minutes"
                type="range"
                min="50"
                max="5000"
                step="50"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="mb-2 w-full accent-accent"
              />
              <div className="flex justify-between text-sm text-text-muted">
                <span>50</span>
                <span className="font-semibold text-white">{minutes} min</span>
                <span>5.000</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-text-muted">
                Uso estimado: Push {pushPercent}% · Flow {100 - pushPercent}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={pushPercent}
                onChange={(e) => setPushPercent(Number(e.target.value))}
                className="w-full accent-accent"
              />
            </div>

            <div className="space-y-3 rounded-lg bg-border/50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Habla Push ({pushMin} min)</span>
                <span className="text-white">{formatPrice(pushCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Habla Flow ({flowMin} min)</span>
                <span className="text-white">{formatPrice(flowCost)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold text-white">
                <span>Total estimado/mes</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-text-muted">
              Plan sugerido: <strong className="text-accent">{planSuggestion}</strong>.{' '}
              {minutes <= 75 && 'Hobby incluye 75 min gratis.'}
            </p>

            <div className="mt-6 text-center">
              <Link
                to="/registro"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-black no-underline transition-colors hover:bg-accent-hover"
              >
                Crear cuenta gratis
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
