import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, Key, Terminal, Zap } from 'lucide-react'

const steps = [
  {
    Icon: UserPlus,
    step: 1,
    title: 'Regístrate gratis',
    desc: 'Crea tu cuenta en menos de 1 minuto. Sin tarjeta de crédito. 75 minutos incluidos al mes.',
    href: '/registro',
    label: 'Crear cuenta',
  },
  {
    Icon: Key,
    step: 2,
    title: 'Obtén tu API key',
    desc: 'Tras iniciar sesión, entra al Dashboard y genera tu API key. Guárdala en un lugar seguro.',
    href: '/dashboard',
    label: 'Ir al Dashboard',
  },
  {
    Icon: Terminal,
    step: 3,
    title: 'Primer request',
    desc: 'Envía audio con cURL, JavaScript o Python. Consulta la documentación para ejemplos.',
    href: '/documentacion',
    label: 'Ver documentación',
  },
  {
    Icon: Zap,
    step: 4,
    title: 'Integra en tu app',
    desc: 'Habla Push (REST) para comandos. Habla Flow (WebSocket) para conversación natural.',
    href: '#producto',
    label: 'Ver productos',
  },
]

export default function GettingStartedSteps() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="border-y border-border bg-bg-card/30 px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            Primer uso en 5 minutos
          </h2>
          <p className="mb-12 text-lg text-text-muted">
            Cuatro pasos para integrar voz con IA en tu aplicación.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ Icon, step, title, desc, href, label }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: step * 0.1 }}
                className="rounded-xl border border-border bg-bg p-6 transition-colors hover:border-border/80"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-text-muted">Paso {step}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                <p className="mb-4 text-sm text-text-muted">{desc}</p>
                <Link
                  to={href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent no-underline transition-colors hover:text-accent-hover"
                >
                  {label}
                  <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
