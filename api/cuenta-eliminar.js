/**
 * API Vercel — Programar eliminación de cuenta (borrado diferido 30 días)
 * Requiere Authorization: Bearer <session.access_token>
 * Inserta en pending_deletions. El cron api/cron-procesar-bajas.js
 * ejecuta las eliminaciones cuando scheduled_at <= NOW()
 */

import { createClient } from '@supabase/supabase-js'

const DIAS_ESPERA = 30

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

  const scheduledAt = new Date()
  scheduledAt.setDate(scheduledAt.getDate() + DIAS_ESPERA)

  const { error } = await supabase
    .from('pending_deletions')
    .upsert(
      { supabase_user_id: user.id, scheduled_at: scheduledAt.toISOString(), created_at: new Date().toISOString() },
      { onConflict: 'supabase_user_id' }
    )

  if (error) {
    return res.status(500).json({ error: error.message || 'Error al programar eliminación' })
  }

  return res.status(200).json({
    ok: true,
    scheduled_at: scheduledAt.toISOString(),
    dias: DIAS_ESPERA,
    mensaje: `Tu cuenta se eliminará el ${scheduledAt.toLocaleDateString('es-PE')}. Puedes cancelar antes desde Configuración de cuenta.`,
  })
}
