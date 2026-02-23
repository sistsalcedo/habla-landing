import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '#producto', label: 'Producto', isHash: true },
  { href: '#precios', label: 'Precios', isHash: true },
  { href: '#api', label: 'API', isHash: true },
  { href: '/contacto', label: 'Contacto', isHash: false },
]

function scrollToSection(e, href) {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <Link to="/" className="text-lg font-bold text-white no-underline">
          Habla
        </Link>

        <ul className="hidden items-center gap-8 list-none md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.isHash ? (
                isHome ? (
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-text-muted no-underline transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={`/${link.href}`}
                    className="text-text-muted no-underline transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                )
              ) : (
                <Link
                  to={link.href}
                  className="text-text-muted no-underline transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/login" className="btn-ghost rounded-lg px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-border">
            Iniciar sesión
          </Link>
          <Link to="/registro">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-black no-underline transition-colors hover:bg-accent-hover"
            >
              Prueba gratis
            </motion.span>
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white md:hidden"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 border-t border-border pt-4 md:hidden"
        >
          <ul className="flex flex-col gap-4 list-none">
{navLinks.map((link) => (
            <li key={link.href}>
              {link.isHash ? (
                isHome ? (
                  <a
                    href={link.href}
                    onClick={(e) => {
                      scrollToSection(e, link.href)
                      setMobileOpen(false)
                    }}
                    className="block text-text-muted no-underline hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={`/${link.href}`}
                    onClick={() => setMobileOpen(false)}
                    className="block text-text-muted no-underline hover:text-white"
                  >
                    {link.label}
                  </Link>
                )
              ) : (
                <Link
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-text-muted no-underline hover:text-white"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
            <li className="mt-4 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded-lg border border-border px-4 py-2 text-center font-semibold text-white no-underline">
                Iniciar sesión
              </Link>
              <Link to="/registro" onClick={() => setMobileOpen(false)} className="rounded-lg bg-accent px-4 py-2 text-center font-semibold text-black no-underline">
                Prueba gratis
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}
