import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, X, Sparkles } from 'lucide-react'

const features = [
  { label: 'Soporte en español', habla: true, others: false },
  { label: 'Precio transparente por minuto', habla: true, others: false },
  { label: 'Sin créditos ni costes ocultos', habla: true, others: false },
  { label: 'Optimizado para acentos latinos', habla: true, others: false },
  { label: 'Respuesta soporte < 24h', habla: true, others: false },
  { label: 'Latencia baja (< 3s)', habla: true, others: true },
]

export default function ComparisonSection() {
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
          <div className="mb-8 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Por qué Habla
            </h2>
          </div>
          <p className="mb-12 max-w-2xl text-lg text-text-muted">
            Comparado con Vapi, Retell, ElevenLabs y Bland AI — Habla ofrece foco en español y Latam, precios claros y soporte directo.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border bg-bg">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-border/50">
                  <th className="px-6 py-4 font-semibold text-white">Característica</th>
                  <th className="px-6 py-4 font-semibold text-accent">Habla</th>
                  <th className="px-6 py-4 font-medium text-text-muted">Otros (Vapi, Retell, etc.)</th>
                </tr>
              </thead>
              <tbody>
                {features.map(({ label, habla, others }) => (
                  <tr key={label} className="border-b border-border last:border-b-0">
                    <td className="px-6 py-4 text-white">{label}</td>
                    <td className="px-6 py-4">
                      {habla ? (
                        <Check className="h-5 w-5 text-accent" />
                      ) : (
                        <X className="h-5 w-5 text-red-400" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {others ? (
                        <Check className="h-5 w-5 text-text-muted" />
                      ) : (
                        <X className="h-5 w-5 text-red-400/60" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
