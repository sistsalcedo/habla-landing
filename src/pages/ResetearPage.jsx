import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function ResetearPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.replace('#', '?'))
    const type = params.get('type')
    if (type === 'recovery') {
      setReady(true)
    } else {
      setError('Enlace inválido o expirado. Solicita uno nuevo desde recuperar contraseña.')
      setReady(true)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err?.message || 'Error al actualizar la contraseña.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="mb-2 text-2xl font-bold text-white">Nueva contraseña</h1>
        <p className="mb-8 text-text-muted">
          Introduce tu nueva contraseña para restablecer tu cuenta.
        </p>

        {error && !success && (
          <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        {success ? (
          <div className="rounded-lg border border-accent/50 bg-accent/10 px-4 py-4 text-accent">
            <p className="font-medium">Contraseña actualizada</p>
            <p className="mt-1 text-sm text-text-muted">
              Redirigiendo al inicio de sesión...
            </p>
            <Link to="/login" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
              Ir al login
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-text-muted">
                Nueva contraseña
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
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-border bg-bg-card py-3 pl-10 pr-4 text-white placeholder:text-text-muted focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-text-muted">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-border bg-bg-card py-3 pl-10 pr-4 text-white placeholder:text-text-muted focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !ready}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar contraseña'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-text-muted">
          <Link to="/login" className="text-accent hover:underline">
            Volver al inicio de sesión
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
