import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

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
  const navigate = useNavigate()
  const { user, signOut, isAuthenticated } = useAuth()
  const isHome = location.pathname === '/'

  const handleSignOut = async () => {
    await signOut()
    setMobileOpen(false)
    navigate('/')
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-white no-underline">
          <motion.img
            src="/favicon.svg"
            alt="Habla"
            className="h-8 w-8"
            animate={{ scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
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
          {isAuthenticated ? (
            <>
              <span className="truncate max-w-[140px] text-sm text-text-muted" title={user?.email}>
                {user?.email}
              </span>
              <Link to="/documentacion" className="text-sm font-semibold text-accent no-underline hover:underline">
                API
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-border"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
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
              {isAuthenticated ? (
                <>
                  <span className="truncate px-4 py-2 text-center text-sm text-text-muted">{user?.email}</span>
                  <button
                    onClick={() => { handleSignOut() }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 font-semibold text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded-lg border border-border px-4 py-2 text-center font-semibold text-white no-underline">
                    Iniciar sesión
                  </Link>
                  <Link to="/registro" onClick={() => setMobileOpen(false)} className="rounded-lg bg-accent px-4 py-2 text-center font-semibold text-black no-underline">
                    Prueba gratis
                  </Link>
                </>
              )}
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}
