/**
 * API Vercel — Crear Culqi Link de pago
 * Recibe: plan, period, amount_usd, currency_displayed, email
 * Crea link en Culqi en USD y devuelve URL para redirigir al usuario
 */

const CULQI_API = 'https://api.culqi.com/v2/links'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secretKey = process.env.CULQI_SECRET_KEY
  if (!secretKey) {
    return res.status(500).json({ error: 'CULQI_SECRET_KEY no configurada' })
  }

  try {
    const { plan, period, amount_usd, currency_displayed, email } = req.body || {}

    if (!amount_usd || amount_usd <= 0) {
      return res.status(400).json({ error: 'amount_usd requerido y debe ser > 0' })
    }

    const amountCents = Math.round(amount_usd * 100)
    const concept = `Habla ${plan || 'Plan'} — ${period === 'annual' ? 'Anual' : 'Mensual'}`
    const expirationDate = Math.floor(Date.now() / 1000) + 24 * 60 * 60

    const culqiBody = {
      amount: amountCents,
      currency_code: 'USD',
      concept,
      limit_uses: 1,
      is_open_amount: false,
      payment_methods: ['tarjeta'],
      expiration_date: expirationDate,
    }

    const culqiRes = await fetch(CULQI_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
        'x-culqi-product': 'link',
      },
      body: JSON.stringify(culqiBody),
    })

    const data = await culqiRes.json()

    if (!culqiRes.ok) {
      const errMsg = data?.merchant_message || data?.user_message || JSON.stringify(data)
      return res.status(culqiRes.status).json({ error: errMsg })
    }

    const url = data?.url || data?.object?.url
    if (!url) {
      return res.status(500).json({ error: 'Culqi no devolvió URL del link' })
    }

    return res.status(200).json({ url, link_id: data.id })
  } catch (err) {
    console.error('[culqi-checkout]', err)
    return res.status(500).json({ error: err.message || 'Error al crear link de pago' })
  }
}
