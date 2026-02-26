import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'

export default function ContactoPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    const formId = import.meta.env.VITE_FORMSPREE_CONTACT_ID
    if (!formId) {
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      return
    }
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-4 text-3xl font-bold text-white">Contacto</h1>
          <p className="mb-12 text-text-muted">
            ¿Preguntas sobre planes Enterprise, integraciones o soporte? Escríbenos.
          </p>

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-lg font-semibold text-white">Formas de contactar</h2>
              <a
                href="mailto:hola@habla.cloud"
                className="flex items-center gap-3 rounded-lg border border-border p-4 text-text-muted transition-colors hover:border-accent hover:text-white"
              >
                <Mail className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p>hola@habla.cloud</p>
                </div>
              </a>
              <p className="mt-4 text-sm text-text-muted">
                Respondemos en menos de 24 horas laborables. SLA claro, soporte en español.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-muted">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  required
                  className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-white placeholder:text-text-muted focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-muted">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-white placeholder:text-text-muted focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-muted">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="¿En qué podemos ayudarte?"
                  required
                  rows={4}
                  className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-white placeholder:text-text-muted focus:border-accent focus:outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-50"
              >
                {status === 'loading' ? 'Enviando...' : status === 'success' ? '¡Enviado!' : status === 'error' ? 'Error' : 'Enviar'}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
