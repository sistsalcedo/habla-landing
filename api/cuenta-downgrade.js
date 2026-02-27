/**
 * API Vercel — Bajar a plan Hobby
 * Requiere Authorization: Bearer <session.access_token>
 * Solo para usuarios Starter/Pro
 */

import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Configuración incompleta' })
  }

  const token = authHeader.replace('Bearer ', '')
  const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  })

  const { data: { user }, error: authError } = await supabaseAuth.auth.getUser()
  if (authError || !user) {
    return res.status(401).json({ error: 'Sesión inválida o expirada' })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  const { data: profile } = await supabase
    .from('habla_profiles')
    .select('plan')
    .eq('supabase_user_id', user.id)
    .single()

  if (!profile || !['starter', 'pro'].includes(profile.plan)) {
    return res.status(400).json({ error: 'Solo los planes Starter o Pro pueden pasar a Hobby.' })
  }

  const { error } = await supabase
    .from('habla_profiles')
    .update({ plan: 'hobby', minutos_incluidos: 75, ciclo_desde: new Date().toISOString() })
    .eq('supabase_user_id', user.id)

  if (error) {
    return res.status(500).json({ error: 'Error al cambiar de plan' })
  }

  return res.status(200).json({ ok: true, plan: 'hobby' })
}
