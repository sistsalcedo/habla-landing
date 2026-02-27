import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, ChevronDown, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import CurrencyToggle from './CurrencyToggle'

const primaryLinks = [
  { href: '#producto', label: 'Producto', isHash: true },
  { href: '#precios', label: 'Precios', isHash: true },
  {
    label: 'Recursos',
    children: [
      { href: '#casos-uso', label: 'Casos de uso', isHash: true },
      { href: '#calculadora', label: 'Calculadora', isHash: true },
      { href: '#api', label: 'API', isHash: true },
      { href: '/blog', label: 'Blog', isHash: false },
      { href: '/faq', label: 'FAQ', isHash: false },
    ],
  },
  { href: '/contacto', label: 'Contacto', isHash: false },
]

function scrollToSection(e, href) {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [recursosOpen, setRecursosOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const recursosRef = useRef(null)
  const userRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut, isAuthenticated } = useAuth()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleClick = (e) => {
      if (recursosRef.current && !recursosRef.current.contains(e.target)) setRecursosOpen(false)
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setMobileOpen(false)
    setUserOpen(false)
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

        <ul className="hidden items-center gap-6 list-none md:flex">
          {primaryLinks.map((link) =>
            link.children ? (
              <li key={link.label} ref={recursosRef} className="relative">
                <button
                  type="button"
                  onClick={() => setRecursosOpen(!recursosOpen)}
                  className="flex items-center gap-0.5 text-text-muted transition-colors hover:text-white"
                  aria-expanded={recursosOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${recursosOpen ? 'rotate-180' : ''}`} />
                </button>
                {recursosOpen && (
                  <ul
                    role="menu"
                    className="absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-lg border border-border bg-bg py-1 shadow-xl"
                  >
                    {link.children.map((child) => (
                      <li key={child.href} role="none">
                        {child.isHash ? (
                          isHome ? (
                            <a
                              href={child.href}
                              role="menuitem"
                              onClick={(e) => {
                                scrollToSection(e, child.href)
                                setRecursosOpen(false)
                              }}
                              className="block px-4 py-2 text-sm text-text-muted no-underline transition-colors hover:bg-border/50 hover:text-white"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              to={child.href.startsWith('#') ? `/${child.href}` : child.href}
                              role="menuitem"
                              onClick={() => setRecursosOpen(false)}
                              className="block px-4 py-2 text-sm text-text-muted no-underline transition-colors hover:bg-border/50 hover:text-white"
                            >
                              {child.label}
                            </Link>
                          )
                        ) : (
                          <Link
                            to={child.href}
                            role="menuitem"
                            onClick={() => setRecursosOpen(false)}
                            className="block px-4 py-2 text-sm text-text-muted no-underline transition-colors hover:bg-border/50 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
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
                      to={link.href.startsWith('#') ? `/${link.href}` : link.href}
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
            )
          )}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <CurrencyToggle variant="compact" />
          {isAuthenticated ? (
            <div ref={userRef} className="relative">
              <button
                type="button"
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-2 rounded-full border border-border bg-bg/50 p-1.5 pr-2 transition-colors hover:border-border/80 hover:bg-border/30"
                aria-expanded={userOpen}
                aria-haspopup="true"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
                  {user?.email?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                </span>
                <ChevronDown className={`h-4 w-4 text-text-muted transition-transform ${userOpen ? 'rotate-180' : ''}`} />
              </button>
              {userOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-1 min-w-[220px] rounded-lg border border-border bg-bg py-2 shadow-xl"
                >
                  <p className="truncate px-4 py-2 text-xs text-text-muted" title={user?.email}>
                    {user?.email}
                  </p>
                  <div className="border-t border-border" />
                  <Link
                    to="/dashboard"
                    role="menuitem"
                    onClick={() => setUserOpen(false)}
                    className="block px-4 py-2 text-sm text-white no-underline transition-colors hover:bg-border/50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/documentacion"
                    role="menuitem"
                    onClick={() => setUserOpen(false)}
                    className="block px-4 py-2 text-sm text-white no-underline transition-colors hover:bg-border/50"
                  >
                    API
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-white transition-colors hover:bg-border/50"
                  >
                    <LogOut className="h-4 w-4" />
                    Salir
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-text-muted no-underline transition-colors hover:text-white">
                Iniciar sesión
              </Link>
              <Link to="/registro">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black no-underline transition-colors hover:bg-accent-hover"
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
          <div className="mb-4 flex justify-center">
            <CurrencyToggle />
          </div>
          <ul className="flex flex-col gap-1 list-none">
            {primaryLinks.map((link) =>
              link.children ? (
                <Fragment key={link.label}>
                  <li className="px-2 py-1 text-xs font-medium uppercase text-text-muted">
                    {link.label}
                  </li>
                  {link.children.map((child) => (
                    <li key={child.href} className="pl-4">
                      {child.isHash ? (
                        isHome ? (
                          <a
                            href={child.href}
                            onClick={(e) => {
                              scrollToSection(e, child.href)
                              setMobileOpen(false)
                            }}
                            className="block py-2 text-text-muted no-underline hover:text-white"
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            to={child.href.startsWith('#') ? `/${child.href}` : child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-text-muted no-underline hover:text-white"
                          >
                            {child.label}
                          </Link>
                        )
                      ) : (
                        <Link
                          to={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-text-muted no-underline hover:text-white"
                        >
                          {child.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </Fragment>
              ) : (
                <li key={link.href}>
                  {link.isHash ? (
                    isHome ? (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          scrollToSection(e, link.href)
                          setMobileOpen(false)
                        }}
                        className="block py-3 text-text-muted no-underline hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href.startsWith('#') ? `/${link.href}` : link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 text-text-muted no-underline hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-text-muted no-underline hover:text-white"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              )
            )}
            <li className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-lg bg-accent/20 px-4 py-2 text-center font-semibold text-accent no-underline">
                    Dashboard
                  </Link>
                  <Link to="/documentacion" onClick={() => setMobileOpen(false)} className="rounded-lg border border-border px-4 py-2 text-center font-semibold text-white no-underline">
                    API
                  </Link>
                  <button
                    onClick={handleSignOut}
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
