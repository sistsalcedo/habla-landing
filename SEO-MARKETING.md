# SEO y Marketing — Habla

## ✅ Implementado

### SEO
- **Meta tags**: title, description, keywords, canonical
- **Open Graph**: og:title, og:description, og:image, og:url, og:locale
- **Twitter Card**: summary_large_image
- **Schema.org**: Organization + SoftwareApplication (JSON-LD)
- **Favicon**: SVG en `/favicon.svg`
- **robots.txt**: Allow all, sitemap
- **sitemap.xml**: URL principal
- **theme-color**: #0a0a0b (modo oscuro)

### Marketing
- **Trust signals**: Latencia, API key segura, integración rápida
- **Testimonios**: 3 testimonios placeholder (reemplazar con reales)
- **Newsletter**: Formulario en footer (conectar con Resend/Mailchimp)
- **Analytics**: Placeholder GA4 en `index.html` (descomentar y añadir ID)

## 📋 Pendiente / Configurar

1. **Dominio**: Reemplazar `https://habla.io` por tu dominio real en:
   - `index.html` (canonical, og:url, twitter:url, og:image, schema)
   - `public/robots.txt` (Sitemap)
   - `public/sitemap.xml` (loc)
   - `src/components/CodeBlock.jsx` (api.habla.io)
   - `src/components/Footer.jsx` (hola@habla.io)

2. **Google Analytics**: En `index.html`, descomentar el bloque y cambiar `G-XXXXXXXXXX` por tu Measurement ID.

3. **Newsletter**: En `src/components/Footer.jsx`, función `handleNewsletterSubmit` — conectar con tu proveedor (Resend, Mailchimp, ConvertKit).

4. **og:image**: Algunas redes (Facebook, LinkedIn) prefieren PNG 1200×630. Si SVG no funciona, genera `og-image.png` y actualiza las meta og:image y twitter:image.

5. **Testimonios**: Reemplazar el contenido en `src/components/Testimonials.jsx` con testimonios reales de clientes.
