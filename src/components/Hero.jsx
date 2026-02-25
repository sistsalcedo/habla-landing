import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mic } from 'lucide-react'

function WaveformBars({ color = 'accent', count = 8, delay = 0 }) {
  const isAccent = color === 'accent'
  return (
    <div className="flex h-6 items-end gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay + i * 0.08,
          }}
          style={{ transformOrigin: 'bottom' }}
          className={`h-5 w-1 rounded-full ${isAccent ? 'bg-accent' : 'bg-indigo-500'}`}
        />
      ))}
    </div>
  )
}

function scrollToSection(e, href) {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  return (
    <header className="relative overflow-hidden px-6 pb-24 pt-16">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]" />

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent"
          >
            API de voz pensada para español y Latinoamérica
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl"
          >
            Convierte voz en respuestas inteligentes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 max-w-[540px] text-xl text-text-muted"
          >
            Integra reconocimiento de voz, IA conversacional y síntesis de voz en minutos. Dos modos: push-to-talk o conversación natural con detección de silencio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 flex flex-wrap gap-4"
          >
            <Link to="/registro">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-black no-underline transition-colors hover:bg-accent-hover"
              >
                Empezar gratis — 100 min/mes
              </motion.span>
            </Link>
            <motion.a
              href="#producto"
              onClick={(e) => scrollToSection(e, '#producto')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-transparent px-7 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-border"
            >
              Ver cómo funciona
            </motion.a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-text-muted"
          >
            Sin tarjeta de crédito · Configuración en 5 minutos · No necesitas contactar ventas para probar
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-[400px] overflow-hidden rounded-xl border border-border bg-bg-card">
            <div className="flex gap-2 border-b border-border bg-border/50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-zinc-600" />
              <span className="h-3 w-3 rounded-full bg-zinc-600" />
              <span className="h-3 w-3 rounded-full bg-zinc-600" />
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <Mic className="h-5 w-5 shrink-0 text-accent" />
                <WaveformBars color="accent" count={8} />
              </div>
              <p className="text-[15px] text-text-muted">"¿Cuál es el pronóstico para mañana?"</p>
              <WaveformBars color="indigo" count={8} delay={0.3} />
              <p className="text-[15px] text-indigo-400">"Mañana habrá sol con máximas de 24°C..."</p>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
