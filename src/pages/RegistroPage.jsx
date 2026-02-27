import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Check } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function RegistroPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from
  const returnUrl = from?.pathname ? from.pathname + (from.search || '') : '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const { signUp, signInWithGoogle } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!aceptaTerminos) {
      setError('Debes aceptar los Términos de Servicio y la Política de Privacidad.')
      return
    }
    setError('')
    setNeedsConfirmation(false)
    setLoading(true)
    try {
      const result = await signUp(email, password, {
        data: { full_name: name },
      })
      if (result?.session) {
        navigate(returnUrl, { replace: true })
      } else if (result?.user) {
        setNeedsConfirmation(true)
      }
    } catch (err) {
      const msg = err?.message || 'Error al crear la cuenta'
      if (msg.includes('already registered') || msg.includes('already exists')) {
        setError('Este email ya está registrado. Inicia sesión.')
      } else if (msg.includes('Password')) {
        setError('La contraseña debe tener al menos 8 caracteres.')
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err?.message || 'Error al conectar con Google.')
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    '75 minutos gratis al mes',
    'API key inmediata',
    'Sin tarjeta de crédito',
  ]

  if (needsConfirmation) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <h1 className="mb-4 text-2xl font-bold text-white">Revisa tu email</h1>
          <p className="mb-6 text-text-muted">
            Te hemos enviado un enlace a <strong className="text-white">{email}</strong> para confirmar tu cuenta.
          </p>
          <p className="mb-6 text-sm text-text-muted">
            ¿Ya confirmaste?{' '}
            <Link to="/login" className="text-accent hover:underline">Iniciar sesión</Link>
          </p>
          <Link
            to="/"
            className="inline-block rounded-lg bg-accent px-6 py-2.5 font-semibold text-black no-underline transition-colors hover:bg-accent-hover"
          >
            Ir al inicio
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="mb-2 text-2xl font-bold text-white">Crear cuenta gratis</h1>
        <p className="mb-8 text-text-muted">
          75 minutos al mes. Sin tarjeta de crédito.
        </p>

        <div className="mb-6 flex flex-col gap-2">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2 text-text-muted">
              <Check className="h-4 w-4 shrink-0 text-accent" />
              {b}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-bg-card py-3 font-semibold text-white transition-colors hover:bg-border disabled:opacity-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continuar con Google
        </button>

        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-text-muted">o con email</span>
          <div className="h-px flex-1 bg-border" />
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
                autoComplete="name"
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
                autoComplete="email"
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
                autoComplete="new-password"
                className="w-full rounded-lg border border-border bg-bg-card py-3 pl-10 pr-4 text-white placeholder:text-text-muted focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={aceptaTerminos}
              onChange={(e) => setAceptaTerminos(e.target.checked)}
              className="mt-1 rounded border-border bg-bg-card"
              required
            />
            <span>
              Acepto los{' '}
              <Link to="/terminos" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Términos de Servicio
              </Link>
              {' '}y la{' '}
              <Link to="/privacidad" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Política de Privacidad
              </Link>
              {' '}de Habla.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
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
