import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useCurrency } from '../contexts/CurrencyContext'

const getFaqs = (formatPricePerMin) => [
  {
    q: '¿Cómo se factura el uso?',
    a: `Pagas por minuto de audio procesado. Los planes incluyen minutos incluidos (75 en Hobby, 500 en Starter, 2.500 en Pro). Los minutos extra se facturan a ${formatPricePerMin(0.04)} en Habla Push y ${formatPricePerMin(0.05)} en Habla Flow. Sin créditos ni costes ocultos.`,
  },
  {
    q: '¿Funciona bien con acentos latinos?',
    a: 'Sí. Habla está optimizado para español de México, Colombia, Argentina, Perú, Chile y el resto de Latinoamérica. Los modelos STT/TTS tienen buen soporte para acentos regionales y expresiones locales.',
  },
  {
    q: '¿Qué formatos de audio aceptan?',
    a: 'Habla Push acepta MP3, WAV y WebM. Habla Flow (WebSocket) envía audio PCM 16 kHz mono, 16-bit. La respuesta de ambos modos es MP3.',
  },
  {
    q: '¿Necesito tarjeta de crédito para empezar?',
    a: 'No. Puedes registrarte y usar los 75 minutos gratuitos del plan Hobby sin tarjeta. Cuando quieras escalar, añades tu método de pago.',
  },
  {
    q: '¿Cuál es el tiempo de respuesta del soporte?',
    a: 'Respondemos en menos de 24 horas laborables. Soporte en español por email y formulario de contacto.',
  },
  {
    q: '¿Habla Push o Habla Flow? ¿Cuál elegir?',
    a: 'Habla Push (REST): ideal para comandos, dictado, formularios y entornos ruidosos. Un ciclo por interacción. Habla Flow (WebSocket): para conversación natural con detección de silencio, interrupciones y streaming. Para atención al cliente, ventas, tutores.',
  },
  {
    q: '¿Hay límites de uso configurables?',
    a: 'Sí. En el Dashboard puedes configurar alertas de uso y límites para evitar sobresaltos en la facturación.',
  },
  {
    q: '¿Cómo obtengo mi API key?',
    a: 'Tras registrarte, entra al Dashboard y genera tu API key. Inclúyela en el header X-API-Key o Authorization: Bearer en todas las peticiones.',
  },
]

function FAQItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium text-white">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-text-muted">{a}</p>
        </motion.div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const { formatPricePerMin } = useCurrency()
  const faqs = getFaqs(formatPricePerMin)

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Preguntas frecuentes
          </h1>
          <p className="text-lg text-text-muted">
            Resolvemos las dudas más comunes sobre precios, integración y soporte.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-bg-card p-6"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} defaultOpen={i === 0} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-text-muted">¿No encuentras lo que buscas?</p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-semibold text-black no-underline transition-colors hover:bg-accent-hover"
          >
            Contactar soporte
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
