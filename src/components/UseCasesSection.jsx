import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Headphones, ShoppingCart, Calendar, Heart, GraduationCap, Store } from 'lucide-react'

const useCases = [
  {
    Icon: Headphones,
    title: 'Soporte al cliente',
    description: 'Asistentes de voz 24/7 para consultas, reclamos y resolución de incidencias en español.',
    href: '/documentacion#caso-soporte',
    label: 'Ver guía',
  },
  {
    Icon: ShoppingCart,
    title: 'Ventas y cotizaciones',
    description: 'Conversaciones naturales para cualificar leads, ofrecer productos y cerrar ventas.',
    href: '/documentacion#caso-ventas',
    label: 'Ver guía',
  },
  {
    Icon: Calendar,
    title: 'Reservas y citas',
    description: 'Sistema de citas por voz para restaurantes, clínicas, salones y servicios.',
    href: '/documentacion#caso-reservas',
    label: 'Ver guía',
  },
  {
    Icon: Heart,
    title: 'Salud',
    description: 'Recordatorios de medicación, triaje básico y acompañamiento en español.',
    href: '/documentacion#caso-salud',
    label: 'Ver guía',
  },
  {
    Icon: GraduationCap,
    title: 'Educación',
    description: 'Tutores de voz, práctica de idiomas y aprendizaje interactivo.',
    href: '/documentacion#caso-educacion',
    label: 'Ver guía',
  },
  {
    Icon: Store,
    title: 'Retail y e-commerce',
    description: 'Consultas de inventario, seguimiento de pedidos y recomendaciones por voz.',
    href: '/documentacion#caso-retail',
    label: 'Ver guía',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function UseCasesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="casos-uso" className="border-y border-border bg-bg-card/30 px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="mb-2 text-3xl font-bold text-white md:text-4xl">
            Casos de uso en Latinoamérica
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-12 text-lg text-text-muted">
            Plantillas y flujos pensados para mercados hispanohablantes: México, Colombia, Argentina, Perú y más.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {useCases.map(({ Icon, title, description, href, label }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-border bg-bg p-6 transition-shadow hover:border-border/80 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                <p className="mb-4 text-sm text-text-muted">{description}</p>
                <Link
                  to={href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent no-underline transition-colors hover:text-accent-hover"
                >
                  {label}
                  <span>→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
