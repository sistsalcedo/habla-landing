/**
 * API Vercel — Cron: procesar eliminaciones programadas
 * Se ejecuta diariamente (vercel.json crons) o mediante cron externo
 * Elimina usuarios de auth.users donde pending_deletions.scheduled_at <= NOW()
 * Seguridad: requiere header Authorization: Bearer <CRON_SECRET>
 */

import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const cronSecret = process.env.CRON_SECRET
  const authHeader = req.headers.authorization
  const providedSecret = authHeader?.replace('Bearer ', '') || req.query?.secret

  if (!cronSecret || providedSecret !== cronSecret) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Configuración incompleta' })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  const now = new Date().toISOString()

  const { data: pendientes, error: selectError } = await supabase
    .from('pending_deletions')
    .select('id, supabase_user_id')
    .lte('scheduled_at', now)

  if (selectError || !pendientes?.length) {
    return res.status(200).json({ ok: true, procesados: 0 })
  }

  let eliminados = 0
  for (const row of pendientes) {
    const { error: deleteError } = await supabase.auth.admin.deleteUser(row.supabase_user_id)
    if (!deleteError) {
      await supabase.from('pending_deletions').delete().eq('id', row.id)
      eliminados++
    }
  }

  return res.status(200).json({ ok: true, procesados: pendientes.length, eliminados })
}
