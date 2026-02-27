import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock } from 'lucide-react'

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status') || 'approved'

  const isPending = status === 'pending'

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-bg-card p-8"
        >
          {isPending ? (
            <>
              <Clock className="mx-auto mb-6 h-16 w-16 text-amber-400" />
              <h1 className="mb-2 text-2xl font-bold text-white">Pago pendiente</h1>
              <p className="mb-6 text-text-muted">
                Tu pago está siendo procesado. Recibirás una confirmación por correo cuando se
                complete.
              </p>
            </>
          ) : (
            <>
              <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-accent" />
              <h1 className="mb-2 text-2xl font-bold text-white">¡Pago completado!</h1>
              <p className="mb-6 text-text-muted">
                Gracias por tu compra. Tu plan Habla está activado.
              </p>
            </>
          )}

          <Link
            to="/dashboard"
            className="inline-flex rounded-lg bg-accent px-6 py-3 font-semibold text-black no-underline transition-colors hover:bg-accent-hover"
          >
            Ir al Dashboard
          </Link>
          <p className="mt-6">
            <Link to="/" className="text-sm text-text-muted hover:text-accent hover:underline">
              ← Volver al inicio
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
