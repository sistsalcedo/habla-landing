import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Zap, Code, Globe, MessageCircle, DollarSign } from 'lucide-react'

const signals = [
  {
    Icon: Globe,
    text: 'Español MX, CO, AR, PE',
    sub: 'Acentos latinos soportados',
  },
  {
    Icon: Zap,
    text: 'Latencia < 3s',
    sub: 'Pipeline optimizado',
  },
  {
    Icon: DollarSign,
    text: 'Precio transparente',
    sub: 'Sin créditos ni costes ocultos',
  },
  {
    Icon: MessageCircle,
    text: 'Soporte en español',
    sub: 'Respuesta < 24h laborables',
  },
  {
    Icon: Shield,
    text: 'API key segura',
    sub: 'Sin tarjeta para empezar',
  },
  {
    Icon: Code,
    text: 'Integra en 5 min',
    sub: 'REST + WebSocket',
  },
]

export default function TrustSignals() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="border-y border-border bg-bg-card/50 px-6 py-12">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-10"
        >
          <p className="text-sm font-medium text-text-muted">
            +100 desarrolladores ya integran Habla
          </p>
          {signals.map(({ Icon, text, sub }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-white">{text}</p>
                <p className="text-xs text-text-muted">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
