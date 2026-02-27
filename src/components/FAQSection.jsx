import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useCurrency } from '../contexts/CurrencyContext'

const getFaqs = (formatPricePerMin) => [
  {
    q: '¿Cómo se factura el uso?',
    a: `Pagas por minuto de audio procesado. Sin créditos ni costes ocultos. Minutos extra: Push ${formatPricePerMin(0.04)}, Flow ${formatPricePerMin(0.05)}.`,
  },
  {
    q: '¿Funciona con acentos latinos?',
    a: 'Sí. Optimizado para español de México, Colombia, Argentina, Perú y el resto de Latinoamérica.',
  },
  {
    q: '¿Cuál es el tiempo de respuesta del soporte?',
    a: 'Respondemos en menos de 24 horas laborables. Soporte en español por email y formulario.',
  },
  {
    q: '¿Habla Push o Habla Flow?',
    a: 'Push: comandos, dictado, formularios. Flow: conversación natural con detección de silencio e interrupciones.',
  },
]

function FAQItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-medium text-white">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pb-4 text-text-muted"
        >
          {a}
        </motion.p>
      )}
    </div>
  )
}

export default function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { formatPricePerMin } = useCurrency()
  const faqs = getFaqs(formatPricePerMin)

  return (
    <section id="faq" className="border-y border-border bg-bg-card/30 px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mb-8 text-lg text-text-muted">
            Resolvemos las dudas más comunes. Documentación en español, ejemplos listos para copiar.
          </p>

          <div className="mx-auto max-w-2xl rounded-xl border border-border bg-bg p-6">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} defaultOpen={i === 0} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-accent no-underline transition-colors hover:text-accent-hover"
            >
              Ver todas las preguntas
              <span>→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
