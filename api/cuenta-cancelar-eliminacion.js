/**
 * API Vercel — Cancelar eliminación programada
 * Requiere Authorization: Bearer <session.access_token>
 * Elimina el registro de pending_deletions para el usuario
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
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
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

  const { error } = await supabase
    .from('pending_deletions')
    .delete()
    .eq('supabase_user_id', user.id)

  if (error) {
    return res.status(500).json({ error: error.message || 'Error al cancelar eliminación' })
  }

  return res.status(200).json({ ok: true, mensaje: 'Eliminación cancelada.' })
}
