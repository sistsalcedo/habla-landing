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
| `/login` | Inicio de sesión (UI) |
| `/registro` | Registro de cuenta (UI) |
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

El proyecto es una SPA estática. Puedes desplegarla en:

- **Vercel** — `vercel` o conectando el repo
- **Netlify** — arrastrando `dist/` o conectar repo
- **GitHub Pages** — build y subir `dist/` (configurar base en Vite si usas subpath)

Ejemplo con Vercel:

```bash
npm run build
vercel dist
```

O conecta el repositorio en [vercel.com](https://vercel.com) y configura el directorio raíz y comando de build.

---

## 🔧 Configuración previa al despliegue

| Tarea | Archivo / Ubicación |
|-------|---------------------|
| Dominio | Reemplazar `habla.io` en `index.html`, `public/`, componentes |
| Analytics | Descomentar GA4 en `index.html` y añadir Measurement ID |
| Newsletter | Conectar `Footer.jsx` → Resend, Mailchimp, etc. |
| Formularios | Login, Registro, Contacto → conectar con backend cuando exista |

Ver `SEO-MARKETING.md` para checklist completo.

---

## 📄 Documentación relacionada

- `AGENTS.md` — Guía para agentes de IA
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
