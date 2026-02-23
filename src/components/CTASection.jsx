import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="px-6 py-20 text-center">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            Prueba Habla hoy
          </h2>
          <p className="mb-6 text-text-muted">
            100 minutos gratis al mes. Sin tarjeta de crédito.
          </p>
          <Link to="/registro">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-black no-underline transition-colors hover:bg-accent-hover"
            >
              Crear cuenta gratis
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
