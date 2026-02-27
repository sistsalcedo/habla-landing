import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings, ArrowDown, Trash2, AlertTriangle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const API_DOWNGRADE = '/api/cuenta-downgrade'
const API_ELIMINAR = '/api/cuenta-eliminar'
const API_CANCELAR_ELIMINACION = '/api/cuenta-cancelar-eliminacion'

export default function CuentaPage() {
  const { user, session, signOut } = useAuth()
  const [profile, setProfile] = useState(null)
  const [pendingDeletion, setPendingDeletion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')

  useEffect(() => {
    async function load() {
      const [{ data: profileData }, { data: deletionData }] = await Promise.all([
        supabase.from('habla_profiles').select('plan').eq('supabase_user_id', user?.id).single(),
        supabase.from('pending_deletions').select('scheduled_at').eq('supabase_user_id', user?.id).maybeSingle(),
      ])
      setProfile(profileData)
      setPendingDeletion(deletionData)
    }
    if (user?.id) load()
  }, [user?.id])

  const handleDowngrade = async () => {
    if (!confirm('¿Pasar a plan Hobby? Mantendrás 75 minutos/mes. Ya no se cobrarán pagos recurrentes.')) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API_DOWNGRADE, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setProfile({ plan: 'hobby' })
      alert('Tu plan ha cambiado a Hobby.')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEliminar = async () => {
    if (deleteConfirm !== 'ELIMINAR') return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API_ELIMINAR, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setPendingDeletion({ scheduled_at: data.scheduled_at })
      setShowConfirmDelete(false)
      setDeleteConfirm('')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelarEliminacion = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API_CANCELAR_ELIMINACION, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setPendingDeletion(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div>
            <h1 className="mb-2 text-3xl font-bold text-white">Configuración de cuenta</h1>
            <p className="text-text-muted">Gestiona tu plan y datos.</p>
          </div>

          {/* Bajar a Hobby */}
          {['starter', 'pro'].includes(profile?.plan) && (
            <div className="rounded-xl border border-border bg-bg-card/50 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <ArrowDown className="h-5 w-5 text-accent" />
                Bajar a plan Hobby
              </h2>
              <p className="mb-4 text-text-muted">
                Si ya no necesitas un plan de pago, puedes pasar a Hobby. Mantendrás 75 minutos al mes de forma gratuita.
              </p>
              <button
                onClick={handleDowngrade}
                disabled={loading}
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-amber-500/50 hover:bg-amber-500/10 disabled:opacity-50"
              >
                Pasar a Hobby
              </button>
            </div>
          )}

          {/* Eliminar cuenta */}
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-400">
              <Trash2 className="h-5 w-5" />
              Eliminar cuenta
            </h2>
            {pendingDeletion ? (
              <div className="space-y-4">
                <p className="text-amber-200">
                  Tu cuenta está programada para eliminarse el{' '}
                  <strong className="text-white">
                    {new Date(pendingDeletion.scheduled_at).toLocaleDateString('es-PE', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </strong>
                  . Tus datos se borrarán de forma permanente ese día.
                </p>
                <p className="text-sm text-text-muted">
                  Puedes cancelar la eliminación antes de esa fecha.
                </p>
                <button
                  onClick={handleCancelarEliminacion}
                  disabled={loading}
                  className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400 transition-colors hover:bg-amber-500/20 disabled:opacity-50"
                >
                  Cancelar eliminación
                </button>
              </div>
            ) : (
              <>
            <p className="mb-4 text-text-muted">
              Se programará la eliminación de tu cuenta en 30 días. Durante ese periodo puedes cancelar. Pasada la fecha, tus datos (cuenta, API key, uso) se borrarán de forma permanente.
            </p>
            {!showConfirmDelete ? (
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="rounded-lg border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10"
              >
                Eliminar mi cuenta
              </button>
            ) : (
              <div className="space-y-4">
                <p className="flex items-center gap-2 text-sm text-amber-200">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  Escribe <strong>ELIMINAR</strong> para confirmar:
                </p>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="ELIMINAR"
                  className="w-full max-w-xs rounded-lg border border-border bg-bg px-4 py-2 text-white placeholder:text-text-muted focus:border-red-500 focus:outline-none"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleEliminar}
                    disabled={loading || deleteConfirm !== 'ELIMINAR'}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                  >
                    Confirmar eliminación
                  </button>
                  <button
                    onClick={() => { setShowConfirmDelete(false); setDeleteConfirm(''); setError('') }}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-white"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
              </>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <Link to="/dashboard" className="inline-block text-accent hover:underline">
            ← Volver al Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
