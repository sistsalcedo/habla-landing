import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Key, Copy, RefreshCw, BarChart3, Settings2, ChevronDown, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''

async function generateApiKey(regenerate = false) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) throw new Error('No hay sesión')
  const res = await fetch(`${supabaseUrl}/functions/v1/generate-api-key`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ regenerate }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Error al generar API key')
  return json
}

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [apiKey, setApiKey] = useState(null)
  const [apiKeyMessage, setApiKeyMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [profile, setProfile] = useState(null)
  const [usage, setUsage] = useState(null)
  const [cuentaOpen, setCuentaOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [cuentaLoading, setCuentaLoading] = useState(false)

  useEffect(() => {
    async function loadProfileAndUsage() {
      const { data: profileData } = await supabase
        .from('habla_profiles')
        .select('id, plan, minutos_incluidos, ciclo_desde, api_key_hash')
        .eq('supabase_user_id', user?.id)
        .single()
      setProfile(profileData)

      if (profileData?.id) {
        const cicloDesde = profileData.ciclo_desde
        const { data: usageData } = await supabase
          .from('usage')
          .select('minutos')
          .eq('profile_id', profileData.id)
          .gte('created_at', cicloDesde)

        const total = usageData?.reduce((acc, r) => acc + Number(r.minutos), 0) ?? 0
        setUsage(total)
      }
    }
    if (user?.id) loadProfileAndUsage()
  }, [user?.id])

  const handleGenerate = async (regenerate = false) => {
    setLoading(true)
    setError('')
    setApiKey(null)
    setApiKeyMessage('')
    try {
      const result = await generateApiKey(regenerate)
      setApiKey(result.api_key)
      setApiKeyMessage(result.message || '')
      if (result.api_key) {
        setProfile((p) => (p ? { ...p, api_key_hash: 'set' } : p))
      }
    } catch (e) {
      setError(e.message || 'Error al generar')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!apiKey) return
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const minutosIncluidos = profile?.minutos_incluidos ?? 75
  const minutosUsados = usage ?? 0
  const porcentaje = minutosIncluidos > 0 ? Math.min(100, (minutosUsados / minutosIncluidos) * 100) : 0
  const limiteAlcanzado = minutosUsados >= minutosIncluidos && minutosIncluidos > 0

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div>
            <h1 className="mb-2 text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-text-muted">Gestiona tu API key y revisa tu uso.</p>
          </div>

          {/* Uso */}
          <div className="rounded-xl border border-border bg-bg-card/50 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <BarChart3 className="h-5 w-5 text-accent" />
              Uso del ciclo actual
            </h2>
            <div className="mb-2 flex justify-between text-sm text-text-muted">
              <span>{minutosUsados.toFixed(2)} min usados</span>
              <span>{minutosIncluidos} min incluidos</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-bg">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${porcentaje}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full rounded-full bg-accent"
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-text-muted">
                Plan: {profile?.plan || 'free'}
              </p>
              {(profile?.plan === 'free' || profile?.plan === 'hobby') && (
                <Link
                  to="/#precios"
                  className="text-xs font-medium text-accent hover:text-accent-hover hover:underline"
                >
                  Subir de plan
                </Link>
              )}
            </div>
            {(limiteAlcanzado || porcentaje >= 60) && (profile?.plan === 'free' || profile?.plan === 'hobby') && (
              <div className="mt-4 rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
                <p className="text-sm text-amber-200">
                  {limiteAlcanzado
                    ? 'Has alcanzado el límite de 75 min/mes del plan Hobby. Actualiza a Starter para continuar usando la API sin límites en este ciclo.'
                    : `Has usado ${porcentaje.toFixed(0)}% de tus minutos. Actualiza a Starter para tener más capacidad.`}
                </p>
                <Link
                  to="/checkout?plan=starter&period=monthly"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent no-underline hover:text-accent-hover"
                >
                  {limiteAlcanzado ? 'Subir a Starter →' : 'Ver plan Starter →'}
                </Link>
              </div>
            )}
          </div>

          {/* API Key */}
          <div className="rounded-xl border border-border bg-bg-card/50 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Key className="h-5 w-5 text-accent" />
              API Key
            </h2>

            {profile?.api_key_hash && !apiKey ? (
              <div>
                <p className="mb-4 text-text-muted">
                  Ya tienes una API key configurada. Si la perdiste, genera una nueva (la anterior dejará de funcionar).
                </p>
                <button
                  onClick={() => handleGenerate(true)}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400 transition-colors hover:bg-amber-500/20 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Regenerar API key
                </button>
              </div>
            ) : (
              <>
                {!apiKey ? (
                  <button
                    onClick={() => handleGenerate(false)}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4" />
                        Generar API key
                      </>
                    )}
                  </button>
                ) : (
                  <div>
                    <p className="mb-2 text-sm text-text-muted">{apiKeyMessage}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <code className="flex-1 rounded-lg border border-border bg-bg px-4 py-2 text-sm text-accent break-all">
                        {apiKey}
                      </code>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-border"
                      >
                        <Copy className="h-4 w-4" />
                        {copied ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                    <button
                      onClick={() => handleGenerate(true)}
                      disabled={loading}
                      className="mt-4 flex items-center gap-2 text-sm text-text-muted hover:text-white"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Regenerar (invalidará la actual)
                    </button>
                  </div>
                )}
              </>
            )}

            {error && (
              <p className="mt-4 text-sm text-red-400">{error}</p>
            )}
          </div>

          <p className="text-sm text-text-muted">
            Usa tu API key en el header <code className="rounded bg-bg px-1">X-API-Key</code> en tus peticiones a la API de Habla. Consulta la{' '}
            <Link to="/documentacion" className="text-accent hover:underline">documentación</Link> para más detalles.
          </p>

          <Link
            to="/cuenta"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text-muted transition-colors hover:border-border/80 hover:text-white"
          >
            Configuración de cuenta
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
