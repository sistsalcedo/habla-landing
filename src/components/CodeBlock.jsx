import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Copy } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const code = `# v1 — Push-to-talk (POST)
curl -X POST https://api.habla.io/api/speech \\
  -F "file=@audio.webm" \\
  -H "Authorization: Bearer YOUR_API_KEY"

# v2 — Conversación (WebSocket)
wss://api.habla.io/ws/speech
# JSON: {"type": "start"|"stop"|"close"} + bytes PCM`

export default function CodeBlock() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    // Could add toast feedback here
  }

  return (
    <section id="api" className="px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="mb-2 text-3xl font-bold text-white md:text-4xl">
            Integra en minutos
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-8 text-lg text-text-muted">
            REST para v1, WebSocket para v2. Documentación OpenAPI.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-xl border border-border bg-[#09090b] p-6"
          >
            <button
              onClick={copyToClipboard}
              className="absolute right-4 top-4 rounded p-2 text-text-muted transition-colors hover:bg-border hover:text-white"
              aria-label="Copiar código"
            >
              <Copy className="h-4 w-4" />
            </button>
            <pre className="overflow-x-auto font-mono text-sm text-white">
              <code>
                <span className="text-zinc-500"># v1 — Push-to-talk (POST)</span>
                {'\n'}
                curl -X POST https://api.habla.io/api/speech \
                {'\n'}
                {'  '}-F &quot;file=@audio.webm&quot; \
                {'\n'}
                {'  '}-H &quot;Authorization: Bearer YOUR_API_KEY&quot;
                {'\n\n'}
                <span className="text-zinc-500"># v2 — Conversación (WebSocket)</span>
                {'\n'}
                wss://api.habla.io/ws/speech
                {'\n'}
                <span className="text-zinc-500"># JSON: {`{"type": "start"|"stop"|"close"} + bytes PCM`}</span>
              </code>
            </pre>
            <Link to="/documentacion">
              <motion.span
                whileHover={{ x: 4 }}
                className="mt-4 inline-flex items-center gap-2 text-white no-underline hover:text-accent"
              >
                Ver documentación completa →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
