import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import GoogleAnalytics from './components/GoogleAnalytics'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegistroPage from './pages/RegistroPage'
import DashboardPage from './pages/DashboardPage'
import DocumentacionPage from './pages/DocumentacionPage'
import TerminosPage from './pages/TerminosPage'
import PrivacidadPage from './pages/PrivacidadPage'
import ContactoPage from './pages/ContactoPage'
import FAQPage from './pages/FAQPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import RecuperarContrasenaPage from './pages/RecuperarContrasenaPage'
import ResetearPage from './pages/ResetearPage'

export default function App() {
  return (
    <>
      <GoogleAnalytics />
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/recuperar-contrasena" element={<RecuperarContrasenaPage />} />
          <Route path="/resetear" element={<ResetearPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/documentacion" element={<DocumentacionPage />} />
          <Route path="/terminos" element={<TerminosPage />} />
          <Route path="/privacidad" element={<PrivacidadPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
