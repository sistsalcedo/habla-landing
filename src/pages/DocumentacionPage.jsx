import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Book, Key, Server, Radio, Network, FileCode } from 'lucide-react'

const sections = [
  {
    id: 'introduccion',
    icon: Book,
    title: 'Introducción',
    content: 'Habla ofrece dos modos de integración: v1 (REST, push-to-talk) y v2 (WebSocket, conversación natural). Ambos usan la misma API key y comparten el mismo modelo de precios.',
  },
  {
    id: 'autenticacion',
    icon: Key,
    title: 'Autenticación',
    content: 'Incluye tu API key en el header Authorization de todas las peticiones.',
    code: `Authorization: Bearer YOUR_API_KEY`,
  },
  {
    id: 'v1-rest',
    icon: Server,
    title: 'v1 — Push-to-talk (REST)',
    content: 'Envía un archivo de audio completo y recibe el audio de respuesta.',
    code: `curl -X POST https://api.habla.io/api/speech \\
  -F "file=@audio.webm" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    id: 'v2-websocket',
    icon: Network,
    title: 'v2 — Conversación (WebSocket)',
    content: 'Conecta por WebSocket para streaming bidireccional. Comandos JSON + audio PCM.',
    code: `wss://api.habla.io/ws/speech

# Comandos: {"type": "start"|"stop"|"interrupt"|"close"}
# Audio: bytes PCM 16 kHz mono`,
  },
  {
    id: 'formatos',
    icon: FileCode,
    title: 'Formatos de audio',
    content: 'v1 acepta WebM (Opus). v2 envía PCM 16 kHz mono, 16-bit. La respuesta es MP3.',
  },
]

export default function DocumentacionPage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto flex max-w-[1200px] gap-12">
        <aside className="hidden w-64 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block rounded-lg py-2 text-sm text-text-muted transition-colors hover:text-white"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            <div>
              <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Documentación API
              </h1>
              <p className="text-lg text-text-muted">
                Guía para integrar Habla en tu aplicación. REST para v1, WebSocket para v2.
              </p>
            </div>

            {sections.map(({ id, icon: Icon, title, content, code }) => (
              <section key={id} id={id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="h-6 w-6 text-accent" />
                  <h2 className="text-2xl font-semibold text-white">{title}</h2>
                </div>
                <p className="mb-4 text-text-muted">{content}</p>
                {code && (
                  <pre className="overflow-x-auto rounded-lg border border-border bg-[#09090b] p-4 font-mono text-sm text-white">
                    <code>{code}</code>
                  </pre>
                )}
              </section>
            ))}

            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
              <h3 className="mb-2 font-semibold text-white">¿Necesitas ayuda?</h3>
              <p className="mb-4 text-text-muted">
                Contacta a hola@habla.io o consulta el dashboard cuando tengas cuenta.
              </p>
              <Link
                to="/registro"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black no-underline hover:bg-accent-hover"
              >
                Crear cuenta gratis
                <Radio className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
