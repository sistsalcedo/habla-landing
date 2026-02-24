# AGENTS.md – Guía para Agentes de IA

Instrucciones para que agentes de IA (Cursor, Copilot, etc.) trabajen en este proyecto de forma coherente.

---

## Propósito del proyecto

**Habla** (antes Assistant STS): Landing page de marketing para promocionar la API Speech-to-Speech en español. Este proyecto es independiente del núcleo (backend + frontend de la API); sirve para captar clientes, mostrar precios, documentación y permitir registro.

**Stack**: React 18 + Vite + Tailwind CSS + Framer Motion + React Router.

**Arquitectura**: Solo frontend (SPA estática). Sin backend. Login, Registro, Contacto y Newsletter son solo UI. Para intranet real (login, admin, gestión de usuarios) hará falta backend o BaaS (Supabase, Auth0, etc.).

**Relación con el proyecto núcleo**: Ver `docs_reference/AGENTS_nucleo.md` para la aplicación principal (API, WebSocket v1/v2). Este repositorio solo aloja la web de marketing.

---

## Estado actual (Feb 2026)

### Implementado

- **Landing principal**: Hero, Trust signals, Producto (Habla Push REST + Habla Flow WebSocket), Precios, API code block, Testimonios, CTA, Footer.
- **Rutas**: `/`, `/login`, `/registro`, `/documentacion`, `/terminos`, `/privacidad`, `/contacto`.
- **SEO**: Meta tags, Open Graph, Twitter Card, Schema.org, robots.txt, sitemap.xml, favicon.
- **Marketing**: Newsletter en footer, trust signals, testimonios placeholder.
- **Responsive**: Nav con menú hamburguesa en móvil.
- **Enlaces**: Todos los `href="#"` sustituidos por rutas reales; Nav "Contacto" va a `/contacto`.

### Archivos clave

- `index.html` — Meta tags, Schema.org, Analytics (comentado).
- `src/App.jsx` — Rutas y layout (Nav + Footer).
- `src/pages/` — HomePage, LoginPage, RegistroPage, DocumentacionPage, TerminosPage, PrivacidadPage, ContactoPage.
- `src/components/` — Nav, Hero, TrustSignals, ProductCards, PricingCards, CodeBlock, Testimonials, CTASection, Footer.
- `public/` — favicon.svg, og-image.svg, robots.txt, sitemap.xml.
- `src/lib/supabase.js` — cliente Supabase.
- `src/contexts/AuthContext.jsx` — provider de autenticación.
- `tailwind.config.js` — Tema (colores, fuentes).
- `SEO-MARKETING.md` — Checklist SEO/marketing y pendientes.

---

## Estructura del proyecto

```
landingpage_S2S/
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── TrustSignals.jsx
│   │   ├── ProductCards.jsx
│   │   ├── PricingCards.jsx
│   │   ├── CodeBlock.jsx
│   │   ├── Testimonials.jsx
│   │   ├── CTASection.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegistroPage.jsx
│   │   ├── DocumentacionPage.jsx
│   │   ├── TerminosPage.jsx
│   │   ├── PrivacidadPage.jsx
│   │   └── ContactoPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── docs_reference/          # Referencia del proyecto núcleo
│   ├── AGENTS_nucleo.md
│   ├── CHAT_IA.txt
│   └── PRD.md
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
├── SEO-MARKETING.md
├── PRD.md
└── AGENTS.md
```

---

## Rutas

| Ruta | Página | Contenido |
|------|--------|-----------|
| `/` | HomePage | Landing completa |
| `/login` | LoginPage | Formulario login (UI only) |
| `/registro` | RegistroPage | Formulario registro (UI only) |
| `/documentacion` | DocumentacionPage | Plantilla API docs |
| `/terminos` | TerminosPage | Términos de servicio |
| `/privacidad` | PrivacidadPage | Política de privacidad |
| `/contacto` | ContactoPage | Formulario contacto (UI only) |

---

## Navegación

- **Nav**: Logo → `/`; Producto, Precios, API → scroll en home, `/#producto` etc. fuera de home; Contacto → `/contacto` siempre.
- **Footer**: Enlaces internos con `useLocation` para saber si scroll o `Link` a home con hash.
- **Hash scroll**: HomePage tiene `useEffect` para scroll a `#producto`, `#precios`, etc. cuando la URL incluye hash.

---

## Convenciones de código

### React/JSX

- Componentes en PascalCase.
- camelCase para funciones y variables.
- Comentarios y mensajes al usuario en español.
- Usar `Link` de React Router para navegación interna; `href` solo para `mailto:` o enlaces externos.

### Tailwind

- Usar clases de `tailwind.config.js` (accent, bg-card, text-muted, border, etc.).
- No crear clases CSS personalizadas salvo necesidad; preferir utilidades de Tailwind.

### Archivos

- No commitear `.env`, credenciales ni `node_modules/`. Ver `.gitignore`.
- `dist/` está en `.gitignore`; se regenera con `npm run build`.

---

## Variables de entorno (landing)

- `VITE_SUPABASE_URL` — URL del proyecto Supabase.
- `VITE_SUPABASE_ANON_KEY` — Anon public key. Ver `.env.example`.

En Vercel: añadir las mismas variables en Project Settings > Environment Variables.

## Supabase – URL Configuration (Vercel)

Tras desplegar en Vercel, en Supabase Auth > URL Configuration:
- **Site URL**: `https://tu-app.vercel.app` (o tu dominio)
- **Redirect URLs**: añadir `https://tu-app.vercel.app` y `https://tu-app.vercel.app/**`

## Pendientes (ver SEO-MARKETING.md)

1. **Dominio**: Reemplazar `habla.io` por dominio real en index.html, public/, CodeBlock, Footer.
2. **Analytics**: Descomentar GA4 en index.html y configurar ID.
3. **Newsletter**: Conectar `handleNewsletterSubmit` en Footer con Resend/Mailchimp/etc.
4. **Formularios**: Login y Registro conectados a Supabase Auth (Google OAuth + email/password); Contacto solo UI.
5. **Testimonios**: Sustituir placeholders en Testimonials.jsx por reales.
6. **Intranet (login/admin real)**: Requiere backend — ver PRD.md, sección «Backend futuro».

---

## Despliegue (Vercel)

- **Root Directory**: `./` (o vacío) — todo está en la raíz.
- **Framework Preset**: Vite (auto-detectado).
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install` (por defecto)

Conectar repo de GitHub en [vercel.com](https://vercel.com) y desplegar. No requiere variables de entorno para la landing estática.

---

## Antes de cambiar algo

1. Revisar `SEO-MARKETING.md` para estado SEO y marketing.
2. Si modificas rutas: actualizar `sitemap.xml` y enlaces en Nav/Footer.
3. Si cambias el dominio: buscar `habla.io` en todo el proyecto.
4. Para el producto API real: ver `docs_reference/AGENTS_nucleo.md` (proyecto separado).

---

## Comandos

```bash
npm run dev      # Desarrollo (Vite, hot reload)
npm run build    # Producción → dist/
npm run preview  # Preview del build
```
