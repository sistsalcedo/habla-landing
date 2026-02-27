/**
 * Webhook Mercado Pago — Recibe notificaciones de pago
 * Al recibir payment.approved: actualiza habla_profiles con plan y minutos
 * Docs: https://www.mercadopago.com.pe/developers/es/docs/your-integrations/notifications/webhooks
 */

import { createClient } from '@supabase/supabase-js'

const MP_PAYMENTS_API = 'https://api.mercadopago.com/v1/payments'

const PLAN_MINUTOS = {
  starter: 500,
  pro: 2500,
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!accessToken || !supabaseUrl || !supabaseServiceKey) {
    console.error('[mercadopago-webhook] Faltan MERCADOPAGO_ACCESS_TOKEN, SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY')
    return res.status(500).json({ error: 'Configuración incompleta' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const { type, data } = body

    if (type !== 'payment' || !data?.id) {
      return res.status(200).json({ ok: true })
    }

    const paymentId = data.id
    const mpRes = await fetch(`${MP_PAYMENTS_API}/${paymentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const payment = await mpRes.json()

    if (!mpRes.ok || payment.status !== 'approved') {
      return res.status(200).json({ ok: true })
    }

    const extRef = payment.external_reference
    if (!extRef || typeof extRef !== 'string') {
      console.warn('[mercadopago-webhook] Sin external_reference en pago', paymentId)
      return res.status(200).json({ ok: true })
    }

    const parts = extRef.split('|')
    const [userId, planId, period] = parts

    if (!userId || !planId || !PLAN_MINUTOS[planId]) {
      console.warn('[mercadopago-webhook] external_reference inválido:', extRef)
      return res.status(200).json({ ok: true })
    }

    const minutos = PLAN_MINUTOS[planId]
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data: updated, error } = await supabase
      .from('habla_profiles')
      .update({
        plan: planId,
        minutos_incluidos: minutos,
        ciclo_desde: new Date().toISOString(),
      })
      .eq('supabase_user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('[mercadopago-webhook] Error actualizando profile:', error)
      return res.status(500).json({ error: 'Error al actualizar plan' })
    }

    console.log('[mercadopago-webhook] Plan activado:', { userId, planId, period, paymentId })
    return res.status(200).json({ ok: true, updated: !!updated })
  } catch (err) {
    console.error('[mercadopago-webhook]', err)
    return res.status(500).json({ error: err.message })
  }
}
