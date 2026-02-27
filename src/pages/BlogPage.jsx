import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FileText, ArrowRight } from 'lucide-react'

const articles = [
  {
    slug: 'integrate-voz-5-minutos',
    title: 'Cómo integrar voz en tu app en 5 minutos',
    excerpt: 'Guía paso a paso para añadir Speech-to-Speech con Habla: registro, API key, primer request.',
    date: '2026-02',
    readTime: '5 min',
  },
  {
    slug: 'speech-to-speech-espanol-alternativas',
    title: 'Speech-to-Speech en español: alternativas y comparativa',
    excerpt: 'Vapi, Retell, ElevenLabs y Habla: precios, latencia y foco en español.',
    date: '2026-02',
    readTime: '8 min',
  },
  {
    slug: 'casos-uso-voice-api-latam',
    title: 'Casos de uso de APIs de voz en Latinoamérica',
    excerpt: 'Soporte al cliente, reservas, ventas, educación: cómo usar voz en tu negocio.',
    date: '2026-02',
    readTime: '6 min',
  },
]

export default function BlogPage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Blog
          </h1>
          <p className="text-lg text-text-muted">
            Guías, comparativas y consejos para integrar voz con IA en tus proyectos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="rounded-xl border border-border bg-bg-card p-6 transition-colors hover:border-border/80"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="mb-2 text-xl font-semibold text-white">
                    {article.title}
                  </h2>
                  <p className="mb-4 text-text-muted">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime} lectura</span>
                  </div>
                </div>
                <Link
                  to={`/blog/${article.slug}`}
                  className="flex shrink-0 items-center gap-2 text-accent no-underline transition-colors hover:text-accent-hover"
                >
                  Leer
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center text-text-muted"
        >
          Más artículos próximamente. Suscríbete a la{' '}
          <Link to="/#contacto" className="text-accent no-underline hover:underline">
            newsletter
          </Link>{' '}
          para recibir novedades.
        </motion.p>
      </div>
    </div>
  )
}
