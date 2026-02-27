import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'Integramos Habla en nuestra app de reservas en una tarde. La API es clara, la documentación excelente y el soporte en español marca la diferencia.',
    author: 'Carlos M.',
    role: 'CTO, ReservaPro — México',
    avatar: null,
  },
  {
    quote: 'Habla Flow con conversación natural cambió la experiencia de nuestros usuarios. Latencia baja y la calidad de la voz en español es muy buena.',
    author: 'Ana G.',
    role: 'Product Manager, HealthTech — Colombia',
    avatar: null,
  },
  {
    quote: '75 minutos gratis para probar sin compromiso. Validamos la integración en un par de días antes de escalar al plan Pro.',
    author: 'Miguel R.',
    role: 'Desarrollador freelance — Perú',
    avatar: null,
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mb-2 text-center text-3xl font-bold text-white md:text-4xl"
          >
            Lo que dicen los desarrolladores
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mx-auto mb-12 max-w-xl text-center text-text-muted"
          >
            Desarrolladores que ya usan Habla en sus productos
          </motion.p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="rounded-xl border border-border bg-bg-card p-6"
              >
                <Quote className="mb-4 h-8 w-8 text-accent/50" />
                <p className="mb-6 text-text-muted">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.author}</p>
                    <p className="text-sm text-text-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
