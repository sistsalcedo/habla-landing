import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function scrollToSection(e, href) {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const footerLinks = {
  Producto: [
    { href: '#producto', label: 'Habla Push y Flow', external: false },
    { href: '#casos-uso', label: 'Casos de uso', external: false },
    { href: '#precios', label: 'Precios', external: false },
    { href: '/documentacion', label: 'Documentación', external: true },
  ],
  Soporte: [
    { href: '/faq', label: 'FAQ', external: true },
    { href: '/contacto', label: 'Contacto', external: true },
  ],
  Legal: [
    { href: '/terminos', label: 'Términos', external: true },
    { href: '/privacidad', label: 'Privacidad', external: true },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [status, setStatus] = useState('') // 'loading' | 'success' | 'error'

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    const formId = import.meta.env.VITE_FORMSPREE_NEWSLETTER_ID
    if (!formId) {
      setStatus('success')
      setEmail('')
      return
    }
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer id="contacto" className="border-t border-border px-6 py-16">
      <div className="mx-auto max-w-[1200px]">
        {/* Newsletter */}
        <div className="mb-16 rounded-xl border border-border bg-bg-card/50 p-8 md:p-12">
          <h3 className="mb-2 text-xl font-semibold text-white">Recibe novedades de Habla</h3>
          <p className="mb-6 max-w-md text-text-muted">
            Consejos de integración, nuevos productos y ofertas. Sin spam.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex max-w-md flex-wrap gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 min-w-[200px] rounded-lg border border-border bg-bg px-4 py-3 text-white placeholder:text-text-muted focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              {status === 'loading' ? 'Enviando...' : status === 'success' ? '¡Listo!' : status === 'error' ? 'Error' : 'Suscribirme'}
            </button>
          </form>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="mb-4 block text-lg font-bold text-white no-underline">
              Habla
            </Link>
            <p className="text-[15px] text-text-muted">
              API de voz pensada para español y Latinoamérica.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Producto</h4>
            <ul className="list-none space-y-3">
              {footerLinks.Producto.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <Link to={link.href} className="text-text-muted no-underline transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  ) : isHome ? (
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-text-muted no-underline transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link to={`/${link.href}`} className="text-text-muted no-underline transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Soporte</h4>
            <ul className="list-none space-y-3">
              {footerLinks.Soporte.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-text-muted no-underline transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Legal</h4>
            <ul className="list-none space-y-3">
              {footerLinks.Legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-text-muted no-underline transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Contacto</h4>
            <p className="text-[15px] text-text-muted">
              <a href="mailto:hola@habla.io" className="text-text-muted no-underline hover:text-white">
                hola@habla.io
              </a>
            </p>
            <Link to="/contacto" className="text-[15px] text-accent no-underline hover:underline">
              Formulario de contacto
            </Link>
          </div>
        </div>
        <p className="border-t border-border pt-8 text-sm text-text-muted">
          © 2026 Habla. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
