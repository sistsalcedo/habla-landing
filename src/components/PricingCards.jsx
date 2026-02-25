import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const plans = [
  {
    name: 'Hobby',
    monthly: { price: 0, desc: '100 minutos incluidos' },
    annual: { price: 0, desc: '100 minutos incluidos' },
    features: ['Habla Push y Habla Flow incluidos', 'API key incluida', 'Soporte por email'],
    cta: 'Empezar gratis',
    ctaHref: '/registro',
    primary: false,
    popular: false,
  },
  {
    name: 'Starter',
    monthly: { price: 29, desc: '500 minutos incluidos' },
    annual: { price: 23, desc: '500 minutos incluidos' },
    features: ['Todo en Hobby', 'Webhooks', 'Documentación prioritaria'],
    cta: 'Probar 14 días gratis',
    ctaHref: '/registro',
    primary: true,
    popular: true,
  },
  {
    name: 'Pro',
    monthly: { price: 79, desc: '2.500 minutos incluidos' },
    annual: { price: 63, desc: '2.500 minutos incluidos' },
    features: ['Todo en Starter', 'SLA 99.5%', 'Soporte prioritario'],
    cta: 'Contactar',
    ctaHref: '/contacto',
    primary: false,
    popular: false,
  },
]

export default function PricingCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [annual, setAnnual] = useState(false)

  return (
    <section id="precios" className="bg-bg-card px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="mb-2 text-3xl font-bold text-white md:text-4xl">
            Precios simples
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-8 text-lg text-text-muted">
            Paga solo por lo que uses. Sin sorpresas.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-12 flex items-center justify-center gap-4 text-text-muted">
            <span className={!annual ? 'text-white' : ''}>Mensual</span>
            <button
              onClick={() => setAnnual(!annual)}
              role="switch"
              aria-checked={annual}
              aria-label="Cambiar a pago anual"
              className={`relative h-7 w-14 rounded-full transition-colors ${
                annual ? 'bg-accent' : 'bg-border'
              }`}
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow"
                style={{ x: annual ? 28 : 0 }}
              />
            </button>
            <span className={annual ? 'text-white' : ''}>
              Anual <strong className="text-accent">−20%</strong>
            </span>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((plan) => {
              const p = annual ? plan.annual : plan.monthly
              return (
                <motion.div
                  key={plan.name}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className={`relative rounded-xl border p-8 ${
                    plan.popular ? 'border-accent bg-bg/50' : 'border-border bg-bg'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-black">
                      Más popular
                    </span>
                  )}
                  <h3 className="mb-2 text-xl font-semibold text-white">{plan.name}</h3>
                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">${p.price}</span>
                    <span className="text-text-muted">/mes</span>
                  </div>
                  <p className="mb-6 text-sm text-text-muted">{p.desc}</p>
                  <ul className="mb-6 list-none space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-text-muted">
                        <Check className="h-4 w-4 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={plan.ctaHref}>
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`block w-full rounded-lg py-2.5 text-center font-semibold no-underline ${
                        plan.primary
                          ? 'bg-accent text-black hover:bg-accent-hover'
                          : 'border border-border text-white hover:border-accent hover:text-accent'
                      }`}
                    >
                      {plan.cta}
                    </motion.span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.p variants={itemVariants} className="mt-12 text-center text-sm text-text-muted">
            Los minutos extra se facturan a $0.04/min en Habla Push y $0.05/min en Habla Flow.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
