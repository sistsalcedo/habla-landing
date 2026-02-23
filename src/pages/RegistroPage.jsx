import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Check } from 'lucide-react'

export default function RegistroPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: conectar con backend
    console.log('Registro:', { email, password, name })
  }

  const benefits = [
    '100 minutos gratis al mes',
    'API key inmediata',
    'Sin tarjeta de crédito',
  ]

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="mb-2 text-2xl font-bold text-white">Crear cuenta gratis</h1>
        <p className="mb-8 text-text-muted">
          100 minutos al mes. Sin tarjeta de crédito.
        </p>

        <div className="mb-6 flex flex-col gap-2">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2 text-text-muted">
              <Check className="h-4 w-4 shrink-0 text-accent" />
              {b}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-muted">
              Nombre
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
                className="w-full rounded-lg border border-border bg-bg-card py-3 pl-10 pr-4 text-white placeholder:text-text-muted focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-muted">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full rounded-lg border border-border bg-bg-card py-3 pl-10 pr-4 text-white placeholder:text-text-muted focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-text-muted">
              Contraseña (mín. 8 caracteres)
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="w-full rounded-lg border border-border bg-bg-card py-3 pl-10 pr-4 text-white placeholder:text-text-muted focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <p className="text-xs text-text-muted">
            Al registrarte aceptas nuestros{' '}
            <Link to="/terminos" className="text-accent hover:underline">Términos</Link>
            {' '}y{' '}
            <Link to="/privacidad" className="text-accent hover:underline">Privacidad</Link>.
          </p>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 font-semibold text-black transition-colors hover:bg-accent-hover"
          >
            Crear cuenta
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-text-muted">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
