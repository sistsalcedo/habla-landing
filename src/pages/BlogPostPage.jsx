import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const posts = {
  'integrate-voz-5-minutos': {
    title: 'Cómo integrar voz en tu app en 5 minutos',
    date: 'Febrero 2026',
    content: `
      ## Paso 1: Regístrate

      Crea tu cuenta en [habla.cloud/registro](https://habla.cloud/registro). Recibirás 75 minutos gratis al mes sin tarjeta de crédito.

      ## Paso 2: Obtén tu API key

      Tras iniciar sesión, entra al Dashboard y genera tu API key. Guárdala en un lugar seguro.

      ## Paso 3: Haz tu primer request

      Para Habla Push (REST), envía un archivo de audio:

      \`\`\`bash
      curl -X POST https://api.habla.cloud/api/speech \\
        -F "file=@audio.mp3" \\
        -H "Authorization: Bearer YOUR_API_KEY"
      \`\`\`

      Para Habla Flow (WebSocket), conecta a \`wss://api.habla.cloud/ws/speech\` y envía audio PCM 16 kHz mono.

      ## Paso 4: Integra en tu app

      Consulta la [documentación completa](/documentacion) para ejemplos en JavaScript, Python y más.
    `,
  },
  'speech-to-speech-espanol-alternativas': {
    title: 'Speech-to-Speech en español: alternativas y comparativa',
    date: 'Febrero 2026',
    content: `
      ## El mercado en 2026

      Vapi, Retell, ElevenLabs, Cartesia y Habla compiten en APIs de voz. Cada uno tiene su nicho.

      ## Comparativa de precios

      | Proveedor | Precio/min | Foco |
      |-----------|------------|------|
      | Vapi | $0.05–0.09 | Orquestación |
      | Retell | $0.06–0.10 | Enterprise |
      | ElevenLabs | ~$0.10 | Calidad de voz |
      | Habla | $0.04–0.05 | Español, accesible |

      ## Por qué elegir Habla

      - **Español y LATAM**: Pensado para acentos latinos y documentación en español.
      - **Precio transparente**: Sin créditos ocultos, facturación por minuto.
      - **Soporte**: Respuesta en menos de 24h, soporte en español.
      - **75 min gratis**: Para probar sin compromiso.
    `,
  },
  'casos-uso-voice-api-latam': {
    title: 'Casos de uso de APIs de voz en Latinoamérica',
    date: 'Febrero 2026',
    content: `
      ## Soporte al cliente

      Asistentes de voz 24/7 para consultas, reclamos y resolución de incidencias en español.

      ## Reservas y citas

      Sistemas de citas por voz para restaurantes, clínicas, salones y servicios.

      ## Ventas y cotizaciones

      Conversaciones naturales para cualificar leads, ofrecer productos y cerrar ventas.

      ## Educación

      Tutores de voz, práctica de idiomas y aprendizaje interactivo.

      ## Retail y e-commerce

      Consultas de inventario, seguimiento de pedidos y recomendaciones por voz.

      Explora todos los casos de uso en la [sección de la landing](/).
    `,
  },
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = slug ? posts[slug] : null

  if (!post) {
    return (
      <div className="px-6 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">Artículo no encontrado</h1>
        <Link to="/blog" className="text-accent no-underline hover:underline">
          Volver al blog
        </Link>
      </div>
    )
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-[720px]">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-text-muted no-underline transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            {post.title}
          </h1>
          <p className="mb-8 text-text-muted">{post.date}</p>

          <div className="space-y-6 text-text-muted">
            {post.content
              .trim()
              .split('\n\n')
              .map((block, i) => {
                if (block.startsWith('## ')) {
                  return (
                    <h2 key={i} className="mt-8 text-xl font-semibold text-white">
                      {block.replace('## ', '')}
                    </h2>
                  )
                }
                if (block.startsWith('- ')) {
                  return (
                    <ul key={i} className="list-disc space-y-2 pl-6">
                      {block
                        .split('\n')
                        .filter((l) => l.startsWith('- '))
                        .map((l, j) => (
                          <li key={j}>{l.replace('- ', '')}</li>
                        ))}
                    </ul>
                  )
                }
                if (block.includes('```')) {
                  const code = block.match(/```[\s\S]*?```/)?.[0]?.replace(/```/g, '') || ''
                  return (
                    <pre
                      key={i}
                      className="overflow-x-auto rounded-lg border border-border bg-bg p-4 font-mono text-sm text-white"
                    >
                      <code>{code}</code>
                    </pre>
                  )
                }
                return (
                  <p key={i} className="leading-relaxed">
                    {block.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, j) => {
                      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
                      if (match) {
                        const href = match[2]
                        if (href.startsWith('http')) {
                          return (
                            <a key={j} href={href} className="text-accent no-underline hover:underline" target="_blank" rel="noopener noreferrer">
                              {match[1]}
                            </a>
                          )
                        }
                        return (
                          <Link key={j} to={href} className="text-accent no-underline hover:underline">
                            {match[1]}
                          </Link>
                        )
                      }
                      return part.split(/(`[^`]+`)/g).map((p, k) =>
                        p.startsWith('`') ? (
                          <code key={`${i}-${j}-${k}`} className="rounded bg-border px-1 text-accent">
                            {p.slice(1, -1)}
                          </code>
                        ) : (
                          p
                        )
                      )
                    })}
                  </p>
                )
              })}
          </div>

          <div className="mt-12 rounded-xl border border-accent/30 bg-accent/5 p-6">
            <h3 className="mb-2 font-semibold text-white">¿Listo para probar?</h3>
            <p className="mb-4 text-text-muted">
              75 minutos gratis al mes. Sin tarjeta de crédito.
            </p>
            <Link
              to="/registro"
              className="inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-black no-underline transition-colors hover:bg-accent-hover"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </motion.article>
      </div>
    </div>
  )
}
