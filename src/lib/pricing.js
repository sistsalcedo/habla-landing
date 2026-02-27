/**
 * Precios base en USD (Culqi cobra en USD o PEN)
 */
export const PLANS = {
  hobby: {
    name: 'Hobby',
    monthly: { price: 0, desc: '75 minutos incluidos' },
    annual: { price: 0, desc: '75 minutos incluidos' },
  },
  starter: {
    name: 'Starter',
    monthly: { price: 29, desc: '500 minutos incluidos' },
    annual: { price: 23, desc: '500 minutos incluidos' },
  },
  pro: {
    name: 'Pro',
    monthly: { price: 79, desc: '2.500 minutos incluidos' },
    annual: { price: 63, desc: '2.500 minutos incluidos' },
  },
}

export function getPlanPrice(planId, period = 'monthly') {
  const plan = PLANS[planId]
  if (!plan) return null
  const p = period === 'annual' ? plan.annual : plan.monthly
  return p.price
}
