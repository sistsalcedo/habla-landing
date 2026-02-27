/**
 * API Vercel — Crear link de pago LigoPay
 * Recibe: plan, period, amount_usd, currency_displayed, email
 * Crea link en LigoPay y devuelve URL para redirigir al usuario
 *
 * IMPORTANTE: LigoPay no tiene documentación pública. Debes contactarlos
 * vía "Solicitar ahora" en ligopay.pe para obtener credenciales y specs.
 * Una vez las tengas, completa la lógica según su documentación.
 */

// TODO: Reemplazar con la URL base real cuando LigoPay te proporcione la documentación
const LIGOPAY_API_BASE = process.env.LIGOPAY_API_URL || 'https://api.ligopay.pe'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.LIGOPAY_API_KEY
  const apiSecret = process.env.LIGOPAY_API_SECRET

  if (!apiKey || !apiSecret) {
    return res.status(500).json({
      error:
        'LigoPay no configurado. Añade LIGOPAY_API_KEY y LIGOPAY_API_SECRET en las variables de entorno de Vercel. Contacta a LigoPay para obtener credenciales.',
    })
  }

  try {
    const { plan, period, amount_usd, currency_displayed, email } = req.body || {}

    if (!amount_usd || amount_usd <= 0) {
      return res.status(400).json({ error: 'amount_usd requerido y debe ser > 0' })
    }

    const concept = `Habla ${plan || 'Plan'} — ${period === 'annual' ? 'Anual' : 'Mensual'}`

    // URL base del sitio (Vercel inyecta VERCEL_URL automáticamente)
    const baseUrl =
      process.env.SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')

    // TODO: Adaptar según documentación real de LigoPay.
    // Posibles endpoints: /links, /orders, /charges o similar.
    // Payload típico: amount, currency (PEN/USD), concept, callback_url, customer_email, etc.
    const ligopayBody = {
      amount: amount_usd,
      currency: 'USD', // o PEN según lo que acepte LigoPay
      concept,
      customer_email: email || undefined,
      success_url: `${baseUrl}/checkout/success`,
      cancel_url: `${baseUrl}/checkout`,
    }

    const endpoint = `${LIGOPAY_API_BASE}/links` // TODO: Verificar ruta real
    const ligopayRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // TODO: LigoPay puede usar Bearer, Basic, X-API-Key, etc.
        Authorization: `Bearer ${apiKey}`,
        'X-API-Secret': apiSecret,
      },
      body: JSON.stringify(ligopayBody),
    })

    const data = await ligopayRes.json()

    if (!ligopayRes.ok) {
      const errMsg = data?.message || data?.error || JSON.stringify(data)
      return res.status(ligopayRes.status).json({ error: errMsg })
    }

    const url = data?.url || data?.payment_url || data?.redirect_url || data?.link
    if (!url) {
      return res.status(500).json({
        error: 'LigoPay no devolvió URL de pago. Revisa la estructura de respuesta en la documentación.',
      })
    }

    return res.status(200).json({ url, link_id: data.id || data.order_id })
  } catch (err) {
    console.error('[ligopay-checkout]', err)
    return res.status(500).json({ error: err.message || 'Error al crear link de pago' })
  }
}
