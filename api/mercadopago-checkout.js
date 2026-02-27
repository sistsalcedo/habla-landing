/**
 * API Vercel — Crear preferencia Mercado Pago (Checkout Pro)
 * Recibe: plan, period, amount_usd, currency_displayed, email
 * Crea preferencia y devuelve init_point para redirigir al usuario
 * Docs: https://www.mercadopago.com.pe/developers/es/reference/preferences/_checkout_preferences/post
 */

const MP_API = 'https://api.mercadopago.com/checkout/preferences'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!accessToken) {
    return res.status(500).json({
      error:
        'Mercado Pago no configurado. Añade MERCADOPAGO_ACCESS_TOKEN en las variables de entorno de Vercel.',
    })
  }

  try {
    const { plan, period, amount_usd, currency_displayed, email, user_id } = req.body || {}

    if (!amount_usd || amount_usd <= 0) {
      return res.status(400).json({ error: 'amount_usd requerido y debe ser > 0' })
    }
    if (!user_id) {
      return res.status(400).json({ error: 'user_id requerido. Inicia sesión para continuar.' })
    }

    const concept = `Habla ${plan || 'Plan'} — ${period === 'annual' ? 'Anual' : 'Mensual'}`
    const baseUrl =
      process.env.SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')

    const preference = {
      items: [
        {
          id: `${plan || 'plan'}-${period || 'monthly'}`,
          title: concept,
          description: `Plan Habla API Speech-to-Speech`,
          quantity: 1,
          currency_id: 'USD',
          unit_price: parseFloat(amount_usd),
        },
      ],
      payer: email ? { email } : undefined,
      back_urls: {
        success: `${baseUrl}/checkout/success`,
        failure: `${baseUrl}/checkout`,
        pending: `${baseUrl}/checkout/success?status=pending`,
      },
      auto_return: 'approved',
      external_reference: `${user_id}|${plan}|${period}|${Date.now()}`,
    }

    const mpRes = await fetch(MP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preference),
    })

    const data = await mpRes.json()

    if (!mpRes.ok) {
      const errMsg = data?.message || data?.error || JSON.stringify(data)
      return res.status(mpRes.status).json({ error: errMsg })
    }

    const url = data?.init_point
    if (!url) {
      return res.status(500).json({
        error: 'Mercado Pago no devolvió URL de pago (init_point).',
      })
    }

    return res.status(200).json({ url, preference_id: data.id })
  } catch (err) {
    console.error('[mercadopago-checkout]', err)
    return res.status(500).json({ error: err.message || 'Error al crear preferencia' })
  }
}
