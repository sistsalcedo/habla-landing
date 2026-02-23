import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mic, MessageCircle, Check } from 'lucide-react'

function scrollToSection(e, href) {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

const products = [
  {
    tag: 'Económico',
    popular: false,
    title: 'v1 — Push-to-talk',
    description: 'Graba → Envía → Escucha. Ideal para comandos, dictado, formularios y entornos ruidosos. Coste optimizado por turno.',
    features: ['Un ciclo por interacción', 'Menor coste por minuto', 'Ideal para kioscos, accesibilidad'],
    cta: 'Ver precios v1',
    primary: false,
    Icon: Mic,
  },
  {
    tag: 'Más popular',
    popular: true,
    title: 'v2 — Conversación natural',
    description: 'Habla como con una persona. Detección de silencio, interrupciones, streaming de audio. Para atención al cliente, ventas, tutores.',
    features: ['VAD integrado (Silero)', 'Streaming LLM + TTS', 'WebSocket en tiempo real'],
    cta: 'Ver precios v2',
    primary: true,
    Icon: MessageCircle,
  },
]

export default function ProductCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="producto" className="px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="mb-2 text-3xl font-bold text-white md:text-4xl">
            Dos productos, un solo API
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-12 text-lg text-text-muted">
            Elige el modo que encaje con tu caso de uso
          </motion.p>

          {/* Bento-style grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 md:grid-cols-12"
          >
            {products.map((product) => (
              <motion.div
                key={product.title}
                variants={itemVariants}
                className="md:col-span-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className={`relative h-full rounded-xl border p-8 transition-shadow ${
                    product.popular
                      ? 'border-accent bg-bg-card shadow-[0_0_0_1px_rgba(34,197,94,0.3)]'
                      : 'border-border bg-bg-card hover:border-border/80'
                  }`}
                >
                  <span
                    className={`mb-3 block text-xs font-semibold uppercase ${
                      product.popular ? 'text-accent' : 'text-text-muted'
                    }`}
                  >
                    {product.tag}
                  </span>
                  <product.Icon className="mb-4 h-8 w-8 text-accent" />
                  <h3 className="mb-3 text-xl font-semibold text-white">{product.title}</h3>
                  <p className="mb-6 text-text-muted">{product.description}</p>
                  <ul className="mb-6 list-none space-y-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-text-muted">
                        <Check className="h-4 w-4 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.a
                    href="#precios"
                    onClick={(e) => scrollToSection(e, '#precios')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block w-full rounded-lg py-2.5 text-center font-semibold no-underline ${
                      product.primary
                        ? 'bg-accent text-black hover:bg-accent-hover'
                        : 'border border-border text-white hover:border-accent hover:text-accent'
                    }`}
                  >
                    {product.cta}
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
