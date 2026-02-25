<div align="center">

# 🎙️ Habla — Landing Page

### API Speech-to-Speech en español

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-BB4B96?style=flat-square)](https://www.framer.com/motion/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com)

**Landing de marketing** para promocionar la API **Habla**: convierte voz en respuestas con IA en español.  
Habla Push (REST) · Habla Flow (WebSocket) · 100 min gratis · Integra en 5 minutos.

[Ver demo](#) · [Documentación](#) · [Registrarse](#)

---

</div>

## 📖 Descripción

**Habla** es una API Speech-to-Speech pensada para el idioma español. Esta landing page sirve como sitio de marketing para:

- 🎯 Captar clientes y leads
- 💰 Mostrar planes y precios
- 📚 Documentar el uso de la API
- 📧 Newsletter y formularios de contacto
- 🚀 Call-to-action para registro y prueba gratuita

El proyecto es **independiente** del núcleo de la API (backend FastAPI + frontend demo). Solo contiene la web de presentación.

---

## ✨ Características

| Sección | Descripción |
|---------|-------------|
| 🏠 **Hero** | Headline principal con CTA y animaciones |
| 📦 **Producto** | Habla Push (REST) y Habla Flow (WebSocket) |
| 💵 **Precios** | Planes gratuitos y de pago |
| 📝 **Código API** | Bloque de ejemplo con sintaxis destacada |
| 💬 **Testimonios** | Placeholder para casos de éxito |
| 📱 **Responsive** | Nav con menú hamburguesa en móvil |
| 🔍 **SEO** | Meta tags, Open Graph, Twitter Card, Schema.org |
| 🗺️ **Sitemap** | `sitemap.xml` y `robots.txt` incluidos |

### Rutas disponibles

| Ruta | Página |
|------|--------|
| `/` | Landing principal |
| `/login` | Inicio de sesión |
| `/registro` | Registro de cuenta |
| `/dashboard` | Panel (protegido): API key y uso |
| `/recuperar-contrasena` | Recuperar contraseña |
| `/resetear` | Nueva contraseña (tras link de email) |
| `/documentacion` | Documentación de la API |
| `/terminos` | Términos de servicio |
| `/privacidad` | Política de privacidad |
| `/contacto` | Formulario de contacto |

---

## 🛠️ Stack tecnológico

- **React 18** — Interfaz de usuario
- **Vite 6** — Build y dev server
- **Tailwind CSS 3** — Estilos utility-first
- **Framer Motion** — Animaciones
- **React Router 7** — Navegación SPA
- **Lucide React** — Iconos

---

## 🚀 Inicio rápido

### Requisitos

- Node.js 18+ 
- npm (o pnpm/yarn)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/landingpage-s2s.git
cd landingpage-s2s

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

### Build para producción

```bash
npm run build
```

Los archivos estáticos se generan en `dist/`.

### Vista previa del build

```bash
npm run preview
```

---

## 📁 Estructura del proyecto

```
landingpage_S2S/
├── public/                 # Assets estáticos
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── TrustSignals.jsx
│   │   ├── ProductCards.jsx
│   │   ├── PricingCards.jsx
│   │   ├── CodeBlock.jsx
│   │   ├── Testimonials.jsx
│   │   ├── CTASection.jsx
│   │   └── Footer.jsx
│   ├── pages/              # Páginas por ruta
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
├── docs_reference/         # Referencias del proyecto núcleo
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción → `dist/` |
| `npm run preview` | Servir el build localmente |

---

## 🌐 Despliegue

El proyecto es una SPA estática (solo frontend, sin backend). Puedes desplegarla en:

- **Vercel** — conectando el repo (recomendado)
- **Netlify** — arrastrando `dist/` o conectar repo
- **GitHub Pages** — build y subir `dist/` (configurar base en Vite si usas subpath)

### Vercel — configuración

| Campo | Valor |
|-------|-------|
| Root Directory | `./` (o vacío) |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Conecta el repo en [vercel.com](https://vercel.com) y despliega. No requiere variables de entorno.

---

## 🔧 Configuración previa al despliegue

Copia `.env.example` a `.env` y completa las variables:

| Variable | Descripción |
|----------|-------------|
| `VITE_SUPABASE_URL` | URL del proyecto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clave anónima de Supabase |
| `VITE_FORMSPREE_NEWSLETTER_ID` | ID del formulario Formspree para newsletter |
| `VITE_FORMSPREE_CONTACT_ID` | ID del formulario Formspree para contacto |
| `VITE_GA_MEASUREMENT_ID` | ID de medición de Google Analytics 4 |

### Supabase

- **Auth**: Activa Email y Google OAuth en Authentication > Providers.
- **Redirect URLs**: Añade `https://tu-dominio.com/resetear` y `http://localhost:5173/resetear` en Auth > URL Configuration.
- **Edge Function**: Despliega `supabase/functions/generate-api-key` con `supabase functions deploy generate-api-key`.

### Formspree

Crea dos formularios en [formspree.io](https://formspree.io): uno para newsletter (campo `email`) y otro para contacto (campos `name`, `email`, `message`). Pega los IDs en las variables de entorno.

---

## 📄 Documentación relacionada

- `AGENTS.md` — Guía para agentes de IA
- `PRD.md` — Requisitos del producto
- `SEO-MARKETING.md` — Checklist SEO y marketing
- `docs_reference/AGENTS_nucleo.md` — Proyecto núcleo (API Habla)

---

## 📬 Contacto

- **Email**: hola@habla.io
- **Web**: [habla.io](https://habla.io) *(actualizar cuando exista dominio)*

---

## 📝 Licencia

Este proyecto es privado. Reservados todos los derechos.

---

<div align="center">

Hecho con ❤️ para la API **Habla**

</div>
